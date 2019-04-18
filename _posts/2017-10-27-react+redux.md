---
title: React+Redux Note
description: This is a summary notes for use of react+redux.
categories:
 - technology
tags:
---

> react+redux的使用方法总结

简介：react是一款渲染dom结构的框架，redux是一javascript的应用状态管理的库，二者结合起来的功能非常强大。

### 1、项目搭建步骤：
#### 1）安装所需框架：
#### react
#### react-dom：用来处理virtual DOM，如果用的react native，就安装react-native
#### react-redux；
#### redux；
#### redux-logger：有助于开发
#### 还有一些打包编译需要的工具，如：
#### webpack；
#### webpack-cli；
#### webpack-dev-server：webpack官网出得一个小型express服务器，用来支持热加载。下载webpack-dev-server包时要翻墙，国内没有资源
#### babel-core：可以把ES6转换成ES5，注意babel最新的v6版本分为babel-cli和babel-core两个模块
#### babel-loader：webpack中需要用到的loader

#### 2）打开package.json，补全scripts指令：
```sh
"scripts": {
    "start": "webpack-dev-server --hot --inline --colors --content-base ./build",
    "dev": "webpack --mode development",
    "build": "webpack webpack.config.js --progress --colors --mode production"
}
```
这里需要注意的是：start指令这样写，执行后会产生警告："The 'mode' option has not been set, webpack will fallback to 'production' for this value. Set 'mode' option to 'development' or 'production' to enable defaults for each environment.You can also set it to 'none' to disable any default behavior. Learn more: https://webpack.js.org/concepts/mode/"。

改成："webpack-dev-server --hot --inline --colors --content-base --mode development"即可。

npm start为启动生产环境、npm run build 为打包生产环境。

#### 3）启动webpack
在package.json中配置的start命令中，包含了热加载的指令，热加载可以很方便的刷新页面，不需要手动刷新浏览器。
webpack配置如下：
```sh
let webpack = require('webpack');
let path = require('path');
let config = {
    entry: './src/index.js',//唯一的入口
    output: {
        path: path.resolve(__dirname, '../build'),//打包后的文件存放的地方 __dirname指向当前执行脚本所在的目录
        filename: "bundle.js"//打包后输出文件的文件名
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
                plugins: ['transform-runtime'],
                presets: ['es2015', 'react', 'stage-2']
            }
        },{
            test: /\.css/,
            loader: 'style-loader!css-loader'
        }]
    }
};
module.exports = config;
```
这里不做过多的webpack叙述，详情请见：[webpack使用笔记]()。

### 2、项目构建：
#### 1）在根目录创建index.html文件。引入bundle.js。
```sh
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div id="app"></div>
    <script src="bundle.js"></script>
</body>
</html>
```
#### 2）创建src文件夹，用来存放开发的代码。
#### 3）创建store

```sh
import {createStore, applyMiddleware, combineReducers} from 'redux';
import {createLogger} from 'redux-logger';
import toDoApp from './modules/toDoApp';//某个reducer模块 详见4）

const loggerMiddleware = createLogger();
//applyMiddleware的第一种写法
const createStoreWithMiddleware = applyMiddleware(loggerMiddleware)(createStore);
const reducer = combineReducers({
    toDoApp
});
const configureStore = (initialState) => createStoreWithMiddleware(reducer, initialState);
export default configureStore;
```
这里，store是保存数据的容器，整个应用只能有一个store；

createStore是由redux提供的用来初始化store的函数；

applyMiddleware是用来添加开发所需中间件的；

combineReducers用来把多个reducers合并到一起；

createlogger可以console除每个action后数据的详细处理过程。

store对象包含所有的数据，如果想获取某一时刻的数据（state），通过以下方法：
```sh
const state = store.getState();
```

##### applyMiddleware的第二种写法：
```sh
const configureStore = createStore(reducer, initialState = {}, applyMiddleware(loggerMiddleware));
export default configureStore;
```

