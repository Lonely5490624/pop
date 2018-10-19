//index.js
//获取应用实例
const app = getApp()

const shangq = [{
    textCn: '新天地',
    textEn: 'XinTianDi',
    img: 'http://www.runoob.com/try/demo_source/paris.jpg'
  }, {
    textCn: '南京西路',
    textEn: 'West Nanjing Road',
    img: 'http://www.runoob.com/try/demo_source/paris.jpg'
  }, {
    textCn: '新天地',
    textEn: 'XinTianDi',
    img: 'http://www.runoob.com/try/demo_source/paris.jpg'
  }, {
    textCn: '南京西路',
    textEn: 'West Nanjing Road',
    img: 'http://www.runoob.com/try/demo_source/paris.jpg'
  }]
const recommendData = [{
    official: true,
    collect: true,
    imgUrl: 'http://www.runoob.com/try/demo_source/paris.jpg',
    tip: '商场店铺内的独立空间·美妆',
    title: '这里是空间标题空间标标题空间标题',
    price: '200',
    score: '4.0'
  }, {
    official: false,
    collect: true,
    imgUrl: 'http://www.runoob.com/try/demo_source/paris.jpg',
    tip: '商场店铺内的独立空间·美妆',
    title: '这里是空间标题空间标标题空间标题',
    price: '200',
    score: '4.0'
  }, {
    official: true,
    collect: true,
    imgUrl: 'http://www.runoob.com/try/demo_source/paris.jpg',
    tip: '商场店铺内的独立空间·美妆',
    title: '这里是空间标题空间标标题空间标题',
    price: '200',
    score: '4.0'
  }, {
    official: false,
    collect: true,
    imgUrl: 'http://www.runoob.com/try/demo_source/paris.jpg',
    tip: '商场店铺内的独立空间·美妆',
    title: '这里是空间标题空间标标题空间标题',
    price: '200',
    score: '4.0'
  }, {
    official: false,
    collect: true,
    imgUrl: 'http://www.runoob.com/try/demo_source/paris.jpg',
    tip: '商场店铺内的独立空间·美妆',
    title: '这里是空间标题空间标标题空间标题',
    price: '200',
    score: '4.0'
  }, {
    official: true,
    collect: true,
    imgUrl: 'http://www.runoob.com/try/demo_source/paris.jpg',
    tip: '商场店铺内的独立空间·美妆',
    title: '这里是空间标题空间标标题空间标题',
    price: '200',
    score: '4.0'
  }]
const storyData = [{
    title: '活动标题活动内容',
    info: '活动简介活动简介活动简介活动简介',
    imgUrl: 'http://www.runoob.com/try/demo_source/paris.jpg'
  }, {
    title: '活动标题活动内容',
    info: '活动简介活动简介活动简介活动简介',
    imgUrl: 'http://www.runoob.com/try/demo_source/paris.jpg'
  }, {
    title: '活动标题活动内容',
    info: '活动简介活动简介活动简介活动简介',
    imgUrl: 'http://www.runoob.com/try/demo_source/paris.jpg'
  }, {
    title: '活动标题活动内容',
    info: '活动简介活动简介活动简介活动简介',
    imgUrl: 'http://www.runoob.com/try/demo_source/paris.jpg'
  }, {
    title: '活动标题活动内容',
    info: '活动简介活动简介活动简介活动简介',
    imgUrl: 'http://www.runoob.com/try/demo_source/paris.jpg'
  }, {
    title: '活动标题活动内容',
    info: '活动简介活动简介活动简介活动简介',
    imgUrl: 'http://www.runoob.com/try/demo_source/paris.jpg'
  }]



Page({
  data: {
    locateUrl: 'http://www.runoob.com/try/demo_source/paris.jpg',
    shangq,
    recommendData,
    storyData
  },
  //事件处理函数
  toSearch: function() {
    wx.navigateTo({
      url: '../../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
