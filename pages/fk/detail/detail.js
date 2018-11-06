//index.js
//获取应用实例
const app = getApp()
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
    isShow:true
  },
  //立即预定
  reserve:function(){
    
  },
  //查看更多
  openMore:function(){
    this.setData({
      ssHeight: true,
      isShow:false
    })
  },
  //事件处理函数
  toSearch: function() {
    wx.navigateTo({
      url: '../../logs/logs'
    })
  },
  previewImages: function() {
    console.log(1)
    wx.previewImage({
      urls: ['http://www.runoob.com/try/demo_source/paris.jpg', 'http://www.runoob.com/try/demo_source/paris.jpg',
        'http://www.runoob.com/try/demo_source/paris.jpg', 'http://www.runoob.com/try/demo_source/paris.jpg'
      ]
    })
  },
  onLoad: function(options) {
    if (options != '') {
      this.setData({
        space_id: options.id
      })
    }
    var that = this
    wx.request({
      url: 'http://pop.aieye8.com/index.php/Home/home/spaceDetail',
      method: "POST",
      data: {
        space_id: that.data.space_id
      },
      success: function(res) {
        console.log(res.data)
        that.setData({
          space_info: res.data.data,
          points: [{
            longitude: res.data.data.longitude,
            latitude: res.data.data.latitude
          }, {
            longitude: res.data.data.longitude,
            latitude: res.data.data.latitude
          }]
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
  }
})