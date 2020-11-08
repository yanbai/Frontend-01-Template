//


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

ToyReact = {
  createElement: function createElement(type, attributes) {
    var _console;

    console.log(type);
    console.log(attributes);

    for (var _len = arguments.length, children = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      children[_key - 2] = arguments[_key];
    }

    (_console = console).log.apply(_console, children);

    var element = document.createElement(type);

    for (var attr in attributes) {
      element.setAttribute(attr, attributes[attr]);
    }
  }
};
var a = ToyReact.createElement(Div, {
  id: "a"
});

var Div = function Div() {
  _classCallCheck(this, Div);
};
