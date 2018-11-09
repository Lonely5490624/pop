// pages/fk/list/list.js
const spaceData = []
var app=getApp()
Page({
  data: {
    spaceData,
    opendate: false,
    openFilter: false,
    userData:[]
  },
  opendate: function() {
    this.setData({
      opendate: true
    })
  },
  onLoad: function() {
    this.getList()
  },
  // 获取列表数据
  getList: function (params) {
    var that = this
    that.setData({
      userData: wx.getStorageSync('userData'),
    })
    app.http('/home/searchSpace')
      .then(res => {
        for (var i = 0; i++; i <= res.data.length) {
          res.data[i].avg_service = parseInt(res.data[i].avg_service)
        }
        that.setData({
          spaceData: res.data
        })
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
  }
})