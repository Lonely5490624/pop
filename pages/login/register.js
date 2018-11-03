Page({
  data: {
    mobile: '',
    ajxtrue: false,
    code: '',
    nextBtn:false,
    btnCont:"获取短信验证码",
  },
  getMoblie: function(e) {
    this.setData({
      mobile: e.detail.value
    })
  },
  getYzcode: function(e) {
    this.setData({
      code: e.detail.value,
      nextBtn:true
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
          mobile: parseInt(this.data.mobile)
        },
        success: function(res) {
          console.log(res.data)          
          // page.this.setData({
          //   btnCont:"59s",
          // })
        }
      })
    }
  },
  send: function() {
    if (this.data.code.length==0) {
      wx.showToast({
        title: '验证码不能为空',
        icon: 'none',
        duration: 2000
      })
    } else {
      wx.request({
        url: 'http://pop.aieye8.com/index.php/home/member/login',
        data: {
          mobile: parseInt(this.data.mobile),
          code: parseInt(this.data.code)
        },
        success: function(res) {
          console.log(res.data)
          if (res.data.code==200){
            wx.showToast({
              title: '此手机号码已被注册过',
              icon: 'none',
              duration: 2000
            })
          } else if (res.data.code == 400){
            wx.navigateTo({
              url: 'addPerMessage'
            })
          }
          else if (res.data.code == 600) {
            wx.showToast({
              title: '验证码不正确',
              icon: 'none',
              duration: 2000
            })
          }else{
            wx.showToast({
              title: '注册失败',
              icon: 'none',
              duration: 2000
            })
          }
        }
      })
    }
  }
})