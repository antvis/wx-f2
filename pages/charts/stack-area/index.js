function initChart(canvas, width, height, F2) {
  const arr = [
    { type: "湿度/%", value: 66.4, date: "2018-06-01 10:04:00" },
    { type: "温度/℃", value: 24.8, date: "2018-06-01 10:04:00" },
    { type: "湿度/%", value: 66.9, date: "2018-06-01 10:05:00" },
    { type: "温度/℃", value: 24.6, date: "2018-06-01 10:05:00" },
    { type: "湿度/%", value: 68.7, date: "2018-06-01 10:06:00" },
    { type: "温度/℃", value: 24.5, date: "2018-06-01 10:06:00" },
    { type: "湿度/%", value: 68, date: "2018-06-01 10:07:00" },
    { type: "温度/℃", value: 24.4, date: "2018-06-01 10:07:00" },
    { type: "湿度/%", value: 68.3, date: "2018-06-01 10:08:00" },
    { type: "温度/℃", value: 24.2, date: "2018-06-01 10:08:00" },
    { type: "湿度/%", value: 68.5, date: "2018-06-01 10:09:00" },
    { type: "温度/℃", value: 24.1, date: "2018-06-01 10:09:00" },
    { type: "湿度/%", value: 68.9, date: "2018-06-01 10:10:00" },
    { type: "温度/℃", value: 24, date: "2018-06-01 10:10:00" },
    { type: "湿度/%", value: 69.3, date: "2018-06-01 10:11:00" },
    { type: "温度/℃", value: 23.9, date: "2018-06-01 10:11:00" },
    { type: "湿度/%", value: 69.6, date: "2018-06-01 10:12:00" },
    { type: "温度/℃", value: 23.8, date: "2018-06-01 10:12:00" },
    { type: "湿度/%", value: 69.7, date: "2018-06-01 10:13:00" },
    { type: "温度/℃", value: 23.7, date: "2018-06-01 10:13:00" },
    { type: "湿度/%", value: 69.9, date: "2018-06-01 10:14:00" },
    { type: "温度/℃", value: 23.6, date: "2018-06-01 10:14:00" },
    { type: "湿度/%", value: 70.3, date: "2018-06-01 10:15:00" },
    { type: "温度/℃", value: 23.5, date: "2018-06-01 10:15:00" },
    { type: "湿度/%", value: 70.4, date: "2018-06-01 10:16:00" },
    { type: "温度/℃", value: 23.5, date: "2018-06-01 10:16:00" },
    { type: "湿度/%", value: 70.7, date: "2018-06-01 10:17:00" },
    { type: "温度/℃", value: 23.4, date: "2018-06-01 10:17:00" },
    { type: "湿度/%", value: 70.6, date: "2018-06-01 10:18:00" },
    { type: "温度/℃", value: 23.4, date: "2018-06-01 10:18:00" },
    { type: "湿度/%", value: 70.9, date: "2018-06-01 10:19:00" },
    { type: "温度/℃", value: 23.3, date: "2018-06-01 10:19:00" },
    { type: "湿度/%", value: 71.1, date: "2018-06-01 10:20:00" },
    { type: "温度/℃", value: 23.3, date: "2018-06-01 10:20:00" },
    { type: "湿度/%", value: 71.1, date: "2018-06-01 10:21:00" },
    { type: "温度/℃", value: 23.3, date: "2018-06-01 10:21:00" },
    { type: "湿度/%", value: 72.8, date: "2018-06-01 10:22:00" },
    { type: "温度/℃", value: 23.4, date: "2018-06-01 10:22:00" },
    { type: "湿度/%", value: 71.7, date: "2018-06-01 10:23:00" },
    { type: "温度/℃", value: 23.5, date: "2018-06-01 10:23:00" },
    { type: "湿度/%", value: 71.1, date: "2018-06-01 10:24:00" },
    { type: "温度/℃", value: 23.6, date: "2018-06-01 10:24:00" },
    { type: "湿度/%", value: 72, date: "2018-06-01 10:25:00" },
    { type: "温度/℃", value: 24.1, date: "2018-06-01 10:25:00" },
    { type: "湿度/%", value: null, date: "2018-06-01 10:26:00" },
    { type: "温度/℃", value: null, date: "2018-06-01 10:26:00" },
    { type: "湿度/%", value: null, date: "2018-06-01 10:27:00" },
    { type: "温度/℃", value: null, date: "2018-06-01 10:27:00" },
    { type: "湿度/%", value: null, date: "2018-06-01 10:28:00" },
    { type: "温度/℃", value: null, date: "2018-06-01 10:28:00" },
    { type: "湿度/%", value: null, date: "2018-06-01 10:29:00" },
    { type: "温度/℃", value: null, date: "2018-06-01 10:29:00" },
    { type: "湿度/%", value: 67.7, date: "2018-06-01 10:30:00" },
    { type: "温度/℃", value: 24.8, date: "2018-06-01 10:30:00" },
    { type: "湿度/%", value: 67.4, date: "2018-06-01 10:31:00" },
    { type: "温度/℃", value: 24.8, date: "2018-06-01 10:31:00" },
    { type: "湿度/%", value: 67.9, date: "2018-06-01 10:32:00" },
    { type: "温度/℃", value: 24.7, date: "2018-06-01 10:32:00" },
    { type: "湿度/%", value: 68, date: "2018-06-01 10:33:00" },
    { type: "温度/℃", value: 24.6, date: "2018-06-01 10:33:00" },
    { type: "湿度/%", value: 69, date: "2018-06-01 10:34:00" },
    { type: "温度/℃", value: 24.4, date: "2018-06-01 10:34:00" },
    { type: "湿度/%", value: 68.7, date: "2018-06-01 10:35:00" },
    { type: "温度/℃", value: 24.4, date: "2018-06-01 10:35:00" },
    { type: "湿度/%", value: 68.8, date: "2018-06-01 10:36:00" },
    { type: "温度/℃", value: 24.3, date: "2018-06-01 10:36:00" },
    { type: "湿度/%", value: 69, date: "2018-06-01 10:37:00" },
    { type: "温度/℃", value: 24.1, date: "2018-06-01 10:37:00" },
    { type: "湿度/%", value: 69.3, date: "2018-06-01 10:38:00" },
    { type: "温度/℃", value: 24, date: "2018-06-01 10:38:00" },
    { type: "湿度/%", value: 69.5, date: "2018-06-01 10:39:00" },
    { type: "温度/℃", value: 23.9, date: "2018-06-01 10:39:00" },
    { type: "湿度/%", value: 69.6, date: "2018-06-01 10:40:00" },
    { type: "温度/℃", value: 23.8, date: "2018-06-01 10:40:00" },
    { type: "湿度/%", value: 69.8, date: "2018-06-01 10:41:00" },
    { type: "温度/℃", value: 23.8, date: "2018-06-01 10:41:00" },
    { type: "湿度/%", value: 69.9, date: "2018-06-01 10:42:00" },
    { type: "温度/℃", value: 23.7, date: "2018-06-01 10:42:00" },
    { type: "湿度/%", value: 70, date: "2018-06-01 10:43:00" },
    { type: "温度/℃", value: 23.7, date: "2018-06-01 10:43:00" },
    { type: "湿度/%", value: 70.1, date: "2018-06-01 10:44:00" },
    { type: "温度/℃", value: 23.6, date: "2018-06-01 10:44:00" },
    { type: "湿度/%", value: 70.2, date: "2018-06-01 10:45:00" },
    { type: "温度/℃", value: 23.6, date: "2018-06-01 10:45:00" },
    { type: "湿度/%", value: 70.2, date: "2018-06-01 10:46:00" },
    { type: "温度/℃", value: 23.5, date: "2018-06-01 10:46:00" },
    { type: "湿度/%", value: 70.3, date: "2018-06-01 10:47:00" },
    { type: "温度/℃", value: 23.5, date: "2018-06-01 10:47:00" },
    { type: "湿度/%", value: 70.3, date: "2018-06-01 10:48:00" },
    { type: "温度/℃", value: 23.5, date: "2018-06-01 10:48:00" },
    { type: "湿度/%", value: 70.3, date: "2018-06-01 10:49:00" },
    { type: "温度/℃", value: 23.5, date: "2018-06-01 10:49:00" },
    { type: "湿度/%", value: 70.4, date: "2018-06-01 10:50:00" },
    { type: "温度/℃", value: 23.5, date: "2018-06-01 10:50:00" },
    { type: "湿度/%", value: 70.4, date: "2018-06-01 10:51:00" },
    { type: "温度/℃", value: 23.5, date: "2018-06-01 10:51:00" },
    { type: "湿度/%", value: 70.3, date: "2018-06-01 10:52:00" },
    { type: "温度/℃", value: 23.5, date: "2018-06-01 10:52:00" },
    { type: "湿度/%", value: 70.3, date: "2018-06-01 10:53:00" },
    { type: "温度/℃", value: 23.5, date: "2018-06-01 10:53:00" },
    { type: "湿度/%", value: 70.2, date: "2018-06-01 10:54:00" },
    { type: "温度/℃", value: 23.5, date: "2018-06-01 10:54:00" },
    { type: "湿度/%", value: 70.2, date: "2018-06-01 10:55:00" },
    { type: "温度/℃", value: 23.4, date: "2018-06-01 10:55:00" },
    { type: "湿度/%", value: 70.2, date: "2018-06-01 10:56:00" },
    { type: "温度/℃", value: 23.4, date: "2018-06-01 10:56:00" },
    { type: "湿度/%", value: 70.2, date: "2018-06-01 10:57:00" },
    { type: "温度/℃", value: 23.4, date: "2018-06-01 10:57:00" },
    { type: "湿度/%", value: 70.1, date: "2018-06-01 10:58:00" },
    { type: "温度/℃", value: 23.4, date: "2018-06-01 10:58:00" },
    { type: "湿度/%", value: 70.2, date: "2018-06-01 10:59:00" },
    { type: "温度/℃", value: 23.4, date: "2018-06-01 10:59:00" },
    { type: "湿度/%", value: 70.1, date: "2018-06-01 11:00:00" },
    { type: "温度/℃", value: 23.3, date: "2018-06-01 11:00:00" },
    { type: "湿度/%", value: 70, date: "2018-06-01 11:01:00" },
    { type: "温度/℃", value: 23.3, date: "2018-06-01 11:01:00" },
    { type: "湿度/%", value: 70, date: "2018-06-01 11:02:00" },
    { type: "温度/℃", value: 23.4, date: "2018-06-01 11:02:00" },
    { type: "湿度/%", value: 70, date: "2018-06-01 11:03:00" },
    { type: "温度/℃", value: 23.3, date: "2018-06-01 11:03:00" },
    { type: "湿度/%", value: 69.9, date: "2018-06-01 11:04:00" },
    { type: "温度/℃", value: 23.3, date: "2018-06-01 11:04:00" },
    { type: "湿度/%", value: 69.9, date: "2018-06-01 11:05:00" },
    { type: "温度/℃", value: 23.3, date: "2018-06-01 11:05:00" },
    { type: "湿度/%", value: 69.9, date: "2018-06-01 11:06:00" },
    { type: "温度/℃", value: 23.3, date: "2018-06-01 11:06:00" },
    { type: "湿度/%", value: 69.8, date: "2018-06-01 11:07:00" },
    { type: "温度/℃", value: 23.3, date: "2018-06-01 11:07:00" },
    { type: "湿度/%", value: 69.8, date: "2018-06-01 11:08:00" },
    { type: "温度/℃", value: 23.3, date: "2018-06-01 11:08:00" },
    { type: "湿度/%", value: null, date: "2018-06-01 11:09:00" },
    { type: "温度/℃", value: null, date: "2018-06-01 11:09:00" }
  ]
  const chart = new F2.Chart({
    el: canvas,
    width,
    height
  });
  chart.source(arr, {
    'date': {
      type: 'timeCat',
      mask: 'HH:mm',
      tickCount: 6,
      range: [0, 1]
    },
    'value': {
      type: 'linear',
      tickCount: 5,
    }
  });
  chart.axis('date', {
    label(text, index, total) {
      const cfg = {
        textAlign: 'center'
      };
      if (index === 0) {
        cfg.textAlign = 'left';
      }
      if (index > 0 && index === total - 1) {
        cfg.textAlign = 'right';
      }
      return cfg;
    }
  });
  chart.tooltip({
    showCrosshairs: true,
    custom: true, // 自定义 tooltip 内容框
    onChange(obj) {
      const legend = chart.get('legendController').legends.top[0];
      const tooltipItems = obj.items;
      const legendItems = legend.items;
      const map = {};
      legendItems.map(item => {
        map[item.name] = Object.assign({}, item);
      });
      tooltipItems.map(item => {
        const { name, value, title } = item;
        if (map[name]) {
          map[name].value = `${value}|${title}`;
        }
      });
      legend.setItems(Object.values(map));
    },
    onHide() {
      const legend = chart.get('legendController').legends.top[0];
      legend.setItems(chart.getLegendItems().country);
    }
  });
  chart.area().position('date*value').color('type');
  chart.line().position('date*value').color('type');
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
