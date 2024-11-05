var elementCounter = 0;
var tableCounter = 0;
var defaultColorCounter = 0;
var defaultColors = ['#c74440', '#2d70b3', '#388c46', '#6042a6', '#000000'];
var varibleOrder = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

class Calculator {
  constructor(eqs = [], mode = 'e') {
    elementCounter = 0;
    
    const preview = {actions: !0, expressions: !1, settingsMenu: !1};
    const editor = {actions: !0};

    var calcElmnt = document.createElement('div');
    document.body.appendChild(calcElmnt);

    var calculator = Desmos.GraphingCalculator(calcElmnt, mode == 'e' ? editor : preview);

    this.json = new JSONStateCrafter(eqs);

    if (eqs.length) {
      calculator.setState(this.json);
    } else {
      calc.setBlank();
    }
  }
}

class JSONStateCrafter {
  constructor(eqs) {
    return {
      "version": 11,
      "randomSeed": UID(32),
      "graph": {
        "viewport": {
          "xmin": -10,
          "ymin": -9.460227272727273,
          "xmax": 10,
          "ymax": 9.460227272727273
        }
      },
      "expressions": {
        "list": eqs
      },
      "includeFunctionParametersInRandomSeed": true
    }
  }
}

class PlainEQ {
  constructor(opts = {}, overridingData = false) {
    var me = {};
    
    var defaults = {
      c: opts.grahpedEQ !== false ? defaultColors[defaultColorCounter++ % 4] : undefined,
      l: 'y=x',
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
        opts.hasOwnProperty('lci') ? me.clickableInfo = fillDefaults(opts.lci, { "enabled": true }) : null;
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
      opts.hasOwnProperty('sb') ? me.slider = this.fillSlider(opts.sb) : null;
    } else {
      me = overridingData;
    }
    
    return me;
  }

  fillSlider(opts) {
    var slider = {};

    if (opts.hasOwnProperty('min')) {
      slider.min = opts.min;
      slider.hardMin = true;
    }
    
    if (opts.hasOwnProperty('max')) {
      slider.max = opts.max;
      slider.hardMax = true;
    }

    if (opts.hasOwnProperty('step')) {
      slider.step = opts.step;
    }
    
    return slider;
  }
}

class Table {
  constructor(opts = {}, overridingData = false) {
    var me = {};
    
    var defaults = {
      l: 'y=x',
      c: [
        this.column({ n: 'x_{' + ++tableCounter + '}' }),
        this.column({ n: 'y_{' + ++tableCounter + '}' })
      ]
    };
    opts = fillDefaults(opts, defaults);
    
    if (!overridingData) {
      me.type = "expression";
      me.id = ++elementCounter;
      me.latex = opts.l;

      for 
        me.color = opts.c;
        opts.hasOwnProperty('h') ? me.hidden = opts.h : null;
        opts.hasOwnProperty('ls') ? me.lineStyle = opts.ls : null;
        opts.hasOwnProperty('lw') ? me.lineWidth = opts.lw : null;
        opts.hasOwnProperty('lo') ? me.lineOpacity = opts.lo : null;
        opts.hasOwnProperty('ld') ? me.description = opts.ld : null;
        opts.hasOwnProperty('lci') ? me.clickableInfo = fillDefaults(opts.lci, { "enabled": true }) : null;
    } else {
      me = overridingData;
    }
    
    return me;
  }

  column(opts, i) {
    opts = fillDefaults(opts, {
      c: i !== 1 ? defaultColors[defaultColorCounter++ % 4] : undefined,
      l: 
    });
  }
values	Array of LaTeX strings, optional. Need not be specified in the case of computed table columns.
color	String hex color, optional. See Colors. Default will cycle through 6 default colors.
hidden	Boolean, optional. Determines if graph is drawn. Defaults to false.
points	Boolean, optional. Determines whether points are plotted.
lines	Boolean, optional. Determines whether line segments are plotted.
lineStyle	Enum value, optional. Sets the drawing style for line segments. See Styles.
lineWidth	Number or String, optional. Determines width of lines in pixels. May be any positive number, or a LaTeX string that evaluates to a positive number. Defaults to 2.5.
lineOpacity	Number or String, optional. Determines opacity of lines. May be a number between 0 and 1, or a LaTeX string that evaluates to a number between 0 and 1. Defaults to 0.9.
pointStyle	Enum value, optional. Sets the drawing style for points. See Styles.
pointSize	Number or String, optional. Determines diameter of points in pixels. May be any positive number, or a LaTeX string that evaluates to a positive number. Defaults to 9.
pointOpacity	Number or String, optional. Determines opacity of points. May be a number between 0 and 1, or a LaTeX string that evaluates to a number between 0 and 1. Defaults to 0.9.
dragMode	Enum value, optional. See Drag Modes. Defaults to DragModes.NONE.
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
const UID = (l) => [...Array(l)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');
