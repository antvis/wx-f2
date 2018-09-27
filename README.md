# wx-f2

F2 的微信小程序版本，支持原生 [F2](https://antv.alipay.com/zh-cn/f2/3.x/index.html) 的所有功能，欢迎使用反馈。

## 快速体验

* 微信扫码体验

<img src="https://gw.alipayobjects.com/zos/rmsportal/wmRJtPHkkoimGbPCeScc.jpg" width="344">

* 使用微信开发者工具打开此项目

## 文档结构

本项目参考了 [echarts-for-weixin](https://github.com/ecomfe/echarts-for-weixin) 的封装思路，即封装一个自定义组件 <f2-canvas>，方便用户使用，该组件位于 `/f2-canvas` 目录下。

微信小程序自定义组件结构和使用请参考: [自定义组件](https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/)

以下是目录结构说明：

```bash
├── f2-canvas                    // f2-canvas 组件
│   ├── f2-canvas.js
│   ├── f2-canvas.json
│   ├── f2-canvas.wxml
│   ├── f2-canvas.wxss
│   └── lib                      // f2-canvas 组件依赖的类库
│       ├── EventEmitter.min.js  // 事件发射器，用于监听、触发事件， 3.1K
│       ├── f2.js                // f2 脚本（压缩），155K
│       └── renderer.js          // f2 专为适配微信小程序绘图上下文 context 而封装的伪 Canvas
├── pages                        // f2-canvas 组件使用示例
│  
```

## 下载

微信小程序已支持通过 npm install 来安装第三方的工具库。

**注意**

当前 `/f2-canvas/lib/` 目录下的 f2.js 文件为 3.2.0-beta.x 的完整版本（f2-all.js 支持图表交互）。如有必要，也可以由用户自己编译（如要使用 F2 的按需加载）替换。

## API

参见 F2 API：https://antv.alipay.com/zh-cn/f2/3.x/api/index.html

## 快速开始

下面我们就开始使用 `f2-canvas` 组件来绘制图表吧，这里假设用户已经初步了解微信小程序的基础框架，如不了解，请先阅读官网教程： [官方教程](https://developers.weixin.qq.com/miniprogram/dev/index.html)。

以绘制柱状图为例：

<img src="https://gw.alipayobjects.com/zos/rmsportal/aDmzXXwkPmUFLCXwXBvo.gif" width="332">

* STEP 1：npm install 安装wx-f2依赖，参见package.json
  ```js
  "dependencies": {
    "wx-f2-npm": "^1.0.2"
  }
  ```

* STEP 2：在 pages 目录下新建 column 目录，该目录需要包含以下几个文件：
  + index.js
  + index.json
  + index.wxml
  + index.wxss

  各个文件的内容如下：

  + `index.json` 配置文件，引入 f2-canvas 组件，这里需要注意路径要正确，由于微信小程序组件名不允许包含数字，所以这里将其命名为 ff-canvas

  ```js
  // index.json
  {
    "usingComponents": {
      "ff-canvas": "wx-f2-npm"
    }
  }
  ```

  + `index.wxml` 视图，使用 ff-canvas 组件，其中 `opts` 是一个我们在 index.js 中定义的对象，**必设属性**，它使得图表能够在页面加载后被初始化并设置，详见 index.js 中的使用。

  ```html
  <!--index.wxml-->
  <view class="container">
    <ff-canvas id="column-dom" canvas-id="column" opts="{{ opts }}"></ff-canvas>
  </view>
  ```

  + `index.js` 逻辑处理。** 需要注意，引用NPM包使用后，回调函数 initChart 存在不兼容变更，通过新增 F2 参数来获取 F2 对象上下文。 **

  ```js
  // index.js

  let chart = null;

  function initChart(F2, canvas, width, height) { // 使用 F2 绘制图表
    const data = [
      { year: '1951 年', sales: 38 },
      { year: '1952 年', sales: 52 },
      { year: '1956 年', sales: 61 },
      { year: '1957 年', sales: 145 },
      { year: '1958 年', sales: 48 },
      { year: '1959 年', sales: 38 },
      { year: '1960 年', sales: 38 },
      { year: '1962 年', sales: 38 },
    ];
    chart = new F2.Chart({
      el: canvas,
      width,
      height
    });

    chart.source(data, {
      sales: {
        tickCount: 5
      }
    });
    chart.tooltip({
      showItemMarker: false,
      onShow(ev) {
        const { items } = ev;
        items[0].name = null;
        items[0].name = items[0].title;
        items[0].value = '¥ ' + items[0].value;
      }
    });
    chart.interval().position('year*sales');
    chart.render();
    return chart;
  }

  Page({
    data: {
      opts: {
        onInit: initChart
      }
    },

    onReady() {
    }
  });
  ```

  由于 f2-canvas 组件主要是对小程序的画布上下文和 html5 canvas 的上下文进行了适配以支持 F2 在小程序端的渲染，所以 **F2 能绘制什么图表，小程序端就能绘制什么图表**，使用时也只需按照 F2 的语法来写即可。

  本项目只展示了部分 demos，更全的见 [AntV F2](https://antv.alipay.com/zh-cn/f2/3.x/demo/index.html)。

  需要注意的是，在创建 chart 的时候，需要使用 'el' 属性来指定容器，对应 `this.data.opts.onInit` 方法形参中的 `canvas` 属性，另外该方法还会返回 `width`, `height` 属性分别对应画布的宽和高。

  ```js
  chart = new F2.Chart({
    el: canvas,
    width,
    height
  });
  ```


## 不支持的功能

目前由于小程序不支持 document，所以 Guide.Html 辅助元素组件目前仍无法使用，其他 F2 的功能全部支持。


## 微信版本要求

* 微信版本 **>= 6.6.3**
* 基础库版本 **>= 2.2.1**
* 开发者工具版本 **>= 1.02.1808300**

## 常见问题

### 问题 1
按照 demo 实例操作，但是报如下错误：

```js
VM4466:1 TypeError: Cannot read property 'defaultView' of undefined
at Object.getStyle (f2.js? [sm]:1)
at Object.getWidth (f2.js? [sm]:1)
at t._initCanvas (f2.js? [sm]:1)
at new t (f2.js? [sm]:1)
at e._initCanvas (f2.js? [sm]:1)
at e._init (f2.js? [sm]:1)
at new e (f2.js? [sm]:1)
at Object.initChart [as onInit] (test.js? [sm]:18)
at t. (f2-canvas.js? [sm]:94)
at WAService.js:12
```

**解决**
检查是否有在 .wxss 文件中为 ff-canvas 组件定义 width 和 height 样式属性，如没有，加上即可，如此代码所示：https://github.com/antvis/wx-f2/blob/master/app.wxss#L16


## 如何贡献

如果您在使用的过程中碰到问题，可以先通过 [issues](https://github.com/antvis/wx-f2/issues) 看看有没有类似的 bug 或者建议。

## License

[MIT license](https://github.com/antvis/wx-f2/blob/master/LICENSE)
