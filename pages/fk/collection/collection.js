//index.js
//获取应用实例
var app = getApp()
const shangq = []
const shangq2 = []
Page({
  data: {
    shangq,
    shangq2,
    userData:[],
    imgUrl:'',
    member_type: 0
  },
  onShow:function(){
    app.http('/collection/getCollection')
      .then(res => {
        this.setData({
          shangq: res.data
        })
      })
  },
  //事件处理函数
  onLoad: function () {
    var that=this;
    that.setData({
      imgUrl: app.data.imgurl,
      userData: wx.getStorageSync('userData'),
      member_type: app.globalData.member_type
    })   
    app.http('/collection/getCollection')
      wx.showLoading({
        title: '加载中',
      })
      .then(res => {
        this.setData({
          shangq: res.data
        })
        wx.hideLoading()
      })
  },
  gotoList:function(e){
    wx.navigateTo({
      url: 'collectionList?id=' + e.currentTarget.id
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
