// pages/fk/order/order-confirm-3.js
var app=getApp()
Page({
  data: {
    userData: [],
    userInfo: [],
    yhList: ["中国工商银行", "中国农业银行", "中国建设银行", "中国银行", "邮政储蓄银行", "交通银行", "招商银行", "华夏银行", "中信银行", "浦发银行", "民生银行", "平安银行", "光大银行"],
    index: '0',
    region: ['四川省', '成都市', '武侯区'],
    bank_number: '',
    subbranch: ''
  },
  onLoad: function(options) {
    var that = this
    that.setData({
      userData: wx.getStorageSync('userData')
    })
    app.http('/my/index')
      .then(res => {
        this.setData({
          userInfo: res.data
        })
      })
  },
  bindPickerChange: function(e) {
    this.setData({
      index: e.detail.value
    })
  },
  bindRegionChange: function(e) {
    this.setData({
      region: e.detail.value
    })
  },
  getBankNum: function(e) {
    this.setData({
      bank_number: e.detail.value
    })
  },
  getZH: function(e) {
    this.setData({
      subbranch: e.detail.value
    })
  },
  save: function() {
    var that = this;
    var reg = /^\d{19}$/g;
    var reg2 = /^\d{17}$/g;
    var reg3 = /^\d{16}$/g;
    if (!reg.test(that.data.bank_number)) {
      wx.showToast({
        title: '银行卡号不正确',
        icon: 'none',
        duration: 2000
      })
      return false;
    }
    if (that.data.bank_number == '') {
      wx.showToast({
        title: '支行信息不能为空',
        icon: 'none',
        duration: 2000
      })
      return false;
    }
    var data = {
      true_name: that.data.userInfo.true_name,
      credentials_numbere: that.data.userInfo.credentials_numbere,
      bank_number: that.data.bank_number,
      address: that.data.region,
      bank_name: that.data.yhList[that.data.index],
      subbranch: that.data.subbranch
    }
    app.http('/my/save_bank',data)
      .then(res => {
        wx.navigateTo({
            url: 'paymentMethod'
          })
      })
  }
})