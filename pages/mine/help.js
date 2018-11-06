// pages/fk/order/order-confirm-3.js
Page({
  data: {
    qalist:[]
  },
  onLoad: function () {    
    var that=this
    wx.request({
      url: 'http://pop.aieye8.com/index.php/home/my/get_help',
      data: {},
      success: function (res) {        
        that.setData({
          qalist: res.data.data
        })
        console.log(res.data.data)
      }
    })
  }
})