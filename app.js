//app.js
import { ajaxData } from 'utils/common'

App({
  data:{
    imgurl: 'http://pjb282159.bkt.clouddn.com/',
    requestUrl: 'http://shanpuapi.letspopup.cn/index.php/home',
    dgaccount:"28837XXXXXXXXXX"
  },
  globalData: {
    userInfo: null,
    xData: '123',
    yData: '',
    member_type: 1
  },
  onLaunch: function () {
    // 登录
    if (wx.getStorageSync('member_type')){
      this.globalData.member_type = wx.getStorageSync('member_type');
    }    
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
          }else {
            wx.showToast({
              title: res.data.msg,
              icon: 'none',
              duration: 2000
            })
          }
          wx.hideLoading()
        },
        fail: function (err) {
          wx.showToast({
            title: '网络错误，请重试！',
            icon: 'none',
            duration: 2000
          })
          wx.hideLoading()
        }
      })
    })
    return promise
  }
})
