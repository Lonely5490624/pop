// pages/fk/order/order-confirm-3.js
var app = getApp();
Page({
  data: {
    qalist: []
  },
  onLoad: function() {
    app.http('/my/get_help',{member_type : wx.getStorageSync('member_type')})
      .then(res => {
        this.setData({
          qalist: res.data
        })
      })
  }
})