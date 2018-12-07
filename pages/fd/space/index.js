// pages/fd/space/index.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeId: 1,
    pubList: [],
    unpubList: [],
    member_type: 0
  },
  choose: function(e) {
    let id = e.target.dataset.id
    this.setData({
      activeId: id
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      imgUrl: app.data.imgurl,
      userData: wx.getStorageSync('userData'),
      member_type: app.globalData.member_type
    })
    this.getPub()
    this.getUnpub()
    // this.getUnpublished()
  },
  // 获取已发布空间
  getPub: function() {
    wx.showLoading({
      title: '加载中',
    })
    app.http('/space/published_list')
      .then(res => {
        if (res.data.length > 0) {
          this.setData({
            pubList: res.data
          })
          wx.hideLoading()
        }
      })
  },
  // 获取未发布空间列表
  getUnpub: function() {
    app.http('/space/unpublished_list')
      .then(res => {
        this.setData({
          unpubList: res.data
        })
      })
  },
  // 获取未编辑完成的空间
  getUnpublished() {
    app.http('/space/unpublished')
      .then(res => {
        console.log(res)
      })
  },
  // 下架空间
  handleDown(e) {
    app.http('/space/lower_space', {
        space_id: e.currentTarget.dataset.id
      })
      .then(res => {
        wx.showToast({
          title: '下架成功',
          icon: 'none'
        })
        this.getUnpub()
        this.getPub()
      })
  },
  // 删除空间
  handleDel(e) {
    app.http('/space/del_space', {
        space_id: e.currentTarget.dataset.id
      })
      .then(res => {
        wx.showToast({
          title: '删除成功',
          icon: 'none'
        })
        this.getUnpub()
      })
  },
  // 继续编辑
  handleEdit(e) {
    wx.navigateTo({
      url: `add-1?spaceId=${e.currentTarget.dataset.id}`,
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

  },
  goToList: function() {
    wx.redirectTo({
      url: "../../fk/list/list"
    })
  },
  goToSpace: function() {
    wx.redirectTo({
      url: "../../fd/space/index"
    })
  },
  goToMine: function() {
    wx.redirectTo({
      url: "../../mine/mine"
    })
  },
  goToNews: function() {
    wx.redirectTo({
      url: "../../news/news"
    })
  },
  goToTrip: function() {
    wx.redirectTo({
      url: "../../fk/trip/trip"
    })
  },
  goToCollection: function() {
    wx.redirectTo({
      url: "../../fk/collection/collection"
    })
  },
  goToData: function() {
    wx.redirectTo({
      url: "../../fd/data/index"
    })
  },
  goToCalendar: function() {
    wx.redirectTo({
      url: "../../fd/calendar/index"
    })
  }
})