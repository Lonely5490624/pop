//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    array: ['微信', '公对公付款'],
    index: 0,
    orderId: null,
    wxPayInfo : ''
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
    var that = this;
    let payWay = this.data.index
    if (payWay == 0) {
      //获取微信支付参数  1：定金 2：尾款
      app.http('/pay/wx_pay', { type: 2, order_id: this.data.orderId, openid: wx.getStorageSync('openid') })
        .then(res => {
          that.setData({
            wxPayInfo: JSON.parse(res.data)
          })
          //调微信支付
          wx.requestPayment({
            timeStamp: that.data.wxPayInfo.timeStamp,
            nonceStr: that.data.wxPayInfo.nonceStr,
            package: that.data.wxPayInfo.package,
            signType: that.data.wxPayInfo.signType,
            paySign: that.data.wxPayInfo.paySign,
            openid: wx.getStorageSync('openid'),
            success: res => {
              wx.navigateTo({
                url: "pages/fk/order/order-confirm-3?deposit=" + this.data.deposit,
              })
            },
            fail: err => {
          
              console.log('fail:', err)
            },
            complete: res => {
              console.log('complete', res)
            }
          })
        })
    } else if (payWay == 1) {
      wx.navigateTo({
        url: `finalPay?id=${this.data.orderId}`
      })
    }
  }
})
