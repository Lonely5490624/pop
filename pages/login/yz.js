// pages/fd/data/index.js
import {
  ajaxData
} from '../../utils/common'
var interval = null //倒计时函数
var app=getApp()
Page({
  data: {
    inputLen: 6,
    iptValue: "",
    isFocus: false,
    currentTime: 59,
    disabled: false,
    bg: false,
    time: '59',
    mobile: ''
  },
  onLoad: function(options) {
    this.setData({
      mobile: options.mobile
    })
    this.getTime();   
  },
  getTime: function(options) {
    var that = this;
    var currentTime = that.data.currentTime
    interval = setInterval(function() {
      currentTime--;
      that.setData({
        time: currentTime,
        disabled: true,
        bg: false
      })
      if (currentTime <= 0) {
        clearInterval(interval)
        that.setData({
          currentTime: 59,
          disabled: false,
          bg: true
        })
      }
    }, 1000)
  },
  getVerificationCode() {
    this.getCode();
    var that = this
    that.setData({
      disabled: true,
    })
  },
  getCode: function() {
    console.log(app.globalData.userInfo)
    var that = this;
    wx.request({
      url: app.data.requestUrl+'/member/send_sms',
      method: "POST",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        mobile: parseInt(that.data.mobile),
      },
      success: function(res) {
        that.getTime();
      }
    })
  },
  onFocus: function(e) {
    var that = this;
    that.setData({
      isFocus: true
    });
  },
  setValue: function(e) {
    var that = this;
    that.setData({
      iptValue: e.detail.value
    });
    if (that.data.iptValue.length == 6) {
      let data = ajaxData({
        mobile: parseInt(that.data.mobile),
        code: parseInt(that.data.iptValue),
        unionid: wx.getStorageSync('unionid'),
        openid: wx.getStorageSync('openid'),
        headimgurl: app.globalData.userData.avatarUrl,
        nickname: app.globalData.userData.nickName,
        is_wx_small: 1
      });
      wx.request({
        url: app.data.requestUrl +'/member/login',
        method: "POST",
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data,
        
        success: function(res) {
          
          if (res.data.code == 200) {
            let time = Date.now() + 86400000
            wx.setStorageSync('time', time)
            wx.setStorageSync('member_id', res.data.data.member_id)
            wx.setStorageSync('member_type', res.data.data.member_type)
            wx.redirectTo({
              url: '../fk/index/index'
            })
            
          } else if (res.data.code == 400) {
            wx.showToast({
              title: '此手机号码没有被注册过',
              icon: 'none',
              duration: 2000
            })
            setTimeout(() => {
              wx.redirectTo({
                url: 'register'
              })
            }, 2000)
          }else {
            wx.showToast({
              title: res.data.msg,
              icon: 'none',
              duration: 2000
            })
          }
        }
      })
    }
  }
})