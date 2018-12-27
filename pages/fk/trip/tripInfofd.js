//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    order_id: 0,
    tripInfo: [],
    imgUrl: '',
    member_type:0,
    phoneNumber:'',
        
  },
  onLoad: function(options) {
    this.setData({
      order_id: options.id,
      userInfo: app.globalData.userInfo,
      imgUrl: app.data.imgurl,
      member_type: app.globalData.member_type
    })
    this.order_detail();
  },
  order_detail:function(){
    app.http('/order/order_detail', {
      order_id: this.data.order_id
    })
      .then(res => {
        this.setData({
          tripInfo: res.data,
          phoneNumber: res.data.landlord_mobile
        })
        
      })
  },
  goPJ:function(){
    wx.navigateTo({
      url: "../../evaluate/evaluatefd?order_id=" + this.data.tripInfo.order_id
    })
  },
  calling: function () {
    var that=this
    wx.makePhoneCall({
      phoneNumber: that.data.phoneNumber,
      success: function () {
        console.log("拨打电话成功！")
      },
      fail: function () {
        console.log("拨打电话失败！")
      }
    })
  },
  toNews: function() {
    var arr = {
      info_id: this.data.tripInfo.info_id,
      order_id: this.data.tripInfo.order_id,
      space_id: this.data.tripInfo.space_id
    }
    var dd = JSON.stringify(arr)
    wx.navigateTo({
      url: "/pages/news/chat?info=" + dd
    })
  },
  toPay: function() {
    wx.navigateTo({
      url: "selectPayWay?order_id=" + this.data.tripInfo.order_id
    })
  },
  gotoMyindex:function(){
    wx.navigateTo({
      url: "../../fd/fd_mine/fdMine?order_id=" + this.data.tripInfo.order_id + '&member_id=' + this.data.tripInfo.member_id
    })
  },
  cancle: function() {
    var that=this
    wx.showModal({
      title: '确定要取消本次预定吗？',
      content: '根据房东的退订政策，您此时取消，可获得退款￥' + that.data.tripInfo.deposit+'订单一旦取消后，将不可恢复',
      success: function (res) {
        if (res.confirm) {
          var data={
            order_id: that.data.tripInfo.order_id,
            type: that.data.member_type
          }
          app.http('/Order/cancel_order', data)
            .then(res => {
              wx.showToast({
                title: '取消成功！',
                icon: 'none',
                duration: 2000
              })
              that.order_detail();
            })
        } else {
          console.log('取消')
        }

      }
    })
  },
  //拒绝订单
  refuse: function (e) {
    let that = this;
    wx.showModal({
      title: '确认拒绝吗',
      content: '订单一旦拒绝，将不可恢复，您确定要拒绝该的订单吗？',
      success: function (res) {
        if (res.confirm) {
          //拒绝
          var data = {
            space_id: that.data.tripInfo.space_id,
            order_id: that.data.tripInfo.order_id,
            type: 2 //1接收 2拒绝
          }
          app.http('/order/update_order', data)
            .then(res => {
              wx.showToast({
                title: '操作成功',
                icon: 'none',
                duration: 2000
              });
              that.order_detail();
            })
        } else {
          console.log('取消')
        }

      }
    })
  },
  //接受订单
  accept: function (e) {
    let that = this;
    wx.showModal({
      title: '',
      content: '您确定接受该订单吗？',
      success: function (res) {
        if (res.confirm) {
          //接受
          var data = {
            space_id: that.data.tripInfo.space_id,
            order_id: that.data.tripInfo.order_id,
            type: 1 // 1接收 2拒绝
          }
          app.http('/order/update_order', data)
            .then(res => {
              wx.showToast({
                title: '操作成功',
                icon: 'none',
                duration: 2000
              });
              that.order_detail();
            })
        } else {
          console.log('取消')
        }

      }
    })
  },

})