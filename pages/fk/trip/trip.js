//index.js
//获取应用实例
const app = getApp()

const shangq = [{
    textCn: '新天地',
    textEn: 'XinTianDi',
    img: 'http://www.runoob.com/try/demo_source/paris.jpg'
  }, {
    textCn: '南京西路',
    textEn: 'West Nanjing Road',
    img: 'http://www.runoob.com/try/demo_source/paris.jpg'
  }, {
    textCn: '新天地',
    textEn: 'XinTianDi',
    img: 'http://www.runoob.com/try/demo_source/paris.jpg'
  }, {
    textCn: '南京西路',
    textEn: 'West Nanjing Road',
    img: 'http://www.runoob.com/try/demo_source/paris.jpg'
  }]
const shangq2 = [{
  textCn: '新天地',
  textEn: 'XinTianDi',
  img: 'http://www.runoob.com/try/demo_source/paris.jpg'
},]
Page({
  data: {
    // locateUrl: 'http://www.runoob.com/try/demo_source/paris.jpg',
    // shangq,
    // shangq2,
    tripList: []
  },
  //事件处理函数
  toSearch: function() {
    wx.navigateTo({
      url: '../../logs/logs'
    })
  },
  onLoad: function () {
    app.http('/Order/orderList')
      .then(res => {
        this.setData({
          tripList: res.data
        })
      })
    // if (app.globalData.userInfo) {
    //   this.setData({
    //     userInfo: app.globalData.userInfo,
    //     hasUserInfo: true
    //   })
    // } else if (this.data.canIUse){
    //   // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //   // 所以此处加入 callback 以防止这种情况
    //   app.userInfoReadyCallback = res => {
    //     this.setData({
    //       userInfo: res.userInfo,
    //       hasUserInfo: true
    //     })
    //   }
    // } else {
    //   // 在没有 open-type=getUserInfo 版本的兼容处理
    //   wx.getUserInfo({
    //     success: res => {
    //       app.globalData.userInfo = res.userInfo
    //       this.setData({
    //         userInfo: res.userInfo,
    //         hasUserInfo: true
    //       })
    //     }
    //   })
    // }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
