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
    var that = this;
    that.setData({
      userData: wx.getStorageSync('userData')
    })

    var data = {
      member_id: that.data.userData.member_id,
      member_type: that.data.userData.member_type
    }
    data = app.ajaxData(data);
    wx.request({
      url: app.data.requestUrl + 'home/message/index',
      data: data,
      method: "POST",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function(res) {
        that.setData({
          newsList: res.data.data
        })
        console.log(res.data.data);
      }
    })
  },
})