// pages/fd/data/index.js
var app=getApp()
Page({

  data: {
    pList:[]
  },

  onLoad: function (options) {
    app.http('/comment/get_comment', { space_id: options.space_id})
      .then(res => {
        this.setData({
          pList: res.data
        })
      })
  }
})