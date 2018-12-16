// pages/fk/list/list.js
const spaceData = []
var app = getApp()
// 引入SDK核心类
var QQMapWX = require('../../../lib/script/qqmap-wx-jssdk.min.js');
var qqmapsdk;
Page({
  data: {
    spaceData,
    opendate: false,
    openFilter: false,
    userData: [],
    cityList: [],
    cityId: 0,
    index: 0,
    searchC: '输入您想要的城市、商圈',
    startDate: '',
    endDate: '',
    member_type: 0,
    imgUrl: '',
    rcData: []
  },
  opendate: function() {

    wx.navigateTo({
      url: "../../fd/calendar/index2?nikeName=" + this.data.nikeName
    })
  },
  onLoad: function(options) {
    var that = this;
    // 实例化API核心类
    qqmapsdk = new QQMapWX({
      key: 'VY3BZ-HYDL6-RGYSX-MXXQU-4VDPO-ZZFQR'
    });
    //1、获取当前位置坐标
    wx.getLocation({
      type: 'wgs84',
      success: function(res) {
        //2、根据坐标获取当前位置名称，显示在顶部:腾讯地图逆地址解析
        qqmapsdk.reverseGeocoder({
          location: {
            latitude: res.latitude,
            longitude: res.longitude
          },
          success: function(addressRes) {
            var address = addressRes.result.address_component.city;
            for (var i = 0; i < that.data.cityList.length; i++) {
              if (address.indexOf(that.data.cityList[i].name) != -1) {
                that.setData({
                  index: i,
                  cityId: that.data.cityList[i].id
                })
              }
            }
            that.data.rcData.city = that.data.cityId

            if (that.data.searchC.name != undefined) {
              that.data.rcData.search_content = that.data.searchC.name
            }
            that.getList()
          }
        })
      }
    })
    that.setData({
      imgUrl: app.data.imgurl,
      userData: wx.getStorageSync('userData'),
      member_type: app.globalData.member_type
    })
    if (options.name != undefined) {
      that.setData({
        searchC: options.name,
        member_type: app.globalData.member_type
      })
    }
  },
  onShow: function() {
    let pages = getCurrentPages();
    let currPage = pages[pages.length - 1];
    this.data.rcData.end_date = currPage.data.endDate
    this.data.rcData.start_date = currPage.data.startDate
    this.getList()
  },
  onReady: function() {
    this.getCityList();
  },
  getCityList: function() {
    app.http('/area/cityList', {}, true)
      .then(res => {
        this.setData({
          cityList: res.data
        })
      })
  },
  toSearch: function() {
    wx.navigateTo({
      url: '/pages/fk/search/search'
    })
  },
  bindPickerChange: function(e) {
    this.setData({
      index: e.detail.value
    })
    this.data.rcData.city = this.data.cityList[e.detail.value].id
    if (this.data.searchC != '输入您想要的城市、商圈') {
      this.data.rcData.search_content = this.data.searchC
    }
    this.getList()
  },
  // 获取列表数据
  getList: function () {
    wx.showLoading({
      title: '加载中',
    })
    var that = this
    wx.request({
      url: app.data.requestUrl + "/home/searchSpace",
      data: this.data.rcData,
      method: 'POST',
      header: {
        "content-type": "application/x-www-form-urlencoded; charset=UTF-8"
      },
      success: function(res) {
        if (res.data.code == 200) {
          that.setData({
            spaceData: res.data.data.space_data
          })
        } else {
          that.setData({
            spaceData: []
          })
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 2000
          })
        }
        wx.hideLoading()
      },
      fail: function(err) {
        wx.hideLoading()
      }
    })
  },
  //加收藏
  addCl: function(e) {
    var that = this
    app.http('/collection/editCollection', {
        space_id: e.currentTarget.id
      }, true)
      .then(res => {
        wx.showToast({
          title: res.msg,
          icon: 'none',
          duration: 2000
        })
        this.getList();
      })
  },
  openFilter: function() {
    this.setData({
      openFilter: true
    })
  },
  onFilter: function(e) {
    // 自定义组件触发事件时提供的detail对象
    let that = e.detail;
    if (that.fuc == "close") {
      this.setData({
        opendate: 0,
        openFilter: false,
      })
    } else if (that.fuc == 'submit') {
      this.setData({
        openFilter: false,
      })

      this.data.rcData.start_price = that.data.low,
        this.data.rcData.end_price = that.data.high,
        this.data.rcData.space_type = that.data.currentTypes.join(','),
        this.data.rcData.category_ids = that.data.currentCates.join(','),
        this.data.rcData.convenience_facilities_ids = that.data.currentFacs.join(','),
        this.data.rcData.city = this.data.cityList[this.data.index].id
        if (this.data.searchC != '输入您想要的城市、商圈'){
        this.data.rcData.search_content = this.data.searchC
        }
      this.getList()
    }
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