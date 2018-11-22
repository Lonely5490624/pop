// pages/fk/list/list.js
const spaceData = []
var app=getApp()
Page({
  data: {
    spaceData,
    opendate: false,
    openFilter: false,
    userData:[],
    cityList: [],
    index: 0,
    searchC:'输入您想要的城市、商圈',
    member_type: 0,
    imgUrl: ''
  },
  opendate: function() {
    this.setData({
      opendate: true
    })
  },
  onLoad: function(options) { 
    var that = this;
    that.setData({
      imgUrl: app.data.imgurl,
      userData: wx.getStorageSync('userData'),
      member_type: app.globalData.member_type
    }) 
    if (options.name != undefined){
      this.setData({
        searchC: options.name,
        member_type: app.globalData.member_type
      }) 
      this.getList({ search_content: options.name})
    }else{
      this.getList({})      
    }
  },
  onReady:function(){
    this.getCityList();
  },
  getCityList:function() {
    app.http('/area/cityList')
      .then(res => {
        this.setData({
          cityList: res.data
        })
        console.log(res.data);
      })
  },
  toSearch: function () {
    wx.navigateTo({
      url: '/pages/fk/search/search'
    })
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  // 获取列表数据
  getList: function (params) {
    app.http('/home/searchSpace', params)
      .then(res => {
        console.log(res)
        this.setData({
          spaceData: res.data.space_data
        })
        // for (var i = 0; i++; i <= res.data.length) {
        //   res.data[i].avg_service = parseInt(res.data[i].avg_service)
        // }
        // that.setData({
        //   spaceData: res.data
        // })
      })
  },
  //加收藏
  addCl:function(e){
    
    var that=this
    app.http('/collection/editCollection',{ space_id: e.currentTarget.id})
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
    // this.setData({
    //   start: util.datefuc('Y-m-d H:i:s', new Date(that.start).getTime() / 1000, true),
    //   end: util.datefuc('Y-m-d H:i:s', new Date(that.end).getTime() / 1000, true),
    //   starttime: util.datefuc('m月d日', new Date(that.start).getTime() / 1000, true),
    //   endtime: util.datefuc('m月d日', new Date(that.end).getTime() / 1000, true),
    //   compareday: util.compare(new Date(that.start).getTime(), new Date(that.end).getTime()),
    // });
    if (that.fuc == "close") {
      this.setData({
        opendate: 0,
      })
    } else if (that.fuc == 'submit') {
      this.setData({
        openFilter: 0,
      })
      let params = {
        start_price: that.data.low,
        end_price: that.data.high,
        space_type: that.data.currentTypes.join(','),
        category_ids: that.data.currentCates.join(','),
        convenience_facilities_ids: that.data.currentFacs.join(',')
      }
      console.log(params)
      this.getList(params)
    }
  },
  toNewP: function (e) {
    if (e.currentTarget.dataset.text != '') {
      wx.navigateTo({
        url: 'newP?link_address=' + e.currentTarget.dataset.text
      })
    }
  },
  goToList: function () {
    wx.redirectTo({
      url: "../../fk/list/list"
    })
  },
  goToSpace: function () {
    wx.redirectTo({
      url: "../../fd/space/index"
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