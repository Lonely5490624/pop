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
    var that=this
    that.setData({
      userData: wx.getStorageSync('userData'),
      space_ids: options.id,
      imgUrl: app.data.imgurl
    })
    app.http('/collection/getCollectionSpace',{ space_ids: that.data.space_ids})
      .then(res => {
        this.setData({
          spaceData: res.data
        })
      })
  },
  //加收藏
  addCl: function (e) {
    var that = this
    var data = {
      member_id: that.data.userData.member_id,
      
    }
    app.http('/collection/editCollection', { space_id: e.currentTarget.id })
      .then(res => {
        wx.showToast({
          title: res.msg,
          icon: 'none',
          duration: 2000
        })
        if (res.code == 200) {
          wx.navigateBack({
            delta: 1
          })
        }
      })
 
  }
})