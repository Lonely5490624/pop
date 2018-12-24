const app = getApp()
Page({
  data: {
    newsList:[],
    member_type: 0
  },
  //事件处理函数
  onLoad: function() {
    this.setData({
      member_type: wx.getStorageSync('member_type')
    })    
  },
  onUnload: function () {
    this.endSetInter()
  },
  onHide: function () {
    this.endSetInter()
  },
  onShow: function () {
    this.startSetInter()
  },
  startSetInter: function () {
    var that = this;
    that.data.setInter = setInterval(() => {
      that.getNews();
    }, 1000)
  },
  endSetInter: function () {
    var that = this;
    //清除计时器  即清除setInter
    clearInterval(that.data.setInter)
  },
  getNews:function(){
    app.http('/message/index', { member_type: this.data.member_type })
      .then(res => {
        this.setData({
          newsList: res.data
        })
      })
  },
  gontoPj:function(){
    if (this.data.member_type==2){
      wx.navigateTo({
        url: '../../evaluate/evaluatefd?order_id=' + order_id
      })
    }else{
      wx.navigateTo({
        url: '../../evaluate/evaluate?order_id=' + order_id
      })
    }
  },
  goToList: function () {
    wx.redirectTo({
      url: "../fk/index/index"
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