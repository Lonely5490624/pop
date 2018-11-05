// pages/fk/list/list.js
const spaceData = []
Page({
  data: {
    spaceData,
    opendate: false,
    isFilter: true
  },
  opendate: function() {
    this.setData({
      opendate: true
    })
  },
  onLoad: function() {
    var that = this
    wx.request({
      url: 'http://pop.aieye8.com/index.php/Home/home/searchSpace',
      data: {
        member_id: ''
      },
      success: function(res) {
        console.log(res.data.data)
        for (var i = 0; i++; i <= res.data.data.length) {          
          res.data.data[i].avg_service=parseInt(res.data.data[i].avg_service)
        }
        that.setData({
          spaceData: res.data.data
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