export default {
  setItem(key, value, delay) {
    //默认cookie为七天之后过期 3s 4m 5h 7d 秒 分 时 天
    if (delay == undefined) delay = "7d";
    delay = delay.toLowerCase();

    var expireDate = new Date();

    var num = parseInt(delay);
    if (delay.indexOf("d") !== -1) {
      expireDate.setDate(expireDate.getDate() + num);
    }
    else if (delay.indexOf("h") !== -1) {
      expireDate.setHours(expireDate.getHours() + num);
    }
    else if (delay.indexOf("m") !== -1) {
      expireDate.setMinutes(expireDate.getMinutes() + num);
    }
    else if (delay.indexOf("s") !== -1) {
      expireDate.setSeconds(expireDate.getSeconds() + num);
    }
    else {
      expireDate.setDate(expireDate.getDate() + num);
    }
    if (typeof value == "object") {
      value = JSON.stringify(value);
    }
    value = escape(value);
    document.cookie = key + "=" + value + ";expires=" + expireDate.toGMTString();
    return this.getCookie(key);
  },
  getItem(key) {
    var objCookie = {};
    var cookie = document.cookie;
    var keyValueList = cookie.split(";");
    for (var item of keyValueList) {
      var keyValue = item.split("=");
      var k = keyValue[0].trim();
      var v = keyValue[1];
      v = unescape(v);
      v = this.decodeJson(v);
      objCookie[k] = v;
    }

    if (typeof key == "undefined") {
      return objCookie;
    }

    return objCookie[key];
  },
  removeItem(key) {
    //删除所有cookie
    if (typeof key == "undefined") {
      var cookieList = this.getCookie();
      for (key in cookieList) {
        this.del(key);
      }
      return true;
    }
    else {
      if (this.getCookie(key) == "undefined") {
        return false;
      }
      else {
        return this.setCookie(key, '', "0s");
      }
    }
  }
}