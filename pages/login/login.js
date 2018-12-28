// pages/fd/data/index.js
import {
  ajaxData
} from '../../utils/common'

var app = getApp()
Page({
  data: {
    btnBg: false,
    mobile: "",
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    head_img : ''
  },
  onLoad: function() {
      this.setData({
        head_img: app.globalData.userData.avatarUrl
      })
  },
 
  getMoblie: function(e) {
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
      let data = {
        mobile: parseInt(that.data.mobile)
      }
      data = ajaxData(data);
      wx.request({
        url: app.data.requestUrl + '/member/mobile_status',
        method: "POST",
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data,
        success: function (res) {
          if (res.data.data == 1) {
            wx.request({
              url: app.data.requestUrl + '/member/send_sms',
              method: "POST",
              header: {
                "Content-Type": "application/x-www-form-urlencoded"
              },
              data,
              success: function (res) {
                if (res.data.code == 200) {
                  wx.redirectTo({
                    url: 'yz?mobile=' + that.data.mobile
                  })
                } 
              }
            })
          } else {
            wx.showToast({
              title: '此手机号码没有被注册过',
              icon: 'none',
              duration: 2000
            });
            setTimeout(() => {
              wx.redirectTo({
                url: 'register'
              })
            }, 2000)
          }
        }
      })

    }
  }
})