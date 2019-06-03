---
title: RN的InteractionManager简介
description: RN的InteractionManager简介
categories:
 - technology
tags:
---

>一个关于RN的InteractionManager简介。

这几天在着手开发react-native的项目，写了个页面，发现页面跳转的过程中非常卡，很纳闷我代码写的挺规范（自我感觉不是一般的好😄）怎么会产生这样的现象，后经查阅文档了解到，原因是我在页面载入的过程中调了服务端接口，正确做法是把调接口逻辑写在

```javascript
    InteractionManager.runAfterInteractions(() => {
        //耗时较长的同步任务
    });
```
里，因此决定好好研究下InteractionManager。

### 1、基本内容

InteractionManager是一个可以提升用户体验和交互效果的模块，它可以让一些任务在比较耗时的操作或者动画完成后执行，这样能够保证我们的js动画比较平滑的运行，比如导航跳转新页面。

对大多数React Native应用来说，业务逻辑是运行在JavaScript线程上的，这是React应用所在的线程，也是发生API调用、以及处理触摸事件等操作的线程。更新数据到原生支持的视图是批量进行的，
并且在事件循环每进行一次的时候被发送到原生端，这一步通常会在一帧时间结束之前处理完（如果一切顺利的话）。如果JavaScript线程有一帧没有及时响应，就被认为发生了一次丢帧。
例如，你在一个复杂应用的根组件上调用了this.setState，从而导致一次开销很大的子组件树的重绘，可想而知，这可能会花费200ms也就是整整12帧的丢失。
此时，任何由JavaScript控制的动画都会卡住。只要卡顿超过100ms，用户就会明显的感觉到。

 
这种情况经常发生在Navigator的切换过程中：当你push一个新的路由时，JavaScript需要绘制新场景所需的所有组件，以发送正确的命令给原生端去创建视图。由于切换是由JavaScript线程所控制，
因此经常会占用若干帧的时间，引起一些卡顿。有的时候，组件会在componentDidMount函数中做一些额外的事情，这甚至可能会导致页面切换过程中多达一秒的卡顿。

InteractionManager里面包含的方法：

- runAfterInteractions: 里面的函数在所有的交互和动画完成之后运行。返回一个可取消的 promise。

- createInteractionHandle: 通知管理器有某个交互开始了。

- clearInteractionHandle: 通知管理器有某个交互已经结束了。

- setDeadline: 设置延迟时间，会调用setTimeout方法挂起并且阻塞所有没有完成的任务，然后在eventLoopRunningTime到设定的延迟时间后，然后执行setImmediate方法进行批量执行任务。

这些方法和js原生的某些方法的比较：

- window.requestAnimationFrame: 
执行一个动画，并告诉浏览器在下次重绘之前调用指定的回调函数更新动画，
该方法需传入一个回调函数，此回调在下一次重绘前执行。

如果想在浏览器下次重绘之前继续更新下一帧动画，那么回调函数自身必须再次调用window.requestAnimationFrame。

- setImmediate/setTimeout: 设置延迟执行任务的时间，可能会影响到正在执行的动画。

- runAfterInteractions: 延迟执行任务，不会影响到正在执行的动画效果。

### 2、源码解析

