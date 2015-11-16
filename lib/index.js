'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lunar = require('./lunar.1900.2100.data');

var _lunar2 = _interopRequireDefault(_lunar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var START_YEAR = 1900;
var END_YEAR = 2100;

var _lunar2Solar = function _lunar2Solar(lunar) {
  var leap = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

  if (lunar.year <= START_YEAR || lunar.year >= END_YEAR) {
    throw new Error('Invalid date: (1900, 2100) ' + date.toString());
  }
  var offset = lunar.year - START_YEAR;
  var leapMonth = _lunar2.default[offset][0];

  if (leap && leapMonth == lunar.month || leapMonth > 0 && lunar.month > leapMonth) {
    lunar.month++;
  }

  var str = _lunar2.default[offset][lunar.month];
  var sMonth = Number(str.substring(0, 2));
  var sDate = Number(str.substring(2, 4));

  if (sMonth > 12) {
    lunar.year++;
    sMonth -= 12;
  };

  var solar = new Date(lunar.year, sMonth - 1, sDate);
  var time = solar.getTime() + (lunar.date - 1) * 24 * 60 * 60 * 1000;
  return new Date(time);
};

var _retrieval = function _retrieval(mapping, solar) {
  var pre = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];

  var first = { year: solar.year, month: null, date: null };

  var month = mapping.length - 1;
  var lunar = { year: pre ? solar.year - 1 : solar.year, month: month, date: null };

  do {

    first.month = Number(mapping[month].substring(0, 2));
    first.date = Number(mapping[month].substring(2, 4));

    if (pre && first.month > 12) {
      first.month = first.month % 12;
    } else if (pre && first.month <= 12) {
      first.year--;
    }

    if (first.year < solar.year || first.month < solar.month || first.month == solar.month && solar.date >= first.date) {
      break;
    }

    lunar.month = --month;
  } while (month > 0);

  if (month <= 0) {
    return null;
  }

  var fDate = new Date(first.year, first.month - 1, first.date);
  var sDate = new Date(solar.year, solar.month - 1, solar.date);
  lunar.date = Math.ceil((sDate.getTime() - fDate.getTime()) / (1000 * 60 * 60 * 24) + 1);

  var leap = mapping[0];
  if (leap != 0 && leap < lunar.month) {
    lunar.month--;
  }

  return { solar: solar, first: first, lunar: lunar, leap: leap };
};

var _solar2Lunar = function _solar2Lunar(date) {
  var sYear = date.getFullYear();
  if (sYear <= START_YEAR || sYear >= END_YEAR) {
    throw new Error('Invalid date: (1900, 2100) ' + date.toString());
  }
  var offset = sYear - START_YEAR;
  var solar = _getDateObj(date);

  var ret = _retrieval(_lunar2.default[offset], solar);
  ret = ret || _retrieval(_lunar2.default[offset - 1], solar, true);

  return ret;
};

var _getDateObj = function _getDateObj(date) {
  return {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    date: date.getDate()
  };
};

var Lunar = (function () {
  function Lunar(date) {
    _classCallCheck(this, Lunar);

    this.solar = date || new Date();
    var obj = _solar2Lunar(this.solar);
    if (null === obj) {
      throw new Error('unknown error.');
    }
    this.lunar = obj.lunar;
  }

  _createClass(Lunar, [{
    key: 'getYear',
    value: function getYear() {
      return this.lunar.year;
    }
  }, {
    key: 'getMonth',
    value: function getMonth() {
      return this.lunar.month;
    }
  }, {
    key: 'getDate',
    value: function getDate() {
      return this.lunar.date;
    }
  }]);

  return Lunar;
})();

Lunar.solar2Lunar = _solar2Lunar;
Lunar.lunar2Solar = _lunar2Solar;
exports.default = Lunar;