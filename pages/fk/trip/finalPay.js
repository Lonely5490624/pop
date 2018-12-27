//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    imageUrl: app.data.imgurl,
    order_id: 53,
    balance_time: '11月15日 00:00',
    account:'',
    img: null,
    order_info : null,
    openTuiding: false
  },
  //事件处理函数
  onLoad: function (options) {
    this.setData({
      order_id: options.id,
      account: app.data.dgaccount,
    })
    this.detail(options.id)
  },
  detail : function(id){
    var that = this
    app.http('/order/order_detail', { member_id: wx.getStorageSync('member_id') ,order_id : id})
    .then(res => {
      that.setData({
        order_info: res.data,
        balance_time: res.data.final_m+'月'+res.data.final_d+'日 '+res.data.final_h
      })
    })
  },
  // 查看退订政策
  bindTuiding() {
    this.setData({
      openTuiding: true
    })
  },
  closeTuiding() {
    this.setData({
      openTuiding: false
    })
  },
  copy () {
    wx.setClipboardData({
      data: this.data.account,
      success: res => {
        wx.navigateTo({
          url: "../order/order-confirm-3",
        })
      }
    })
  },
  uploadImg () {
    wx.navigateTo({
      url: "uploadImg",
    })
    // wx.chooseImage({
    //   count: 1,
    //   success: res => {
    //     console.log(res)
    //     this.setData({
    //       img: res.tempFiles[0].path
    //     })
    //     app.http('/order/upload_voucher', { order_id: this.data.order_id, file: this.data.img})
    //       .then(res => {
    //         wx.showToast({
    //           title: res.msg,
    //           duration: 2000
    //         })
    //       })
    //   }
    // })
  }
})
