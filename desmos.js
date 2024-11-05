var elementCounter = 0;
var tableCounter = 1;
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
      //alert(JSON.stringify(this.json, 1, 2));
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
      c: [
        new Column({ n: 'x_{' + tableCounter + '}' }),
        new Column({ n: 'y_{' + tableCounter + '}' })
      ]
    };
    opts = fillDefaults(opts, defaults);

    if (!overridingData) {
      me.type = "table";
      me.id = ++elementCounter;

      me.columns = [];

      for (var i = 0; i < opts.c.length; i++) {
        var columnOld = opts.c[i].set(i + 1);
        var columnNew = {};
        columnNew.latex = columnOld.l;
        columnNew.color = columnOld.c;
        columnOld.hasOwnProperty('h') ? columnNew.hidden = columnOld.h : null;
        columnOld.hasOwnProperty('ls') ? columnNew.lineStyle = columnOld.ls : null;
        columnOld.hasOwnProperty('lw') ? columnNew.lineWidth = columnOld.lw : null;
        columnOld.hasOwnProperty('lo') ? columnNew.lineOpacity = columnOld.lo : null;
        columnOld.hasOwnProperty('hp') ? columnNew.points = columnOld.hp : null;
        columnOld.hasOwnProperty('hl') ? columnNew.lines = columnOld.hl : null;
        columnOld.hasOwnProperty('ps') ? columnNew.pointStyle = columnOld.ps : null;
        columnOld.hasOwnProperty('pS') ? columnNew.pointSize = columnOld.pS : null;
        columnOld.hasOwnProperty('po') ? columnNew.pointOpacity = columnOld.po : null;
        columnOld.hasOwnProperty('dm') ? columnNew.dragMode = columnOld.dm : null;
        columnOld.hasOwnProperty('v') ? columnNew.values = columnOld.v : null;

        me.columns.push(columnNew);
      }
    } else {
      me = overridingData;
    }

    return me;
  }
}

class Column {
  constructor(opts = {}) {
    this.opts = opts;
  }
  set(i) {
    var name = loopingVaribaleNames(i);
    return fillDefaults(this.opts, {
      c: defaultColors[i !== 1 ? defaultColorCounter++ % 4 : defaultColorCounter % 4],
      l: name.val + '_{' + name.excess + tableCounter + '}',
      h: i == 1 ? true : undefined
    });
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

const UID = (l) => [...Array(l)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');

function loopingVaribaleNames(num) {
  const characters = [
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j',
    'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't',
    'u', 'v', 'w', 'x', 'y', 'z',
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
    'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T',
    'U', 'V', 'W', 'X', 'Y', 'Z'
  ];

  // There are 52 characters in total (26 lowercase + 26 uppercase)
  const totalCharacters = characters.length;

  // Calculate index and excess characters
  let index = num - 1; // Adjusting for zero-based index
  let excess = [];

  // Find the 'val'
  let characterIndex = index % totalCharacters;
  let val = characters[characterIndex];

  // Calculate excess characters (numbers of full cycles through 52)
  let fullCycles = Math.floor(index / totalCharacters);
  for (let i = 0; i < fullCycles; i++) {
    excess.push(val); // Store the current value for each full cycle
  }

  return { val: val, excess: excess.join('') };
}
