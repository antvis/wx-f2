# F2 微信小程序图表 Demo

F2 的微信小程序版本，支持原生 [F2](https://antv.alipay.com/zh-cn/f2/3.x/index.html) 的所有功能，欢迎使用反馈。

## 快速体验

* 微信扫码体验

<img src="https://gw.alipayobjects.com/zos/rmsportal/wmRJtPHkkoimGbPCeScc.jpg" width="344">

* 使用微信开发者工具打开此项目

## 如何使用

本 demo 图表使用微信小程序 F2 自定义图表组件 [f2-canvas]() 绘制，故需要微信小程序支持使用 npm 安装第三包。
**重要：版本要求**

1. 小程序基础库版本 2.2.1 或以上
2. 开发者工具 1.02.1808300 或以上开始，小程序支持使用 npm 安装第三方包。

> 如果需要使用原始版本，请 checkout 该项目的分支： https://github.com/antvis/wx-f2/tree/custom-components

使用微信开发者工具打开此项目，然后在项目根目录下运行：

```bash
npm install --production
```

安装好依赖包之后，点击工具顶部菜单栏的详情：

![image](https://gw.alipayobjects.com/zos/rmsportal/sAYeeUhRjrchjvJONsvp.png)

勾选“使用 npm 模块”选项：

![image](https://gw.alipayobjects.com/zos/rmsportal/NLCSaOYDPNQVaIAZBoiC.png)

最后点击开发者工具中的菜单栏：工具 --> 构建 npm 即可运行。

![image](https://gw.alipayobjects.com/zos/rmsportal/kORAowbzpNioXseBQoxC.png)

#### 说明

@antv/f2-canvas 模块为 F2 的微信小程序图表自定义组件，依赖于 @antv/wx-f2(F2 对于微信小程序进行的适配)，请直接使用 @antv/f2-canvas，如果需要单独引入 F2 全局变量时，请安装 @antv/wx-f2，如不需要，则不需要安装。


## API

* `@antv/f2-canvas` 的使用详见： https://github.com/antvis/f2-canvas

*  F2 API 参见：https://antv.alipay.com/zh-cn/f2/3.x/api/index.html

## 如何贡献

如果您在使用的过程中碰到问题，可以先通过 [issues](https://github.com/antvis/wx-f2/issues) 看看有没有类似的 bug 或者建议。

## License

[MIT license](https://github.com/antvis/wx-f2/blob/master/LICENSE)
