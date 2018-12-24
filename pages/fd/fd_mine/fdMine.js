// pages/fd/data/index.js
var app = getApp()
Page({

  data: {
    myInfo: [],
    pList: []
  },
  onLoad: function(options) {
    var that=this
    wx.request({
        url: app.data.requestUrl + "/my/index",
        data: {
          member_id: options.member_id,
        },
        method: 'POST',
        header: {
          "content-type": "application/x-www-form-urlencoded; charset=UTF-8"
        },
        success: function(res) {
          if (res.data.code == 200) {
            that.setData({
              myInfo: res.data.data
            })
          }
          wx.hideLoading()
        },
        fail: function(err) {
          wx.hideLoading()
        }
      }),
      wx.request({
      url: app.data.requestUrl + "/comment/get_consumer_comment",
        data: {
          order_id: options.order_id
        },
        method: 'POST',
        header: {
          "content-type": "application/x-www-form-urlencoded; charset=UTF-8"
        },
        success: function (res) {
          if (res.data.code == 200) {
            that.setData({
              pList: res.data.data
            })
          }
          wx.hideLoading()
        },
        fail: function (err) {
          wx.hideLoading()
        }
      })      
  }
})