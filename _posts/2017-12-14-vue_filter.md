---
title: Vue Filter Note
description: 全局过滤器的使用笔记。
categories:
 - technology
tags:
---

> 一个使用过滤器的总结。

### 1、本地过滤器

我们日常开发中，从后端获取到的数据很有可能不是我们需要的格式，比如我们获取到一个手机号，需要隐藏中间四位，这个时候需要用到过滤器：

```javascript
// ...
{% raw %}
<div>{{phone | phoneFilter}}</div>
{% endraw %}
// ...
export default {
    // ...
    filters: {
        phoneFilter(val) {
            return val.substr(0, 3) + "****" + val.substr(7);
        }
    },
}
```
或者在v-bind中使用：

```javascript
// ...
<div v-bind:id="phone | phoneFilter"></div>
```

而且，在vue模板中，过滤器可以多个一起使用：

```javascript
{% raw %}
<div>{{phone | phoneFilter | spaceFilter}}</div>
{% endraw %}
```

上述代码中，phoneFilter被定义为接收单个参数的过滤器，表达式将phone的值作为参数传入过滤器函数中，然后将获得的结果继续传给spaceFilter。

```javascript
{% raw %}
<div>{{phone | phoneFilter('str', arg)}}</div>
{% endraw %}
```

上述代码中，filterA作为一个过滤器，接收第一个参数phone，普通字符串str为第二参数，表达式arg为第三个参数。

我们需要知道：

#### 1）过滤器不能代替methods、computed和watch;

#### 2）过滤器不能真正改变data，只是改变渲染结果，并返回过滤后的数据；

#### 3）在Vue 2.0中已经没有内置的过滤器了，我们可以自定义过滤器。[旧的内置过滤器的完整列表](https://011.vuejs.org/api/filters.html)

#### 4）在正常开发情况下，我们会遇到多页组件都需要使用相同的过滤器，过滤器支持被封装成全局模式。

### 2、全局过滤器

注册全局过滤器：

```javascript
src文件夹下
main.js文件中：
// ...
import filter from './filter';
Vue.filter('reverse', value => {
    return value.split('').reverse().join('');
});
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
});
```

也可以写成：

```javascript
src文件夹下
filter.js文件中：
export default function(Vue){
	Vue.filter('reverse', value => {
	  return value.split('').reverse().join('');
	});
}
main.js文件中：
// ...
import filter from './filter';
filter(Vue);//这种写法相对模块化，把要用到的全局过滤器整理到一起，易于维护
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
});
```

获取全局过滤器：

```javascript
{% raw %}
<div>{{phone | reverse}}</div>
{% endraw %}
```

### 3、注意事项

#### 1）在项目的所有子组件内可以访问全局过滤器，但是本地过滤器只有定了它的子组件能访问。

#### 2）过滤器定义必须始终位于Vue实例之上，否则你将会得到一个“Failed to resolve filter: xxxFilter ”的错误信息

参考文献：

[Vue.filter](https://cn.vuejs.org/v2/api/#Vue-filter)

[过滤器](https://cn.vuejs.org/v2/guide/filters.html)

[Vue 2.0的学习笔记：Vue的过滤器](http://www.cnblogs.com/xuqp/p/9395269.html)