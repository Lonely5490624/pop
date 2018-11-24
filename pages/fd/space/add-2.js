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
    cityArray: [],
    ObjectCityArray: []
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
        let arr = [[],[]],
            objectArr = [],
            objectArr2 = [];
        res.data.area.forEach(item => {
          if (item.childs.length > 0) {
            item.childs.forEach(item2 => {
              arr[1].push(item2.value)
              // objectArr2.push({ id: item2.id, value: item2.value })
            })
          }
          arr[0].push(item.value)
          // objectArr.push(objectArr2)
          // objectArr2=[]
        })
        this.setData({
          cityArray: arr,
          ObjectCityArray: objectArr
        })
      })
  },
  bindcolumnchange (e) {
    console.log(e)
  },
  // 选择城市
  changeRegin (e) {
    this.setData({
      region: e.detail.value
    })
  },
  // 下一步
  pubStep2() {
    let params = {
      space_id: this.data.spaceId,
      province: '',
      city: '',
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