// pages/fd/data/data-score.js
var app=getApp()
Page({
  data: {
    score:[],
    userData:[],
    isshowHf:false,
    isshowHfbtn:true,
    hfCont:''
  },
  onLoad: function (options) {
    this.setData({
      userData: wx.getStorageSync('userData')
    })
    console.log(this.data.userData)
    app.http('/data/space_comment_data',{member_type:'2',space_id:''})
      .then(res => {
        this.setData({
          score: res.data
        })
        console.log(res.data)
      })
  },
  openHf:function(){
    this.setData({
      isshowHf:true,
      isshowHfbtn:false
    })
  },
  closeHf: function () {
    this.setData({
      isshowHf: false,
      isshowHfbtn: true
    })
  },
  getHfcont:function(e){
    this.setData({
      hfCont: e.detail.value
    })    
  },
  submitHf:function(){
    var data = {
      member_type:'2',
      comment_id:'',
      content: this.data.hfCont
    }
    app.http('/data/save_reply_content', data)
      .then(res => {
        // this.setData({
        //   newsList: res.data
        // })
        wx.showToast({
          title: res.msg,
          icon: 'none',
          duration: 2000
        })
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