// pages/fk/order/order-confirm-3.js
Page({
  data: {
    nextBtn:false,
    nikeName:""
  },
  
  getinput: function (e) {
    this.setData({
      nikeName: e.detail.value,
      nextBtn:true,
    });
  },
  save:function(){
    wx.navigateTo({
      url: "addPerMessage?nikeName=" + this.data.nikeName
    })
  } 
})
// wx.showToast({
//   title: '修改昵称不成功，请重试',
//   icon: 'none',
//   duration: 2000
// })
