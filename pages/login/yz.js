// pages/fd/data/index.js
var interval = null //倒计时函数
Page({
  data: {
    inputLen: 6,
    iptValue: "",
    isFocus: false,
    currentTime: 59,
    disabled: false,
    bg: false,
    time: '59',
    moblie:''
  },
  onLoad: function() {
    this.getTime();
    wx.getStorage({
      key: 'mobile',
      success: function(res) {
        console.res.data;
        this.setData({
          moblie: res.data.mobile
        })
      },
    })
    
  },
  getTime: function(options) {
    var that = this;
    var currentTime = that.data.currentTime
    interval = setInterval(function() {
      currentTime--;
      that.setData({
        time: currentTime,
        disabled: true,
        bg: false
      })
      if (currentTime <= 0) {
        clearInterval(interval)
        that.setData({
          currentTime: 59,
          disabled: false,
          bg: true
        })
      }
    }, 100)
  },
  getVerificationCode() {    
    this.getCode();
    var that = this
    that.setData({
      disabled: true,
    })
  },
  getCode: function() {
    var that = this;
    wx.request({
      url: 'http://pop.aieye8.com/index.php/home/member/send_sms',
      data: {
        mobile: parseInt(this.data.mobile),
      },
      success: function(res) {
        that.getTime();
        console.log(res.data)
      }
    })
  },
  onFocus: function(e) {
    var that = this;
    that.setData({
      isFocus: true
    });
  },
  setValue: function(e) {
    console.log(e.detail.value);
    var that = this;
    that.setData({
      iptValue: e.detail.value
    });
    if (iptValue.length == 6) {
      wx.request({
        url: 'http://pop.aieye8.com/index.php/home/member/login',
        data: {
          mobile: parseInt(this.data.mobile),
          code: parseInt(this.data.iptValue)
        },
        success: function(res) {
          console.log(res.data)
          if (res.data.code == 200) {
            wx.navigateTo({
              url: '../fk/index/index'
            })             
          } else if (res.data.code == 400) {
            wx.showToast({
              title: '此手机号码没有被注册过',
              icon: 'none',
              duration: 2000
            })
          } else if (res.data.code == 600) {
            wx.showToast({
              title: '验证码不正确',
              icon: 'none',
              duration: 2000
            })
          } else {
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