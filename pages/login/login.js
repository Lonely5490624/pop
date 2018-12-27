// pages/fd/data/index.js
import {
  ajaxData
} from '../../utils/common'

var app = getApp()
Page({
  data: {
    btnBg: false,
    mobile: "",
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    userData: []
  },
  onLoad: function() {
    var that = this
    wx.login({
      success: res => {
        wx.getUserInfo({
          withCredentials: true,
          lang: 'zh_CN',
          success: function (ress) {
            console.log(ress.userInfo)
          }
        })
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        let code = res.code;
        wx.request({
          url: app.data.requestUrl + "/member/getOpenId",
          data: {code: res.code},
          method: 'POST',
          header: {
            "content-type": "application/x-www-form-urlencoded; charset=UTF-8"
          },
          success: function (res) {
            wx.setStorageSync('openid', res.data.data.openid);
            wx.setStorageSync('session_key', res.data.data.session_key);
            wx.setStorageSync('is_bind_wx', res.data.data.is_bind_wx);
            if(res.data.data.member_id){
              let time = Date.now() + 86400000
              wx.setStorageSync('time', time)
              wx.setStorageSync('member_id', res.data.data.member_id)
              wx.setStorageSync('member_type', res.data.data.member_type)
              wx.redirectTo({
                url: '../fk/index/index'
              })
            }
            
          }
        })
      }
    })
  ,
    // 查看是否授权
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function (res) {
              wx.setStorageSync('wxUserData', res.userInfo);
              that.setData({
                userData: res.userInfo
              })
            }
          })
        }
      }
    })
    
  },
  bindGetUserInfo(e) {
    console.log(e.detail.userInfo)
  },
  getMoblie: function(e) {
    this.setData({
      btnBg: true,
      mobile: e.detail.value
    })
  },
  yzPhoneNum: function() {
    if (!(/^1[34578]\d{9}$/.test(this.data.mobile))) {
      wx.showToast({
        title: '手机号不正确',
        icon: 'none',
        duration: 2000
      })
    } else {
      var that = this;
      let data = {
        mobile: parseInt(that.data.mobile)
      }
      data = ajaxData(data)
      wx.request({
        url: app.data.requestUrl +'/member/send_sms',
        method: "POST",
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data,
        success: function(res) {
          if (res.data.code == 200) {
            wx.redirectTo({
              url: 'yz?mobile=' + that.data.mobile
            })
          }
        }
      })
    }
  }
})