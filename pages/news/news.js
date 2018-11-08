const app = getApp()
Page({
  data: {
    userData: [],
    newsList:[]
  },
  //事件处理函数
  toSearch: function() {
    wx.navigateTo({
      url: '../../logs/logs'
    })
  },
  onLoad: function() {
    this.setData({
      userData: wx.getStorageSync('userData')
    })
    app.http('/message/index', { member_type: this.data.userData.member_type})
      .then(res => {
        this.setData({
          newsList: res.data
        })        
      })
  },
})