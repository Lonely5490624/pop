//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    userData:[],
    newsList:[],
    info_id: "",
    order_id: "",
    space_id: "",
    newsContent:''
  },
  onLoad:function(options){
    var that=this
    that.setData({
      userData: wx.getStorageSync('userData'),
      info_id: options.info_id,
      order_id: options.order_id,
      space_id: options.space_id,
    })
    // var data = {
    //   member_id: that.data.userData.member_id,
    //   member_type: that.data.userData.member_type,
    //   info_id: that.data.info_id,
    //   order_id: that.data.order_id,
    //   space_id: that.data.space_id,
    // }
    // data = app.ajaxData(data);
    // wx.request({
    //   url: app.data.requestUrl + 'home/message/detail',
    //   data: data,
    //   method: "POST",
    //   header: {
    //     "Content-Type": "application/x-www-form-urlencoded"
    //   },
    //   success: function (res) {
    //     that.setData({
    //       newsList: res.data.data.result
    //     })
    //     console.log(res.data.data);
    //   }
    // })

    app.http('/message/index', { member_type: this.data.userData.member_type })
      .then(res => {
        this.setData({
          newsList: res.data
        })
      })
  },
  getNewContent:function(e){
    this.setData({
      newsContent: e.detail.value
    })    
  },
  send:function(){
    var that = this
    that.setData({
      userData: wx.getStorageSync('userData')
    })
    var data = {
      member_id: that.data.userData.member_id,
      member_type: that.data.userData.member_type,
      info_id: that.data.info_id,
      order_id: that.data.order_id,
      space_id: that.data.space_id,
      content: that.data.newsContent
    }
    data = app.ajaxData(data);
    wx.request({
      url: app.data.requestUrl + 'home/message/send_message',
      data: data,
      method: "POST",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        // that.setData({
        //   newsList: res.data.data.result
        // })
        console.log(res.data);
      }
    })
  },
  refuse:function(e){
    wx.showModal({
      title: '确认拒绝吗',
      content: '订单一旦拒绝，将不可恢复，您确定要拒绝xxx的订单吗？',
      success: function (res) {
        if (res.confirm) {
          console.log('确定')
        } else {
          console.log('取消')
        }

      }
    })
  },
  accept: function (e) {
    wx.showModal({
      title: '',
      content: '您确定接受xxx的订单吗？',
      success: function (res) {
        if (res.confirm) {
          console.log('确定')
        } else {
          console.log('取消')
        }

      }
    })
  }

})
