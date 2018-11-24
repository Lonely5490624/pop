// pages/fd/space/add-1.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    spaceType: null
  },
  // 选择空间类型
  chooseType (e) {
    this.setData({
      spaceType: e.currentTarget.dataset.id
    })
  },
  // 下一步
  pubStep1 () {
    let params = {
      type: this.data.spaceType
    }
    if (!params.type) {
      wx.showToast({
        title: '请选择空间类型',
        icon: 'none'
      })
      return
    }
    if(this.data.spaceId) {
      params.space_id = this.data.spaceId
    }
    app.http('/space/published', params)
      .then(res => {
        this.setData({
          spaceId: res.data
        })
        wx.navigateTo({
          url: `add-2?spaceId=${this.data.spaceId}`,
        })
      })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // if (options && options.spaceId) {
      this.setData({
        spaceId: options.spaceId || 0
      })
      app.http('/space/unpublished', { space_id: this.data.spaceId })
        .then(res => {
          this.setData({
            spaceType: res.data.type,
            spaceId: res.data.id
          })
        })
    // }
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