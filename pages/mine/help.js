// pages/fk/order/order-confirm-3.js
var app = getApp();
Page({
  data: {
    qalist: []
  },
  onLoad: function() {
    app.http('/my/get_help')
      .then(res => {
        this.setData({
          qalist: res.data
        })
      })
  }
})