#### 4）创建reducer，代码如下：
```sh
import {
    ADD_ITEM
} from '../../constants/actionType';

const initialState = {
    list: [{item: 'test', done: false}],
    newToDo: ''
};
export default function reducer(state = initialState, action){
    switch (action.type) {
        case ADD_ITEM:
            return Object.assign({}, state, [...state.list, action.item]);//assign方法用于将所有可枚举属性的值从一个或多个源对象复制到目标对象
        default:
            return state;
    }
};
```
store收到action后，必须给出一个新的state，这样view才会发生变化，这种state的计算过程叫做reducer。

这里创建一个默认的state对象，并返回一个reducer函数。reducer函数承接默认state以及传递过来的action对象，在reducer函数内判断action.type，返回新的state。
注意：这里必须用export default输出reducer函数！

actionType.js重的代码如下：
```sh
export const ADD_ITEM = 'react-tytest/toDoApp/ADD_ITEM';
export const DELETE_ITEM = 'react-tytest/toDoApp/DELETE_ITEM';
```
actionType的作用是：
##### a.存放所有动作类型。actionType选择用变量存放的原因是：1、方便代码维护；2、有助于追踪数据状态变化。
##### b.reducer通过判断不同的 actionType 处理不同数据更新，保证数据有秩序更新。
##### c.命名规则必须为：npm-module-or-app/reducer/ACTION_TYPE（项目名称/模块名/方法）！
##### d.须用大写的蛇形方式UPPER_SNAKE_CASE来命名action types。

#### 5）创建container，代码如下：
```sh
import {connect} from 'react-redux';
import ToDoApp from '../components/ToDoApp';

function mapStateToProps(state) {
    return {
        toDoApp: state.toDoApp
    }
}

function mapDispatchToProps(dispatch) {
    return {};//因为我们还没有编写具体的行为，这里就暂时空白，后面再补
}

export default connect (
    mapStateToProps,
    mapDispatchToProps
)(ToDoApp);
```
container的作用是连接reducer和app。由react-redux提供的connect方法

首先，在文件顶部首先导入connect用来将容器和组件联系在一起，connect这个函数被调用两次, 第一次是两个回调函数: mapStateToProps and mapDispatchToProps。第二次是把state和dispatch传入组件的时候。
当在redux中发生某些行为（页面交互）时候，就需要调用dispatch函数传递一个action然后调用reducer这一套流程。
最后在底部连接mapStateToProps和mapDispatchToProps，代码形式如上。

#### 6）创建action文件，代码如下：
```sh
import {
    ADD_ITEM,
    DELETE_ITEM
} from '../constants/actionType';

export function addItem () {
    return {
        type: ADD_ITEM,
        item: 'Adding this item'
    }
}
```
这里首先引入actionType，用来返回动作类型以及其他数据。

用户接触不到state，只能接触到view，因此state的变化必须是view导致的，action就是用户通过view层发出的通知，表示state应该变化了。action是一个对象，它的type属性是必须的，其他属性客自由设置。

注意：必须用export输出函数形式的action creators！

store.dispatch()是view发出Action的唯一方法：
```sh
store.dispatch(addItem('Adding this item'));
```

#### 6）创建一个入口文件index.js
```sh
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import ToImageContainer from './containers/ToImageContainer';
import configureStore from './redux/configureStore';

export const store = configureStore();

class App extends React.Component {
    render(){
        return(
            <Provider store={store}>
                <ToImageContainer />
            </Provider>
        )
    }
}
ReactDOM.render(<App />, document.getElementById('app'));
```
Provider作为一个容器，用来承载整个app的state，并将其传递给它所包裹的容器。最后一句表示将react+redux代码渲染回index.html。

此时，一个完整的react+redux项目搭建完成。

完整项目路径：[]();


### 附：
#### npm学习要点：
##### 1、npm install 各个配置参数的区别
-g: 不会将模块包存入node_modules;

--save: 会将下载的包存入package.json的dependencies配置中;

--save-dev: 会将下载的包存入package.json的devDependencies配置中;

##### 2、node版本会影响依赖包下载，比如下载不了。
##### 3、只有执行npm start时可以不加run。

#### 文档参考：[从零开始搭建一个react项目](https://www.jianshu.com/p/324fd1c124ad)