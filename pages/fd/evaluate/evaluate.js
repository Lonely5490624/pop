// pages/fd/Evaluate/evaluate.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    evaluate: '',
    accuracy: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  cAccuracy: function (e) {
    console.log(e.target.dataset.score)
    var that = this;
    that.setData({
      accuracy: e.target.dataset.score,
    });
  },
  evaluateChange (e) {
    this.setData({
      evaluate: e.detail.value
    })
  },
  next () {

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