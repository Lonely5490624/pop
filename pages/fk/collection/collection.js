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
  //事件处理函数
  onLoad: function () {
    var that=this;
    that.setData({
      imgUrl: app.data.imgurl,
      userData: wx.getStorageSync('userData')
    })   
    console.log(that.data.userData.member_id)
    // var data={
    //   member_id: that.data.userData.member_id
    // } 
    // console.log(app.data.requestUrl + 'Home/collection/getCollection')
    // console.log(data);
    // data = app.ajaxData(data);
    wx.request({
      url: app.data.requestUrl+'Home/collection/getCollection',
      method:"POST",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        member_id: "11",
        t:'123',
        r:'123',
        s:'123'
      },
      
      success: function (res) {
        that.setData({
          shangq: res.data.data
        })
        console.log(res.data);
      }
    })
  },
  gotoList:function(e){
    wx.navigateTo({
      url: 'collectionList?id=' + e.currentTarget.id
    })
  }
})
