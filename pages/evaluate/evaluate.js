// pages/fd/data/index.js
var app=getApp()
Page({
  data: {
    bg:false,
    pcount:'',
    flag2: 0,
    order_id:'',
    orderInfo:[],
    imgUrl:''
  },
  onLoad: function (options) {
    this.setData({
      order_id: options.order_id,      
      imgUrl: app.data.imgurl
    })
    app.http('/order/order_detail', { order_id: options.order_id})
      .then(res => {
        this.setData({
          orderInfo: res.data
        })
      })

  },
  getCount:function(e){
    this.setData({
      bg:true,
      pcount: e.detail.value
    })
  },
  changeColor11: function () {
    var that = this;
    that.setData({
      flag2: 1
    });
  },
  changeColor12: function () {
    var that = this;
    that.setData({
      flag2: 2
    });
  },
  changeColor13: function () {
    var that = this;
    that.setData({
      flag2: 3
    });
  },
  changeColor14: function () {
    var that = this;
    that.setData({
      flag2: 4
    });
  },
  changeColor15: function () {
    var that = this;
    that.setData({
      flag2: 5
    });
  },
  next:function(){
    wx.navigateTo({
      url: "evaluateMore?flag2=" + this.data.flag2 + "&pcount=" + this.data.pcount + "&order_id=" + this.data.order_id
    })
  }
})