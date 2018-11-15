// pages/fd/data/data-score.js
var app=getApp()
Page({
  data: {
    score:[],
    userData:[]
  },
  onLoad: function (options) {
    this.setData({
      userData: wx.getStorageSync('userData')
    })
    console.log(this.data.userData)
    // app.http('/data/space_comment_data', { member_type: this.data.userData.member_type, space_id: '' })
    app.http('/data/space_comment_data',{member_type:'2',space_id:''})
      .then(res => {
        this.setData({
          score: res.data
        })
        console.log(res.data)
      })
  },
  report:function(){
    wx.showModal({
      title: '确认要举报该评论吗？',
      content: '一旦举报，将不可撤销',
      success: function (res) {
        if (res.confirm) {         
          app.http('/data/report',{ comment_id: '',member_type:'2'})
            .then(res => {
              // this.setData({
              //   pubList: res.data
              // })
            })
        } else {
          console.log('取消')
        }

      }
    })
  }
})