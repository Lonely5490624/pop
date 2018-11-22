// pages/fd/data/index.js
var app=getApp()
Page({

  data: {
    dataInfo:[],
    member_type: 0
  },
  onLoad: function (options) {
    this.setData({
      member_type: app.globalData.member_type
    })
    app.http('/data/index', { member_type:'2'})
      .then(res => {
        console.log(res.data);
        this.setData({
          dataInfo: res.data
        })
      })
  },
  goToList: function () {
    wx.redirectTo({
      url: "../../fk/list/list"
    })
  },
  goToSpace: function () {
    wx.redirectTo({
      url: "../../fd/space/index"
    })
  },
  goToMine: function () {
    wx.redirectTo({
      url: "../../mine/mine"
    })
  },
  goToNews: function () {
    wx.redirectTo({
      url: "../../news/news"
    })
  },
  goToTrip: function () {
    wx.redirectTo({
      url: "../../fk/trip/trip"
    })
  },
  goToCollection: function () {
    wx.redirectTo({
      url: "../../fk/collection/collection"
    })
  },
  goToData: function () {
    wx.redirectTo({
      url: "../../fd/data/index"
    })
  },
  goToCalendar: function () {
    wx.redirectTo({
      url: "../../fd/calendar/index"
    })
  }
})