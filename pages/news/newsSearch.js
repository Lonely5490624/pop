//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    newsList:[]
  },


  onLoad: function() {
    
  },
  search:function(e){
    var data = {
      info: e.detail.value,
      member_type:wx.getStorageSync('member_type')
    }
    app.http('/message/search_info', data)
      .then(res => {
        this.setData({
          newsList: res.data
        })
      })
  }

})