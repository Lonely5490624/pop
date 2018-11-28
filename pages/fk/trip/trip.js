//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    tripList: [],
    member_type: 0
  },
  //事件处理函数
  toSearch: function() {
    wx.navigateTo({
      url: '../../logs/logs'
    })
  },
  onLoad: function () {
    this.setData({
      imgUrl: app.data.imgurl,
      member_type: app.globalData.member_type,
      tripList: []
    })

    app.http('/order/orderList')
      .then(res => {
        this.setData({
          tripList: res.data
        })
        console.log(res.data)
      })
  },
  goToList: function () {
    wx.redirectTo({
      url: "../../fk/index/index"
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
