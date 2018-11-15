var app=getApp()
Page({
  data: {
    search_content:''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      search_content: options.search_content
    })
  }
})