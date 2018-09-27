Page({
  data: {
    charts: [
      { name: 'radial-bar', value: 'iwatch健康记录' },      
      { name: 'line', value: '折线图' },
      { name: 'area', value: '区域图' },
      { name: 'column', value: '柱状图' },
      { name: 'bar', value: '条形图' },
      { name: 'dodge', value: '分组柱状图' },
      { name: 'stackBar', value: '层叠条形图' },
      { name: 'ring', value: '环图' },
      { name: 'pie', value: '饼图' },
      { name: 'rose', value: '玫瑰图' },
      { name: 'radar', value: '雷达图' },
      { name: 'gauge', value: '仪表盘' },
      { name: 'double-axis', value: '双 Y 轴' },
      { name: 'k', value: 'K 线图(异步获取数据)' },
      { name: 'stack-area', value: '层叠区域图' },
      { name: 'multiCharts', value: '多图表好性能' }
    ],
    others: [
      { name: 'scroll-line', value: '线图平移交互(长按展示 tooltip)' },
      { name: 'steps-pan', value: '每日步数（柱状图平移）' },
      { name: 'pie-select', value: '饼图选中交互' },
      { name: 'column-select', value: '柱状图选中交互(可取消选中)' },
      { name: 'gradient-column', value: '渐变色柱状图' }
    ]
  },
  gotoPage: function (e) {
    var page = e.currentTarget.dataset.page;
    wx.navigateTo({
      url: '../charts/' + page + '/index'
    });
  },
  onLoad: function () {

  }
})