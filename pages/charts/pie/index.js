let chart = null;

function initChart(F2, canvas, width, height) {
  const map = {
    '芳华': '40%',
    '妖猫传': '20%',
    '机器之血': '18%',
    '心理罪': '15%',
    '寻梦环游记': '5%',
    '其他': '2%',
  };
  const data = [
    { name: '芳华', percent: 0.4, a: '1' },
    { name: '妖猫传', percent: 0.2, a: '1' },
    { name: '机器之血', percent: 0.18, a: '1' },
    { name: '心理罪', percent: 0.15, a: '1' },
    { name: '寻梦环游记', percent: 0.05, a: '1' },
    { name: '其他', percent: 0.02, a: '1' }
  ];
  chart = new F2.Chart({
    el: canvas,
    width,
    height
  });
  chart.source(data, {
    percent: {
      formatter(val) {
        return val * 100 + '%';
      }
    }
  });
  chart.legend({
    position: 'right',
    itemFormatter(val) {
      return val + '  ' + map[val];
    }
  });
  chart.tooltip(false);
  chart.coord('polar', {
    transposed: true,
    radius: 0.85
  });
  chart.axis(false);
  chart.interval()
    .position('a*percent')
    .color('name', ['#1890FF', '#13C2C2', '#2FC25B', '#FACC14', '#F04864', '#8543E0'])
    .adjust('stack')
    .style({
      lineWidth: 1,
      stroke: '#fff',
      lineJoin: 'round',
      lineCap: 'round'
    })
    .animate({
      appear: {
        duration: 1200,
        easing: 'bounceOut'
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
