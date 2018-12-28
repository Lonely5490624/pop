// pages/fd/data/index.js
var app=getApp()
Page({
  data: {
    bg:false,
    pcount:'',
    flag2: 5,
    order_id:'',
    orderInfo:[],
    imgUrl:'',
    member_type : 1
  },
  onLoad: function (options) {
    this.setData({
      order_id: options.order_id,      
      imgUrl: app.data.imgurl,
      member_type : wx.getStorageSync('member_type')
    })
    app.http('/order/order_detail', { order_id: options.order_id})
      .then(res => {
        this.setData({
          orderInfo: res.data
        })
      })

  },
  getCount:function(e){
    var bg = e.detail.value ? true : false;
    this.setData({
      bg:bg,
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
    if (!this.data.bg) {
      wx.showToast({
        title: '写点什么吧....',
        icon: 'none',
      });
      return 0;
    }

    wx.navigateTo({
      url: "evaluateMore?flag2=" + this.data.flag2 + "&pcount=" + this.data.pcount + "&order_id=" + this.data.order_id + "&member_id=" + this.data.orderInfo.space_member_id+"&space_id="+this.data.orderInfo.space_id
    })
  }
})