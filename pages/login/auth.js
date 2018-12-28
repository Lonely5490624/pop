// pages/login/auth.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        let code = res.code;
        wx.request({
          url: app.data.requestUrl + "/member/getOpenId",
          data: { code: res.code },
          method: 'POST',
          header: {
            "content-type": "application/x-www-form-urlencoded; charset=UTF-8"
          },
          success: function (res) {
            wx.setStorageSync('openid', res.data.data.openid);
            wx.setStorageSync('session_key', res.data.data.session_key);
            wx.setStorageSync('unionid', res.data.data.unionid);
            wx.setStorageSync('is_bind_wx', res.data.data.is_bind_wx);
            if (res.data.data.member_id) {
              let time = Date.now() + 86400000
              wx.setStorageSync('time', time)
              wx.setStorageSync('member_id', res.data.data.member_id)
              wx.setStorageSync('member_type', res.data.data.member_type)
              wx.redirectTo({
                url: '../fk/index/index'
              })
            }

          }
        })
      }
    }),
      // 查看是否授权
      wx.getSetting({
        success(res) {
          if (res.authSetting['scope.userInfo']) {
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称
            wx.getUserInfo({
              success: function (res) {
                app.globalData.userData = res.userInfo;
                wx.setStorageSync('wxUserData', res.userInfo);
                wx.navigateTo({
                  url: 'login'
                })
              }
            })
          }else{
            
          }
        }
      })
  },
  bindGetUserInfo(e) {
    if (e.detail.userInfo){
      app.globalData.userData = e.detail.userInfo;
      wx.navigateTo({
        url: 'login'
      })
    }else{
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法正常使用程序的功能体验。',
        success: function(res) {}
      })
    }
    
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})