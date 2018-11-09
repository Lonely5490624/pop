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
    app.http('/home/historySearchList')
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
    app.http('/home/historySearchList')
      .then(res => {
        this.setData({
          historySearchList: res.data
        })
      })
  },
  //获取热门商圈
  getCommercialCircleList:function(){
    app.http('/home/commercialCircleList')
      .then(res => {
        this.setData({
          commercialCircleList: res.data
        })
      })
  },
  clear:function(){
    app.http('/home/clearHistorySearch')
      .then(res => {
        this.onLoad();
      })
  },
  search:function(e){
    app.http('/home/searchSpace', { search_content: e.detail.value})
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