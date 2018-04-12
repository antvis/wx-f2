import F2 from '../../../f2-canvas/lib/f2';

let chart = null;

function initChart(canvas, width, height) {
  const Shape = F2.Shape;
  const data = [
    { pointer: '当前收益', value: 5, length: 2, y: 1.05 }
  ];
  //自定义绘制数据的的形状
  Shape.registerShape('point', 'dashBoard', {
    getPoints: function (cfg) {
      const x = cfg.x;
      const y = cfg.y;

      return [
        { x: x, y: y },
        { x: x, y: 0.4 }
      ];
    },
    draw: function (cfg, container) {
      let point1 = cfg.points[0];
      let point2 = cfg.points[1];
      point1 = this.parsePoint(point1);
      point2 = this.parsePoint(point2);

      const line = container.addShape('Polyline', {
        attrs: {
          points: [point1, point2],
          stroke: '#1890FF',
          lineWidth: 2
        }
      });

      const text = cfg.origin._origin.value.toString();
      const text1 = container.addShape('Text', {
        attrs: {
          text: text + '%',
          x: cfg.center.x,
          y: cfg.center.y,
          fill: '#1890FF',
          fontSize: 24,
          textAlign: 'center',
          textBaseline: 'bottom'
        }
      });
      const text2 = container.addShape('Text', {
        attrs: {
          text: cfg.origin._origin.pointer,
          x: cfg.center.x,
          y: cfg.center.y,
          fillStyle: '#ccc',
          textAlign: 'center',
          textBaseline: 'top'
        }
      });

      return [line, text1, text2];
    }
  });

  chart = new F2.Chart({
    el: canvas,
    width,
    height,
    animate: false
  });
  chart.source(data, {
    value: {
      type: 'linear',
      min: 0,
      max: 15,
      ticks: [0, 5, 7.5, 10, 15],
      nice: false
    },
    length: { type: 'linear', min: 0, max: 10 },
    y: { type: 'linear', min: 0, max: 1 }
  });

  chart.coord('polar', {
    inner: 0,
    startAngle: -1.25 * Math.PI,
    endAngle: 0.25 * Math.PI,
    radius: 0.8
  });

  //配置value轴刻度线
  chart.axis('value', {
    tickLine: {
      strokeStyle: '#ccc',
      lineWidth: 2,
      length: -5
    },
    label: null,
    grid: null,
    line: null
  });

  chart.axis('y', false);

  //绘制仪表盘辅助元素
  chart.guide().arc({
    start: [0, 1.05],
    end: [4.8, 1.05],
    style: {
      strokeStyle: '#1890FF',
      lineWidth: 5,
      lineCap: 'round'
    }
  });
  chart.guide().arc({
    start: [5.2, 1.05],
    end: [9.8, 1.05],
    style: {
      strokeStyle: '#ccc',
      lineWidth: 5,
      lineCap: 'round'
    }
  });
  chart.guide().arc({
    start: [10.2, 1.05],
    end: [15, 1.05],
    style: {
      strokeStyle: '#ccc',
      lineWidth: 5,
      lineCap: 'round'
    }
  });
  chart.guide().arc({
    start: [0, 1.2],
    end: [15, 1.2],
    style: {
      strokeStyle: '#ccc',
      lineWidth: 1
    }
  });

  chart.guide().text({
    position: [-0.5, 1.3],
    content: '0.00%',
    style: {
      fillStyle: '#ccc',
      font: '18px Arial',
      textAlign: 'center'
    }
  });
  chart.guide().text({
    position: [7.5, 0.7],
    content: '7.50%',
    style: {
      fillStyle: '#ccc',
      font: '18px Arial',
      textAlign: 'center'
    }
  });
  chart.guide().text({
    position: [15.5, 1.3],
    content: '15.00%',
    style: {
      fillStyle: '#ccc',
      font: '18px Arial',
      textAlign: 'center'
    }
  });

  chart.point().position('value*y')
    .size('length')
    .color('#1890FF')
    .shape('dashBoard');
  chart.render();
  return chart;
}

Page({
  data: {
    opts: {
      onInit: initChart
    }
  },

  onReady() {
  }
});
