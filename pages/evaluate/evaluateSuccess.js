// pages/fd/data/index.js
Page({
  data: {
    space_id:''
  },
  onLoad:function(options){
    this.setData({
      space_id: options.space_id
    })
  },
  next:function(){
    wx.navigateTo({
      url: "../fk/fk_mine/fkMine?space_id=" + this.data.space_id
    })
  }
})