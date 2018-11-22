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
  },
  onShow:function(){
    //轮询执行
    setInterval(() => {
      this.getNews();
    }, 1000)
  },
  getNews:function(){
    app.http('/message/index', { member_type: this.data.member_type })
      .then(res => {
        this.setData({
          newsList: res.data
        })
        // for (var i = 0; i < res.data.length;i++){
        //   if (res.data[i].order_id == '') {
        //     this.setData({
        //       'newsList.order_status_info': '咨询中'
        //     })
        //   }
        // }
        
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