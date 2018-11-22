//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    tripList: [],
    member_type: 0
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
      member_type: app.globalData.member_type,
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
  },
  goToList: function () {
    wx.redirectTo({
      url: "../../fk/list/list"
    })
  },
  goToSpace: function () {
    wx.redirectTo({
      url: "../../fd/space/index"
    })
  },
  goToMine: function () {
    wx.redirectTo({
      url: "../../mine/mine"
    })
  },
  goToNews: function () {
    wx.redirectTo({
      url: "../../news/news"
    })
  },
  goToTrip: function () {
    wx.redirectTo({
      url: "../../fk/trip/trip"
    })
  },
  goToCollection: function () {
    wx.redirectTo({
      url: "../../fk/collection/collection"
    })
  },
  goToData: function () {
    wx.redirectTo({
      url: "../../fd/data/index"
    })
  },
  goToCalendar: function () {
    wx.redirectTo({
      url: "../../fd/calendar/index"
    })
  }
})
