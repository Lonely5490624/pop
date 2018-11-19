//app.js
App({
  data:{
    imgurl: 'http://pop.aieye8.com/data/upload/',
    requestUrl: 'http://pop.aieye8.com/index.php/home'
  },
  
  ajaxData:function(data={}){
    var timestamp = Date.parse(new Date());
    data.t = timestamp / 1000;
    data.r = '';
    data.s = '';
    return data;
  },
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    xData: '123',
    yData: ''
  },
  // 封装的网络请求
  http: function (url, pramas) {
    let data = Object.assign({}, pramas, { member_id: 11,t:'',r:'',s:'' })
    let promise = new Promise((resolve, reject) => {
      wx.request({
        url: this.data.requestUrl + url,
        data,
        method: 'POST',
        header: {
          "content-type": "application/x-www-form-urlencoded; charset=UTF-8"
        },
        success: function (res) {
          if (res.data.code == 200) {
            resolve(res.data)
          } else {
            wx.showToast({
              title: res.data.msg,
              icon: 'none',
              duration: 2000
            })
            resolve(res.data.msg)
            //console.log(res);
          }
        },
        fail: function (err) {
          wx.showToast({
            title: '网络错误，请重试！',
            icon: 'none',
            duration: 2000
          })
        }
      })
    })
    return promise
  }
})
