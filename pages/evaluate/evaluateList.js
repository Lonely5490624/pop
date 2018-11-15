// pages/fd/data/index.js
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