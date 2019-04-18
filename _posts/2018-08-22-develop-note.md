---
title: VUE Develop Note
description: This is a summary note after the development project.
categories:
 - technology
tags:
---

> VUE的开发总结

## 1、scoped 可以设置子组件的个性化样式，编译出来的结果是：
```sh
1）给HTML的DOM节点加一个不重复的data属性，例：<div data-v-2311c06a class="button-warp">
2）在css上也加一个data属性选择器，例：.button-warp[data-v-2311c06a]{样式集合}
```
此功能虽然能达到组件样式模块化的目的，但是会造成一个后果，每个样式的权重增加，要更改需要更高的权重去覆盖，增加了复杂度。

因此我们在开发中尽量避免用scoped，在设置样式之前，先设置一个父级且不同于其他的class名称。

## 2、钩子函数周期：
```sh
created是实例创建完成后执行的函数，而mounted是编译好的html挂在到页面完成后执行的事件钩子。
```
比如要给某元素绑定事件，不能写在created里，要写在mounted里。

## 3、当父子组件嵌套时，父组件的数据修改后，子组件需要根据实际情况重置数据：
```sh
比如子组件是一个可分页的列表，当父组件传递的查询参数变化时，其他查询参数如pageNo、pageSize要重置为初始状态。
```
## 4、mint-ui库的上拉加载在回调里执行时，一定要这样写：
```sh
if (this.pageNo != 1){
    this.$refs.loadmore && this.$refs.loadmore.onBottomLoaded();
}
```

不能再额外添加其他条件

## 5、要修改数据类型为object的data时，要先deepcopy或者解构赋值，不然数据修改不成功。

```sh
/**
 * @describe 修改背景颜色
 * @public
 * @param {String} color 要修改成的颜色 如#56fea2
 * @return undefined
 */
changeBgcolor (color) {
    let obj = {...this.marketingItem};
    obj.bgColor = color;
    this.marketingItem = obj;
}
```

## 6、mixins的应用
理解为为组件注入可复用的公用组件，是一种用来更高效的实现组件内容的复用的方法。

具体使用方法如下：
```sh
import point from '../assets/point';
export default {
    mixins:[point],
    name: 'hello',
    data () {
        return {
            msg: 'Hello World!'
        }
    },
    created () {
        this.pointAction();
    },
    methods: {
        pointAction() {
            this.point({point: "index_recharge"});
        }
    }
```
mixins和普通情况下引入组件的区别：
### 1）组件在引用之后相当于在父组件内开辟了一块单独的空间，来根据父组件props过来的值进行相应的操作，单本质上两者还是泾渭分明，相对独立。
### 2）mixins则是在引入组件之后，则是将组件内部的内容如data等方法、method等属性与父组件相应内容进行合并。相当于在引入后，父组件的各种属性方法都被扩充了。
也就是说mixins会改变父组件。
单纯组件引用：
     父组件 + 子组件 >>> 父组件 + 子组件
mixins：
     父组件 + 子组件 >>> 新的父组件
在使用mixins时需要注意，它并不会将组建连接起来同时共享以及处理这些变量，除了合并，组建之间并无任何通信，因此不能实现类似vuex的共享数据功能。

## 7、v-show和v-if的区别
二者都是动态的显示DOM元素，但是v-if的初始化较快、切换成本高；v-show初始化慢、切换成本低。
### 1）方式：v-if是动态的向DOM树内添加或者删除元素；v-show是通过设置元素display样式属性控制是否展示；
### 2）编译过程：v-if切换有一个局部编译/卸载的过程，切换过程中合适地销毁和重建内部的事件监听和子组件；v-show只是简单的基于css切换；
### 3）编译条件：v-if是惰性的，如果初始条件为假，则什么也不做；只有在条件第一次变为真时才开始局部编译（编译被缓存？编译被缓存后，然后再切换的时候进行局部卸载); v-show是在任何条件下（首次条件是否为真）都被编译，然后被缓存，而且DOM元素保留；
### 4）性能消耗：v-if有更高的切换消耗；v-show有更高的初始渲染消耗；
### 5）使用场景：v-if适合运营条件不大可能改变；v-show适合频繁切换。

遇到的问题：在利用echarts绘制图表时，当图表的容器用v-show控制且一开始隐藏时，页面加载完毕，将图表容器展示出来，发现图表并没有绘制。

解决方案：用v-if控制。

## 8、{% raw %} {{}}{% endraw %}、v-html和v-text
### {% raw %} {{}}{% endraw %}：将元素当成纯文本输出；
### v-html：v-html会将元素当成HTML标签解析后输出；
### v-text：v-text会将元素当成纯文本输出。

遇到的问题：想在{% raw %} {{}}{% endraw %}中渲染br标签，没有成功。

解决方案：用v-html渲染。

且，利用{% raw %} {{}}{% endraw %}来渲染数据时，当网速很慢或js出错时，会暴露{% raw %} {{XXX}} {% endraw %}，用v-text可以解决此类问题。

最需要注意的是：在生产环境中动态渲染HTML是非常危险的，因为容易导致XSS攻击。所以只能在可信的内容上使用 v-html ，永远不要在用户提交和可操作的网页上使用。

## 9、事件修饰符

### 阻止单击事件冒泡：<a v-on:click.stop="doThis"></a>

### 提交事件不再重载页面：<form v-on:submit.prevent="onSubmit"></form>

### 修饰符可以串联：<a v-on:click.stop.prevent="doThat"></a>

### 只有修饰符：<form v-on:submit.prevent></form>

### 添加事件侦听器时使用事件捕获模式：<div v-on:click.capture="doThis">...</div>

### 只当事件在该元素本身（比如不是子元素）触发时触发回调：<div v-on:click.self="doThat">...</div>

## 10、ref和$refs:

###  ref是用来给元素或子组件注册引用信息，引用信息会注册在父组件的$refs对象上。如果在普通的 DOM 元素上使用，引用指向的就是 DOM 元素；如果用在子组件上，引用就指向组件实例。

### 需要注意的是，ref是作为渲染结果被创建，在初始渲染的时候不能访问，因为还不存在，$refs也不是响应式的，所以不能试图用它在模版中做数据绑定。

### $refs相对document.getElementById的方法，会减少获取dom节点的消耗。

> 其他问题：

## 1、跨域问题
当遇到这样的提示字样时：Failed to load https://aa.xxx.xx/group/listGroup.rjson: The 'Access-Control-Allow-Origin' header has a value 'https://bb.xxx.xx' that is not equal to the supplied origin. Origin 'https://cc.xxx.xx' is therefore not allowed access.

aa.boss.cc域名下的借口只支持了bb.boss.cc 没有支持cc.boss.cc

## 2、safari new Date( ) 时间报错 Invalid Date
```sh
new Date('2018-09-06 08:06:03') // Invalid Date
```
这个问题的产生原因就是没有按照标准时间写。

更改方式1
```sh
new Date('2018/09/06 08:06:03') // Thu Sep 06 2018 08:06:03 GMT+0800 (中国标准时间)
```

更改方式2
```sh
new Date('2018-09-06T08:06:03+08:00') // Thu Sep 06 2018 08:06:03 GMT+0800 (中国标准时间)
```

## 3、生成二维码报错："Error: code length overflow. (1660>1056)"

此时需要修改生成二维码的库，代码连接：qrcodes.js
