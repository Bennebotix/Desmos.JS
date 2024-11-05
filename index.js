  var elementCounter = 0;
  var defaultColors = ['#c74440', '#388c46', '#6042a6', '#000000'];

  class Calculator {
    constructor(eqs = [], mode = 'e') {
      const preview = {actions: !0, expressions: !1, settingsMenu: !1};
      const editor = {actions: !0};

      var calcElmnt = document.createElement('div');
      document.body.appendChild(calcElmnt);

      var calculator = Desmos.GraphingCalculator(calcElmnt, mode == 'e' ? editor : preview);

      this.json = { "version": 11, "randomSeed": "31f6cb0d39975c444562fec45e9618a9", "graph": { "viewport": { "xmin": -10, "ymin": -9.460227272727273, "xmax": 10, "ymax": 9.460227272727273 } }, "expressions": { "list": eqs }, "includeFunctionParametersInRandomSeed": true };

      if (eqs.length) {
        //calculator.setState(this.json);
        alert(JSON.stringify(this.json, null, 2));
      } else {
        calc.setBlank();
      }
    }
  }

  class Plain_Yequals_Equation {
    constructor(opts = {}, overridingData = false) {
      var me = {};
      
      var defaults = {
        c: defaultColors[elementCounter++ % 4],
        l: 'y=x',
        h: true
      };
      opts = fillDefaults(opts, defaults);
      if (!overridingData) {
        me.type = "expression";
        me.id = elementCounter;
        me.color = opts.c;
        me.latex = opts.l;
        opts.hasOwnProperty('ls') ? me.lineStyle = opts.ls : null;
        opts.hasOwnProperty('lw') ? me.lineWidth = opts.lw : null;
        opts.hasOwnProperty('lo') ? me.lineOpacity = opts.lo : null;
        opts.hasOwnProperty('ld') ? me.description = opts.ld : null;
        opts.hasOwnProperty('lci') ? me.clickableInfo = filDefaults(opts.lci, { "enabled": true }) : null;
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
