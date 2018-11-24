// pages/fd/space/add-2.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    spaceId: null,
    mall_name: null,
    storey: null,
    regionList: [],
    regionArray: [],
    regionIndex: [0, 0]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      spaceId: options.spaceId
    })
    app.http('/space/unpublished', { space_id: options.spaceId })
      .then(res => {
        this.setData({
          mall_name: res.data.mall_name,
          storey: res.data.storey
        })
      })
    this.getCityList()
  },
  // 获取城市列表
  getCityList () {
    app.http('/area/province_list')
      .then(res => {
        console.log(res)
        this.setData({
          regionList: res.data.area
        })
        let arr = [[], []]
        res.data.area.forEach(item => {
          arr[0].push(item.value)
        })
        res.data.area[0].childs.forEach(item => {
          arr[1].push(item.value)
        })
        this.setData({
          regionArray: arr
        })
      })
  },
  bindcolumnchange (e) {
    let column = e.detail.column
    let index = e.detail.value
    let regionList = this.data.regionList
    let regionArray = this.data.regionArray
    let regionIndex = this.data.regionIndex
    if (column == 0) {
      regionArray[1] = []
      regionList[index].childs.forEach(item => {
        regionArray[1].push(item.value)
      })
      regionIndex = [index, 0]
    } else if (column == 1) {
      regionIndex[1] = e.detail.value
    }
    this.setData({
      regionArray,
      regionIndex
    })
  },
  // 选择城市
  changeRegin (e) {
    this.setData({
      region: e.detail.value
    })
  },
  // 下一步
  pubStep2() {
    let provinceItem = this.data.regionList.find(item => {
      return item.value == this.data.regionArray[0][this.data.regionIndex[0]]
    })
    let cityItem = provinceItem.childs.find(item => {
      return item.value == this.data.regionArray[1][this.data.regionIndex[1]]
    })
    let params = {
      space_id: this.data.spaceId,
      province: provinceItem.id,
      city: cityItem.id,
      mall_name: this.data.mall_name,
      storey: this.data.storey
    }
    if(!params.mall_name) {
      wx.showToast({
        title: '请填写商城名',
        icon: 'none'
      })
      return
    }
    if(!params.storey) {
      wx.showToast({
        title: '请填写楼层位置',
        icon: 'none'
      })
      return
    }
    app.http('/space/published_one', params)
      .then(res => {
        console.log(res)
        wx.navigateTo({
          url: `add-3?spaceId=${this.data.spaceId}`,
        })
      })
  },
  // 商城输入框
  bindMallInput (e) {
    this.setData({
      mall_name: e.detail.value
    })
  },
  // 位置输入框
  bindStoreyInput(e) {
    this.setData({
      storey: e.detail.value
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})