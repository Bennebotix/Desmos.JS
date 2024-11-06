let elementCounter = 0;
let tableCounter = 1;
let variableCounter = 0;
let defaultColorCounter = 0;
let defaultColors = ['#c74440', '#2d70b3', '#388c46', '#6042a6', '#000000'];
let variableOrder = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

class Class2Function{constructor(classIn){return(...a)=>new classIn(...a)}}

class CalculatorClass {
  constructor(eqs = [], mode = 'e') {
    elementCounter = 0;

    const preview = {actions: !0, expressions: !1, settingsMenu: !1};
    const editor = {actions: !0};

    let calcElmnt = document.createElement('div');
    document.body.appendChild(calcElmnt);

    let calculator = Desmos.GraphingCalculator(calcElmnt, mode == 'e' ? editor : preview);

    this.json = new JSONStateCrafter(eqs);

    if (eqs.length) {
      alert(JSON.stringify(this.json, 1, 2));
      calculator.setState(this.json);
    } else {
      calculator.setBlank();
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
                           this.clickableInfo = fillDefaults(this.clickableInfo || {}, { "enabled": true });
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
      color: defaultColors[defaultColorCounter++ % defaultColors.length],
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

    this.applyDefaults();
    return this.desify();
  }

  desify() {
    return select(this, this.features.concat(this.featuresShort));
  }

  initFeature(sn, longName, customReturn = false) {
    this[sn] = (v) => {
      this[longName] = customReturn ? customReturn(v) : v;
      this.applyDefaults();
      return this.desify();
    }
  }

  applyDefaults() {
    let data = fillDefaults(this, this.defaults);
    for (let key in data) {
      this[key] = data[key];
    }
  }
}

class VariableClass {
  constructor(overridingData = false) {
    this.features = ['type',
                     'id',
                     'latex',
                     'slider'];
    this.featuresLong = ['name',
                         'value',
                         ['slider', v =>
                           this.fillSlider(v)
                         ]];
    this.featuresShort = ['n', 'v', 's'];

    for (let i = 0; i < this.featuresLong.length; i++) {
      if (typeof this.featuresLong[i] == 'object') {
        this.initFeature(this.featuresShort[i], this.featuresLong[i][0], this.featuresLong[i][1]);
      } else {
        this.initFeature(this.featuresShort[i], this.featuresLong[i]);
      }
    }

    let defaultName = loopingVariableNames(++variableCounter);
    
    this.defaults = {
      name: defaultName.val + '_{' + defaultName.excess + '}',
      value: 0
    };

    if (!overridingData) {
      this.type = "expression";
      this.id = ++elementCounter;
    } else {
      for (let key in overridingData) {
        this[key] = overridingData[key];
      }
    }

    this.applyDefaults();
    return this.desify();
  }

  desify() {
    return select(this, this.features.concat(this.featuresShort));
  }

  initFeature(sn, longName, customReturn = false) {
    this[sn] = v => {
      this[longName] = customReturn ? customReturn(v) : v;
      this.applyDefaults();
      return this.desify();
    }
  }

  applyDefaults() {
    let data = fillDefaults(this, this.defaults);
    for (let key in data) {
      this[key] = data[key];
    }
    this.latex = this.name + '=' + this.value; // Variable Specific
  }

  fillSlider(opts) {
    const slider = {};
    
    if ('min' in opts) {
      slider.min = opts.min;
      slider.hardMin = true;
    }
    
    if ('max' in opts) {
      slider.max = opts.max;
      slider.hardMax = true;
    }
    
    if ('step' in opts) {
      slider.step = opts.step;
    }
    
    return slider;
  }
}

class TableClass {
  constructor(overridingData = false) {
    this.features = ['type',
                     'id',
                     'columns'];
    this.featuresLong = ['columnsData'];
    this.featuresShort = ['col'];

    for (let i = 0; i < this.featuresLong.length; i++) {
      if (typeof this.featuresLong[i] == 'object') {
        this.initFeature(this.featuresShort[i], this.featuresLong[i][0], this.featuresLong[i][1]);
      } else {
        this.initFeature(this.featuresShort[i], this.featuresLong[i]);
      }
    }

    this.defaults = {
      columnsData: [
        new ColumnClass().l('x_{' + tableCounter + '}' ),
        new ColumnClass().l('y_{' + tableCounter + '}' )
      ]
    };

    if (!overridingData) {
      this.type = "table";
      this.id = ++elementCounter;
    } else {
      for (let key in overridingData) {
        this[key] = overridingData[key];
      }
    }

    this.applyDefaults();
    return this.desify();
  }

