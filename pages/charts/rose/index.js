import F2 from '@antv/f2/f2-all.min.js';

let chart = null;

function initChart(canvas, width, height) {
  const data = [
    { year: '2001', population: 41.8 },
    { year: '2002', population: 25.8 },
    { year: '2003', population: 31.7 },
    { year: '2004', population: 46 },
    { year: '2005', population: 28 }
  ];

  chart = new F2.Chart({
    el: canvas,
    width,
    height
  });
  chart.source(data);
  chart.coord('polar');
  chart.legend({
    position: 'right'
  });
  chart.axis(false);
  chart.interval().position('year*population')
    .color('year')
    .style({
      lineWidth: 1,
      stroke: '#fff'
    });
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
