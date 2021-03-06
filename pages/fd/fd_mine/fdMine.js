// pages/fd/data/index.js
import {ajaxData} from '../../../utils/common.js'
var app = getApp()
Page({

  data: {
    myInfo: [],
    pList: [],
    member_type: 2
  },
  onLoad: function(options) {

    this.setData({
      member_type: wx.getStorageSync('member_type')
    });
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
      success: function(res) {
        if (res.data.code == 200) {
          that.setData({
            myInfo: res.data.data
          })
        }
        wx.hideLoading()
      },
      fail: function(err) {
        wx.hideLoading()
      }
    })
    let data2 = {
      space_id: options.space_id,
      member_id: wx.getStorageSync('member_id')
    }
    data2 = ajaxData(data2)
    wx.request({
      url: app.data.requestUrl + "/comment/get_comment",
      data: data2,
      method: 'POST',
      header: {
        "content-type": "application/x-www-form-urlencoded; charset=UTF-8"
      },
      success: function(res) {
        if (res.data.code == 200) {
          that.setData({
            pList: res.data.data
          })
        }
        wx.hideLoading()
      },
      fail: function(err) {
        wx.hideLoading()
      }
    })
  },
  goToList: function() {
    wx.redirectTo({
      url: "../../fk/index/index"
    })
  },
  goToSpace: function() {
    wx.redirectTo({
      url: "../space/index"
    })
  },
  goToMine: function() {
    wx.redirectTo({
      url: "../../mine/mine"
    })
  },
  goToNews: function() {
    wx.redirectTo({
      url: "../../news/news"
    })
  },
  goToTrip: function() {
    wx.redirectTo({
      url: "../../fk/trip/trip"
    })
  },
  goToCollection: function() {
    wx.redirectTo({
      url: "../../fk/collection/collection"
    })
  },

  goToData: function() {
    wx.redirectTo({
      url: "../data/index"
    })
  },
  goToCalendar: function() {
    wx.redirectTo({
      url: "../calendar/index"
    })
  }
})