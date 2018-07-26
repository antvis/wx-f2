import F2 from '../../../f2-canvas/lib/f2';
import data from '../../../data/sroll-line.js'
let chart = null;

function initChart(canvas, width, height) {
  const years = [];
  data.map(function (obj) {
    years.push(obj.release);
  });
  const min = Math.min.apply(null, years);
  const max = Math.max.apply(null, years);
  chart = new F2.Chart({
    el: canvas,
    width,
    height,
    animate: false
  });
  chart.source(data, {
    release: {
      min: 1990,
      max: 2010
    }
  });
  chart.tooltip({
    showCrosshairs: true,
    showItemMarker: false,
    background: {
      radius: 2,
      fill: '#1890FF',
      padding: [3, 5]
    },
    nameStyle: {
      fill: '#fff'
    },
    onShow: function onShow(ev) {
      const items = ev.items;
      items[0].name = items[0].title;
    }
  });
  chart.line().position('release*count');
  chart.point().position('release*count');

  chart.interaction('pan', {
    limitRange: {
      release: {
        min: min,
        max: max
      }
    }
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
