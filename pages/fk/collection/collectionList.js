const spaceData = []
var app=getApp();
Page({
  data: {
    spaceData,
    opendate: false,
    isFilter: false,
    userData:[],
    space_ids:'',
    imgUrl:''
  },
  onLoad: function(options) {
    // console.log(1)
    // console.log(options.id)
    var that=this
    that.setData({
      userData: wx.getStorageSync('userData'),
      space_ids: options.id,
      imgUrl: app.data.imgurl
    })
    var data = {
      member_id: that.data.userData.member_id,
      space_ids: that.data.space_ids
    }
    data = app.ajaxData(data);
    wx.request({
      url: app.data.requestUrl+'Home/collection/getCollectionSpace',
      method: "POST",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: data,
      success: function(res) {
        that.setData({
          spaceData: res.data.data
        })
      }
    })
  },
  //加收藏
  addCl: function (e) {
    var that = this
    var data = {
      member_id: that.data.userData.member_id,
      space_id: e.currentTarget.id
    }
    data = app.ajaxData(data);
    wx.request({
      url: app.data.requestUrl + 'Home/collection/editCollection',
      method: "POST",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: data,
      success: function (res) {
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: 2000
        })
        if (res.data.code==200){
          wx.navigateBack({
            delta: 1
          })
        }
      }
    })
  }
})