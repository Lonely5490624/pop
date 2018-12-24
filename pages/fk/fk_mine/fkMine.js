// pages/fd/data/index.js
var app = getApp()
Page({

  data: {
    myInfo: [],
    pList: []
  },
  onLoad: function(options) {
    app.http('/my/index', {})
      .then(res => {
        this.setData({
          myInfo: res.data
        })
      })
    app.http('/comment/get_comment', {
        "space_id": options.space_id
      })
      .then(res => {
        this.setData({
          pList: res.data
        })
      })
  }
})