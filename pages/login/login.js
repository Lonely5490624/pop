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
      wx.request({
        url: 'http://pop.aieye8.com/index.php/home/member/send_sms',
        data: {
          mobile: parseInt(this.data.mobile),
        },
        success: function(res) {
          if (res.data.code==200){
            wx.navigateTo({
              url: 'yz'
            })
          }
          console.log(res.data)
          // page.this.setData({
          //   btnCont:"59s",
          // })
        }
      })
    }
  }  
})