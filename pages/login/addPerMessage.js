// pages/fd/data/index.js
var app=getApp()

Page({
  data: {
    nick_name: "小龙人",
    true_name: '大龙'
  },
  onLoad:function(options){
    if (options){
      this.setData({
        mobile: options.mobile,
        code: options.code
      })
    }
  },
  done () {
    let params = {
      mobile: this.data.mobile,
      nick_name: this.data.nick_name,
      true_name: this.data.true_name
    }
    wx.request({
      url: app.data.requestUrl + '/member/register',
      method: "POST",
      data: params,
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        wx.redirectTo({
          url: 'login',
        })
      }
    })
  }
})