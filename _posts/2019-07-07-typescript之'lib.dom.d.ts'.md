---
title: 关于ts我不知道的事
description: 关于ts我不知道的事
categories:
 - technology
tags:
---

> 最近学习了ts，在声明函数以及变量时，需要添加类型声明，以确保项目运行以及后期迭代维护时的准确性，并大大提高了代码的可读性。但最近接触了一个项目，里面有一些我看不懂的声明，今天就来说说。

### 1、dom声明

某天，看到了以下代码：

```javascript
class DOM<K extends keyof HTMLElementTagNameMap = 'div'> {
    el: HTMLElementTagNameMap[K];
    //...
}
```

上面代码中的HTMLElementTagNameMap很迷惑，这是干啥的呢，全局搜索了整个项目也没有看到它作为变量或者interface声明，后来按住command，鼠标点击这个单词，项目中跳出了一个文件，lib.dom.d.ts。

![图片]({{site.url}}/assets/images/note/ts1.jpg)

下面就来简单说说这个文件是啥，用来干啥。

首先我们都知道.d.ts格式的文件代表声明文件，里面的内容参与编译，但不会输出任何代码，主要作用是为其他js文件提供类型声明。

然后参考了[深入理解TypeScript](https://jkchao.github.io/typescript-book-chinese/typings/lib.html)，里面大致是这样描述的：

当我们安装了typescript时，会一起把一个叫lib.d.ts的声明文件安装了(一起安装的还有lib.dom.d.ts、lib.es5.d.ts等文件)，这个文件包含了各种js运行时所需的声明。因此上面的代码没有在项目里声明HTMLElementTagNameMap也可以引用。

可以通过在运行命令时加上--noLib来排除此文件，如下：

```javascript
    const a: string = '233';
    function hello(str: string) {
        console.log( a + str);
    }
    hello('hahaha');
```

在控制台中执行tsc hello.ts，打印"hahaha233"，执行tsc hello.ts --noLib，报错：

![图片]({{site.url}}/assets/images/note/ts2.jpg)

### 2、详细了解lib.d.ts

它的内容主要是声明一些变量，如window、document、math和一些类似接口声明。

一个简单的类型声明示例：

```javascript
    declare var window: Window;
    //...
    
    interface Window extends EventTarget, WindowTimers, WindowSessionStorage, WindowLocalStorage, WindowConsole, GlobalEventHandlers, IDBEnvironment, WindowBase64, GlobalFetch, WindowOrWorkerGlobalScope, WindowEventHandlers {
        Blob: typeof Blob;
        URL: typeof URL;
        URLSearchParams: typeof URLSearchParams;
        readonly applicationCache: ApplicationCache;
        readonly caches: CacheStorage;
        readonly clientInformation: Navigator;
        readonly closed: boolean;
        readonly crypto: Crypto;
        customElements: CustomElementRegistry;
        defaultStatus: string;
        readonly devicePixelRatio: number;
        readonly doNotTrack: string;
        readonly document: Document;
        //...
```

里面涵盖了各种全局变量的类型，使用此文件，可以不用记住这些全局变量的类型，在这个文件里都可以找得到。

### 3、扩充lib.dom.d.ts

当已有的全局声明不够我们使用时，可以自行扩充，扩充方法如下：

- 在项目中创建一个globals.d.ts文件(其实不用像官方文档一样叫这个名字，叫啥都行)，在里面编写要扩展的变量或接口声明：

```javascript
interface Window {
    helloWorld(): void;
}
```

- 在tsconfig.json中引入这个文件：

```javascript
"include": [
    //...
    "src/typings/globals.d.ts",
    //...
],
```

- 在代码中写：

```javascript
window.helloWorld = () => console.log('hello world');
window.helloWorld();
```

编译之后，看到浏览器控制台打印出'hello world'，其他的类型如Math，document同理。

注意，这种扩展方式不适用于tsc命令（如: tsc hello.ts）。

### 4、关于tsconfig.json 中的lib

假设我们在进行node开发，那就不需要dom的api，为避免运行时报错(为什么会报错？)，可以在lib中将dom剔除掉。lib的作用是指定需要引入的libs文件，没有指定时，它的值相当于target语言版本+dom。

lib的可选值有以下：

- JavaScript 功能

-- es5

-- es6
  
-- es2015

-- es7

-- es2016
  
-- es2017

-- esnext

- 运行环境

-- dom

-- dom.iterable

-- webworker

-- scripthost

- ESNext 功能选项

-- es2015.core

-- es2015.collection

-- es2015.generator

-- es2015.iterable

-- es2015.promise

-- es2015.proxy

-- es2015.reflect

-- es2015.symbol

-- es2015.symbol.wellknown

-- es2016.array.include

-- es2017.object

-- es2017.sharedmemory

-- esnext.asynciterable

一般tsconfig.json中会这样设置lib:

```javascript
"compilerOptions": {
    target: "es5",
    "lib": ["dom", "es6"]
}
```

### 5、给第三方库编写d.ts

我们必须清楚d.ts必须只包含自己需要的功能，也就是在编译过程中需要的所有类型声明。

以我们熟知的jauery为例：

- ts:

```javascript
$(function(){
    console.log('Ready!');
});
$('div').css('height', '20px');
```

- jquery.d.ts:

```javascript
declare function $(callback:Function):void;//这里定义$为一个全局函数，接收一个回调函数，没有返回值
declare function $(selector:string):any;//重复声明$，作为一个选择器接收字符串，返回的值暂不写明
```
为了让$支持多种调用方式，多次声明它。

或者，尽可能的考虑使用接口声明：

```javascript
interface JQueryElement {
    click(Function): JQueryElement;
    css(name: string): string;
    css(name: string, value: any): JQueryElement;
}
declare function $(selector: string): JQueryElement;
```


参考文档：

[TypeScript 进阶：给第三方库编写声明文件](http://imzc.me/dev/2016/11/30/write-d-ts-files/)

[深入理解 TypeScript](https://jkchao.github.io/typescript-book-chinese/typings/lib.html#使用例子)
