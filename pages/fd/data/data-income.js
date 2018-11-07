// pages/fd/data/data-income.js
Array.prototype.max = function() {
  var max = this[0]
  this.forEach(item => {
    if (item > max) {
      max = item
    }
  })
  return max
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabId: 1,
    currentId: null,
    scrollLeft: 0,
    maxHeight: null,
    income: [{
      id: 1,
      date: '4月',
      yi: '300',
      ji: '100'
    }, {
      id: 2,
      date: '5月',
      yi: '100',
      ji: '100'
    }, {
      id: 3,
      date: '6月',
      yi: '77',
      ji: '36'
    }, {
      id: 4,
      date: '7月',
      yi: '90',
      ji: '52'
    }, {
      id: 5,
      date: '8月',
      yi: '125',
      ji: '45'
    }, {
      id: 6,
      date: '9月',
      yi: '190',
      ji: '15'
    }, {
      id: 7,
      date: '10月',
      yi: '20',
      ji: '30'
    }]
  },
  changeTab(e) {
    let id = e.currentTarget.dataset.id;
    this.setData({
      tabId: id
    })
  },
  // 图表选中
  chooseItem (e) {
    console.log(e)
    this.setData({
      currentId: e.currentTarget.dataset.id
    })
  },
  // 左侧点击
  prevTap (e) {
    if(this.data.scrollLeft > 0) {
      this.setData({
        scrollLeft: this.data.scrollLeft - 98
      })
    }
  },
  // 右侧点击
  nextTap (e) {
    this.setData({
      scrollLeft: this.data.scrollLeft + 98
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    let arr = []
    this.data.income.forEach(item => {
      arr.push(parseInt(item.yi) + parseInt(item.ji))
    })
    this.setData({
      maxHeight: arr.max()
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