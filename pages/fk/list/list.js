// pages/fk/list/list.js
const spaceData = []
Page({
  data: {
    spaceData,
    opendate: false,
    openFilter: true,
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
    let data = Object.assign({}, params, {member_id: that.data.userData.member_id})
    wx.request({
      url: 'http://pop.aieye8.com/index.php/Home/home/searchSpace',
      method: "POST",
      data,
      success: function (res) {
        console.log(res.data.data)
        for (var i = 0; i++; i <= res.data.data.length) {
          res.data.data[i].avg_service = parseInt(res.data.data[i].avg_service)
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
    console.log(that.data.userData.member_id)
    wx.request({
      url: 'http://pop.aieye8.com/index.php/Home/collection/editCollection',
      method: "POST",
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
        wx.request({
          url: 'http://pop.aieye8.com/index.php/Home/home/searchSpace',
          method: "POST",
          data: {
            member_id: that.data.userData.member_id,
          },
          success: function (res) {
            console.log(res.data.data)
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