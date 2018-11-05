//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    array: ['微信', '支付宝', '公对公付款'],
    index: 0,
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
})
