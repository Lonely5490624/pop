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
        wx.navigateTo({
          url: 'order-confirm-3?money=' + this.data.deposit,
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