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
  //  pop.aieye8.com/index.php/Home/home/commercialCircleList
  toSearch: function() {
    wx.navigateTo({
      url: '../../logs/logs'
    })
  },
  onLoad:function(){
    wx.request({
      url: 'pop.aieye8.com/index.php/Home/home/commercialCircleList', //仅为示例，并非真实的接口地址
      data: {
        member_id: ''//用户id
      },
      success: function (res) {
        console.log(res.data)
      }
    })
  }
})
