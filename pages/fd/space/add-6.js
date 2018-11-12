// pages/fd/space/add-4.js
const app = getApp()
const unsubscribeArray = [{
  id: 1,
  name: '灵活：入驻前5天取消可退全款'
}, {
  id: 2,
  name: '中等：入驻前7天取消可退全款'
}]

Page({

  /**
   * 页面的初始数据
   */
  data: {
    spaceId: 74,
    unsubscribes: ['灵活：入驻前5天取消可退全款', '中等：入驻前7天取消可退全款'],
    unsubscribeArray,
    unsubscribeIndex: 0,
    rules: ''
  },
  changeUnsubscribe: function (e) {
    this.setData({
      unsubscribeIndex: e.detail.value
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    options.spaceId = this.data.spaceId
    // this.setData({
    //   spaceId: options.spaceId
    // })
    app.http('/space/unpublished', { space_id: options.spaceId })
      .then(res => {
        let images = res.data.pics.split(',')
        this.setData({
          images
        })
      })
  },
  // 输入空间守则
  inputRules (e) {
    this.setData({
      rules: e.detail.value
    })
  },
  // 输入每日价格
  inputEverydayPrice(e) {
    this.setData({
      everyday_price: e.detail.value
    })
  },
  // 输入周末价格
  inputWeekPrice(e) {
    this.setData({
      week_price: e.detail.value
    })
  },
  // 输入xx价格
  inputClearPrice(e) {
    this.setData({
      clear_price: e.detail.value
    })
  },
  // 发布完成
  pubDone() {
    let unsubscribeIndex = this.data.unsubscribeIndex
    let params = {
      space_id: this.data.spaceId,
      unsubscribe_policy: this.data.unsubscribeArray[unsubscribeIndex].id,
      rules: this.data.rules,
      everyday_price: this.data.everyday_price,
      week_price: this.data.week_price,
      clear_price: this.data.clear_price
    }
    app.http('/space/published_four', params)
      .then(res => {
        console.log(res)
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