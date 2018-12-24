var app = getApp()
// 引入SDK核心类
var QQMapWX = require('../../../lib/script/qqmap-wx-jssdk.min.js');
var qqmapsdk;
Page({
  data: {
    shangq: [],
    recommendData: [],
    storyData: [],
    imgUrl: '',
    locateUrl: '/images/fa-img.jpg',
    member_type: 0,
    cityList: [],
    cityId: 0,
    index: 0,
    searchC: '输入您想要的城市、商圈',
  },
  onLoad: function() {
    var that = this;
    that.setData({
      imgUrl: app.data.imgurl,
      member_type: app.globalData.member_type
    })
    // 实例化API核心类
    qqmapsdk = new QQMapWX({
      key: 'VY3BZ-HYDL6-RGYSX-MXXQU-4VDPO-ZZFQR'
    });
    //1、获取当前位置坐标
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        //2、根据坐标获取当前位置名称，显示在顶部:腾讯地图逆地址解析
        qqmapsdk.reverseGeocoder({
          location: {
            latitude: res.latitude,
            longitude: res.longitude
          },
          success: function (addressRes) {
            var address = addressRes.result.address_component.city;
            for (var i = 0; i < that.data.cityList.length; i++) {
              if (address.indexOf(that.data.cityList[i].name)!=-1) {
                that.setData({
                  index: i,
                  cityId: that.data.cityList[i].id
                })
              }else{
                wx.showToast({
                  title: "当前城市不存在，默认上海",
                  icon: 'none',
                  duration: 2000
                })
              }
            }
            that.getcommercialCircleList({ city: that.data.cityId, type: '1'})
            that.getstoryList({ city: that.data.cityId })
            that.getisRecommendSpaceList({city: that.data.cityId}) 
          }
        })
      }
    })          
    this.getCityList()
  },
  // onShow:function(){
  //   //热门推荐
  //   var that=this
  //   app.http('/home/isRecommendSpaceList', {}, true)
  //     .then(res => {
  //       that.setData({
  //         recommendData: res.data.slice(0, 8)
  //       })
  //     })
  // },
  getisRecommendSpaceList: function (params){
    //热门推荐
    wx.showLoading({
      title: '加载中',
    })
    app.http('/home/isRecommendSpaceList', params, true)
      .then(res => {
        if (res.data.length>0){
          this.setData({
            recommendData: res.data.slice(0, 8)
          })
          wx.hideLoading()
        }        
      })
  },
  
  getcommercialCircleList: function (params){
    //热门商圈
    app.http('/home/commercialCircleList', params, true)
      .then(res => {
        this.setData({
          shangq: res.data
        })
      })
  },
  getstoryList: function (params){
    //故事列表
    app.http('/home/storyList', params, true)
      .then(res => {
        this.setData({
          storyData: res.data
        })
      })
  },
  getCityList: function () {
    app.http('/area/cityList', {}, true)
      .then(res => {
        this.setData({
          cityList: res.data
        })
      })
  },
  bindPickerChange: function (e) {
    this.setData({
      index: e.detail.value
    })
    this.getcommercialCircleList({ city: this.data.cityList[e.detail.value].id, type: '1'})
    this.getstoryList({ city: this.data.cityList[e.detail.value].id})
    this.getisRecommendSpaceList({ city: this.data.cityList[e.detail.value].id})
  },
  gotolist: function(e) {
    wx.navigateTo({
      url: "../list/list?name=" + e.currentTarget.dataset.text
    })
  },
  //加收藏
  addCl: function(e) {
    var that = this
    if (that.data.member_type == '') {
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
        }, true)
        .then(res => {
          wx.showToast({
            title: res.msg,
            icon: 'none',
            duration: 2000
          })
          //热门推荐
          app.http('/home/isRecommendSpaceList', {}, true)
            .then(res => {
              that.setData({
                recommendData: res.data
              })
            })
        })
    }
  },
  toSearch: function() {
    wx.navigateTo({
      url: '../search/search'
    })
  },
  toNewP: function(e) {
    if (e.currentTarget.dataset.text != '') {
      wx.navigateTo({
        url: 'newP?link_address=' + e.currentTarget.dataset.text
      })
    }
  },
  goToList: function() {
    wx.redirectTo({
      url: "../../fk/list/list"
    })
  },
  goToSpace: function() {
    wx.redirectTo({
      url: "../../fd/space/index"
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
      url: "../../fd/data/index"
    })
  },
  goToCalendar: function() {
    wx.redirectTo({
      url: "../../fd/calendar/index"
    })
  }
})