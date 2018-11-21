var app = getApp()
Page({
  data: {
    data: '',
    chooseDateArrInfo: '',
    price: 0,
    status: 1,
    space_id: 0
  },
  onLoad: function(options) {
    this.setData({
      data: options.data,
      chooseDateArrInfo: options.chooseDateArrInfo,
      space_id: options.space_id
    })
  },
  switch1Change: function(e) {
    // 可定状态 0：可预订 1：不可预订
    if (e.detail.value) {
      this.setData({
        status: 0
      })
    } else {
      this.setData({
        status: 1
      })
    }
  },
  //获取价格
  getPrice: function(e) {
    this.setData({
      price: e.detail.value
    })
  },
  save: function() {
    var data = {
      space_id: this.data.space_id,
      status: this.data.status,
      date: this.data.chooseDateArrInfo
    }
    if (this.data.price != 0) {
      data.price = this.data.price
    }
    app.http('/space/setSpaceCalendar', data)
      .then(res => {
        wx.navigateBack({
          delta: 1
        })
      })
  }
})