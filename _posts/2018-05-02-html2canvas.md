---
title: Html2canvas Note
description: This is a summary note using html2canvas to create transparent pictures.
categories:
 - technology
tags:
---

> 如何利用html2canvas生成透明图片

#### 最近在做的业务中，需要将带有圆角样式（border-radius）的div转化成图片，一开始使用html2canvas去做转化，但1.0.0版本的生成的图片会把透明背景变成白色。

代码：
```sh
dropImg () {
    let img_target = this.$refs.copyImageArea, res, self = this;
    let w = $('.drop-img').width(), h = $('.drop-img').height();
    let param = {
        allowTaint: false, //允许污染
        taintTest: true, //在渲染前测试图片(没整明白有啥用)
        scale: 2, // 添加的scale 参数 2是为了兼容安卓端模糊
        logging: false, //日志开关，发布的时候记得改成false
        useCORS: true,
        width: w,
        height: h
    };
    html2canvas(img_target, param).then((canvas) => {
        let res = canvas.toDataURL("image/png");
        self.downloadUrl = res;//最后的base64为编码的图片路径
    });
}
```
* 实际效果(请放大看效果)
![图片]({{site.url}}/assets/images/note/html2canvas.png)

#### 图片中的透明背景变成了白色，不是我们想要的效果，在查(fu)阅(zhi)资(dai)料(ma)和各种尝(beng)试(kui)后，发现需要给html2canvas库降级为0.4.0，这样才会支持透明背景，调用方法区别于1.0.0。

代码：
```sh
dropImg () {
    let img_target = this.$refs.copyImageArea, res, self = this;
    let w = $('.drop-img').width(), h = $('.drop-img').height();
    html2png(img_target, {
        allowTaint: false,
        taintTest: true,
        scale: 2,
        logging: false,
        useCORS: true,
        width: w,
        height: h,
        onrendered: function(canvas) {
            let res = canvas.toDataURL("image/png");
            self.downloadUrl = res.toString();//由于res不是字符串，因此需要手动转化
        }
    });
}
```
* 实际效果(请放大看效果)
!![图片]({{site.url}}/assets/images/note/html2canvas1.png)


##### 1、html2canvas1.0.0不支持透明背景的图片，image/png会变成白色；若参数是image/jpeg 会变成黑色。
##### 2、相同功能的库domtoimage支持透明背景，但不支持iphone 报错：SECURITY_ERR: DOM Exception 18: The operation is insecure
据说是因为iphone里的canvas.toDataURL被污染。

解决方法 如static/dom-to-image.js（git地址） 但是如果在iphone里返回canvas 则不能长按保存图片(坑)
综上所述 将html2canvas降级为0.4.1 源码参考static/html2png.min.js（git地址）

补充：
1、html2canvas0.4.0不支持overflow:hidden，因此还需要具体情况具体分析。
2、html2canvas转化成图片最好不要给要转化的dom元素设置媒体查询样式，生成的图片容易样式错乱。

扩展：在PC端生成base64位编码格式图片后的下载方法

代码：
```sh
/**
 * @describe 下载图片
 * @public
 * @param {String} fileName 下载的文件名称
 * @param {String} content 生成图片的base64位编码路径 (带有';base64'字样)
 * @return undefined
 */
downloadFile (fileName, content) {
    let aLink = document.createElement('a');
    let blob = this.base64ToBlob(content); //new Blob([content]);
    let evt = document.createEvent("HTMLEvents");
    evt.initEvent("click", true, true);//initEvent 不加后两个参数在FF下会报错  事件类型，是否冒泡，是否阻止浏览器的默认行为
    aLink.download = fileName;
    aLink.href = URL.createObjectURL(blob);
    aLink.click();
}

/**
 * @describe 转化base64代码为blob
 * @public
 * @param {String} code 生成图片的base64位编码路径
 * @return {Object} 支持浏览器下载的blob对象
 */
base64ToBlob(code) {
    let parts = code.split(';base64,');
    let contentType = parts[0].split(':')[1];
    let raw = window.atob(parts[1]);
    let rawLength = raw.length;
    let uInt8Array = new Uint8Array(rawLength);
    for (let i = 0; i < rawLength; ++i) {
        uInt8Array[i] = raw.charCodeAt(i);
    }
    return new Blob([uInt8Array], {type: contentType});
}
```

dom-to-image生成图片

代码：
```sh
dropImgs () {
    let tempNode = $('.drop-img')[0],
        w = $('.drop-img').width(),
        h = $('.drop-img').height();
    domtoimage.toPng(tempNode,{width: w,height: h}).then((dataUrl)=> {
        try {
            this.downloadUrl = dataUrl;
        } catch (err) {
            alert('图片生成失败，请重试！');
        }
    }).catch(function (error) {
        alert(JSON.stringify(error));
    });
}
```