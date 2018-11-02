// pages/fd/data/index.js
var app=getApp()
Page({
  data: {
    userInfo: {
      avatarUrl: "",//用户头像
      nickName: "",//用户昵称
    },
    info: ""
  },
  onLoad:function(options){
    if (options!=''){
      this.setData({
        info: options.info,
        nickName: options.nikeName
      })
    }
    
  }
})