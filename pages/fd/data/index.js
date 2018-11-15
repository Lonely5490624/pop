// pages/fd/data/index.js
var app=getApp()
Page({

  data: {
    dataInfo:[]
  },
  onLoad: function (options) {
    app.http('/data/index', { member_type:'2'})
      .then(res => {
        console.log(res.data);
        this.setData({
          dataInfo: res.data
        })
      })
  }
})