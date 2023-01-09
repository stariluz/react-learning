'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RCE = React.createElement;
function ButtonName(props) {
  var name = props.buttonName;
  if (props.isActive) {
    name += " clicked :)";
  }
  return React.createElement(
    "span",
    null,
    name
  );
}

var LikeButton = function (_React$Component) {
  _inherits(LikeButton, _React$Component);

  function LikeButton(props) {
    _classCallCheck(this, LikeButton);

    var _this = _possibleConstructorReturn(this, (LikeButton.__proto__ || Object.getPrototypeOf(LikeButton)).call(this, props));

    _this.state = {
      isActive: false
    };
    return _this;
  }
  // Convert al the code follow code to JSX sintax


  _createClass(LikeButton, [{
    key: "onClickButton",
    value: function onClickButton() {
      this.setState({
        isActive: !this.state.isActive
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      return React.createElement(
        "button",
        {
          id: this.props.buttonID,
          onClick: function onClick() {
            return _this2.onClickButton();
          }
        },
        React.createElement(ButtonName, {
          buttonName: this.props.buttonName,
          isActive: this.state.isActive
        })
      );
    }
  }]);

  return LikeButton;
}(React.Component);

function ButtonsContainer(props) {
  return React.createElement(
    "div",
    null,
    React.createElement(LikeButton, {
      buttonID: 1,
      buttonName: "Button A"
    }),
    React.createElement(LikeButton, {
      buttonID: 2,
      buttonName: "Button B"
    }),
    React.createElement(LikeButton, {
      buttonID: 3,
      buttonName: "Button C"
    })
  );
}

var domContainer = document.querySelector('#like_button_container');
var root = ReactDOM.createRoot(domContainer);
root.render(React.createElement(ButtonsContainer, null));

document.querySelectorAll(".button_container_js").forEach(function (domContainer) {
  var buttonID = parseInt(domContainer.dataset.button_id);
  var buttonName = domContainer.dataset.button_name;
  var root = ReactDOM.createRoot(domContainer);
  root.render(React.createElement(LikeButton, {
    buttonID: buttonID,
    buttonName: buttonName
  }));
});