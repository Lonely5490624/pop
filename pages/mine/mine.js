// pages/fk/order/order-confirm-3.js
var app=getApp();
Page({
  data: {
    userData:[],
    userInfo:[],
    tx:'',
    member_type:''
  },
  onLoad: function (options) {    
    var that=this
    that.setData({
      tx: wx.getStorageSync('wxUserData').avatarUrl,
      userData: wx.getStorageSync('userData'),
      member_type: wx.getStorageSync('userData').member_type
    })
    var data = {
      member_id: that.data.userData.member_id
    }
    data = app.ajaxData(data);
    wx.request({
      url: app.data.requestUrl+'home/my/index',
      method: "POST",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: data,
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
  signOut:function(){
    wx.showModal({
      title: '',
      content: '确认退出登录 ？',
      confirmText: "退出登录",//默认是“确定”
      confirmColor: '#FF5555',//确定文字的颜色
      success: function (res) {
        if (res.confirm) {
          console.log('退出登录')
        } else {
          console.log('取消')
        }
      }
    })
  },
  gotoEdit:function(){
    var userInfo = JSON.stringify(this.data.userInfo);
    wx.navigateTo({
      url: 'changePersonMessage?userInfo=' + userInfo
    })
  },
  typeswitch:function(){
    var that=this
    var data = {
      member_id: that.data.userData.member_id,
      member_type: that.data.userData.member_type
    }
    data = app.ajaxData(data);
    wx.request({
      url: app.data.requestUrl+'home/my/index',
      method: "POST",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: data,
      success: function (res) {
        // that.setData({
        //   userInfo: res.data.data
        // })
        console.log(res.data)        
      }
    })
  }
})