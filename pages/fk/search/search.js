var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userData: []
  },
  navigateBack: function() {
    wx.navigateBack({
      changed: true
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    that.setData({
      userData: wx.getStorageSync('userData')
    })
    var data = {
      member_id: that.data.userData.member_id
    }
    data = app.ajaxData(data);
    wx.request({
      url: app.data.requestUrl + 'Home/home/historySearchList',
      data: data,
      method: "POST",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        // that.setData({
        //   shangq: res.data.data
        // })
        console.log(res.data);
      }
    })
  },
  clear:function(){
    var data = {
      member_id: this.data.userData.member_id
    }
    data = app.ajaxData(data);
    wx.request({
      url: app.data.requestUrl + 'Home/home/convenienceListt',
      data: data,
      method: "POST",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        // that.setData({
        //   shangq: res.data.data
        // })
        console.log(res.data);
      }
    })
  },

  search:function(e){
    var data = {
      search_content: e.detail.value
    }
    data = app.ajaxData(data);
    console.log(data);
    wx.request({
      url: app.data.requestUrl + 'Home/home/searchSpace',
      data: data,
      method: "POST",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        // that.setData({
        //   shangq: res.data.data
        // })
        console.log(res.data);
        if (res.data.code!=200){
          wx.showToast({
            title: res.data.msg ,
            icon: 'none',
            duration: 2000
          })
        }
      }
    })
  },
  cancle:function(){
    wx.navigateBack({
      delta: 1
    })
  }  
})