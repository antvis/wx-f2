import F2 from '@antv/f2/f2-all.min.js';
import data from '../../../data/steps-pan.js'
let chart = null;

function formatNumber(n) {
  return String(Math.floor(n * 100) / 100).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function initChart(canvas, width, height) {
  const originDates = [];
  data.forEach(obj => {
    if (obj.date >= '2018-05-01') {
      originDates.push(obj.date);
    }
  });

  chart = new F2.Chart({
    el: canvas,
    width,
    height,
    animate: false
  });

  chart.source(data, {
    date: {
      type: 'timeCat',
      tickCount: 5,
      values: originDates,
      mask: 'MM-DD'
    },
    steps: {
      tickCount: 5
    }
  });

  chart.axis('date', {
    tickLine: {
      length: 4,
      stroke: '#cacaca'
    },
    label: {
      fill: '#cacaca'
    },
    line: {
      top: true
    }
  });
  chart.axis('steps', {
    position: 'right',
    label(text) {
      return {
        text: formatNumber(text * 1),
        fill: '#cacaca'
      };
    },
    grid: {
      stroke: '#d1d1d1'
    }
  });
  chart.tooltip({
    showItemMarker: false,
    background: {
      radius: 2,
      padding: [3, 5]
    },
    onShow(ev) {
      const items = ev.items;
      items[0].name = '';
      items[0].value = items[0].value + ' 步';
    }
  });
  chart.interval().position('date*steps').style({
    radius: [ 2, 2, 0, 0 ]
  });

  // 定义进度条
  chart.scrollBar({
    mode: 'x',
    xStyle: {
      backgroundColor: '#e8e8e8',
      fillerColor: '#808080',
      offsetY: -2
    }
  });
  chart.interaction('pan');
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
