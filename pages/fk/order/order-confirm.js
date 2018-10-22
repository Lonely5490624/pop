// pages/fk/order/order-confirm.js
const contractors = [{
    name: '李阳',
    idNum: '310***********3278',
    isChecked: true
  }, {
    name: '李阳',
    idNum: '310***********3278',
    isChecked: false
  }, {
    name: '李阳',
    idNum: '310***********3278',
    isChecked: false
  }]

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isContractorOpen: false
  },
  contractorOpen: function () {
    this.setData({
      isContractorOpen: true
    })
  },
  // 关闭添加签约人
  contractorClose: function () {
    this.setData({
      isContractorOpen: false
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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