
let _ = require('underscore');
import ls from './localStorage'
import ss from './sessionStorage'
import cookie from './sessionStorage'

var getQueryVariable = function (variable, url_str = '') {
  var query = url_str || window.location.search.substring(1);
  var vars = query.split("&");
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    if (pair[0] == variable) { return pair[1]; }
  }
  return (false);
}

var guidGenerator = function () {
  return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
}
var getUUID = function () {
  return (guidGenerator() + guidGenerator() + guidGenerator() + guidGenerator() + guidGenerator() + guidGenerator() + guidGenerator() + guidGenerator())
}


export default {
  requestId: function(){
    return getUUID()
  },
  // d1到d2范围的随机数
  range(d1, d2) {
    return parseInt(Math.random() * (d2 - d1) + d1);
  },
  // obj拼接成get参数连接
  objToParams(obj) {
    // let arr = Object.getOwnPropertyNames(obj)
    let arr = Object.keys(obj)
    let str = ''
    if (arr) {
      arr.map(item => {
        str += str == '' ? item + '=' + obj[item] : '&' + item + '=' + obj[item]
      })
    }
    return str
  },
  // 获取地址栏参数
  getQueryVariable,
  getParams: getQueryVariable,
  _,
  //对象深复制
  deepCopy(obj) {
    var newObj = obj.constructor === Array ? [] : {};
    newObj.constructor = obj.constructor;
    if (typeof obj !== "object") {
      return obj;
    } else if (window.JSON) {
      //若需要考虑特殊的数据类型，如正则，函数等，需把这个else if去掉即可
      newObj = JSON.parse(JSON.stringify(obj));
    } else {
      for (var prop in obj) {
        if (obj[prop].constructor === RegExp || obj[prop].constructor === Date) {
          newObj[prop] = obj[prop];
        } else if (typeof obj[prop] === 'object') {
          //递归
          newObj[prop] = deepCopy(obj[prop]);
        } else {
          newObj[prop] = obj[prop];
        }
      }
    }
    return newObj;
  },
  decodeJson(value) {
    //数组转成的对象字符串
    var regAryStr = /^\[[\s|\S]*\]$/;
    //对象转成的对象字符串
    var regObjStr = /^\{([\"\s|\S]+\"\:\"[\s|\S]*)+\"\}$/;
    if (regAryStr.test(value)) {
      return eval("(" + value + ")");
    }
    if (regObjStr.test(value)) {
      return JSON.parse(value);
    }
    return value;
  },
  //价格转换(保留两位小数,不足补零,大数字3位数加一个逗号)
  priceFormat(val, blank) { //val是以元为单位
    if (typeof val === 'undefined') {
      return '--';
    }
    if (val === '') {
      if (blank) return blank;
      return '';
    }
    var isNegative = Number(val) < 0 ? '-' : '';
    val = Math.abs(val)
    var val_str = val.toString();

    var roundNum = val_str.split('.')[0];
    var decimalNum = '00';
    // 小数部分
    if (val_str.split('.')[1] != undefined) {
      decimalNum = val_str.split('.')[1];
      if (decimalNum.length == 0) {
        decimalNum = '00';
      } else if (decimalNum.length == 1) {
        decimalNum += '0';
      } else {
        decimalNum = decimalNum.substr(0, 2);
      }
    }
    // 整数部分
    if (roundNum.length > 3) {
      roundNum = roundNum.split('');
      var pos = 0;
      for (var num = 1; true; num++) {
        pos = roundNum.length - (3 * num + num - 1);
        roundNum.splice(pos, 0, ',');
        if (roundNum.indexOf(',') <= 3) {
          roundNum = roundNum.join('');
          break;
        }
      }
    }

    return isNegative + roundNum + '.' + decimalNum;
  },
  cookie,
  ls,
  ss
}