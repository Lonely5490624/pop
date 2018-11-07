var app = getApp()
// const shangq = []
// const recommendData = []
// const storyData = []
Page({
  data: {
    shangq: [],
    userData: [],
    recommendData: [],
    storyData: [],
    imgUrl: ''
  },
  onLoad: function() {
    var that = this;
    that.setData({
      imgUrl: app.data.imgurl,
      userData: wx.getStorageSync('userData')
    })

    //热门商圈
    wx.request({
        url: app.data.requestUrl + 'Home/home/commercialCircleList',
        method: "POST",
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data: {
          member_id: '',
          type: '1'
        },
        success: function(res) {
          that.setData({
            shangq: res.data.data
          })
        }
      }),
      //故事列表
      wx.request({
        url: app.data.requestUrl + 'Home/home/storyList',
        method: "POST",
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data: {
          member_id: ''
        },
        success: function(res) {
          that.setData({
            storyData: res.data.data
          })
        }
      }),
      //热门推荐
      wx.request({
        url: app.data.requestUrl + 'Home/home/isRecommendSpaceList',
        method: "POST",
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data: {
          member_id: ''
        },
        success: function(res) {
          that.setData({
            recommendData: res.data.data
          })
        }
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
      wx.request({
        url: app.data.requestUrl + 'Home/collection/editCollection',
        method: "POST",
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data: {
          member_id: that.data.userData.member_id,
          space_id: e.currentTarget.id
        },
        success: function (res) {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 2000
          })
          //热门推荐
          wx.request({
            url: app.data.requestUrl + 'Home/home/isRecommendSpaceList',
            method: "POST",
            header: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            data: {
              member_id: that.data.userData.member_id,
            },
            success: function (res) {
              that.setData({
                recommendData: res.data.data
              })
              console.log(res.data)
            }
          })
        }
      })
    }   
  },
  toSearch: function() {
    wx.navigateTo({
      url: 'search'
    })
  },
})