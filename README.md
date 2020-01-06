# F2 微信小程序

F2 的微信小程序版本，支持原生 [F2](https://f2.antv.vision/) 的所有功能，欢迎使用反馈。

## 快速体验

- 微信扫码体验

![](https://gw.alipayobjects.com/zos/rmsportal/wmRJtPHkkoimGbPCeScc.jpg#align=left&display=inline&height=344&originHeight=344&originWidth=344&status=done&style=none&width=344)

- 使用微信开发者工具打开此项

## 说明
为了方便使用，我们封装了微信小程序的自定义组件，故需要微信小程序支持使用 npm 安装第三包。<br />**重要：版本要求**

1. 小程序基础库版本 2.7.0 或以上
1. 开发者工具 1.02.1808300 或以上开始，小程序支持使用 npm 安装第三方包。


## 如何使用
### 1. 安装依赖
```bash
npm install @antv/wx-f2 --save
```

安装好依赖包之后，点击工具顶部菜单栏的详情：

![](https://gw.alipayobjects.com/zos/rmsportal/sAYeeUhRjrchjvJONsvp.png#align=left&display=inline&height=314&originHeight=314&originWidth=582&status=done&style=none&width=582)

勾选“使用 npm 模块”选项：

![](https://gw.alipayobjects.com/zos/rmsportal/NLCSaOYDPNQVaIAZBoiC.png#align=left&display=inline&height=1596&originHeight=1596&originWidth=1054&status=done&style=none&width=1054)

最后点击开发者工具中的菜单栏：工具 --> 构建 npm 即可运行。

![](https://gw.alipayobjects.com/zos/rmsportal/kORAowbzpNioXseBQoxC.png#align=left&display=inline&height=746&originHeight=746&originWidth=392&status=done&style=none&width=392)

### 2. 使用自定义组件
#### 1. 打开json文件，引入组件
```json
{
  "usingComponents": {
    "f2": "@antv/wx-f2"
  }
}
```

#### 2. wxml 使用组件
```xml
<view class="container">
  <f2 onInit="{{onInitChart}}" />
</view>
```

#### 3. 实例化图表
```xml
Page({
  data: {
    onInitChart(F2, config) {
      const chart = new F2.Chart(config);
      const data = [
        { value: 63.4, city: 'New York', date: '2011-10-01' },
        { value: 62.7, city: 'Alaska', date: '2011-10-01' },
        { value: 72.2, city: 'Austin', date: '2011-10-01' },
        { value: 58, city: 'New York', date: '2011-10-02' },
        { value: 59.9, city: 'Alaska', date: '2011-10-02' },
        { value: 67.7, city: 'Austin', date: '2011-10-02' },
        { value: 53.3, city: 'New York', date: '2011-10-03' },
        { value: 59.1, city: 'Alaska', date: '2011-10-03' },
        { value: 69.4, city: 'Austin', date: '2011-10-03' },
      ];
      chart.source(data, {
        date: {
          range: [0, 1],
          type: 'timeCat',
          mask: 'MM-DD'
        },
        value: {
          max: 300,
          tickCount: 4
        }
      });
      chart.area().position('date*value').color('city').adjust('stack');
      chart.line().position('date*value').color('city').adjust('stack');
      chart.render();
			// 注意：这里需要把chart实例return出来
      return chart;
    }
  },
});
```

## API

- F2 API 参见：[https://f2.antv.vision/zh/docs/api/f2](https://f2.antv.vision/zh/docs/api/f2)

## 如何贡献

如果您在使用的过程中碰到问题，可以先通过 [issues](https://github.com/antvis/wx-f2/issues) 看看有没有类似的 bug 或者建议。

## License

[MIT license](https://github.com/antvis/wx-f2/blob/master/LICENSE)
