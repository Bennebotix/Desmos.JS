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
    var defaults = {};
    opts = fillDefaults(opts, defaults);
    this.type = "expression";
    this.id = Math.random() * 1000000000;
    this.color = opts.c;
    this.latex = opts.l;
    this.ls = opts.ls;
    
  }
}


function fillDefaults(a, b) {
  var c = {};
  for (let key in b) {
      c[key] = (a.hasOwnProperty(key) ? a : b)[key];
  }
  return c;
}
