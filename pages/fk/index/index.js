//index.js
//获取应用实例
const app = getApp()

const shangq = []
const recommendData = []
const storyData = []
Page({
  data: {
    locateUrl: 'http://www.runoob.com/try/demo_source/paris.jpg',
    shangq,
    recommendData,
    storyData,
    userData:[]
  },
  //事件处理函数
  //  pop.aieye8.com/index.php/Home/home/commercialCircleList
  toSearch: function() {
    wx.navigateTo({
      url: '../../logs/logs'
    })
  },
  getCollect:function(){
    wx.showModal({
      title: '请先登录',
      content: '现在去登陆？',
      success: function (res) {
        if (res.confirm) {
          wx.navigateTo({
            url: '../../login/login'
          })
        } else {
          console.log('取消')
        }
      }
    })
  },
  onLoad:function(){
    var that = this;

    that.setData({
      userData: wx.getStorageSync('userData')
    })
    console.log(wx.getStorageSync('userData'));
    
    //热门商圈
    wx.request({
      url: 'http://pop.aieye8.com/index.php/Home/home/commercialCircleList',
      method: "POST",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        member_id: '',
        type:'1'
      },
      success: function (res) {
        that.setData({
          shangq: res.data.data
        })
      }
    }),
    //故事列表
      wx.request({
      url: 'http://pop.aieye8.com/index.php/Home/home/storyList',
      method: "POST",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
        data: {
          member_id: ''
        },
        success: function (res) {
          that.setData({
            storyData: res.data.data
          })
        }
      }),
      //热门推荐
      wx.request({
      url: 'http://pop.aieye8.com/index.php/Home/home/isRecommendSpaceList',
      method: "POST",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
        data: {
          member_id: ''
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
