// pages/fd/space/add-2.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    spaceId: null,
    mall_name: null,
    storey: null,
    region: ["四川省", "成都市", "武侯区"],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      spaceId: options.spaceId
    })
    app.http('/space/unpublished', { space_id: options.spaceId })
      .then(res => {
        this.setData({
          mall_name: res.data.mall_name,
          storey: res.data.storey
        })
      })
  },
  // 下一步
  pubStep2() {
    let params = {
      space_id: this.data.spaceId,
      province: '',
      city: '',
      mall_name: this.data.mall_name,
      storey: this.data.storey
    }
    app.http('/space/published_one', params)
      .then(res => {
        wx.navigateTo({
          url: `add-3?spaceId=${this.data.spaceId}`,
        })
      })
  },
  // 商城输入框
  bindMallInput (e) {
    this.setData({
      mall_name: e.detail.value
    })
  },
  // 位置输入框
  bindStoreyInput(e) {
    this.setData({
      storey: e.detail.value
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