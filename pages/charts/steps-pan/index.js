import F2 from '../../../f2-canvas/lib/f2';
import data from '../../../data/steps-pan.js'
let chart = null;

function formatNumber(n) {
  return String(Math.floor(n * 100) / 100).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function initChart(canvas, width, height) {
  var originDates = [];
  var originSteps = [];
  var firstDayArr = [];
  data.forEach(function (obj) {
    if (obj.date >= '2018-05-01') {
      originDates.push(obj.date);
      originSteps.push(obj.steps);
    }

    if (obj.first) {
      firstDayArr.push(obj);
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
      tickInterval: 5000,
      min: Math.min.apply(null, originSteps),
      max: Math.max.apply(null, originSteps)
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
    label: function label(text) {
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
      fill: '#FF5842',
      padding: [3, 5]
    },
    onShow: function onShow(ev) {
      var items = ev.items;
      items[0].name = '';
      items[0].value = items[0].value + ' 步';
    }
  });
  chart.interval().position('date*steps').color('#FF5842').style({
    radius: [2, 2, 0, 0]
  });

  chart.interaction('pan', {
    mode: 'x',
    onEnd: function onEnd() {
      var xScale = chart.getXScale();
      // timeCat 类型
      var source = chart.get('data');
      var yValues = [];
      source.map(function (obj) {
        var xValue = obj.date;
        if (xScale.translate(xValue) >= 0) {
          yValues.push(obj.steps);
        }
      });

      if (yValues.length) {
        var yMin = Math.min.apply(null, yValues);
        var yMax = Math.max.apply(null, yValues);

        chart.scale('steps', {
          min: yMin,
          max: yMax,
          tickInterval: 5000
        });
        chart.repaint();
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
