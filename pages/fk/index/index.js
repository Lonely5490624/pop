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
    storyData
  },
  //事件处理函数
  //  pop.aieye8.com/index.php/Home/home/commercialCircleList
  toSearch: function() {
    wx.navigateTo({
      url: '../../logs/logs'
    })
  },
  onLoad:function(){
    var that=this;
    //热门商圈
    wx.request({
      url: 'http://pop.aieye8.com/index.php/Home/home/commercialCircleList',
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
