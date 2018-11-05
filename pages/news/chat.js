//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
  
  },
  refuse:function(e){
    wx.showModal({
      title: '确认拒绝吗',
      content: '订单一旦拒绝，将不可恢复，您确定要拒绝xxx的订单吗？',
      success: function (res) {
        if (res.confirm) {
          console.log('确定')
        } else {
          console.log('取消')
        }

      }
    })
  },
  accept: function (e) {
    wx.showModal({
      title: '',
      content: '您确定接受xxx的订单吗？',
      success: function (res) {
        if (res.confirm) {
          console.log('确定')
        } else {
          console.log('取消')
        }

      }
    })
  }

})
