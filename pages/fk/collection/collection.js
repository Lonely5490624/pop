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
    imgUrl:''
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
      userData: wx.getStorageSync('userData')
    })   
    app.http('/collection/getCollection')
      .then(res => {
        this.setData({
          shangq: res.data
        })
      })
  },
  gotoList:function(e){
    wx.navigateTo({
      url: 'collectionList?id=' + e.currentTarget.id
    })
  }
})
