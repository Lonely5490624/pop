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
    isContractorOpen:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
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
      payEndTime: options.payEndTime
    })
  },
  //打开支付方式选择
  contractorOpen: function () {
    this.setData({
      isContractorOpen: true
    })
  },
  // 选择支付方式
  radioChange: function (e) {
    this.setData({
      payaway: e.detail.value
    })
  },
  // 关闭支付方式选择
  contractorClose: function () {
    this.setData({
      isContractorOpen: false
    })
  },
  // 确定预订
  orderConfirm () {
    let params = {
      date: this.data.date,
      signid: this.data.signid,
      space_id: this.data.space_id,
      totalPrice: this.data.totalPrice,
      deposit: this.data.deposit,
      payaway: this.data.payaway
    }
    app.http('/Order/subOrder', params)
      .then(res => {
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
        wx.requestPayment({
          timeStamp: '1490840662',
          nonceStr: '5K8264ILTKCH16CQ2502SI8ZNMTM67VS',
          package: 'prepay_id=wx2017033010242291fcfe0db70013231072',
          signType: 'MD5',
          paySign: 'SLKFYHSOADYFASJDFYASDFHLKSD',
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
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})