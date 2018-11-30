//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    array: ['微信', '公对公付款'],
    index: 0,
    orderId: null
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  onLoad (options) {
    this.setData({
      orderId: options.order_id
    })
  },
  toPay () {
    let payWay = this.data.index
    if (payWay == 0) {

    } else if (payWay == 2) {
      wx.navigateTo({
        url: `finalPay?id=${this.data.orderId}`
      })
    }
  }
})
