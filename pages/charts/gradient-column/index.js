import F2 from '../../../f2-canvas/lib/f2';

let chart = null;

function initChart(canvas, width, height) {
  // 获取 canvas 上下文对像
  const ctx = canvas.getContext('2d');
  // 创建 Y 方向的渐变对象，具体 gradient 接口参见：https://developers.weixin.qq.com/miniprogram/dev/api/canvas/gradient.html
  const grd = ctx.createLinearGradient(0, 0, width, height);
  grd.addColorStop(0, 'red')
  grd.addColorStop(1, 'white')

  const data = [
    { year: '1951 年', sales: 38 },
    { year: '1952 年', sales: 52 },
    { year: '1956 年', sales: 61 }
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
  chart.interval().position('year*sales').color(grd); // 使用创建的渐变色对象进行颜色填充
  chart.render();
  return chart;
}

Page({
  onShareAppMessage: function (res) {
    return {
      title: 'F2 微信小程序图表组件，你值得拥有~',
      path: '/pages/index/index',
      success: function () { },
      fail: function () { }
    }
  },
  data: {
    opts: {
      onInit: initChart
    }
  },

  onReady() {
  }
});
