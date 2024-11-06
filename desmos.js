var elementCounter = 0;
var tableCounter = 1;
var defaultColorCounter = 0;
var defaultColors = ['#c74440', '#2d70b3', '#388c46', '#6042a6', '#000000'];
var variableOrder = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

class Class{constructor(classIn){return(...a)=>new classIn(...a)}}

class CalculatorClass {
  constructor(eqs = [], mode = 'e') {
    elementCounter = 0;

    const preview = {actions: !0, expressions: !1, settingsMenu: !1};
    const editor = {actions: !0};

    var calcElmnt = document.createElement('div');
    document.body.appendChild(calcElmnt);

    var calculator = Desmos.GraphingCalculator(calcElmnt, mode == 'e' ? editor : preview);

    this.json = new JSONStateCrafter(eqs);

    if (eqs.length) {
      //alert(JSON.stringify(this.json, 1, 2));
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

class PlainEQClass {
  constructor(overridingData = false) {
    this.features = ['type',
                     'id',
                     'latex',
                     'color',
                     'hidden',
                     'lineStyle',
                     'lineWidth',
                     'lineOpacity',
                     'description',
                     'clickableInfo'];
    this.featuresLong = ['latex',
                         'color',
                         'hidden',
                         'lineStyle',
                         'lineWidth',
                         'lineOpacity',
                         ['description', v => {
                           this.clickableInfo = fillDefaults(this.clickableInfo, { "enabled": true });
                           return v;
                         }],
                         ['clickableInfo', v =>
                           fillDefaults(v, { "enabled": true })
                         ]];
    this.featuresShort = ['l', 'c', 'h', 'ls', 'lw', 'lo', 'd', 'ci'];

    for (let i = 0; i < this.featuresLong.length; i++) {
      if (typeof this.featuresLong[i] == 'object') {
        this.initFeature(this.featuresShort[i], this.featuresLong[i][0], this.featuresLong[i][1]);
      } else {
        this.initFeature(this.featuresShort[i], this.featuresLong[i]);
      }
    }

    this.defaults = {
      color: defaultColors[defaultColorCounter++ % 4],
      latex: 'y=x'
    };

    if (!overridingData) {
      this.type = "expression";
      this.id = ++elementCounter;
    } else {
      for (let key in overridingData) {
        this[key] = overridingData[key];
      }
    }

    applyDefaults();
    return select(this, this.features);
  }

  initFeature(sn, longName, cutomReturn = false) {
    this[sn] = (v) => {
      this[longName] = cutomReturn ? customReturn(v) : v;
      applyDefaults();
      return select(this, this.features);
    }
  }

  applyDefaults() {
    var data = fillDefaults(this, this.defaults);
    for (let key in data) {
      this[key] = data[key];
    }
  }
}

class VariableClass {
  constructor(opts = {}, overridingData = false) {
    if (!opts.hasOwnProperty('n')) {
    }
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

class TableClass {
  constructor(opts = {}, overridingData = false) {
    var me = {};

    var defaults = {
      c: [
        new ColumnClass({ n: 'x_{' + tableCounter + '}' }),
        new ColumnClass({ n: 'y_{' + tableCounter + '}' })
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

class ColumnClass {
  constructor(opts = {}) {
    this.opts = opts;
  }
  set(i) {
    var name = loopingVaribaleNames(i);
    return fillDefaults(this.opts, {
      c: defaultColors[i !== 1 ? defaultColorCounter++ % 4 : defaultColorCounter % 4],
      l: name.val + '_{' + name.excess + tableCounter + '}',
      h: i == 1 ? true : undefined,
      v: !this.opts.hasOwnProperty('l') ? undefined : undefined
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

function select(a, b) {
  var c = {};
  for (let key of b) {
    c[key] = a[key];
  }
  return c;
}

const Calculator = new Class(CalculatorClass);
const PlainEQ = new Class(PlainEQClass);
const Variable = new Class(VariableClass);
const Table = new Class(TableClass);
const Column = new Class(ColumnClass);

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
