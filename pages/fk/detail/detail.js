//获取应用实例
var app = getApp()
const points = []
Page({
  data: {
    markers: [{
      iconPath: "/images/location.png",
      id: 0,
      latitude: 31.2342,
      longitude: 121.469042,
      width: 50,
      height: 50
    }],
    controls: [],
    imgUrls: [],
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
    imgUrl: '',
    member_type: 0,
    openTuiding: false
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
    var that = this
    var arr = []
    for (var i = 0; i < that.data.imgUrls.length; i++) {
      arr.push(that.data.imgUrl + that.data.imgUrls[i]);
    }
    wx.previewImage({
      urls: arr
    })
  },
  onLoad: function(options) {
    this.setData({
      imgUrl: app.data.imgurl,
      member_type: app.globalData.member_type
    })
    if (options != '') {
      this.setData({
         space_id: options.id
      })
    }
    this.getDetail(this.data.space_id)
  },
  getDetail: function (space_id){
    var that = this
    app.http('/home/spaceDetail', {
      space_id: space_id
    })
      .then(res => {
        that.setData({
          space_info: res.data,
          imgUrls: JSON.parse(res.data.pics),
        })
        if (res.data.longitude != null) {
          this.setData({
            'markers[0].latitude': res.data.latitude,
            'markers[0].longitude': res.data.longitude
          })
        }
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
  },
  // 查看退订政策
  bindTuiding () {
    this.setData({
      openTuiding: true
    })
  },
  closeTuiding() {
    this.setData({
      openTuiding: false
    })
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
  gochat: function() {
    wx.navigateTo({
      url: "/pages/news/chat?space_id=" + this.data.space_id
    })
  },
  //加收藏
  addCl: function () {
    var that = this
    if (that.data.member_type == '') {
      wx.showModal({
        title: '请先登录',
        content: '现在去登陆？',
        success: function (res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '../../login/login'
            })
          } else {
            // console.log('取消')
          }
        }
      })
    } else {
      app.http('/collection/editCollection', {
        space_id: that.data.space_info.id
      }, true)
        .then(res => {
          wx.showToast({
            title: res.msg,
            icon: 'none',
            duration: 2000
          })
          this.getDetail(this.data.space_id)
        })
    }
  },
  gotorlIndex4:function(){
    wx.navigateTo({
      url: "../../fd/calendar/index4?space_id=" + this.data.space_id
    })
  }
})