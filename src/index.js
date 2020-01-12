
import F2 from '@antv/f2';

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    onInit: {
      type: 'Function',
      value: () => {}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  ready() {
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
        this.chart = this.data.onInit(F2, config);
      });
  },

  /**
   * 组件的方法列表
   */
  methods: {
    touchStart(e) {
      if (this.chart) {
        this.chart.get('el').dispatchEvent('touchstart', e);
      }
    },
    touchMove(e) {
      if (this.chart) {
        this.chart.get('el').dispatchEvent('touchmove', e);
      }
    },
    touchEnd(e) {
      if (this.chart) {
        this.chart.get('el').dispatchEvent('touchend', e);
      }
    }
  }
});
