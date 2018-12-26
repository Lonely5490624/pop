var app=getApp()
Page({
  data: {
    userData: [],
    historySearchList:[],
    commercialCircleList:[]
  },
  navigateBack: function() {
    wx.navigateBack({
      changed: true
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onShow:function(){
    app.http('/home/historySearchList', {}, true)
      .then(res => {
        this.setData({
          historySearchList: res.data
        })
      })
  },
  onLoad: function (options) {
    this.getCommercialCircleList();
    this.setData({
      userData: wx.getStorageSync('userData')
    })
    app.http('/home/historySearchList', {}, true)
      .then(res => {
        this.setData({
          historySearchList: res.data
        })
      })
  },
  bindtapFunc: function (e) {
    wx.navigateTo({
      url: "../list/list?name=" + e.currentTarget.dataset.text
    })
  },
  //获取热门商圈
  getCommercialCircleList:function(){
    app.http('/home/commercialCircleList', { city: wx.getStorageSync('cityId')})
      .then(res => {
        this.setData({
          commercialCircleList: res.data
        })
      })
  },
  clear:function(){
    app.http('/home/clearHistorySearch', {}, true)
      .then(res => {
        this.onLoad();
      })
  },
  search:function(e){
    app.http('/home/searchSpace', { search_content: e.detail.value}, true)
      .then(res => {
        console.log(res.data);
        if (res.code != 200) {
          wx.navigateTo({
            url: 'searchResult?search_content=' + e.detail.value
          })
        }
        //this.onLoad();
      })
  },
  cancle:function(){
    wx.navigateBack({
      delta: 1
    })
  }  
})