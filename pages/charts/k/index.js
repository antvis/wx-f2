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
      lazyLoad: true // 延迟加载组件
    },
    requestData: null // 异步请求获取的数据
  },

  onLoad() {
    // 异步获取数据
    const self = this;
    wx.request({
      url: 'https://antv.alipay.com/assets/data/candle-sticks.json',
      success: function (res) {
        let data = res.data;
        self.chartComponent = self.selectComponent('#kChart');  
        self.chartComponent.init((F2, canvas, width, height) => {
          // 获取组件的 canvas、width、height 后的回调函数
          // 开始初始化图表
          data = data.slice(0, 50); // 为了显示美观仅显示 100 个
          data.sort(function (obj1, obj2) {
            return obj1.time > obj2.time ? 1 : -1;
          });
          data.forEach(function (obj) {
            obj.range = [obj.start, obj.end, obj.max, obj.min];
            obj.trend = (obj.start <= obj.end) ? 0 : 1;
          });
          const chart = new F2.Chart({
            el: canvas,
            width,
            height
          });

          chart.source(data, {
            range: {
              tickCount: 5
            },
            time: {
              tickCount: 3
            }
          });

          chart.axis('time', {
            label(text, index, total) {
              const cfg = {
                textAlign: 'center'
              };
              // 第一个点左对齐，最后一个点右对齐，其余居中，只有一个点时左对齐
              if (index === 0) {
                cfg.textAlign = 'start';
              }
              if (index > 0 && index === total - 1) {
                cfg.textAlign = 'end';
              }
              return cfg;
            }
          });
          chart.legend({
            custom: true,
            itemWidth: null,
            items: [
              { name: '上涨', marker: 'circle', fill: '#FC674D' },
              { name: '下降', marker: 'circle', fill: '#9AC2AB' },
            ]
          });
          chart.tooltip({
            showCrosshairs: true
          });
          chart.schema().position('time*range')
            .color('trend', function (trend) {
              return ['#FC674D', '#fff'][trend];
            })
            .shape('candle')
            .style('trend', {
              stroke(val) {
                if (val === 1) {
                  return '#9AC2AB';
                }
              }
            });
          chart.render();
          self.chart = chart;
          return chart;
        });
      }
    })  
  }
});
