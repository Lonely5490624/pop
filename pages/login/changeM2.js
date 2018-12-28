// pages/fk/order/order-confirm-3.js
Page({
  data: {
    noteMaxLen: 100,
    nextBtn:false,
    info:""
  },

  onLoad: function (options) {
    this.setData({
      info: options.info || '',
      limitNoteLen: 100 //剩余字数
    });
  },
  //字数限制
  bindWordLimit: function (e) {
    var value = e.detail.value, len = parseInt(value.length);
    if (len > this.data.noteMaxLen) return;
    this.setData({
      info: value,
      //currentNoteLen: len //当前字数
      nextBtn:true,
      limitNoteLen: this.data.noteMaxLen - len //剩余字数
    });
  },
  save: function () {
    let pages = getCurrentPages()
    let prevPage = pages[pages.length - 2]
    prevPage.setData({
      synopsis: this.data.info
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
