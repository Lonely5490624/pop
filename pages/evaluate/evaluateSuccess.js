// pages/fd/data/index.js
Page({
  data: {
    order_id:'',
    member_id : ''
  },
  onLoad:function(options){
    this.setData({
      order_id: options.order_id,
      member_id : options.member_id,
      space_id : options.space_id
    })
  },
  next:function(){
    if (wx.getStorageSync('member_type') == 2) {
      wx.navigateTo({
        url: "../fk/fk_mine/fkMine?order_id=" + this.data.order_id + "&member_id=" + this.data.member_id
      })
    }else{
      wx.navigateTo({
        url: "../fd/fd_mine/fdMine?order_id=" + this.data.order_id + "&member_id=" + this.data.member_id+"&space_id="+this.data.space_id
      })
    }    
  }
})