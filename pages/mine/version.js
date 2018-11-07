// pages/fk/order/order-confirm-3.js
var app=getApp()
Page({
  data: {
    userData:[],
    userInfo:[],
    tx:''
  },
  onLoad: function (options) {    
    var that=this
    that.setData({
      tx: wx.getStorageSync('wxUserData').avatarUrl,
      userData: wx.getStorageSync('userData')
    })
    wx.request({
      url: app.data.requestUrl+'home/my/index',
      data: {
        member_id: that.data.userData.member_id
      },
      success: function (res) {        
        that.setData({
          userInfo: res.data.data
        })
        console.log(res.data.data)
        if (res.data.data.head_img_url){   
          console.log(1)       
          that.setData({
            tx: res.data.data.head_img_url
          })
        } 
      }
    })
  },
  gotoEdit:function(){
    var userInfo = JSON.stringify(this.data.userInfo);
    wx.navigateTo({
      url: 'changePersonMessage?userInfo=' + userInfo
    })
  }
})