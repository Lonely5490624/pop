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
    app.http('/my/index')
      .then(res => {
        that.setData({
          userInfo: res.data
        })
        if (res.data.head_img_url) {
          that.setData({
            tx: res.data.head_img_url
          })
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
    app.http('/my/index',{ member_type: that.data.userData.member_type})
      .then(res => {
        // this.setData({
        //   pubList: res.data
        // })
      })
  }
})