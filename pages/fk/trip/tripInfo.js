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
    markers: [{
      iconPath: "/images/location.png",
      id: 0,
      latitude: 31.2342,
      longitude: 121.469042,
      width: 50,
      height: 50
    }]      
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
        if (res.data.longitude != null) {
          this.setData({
            'markers[0].latitude': res.data.latitude,
            'markers[0].longitude': res.data.longitude
          })
        }
      })
  },
  goPJ:function(){
    wx.navigateTo({
      url: "../../evaluate/evaluate?order_id=" + this.data.tripInfo.order_id
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
      url: "../../fd/fd_mine/fdMine?member_id=" + this.data.tripInfo.space_member_id + "&space_id=" + this.data.tripInfo.space_id
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
              });
              that.order_detail();
            })
        } else {
          console.log('取消')
        }

      }
    })
  }

})