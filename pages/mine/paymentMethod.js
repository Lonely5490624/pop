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
    var data = {
      member_id: that.data.userData.member_id
    }
    data = app.ajaxData(data);
    wx.request({
      url: app.data.requestUrl+'home/my/get_bank',
      method: "POST",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: data,
      success: function (res) {        
        that.setData({
          banklist: res.data.data
        })
        for (var i = 0; i < res.data.data.length; i++){
          var num = that.data.banklist[i].bank_number.substr(0, 4) + '******' + that.data.banklist[i].bank_number.substr(15, 19);
          that.setData({
            'banklist[i].bank_number': num
          })          
        }        
      }
    })
  }
})