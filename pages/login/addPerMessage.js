// pages/fd/data/index.js
var app=getApp()

Page({
  data: {
    mobile: '',
    nick_name: "",
    avatarUrl: '',
    head_img_url: '',
    synopsis: ''
  },
  onLoad:function(options){
    if (options){
      this.setData({
        mobile: options.mobile,
        code: options.code
      })
    }
    wx.getUserInfo({
      success: (res) => {
        this.setData({
          avatarUrl: res.userInfo.avatarUrl,
          head_img_url: res.userInfo.head_img_url,
          nick_name: res.userInfo.nickName
        })
      }
    })
  },
  changeAvatar () {
    wx.navigateTo({
      url: 'uploadImg',
    })
  },
  done () {
    let { mobile, nick_name, head_img_url, synopsis } = this.data
    wx.navigateTo({
      url: `registerYz?mobile=${mobile}&nick_name=${nick_name}&head_img_url=${head_img_url}&synopsis=${synopsis || ''}`,
    })
  }
})