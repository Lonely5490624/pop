//app.js
import { ajaxData } from 'utils/common'

App({
  data:{
    imgurl: 'http://www.letspopup.cn/data/upload/',
    requestUrl: 'http://www.letspopup.cn/index.php/home'
  },
  
  onLaunch: function () {
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        let code = res.code
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
    yData: '',
    member_type:1
  },
  // 封装的网络请求
  http: function (url, pramas, notNeedLogin) {
    let currentTime = Date.now()
    let member_id = null
    var oldTime = wx.getStorageSync('time')
    if (oldTime) {
      if (currentTime > oldTime) {
        wx.removeStorageSync('time')
        wx.removeStorageSync('member_id')
        wx.removeStorageSync('member_type')
        wx.redirectTo({
          url: '/pages/login/login',
        })
      } else {
        member_id = wx.getStorageSync('member_id')
      }
    }
    if (!notNeedLogin && !member_id) {
      wx.redirectTo({
        url: '/pages/login/login',
      })
      return
    }
    let data = Object.assign({}, pramas, { member_id })
    data = ajaxData(data)
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
