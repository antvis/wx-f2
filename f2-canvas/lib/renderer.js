import EventEmitter from './EventEmitter.min.js'

const CAPITALIZED_ATTRS_MAP = {
  fontSize: 'FontSize',
  opacity: 'GlobalAlpha',
  lineDash: 'LineDash',
  textAlign: 'TextAlign',
};

/**
 * wxapp textAlign align 可选值为 left|center|right
 * 标准canvas textAlign align 可选值为 left|center|right|start|end
 */
const TEXT_ALIGN_MAP = {
  'start': 'left',
  'end': 'right',
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
          if (style == "textAlign") {
            value = TEXT_ALIGN_MAP[value] ? TEXT_ALIGN_MAP[value] : value;
          }
          const name = 'set' + CAPITALIZED_ATTRS_MAP[style];
          wxCtx[name](value);
        }
      });
    });
  }
}
