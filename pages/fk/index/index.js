var app = getApp()
Page({
  data: {
    shangq: [],
    userData: [],
    recommendData: [],
    storyData: [],
    imgUrl: '',
    locateUrl: '/images/fa-img.jpg',
    member_type:0
  },
  onLoad: function() {
    var that = this;
    that.setData({
      imgUrl: app.data.imgurl,
      userData: wx.getStorageSync('userData'),
      member_type: app.globalData.member_type
    })
    //热门商圈
    app.http('/home/commercialCircleList', {
        type: '1'
      })
      .then(res => {
        this.setData({
          shangq: res.data
        })
      })
    //故事列表
    app.http('/home/storyList')
      .then(res => {
        this.setData({
          storyData: res.data
        })
      })
    //热门推荐
    app.http('/home/isRecommendSpaceList')
      .then(res => {
        this.setData({
          recommendData: res.data
        })
      })
  },
  gotolist: function(e) {
    wx.navigateTo({
      url: "../list/list?name=" + e.currentTarget.dataset.text
    })
  },
  //加收藏
  addCl: function(e) {
    var that = this
    if (that.data.userData == '') {
      wx.showModal({
        title: '请先登录',
        content: '现在去登陆？',
        success: function(res) {
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
          space_id: e.currentTarget.id
        })
        .then(res => {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 2000
          })
          //热门推荐
          app.http('/home/isRecommendSpaceList')
            .then(res => {
              that.setData({
                recommendData: res.data
              })
              console.log(res.data)
            })
        })
    }
  },
  toSearch: function() {
    wx.navigateTo({
      url: 'search'
    })
  },
  toNewP: function(e) {
    if (e.currentTarget.dataset.text != '') {
      wx.navigateTo({
        url: 'newP?link_address=' + e.currentTarget.dataset.text
      })
    }
  },
  goToList:function(){
    wx.redirectTo({
      url: "../../fk/list/list"
    })  
  },
  goToSpace: function () {
    wx.redirectTo({
      url: "../../fk/space/index"
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
      url: "../../fd/calendar/index2"
    })
  }
})