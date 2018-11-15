// pages/fd/data/data-num.js
var app=getApp()
Page({
  data: {
    lt: '<',
    dataInfo:[]
  },
  onLoad: function (options) {
    app.http('/data/landlord_comment_data', {member_type:'2'})
      .then(res => {
        this.setData({
          dataInfo: res.data
        })
      })
  }
})