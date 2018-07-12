module.exports = {
  directionEnabled: (mode, dir) => {
    if (mode === undefined) {
      return true;
    } else if (typeof mode === 'string') {
      return mode.indexOf(dir) !== -1;
    }

    return false;
  },
  getColDef(chart, field) {
    let colDef = {};
    if (chart.get('colDefs') && chart.get('colDefs')[field]) {
      colDef = chart.get('colDefs')[field];
    }
    return colDef;
  },
  isPointInPlot(point, plot) {
    const { x, y } = point;
    const { tl, tr, br } = plot;
    return (x >= tl.x && x <= tr.x && y >= tl.y && y <= br.y);
  }
};
