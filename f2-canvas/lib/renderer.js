import EventEmitter from './EventEmitter.min.js'

const CAPITALIZED_ATTRS_MAP = {
  fillStyle: 'FillStyle',
  fontSize: 'FontSize',
  globalAlpha: 'GlobalAlpha',  
  opacity: 'GlobalAlpha',
  lineCap: 'LineCap',
  lineJoin: 'LineJoin',
  lineWidth: 'LineWidth',
  lineDash: 'LineDash',
  miterLimit: 'MiterLimit',
  strokeStyle: 'StrokeStyle',
  //textAlign: 'TextAlign',
  textBaseline: 'TextBaseline'
};

export default class Renderer extends EventEmitter {
  constructor(wxCtx) {
    super();
    const self = this;
    self.ctx = wxCtx;
    self.style = {}; // just mock
    self._initContext(wxCtx);
  }

  getContext(type) {
    if (type === '2d') {
      return this.ctx;
    }
  }

  _initContext(wxCtx) {
    Object.keys(CAPITALIZED_ATTRS_MAP).map(style => {
      Object.defineProperty(wxCtx, style, {
        set: value => {
          const name = 'set' + CAPITALIZED_ATTRS_MAP[style];
          wxCtx[name](value);
        }
      });
    });
  }
}
