
>一个对于RN的stylesheet的简单描述。

某天跟香梨小可爱请教，写在Stylesheet里的fontSize到底是以什么为单位，小可爱："应该是px吧？？"，我："不应该吧，要适应移动端呢～会不会是em或者rem啥的？？"，小可爱："那我查一下吧～"，我："好～"。
因此决定好好鼓捣一下Stylesheet到底是个啥！

### 一、代码实例与样式集合

#### 1、实例

```javascript
let styles = StyleSheet.create({    
    background:{backgroundColor:'#fcfcfc'},
    fontSize: 18,
});
```

可以看出，通过Stylesheet定义样式是创建一个对象，在引用时，将创建的对象的某一个或某几个属性赋给要添加样式的元素，例：

```javascript
    <View style={styles.background}></View>
    <View style={[styles.background, styles.fontSize]}></View>
```

#### 1、样式集合

网上找了一篇写的比较完整清晰的文章贴出来，我就不自己整理了（行吧我懒）。

[React-Native 样式指南](https://blog.csdn.net/xiangzhihong8/article/details/81229085)

### 二、单位pt

在Stylesheet中，宽高字体大小等样式的单位都是pt，那么什么是pt呢，跟我们平时使用的px有什么区别呢？

pt是苹果公司引入的point的概念，也就是所谓的逻辑像素，至于为什么会引入这个单位以及跟其他单位的区别，可以参考：[移动前端像素知识](https://www.jianshu.com/p/b94f57b1f6e9)。

在react-native中，访问设备像素密度方法由一个PixelRatio类来提供，由于每个设备上的像素密度是不同的，因此定义了相同像素的样式，实际在各设备中展示出来的却不相同：比如定义了边框1像素，在iphone6显示为2像素，iphone6p显示为3像素。
还有图片也会因为像素密度不同，产生失真模糊等现象。

下面来看看react-native中的PixelRatio类，代码如下：

```javascript

'use strict';

var Dimensions = require('Dimensions');

class PixelRatio {
    /**
     * @description 获取像素密度方法，不同设备的返回值如下
     * @return 1：mdpi Android devices（160 dpi）
     *         1.5：hdpi Android devices（240 dpi）
     *         2：iphone 4，4s，5，5s，5c，6，6s，7
     *            xhdip Android devices（320 dpi）
     *         3：iphone 6 plus，6s plus，7 plus
     *            xxhdpi Android devices（480 dpi）
     *         3.5：Nexus 6
     */
    static get(): number {
        return Dimensions.get('window').scale;
    }
    /**
     * @description 返回字体大小缩放比例，这个比例可用于计算绝对字体的大小，所以很多深度以来字体大小的组件都需要用此函数的结果计算。
     * 如果没有设置字体的大小，它会直接返回设备的像素密度。
     * 目前此函数 仅仅在Android设备上实现了，它在用户选项中的"设置 > 显示 > 字体大小"，在ios设备上它直接返回默认像素密度。
     */
    static getFontScale(): number {
        return Dimensions.get('window').fontScale || PixelRatio.get();
    }
    /**
     * @description 将一个布局尺寸(dp)转为像素尺寸(px)
     * @return 一个整数
     */
    static getPixelSizeForLayoutSize(layoutSize: number): number {
        return Math.round(layoutSize * PixelRatio.get());
    }
    /**
     * @description 将布局尺寸（dp）四舍五入到与整数像素最接近的布局大小，
     * 例如：在像素密度为3的设备上，PixelRatio.RoundToneStPixel（8.4）=8.33
     * 正好对应（8.33*3）= 25 像素。
     */
    static roundToNearestPixel(layoutSize: number): number {
        var ratio = PixelRatio.get();
        return Math.round(layoutSize * ratio) / ratio;
    }
}

module.exports = PixelRatio;
```

因此，为了解决在各个设备中，边框显示不同的问题，可以这样做：

```javascript
let styles = StyleSheet.create({
    box: {
        borderWidth: 1 / PixelRatio.get(),
        borderStyle: 'solid'
    }
});
```

通过修改移动端meta的viewport可以对像素密度进行修改，也就是说如果屏幕缩放过，可能看不到这条细线。

### 三、Stylesheet中定义的样式跟普通css的区别

#### 1、rn的布局基本是采用flex来实现，比起PC端的float、position来说利用flex布局按照设计图来实现页面是很容易的事；

#### 2、样式的属性名全部采用驼峰式命名，如果属性值是一个字符串，要加引号；

#### 3、引用时位置越靠后的样式优先级越高，而传统css样式表中，定义的位置与靠后优先级越高；

#### 4、View类似于DIV，会默认占用容器的100%的宽度；

#### 5、rn元素的绝对定位和相对定位不需要父元素设置position，且没有zIndex配置；

#### 6、不能以偏概全说rn的inline元素不能设置marginTop、marginBottom；但是包裹在View元素中的Text表现为block，可以设置margin和padding的各种属性；包裹在Text元素中的Text表现为inline元素，不能设置其marginTop和marginBottom， padding等用于block元素的属性；

#### 7、样式的继承只存在于Text元素内的Text元素，换句话说是Text元素里面的Text元素存在继承；继承的规则是子Text元素继承祖先Text和父Text元素的样式整合后的样式。

### 四、Stylesheet源码解析

```javascript

'use strict';

var PixelRatio = require('PixelRatio');
var ReactNativePropRegistry = require('ReactNativePropRegistry');
var ReactNativeStyleAttributes = require('ReactNativeStyleAttributes');
var StyleSheetValidation = require('StyleSheetValidation');

var flatten = require('flattenStyle');

export type Styles = {[key: string]: Object};
export type StyleSheet<S: Styles> = {[key: $Keys<S>]: number};

//用来定义当前平台最细的宽度 如果它的值为0，给出一个不为0的默认值
var hairlineWidth = PixelRatio.roundToNearestPixel(0.4);
if (hairlineWidth === 0) {
    hairlineWidth = 1 / PixelRatio.get();
}

//一个绝对定位并铺满其父元素的样式
const absoluteFillObject = {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
};
//将这个绝对定位的样式注册到reactnative中
const absoluteFill = ReactNativePropRegistry.register(absoluteFillObject);

module.exports = {
  
    hairlineWidth,
  
    absoluteFill,

    absoluteFillObject,
    //当传递的参数是多个样式对象时，该方法用来合并它们；
    //如果传递的是单个的样式对象，该方法用来返回此样式对象对应的uniqueID
    flatten,
    //用于处理设置样式的颜色和转换值，
    //必须是在使用者很明确自己需要什么样的数据的情况下使用
    setStyleAttributePreprocessor(property: string, process: (nextProp: mixed) => mixed) {
        let value;

        if (typeof ReactNativeStyleAttributes[property] === 'string') {
            value = {};
        } else if (typeof ReactNativeStyleAttributes[property] === 'object') {
            value = ReactNativeStyleAttributes[property];
        } else {
            console.error(`${property} is not a valid style attribute`);
            return;
        }

        if (__DEV__ && typeof value.process === 'function') {
            console.warn(`Overwriting ${property} style attribute preprocessor`);
        }

        ReactNativeStyleAttributes[property] = { ...value, process };
    },

    //创建样式对象
    create<S: Styles>(obj: S): StyleSheet<S> {
        const result: StyleSheet<S> = {};
        for (var key in obj) {
            StyleSheetValidation.validateStyle(key, obj);
            //ReactNativePropRegistry.register返回的是一个uniqueID，
            //这里每一个key都对应一个uniqueID，设置组件样式的时候根据key获取到uniqueID，
            //再根据uniqueID获取对应样式。
            //这里之所以加了一个uniqueID关联，是因为防止在不同的组件中创建了相同名称的样式时产生错乱。
            result[key] = ReactNativePropRegistry.register(obj[key]);
        }
        return result;
    },
};

```

ReactNativePropRegistry类的源码：

```javascript
var objects = {};
var uniqueID = 1;
var emptyObject = {};

class ReactNativePropRegistry {
    //存储样式
    static register(object: Object): number {
        //uniqueID由1累加
        var id = ++uniqueID;
        if (__DEV__) {
            Object.freeze(object);
        }
        //样式储存在此object中
        objects[id] = object;
        return id;
    }
    //根据uniqueID获取对应样式
    static getByID(id: number): Object {
        //不传id时 返回一个空对象
        if (!id) {
          return emptyObject;
        }
    
        var object = objects[id];
        if (!object) {
          console.warn('Invalid style with id `' + id + '`. Skipping ...');
          return emptyObject;
        }
        return object;
    }
}
```



