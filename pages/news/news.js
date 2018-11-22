const app = getApp()
Page({
  data: {
    userData: [],
    newsList:[],
    member_type: 0
  },
  //事件处理函数
  toSearch: function() {
    wx.navigateTo({
      url: '../../logs/logs'
    })
  },
  onLoad: function() {
    this.setData({
      userData: wx.getStorageSync('userData'),
      member_type: app.globalData.member_type
    })
    app.http('/message/index', { member_type: this.data.userData.member_type})
      .then(res => {
        this.setData({
          newsList: res.data
        })        
      })
  },
  goToList: function () {
    wx.redirectTo({
      url: "../fk/list/list"
    })
  },
  goToSpace: function () {
    wx.redirectTo({
      url: "../fd/space/index"
    })
  },
  goToMine: function () {
    wx.redirectTo({
      url: "../mine/mine"
    })
  },
  goToNews: function () {
    wx.redirectTo({
      url: "../news/news"
    })
  },
  goToTrip: function () {
    wx.redirectTo({
      url: "../fk/trip/trip"
    })
  },
  goToCollection: function () {
    wx.redirectTo({
      url: "../fk/collection/collection"
    })
  },
  goToData: function () {
    wx.redirectTo({
      url: "../fd/data/index"
    })
  },
  goToCalendar: function () {
    wx.redirectTo({
      url: "../fd/calendar/index"
    })
  }
})