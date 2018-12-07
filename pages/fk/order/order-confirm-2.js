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
    depositRate: 0
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
        app.http('/pay/index', { type: 1, order_id: res.data.order_id,})
          .then(res => {
            that.setData({
              wxPayInfo: JSON.parse(res.data)
            })
            //调微信支付
            wx.requestPayment({
              timeStamp: Date.parse(new Date())+"",
              nonceStr: that.data.wxPayInfo.nonceStr,
              package: that.data.wxPayInfo.package,
              signType: that.data.wxPayInfo.signType,
              paySign: that.data.wxPayInfo.paySign,
              openid: wx.getStorageSync('openid'),
              success: res => {
                console.log('success:', res)
              },
              fail: err => {
                console.log('fail:', err)
              },
              complete: res => {
                console.log('complete', res)
              }
            })
          })
        /**
         * 接口地址要改
         * 返回值：
         * return_code： 此字段表示通信是否成功，非交易是否成功， 取值：SUCCESS、FAIL
         * return_msg： 返回的信息
         * result_code： 此字段表示交易是否成功！取值：SUCCESS、FAIL
         * err_code： 请求错误代码，详见微信文档。
         * err_code_des:  错误返回的信息描述
         * trade_type: 交易类型，当return_code和result_code都为SUCCESS时才返回
         * prepay_id：预支付ID，下一步要用到的，有效期2小时。如果用户在生成此id后取消支付，但是在2个小时内重新支付时可以复用该id。 当                   *            return_code和result_code都为SUCCESS时才返回。
         */
        // wx.navigateTo({
        //   url: 'order-confirm-3?money=' + this.data.deposit,
        // })
        

      })
  },

})