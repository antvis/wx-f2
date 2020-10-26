
import F2 from '@antv/f2';

function wrapEvent(e) {
  if (!e) return;
  if (!e.preventDefault) {
    e.preventDefault = function () { };
  }
  return e;
}

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    onInit: {
      type: 'Function',
      value: () => { }
    },
    lazyLoad: {
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  ready() {
    if (this.data.lazyLoad) return
    const query = wx.createSelectorQuery().in(this);
    query.select('.f2-canvas')
      .fields({
        node: true,
        size: true
      })
      .exec(res => {
        const { node, width, height } = res[0];
        const context = node.getContext('2d');
        const pixelRatio = wx.getSystemInfoSync().pixelRatio;
        // 高清设置
        node.width = width * pixelRatio;
        node.height = height * pixelRatio;

        const config = { context, width, height, pixelRatio };
        const chart = this.data.onInit(F2, config);
        if (chart) {
          this.chart = chart;
          this.canvasEl = chart.get('el');
        }
      });
  },

  /**
   * 组件的方法列表
   */
  methods: {
    init(func) {
      const query = wx.createSelectorQuery().in(this)
      query.select('.f2-canvas')
        .fields({
          node: true,
          size: true
        })
        .exec(res => {
          const { node, width, height } = res[0]
          const context = node.getContext('2d')
          context.setTransform(1, 0, 0, 1, 0, 0)
          const pixelRatio = wx.getSystemInfoSync().pixelRatio
          // 高清设置
          node.width = width * pixelRatio
          node.height = height * pixelRatio

          const config = { context, width, height, pixelRatio }
          F2.Chart.plugins.register(PieLabel);
          const chart = func(F2, config)
          if (chart) {
            this.chart = chart
            this.canvasEl = chart.get('el')
          }
        })
    },
    touchStart(e) {
      const canvasEl = this.canvasEl;
      if (!canvasEl) {
        return;
      }
      canvasEl.dispatchEvent('touchstart', wrapEvent(e));
    },
    touchMove(e) {
      const canvasEl = this.canvasEl;
      if (!canvasEl) {
        return;
      }
      canvasEl.dispatchEvent('touchmove', wrapEvent(e));
    },
    touchEnd(e) {
      const canvasEl = this.canvasEl;
      if (!canvasEl) {
        return;
      }
      canvasEl.dispatchEvent('touchend', wrapEvent(e));
    }
  }
});
