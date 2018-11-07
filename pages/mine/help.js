// pages/fk/order/order-confirm-3.js
var app=getApp();
Page({
  data: {
    qalist:[]
  },
  onLoad: function () {    
    var that=this
    var data = {}
    data = app.ajaxData(data);
    wx.request({
      url: app.data.requestUrl+'home/my/get_help',
      method: "POST",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: data,
      success: function (res) {        
        that.setData({
          qalist: res.data.data
        })
      }
    })
  }
})