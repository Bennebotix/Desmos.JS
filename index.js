class Calculator {
  constructor(mode = 'e') {
    const preview = {actions: !0, expressions: !1, settingsMenu: !1};
    const editor = {actions: !0};

    var calcElmnt = document.createElement('div');
    var calculator = Desmos.GraphingCalculator(calcElmnt, mode == 'e' ? editor : preview);
    document.body.appendChild(calcElmnt);
  }
}
