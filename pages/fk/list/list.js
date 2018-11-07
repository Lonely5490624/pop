// pages/fk/list/list.js
var app = getApp()
const spaceData = []
Page({
  data: {
    spaceData,
    opendate: false,
    isFilter: false,
    userData:[],
    imgurl:''
  },
  opendate: function() {
    this.setData({
      opendate: true      
    })
  },
  onLoad: function() {
    var that = this
    that.setData({
      userData: wx.getStorageSync('userData'),
      imgurl: app.data.imgurl
    })    
    var data = {
      member_id: that.data.userData.member_id
    }
    data = app.ajaxData(data);
    wx.request({
      url: app.data.requestUrl+'Home/home/searchSpace',
      method: "POST",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: data,
      success: function(res) {
        for (var i = 0; i++; i <= res.data.data.length) {          
          res.data.data[i].avg_service=parseInt(res.data.data[i].avg_service)
        }
        that.setData({
          spaceData: res.data.data
        })
      }
    })
  },
  //加收藏
  addCl:function(e){    
    var that=this
    var data = {
      member_id: that.data.userData.member_id,
      space_id: e.currentTarget.id
    }
    data = app.ajaxData(data);
    wx.request({
      url: app.data.requestUrl +'Home/collection/editCollection',
      method: "POST",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: data,
      success: function (res) {
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: 2000
        })
        var data = {
          member_id: that.data.userData.member_id
        }
        data = app.ajaxData(data);
        wx.request({
          url: app.data.requestUrl +'Home/home/searchSpace',
          method: "POST",
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          data: data,
          success: function (res) {
            for (var i = 0; i++; i <= res.data.data.length) {
              res.data.data[i].avg_service = parseInt(res.data.data[i].avg_service)
            }
            that.setData({
              spaceData: res.data.data
            })
          }
        })
      }
    })
  },
  openFilter: function() {
    this.setData({
      isFilter: true
    })
  },
  onMyEvent: function(e) {
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
    }
    console.log(this.data)
  },
  closeFilter: function(e) {
    let that = e.detail;
    if (that.fuc == 'close') {
      this.setData({
        isFilter: false
      })
    }
  }
})