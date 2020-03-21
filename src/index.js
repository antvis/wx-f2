
import F2 from '@antv/f2';

Component({
  properties: {
    data: {
      type: 'Array',
      value: [],
      observer(data) {
        const { chart, node, triggerEvent } = this;
        if (chart) {
          chart.changeData(data);
          triggerEvent('upata', { data, chart, node });
        }
      }
    }
  },

  ready() {
    const query = wx.createSelectorQuery().in(this);
    query.select('.f2-canvas')
      .fields({
        node: true,
        size: true
      })
      .exec(res => {
        const { data: { data }, triggerEvent } = this;
        const { node, width, height } = res[0];
        const context = node.getContext('2d');
        const pixelRatio = wx.getSystemInfoSync().pixelRatio;
        // 高清设置
        node.width = width * pixelRatio;
        node.height = height * pixelRatio;

        const config = { context, width, height, pixelRatio };
        const chart = new F2.Chart(config);

        triggerEvent('draw', { data, chart, node });
        chart.render();
        triggerEvent('reload', { data, chart, node });

        this.chart = chart;
        this.canvasEl = chart.get('el');
        this.node = node;
      });
  },
  methods: {
    dispatch(event) {
      const canvasEl = this.canvasEl;
      if (!event.preventDefault) {
        event.preventDefault = function() {};
      }
      canvasEl.dispatchEvent(event.type, event);
    }
  }
});