  desify() {
    return select(this, this.features.concat(this.featuresShort));
  }

  initFeature(sn, longName, customReturn = false) {
    this[sn] = (v) => {
      this[longName] = customReturn ? customReturn(v) : v;
      this.applyDefaults();
      return this.desify();
    }
  }

  applyDefaults() {
    let data = fillDefaults(this, this.defaults);
    for (let key of Object.keys(data)) {
      this[key] = data[key];
    }

    this.columns = this.columnsData.map((col, i) => col.set(i));
  } 
}

class ColumnClass {
  constructor(v = []) {
    this.features = ['id',
                     'latex',
                     'color',
                     'hidden',
                     'points',
                     'lines',
                     'lineStyle',
                     'lineWidth',
                     'lineOpacity',
                     'pointStyle',
                     'pointSize',
                     'pointOpacity',
                     'dragMode',
                     'values'];
    this.featuresLong = ['latex',
                         'color',
                         'hidden',
                         'points',
                         'lines',
                         'lineStyle',
                         'lineWidth',
                         'lineOpacity',
                         'pointStyle',
                         'pointSize',
                         'pointOpacity',
                         'dragMode'];
    this.featuresShort = ['l', 'c', 'h', 'sp', 'sl', 'ls', 'lw', 'lo', 'ps', 'pS', 'po', 'dm'];

    this.values = v.length ? v : undefined;

    for (let i = 0; i < this.featuresLong.length; i++) {
      if (typeof this.featuresLong[i] == 'object') {
        this.initFeature(this.featuresShort[i], this.featuresLong[i][0], this.featuresLong[i][1]);
      } else {
        this.initFeature(this.featuresShort[i], this.featuresLong[i]);
      }
    }

    this.defaults = i => ({
      color: i !== 1 ? defaultColors[defaultColorCounter % defaultColors.length] : undefined,
      hidden: i == 1 ? true : undefined
    });
    
    this.id = ++elementCounter;

    // this.applyDefaults(); // Column Specific
    return this.desify();
  }

  desify() {
    return select(this, this.features.concat(this.featuresShort));
  }

  initFeature(sn, longName, customReturn = false) {
    this[sn] = (v) => {
      this[longName] = customReturn ? customReturn(v) : v;
      // this.applyDefaults(); // Column Specific
      return this.desify();
    }
  }

  applyDefaults(data) {
    for (let key of Object.keys(data)) {
      this[key] = data[key];
    }
  }

  set(i) {
    let name = loopingVariableNames(i);
    let latexDefaults = {
      latex: name.val + '_{' + name.excess + tableCounter + '}'
    }
    this.applyDefaults(fillDefaults(this.defaults(i), latexDefaults));
  }
}

function fillDefaults(a, b) {
  let c = {};
  for (let key of Object.keys(b)) {
    c[key] = (a.hasOwnProperty(key) ? a : b)[key];
  }
  for (let key of Object.keys(a)) {
    !c.hasOwnProperty(key) ? c[key] = a[key] : null;
  }
  return c;
}
function select(a, b, f = false) {
  let c = {};
  for (let key of b) {
    c[key] = f ? f(a[key]) : a[key];
  }
  return c;
}

const Calculator = new Class2Function(CalculatorClass);
const PlainEQ = new Class2Function(PlainEQClass);
const Variable = new Class2Function(VariableClass);
const Table = new Class2Function(TableClass);
const Column = new Class2Function(ColumnClass);

const UID = l=>[...Array(l)].map(()=>Math.floor(Math.random()*16).toString(16)).join('');

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
