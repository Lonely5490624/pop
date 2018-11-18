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
    this.setData({
      imgUrl: app.data.imgurl,
      tripList: [{
        "id": "66",
        "member_id": "4",
        "order_no": "2018110199102524",
        "space_id": "6",
        "space_name": "静安寺商城",
        "space_image": "home\/201810281539192505648.jpeg",
        "balance": "0.01",
        "arrival_start_time": "11月15日",
        "arrival_end_time": "11月16日",
        "balance_time": "11月15日 00:00",
        "order_status": "2",
        "arrival_descr": "即将开始",
        "balance_status": 1,
        "balance_pay_time": 198,
        "refund_status": "0",
        "city_name": "上海",
        "commercial_name": "静安寺"
      }, {
        "id": "63",
        "member_id": "4",
        "order_no": "2018110150575010",
        "space_id": "6",
        "space_name": "静安寺商城",
        "space_image": "home\/201810281539192505648.jpeg",
        "balance": "3.00",
        "arrival_start_time": "11月15日",
        "arrival_end_time": "11月16日",
        "balance_time": "11月15日 00:00",
        "order_status": "2",
        "arrival_descr": "即将开始",
        "balance_status": 1,
        "balance_pay_time": 198,
        "refund_status": "0",
        "city_name": "上海",
        "commercial_name": "静安寺"
      }]
    })
    // app.http('/Order/orderList')
    //   .then(res => {
    //     this.setData({
    //       tripList: res.data,
    //       imgUrl: app.data.imgurl
    //     })
    //   })
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
