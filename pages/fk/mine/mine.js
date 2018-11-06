// pages/fk/order/order-confirm-3.js
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
      url: 'http://pop.aieye8.com/index.php/home/my/index',
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
  }
})