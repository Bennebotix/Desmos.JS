var elementCounter = 0;
var defaultColorCounter = 0;
var defaultColors = ['#c74440', '#2d70b3', '#388c46', '#6042a6', '#000000'];

class Calculator {
  constructor(eqs = [], mode = 'e') {
    elementCounter = 0;
    
    const preview = {actions: !0, expressions: !1, settingsMenu: !1};
    const editor = {actions: !0};

    var calcElmnt = document.createElement('div');
    document.body.appendChild(calcElmnt);

    var calculator = Desmos.GraphingCalculator(calcElmnt, mode == 'e' ? editor : preview);

    this.json = { "version": 11, "randomSeed": "31f6cb0d39975c444562fec45e9618a9", "graph": { "viewport": { "xmin": -10, "ymin": -9.460227272727273, "xmax": 10, "ymax": 9.460227272727273 } }, "expressions": { "list": eqs }, "includeFunctionParametersInRandomSeed": true };

    if (eqs.length) {
      calculator.setState(this.json);
    } else {
      calc.setBlank();
    }
  }
}

class PlainEQ {
  constructor(opts = {}, overridingData = false) {
    var me = {};
    
    var defaults = {
      c: defaultColors[defaultColorCounter++ % 4],
      l: 'y=x',
      h: true,
      graphedEQ: true
    };
    opts = fillDefaults(opts, defaults);
    
    if (!overridingData) {
      me.type = "expression";
      me.id = ++elementCounter;
      me.latex = opts.l;

      if (opts.graphedEQ) {
        me.color = opts.c;
        opts.hasOwnProperty('h') ? me.hidden = opts.h : null;
        opts.hasOwnProperty('ls') ? me.lineStyle = opts.ls : null;
        opts.hasOwnProperty('lw') ? me.lineWidth = opts.lw : null;
        opts.hasOwnProperty('lo') ? me.lineOpacity = opts.lo : null;
        opts.hasOwnProperty('ld') ? me.description = opts.ld : null;
        opts.hasOwnProperty('lci') ? me.clickableInfo = filDefaults(opts.lci, { "enabled": true }) : null;
      }
    } else {
      me = overridingData;
    }
    
    return me;
  }
}

class Variable {
  constructor(opts = {}, overridingData = false) {
    if (opts.hasOwnProperty('n'))
    var me = {};
    
    var defaults = {
      v: 0
    };
    opts = fillDefaults(opts, defaults);
    
    if (!overridingData) {
      me.type = "expression";
      me.id = ++elementCounter;
      me.latex = opts.n + '=' + opts.v;
      opts.hasOwnProperty('sb') ? me.sliderBounds = fillDefaults(opts.sb, { min: '', max: '', step: '' }) : null;
    } else {
      me = overridingData;
    }
    
    return me;
  }
}

function fillDefaults(a, b) {
  var c = {};
  for (let key in b) {
    c[key] = (a.hasOwnProperty(key) ? a : b)[key];
  }
  for (let key in a) {
    !c.hasOwnProperty(key) ? c[key] = a[key] : null;
  }
  return c;
}
