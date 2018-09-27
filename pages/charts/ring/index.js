let chart = null;

function initChart(F2, canvas, width, height) {
  const { Util, G } = F2;
  const { Group } = G;
  function drawLabel(shape, coord, canvas) {
    const { center } = coord;
    const origin = shape.get('origin');
    const points = origin.points;
    const x1 = (points[2].x - points[1].x) * 0.75 + points[1].x;
    const x2 = (points[2].x - points[1].x) * 1.8 + points[1].x;
    const y = (points[0].y + points[1].y) / 2;
    const point1 = coord.convertPoint({ x: x1, y });
    const point2 = coord.convertPoint({ x: x2, y });

    const group = new Group();
    group.addShape('Line', {
      attrs: {
        x1: point1.x,
        y1: point1.y,
        x2: point2.x,
        y2: point2.y,
        lineDash: [0, 2, 2],
        stroke: '#808080'
      }
    });
    const text = group.addShape('Text', {
      attrs: {
        x: point2.x,
        y: point2.y,
        text: origin._origin.type + '  ' + origin._origin.cost + ' 元',
        fill: '#808080',
        textAlign: 'left',
        textBaseline: 'bottom'
      }
    });
    const textWidth = text.getBBox().width;
    const baseLine = group.addShape('Line', {
      attrs: {
        x1: point2.x,
        y1: point2.y,
        x2: point2.x,
        y2: point2.y,
        stroke: '#808080'
      }
    });
    if (point2.x > center.x) {
      baseLine.attr('x2', point2.x + textWidth);
    } else if (point2.x < center.x) {
      text.attr('textAlign', 'right');
      baseLine.attr('x2', point2.x - textWidth);
    } else {
      text.attr('textAlign', 'center');
      text.attr('textBaseline', 'top');
    }
    canvas.add(group);
    shape.label = group;
  }

  const data = [
    { type: '饮食', cost: 669.47, a: '1' },
    { type: '服饰美容', cost: 338, a: '1' },
    { type: '健康', cost: 118.5, a: '1' },
    { type: '生活用品', cost: 78.64, a: '1' },
    { type: '其他', cost: 14.9, a: '1' },
    { type: '交通出行', cost: 8.7, a: '1' }
  ];

  let sum = 0;
  data.map(obj => {
    sum += obj.cost;
  });
  chart = new F2.Chart({
    el: canvas,
    width,
    height
  });
  chart.source(data);
  let lastClickedShape;
  chart.legend({
    position: 'bottom',
    offsetY: -5,
    marker: 'square',
    align: 'center',
    itemMarginBottom: 20,
    onClick(ev) {
      const { clickedItem } = ev;
      const dataValue = clickedItem.get('dataValue');
      const canvas = chart.get('canvas');
      const coord = chart.get('coord');
      const geom = chart.get('geoms')[0];
      const container = geom.get('container');
      const shapes = geom.get('shapes'); // 只有带精细动画的 geom 才有 shapes 这个属性

      let clickedShape;
      // 找到被点击的 shape
      Util.each(shapes, shape => {
        const origin = shape.get('origin');
        if (origin && origin._origin.type === dataValue) {
          clickedShape = shape;
          return false;
        }
      });

      if (lastClickedShape) {
        lastClickedShape.animate().to({
          attrs: {
            lineWidth: 0
          },
          duration: 200
        }).onStart(() => {
          if (lastClickedShape.label) {
            lastClickedShape.label.hide();
          }
        }).onEnd(() => {
          lastClickedShape.set('selected', false);
        });
      }

      if (clickedShape.get('selected')) {
        clickedShape.animate().to({
          attrs: {
            lineWidth: 0
          },
          duration: 200
        }).onStart(() => {
          if (clickedShape.label) {
            clickedShape.label.hide();
          }
        }).onEnd(() => {
          clickedShape.set('selected', false);
        });
      } else {
        const color = clickedShape.attr('fill');
        clickedShape.animate().to({
          attrs: {
            lineWidth: 5
          },
          duration: 350,
          easing: 'bounceOut'
        }).onStart(() => {
          clickedShape.attr('stroke', color);
          clickedShape.set('zIndex', 1);
          container.sort();
        }).onEnd(() => {
          clickedShape.set('selected', true);
          clickedShape.set('zIndex', 0);
          container.sort();
          lastClickedShape = clickedShape;
          if (clickedShape.label) {
            clickedShape.label.show();
          } else {
            drawLabel(clickedShape, coord, canvas);
          }
          canvas.draw();
        });
      }
    }
  });
  chart.coord('polar', {
    transposed: true,
    innerRadius: 0.7,
    radius: 0.5
  });
  chart.axis(false);
  chart.tooltip(false);
  chart.interval()
    .position('a*cost')
    .color('type', ['#1890FF', '#13C2C2', '#2FC25B', '#FACC14', '#F04864', '#8543E0'])
    .adjust('stack');

  chart.guide().text({
    position: ['50%', '50%'],
    content: sum.toFixed(2),
    style: {
      fontSize: 24
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
