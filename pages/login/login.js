// pages/fd/data/index.js
var app=getApp()
Page({
  data: {
    btnBg: false,
    mobile: "",
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    userData:[]
  },
  onLoad: function () {
    var that =this
    // 查看是否授权
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function (res) {
              console.log(res.userInfo)
              wx.setStorageSync('wxUserData', res.userInfo);
              that.setData({
                userData:res.userInfo
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
      wx.request({
        url: app.data.requestUrl +'home/member/send_sms',
        method: "POST",
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data: {
          mobile: parseInt(that.data.mobile),
        },
        success: function(res) {
          if (res.data.code == 200) {
            wx.navigateTo({
              url: 'yz?mobile=' + that.data.mobile
            })
          }
          console.log(res.data)
        }
      })
    }
  }
})