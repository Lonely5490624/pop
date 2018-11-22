//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    order_id:0,
    tripInfo:[]
  },
  onLoad: function (options) {
    this.setData({
      order_id:options.id,
      userInfo: app.globalData.userInfo,
    })
    app.http('/order/order_detail', { order_id: options.id})
      .then(res => {
        this.setData({
          tripInfo: res.data
        })
        console.log(res.data)
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
  }
})
