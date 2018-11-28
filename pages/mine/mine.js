// pages/fk/order/order-confirm-3.js
var app = getApp();
Page({
  data: {
    userInfo: [],
    member_type: 0,
    member_id: 0,
    flag: false
  },
  onLoad: function(options) {
    var that = this
    that.setData({
      flag: wx.getStorageSync('flag'),
      member_id: wx.getStorageSync('member_id'),
      member_type: wx.getStorageSync('member_type')
    })
    app.http('/my/index')
      .then(res => {
        that.setData({
          userInfo: res.data
        })
      })
  },
  signOut: function() {
    wx.showModal({
      title: '',
      content: '确认退出登录 ？',
      confirmText: "退出登录", //默认是“确定”
      confirmColor: '#FF5555', //确定文字的颜色
      success: function(res) {
        if (res.confirm) {
          wx.removeStorageSync('time')
          wx.removeStorageSync('member_id')
          wx.removeStorageSync('flag')
          wx.removeStorageSync('member_type')
          wx.redirectTo({
            url: '/pages/fk/index/index',
          })
        } else {
          console.log('取消')
        }
      }
    })
  },
  gotoEdit: function() {
    var userInfo = JSON.stringify(this.data.userInfo);
    wx.navigateTo({
      url: 'changePersonMessage?userInfo=' + userInfo
    })
  },
  typeswitch: function() {
    var that = this
    app.http('/my/change', {
        member_type: that.data.member_type
      })
      .then(res => {
        wx.setStorageSync('flag', true)
        if (that.data.member_type == 1) {
          wx.setStorageSync('member_type', 2)
        } else {
          wx.setStorageSync('member_type', 1)
        }
        getApp().globalData.member_type = wx.getStorageSync('member_type');
        that.onLoad()
      })
  },
  goToList: function() {
    wx.redirectTo({
      url: "../fk/index/index"
    })
  },
  goToSpace: function() {
    wx.redirectTo({
      url: "../fd/space/index"
    })
  },
  goToMine: function() {
    wx.redirectTo({
      url: "../mine/mine"
    })
  },
  goToNews: function() {
    wx.redirectTo({
      url: "../news/news"
    })
  },
  goToTrip: function() {
    wx.redirectTo({
      url: "../fk/trip/trip"
    })
  },
  goToCollection: function() {
    wx.redirectTo({
      url: "../fk/collection/collection"
    })
  },
  goToData: function() {
    wx.redirectTo({
      url: "../fd/data/index"
    })
  },
  goToCalendar: function() {
    wx.redirectTo({
      url: "../fd/calendar/index"
    })
  }
})