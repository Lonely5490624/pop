/**
 * 前台请求所用公共函数
 * @author alan
 * @create_time 2018-08-28
 */
import { hex_md5 } from 'md5'

//签名token
var auth_token = "alan_du";

/**
 * ajax请求数据完善签名信息
 * @author alan
 * @param data 请求的json数据对象
 * @create_time 2018-08-28
 */
function ajaxData(data) {
  data = data || {};
  var timestamp = new Date().getTime();
  data.t = timestamp;
  data.r = randomString(16);
  data.s = arithmetic(data);
  return data;
}


/**
 * api请求生成签名
 * @author alan
 * @param data josn数据源
 * @create_time 2018-08-28
 */
function arithmetic(data) {
  //签名步骤一：将对象拼接城字符串
  var string = ToUrlParams(data);
  //签名步骤二：在string后加入KEY
  string = string + "&key=" + auth_token;
  //签名步骤三：MD5加密
  string = hex_md5(string);
  //签名步骤四：所有字符转为大写
  var signature = string.toUpperCase();
  return signature;
}

/**
 * 格式化参数格式化成url参数
 */
function ToUrlParams(data) {
  var buff = "";
  for (var x in data) {
    buff += x + "=" + encodeURI(data[x]) + "&";
  }

  return buff;
}
/**
 * 生成随机字符串
 * @author alan
 * @param len 随机字符串的长度
 * @create_time 2018-08-28
 */
function randomString(len) {
  len = len || 32;
  var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
  var maxPos = $chars.length;
  var pwd = '';
  for (let i = 0; i < len; i++) {
    pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return pwd;
}

/**
 * 获取请求的url参数数组
 * @author alan
 * @create_time 2018-08-28
 */
function getUrlVars() {
  var vars = [], hash;
  var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
  for (var i = 0; i < hashes.length; i++) {
    hash = hashes[i].split('=');
    vars.push(hash[1]);
    vars[hash[0]] = hash[1];
  }
  return vars;
}

/**
 *获取请求的url参数对象
 */
function getUrlVarsV2() {
  var url = location.search; //获取url中"?"符后的字串
  var theRequest = new Object();
  if (url.indexOf("?") != -1) {
    var str = url.substr(1);
    strs = str.split("&");
    for (var i = 0; i < strs.length; i++) {
      theRequest[strs[i].split("=")[0]] = unescape(decodeURI(strs[i].split("=")[1]));
    }
  }
  return theRequest;
}
/**
 * 获取url参数
 * @author alan
 * @param name 参数名称
 * @create_time 2018-10-12
 */
function getUrlVar(name) {
  return getUrlVars()[name];
}

//定时 缓存cookie数据
var MyLocalStorage = {
  Cache: {
    /**
     * 总容量5M
     * 存入缓存，支持字符串类型、json对象的存储
     * 页面关闭后依然有效 ie7+都有效
     * @param key 缓存key
     * @param stringVal
     * @time 数字 缓存有效时间（秒） 默认60＊60*24s一天
     * 注：localStorage 方法存储的数据没有时间限制。第二天、第二周或下一年之后，数据依然可用。不能控制缓存时间，故此扩展
     * */
    put: function (key, stringVal, time) {
      try {
        if (!localStorage) { return false; }
        if (!time || isNaN(time)) { time = 60 * 60 * 24; }
        var cacheExpireDate = (new Date() - 1) + time * 1000;
        var cacheVal = { val: stringVal, exp: cacheExpireDate };
        localStorage.setItem(key, JSON.stringify(cacheVal));//存入缓存值
        //console.log(key+":存入缓存，"+new Date(cacheExpireDate)+"到期");
      } catch (e) { }
    },
    /**获取缓存*/
    get: function (key) {
      try {
        if (!localStorage) { return false; }
        var cacheVal = localStorage.getItem(key);
        var result = JSON.parse(cacheVal);
        var now = new Date() - 1;
        if (!result) { return null; }//缓存不存在
        if (now > result.exp) {//缓存过期
          this.remove(key);
          return "";
        }
        //console.log("get cache:"+key);
        return result.val;
      } catch (e) {
        this.remove(key);
        return null;
      }
    },

    /**移除缓存，一般情况不手动调用，缓存过期自动调用*/
    remove: function (key) {
      if (!localStorage) { return false; }
      localStorage.removeItem(key);
    },
    /**清空所有缓存*/
    clear: function () {
      if (!localStorage) { return false; }
      localStorage.clear();
    }
  }//end Cache
};
/**
 * 弹出提示框
 * @author alan
 * @param msg  提示信息
 * @create_time 2018-08-28
 */
function layer_alert(msg, times) {
  times = times || 2;
  layer.open({
    content: msg,
    skin: 'msg',
    time: times //x秒后自动关闭
  });
}

/**
 * 登录验证
 * @returns {*}
 */
function isLogin() {
  var member_id = MyLocalStorage.Cache.get("member_id");
  if (!member_id) {
    window.location.href = "../login/login.html";
    return 0;
  }
  return member_id;
}

/**
 * 手机号码验证
 * @param phone
 * @returns {boolean}
 */
function isPhone(phone) {
  if (!(/^1[345789]\d{9}$/.test(phone))) {
    return false;
  }
  return true;
}

/**
 * 身份证号码验证
 * @param card
 * @returns {boolean}
 */
function isCardNo(card) {
  // 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X
  var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
  if (reg.test(card) === false) {
    return false;
  }
  return true;
}

/**
 * 判断是否是微信浏览器
 * @returns {boolean}
 */
function isWeixin() {
  var ua = navigator.userAgent.toLowerCase();
  if (ua.match(/MicroMessenger/i) == "micromessenger") {
    return true;
  } else {
    return false;
  }
}


module.exports = {
  ajaxData
}