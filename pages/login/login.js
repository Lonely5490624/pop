// pages/fd/data/index.js
Page({
  data: {
    btnBg: false,
    mobile:""
  },
  onLoad: function(options) {

  },
  getMoblie: function (e) {
    this.setData({
      btnBg: true,
      mobile: e.detail.value
    })
  },
  yzPhoneNum: function() {
    if (!(/^1[34578]\d{9}$/.test(this.data.mobile))) {
      wx.showToast({
        title: '手机号不正确',
        icon: 'none',
        duration: 2000
      })
    } else {
      var that = this;
      wx.request({
        url: 'http://pop.aieye8.com/index.php/home/member/send_sms',
        data: {
          mobile: parseInt(that.data.mobile),
        },
        success: function(res) {
          if (res.data.code==200){
            wx.setStorage({
              key: 'mobile',
              data: that.ata.mobile
            })
            wx.navigateTo({
              url: 'yz'
            })
          }
          console.log(res.data)
        }
      })
    }
  }  
})