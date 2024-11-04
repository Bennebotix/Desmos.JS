var defaultColorCounter = 0;
var defaultColors = ['#c74440', '#388c46', '#6042a6', '#000000'];

class Calculator {
  constructor(eqs = [], mode = 'e') {
    const preview = {actions: !0, expressions: !1, settingsMenu: !1};
    const editor = {actions: !0};

    var calcElmnt = document.createElement('div');
    var calculator = Desmos.GraphingCalculator(calcElmnt, mode == 'e' ? editor : preview);
    document.body.appendChild(calcElmnt);
  }
}

new PlainEquation {
  construcctor(opts) {
    var defaults = {
      c: defaultColors[defaultColorCounter++ % 4],
      l: 'y=x'
    };
    opts = fillDefaults(opts, defaults);
    this.type = "expression";
    this.id = Math.random() * 1000000000;
    this.color = opts.c;
    this.latex = opts.l;
    opts.hasOwnProperty('ls') ? this.lineStyle = opts.ls: null;
    
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
