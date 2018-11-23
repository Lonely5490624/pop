//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    order_id: null,
    balance_time: '11月15日 00:00',
    account:'',
    img: null
  },
  //事件处理函数
  onLoad: function (options) {
    this.setData({
      order_id: options.id,
      account: app.data.dgaccount      
    })
  },
  copy () {
    wx.setClipboardData({
      data: this.data.account,
      success: res => {

      }
    })
  },
  uploadImg () {
    wx.chooseImage({
      count: 1,
      success: res => {
        console.log(res)
        this.setData({
          img: res.tempFiles[0].path
        })
        app.http('/order/upload_voucher', { order_id: this.data.order_id, file: this.data.img})
          .then(res => {
            wx.showToast({
              title: res.msg,
              duration: 2000
            })
          })
      }
    })
  }
})
