// pages/fk/list/list.js
import { ajaxData } from '../../../utils/common.js'
const spaceData = []
var app = getApp()
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
    rcData: [],
    Stext: '',
    dataText: '',
    pageNum: 1,
    total_page: 0,
    dx: false
  },
  opendate: function() {
    wx.navigateTo({
      url: "../../fd/calendar/index2?nikeName=" + this.data.nikeName
    })
  },
  onLoad: function(options) {
    var that = this;
    that.setData({
      imgUrl: app.data.imgurl,
      userData: wx.getStorageSync('userData'),
      member_type: app.globalData.member_type,
      cityId: wx.getStorageSync('cityId')
    })
    app.http('/area/cityList', {}, true)
      .then(res => {
        this.setData({
          cityList: res.data
        })
        for (var i = 0; i < res.data.length; i++) {
          if (res.data[i].id == wx.getStorageSync('cityId')) {
            that.setData({
              index: i
            })
          }
        }
      })
    if (options.name != undefined) {
      this.data.rcData.search_content = options.name
      that.setData({
        searchC: options.name,
        member_type: app.globalData.member_type
      })
    }
    that.data.rcData.city = that.data.cityId
    that.getList()
  },
  onShow: function() {
    let pages = getCurrentPages();
    let currPage = pages[pages.length - 1];
    this.data.rcData.end_date = currPage.data.endDate
    this.data.rcData.start_date = currPage.data.startDate
    if (currPage.data.endDate != '') {
      this.setData({
        dataText: currPage.data.startDate + '至' + currPage.data.endDate
      })
    }

    this.getList()
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
    wx.setStorageSync('cityId', this.data.cityList[e.detail.value].id)
  },
  onReachBottom: function() {
    this.data.rcData.page = this.data.pageNum
    if (this.data.total_page == Number(this.data.pageNum) - 1) {
      this.setData({
        dx: true
      })
    } else {
      app.http('/home/searchSpace', this.data.rcData, true)
        .then(res => {
          this.setData({
            pageNum: Number(res.data.current_page) + 1,
            spaceData: this.data.spaceData.concat(res.data.space_data),
            dx: false
          })
        })
    }

  },
  // 获取列表数据
  getList: function() {
    wx.showLoading({
      title: '加载中',
    })
    var that = this
    this.data.rcData.member_id = wx.getStorageSync('member_id')
    this.data.rcData.page = this.data.pageNum
    this.data.rcData.page_num = 10
    let data = this.data.rcData
    data = ajaxData(data)
    wx.request({
      url: app.data.requestUrl + "/home/searchSpace",
      data: data,
      method: 'POST',
      header: {
        "content-type": "application/x-www-form-urlencoded; charset=UTF-8"
      },
      success: function(res) {
        if (res.data.code == 200) {
          that.setData({
            spaceData: res.data.data.space_data,
            total_page: res.data.data.total_page
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
        setTimeout(() => {
          this.getList();
        }, 2000)
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

      if (this.data.searchC != '输入您想要的城市、商圈') {
        this.data.rcData.search_content = this.data.searchC
      }
      this.setData({
        Stext: that.data.textArr.join(',')
      })
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