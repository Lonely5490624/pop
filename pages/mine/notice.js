var app=getApp()
Page({
  data: {
    userData:[],
    userInfo:[],
    tx:'',
  },
  onLoad: function (options) {    
    var that=this
    that.setData({
      userData: wx.getStorageSync('userData')
    })
    var data = {
      member_id: that.data.userData.member_id,
    }
    data = app.ajaxData(data);
    
    wx.request({
      url: app.data.requestUrl + 'home/my/index',
      method: "POST",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: data,
      success: function (res) {
        that.setData({
          userInfo: res.data.data
        })
      }
    })
  },
  news_pushChange: function (e) {
    if (e.detail.value){
      this.setData({
        'userInfo.news_push':1
      })
    }else{
      this.setData({
        'userInfo.news_push': 0
      })
    }
  },
  news_messageChange: function (e) {
    if (e.detail.value) {
      this.setData({
        'userInfo.news_message': 1
      })
    } else {
      this.setData({
        'userInfo.news_message': 0
      })
    }
  },
  activity_pushChange: function (e) {
    if (e.detail.value) {
      this.setData({
        'userInfo.activity_push': 1
      })
    } else {
      this.setData({
        'userInfo.activity_push': 0
      })
    }
  },
  activity_messageChange: function (e) {
    if (e.detail.value) {
      this.setData({
        'userInfo.activity_message': 1
      })
    } else {
      this.setData({
        'userInfo.activity_message': 0
      })
    }
  },
  policy_pushChange: function (e) {
    if (e.detail.value) {
      this.setData({
        'userInfo.policy_push': 1
      })
    } else {
      this.setData({
        'userInfo.policy_push': 0
      })
    }
  },
  policy_messageChange: function (e) {
    if (e.detail.value) {
      this.setData({
        'userInfo.policy_message': 1
      })
    } else {
      this.setData({
        'userInfo.policy_message': 0
      })
    }
  },
  save:function(){
    var that=this
    var data = {
      member_id: that.data.userData.member_id,
      news_push: that.data.userInfo.news_push,
      news_message: that.data.userInfo.news_message,
      activity_push: that.data.userInfo.activity_push,
      activity_message: that.data.userInfo.activity_message,
      policy_push: that.data.userInfo.policy_push,
      policy_message: that.data.userInfo.policy_message,
    }
    data = app.ajaxData(data);
    wx.request({
      url: app.data.requestUrl +'home/my/save_notice',
      method: "POST",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: data,
      success: function (res) {        
        if (res.data.code==200){
          wx.showToast({
            title: '修改成功',
            icon: 'none',
            duration: 2000
          })
          that.onLoad();
        }
      }
    })
  }
})