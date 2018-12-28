// pages/fk/order/order-confirm-3.js
Page({
  data: {
    nextBtn:false,
    nickName:""
  },
  
  getinput: function (e) {
    this.setData({
      nickName: e.detail.value,
      nextBtn:true,
    });
  },
  save: function () {
    let pages = getCurrentPages()
    let prevPage = pages[pages.length - 2]
    prevPage.setData({
      nick_name: this.data.nickName
    })
    wx.navigateBack({
      alpha: 1
    })
  } 
})
// wx.showToast({
//   title: '修改昵称不成功，请重试',
//   icon: 'none',
//   duration: 2000
// })
