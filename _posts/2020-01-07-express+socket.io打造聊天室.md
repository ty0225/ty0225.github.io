---
title: express+socket.io打造聊天室。
description: 
categories:
 - technology
tags:
---

> 闲来无事，准备学些node框架，从开发聊天室开始。

说到及时通讯，就要简单介绍下socket.io基本知识。

### 1、socket.io

网络上的两个程序通过一个双向的通信实现数据的交换，这个连接的一端称为socket(端口号)，socket的本质是编程接口，提供程序员做网络开发时可用的接口。socket提供网络通信的能力。

scoket.io是一个实现实时web通信的javascript库，其包含两部分：在浏览器运行的客户端库以及在node上运行的服务器库。


```javascript
    npm install socket.io
```

### 2、express

是一个简洁、灵活的node.js web应用框架，提供了一系列强大特性帮助我们创建各种web应用，和丰富的HTTP工具。

其核心特性：

- 设置中间件来相应HTTP请求；

- 定义路由表用于执行不同的HTTP请求动作；

- 可以通过向模板传递参数来动态渲染HTML页面。

```javascript
    npm install express
```

### 2、server.js

```javascript

let express = require('express');
let app = express();
let http = require('http').Server(app);
let io = require('socket.io')(http);

http.listen(3000, ()=>{
    console.log('listening on *:3000');
});

//托管 /www 为静态资源路径
app.use('/', express.static(__dirname + '/www'));

const users = [];
const userInfo = [];

//有用户连接时触发 io.emit会出发所有客户端用户的事件
io.on('connection', (socket)=>{
    console.log('a user connected');
    io.emit('displayUser', userInfo);
    //只触发当前用户的login事件
    socket.on('login', (user) => {
        if (users.indexOf(user.name) > -1) {//判断是否有重复的名字
            socket.emit('loginError');
        } else {
            users.push(user.name);
            userInfo.push(user);
            socket.emit('loginSuccess');
            socket.nickname = user.name;
            io.emit('system', {
                name: user.name,
                status: '进入'
            });
            io.emit('displayUser', userInfo);
            console.log(user.length + 'user connect.');
        }
    });

    socket.on('sendMsg', (data) => {
        const imgArr = userInfo.filter(item=>item.name === socket.nickname),
            img = imgArr.length ? imgArr[0].img : '',
            recevieData = {
                name: socket.nickname,
                img: img,
                msg: data.msg,
                color: data.color,
            };

        socket.broadcast.emit('receiveMsg', {
            ...recevieData,
            side: 'left'
        });

        socket.emit('receiveMsg', {
            ...recevieData,
            side: 'right',
        });
    });
});

```

### 3、chat-client.js

```javascript
    window.onload = () => {
        chatApp.init();
    };
    
    let chatApp = {
        socket: io(),
        elements: {},// 缓存元素
        init: () => {
            chatApp.bindEvent();
            chatApp.bindSocket();
        },
        getElementById: (id) => {
            if (!chatApp.elements[id]) {
                chatApp.elements[id] = document.getElementById(id);
            }
            return chatApp.elements[id];
        },
        bindEvent: () => {
            chatApp.getElementById('nameBtn').addEventListener('click', (e) => {
                const imgN = Math.floor(Math.random() * 4) + 1;
                if (name.value) {
                    socket.emit('login', {
                        name: name.value,
                        img: 'image/user' + imgN + '.jpg',
                    });
                }
                return false;
            });
        },
        bindSocket: () => {
            chatApp.socket.on('loginSuccess', () => {
                chatApp.getElementById('login').style.display = 'none';
            });
    
            chatApp.socket.on('loginError', () => {
                alert('用户名已存在，请重新输入！');
                chatApp.getElementById('name').value = '';
            });
    
            chatApp.socket.on('system', (user)=>{
                const time = new Date().toTimeString().substring(0, 8);
                const tpl = `<p class='system'><span>${time}</span><br/><span>${user.name} ${user.status}了聊天室</span></p>`;
                chatApp.getElementById('messages').appendChild(tpl);
            });
    
            chatApp.socket.on('displayUser', (usersInfo) => {
                chatApp.displayUser(usersInfo);
            });
        },
        displayUser: (users) => {
            chatApp.getElementById('users').innerText = '';
            chatApp.getElementById('num').innerText = users.length;
        },
    };

```