```javascript
'use strict';

const BatchedBridge = require('BatchedBridge');
const EventEmitter = require('EventEmitter');
const Set = require('Set');
const TaskQueue = require('TaskQueue');

const infoLog = require('infoLog');
const invariant = require('fbjs/lib/invariant');
const keyMirror = require('fbjs/lib/keyMirror');

type Handle = number;
import type {Task} from 'TaskQueue';

const _emitter = new EventEmitter();

const DEBUG_DELAY = 0;
const DEBUG = false;

var InteractionManager = {
    Events: keyMirror({
        interactionStart: true,
        interactionComplete: true,
    }),
  /**
   * 常用方法，耗时任务执行完再执行task
   */
    runAfterInteractions(task: ?Task): {then: Function, done: Function, cancel: Function} {
        const tasks = [];
        //参数task最终加入了_taskQueue中，而这个_taskQueue会在_processUpdate中被遍历执行。
        const promise = new Promise(resolve => {
            _scheduleUpdate();
            if (task) {
                tasks.push(task);
            }
            tasks.push({run: resolve, name: 'resolve ' + (task && task.name || '?')});
            _taskQueue.enqueueTasks(tasks);
        });
        return {
            then: promise.then.bind(promise),
            done: (...args) => {
                if (promise.done) {
                    return promise.done(...args);
                } else {
                    console.warn('Tried to call done when not supported by current Promise implementation.');
                }
            },
            cancel: function() {
                _taskQueue.cancelTasks(tasks);
            },
        };
    },

    /**
    * 通知管理器一个交互已经开始。这是创建句柄，这其实就是让全局变量inc自增加，然后push进_addInteractionSet集合
    */
    createInteractionHandle(): Handle {
        DEBUG && infoLog('create interaction handle');
        _scheduleUpdate();
        var handle = ++_inc;
        _addInteractionSet.add(handle);
        return handle;
    },

    /**
    * 通知管理器一个交互已经完成。这是清除句柄，就是把handle从_addInteractionSet集合中删除，并在_deleteInteractionSet集合中添加该handle
    */
    clearInteractionHandle(handle: Handle) {
        DEBUG && infoLog('clear interaction handle');
        //首先判断handle是否存在，不存在则报错"Must provide a handle to clear."
        invariant(
            !!handle,
            'Must provide a handle to clear.'
        );
        _scheduleUpdate();
        _addInteractionSet.delete(handle);
        _deleteInteractionSet.add(handle);
    },

    addListener: _emitter.addListener.bind(_emitter),

    /**
    * 如果设定了一个正整数值，则会使用 setTimeout 来挂起所有尚未执行的任务。
    * 在 eventLoopRunningTime 到达设定时间后，才开始使用一个 setImmediate 
    * 方法来批量执行所有任务。
    */
    setDeadline(deadline: number) {
        _deadline = deadline;
    },
};

const _interactionSet = new Set();
const _addInteractionSet = new Set();
const _deleteInteractionSet = new Set();
const _taskQueue = new TaskQueue({onMoreTasks: _scheduleUpdate});
let _nextUpdateHandle = 0;
let _inc = 0;
let _deadline = -1;

declare function setImmediate(callback: any, ...args: Array<any>): number;

/**
 * 计划异步更新交互状态，是整个管理器的核心部分，主要处理了deadline，然后调用_processUpdate
 */
function _scheduleUpdate() {
    if (!_nextUpdateHandle) {
        if (_deadline > 0) {
            _nextUpdateHandle = setTimeout(_processUpdate, 0 + DEBUG_DELAY);
        } else {
            _nextUpdateHandle = setImmediate(_processUpdate);
        }
    }
}

/**
 * 通知侦听器、进程队列等
 */
function _processUpdate() {
    _nextUpdateHandle = 0;
    //这个部分最为核心，用来整理管理器接受了哪些任务
    
    //创建一个集合包含的句柄总数作为比较
    var interactionCount = _interactionSet.size;
    //这里收集_addInteractionSet集合中的句柄到_interactionSet
    _addInteractionSet.forEach(handle =>
        _interactionSet.add(handle)
    );
    //这里从_interactionSet中删除_deleteInteractionSet包含的句柄
    _deleteInteractionSet.forEach(handle =>
        _interactionSet.delete(handle)
    );
    //创建一个整理完的集合包含的句柄总数作为比较
    var nextInteractionCount = _interactionSet.size;
    
    if (interactionCount !== 0 && nextInteractionCount === 0) {
        // transition from 1+ --> 0 interactions
        //当判断初始句柄总数不等于0 但是整理完的句柄总数为0时，执行Events.interactionComplete
        _emitter.emit(InteractionManager.Events.interactionComplete);
    } else if (interactionCount === 0 && nextInteractionCount !== 0) {
        // transition from 0 --> 1+ interactions
        //当判断初始句柄总数等于0 但是整理完的句柄总数不为0时，执行Events.interactionStart
        _emitter.emit(InteractionManager.Events.interactionStart);
    }

    // 处理队列而不考虑转换
    if (nextInteractionCount === 0) {
        //这里是执行runAfterInteractions里面的闭包回调
        while (_taskQueue.hasTasksToProcess()) {
            _taskQueue.processNext();
            if (_deadline > 0 &&
                BatchedBridge.getEventLoopRunningTime() >= _deadline) {
                // 
                _scheduleUpdate();
                break;
            }
        }
    }
    //最后清空两个集合
    _addInteractionSet.clear();
    _deleteInteractionSet.clear();
}

module.exports = InteractionManager;
```
整个InteractionManager就是实现了生产消费者模型。

参考文档：
[React - Native InteractionManager 动画交互管理器](https://www.jianshu.com/p/4c1d96132756)

[InteractionManager源码阅读笔记](https://www.jianshu.com/p/8c07dc359461)