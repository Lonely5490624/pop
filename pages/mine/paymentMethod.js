// pages/fk/order/order-confirm-3.js
var app=getApp()
Page({
  data: {
    userData:[],
    banklist:[]
  },
  onLoad: function (options) {    
    var that=this
    that.setData({
      userData: wx.getStorageSync('userData')
    })
    app.http('/my/get_bank')
      .then(res => {
        that.setData({
          banklist: res.data
        })
        for (var i = 0; i < res.data.length; i++) {
          var num = that.data.banklist[i].bank_number.substr(0, 4) + '******' + that.data.banklist[i].bank_number.substr(15, 19);
          that.setData({
            'banklist[i].bank_number': num
          })
        } 
      })
  }
})