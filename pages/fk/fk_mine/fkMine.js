// pages/fd/data/index.js
import { ajaxData } from '../../../utils/common.js'
var app = getApp()
Page({

  data: {
    myInfo: [],
    pList: []
  },
  onLoad: function(options) {
    // app.http('/my/index', {member_id: options.member_id})
    //   .then(res => {
    //     this.setData({
    //       myInfo: res.data
    //     })
    //   })
    var that = this
    let data = {
      member_id: options.member_id
    }
    data = ajaxData(data)
    wx.request({
      url: app.data.requestUrl + "/my/index",
      data: data,
      method: 'POST',
      header: {
        "content-type": "application/x-www-form-urlencoded; charset=UTF-8"
      },
      success: function (res) {
        if (res.data.code == 200) {
          that.setData({
            myInfo: res.data.data
          })
        }
        wx.hideLoading()
      },
      fail: function (err) {
        wx.hideLoading()
      }
    })
    app.http('/comment/get_consumer_comment', {
      order_id: options.order_id
      })
      .then(res => {
        this.setData({
          pList: res.data
        })
      })
  }
})