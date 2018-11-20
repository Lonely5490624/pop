//index.js
//获取应用实例
var app = getApp()
const points = []
Page({
  data: {
    markers: [{
      iconPath: "/images/location.png",
      id: 0,
      latitude: 23.099994,
      longitude: 113.324520,
      width: 50,
      height: 50,
    }],
    polyline: [{
      points: points,
      color: "#FF0000DD",
      width: 2,
      dottedLine: true
    }],
    controls: [{
      id: 1,
      iconPath: '/images/location.png',
      position: {
        left: 0,
        top: 0,
        width: 50,
        height: 50
      },
      clickable: true
    }],
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 1000,
    displayMultipleItems: true,
    space_id: '', //空间id
    space_info: [],
    ssHeight: false,
    isShow1: false,
    isShow2: false,
    imgUrl: ''
  },
  //立即预定
  reserve: function() {

  },

  //查看更多
  openMore: function() {
    this.setData({
      ssHeight: true,
      isShow1: false,
      isShow2: false
    })
  },
  //事件处理函数
  previewImages: function() {
    wx.previewImage({
      urls: ['http://www.runoob.com/try/demo_source/paris.jpg', 'http://www.runoob.com/try/demo_source/paris.jpg',
        'http://www.runoob.com/try/demo_source/paris.jpg', 'http://www.runoob.com/try/demo_source/paris.jpg'
      ]
    })
  },
  onLoad: function(options) {
    this.setData({
      imgUrl: app.data.imgurl
    })
    console.log(options)
    if (options != '') {
      this.setData({
        space_id: options.id
      })
    }
    var that = this
    app.http('/home/spaceDetail', {
        space_id: that.data.space_id
      })
      .then(res => {
        console.log(res.data)
        that.setData({
          space_info: res.data,
          points: [{
            longitude: res.data.longitude,
            latitude: res.data.latitude
          }, {
            longitude: res.data.longitude,
            latitude: res.data.latitude
          }]
        })
        if (res.data.describe.length > 40) {
          that.setData({
            isShow1: true
          })
        }
        if (res.data.convenience_facilities.length > 4) {
          that.setData({
            isShow2: true
          })
        }
      })
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  regionchange(e) {
    console.log(e.type)
  },
  markertap(e) {
    console.log(e.markerId)
  },
  controltap(e) {
    console.log(e.controlId)
  },
  onShareAppMessage: function() {
    return {
      title: '自定义分享标题',
      desc: '自定义分享描述',
      path: '/page/user?id=123'
    }
  },
  next: function() {
    wx.navigateTo({
      url: "/pages/fk/order/order-confirm?space_id=" + this.data.space_id
    })
  },
  gochat:function() {
    wx.navigateTo({
      url: "/pages/news/chat?space_id=" + this.data.space_id
    })
  }
})