---
title:  Front-end Methods
description: This is a collection of front-end methods.
categories:
 - technology
tags:
---

> 如何判断一个对象是不是数组

#### 首先介绍一个最佳方法：
```sh
    var arr=[];
    console.log(Object.prototype.toString.call(arr)); //[object Array]
```
jquery源码就是这种判断方式。

#### 其他方法1：
```sh
    var arr=[];
    console.log(arr instanceof Array);//true
```
这种方法存在的问题是：

"如果网页中包含多个框架，那实际上就存在两个以上不同的全局环境，从而存在两个以上不同版本的Array构造函数，如果从一个框架向另一个框架传入一个数组，那么传入的数组在第二个框架中原生创建的数组分别具有各自不同的构造函数。"--摘自Javascript高级程序设计第三版

举例：有一个页面定义了一个数组arr，页面有嵌套了一个iframe，在iframe里面通过top.arr instanceof Array，返回false。

#### 其他方法2：
```sh
    var arr=[];
    console.log(Array.isArray(arr));//true
```
支持该方法的浏览器有IE9+、Firefox4+、Safari5+、Opera10.5+和Chrome。

#### 其他方法3：
```sh
    var arr=[];
    console.log(jQuery.isArray(arr));//true
```
这个方法是在知乎上看见某大神的回答，亲自试了下，是可以的。

jQuery1.9.0中的实现如下：

```sh
isArray: Array.isArray || function( obj ) {
     return jQuery.type(obj) === "array";
}
```