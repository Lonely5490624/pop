// pages/fk/contractor/contractor-add.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    idcard: '',
    tel: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  inputName(e) {
    this.setData({
      name: e.detail.value
    })
  },
  inputID(e) {
    this.setData({
      idcard: e.detail.value
    })
  },
  inputPhone(e) {
    this.setData({
      tel: e.detail.value
    })
  },
  btnAdd() {
    if (this.data.name == '' || this.data.idcard == '' || this.data.tel == '') {
      wx.showToast({
        title: '请填写相关信息',
        icon: 'none',
        duration: 2000
      })
      return false
    }
    var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    if (!reg.test(this.data.idcard)) {
      wx.showToast({
        title: '身份证号码不正确',
        icon: 'none',
        duration: 2000
      })
      return false
    }
    if (!(/^1[34578]\d{9}$/.test(this.data.tel))) {
      wx.showToast({
        title: '手机号不正确',
        icon: 'none',
        duration: 2000
      })
      return false
    }
    let params = {
      name: this.data.name,
      idcard: this.data.idcard,
      tel: this.data.tel
    }
    app.http('/Space/saveSign', params)
      .then(res => {
        console.log(res)
        wx.navigateBack({
          url: '../order/order-confirm'
        })
      })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})