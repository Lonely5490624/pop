var app = getApp()
Page({
  data: {
    shangq: [],
    userData: [],
    recommendData: [],
    storyData: [],
    imgUrl: '',
    locateUrl:'/images/fa-img.jpg'
  },
  onLoad: function() {
    var that = this;
    that.setData({
      imgUrl: app.data.imgurl,
      userData: wx.getStorageSync('userData')
    })

    //热门商圈
    app.http('/home/commercialCircleList', { type: '1'})
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
  gotolist: function (e) {
    wx.navigateTo({
      url: "../list/list?name=" + e.currentTarget.dataset.text
    })
  },
  //加收藏
  addCl: function (e) {
    var that = this
    if (that.data.userData==''){
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
    }else{
      app.http('/collection/editCollection',{ space_id: e.currentTarget.id})
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
})