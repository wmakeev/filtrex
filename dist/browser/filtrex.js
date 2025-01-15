var filtrex = (function (exports) {
  'use strict';

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      enumerableOnly && (symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      })), keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = null != arguments[i] ? arguments[i] : {};
      i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }

    return target;
  }

  function _typeof(obj) {
    "@babel/helpers - typeof";

    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
      return typeof obj;
    } : function (obj) {
      return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, _typeof(obj);
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
      writable: false
    });
    return Constructor;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    Object.defineProperty(subClass, "prototype", {
      writable: false
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;

    try {
      Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
  }

  function _construct(Parent, args, Class) {
    if (_isNativeReflectConstruct()) {
      _construct = Reflect.construct;
    } else {
      _construct = function _construct(Parent, args, Class) {
        var a = [null];
        a.push.apply(a, args);
        var Constructor = Function.bind.apply(Parent, a);
        var instance = new Constructor();
        if (Class) _setPrototypeOf(instance, Class.prototype);
        return instance;
      };
    }

    return _construct.apply(null, arguments);
  }

  function _isNativeFunction(fn) {
    return Function.toString.call(fn).indexOf("[native code]") !== -1;
  }

  function _wrapNativeSuper(Class) {
    var _cache = typeof Map === "function" ? new Map() : undefined;

    _wrapNativeSuper = function _wrapNativeSuper(Class) {
      if (Class === null || !_isNativeFunction(Class)) return Class;

      if (typeof Class !== "function") {
        throw new TypeError("Super expression must either be null or a function");
      }

      if (typeof _cache !== "undefined") {
        if (_cache.has(Class)) return _cache.get(Class);

        _cache.set(Class, Wrapper);
      }

      function Wrapper() {
        return _construct(Class, arguments, _getPrototypeOf(this).constructor);
      }

      Wrapper.prototype = Object.create(Class.prototype, {
        constructor: {
          value: Wrapper,
          enumerable: false,
          writable: true,
          configurable: true
        }
      });
      return _setPrototypeOf(Wrapper, Class);
    };

    return _wrapNativeSuper(Class);
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    } else if (call !== void 0) {
      throw new TypeError("Derived constructors may only return object or undefined");
    }

    return _assertThisInitialized(self);
  }

  function _createSuper(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct();

    return function _createSuperInternal() {
      var Super = _getPrototypeOf(Derived),
          result;

      if (hasNativeReflectConstruct) {
        var NewTarget = _getPrototypeOf(this).constructor;

        result = Reflect.construct(Super, arguments, NewTarget);
      } else {
        result = Super.apply(this, arguments);
      }

      return _possibleConstructorReturn(this, result);
    };
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }

  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function _createForOfIteratorHelper(o, allowArrayLike) {
    var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];

    if (!it) {
      if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
        if (it) o = it;
        var i = 0;

        var F = function () {};

        return {
          s: F,
          n: function () {
            if (i >= o.length) return {
              done: true
            };
            return {
              done: false,
              value: o[i++]
            };
          },
          e: function (e) {
            throw e;
          },
          f: F
        };
      }

      throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }

    var normalCompletion = true,
        didErr = false,
        err;
    return {
      s: function () {
        it = it.call(o);
      },
      n: function () {
        var step = it.next();
        normalCompletion = step.done;
        return step;
      },
      e: function (e) {
        didErr = true;
        err = e;
      },
      f: function () {
        try {
          if (!normalCompletion && it.return != null) it.return();
        } finally {
          if (didErr) throw err;
        }
      }
    };
  }

  /* Jison generated parser */
  var _parser = function () {
    var parser = {
      trace: function trace() {},
      yy: {},
      symbols_: {
        "error": 2,
        "expressions": 3,
        "e": 4,
        "EndOfExpression": 5,
        "-": 6,
        "+": 7,
        "&": 8,
        "*": 9,
        "/": 10,
        "^": 11,
        "??": 12,
        "mod": 13,
        "|": 14,
        "|?": 15,
        "and": 16,
        "or": 17,
        "not": 18,
        "if": 19,
        "then": 20,
        "else": 21,
        "in": 22,
        "notIn": 23,
        "(": 24,
        ")": 25,
        "[": 26,
        "]": 27,
        "Arguments": 28,
        ",": 29,
        "Number": 30,
        "Symbol": 31,
        "String": 32,
        "of": 33,
        "Relation": 34,
        "RelationalOperator": 35,
        "==": 36,
        "!=": 37,
        "~=": 38,
        "<": 39,
        "<=": 40,
        ">=": 41,
        ">": 42,
        "$accept": 0,
        "$end": 1
      },
      terminals_: {
        2: "error",
        5: "EndOfExpression",
        6: "-",
        7: "+",
        8: "&",
        9: "*",
        10: "/",
        11: "^",
        12: "??",
        13: "mod",
        14: "|",
        15: "|?",
        16: "and",
        17: "or",
        18: "not",
        19: "if",
        20: "then",
        21: "else",
        22: "in",
        23: "notIn",
        24: "(",
        25: ")",
        26: "[",
        27: "]",
        29: ",",
        30: "Number",
        31: "Symbol",
        32: "String",
        33: "of",
        36: "==",
        37: "!=",
        38: "~=",
        39: "<",
        40: "<=",
        41: ">=",
        42: ">"
      },
      productions_: [0, [3, 2], [4, 2], [4, 3], [4, 3], [4, 3], [4, 3], [4, 3], [4, 3], [4, 3], [4, 3], [4, 3], [4, 3], [4, 3], [4, 3], [4, 2], [4, 6], [4, 3], [4, 3], [4, 3], [4, 3], [4, 2], [4, 5], [4, 5], [4, 1], [4, 1], [4, 1], [4, 3], [4, 3], [4, 4], [4, 1], [35, 1], [35, 1], [35, 1], [35, 1], [35, 1], [35, 1], [35, 1], [34, 3], [34, 3], [28, 1], [28, 3]],
      performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate, $$, _$) {
        var $0 = $$.length - 1;

        switch (yystate) {
          case 1:
            return $$[$0 - 1];

          case 2:
            this.$ = ["(", "ops['-'](", $$[$0], ")", ")"];
            break;

          case 3:
            this.$ = ["(", "ops['", $$[$0 - 1], "'](", $$[$0 - 2], ", ", $$[$0], ")", ")"];
            break;

          case 4:
            this.$ = ["(", "ops['", $$[$0 - 1], "'](", $$[$0 - 2], ", ", $$[$0], ")", ")"];
            break;

          case 5:
            this.$ = ["(", "ops['", $$[$0 - 1], "'](", $$[$0 - 2], ", ", $$[$0], ")", ")"];
            break;

          case 6:
            this.$ = ["(", "ops['", $$[$0 - 1], "'](", $$[$0 - 2], ", ", $$[$0], ")", ")"];
            break;

          case 7:
            this.$ = ["(", "ops['", $$[$0 - 1], "'](", $$[$0 - 2], ", ", $$[$0], ")", ")"];
            break;

          case 8:
            this.$ = ["(", "ops['", $$[$0 - 1], "'](", $$[$0 - 2], ", ", $$[$0], ")", ")"];
            break;

          case 9:
            this.$ = ["(", "ops['", $$[$0 - 1], "'](", $$[$0 - 2], ", ", $$[$0], ")", ")"];
            break;

          case 10:
            this.$ = ["(", "ops.mod(", $$[$0 - 2], ", ", $$[$0], ")", ")"];
            break;

          case 11:
            this.$ = ["(", "ops['", $$[$0 - 1], "'](", $$[$0 - 2], ", ", $$[$0], ")", ")"];
            break;

          case 12:
            this.$ = ["(", "ops['", $$[$0 - 1], "'](", $$[$0 - 2], ", ", $$[$0], ")", ")"];
            break;

          case 13:
            this.$ = ["(", "", "std.coerceBoolean", "(", $$[$0 - 2], ") && ", "std.coerceBoolean", "(", $$[$0], ")", ")"];
            break;

          case 14:
            this.$ = ["(", "", "std.coerceBoolean", "(", $$[$0 - 2], ") || ", "std.coerceBoolean", "(", $$[$0], ")", ")"];
            break;

          case 15:
            this.$ = ["(", "! ", "std.coerceBoolean", "(", $$[$0], ")", ")"];
            break;

          case 16:
            this.$ = ["(", "", "std.coerceBoolean", "(", $$[$0 - 4], ") ? ", $$[$0 - 2], " : ", $$[$0], "", ")"];
            break;

          case 17:
            this.$ = ["(", "std.isSubset(", $$[$0 - 2], ", ", $$[$0], ")", ")"];
            break;

          case 18:
            this.$ = ["(", "!std.isSubset(", $$[$0 - 2], ", ", $$[$0], ")", ")"];
            break;

          case 19:
            this.$ = ["(", "", $$[$0 - 1], "", ")"];
            break;

          case 20:
            this.$ = ["(", "[ ", $$[$0 - 1], " ]", ")"];
            break;

          case 21:
            this.$ = ["(", "[]", ")"];
            break;

          case 22:
            this.$ = ["(", "[ ", $$[$0 - 3], ", ", $$[$0 - 1], " ]", ")"];
            break;

          case 23:
            this.$ = ["(", "[ ", $$[$0 - 3], ", ", $$[$0 - 1], " ]", ")"];
            break;

          case 24:
            this.$ = ["", $$[$0], ""];
            break;

          case 25:
            this.$ = ["prop(", $$[$0], ", data)"];
            break;

          case 26:
            this.$ = ["", $$[$0], ""];
            break;

          case 27:
            this.$ = ["prop(", $$[$0 - 2], ", ", $$[$0], ")"];
            break;

          case 28:
            this.$ = ["call(", $$[$0 - 2], ")"];
            break;

          case 29:
            this.$ = ["call(", $$[$0 - 3], ", ", $$[$0 - 1], ")"];
            break;

          case 30:
            this.$ = yy.reduceRelation($$[$0]);
            break;

          case 31:
            this.$ = ["=="];
            break;

          case 32:
            this.$ = ["!="];
            break;

          case 33:
            this.$ = ["~="];
            break;

          case 34:
            this.$ = ["<"];
            break;

          case 35:
            this.$ = ["<="];
            break;

          case 36:
            this.$ = [">="];
            break;

          case 37:
            this.$ = [">"];
            break;

          case 38:
            this.$ = [$$[$0 - 2], $$[$0 - 1]].concat(_toConsumableArray($$[$0]));
            break;

          case 39:
            this.$ = [$$[$0 - 2], $$[$0 - 1], $$[$0]];
            break;

          case 40:
            this.$ = ["", $$[$0], ""];
            break;

          case 41:
            this.$ = ["", $$[$0 - 2], ", ", $$[$0], ""];
            break;
        }
      },
      table: [{
        3: 1,
        4: 2,
        6: [1, 3],
        18: [1, 4],
        19: [1, 5],
        24: [1, 6],
        26: [1, 7],
        30: [1, 8],
        31: [1, 9],
        32: [1, 10],
        34: 11
      }, {
        1: [3]
      }, {
        5: [1, 12],
        6: [1, 15],
        7: [1, 13],
        8: [1, 14],
        9: [1, 16],
        10: [1, 17],
        11: [1, 18],
        12: [1, 19],
        13: [1, 20],
        14: [1, 21],
        15: [1, 22],
        16: [1, 23],
        17: [1, 24],
        22: [1, 25],
        23: [1, 26],
        35: 27,
        36: [1, 28],
        37: [1, 29],
        38: [1, 30],
        39: [1, 31],
        40: [1, 32],
        41: [1, 33],
        42: [1, 34]
      }, {
        4: 35,
        6: [1, 3],
        18: [1, 4],
        19: [1, 5],
        24: [1, 6],
        26: [1, 7],
        30: [1, 8],
        31: [1, 9],
        32: [1, 10],
        34: 11
      }, {
        4: 36,
        6: [1, 3],
        18: [1, 4],
        19: [1, 5],
        24: [1, 6],
        26: [1, 7],
        30: [1, 8],
        31: [1, 9],
        32: [1, 10],
        34: 11
      }, {
        4: 37,
        6: [1, 3],
        18: [1, 4],
        19: [1, 5],
        24: [1, 6],
        26: [1, 7],
        30: [1, 8],
        31: [1, 9],
        32: [1, 10],
        34: 11
      }, {
        4: 38,
        6: [1, 3],
        18: [1, 4],
        19: [1, 5],
        24: [1, 6],
        26: [1, 7],
        28: 39,
        30: [1, 8],
        31: [1, 9],
        32: [1, 10],
        34: 11
      }, {
        4: 40,
        6: [1, 3],
        18: [1, 4],
        19: [1, 5],
        24: [1, 6],
        26: [1, 7],
        27: [1, 41],
        28: 42,
        30: [1, 8],
        31: [1, 9],
        32: [1, 10],
        34: 11
      }, {
        5: [2, 24],
        6: [2, 24],
        7: [2, 24],
        8: [2, 24],
        9: [2, 24],
        10: [2, 24],
        11: [2, 24],
        12: [2, 24],
        13: [2, 24],
        14: [2, 24],
        15: [2, 24],
        16: [2, 24],
        17: [2, 24],
        20: [2, 24],
        21: [2, 24],
        22: [2, 24],
        23: [2, 24],
        25: [2, 24],
        27: [2, 24],
        29: [2, 24],
        36: [2, 24],
        37: [2, 24],
        38: [2, 24],
        39: [2, 24],
        40: [2, 24],
        41: [2, 24],
        42: [2, 24]
      }, {
        5: [2, 25],
        6: [2, 25],
        7: [2, 25],
        8: [2, 25],
        9: [2, 25],
        10: [2, 25],
        11: [2, 25],
        12: [2, 25],
        13: [2, 25],
        14: [2, 25],
        15: [2, 25],
        16: [2, 25],
        17: [2, 25],
        20: [2, 25],
        21: [2, 25],
        22: [2, 25],
        23: [2, 25],
        24: [1, 44],
        25: [2, 25],
        27: [2, 25],
        29: [2, 25],
        33: [1, 43],
        36: [2, 25],
        37: [2, 25],
        38: [2, 25],
        39: [2, 25],
        40: [2, 25],
        41: [2, 25],
        42: [2, 25]
      }, {
        5: [2, 26],
        6: [2, 26],
        7: [2, 26],
        8: [2, 26],
        9: [2, 26],
        10: [2, 26],
        11: [2, 26],
        12: [2, 26],
        13: [2, 26],
        14: [2, 26],
        15: [2, 26],
        16: [2, 26],
        17: [2, 26],
        20: [2, 26],
        21: [2, 26],
        22: [2, 26],
        23: [2, 26],
        25: [2, 26],
        27: [2, 26],
        29: [2, 26],
        36: [2, 26],
        37: [2, 26],
        38: [2, 26],
        39: [2, 26],
        40: [2, 26],
        41: [2, 26],
        42: [2, 26]
      }, {
        5: [2, 30],
        6: [2, 30],
        7: [2, 30],
        8: [2, 30],
        9: [2, 30],
        10: [2, 30],
        11: [2, 30],
        12: [2, 30],
        13: [2, 30],
        14: [2, 30],
        15: [2, 30],
        16: [2, 30],
        17: [2, 30],
        20: [2, 30],
        21: [2, 30],
        22: [2, 30],
        23: [2, 30],
        25: [2, 30],
        27: [2, 30],
        29: [2, 30],
        36: [2, 30],
        37: [2, 30],
        38: [2, 30],
        39: [2, 30],
        40: [2, 30],
        41: [2, 30],
        42: [2, 30]
      }, {
        1: [2, 1]
      }, {
        4: 45,
        6: [1, 3],
        18: [1, 4],
        19: [1, 5],
        24: [1, 6],
        26: [1, 7],
        30: [1, 8],
        31: [1, 9],
        32: [1, 10],
        34: 11
      }, {
        4: 46,
        6: [1, 3],
        18: [1, 4],
        19: [1, 5],
        24: [1, 6],
        26: [1, 7],
        30: [1, 8],
        31: [1, 9],
        32: [1, 10],
        34: 11
      }, {
        4: 47,
        6: [1, 3],
        18: [1, 4],
        19: [1, 5],
        24: [1, 6],
        26: [1, 7],
        30: [1, 8],
        31: [1, 9],
        32: [1, 10],
        34: 11
      }, {
        4: 48,
        6: [1, 3],
        18: [1, 4],
        19: [1, 5],
        24: [1, 6],
        26: [1, 7],
        30: [1, 8],
        31: [1, 9],
        32: [1, 10],
        34: 11
      }, {
        4: 49,
        6: [1, 3],
        18: [1, 4],
        19: [1, 5],
        24: [1, 6],
        26: [1, 7],
        30: [1, 8],
        31: [1, 9],
        32: [1, 10],
        34: 11
      }, {
        4: 50,
        6: [1, 3],
        18: [1, 4],
        19: [1, 5],
        24: [1, 6],
        26: [1, 7],
        30: [1, 8],
        31: [1, 9],
        32: [1, 10],
        34: 11
      }, {
        4: 51,
        6: [1, 3],
        18: [1, 4],
        19: [1, 5],
        24: [1, 6],
        26: [1, 7],
        30: [1, 8],
        31: [1, 9],
        32: [1, 10],
        34: 11
      }, {
        4: 52,
        6: [1, 3],
        18: [1, 4],
        19: [1, 5],
        24: [1, 6],
        26: [1, 7],
        30: [1, 8],
        31: [1, 9],
        32: [1, 10],
        34: 11
      }, {
        4: 53,
        6: [1, 3],
        18: [1, 4],
        19: [1, 5],
        24: [1, 6],
        26: [1, 7],
        30: [1, 8],
        31: [1, 9],
        32: [1, 10],
        34: 11
      }, {
        4: 54,
        6: [1, 3],
        18: [1, 4],
        19: [1, 5],
        24: [1, 6],
        26: [1, 7],
        30: [1, 8],
        31: [1, 9],
        32: [1, 10],
        34: 11
      }, {
        4: 55,
        6: [1, 3],
        18: [1, 4],
        19: [1, 5],
        24: [1, 6],
        26: [1, 7],
        30: [1, 8],
        31: [1, 9],
        32: [1, 10],
        34: 11
      }, {
        4: 56,
        6: [1, 3],
        18: [1, 4],
        19: [1, 5],
        24: [1, 6],
        26: [1, 7],
        30: [1, 8],
        31: [1, 9],
        32: [1, 10],
        34: 11
      }, {
        4: 57,
        6: [1, 3],
        18: [1, 4],
        19: [1, 5],
        24: [1, 6],
        26: [1, 7],
        30: [1, 8],
        31: [1, 9],
        32: [1, 10],
        34: 11
      }, {
        4: 58,
        6: [1, 3],
        18: [1, 4],
        19: [1, 5],
        24: [1, 6],
        26: [1, 7],
        30: [1, 8],
        31: [1, 9],
        32: [1, 10],
        34: 11
      }, {
        4: 60,
        6: [1, 3],
        18: [1, 4],
        19: [1, 5],
        24: [1, 6],
        26: [1, 7],
        30: [1, 8],
        31: [1, 9],
        32: [1, 10],
        34: 59
      }, {
        6: [2, 31],
        18: [2, 31],
        19: [2, 31],
        24: [2, 31],
        26: [2, 31],
        30: [2, 31],
        31: [2, 31],
        32: [2, 31]
      }, {
        6: [2, 32],
        18: [2, 32],
        19: [2, 32],
        24: [2, 32],
        26: [2, 32],
        30: [2, 32],
        31: [2, 32],
        32: [2, 32]
      }, {
        6: [2, 33],
        18: [2, 33],
        19: [2, 33],
        24: [2, 33],
        26: [2, 33],
        30: [2, 33],
        31: [2, 33],
        32: [2, 33]
      }, {
        6: [2, 34],
        18: [2, 34],
        19: [2, 34],
        24: [2, 34],
        26: [2, 34],
        30: [2, 34],
        31: [2, 34],
        32: [2, 34]
      }, {
        6: [2, 35],
        18: [2, 35],
        19: [2, 35],
        24: [2, 35],
        26: [2, 35],
        30: [2, 35],
        31: [2, 35],
        32: [2, 35]
      }, {
        6: [2, 36],
        18: [2, 36],
        19: [2, 36],
        24: [2, 36],
        26: [2, 36],
        30: [2, 36],
        31: [2, 36],
        32: [2, 36]
      }, {
        6: [2, 37],
        18: [2, 37],
        19: [2, 37],
        24: [2, 37],
        26: [2, 37],
        30: [2, 37],
        31: [2, 37],
        32: [2, 37]
      }, {
        5: [2, 2],
        6: [2, 2],
        7: [2, 2],
        8: [2, 2],
        9: [2, 2],
        10: [2, 2],
        11: [1, 18],
        12: [2, 2],
        13: [2, 2],
        14: [2, 2],
        15: [2, 2],
        16: [2, 2],
        17: [2, 2],
        20: [2, 2],
        21: [2, 2],
        22: [2, 2],
        23: [2, 2],
        25: [2, 2],
        27: [2, 2],
        29: [2, 2],
        35: 27,
        36: [2, 2],
        37: [2, 2],
        38: [2, 2],
        39: [2, 2],
        40: [2, 2],
        41: [2, 2],
        42: [2, 2]
      }, {
        5: [2, 15],
        6: [2, 15],
        7: [2, 15],
        8: [2, 15],
        9: [2, 15],
        10: [2, 15],
        11: [1, 18],
        12: [2, 15],
        13: [2, 15],
        14: [2, 15],
        15: [2, 15],
        16: [2, 15],
        17: [2, 15],
        20: [2, 15],
        21: [2, 15],
        22: [2, 15],
        23: [2, 15],
        25: [2, 15],
        27: [2, 15],
        29: [2, 15],
        35: 27,
        36: [2, 15],
        37: [2, 15],
        38: [2, 15],
        39: [2, 15],
        40: [2, 15],
        41: [2, 15],
        42: [2, 15]
      }, {
        6: [1, 15],
        7: [1, 13],
        8: [1, 14],
        9: [1, 16],
        10: [1, 17],
        11: [1, 18],
        12: [1, 19],
        13: [1, 20],
        14: [1, 21],
        15: [1, 22],
        16: [1, 23],
        17: [1, 24],
        20: [1, 61],
        22: [1, 25],
        23: [1, 26],
        35: 27,
        36: [1, 28],
        37: [1, 29],
        38: [1, 30],
        39: [1, 31],
        40: [1, 32],
        41: [1, 33],
        42: [1, 34]
      }, {
        6: [1, 15],
        7: [1, 13],
        8: [1, 14],
        9: [1, 16],
        10: [1, 17],
        11: [1, 18],
        12: [1, 19],
        13: [1, 20],
        14: [1, 21],
        15: [1, 22],
        16: [1, 23],
        17: [1, 24],
        22: [1, 25],
        23: [1, 26],
        25: [1, 62],
        29: [2, 40],
        35: 27,
        36: [1, 28],
        37: [1, 29],
        38: [1, 30],
        39: [1, 31],
        40: [1, 32],
        41: [1, 33],
        42: [1, 34]
      }, {
        29: [1, 63]
      }, {
        6: [1, 15],
        7: [1, 13],
        8: [1, 14],
        9: [1, 16],
        10: [1, 17],
        11: [1, 18],
        12: [1, 19],
        13: [1, 20],
        14: [1, 21],
        15: [1, 22],
        16: [1, 23],
        17: [1, 24],
        22: [1, 25],
        23: [1, 26],
        27: [1, 64],
        29: [2, 40],
        35: 27,
        36: [1, 28],
        37: [1, 29],
        38: [1, 30],
        39: [1, 31],
        40: [1, 32],
        41: [1, 33],
        42: [1, 34]
      }, {
        5: [2, 21],
        6: [2, 21],
        7: [2, 21],
        8: [2, 21],
        9: [2, 21],
        10: [2, 21],
        11: [2, 21],
        12: [2, 21],
        13: [2, 21],
        14: [2, 21],
        15: [2, 21],
        16: [2, 21],
        17: [2, 21],
        20: [2, 21],
        21: [2, 21],
        22: [2, 21],
        23: [2, 21],
        25: [2, 21],
        27: [2, 21],
        29: [2, 21],
        36: [2, 21],
        37: [2, 21],
        38: [2, 21],
        39: [2, 21],
        40: [2, 21],
        41: [2, 21],
        42: [2, 21]
      }, {
        29: [1, 65]
      }, {
        4: 66,
        6: [1, 3],
        18: [1, 4],
        19: [1, 5],
        24: [1, 6],
        26: [1, 7],
        30: [1, 8],
        31: [1, 9],
        32: [1, 10],
        34: 11
      }, {
        4: 69,
        6: [1, 3],
        18: [1, 4],
        19: [1, 5],
        24: [1, 6],
        25: [1, 67],
        26: [1, 7],
        28: 68,
        30: [1, 8],
        31: [1, 9],
        32: [1, 10],
        34: 11
      }, {
        5: [2, 3],
        6: [2, 3],
        7: [2, 3],
        8: [2, 3],
        9: [1, 16],
        10: [1, 17],
        11: [1, 18],
        12: [2, 3],
        13: [1, 20],
        14: [2, 3],
        15: [2, 3],
        16: [2, 3],
        17: [2, 3],
        20: [2, 3],
        21: [2, 3],
        22: [2, 3],
        23: [2, 3],
        25: [2, 3],
        27: [2, 3],
        29: [2, 3],
        35: 27,
        36: [2, 3],
        37: [2, 3],
        38: [2, 3],
        39: [2, 3],
        40: [2, 3],
        41: [2, 3],
        42: [2, 3]
      }, {
        5: [2, 4],
        6: [1, 15],
        7: [1, 13],
        8: [2, 4],
        9: [1, 16],
        10: [1, 17],
        11: [1, 18],
        12: [2, 4],
        13: [1, 20],
        14: [2, 4],
        15: [2, 4],
        16: [2, 4],
        17: [2, 4],
        20: [2, 4],
        21: [2, 4],
        22: [2, 4],
        23: [2, 4],
        25: [2, 4],
        27: [2, 4],
        29: [2, 4],
        35: 27,
        36: [2, 4],
        37: [2, 4],
        38: [2, 4],
        39: [2, 4],
        40: [2, 4],
        41: [2, 4],
        42: [2, 4]
      }, {
        5: [2, 5],
        6: [2, 5],
        7: [2, 5],
        8: [2, 5],
        9: [1, 16],
        10: [1, 17],
        11: [1, 18],
        12: [2, 5],
        13: [1, 20],
        14: [2, 5],
        15: [2, 5],
        16: [2, 5],
        17: [2, 5],
        20: [2, 5],
        21: [2, 5],
        22: [2, 5],
        23: [2, 5],
        25: [2, 5],
        27: [2, 5],
        29: [2, 5],
        35: 27,
        36: [2, 5],
        37: [2, 5],
        38: [2, 5],
        39: [2, 5],
        40: [2, 5],
        41: [2, 5],
        42: [2, 5]
      }, {
        5: [2, 6],
        6: [2, 6],
        7: [2, 6],
        8: [2, 6],
        9: [2, 6],
        10: [2, 6],
        11: [1, 18],
        12: [2, 6],
        13: [2, 6],
        14: [2, 6],
        15: [2, 6],
        16: [2, 6],
        17: [2, 6],
        20: [2, 6],
        21: [2, 6],
        22: [2, 6],
        23: [2, 6],
        25: [2, 6],
        27: [2, 6],
        29: [2, 6],
        35: 27,
        36: [2, 6],
        37: [2, 6],
        38: [2, 6],
        39: [2, 6],
        40: [2, 6],
        41: [2, 6],
        42: [2, 6]
      }, {
        5: [2, 7],
        6: [2, 7],
        7: [2, 7],
        8: [2, 7],
        9: [2, 7],
        10: [2, 7],
        11: [1, 18],
        12: [2, 7],
        13: [2, 7],
        14: [2, 7],
        15: [2, 7],
        16: [2, 7],
        17: [2, 7],
        20: [2, 7],
        21: [2, 7],
        22: [2, 7],
        23: [2, 7],
        25: [2, 7],
        27: [2, 7],
        29: [2, 7],
        35: 27,
        36: [2, 7],
        37: [2, 7],
        38: [2, 7],
        39: [2, 7],
        40: [2, 7],
        41: [2, 7],
        42: [2, 7]
      }, {
        5: [2, 8],
        6: [2, 8],
        7: [2, 8],
        8: [2, 8],
        9: [2, 8],
        10: [2, 8],
        11: [1, 18],
        12: [2, 8],
        13: [2, 8],
        14: [2, 8],
        15: [2, 8],
        16: [2, 8],
        17: [2, 8],
        20: [2, 8],
        21: [2, 8],
        22: [2, 8],
        23: [2, 8],
        25: [2, 8],
        27: [2, 8],
        29: [2, 8],
        35: 27,
        36: [2, 8],
        37: [2, 8],
        38: [2, 8],
        39: [2, 8],
        40: [2, 8],
        41: [2, 8],
        42: [2, 8]
      }, {
        5: [2, 9],
        6: [1, 15],
        7: [1, 13],
        8: [1, 14],
        9: [1, 16],
        10: [1, 17],
        11: [1, 18],
        12: [2, 9],
        13: [1, 20],
        14: [2, 9],
        15: [2, 9],
        16: [1, 23],
        17: [1, 24],
        20: [2, 9],
        21: [2, 9],
        22: [1, 25],
        23: [1, 26],
        25: [2, 9],
        27: [2, 9],
        29: [2, 9],
        35: 27,
        36: [1, 28],
        37: [1, 29],
        38: [1, 30],
        39: [1, 31],
        40: [1, 32],
        41: [1, 33],
        42: [1, 34]
      }, {
        5: [2, 10],
        6: [2, 10],
        7: [2, 10],
        8: [2, 10],
        9: [2, 10],
        10: [2, 10],
        11: [1, 18],
        12: [2, 10],
        13: [2, 10],
        14: [2, 10],
        15: [2, 10],
        16: [2, 10],
        17: [2, 10],
        20: [2, 10],
        21: [2, 10],
        22: [2, 10],
        23: [2, 10],
        25: [2, 10],
        27: [2, 10],
        29: [2, 10],
        35: 27,
        36: [2, 10],
        37: [2, 10],
        38: [2, 10],
        39: [2, 10],
        40: [2, 10],
        41: [2, 10],
        42: [2, 10]
      }, {
        5: [2, 11],
        6: [1, 15],
        7: [1, 13],
        8: [1, 14],
        9: [1, 16],
        10: [1, 17],
        11: [1, 18],
        12: [1, 19],
        13: [1, 20],
        14: [2, 11],
        15: [2, 11],
        16: [1, 23],
        17: [1, 24],
        20: [2, 11],
        21: [2, 11],
        22: [1, 25],
        23: [1, 26],
        25: [2, 11],
        27: [2, 11],
        29: [2, 11],
        35: 27,
        36: [1, 28],
        37: [1, 29],
        38: [1, 30],
        39: [1, 31],
        40: [1, 32],
        41: [1, 33],
        42: [1, 34]
      }, {
        5: [2, 12],
        6: [1, 15],
        7: [1, 13],
        8: [1, 14],
        9: [1, 16],
        10: [1, 17],
        11: [1, 18],
        12: [1, 19],
        13: [1, 20],
        14: [2, 12],
        15: [2, 12],
        16: [1, 23],
        17: [1, 24],
        20: [2, 12],
        21: [2, 12],
        22: [1, 25],
        23: [1, 26],
        25: [2, 12],
        27: [2, 12],
        29: [2, 12],
        35: 27,
        36: [1, 28],
        37: [1, 29],
        38: [1, 30],
        39: [1, 31],
        40: [1, 32],
        41: [1, 33],
        42: [1, 34]
      }, {
        5: [2, 13],
        6: [1, 15],
        7: [1, 13],
        8: [1, 14],
        9: [1, 16],
        10: [1, 17],
        11: [1, 18],
        12: [2, 13],
        13: [1, 20],
        14: [2, 13],
        15: [2, 13],
        16: [2, 13],
        17: [2, 13],
        20: [2, 13],
        21: [2, 13],
        22: [1, 25],
        23: [1, 26],
        25: [2, 13],
        27: [2, 13],
        29: [2, 13],
        35: 27,
        36: [1, 28],
        37: [1, 29],
        38: [1, 30],
        39: [1, 31],
        40: [1, 32],
        41: [1, 33],
        42: [1, 34]
      }, {
        5: [2, 14],
        6: [1, 15],
        7: [1, 13],
        8: [1, 14],
        9: [1, 16],
        10: [1, 17],
        11: [1, 18],
        12: [2, 14],
        13: [1, 20],
        14: [2, 14],
        15: [2, 14],
        16: [1, 23],
        17: [2, 14],
        20: [2, 14],
        21: [2, 14],
        22: [1, 25],
        23: [1, 26],
        25: [2, 14],
        27: [2, 14],
        29: [2, 14],
        35: 27,
        36: [1, 28],
        37: [1, 29],
        38: [1, 30],
        39: [1, 31],
        40: [1, 32],
        41: [1, 33],
        42: [1, 34]
      }, {
        5: [2, 17],
        6: [1, 15],
        7: [1, 13],
        8: [1, 14],
        9: [1, 16],
        10: [1, 17],
        11: [1, 18],
        12: [2, 17],
        13: [1, 20],
        14: [2, 17],
        15: [2, 17],
        16: [2, 17],
        17: [2, 17],
        20: [2, 17],
        21: [2, 17],
        22: [2, 17],
        23: [2, 17],
        25: [2, 17],
        27: [2, 17],
        29: [2, 17],
        35: 27,
        36: [1, 28],
        37: [1, 29],
        38: [1, 30],
        39: [1, 31],
        40: [1, 32],
        41: [1, 33],
        42: [1, 34]
      }, {
        5: [2, 18],
        6: [1, 15],
        7: [1, 13],
        8: [1, 14],
        9: [1, 16],
        10: [1, 17],
        11: [1, 18],
        12: [2, 18],
        13: [1, 20],
        14: [2, 18],
        15: [2, 18],
        16: [2, 18],
        17: [2, 18],
        20: [2, 18],
        21: [2, 18],
        22: [2, 18],
        23: [2, 18],
        25: [2, 18],
        27: [2, 18],
        29: [2, 18],
        35: 27,
        36: [1, 28],
        37: [1, 29],
        38: [1, 30],
        39: [1, 31],
        40: [1, 32],
        41: [1, 33],
        42: [1, 34]
      }, {
        5: [2, 38],
        6: [2, 38],
        7: [2, 38],
        8: [2, 38],
        9: [2, 38],
        10: [2, 38],
        11: [2, 38],
        12: [2, 38],
        13: [2, 38],
        14: [2, 38],
        15: [2, 38],
        16: [2, 38],
        17: [2, 38],
        20: [2, 38],
        21: [2, 38],
        22: [2, 38],
        23: [2, 38],
        25: [2, 38],
        27: [2, 38],
        29: [2, 38],
        36: [2, 38],
        37: [2, 38],
        38: [2, 38],
        39: [2, 38],
        40: [2, 38],
        41: [2, 38],
        42: [2, 38]
      }, {
        5: [2, 39],
        6: [1, 15],
        7: [1, 13],
        8: [1, 14],
        9: [1, 16],
        10: [1, 17],
        11: [1, 18],
        12: [2, 39],
        13: [1, 20],
        14: [2, 39],
        15: [2, 39],
        16: [2, 39],
        17: [2, 39],
        20: [2, 39],
        21: [2, 39],
        22: [2, 39],
        23: [2, 39],
        25: [2, 39],
        27: [2, 39],
        29: [2, 39],
        35: 27,
        36: [1, 28],
        37: [1, 29],
        38: [1, 30],
        39: [1, 31],
        40: [1, 32],
        41: [1, 33],
        42: [1, 34]
      }, {
        4: 70,
        6: [1, 3],
        18: [1, 4],
        19: [1, 5],
        24: [1, 6],
        26: [1, 7],
        30: [1, 8],
        31: [1, 9],
        32: [1, 10],
        34: 11
      }, {
        5: [2, 19],
        6: [2, 19],
        7: [2, 19],
        8: [2, 19],
        9: [2, 19],
        10: [2, 19],
        11: [2, 19],
        12: [2, 19],
        13: [2, 19],
        14: [2, 19],
        15: [2, 19],
        16: [2, 19],
        17: [2, 19],
        20: [2, 19],
        21: [2, 19],
        22: [2, 19],
        23: [2, 19],
        25: [2, 19],
        27: [2, 19],
        29: [2, 19],
        36: [2, 19],
        37: [2, 19],
        38: [2, 19],
        39: [2, 19],
        40: [2, 19],
        41: [2, 19],
        42: [2, 19]
      }, {
        4: 71,
        6: [1, 3],
        18: [1, 4],
        19: [1, 5],
        24: [1, 6],
        26: [1, 7],
        30: [1, 8],
        31: [1, 9],
        32: [1, 10],
        34: 11
      }, {
        5: [2, 20],
        6: [2, 20],
        7: [2, 20],
        8: [2, 20],
        9: [2, 20],
        10: [2, 20],
        11: [2, 20],
        12: [2, 20],
        13: [2, 20],
        14: [2, 20],
        15: [2, 20],
        16: [2, 20],
        17: [2, 20],
        20: [2, 20],
        21: [2, 20],
        22: [2, 20],
        23: [2, 20],
        25: [2, 20],
        27: [2, 20],
        29: [2, 20],
        36: [2, 20],
        37: [2, 20],
        38: [2, 20],
        39: [2, 20],
        40: [2, 20],
        41: [2, 20],
        42: [2, 20]
      }, {
        4: 72,
        6: [1, 3],
        18: [1, 4],
        19: [1, 5],
        24: [1, 6],
        26: [1, 7],
        30: [1, 8],
        31: [1, 9],
        32: [1, 10],
        34: 11
      }, {
        5: [2, 27],
        6: [2, 27],
        7: [2, 27],
        8: [2, 27],
        9: [2, 27],
        10: [2, 27],
        11: [2, 27],
        12: [2, 27],
        13: [2, 27],
        14: [2, 27],
        15: [2, 27],
        16: [2, 27],
        17: [2, 27],
        20: [2, 27],
        21: [2, 27],
        22: [2, 27],
        23: [2, 27],
        25: [2, 27],
        27: [2, 27],
        29: [2, 27],
        35: 27,
        36: [2, 27],
        37: [2, 27],
        38: [2, 27],
        39: [2, 27],
        40: [2, 27],
        41: [2, 27],
        42: [2, 27]
      }, {
        5: [2, 28],
        6: [2, 28],
        7: [2, 28],
        8: [2, 28],
        9: [2, 28],
        10: [2, 28],
        11: [2, 28],
        12: [2, 28],
        13: [2, 28],
        14: [2, 28],
        15: [2, 28],
        16: [2, 28],
        17: [2, 28],
        20: [2, 28],
        21: [2, 28],
        22: [2, 28],
        23: [2, 28],
        25: [2, 28],
        27: [2, 28],
        29: [2, 28],
        36: [2, 28],
        37: [2, 28],
        38: [2, 28],
        39: [2, 28],
        40: [2, 28],
        41: [2, 28],
        42: [2, 28]
      }, {
        25: [1, 73],
        29: [1, 74]
      }, {
        6: [1, 15],
        7: [1, 13],
        8: [1, 14],
        9: [1, 16],
        10: [1, 17],
        11: [1, 18],
        12: [1, 19],
        13: [1, 20],
        14: [1, 21],
        15: [1, 22],
        16: [1, 23],
        17: [1, 24],
        22: [1, 25],
        23: [1, 26],
        25: [2, 40],
        29: [2, 40],
        35: 27,
        36: [1, 28],
        37: [1, 29],
        38: [1, 30],
        39: [1, 31],
        40: [1, 32],
        41: [1, 33],
        42: [1, 34]
      }, {
        6: [1, 15],
        7: [1, 13],
        8: [1, 14],
        9: [1, 16],
        10: [1, 17],
        11: [1, 18],
        12: [1, 19],
        13: [1, 20],
        14: [1, 21],
        15: [1, 22],
        16: [1, 23],
        17: [1, 24],
        21: [1, 75],
        22: [1, 25],
        23: [1, 26],
        35: 27,
        36: [1, 28],
        37: [1, 29],
        38: [1, 30],
        39: [1, 31],
        40: [1, 32],
        41: [1, 33],
        42: [1, 34]
      }, {
        6: [1, 15],
        7: [1, 13],
        8: [1, 14],
        9: [1, 16],
        10: [1, 17],
        11: [1, 18],
        12: [1, 19],
        13: [1, 20],
        14: [1, 21],
        15: [1, 22],
        16: [1, 23],
        17: [1, 24],
        22: [1, 25],
        23: [1, 26],
        25: [1, 76],
        29: [2, 41],
        35: 27,
        36: [1, 28],
        37: [1, 29],
        38: [1, 30],
        39: [1, 31],
        40: [1, 32],
        41: [1, 33],
        42: [1, 34]
      }, {
        6: [1, 15],
        7: [1, 13],
        8: [1, 14],
        9: [1, 16],
        10: [1, 17],
        11: [1, 18],
        12: [1, 19],
        13: [1, 20],
        14: [1, 21],
        15: [1, 22],
        16: [1, 23],
        17: [1, 24],
        22: [1, 25],
        23: [1, 26],
        27: [1, 77],
        29: [2, 41],
        35: 27,
        36: [1, 28],
        37: [1, 29],
        38: [1, 30],
        39: [1, 31],
        40: [1, 32],
        41: [1, 33],
        42: [1, 34]
      }, {
        5: [2, 29],
        6: [2, 29],
        7: [2, 29],
        8: [2, 29],
        9: [2, 29],
        10: [2, 29],
        11: [2, 29],
        12: [2, 29],
        13: [2, 29],
        14: [2, 29],
        15: [2, 29],
        16: [2, 29],
        17: [2, 29],
        20: [2, 29],
        21: [2, 29],
        22: [2, 29],
        23: [2, 29],
        25: [2, 29],
        27: [2, 29],
        29: [2, 29],
        36: [2, 29],
        37: [2, 29],
        38: [2, 29],
        39: [2, 29],
        40: [2, 29],
        41: [2, 29],
        42: [2, 29]
      }, {
        4: 78,
        6: [1, 3],
        18: [1, 4],
        19: [1, 5],
        24: [1, 6],
        26: [1, 7],
        30: [1, 8],
        31: [1, 9],
        32: [1, 10],
        34: 11
      }, {
        4: 79,
        6: [1, 3],
        18: [1, 4],
        19: [1, 5],
        24: [1, 6],
        26: [1, 7],
        30: [1, 8],
        31: [1, 9],
        32: [1, 10],
        34: 11
      }, {
        5: [2, 22],
        6: [2, 22],
        7: [2, 22],
        8: [2, 22],
        9: [2, 22],
        10: [2, 22],
        11: [2, 22],
        12: [2, 22],
        13: [2, 22],
        14: [2, 22],
        15: [2, 22],
        16: [2, 22],
        17: [2, 22],
        20: [2, 22],
        21: [2, 22],
        22: [2, 22],
        23: [2, 22],
        25: [2, 22],
        27: [2, 22],
        29: [2, 22],
        36: [2, 22],
        37: [2, 22],
        38: [2, 22],
        39: [2, 22],
        40: [2, 22],
        41: [2, 22],
        42: [2, 22]
      }, {
        5: [2, 23],
        6: [2, 23],
        7: [2, 23],
        8: [2, 23],
        9: [2, 23],
        10: [2, 23],
        11: [2, 23],
        12: [2, 23],
        13: [2, 23],
        14: [2, 23],
        15: [2, 23],
        16: [2, 23],
        17: [2, 23],
        20: [2, 23],
        21: [2, 23],
        22: [2, 23],
        23: [2, 23],
        25: [2, 23],
        27: [2, 23],
        29: [2, 23],
        36: [2, 23],
        37: [2, 23],
        38: [2, 23],
        39: [2, 23],
        40: [2, 23],
        41: [2, 23],
        42: [2, 23]
      }, {
        6: [1, 15],
        7: [1, 13],
        8: [1, 14],
        9: [1, 16],
        10: [1, 17],
        11: [1, 18],
        12: [1, 19],
        13: [1, 20],
        14: [1, 21],
        15: [1, 22],
        16: [1, 23],
        17: [1, 24],
        22: [1, 25],
        23: [1, 26],
        25: [2, 41],
        29: [2, 41],
        35: 27,
        36: [1, 28],
        37: [1, 29],
        38: [1, 30],
        39: [1, 31],
        40: [1, 32],
        41: [1, 33],
        42: [1, 34]
      }, {
        5: [2, 16],
        6: [1, 15],
        7: [1, 13],
        8: [1, 14],
        9: [1, 16],
        10: [1, 17],
        11: [1, 18],
        12: [1, 19],
        13: [1, 20],
        14: [2, 16],
        15: [2, 16],
        16: [1, 23],
        17: [1, 24],
        20: [2, 16],
        21: [2, 16],
        22: [1, 25],
        23: [1, 26],
        25: [2, 16],
        27: [2, 16],
        29: [2, 16],
        35: 27,
        36: [1, 28],
        37: [1, 29],
        38: [1, 30],
        39: [1, 31],
        40: [1, 32],
        41: [1, 33],
        42: [1, 34]
      }],
      defaultActions: {
        12: [2, 1]
      },
      parseError: function parseError(str, hash) {
        throw new Error(str);
      },
      parse: function parse(input) {
        var self = this,
            stack = [0],
            vstack = [null],
            // semantic value stack
        lstack = [],
            // location stack
        table = this.table,
            yytext = '',
            yylineno = 0,
            yyleng = 0,
            recovering = 0,
            TERROR = 2,
            EOF = 1; //this.reductionCount = this.shiftCount = 0;

        this.lexer.setInput(input);
        this.lexer.yy = this.yy;
        this.yy.lexer = this.lexer;
        this.yy.parser = this;
        if (typeof this.lexer.yylloc == 'undefined') this.lexer.yylloc = {};
        var yyloc = this.lexer.yylloc;
        lstack.push(yyloc);
        var ranges = this.lexer.options && this.lexer.options.ranges;
        if (typeof this.yy.parseError === 'function') this.parseError = this.yy.parseError;

        function popStack(n) {
          stack.length = stack.length - 2 * n;
          vstack.length = vstack.length - n;
          lstack.length = lstack.length - n;
        }

        function lex() {
          var token;
          token = self.lexer.lex() || 1; // $end = 1
          // if token isn't its numeric value, convert

          if (typeof token !== 'number') {
            token = self.symbols_[token] || token;
          }

          return token;
        }

        var symbol,
            preErrorSymbol,
            state,
            action,
            r,
            yyval = {},
            p,
            len,
            newState,
            expected;

        while (true) {
          // retreive state number from top of stack
          state = stack[stack.length - 1]; // use default actions if available

          if (this.defaultActions[state]) {
            action = this.defaultActions[state];
          } else {
            if (symbol === null || typeof symbol == 'undefined') {
              symbol = lex();
            } // read action for current state and first input


            action = table[state] && table[state][symbol];
          } // handle parse error


          if (typeof action === 'undefined' || !action.length || !action[0]) {
            var errStr = '';

            if (!recovering) {
              // Report error
              expected = [];

              for (p in table[state]) {
                if (this.terminals_[p] && p > 2) {
                  expected.push("'" + this.terminals_[p] + "'");
                }
              }

              if (this.lexer.showPosition) {
                errStr = 'Parse error on line ' + (yylineno + 1) + ":\n" + this.lexer.showPosition() + "\nExpecting " + expected.join(', ') + ", got '" + (this.terminals_[symbol] || symbol) + "'";
              } else {
                errStr = 'Parse error on line ' + (yylineno + 1) + ": Unexpected " + (symbol == 1
                /*EOF*/
                ? "end of input" : "'" + (this.terminals_[symbol] || symbol) + "'");
              }

              this.parseError(errStr, {
                text: this.lexer.match,
                token: this.terminals_[symbol] || symbol,
                line: this.lexer.yylineno,
                loc: yyloc,
                expected: expected
              });
            } // just recovered from another error


            if (recovering == 3) {
              if (symbol == EOF) {
                throw new Error(errStr || 'Parsing halted.');
              } // discard current lookahead and grab another


              yyleng = this.lexer.yyleng;
              yytext = this.lexer.yytext;
              yylineno = this.lexer.yylineno;
              yyloc = this.lexer.yylloc;
              symbol = lex();
            } // try to recover from error


            while (1) {
              // check for error recovery rule in this state
              if (TERROR.toString() in table[state]) {
                break;
              }

              if (state === 0) {
                throw new Error(errStr || 'Parsing halted.');
              }

              popStack(1);
              state = stack[stack.length - 1];
            }

            preErrorSymbol = symbol == 2 ? null : symbol; // save the lookahead token

            symbol = TERROR; // insert generic error symbol as new lookahead

            state = stack[stack.length - 1];
            action = table[state] && table[state][TERROR];
            recovering = 3; // allow 3 real symbols to be shifted before reporting a new error
          } // this shouldn't happen, unless resolve defaults are off


          if (action[0] instanceof Array && action.length > 1) {
            throw new Error('Parse Error: multiple actions possible at state: ' + state + ', token: ' + symbol);
          }

          switch (action[0]) {
            case 1:
              // shift
              //this.shiftCount++;
              stack.push(symbol);
              vstack.push(this.lexer.yytext);
              lstack.push(this.lexer.yylloc);
              stack.push(action[1]); // push state

              symbol = null;

              if (!preErrorSymbol) {
                // normal execution/no error
                yyleng = this.lexer.yyleng;
                yytext = this.lexer.yytext;
                yylineno = this.lexer.yylineno;
                yyloc = this.lexer.yylloc;
                if (recovering > 0) recovering--;
              } else {
                // error just occurred, resume old lookahead f/ before error
                symbol = preErrorSymbol;
                preErrorSymbol = null;
              }

              break;

            case 2:
              // reduce
              //this.reductionCount++;
              len = this.productions_[action[1]][1]; // perform semantic action

              yyval.$ = vstack[vstack.length - len]; // default to $$ = $1
              // default location, uses first token for firsts, last for lasts

              yyval._$ = {
                first_line: lstack[lstack.length - (len || 1)].first_line,
                last_line: lstack[lstack.length - 1].last_line,
                first_column: lstack[lstack.length - (len || 1)].first_column,
                last_column: lstack[lstack.length - 1].last_column
              };

              if (ranges) {
                yyval._$.range = [lstack[lstack.length - (len || 1)].range[0], lstack[lstack.length - 1].range[1]];
              }

              r = this.performAction.call(yyval, yytext, yyleng, yylineno, this.yy, action[1], vstack, lstack);

              if (typeof r !== 'undefined') {
                return r;
              } // pop off stack


              if (len) {
                stack = stack.slice(0, -1 * len * 2);
                vstack = vstack.slice(0, -1 * len);
                lstack = lstack.slice(0, -1 * len);
              }

              stack.push(this.productions_[action[1]][0]); // push nonterminal (reduce)

              vstack.push(yyval.$);
              lstack.push(yyval._$); // goto new state = table[STATE][NONTERMINAL]

              newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
              stack.push(newState);
              break;

            case 3:
              // accept
              return true;
          }
        }

        return true;
      }
    };
    /* Jison generated lexer */

    var lexer = function () {
      var lexer = {
        EOF: 1,
        parseError: function parseError(str, hash) {
          if (this.yy.parser) {
            this.yy.parser.parseError(str, hash);
          } else {
            throw new Error(str);
          }
        },
        setInput: function setInput(input) {
          this._input = input;
          this._more = this._less = this.done = false;
          this.yylineno = this.yyleng = 0;
          this.yytext = this.matched = this.match = '';
          this.conditionStack = ['INITIAL'];
          this.yylloc = {
            first_line: 1,
            first_column: 0,
            last_line: 1,
            last_column: 0
          };
          if (this.options.ranges) this.yylloc.range = [0, 0];
          this.offset = 0;
          return this;
        },
        input: function input() {
          var ch = this._input[0];
          this.yytext += ch;
          this.yyleng++;
          this.offset++;
          this.match += ch;
          this.matched += ch;
          var lines = ch.match(/(?:\r\n?|\n).*/g);

          if (lines) {
            this.yylineno++;
            this.yylloc.last_line++;
          } else {
            this.yylloc.last_column++;
          }

          if (this.options.ranges) this.yylloc.range[1]++;
          this._input = this._input.slice(1);
          return ch;
        },
        unput: function unput(ch) {
          var len = ch.length;
          var lines = ch.split(/(?:\r\n?|\n)/g);
          this._input = ch + this._input;
          this.yytext = this.yytext.substr(0, this.yytext.length - len - 1); //this.yyleng -= len;

          this.offset -= len;
          var oldLines = this.match.split(/(?:\r\n?|\n)/g);
          this.match = this.match.substr(0, this.match.length - 1);
          this.matched = this.matched.substr(0, this.matched.length - 1);
          if (lines.length - 1) this.yylineno -= lines.length - 1;
          var r = this.yylloc.range;
          this.yylloc = {
            first_line: this.yylloc.first_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.first_column,
            last_column: lines ? (lines.length === oldLines.length ? this.yylloc.first_column : 0) + oldLines[oldLines.length - lines.length].length - lines[0].length : this.yylloc.first_column - len
          };

          if (this.options.ranges) {
            this.yylloc.range = [r[0], r[0] + this.yyleng - len];
          }

          return this;
        },
        more: function more() {
          this._more = true;
          return this;
        },
        less: function less(n) {
          this.unput(this.match.slice(n));
        },
        pastInput: function pastInput() {
          var past = this.matched.substr(0, this.matched.length - this.match.length);
          return (past.length > 20 ? '...' : '') + past.substr(-20).replace(/\n/g, "");
        },
        upcomingInput: function upcomingInput() {
          var next = this.match;

          if (next.length < 20) {
            next += this._input.substr(0, 20 - next.length);
          }

          return (next.substr(0, 20) + (next.length > 20 ? '...' : '')).replace(/\n/g, "");
        },
        showPosition: function showPosition() {
          var pre = this.pastInput();
          var c = new Array(pre.length + 1).join("-");
          return pre + this.upcomingInput() + "\n" + c + "^";
        },
        next: function next() {
          if (this.done) {
            return this.EOF;
          }

          if (!this._input) this.done = true;
          var token, match, tempMatch, index, lines;

          if (!this._more) {
            this.yytext = '';
            this.match = '';
          }

          var rules = this._currentRules();

          for (var i = 0; i < rules.length; i++) {
            tempMatch = this._input.match(this.rules[rules[i]]);

            if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
              match = tempMatch;
              index = i;
              if (!this.options.flex) break;
            }
          }

          if (match) {
            lines = match[0].match(/(?:\r\n?|\n).*/g);
            if (lines) this.yylineno += lines.length;
            this.yylloc = {
              first_line: this.yylloc.last_line,
              last_line: this.yylineno + 1,
              first_column: this.yylloc.last_column,
              last_column: lines ? lines[lines.length - 1].length - lines[lines.length - 1].match(/\r?\n?/)[0].length : this.yylloc.last_column + match[0].length
            };
            this.yytext += match[0];
            this.match += match[0];
            this.matches = match;
            this.yyleng = this.yytext.length;

            if (this.options.ranges) {
              this.yylloc.range = [this.offset, this.offset += this.yyleng];
            }

            this._more = false;
            this._input = this._input.slice(match[0].length);
            this.matched += match[0];
            token = this.performAction.call(this, this.yy, this, rules[index], this.conditionStack[this.conditionStack.length - 1]);
            if (this.done && this._input) this.done = false;
            if (token) return token;else return;
          }

          if (this._input === "") {
            return this.EOF;
          } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. Unrecognized text.\n' + this.showPosition(), {
              text: "",
              token: null,
              line: this.yylineno
            });
          }
        },
        lex: function lex() {
          var r = this.next();

          if (typeof r !== 'undefined') {
            return r;
          } else {
            return this.lex();
          }
        },
        begin: function begin(condition) {
          this.conditionStack.push(condition);
        },
        popState: function popState() {
          return this.conditionStack.pop();
        },
        _currentRules: function _currentRules() {
          return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
        },
        topState: function topState() {
          return this.conditionStack[this.conditionStack.length - 2];
        },
        pushState: function begin(condition) {
          this.begin(condition);
        }
      };
      lexer.options = {};

      lexer.performAction = function anonymous(yy, yy_, $avoiding_name_collisions, YY_START) {

        switch ($avoiding_name_collisions) {
          case 0:
            break;

          case 1:
            return "*";

          case 2:
            return "/";

          case 3:
            return "-";

          case 4:
            return "+";

          case 5:
            return "&";

          case 6:
            return "^";

          case 7:
            return "(";

          case 8:
            return ")";

          case 9:
            return "[";

          case 10:
            return "]";

          case 11:
            return ",";

          case 12:
            return "==";

          case 13:
            return "!=";

          case 14:
            return "~=";

          case 15:
            return ">=";

          case 16:
            return "<=";

          case 17:
            return "<";

          case 18:
            return ">";

          case 19:
            return "|?";

          case 20:
            return "|";

          case 21:
            return "??";

          case 22:
            return "notIn";

          case 23:
            return "and";

          case 24:
            return "or";

          case 25:
            return "not";

          case 26:
            return "in";

          case 27:
            return "of";

          case 28:
            return "if";

          case 29:
            return "then";

          case 30:
            return "else";

          case 31:
            return "mod";

          case 32:
            break;

          case 33:
            return "Number";

          case 34:
            yy_.yytext = JSON.stringify({
              name: yy_.yytext,
              type: 'unescaped'
            });
            return "Symbol";

          case 35:
            yy_.yytext = JSON.stringify({
              name: yy.buildString("'", yy_.yytext),
              type: 'single-quoted'
            });
            return "Symbol";

          case 36:
            yy_.yytext = JSON.stringify(yy.buildString('"', yy_.yytext));
            return "String";

          case 37:
            return "EndOfExpression";
        }
      };

      lexer.rules = [/^(?:\(\*[^*]*\*+(?:[^)(*][^*]*\*+)*\))/, /^(?:\*)/, /^(?:\/)/, /^(?:-)/, /^(?:\+)/, /^(?:&)/, /^(?:\^)/, /^(?:\()/, /^(?:\))/, /^(?:\[)/, /^(?:\])/, /^(?:\,)/, /^(?:==)/, /^(?:\!=)/, /^(?:\~=)/, /^(?:>=)/, /^(?:<=)/, /^(?:<)/, /^(?:>)/, /^(?:\|\?)/, /^(?:\|)/, /^(?:\?\?)/, /^(?:not\s+in[^\w])/, /^(?:and[^\w])/, /^(?:or[^\w])/, /^(?:not[^\w])/, /^(?:in[^\w])/, /^(?:of[^\w])/, /^(?:if[^\w])/, /^(?:then[^\w])/, /^(?:else[^\w])/, /^(?:mod[^\w])/, /^(?:\s+)/, /^(?:[0-9]+(?:\.[0-9]+)?(?![0-9\.]))/, /^(?:[a-zA-Z$_][\.:a-zA-Z0-9$_]*)/, /^(?:'(?:\\'|\\\\|[^'\\])*')/, /^(?:"(?:\\"|\\\\|[^"\\])*")/, /^(?:$)/];
      lexer.conditions = {
        "INITIAL": {
          "rules": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37],
          "inclusive": true
        }
      };
      return lexer;
    }();

    parser.lexer = lexer;

    function Parser() {
      this.yy = {};
    }

    Parser.prototype = parser;
    parser.Parser = Parser;
    return new Parser();
  }();

  var parser = _parser;
  _parser.Parser;

  /**
   * Runtime error – user attempted to call a function
   * which is not a predefined function, nor specified
   * in `options.symbols`.
   *
   * @prop {string} functionName
   * @prop {string} I18N_STRING has the value `'UNKNOWN_FUNCTION'`
   */
  var UnknownFunctionError = /*#__PURE__*/function (_ReferenceError) {
    _inherits(UnknownFunctionError, _ReferenceError);

    var _super = _createSuper(UnknownFunctionError);

    function UnknownFunctionError(funcName) {
      var _this;

      _classCallCheck(this, UnknownFunctionError);

      _this = _super.call(this, "Unknown function: ".concat(funcName, "()"));

      _defineProperty(_assertThisInitialized(_this), "I18N_STRING", 'UNKNOWN_FUNCTION');

      _this.functionName = funcName;
      return _this;
    }

    return _createClass(UnknownFunctionError);
  }( /*#__PURE__*/_wrapNativeSuper(ReferenceError));
  /**
   * Runtime error – user attempted to access a property which
   * is not present in the `data` object, nor in the `symbols`.
   * If the property is meant to be empty, use `undefined` or
   * `null` as its value. If you need to use optional properties
   * in your `data`, define a `customProp` function.
   *
   * @prop {string} propertyName
   * @prop {string} I18N_STRING has the value `'UNKNOWN_PROPERTY'`
   */

  var UnknownPropertyError = /*#__PURE__*/function (_ReferenceError2) {
    _inherits(UnknownPropertyError, _ReferenceError2);

    var _super2 = _createSuper(UnknownPropertyError);

    function UnknownPropertyError(propName) {
      var _this2;

      _classCallCheck(this, UnknownPropertyError);

      _this2 = _super2.call(this, "Property \u201C".concat(propName, "\u201D does not exist."));

      _defineProperty(_assertThisInitialized(_this2), "I18N_STRING", 'UNKNOWN_PROPERTY');

      _this2.propertyName = propName;
      return _this2;
    }

    return _createClass(UnknownPropertyError);
  }( /*#__PURE__*/_wrapNativeSuper(ReferenceError));
  /**
   * Compile time error – you specified an option which
   * was not recognized by Filtrex. Double-check your
   * spelling and the version of Filtrex you are using.
   *
   * @prop {string} keyName
   * @prop {string} I18N_STRING has the value `'UNKNOWN_OPTION'`
   */

  var UnknownOptionError = /*#__PURE__*/function (_TypeError) {
    _inherits(UnknownOptionError, _TypeError);

    var _super3 = _createSuper(UnknownOptionError);

    function UnknownOptionError(key) {
      var _this3;

      _classCallCheck(this, UnknownOptionError);

      _this3 = _super3.call(this, "Unknown option: ".concat(key));

      _defineProperty(_assertThisInitialized(_this3), "I18N_STRING", 'UNKNOWN_OPTION');

      _this3.keyName = key;
      return _this3;
    }

    return _createClass(UnknownOptionError);
  }( /*#__PURE__*/_wrapNativeSuper(TypeError));
  /**
   * Runtime error – user passed a different type than the one
   * accepted by the function or operator.
   *
   * The possible values of `expectedType` and `recievedType`
   * are: `"undefined"`, `"null"`, `"true"`, `"false"`, `"number"`,
   * `"text"`, `"unknown type"`, `"list"`, `"object"`, `"text, number or boolean"`
   * and `"logical value (“true” or “false”)"`
   *
   * @prop {string} expectedType
   * @prop {string} recievedType
   * @prop {string} I18N_STRING has the value `'UNEXPECTED_TYPE'`
   */

  var UnexpectedTypeError = /*#__PURE__*/function (_TypeError2) {
    _inherits(UnexpectedTypeError, _TypeError2);

    var _super4 = _createSuper(UnexpectedTypeError);

    function UnexpectedTypeError(expected, got) {
      var _this4;

      _classCallCheck(this, UnexpectedTypeError);

      _this4 = _super4.call(this, "Expected a ".concat(expected, ", but got a ").concat(got, " instead."));

      _defineProperty(_assertThisInitialized(_this4), "I18N_STRING", 'UNEXPECTED_TYPE');

      _this4.expectedType = expected;
      _this4.recievedType = got;
      return _this4;
    }

    return _createClass(UnexpectedTypeError);
  }( /*#__PURE__*/_wrapNativeSuper(TypeError));
  /**
   * An internal error. This was not meant to happen, please report
   * at https://github.com/m93a/filtrex/
   *
   * @prop {string} I18N_STRING has the value `'INTERNAL'`
   */

  var InternalError = /*#__PURE__*/function (_Error) {
    _inherits(InternalError, _Error);

    var _super5 = _createSuper(InternalError);

    function InternalError(message) {
      var _this5;

      _classCallCheck(this, InternalError);

      _this5 = _super5.call(this, message);

      _defineProperty(_assertThisInitialized(_this5), "I18N_STRING", 'INTERNAL');

      return _this5;
    }

    return _createClass(InternalError);
  }( /*#__PURE__*/_wrapNativeSuper(Error));

  /**
   * Determines whether an object has a property with the specified name.
   * @param {object} obj the object to be checked
   * @param {string|number} prop property name
   */

  function hasOwnProperty(obj, prop) {
    if (Object.prototype.toString.call(obj) === '[object Object]') {
      return Object.hasOwn(obj, prop);
    }

    return false;
  }
  /**
   * Mathematically correct modulo
   * @param {number} a
   * @param {number} b
   * @returns {number}
   */

  function mod(a, b) {
    return (a % b + b) % b;
  }
  /**
   * Converts instances of Number, String and Boolean to primitives
   */

  function unbox(value) {
    if (_typeof(value) !== 'object') return value;
    if (value instanceof Number || value instanceof String || value instanceof Boolean) return value.valueOf();
  }
  /**
   * Unboxes value and unwraps it from a single-element array
   */

  function unwrap(value) {
    if (Array.isArray(value) && value.length === 1) value = value[0];
    return unbox(value);
  }
  /**
   * Returns the type of a value in a neat, user-readable way
   */

  function prettyType(value) {
    value = unwrap(value);
    if (value === undefined) return 'undefined';
    if (value === null) return 'null';
    if (value === true) return 'true';
    if (value === false) return 'false';

    if (typeof value === 'number') {
      if (Number.isFinite(value)) return 'number';else if (value === Number.NEGATIVE_INFINITY) return '-Infinity';else if (value === Number.POSITIVE_INFINITY) return 'Infinity';else return 'NaN';
    }

    if (typeof value === 'string') return 'text';
    if (_typeof(value) !== 'object' && typeof value !== 'function') return 'unknown type';
    if (Array.isArray(value)) return 'list';
    return 'object';
  } // Type assertions/coertions

  function num(value) {
    value = unwrap(value);

    if (typeof value === 'number') {
      if (!Number.isFinite(value)) {
        throw new UnexpectedTypeError('number', prettyType(value));
      }

      return value;
    }

    if (typeof value === 'string') {
      if (value === '') return 0;

      var _num = Number.parseFloat(value);

      if (Number.isNaN(_num) === false) return value;
    } else if (typeof value === 'boolean') {
      return value === true ? 1 : 0;
    }

    throw new UnexpectedTypeError('number', prettyType(value));
  }
  function str(value) {
    value = unwrap(value);
    if (typeof value === 'string') return value;
    if (typeof value === 'number' || typeof value === 'boolean') return String(value);
    throw new UnexpectedTypeError('text', prettyType(value));
  }
  function simple(value) {
    value = unwrap(value);

    if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
      return value;
    }

    throw new UnexpectedTypeError('text, number or boolean', prettyType(value));
  }
  function bool(value) {
    value = unwrap(value);
    if (typeof value === 'boolean') return value;
    if (typeof value === 'string') return value !== '';
    if (typeof value === 'number') return value !== 0; // TODO fix error message

    throw new UnexpectedTypeError('logical value (“true” or “false”)', prettyType(value));
  }
  function arr(value) {
    if (value === undefined || value === null) {
      throw new UnexpectedTypeError('list', prettyType(value));
    }

    if (Array.isArray(value)) {
      return value;
    } else {
      return [value];
    }
  }
  function ensureFunc(value) {
    if (typeof value === 'function') return value;
    throw new UnexpectedTypeError('function', prettyType(value));
  }
  /**
   * Array.flat polyfill from MDN
   */

  function flatten(input) {
    var stack = _toConsumableArray(input);

    var res = [];

    while (stack.length) {
      // pop value from stack
      var next = stack.pop();

      if (Array.isArray(next)) {
        // push back array items, won't modify the original input
        stack.push.apply(stack, _toConsumableArray(next));
      } else {
        res.push(next);
      }
    } // reverse to restore input order


    return res.reverse();
  }

  var cast = {
    asBoolean: bool,
    asNumber: num,
    asSimple: simple,
    asArray: arr,
    asString: str,
    asFunction: ensureFunc
  }; // Shared utility functions

  var std = {
    isfn: function isfn(fns, funcName) {
      return hasOwnProperty(fns, funcName) && typeof fns[funcName] === "function";
    },
    unknown: function unknown(funcName) {
      throw new UnknownFunctionError(funcName);
    },
    coerceArray: arr,
    coerceNumber: num,
    coerceNumberOrString: simple,
    coerceBoolean: bool,
    isSubset: function isSubset(a, b) {
      var A = arr(a);
      var B = arr(b);
      return A.every(function (val) {
        return B.includes(val);
      });
    },
    warnDeprecated: function () {
      var warnMax = 3;
      var warnedTimes = {
        noop: 0
      };
      return function (cause, value) {
        switch (cause) {
          case 'noop':
            if (warnedTimes.noop++ >= warnMax) break;
            console.warn("noop");
            break;
        }

        return value;
      };
    }(),
    buildString: function buildString(quote, literal) {
      quote = String(quote)[0];
      literal = String(literal);
      var built = '';
      if (literal[0] !== quote || literal[literal.length - 1] !== quote) throw new InternalError("Unexpected internal error: String literal doesn't begin/end with the right quotation mark.");

      for (var i = 1; i < literal.length - 1; i++) {
        if (literal[i] === "\\") {
          i++;
          if (i >= literal.length - 1) throw new InternalError("Unexpected internal error: Unescaped backslash at the end of string literal.");
          if (literal[i] === "\\") built += '\\';else if (literal[i] === quote) built += quote;else throw new InternalError("Unexpected internal error: Invalid escaped character in string literal: ".concat(literal[i]));
        } else if (literal[i] === quote) {
          throw new InternalError("Unexpected internal error: String literal contains unescaped quotation mark.");
        } else {
          built += literal[i];
        }
      }

      return built;
    },
    reduceRelation: function reduceRelation(arr) {
      var declarations = [];
      var comparisons = [];
      var previousExpression = flatten([arr[0]]).join('');
      var j = 0;

      for (var i = 1; i < arr.length - 1; i += 2) {
        var expr = flatten([arr[i + 1]]).join('');
        var tempVar = "tmp".concat(j++);
        comparisons.push("ops[\"".concat(arr[i], "\"](").concat(previousExpression, ", ").concat(tempVar, " = ").concat(expr, ")"));
        previousExpression = tempVar;
        declarations.push(tempVar);
      }

      return "(function(){ var ".concat(declarations.join(', '), "; return ").concat(comparisons.join(' && '), ";})()");
    }
  };
  parser.yy = Object.create(std);
  /**
   * A custom prop function which doesn't throw an UnknownPropertyError
   * if the user tries to access a property of `undefined` and `null`,
   * but instead returns `unknown` or `null`. This effectively turns
   * `a of b` into `b.?a`. You can use this function using the following
   * code:
   * ```
   * import {
   *   compileExpression,
   *   useOptionalChaining
   * } from 'filtrex'
   *
   * const expr = "foo of bar"
   *
   * const fn = compileExpression(expr, {
   *   customProp: useOptionalChaining
   * });
   *
   * fn({ bar: null }) // → null
   * ```
   */

  function useOptionalChaining(name, get, obj, type) {
    if (obj === null || obj === undefined) return obj;
    return get(name);
  }
  /**
   * A custom prop function which treats dots inside a symbol
   * as property accessors. If you want to use the `foo.bar`
   * syntax to access properties instead of the default
   * `bar of foo`, you can use this function using the following
   * code:
   * ```
   * import {
   *   compileExpression,
   *   useDotAccessOperator
   * } from 'filtrex'
   *
   * const expr = "foo.bar"
   *
   * const fn = compileExpression(expr, {
   *   customProp: useDotAccessOperator
   * });
   *
   * fn({ foo: { bar: 42 } }) // → 42
   * ```
   */

  function useDotAccessOperator(name, get, obj, type) {
    // ignore dots inside escaped symbol
    if (type === 'single-quoted') return get(name);
    var parts = name.split('.');

    var _iterator = _createForOfIteratorHelper(parts),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var _obj;

        var propertyName = _step.value;

        if (hasOwnProperty((_obj = obj) !== null && _obj !== void 0 ? _obj : {}, propertyName)) {
          obj = obj[propertyName];
        } else {
          throw new UnknownPropertyError(propertyName);
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    return obj;
  }
  /**
   * A custom prop function which combines `useOptionalChaining` and `useDotAccessOperator`.
   * The user can use both `foo of bar` and `bar.foo`, both have optional chaining.
   * You can use this function using the following code:
   * ```
   * import {
   *   compileExpression,
   *   useDotAccessOperatorAndOptionalChaining
   * } from 'filtrex'
   *
   * const expr = "foo.bar"
   *
   * const fn = compileExpression(expr, {
   *   customProp: useDotAccessOperatorAndOptionalChaining
   * });
   *
   * fn({ foo: null }) // → null
   * ```
   */

  function useDotAccessOperatorAndOptionalChaining(name, get, obj, type) {
    if (obj === null || obj === undefined) return obj; // ignore dots inside escaped symbol

    if (type === 'single-quoted') return get(name);
    var parts = name.split('.');

    var _iterator2 = _createForOfIteratorHelper(parts),
        _step2;

    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var propertyName = _step2.value;

        if (obj === null || obj === undefined) {
          return obj;
        } else {
          obj = obj[propertyName];
        }
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }

    return obj;
  } // Functions available to the expression

  var builtinFunctions = {
    exists: function exists(v) {
      return v !== undefined && v !== null;
    },
    empty: function empty(v) {
      return v === undefined || v === null || v === '' || Array.isArray(v) && v.length === 0;
    }
  };
  /**
   * A simple, safe, JavaScript expression engine, allowing end-users to enter arbitrary expressions without p0wning you.
   *
   * @example
   * // Input from user (e.g. search filter)
   * let expression = 'transactions <= 5 and abs(profit) > 20.5';
   *
   * // Compile expression to executable function
   * let myfilter = compileExpression(expression);
   *
   * // Execute function
   * myfilter({transactions: 3, profit:-40.5}); // returns 1
   * myfilter({transactions: 3, profit:-14.5}); // returns 0
   *
   * @param expression
   * The expression to be parsed. Under the hood, the expression gets compiled to a clean and fast JavaScript function.
   * There are only 2 types: numbers and strings. Numbers may be floating point or integers. Boolean logic is applied
   * on the truthy value of values (e.g. any non-zero number is true, any non-empty string is true, otherwise false).
   * Examples of numbers: `43`, `-1.234`; example of a string: `"hello"`; example of external data variable: `foo`, `a.b.c`,
   * `'foo-bar'`.
   * You can use the following operations:
   *  * `x + y` Add
   *  * `x & y` String concat
   *  * `x - y` Subtract
   *  * `x * y` Multiply
   *  * `x / y` Divide
   *  * `x ^ y` Power
   *  * `x mod y` Modulo
   *  * `x == y` Equals
   *  * `x < y` Less than
   *  * `x <= y` Less than or equal to
   *  * `x > y` Greater than
   *  * `x >= y` Greater than or equal to
   *  * `x == y <= z` Chained relation, equivalent to `(x == y and y <= z)`
   *  * `x of y` Get property x of object y
   *  * `x in (a, b, c)` Equivalent to `(x == a or x == b or x == c)`
   *  * `x not in (a, b, c)` Equivalent to `(x != a and x != b and x != c)`
   *  * `x or y` Boolean or
   *  * `x and y` Boolean and
   *  * `not x` Boolean not
   *  * `if x then y else z` If boolean x, value y, else z
   *  * `( x )` Explicity operator precedence
   *  * `( x, y, z )` Array of elements x, y and z
   *  * `exists(x)` True if `x` is neither `undefined` nor `null`
   *  * `empty(x)` True if `x` doesn't exist, it is an empty string or empty array
   *  * `myFooBarFunction(x)` Custom function defined in `options.symbols`
   */

  function compileExpression(expression, options) {
    var _symbols;

    // Check and coerce arguments
    if (arguments.length > 2) throw new TypeError('Too many arguments.');
    options = _typeof(options) === "object" ? options : {};
    var knownOptions = ['symbols', 'customProp', 'operators'];
    var _options = options,
        symbols = _options.symbols,
        customProp = _options.customProp,
        operators = _options.operators;

    for (var _i = 0, _Object$keys = Object.keys(options); _i < _Object$keys.length; _i++) {
      var key = _Object$keys[_i];
      if (!knownOptions.includes(key)) throw new UnknownOptionError(key);
    }

    symbols = _objectSpread2(_objectSpread2({}, builtinFunctions), (_symbols = symbols) !== null && _symbols !== void 0 ? _symbols : {});
    var defaultOperators = {
      '|': function _(a, b) {
        return ensureFunc(b)(a);
      },
      '|?': function _(a, b) {
        return builtinFunctions.exists(a) ? ensureFunc(b)(a) : a;
      },
      '+': function _(a, b) {
        return num(a) + num(b);
      },
      '-': function _(a, b) {
        return b === undefined ? -num(a) : num(a) - num(b);
      },
      '*': function _(a, b) {
        return num(a) * num(b);
      },
      '/': function _(a, b) {
        return num(a) / num(b);
      },
      '^': function _(a, b) {
        return Math.pow(num(a), num(b));
      },
      'mod': function mod$1(a, b) {
        return mod(num(a), num(b));
      },
      '&': function _(a, b) {
        return str(a) + str(b);
      },
      '==': function _(a, b) {
        return a === b;
      },
      '!=': function _(a, b) {
        return a !== b;
      },
      '<': function _(a, b) {
        return simple(a) < simple(b);
      },
      '<=': function _(a, b) {
        return simple(a) <= simple(b);
      },
      '>=': function _(a, b) {
        return simple(a) >= simple(b);
      },
      '>': function _(a, b) {
        return simple(a) > simple(b);
      },
      '~=': function _(a, b) {
        return RegExp(str(b)).test(str(a));
      },
      '??': function _(a, b) {
        return symbols.empty(a) ? b : a;
      }
    };

    if (operators) {
      for (var _i2 = 0, _Object$keys2 = Object.keys(operators); _i2 < _Object$keys2.length; _i2++) {
        var name = _Object$keys2[_i2];
        defaultOperators[name] = operators[name];
      }
    }

    operators = defaultOperators; // Compile the expression

    var js = flatten(parser.parse(expression));
    js.unshift('return ');
    js.push(';'); // Metaprogramming functions

    function nakedProp(name, obj, type) {
      if (hasOwnProperty(obj !== null && obj !== void 0 ? obj : {}, name)) return obj[name];
      throw new UnknownPropertyError(name);
    }

    function safeGetter(obj) {
      return function get(name) {
        if (hasOwnProperty(obj !== null && obj !== void 0 ? obj : {}, name)) return obj[name];
        throw new UnknownPropertyError(name);
      };
    }

    if (typeof customProp === 'function') {
      nakedProp = function nakedProp(name, obj, type) {
        return customProp(name, safeGetter(obj), obj, type);
      };
    }

    function createCall(fns) {
      return function call(_ref) {
        var name = _ref.name;

        for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }

        if (hasOwnProperty(fns, name) && typeof fns[name] === "function") return fns[name].apply(fns, args);
        throw new UnknownFunctionError(name);
      };
    }

    function prop(_ref2, obj) {
      var name = _ref2.name,
          type = _ref2.type;
      var isUnescaped = type === 'unescaped';
      if (isUnescaped && hasOwnProperty(symbols, name)) return symbols[name];
      return nakedProp(name, obj, type);
    } // Patch together and return


    var func = new Function('call', 'ops', 'std', 'prop', 'data', js.join(''));
    return function (data) {
      try {
        return func(createCall(symbols), operators, std, prop, data);
      } catch (e) {
        return e;
      }
    };
  }

  exports.InternalError = InternalError;
  exports.UnknownFunctionError = UnknownFunctionError;
  exports.UnknownOptionError = UnknownOptionError;
  exports.UnknownPropertyError = UnknownPropertyError;
  exports.cast = cast;
  exports.compileExpression = compileExpression;
  exports.useDotAccessOperator = useDotAccessOperator;
  exports.useDotAccessOperatorAndOptionalChaining = useDotAccessOperatorAndOptionalChaining;
  exports.useOptionalChaining = useOptionalChaining;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

})({});
