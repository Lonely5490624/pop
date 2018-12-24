// pages/fk/order/order-confirm-2.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    img: '',
    title: '',
    totalPrice: '',
    depositRate: 0,
    deposit: 0,
    balance: 0,
    date: '',
    signid: 0,
    space_id: null,
    payaway: 'wxchat',
    payEndTime: 0,
    //isContractorOpen:false,
    wxPayInfo:[],
    depositRate: 0,
    openTuiding:false,
    openTuiding1: false,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {       
    this.setData({
      img: app.data.imgurl + options.img,
      title: options.title,
      totalPrice: options.totalPrice,
      depositRate: options.depositRate,
      deposit: options.deposit,
      balance: options.balance,
      date: options.date,
      signid: options.signid,
      space_id: options.space_id,
      payEndTime: options.payEndTime,      
      depositRate: options.depositRate
    })
    
  },
  // 确定预订
  orderConfirm () {
    var that=this
    let params = {
      date: this.data.date,
      signid: this.data.signid,
      space_id: this.data.space_id,
      totalPrice: this.data.totalPrice,
      deposit: this.data.deposit,
      payway: this.data.payaway,
      final_payment_time: this.data.payEndTime,      
    }
    app.http('/Order/subOrder', params)
      .then(res => {
        //获取微信支付参数  1：定金 2：尾款
        app.http('/pay/wx_pay', { type: 1, order_id: res.data.order_id, openid: wx.getStorageSync('openid')})
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
                  url: "order-confirm-3?deposit=" + this.data.deposit,
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
      })
  },
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
  bindTuiding1() {
    this.setData({
      openTuiding1: true
    })
  },
  closeTuiding1() {
    this.setData({
      openTuiding1: false
    })
  },

})