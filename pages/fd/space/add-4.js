// pages/fd/space/add-4.js
const app = getApp()
Array.prototype.remove = function (val) {
  var index = this.indexOf(val);
  if (index > -1) {
    this.splice(index, 1);
  }
};

const attributesArrar = [{
  id: 1,
  name: '专营店'
}, {
  id: 2,
  name: '品牌店'
}]
const consumption_orientationsArray = [{
  id: 1,
  name: '奢品'
}, {
  id: 2,
  name: '轻奢'
}, {
  id: 3,
  name: '精选'
}, {
  id: 4,
  name: '快消'
}]
Page({

  /**
   * 页面的初始数据
   */
  data: {
    spaceId: null,
    title: '',
    describe: '',
    address: '',
    latitude: '',
    longitude: '',
    attributes: ['专营店', '品牌店'],
    attributesArrar,
    attributeIndex: 0,
    consumption_orientations: ['奢品', '轻奢', '精选', '快消'],
    consumption_orientationsArray,
    consumption_orientationIndex: 0,
    category: [],
    categoryList: [],
    convenience: [],
    convenienceList: [],
    store_introduce: '',
    craftsmanship: [],
    craftsmanshipList: []
  },
  // 空间类型选择
  changeAttribute: function (e) {
    this.setData({
      attributeIndex: e.detail.value
    })
  },
  // 消费定位选择
  changeCon (e) {
    this.setData({
      consumption_orientationIndex: e.detail.value
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // options.spaceId = 158
    this.setData({
      spaceId: options.spaceId
    })
    // 获取空间品类
    app.http('/home/categoryList')
      .then(res => {
        this.setData({
          categoryList: res.data
        })
      })
    // 获取便利设施
    app.http('/home/convenienceList')
      .then(res => {
        this.setData({
          convenienceList: res.data
        })
      })
    // 获取店长技能
    app.http('/info/craftsmanship')
      .then(res => {
        this.setData({
          craftsmanshipList: res.data
        })
      })
    app.http('/space/unpublished', { space_id: options.spaceId })
      .then(res => {
        let attributeIndex
        this.data.attributesArrar.forEach((item, index) => {
          if (item.id == res.data.attribute) attributeIndex = index
        })
        let consumption_orientationIndex
        this.data.consumption_orientationsArray.forEach((item, index) => {
          if (item.id == res.data.consumption_orientation) consumption_orientationIndex = index
        })
        this.setData({
          title: res.data.title,
          describe: res.data.describe,
          address: res.data.address,
          attributeIndex,
          store_introduce: res.data.store_introduce,
          consumption_orientationIndex,
          category: res.data.category_id,
          convenience: res.data.convenience_facilities_id,
          craftsmanship: res.data.store_craftsmanship_id
        })
      })
  },
  // 输入标题
  inputTile (e) {
    this.setData({
      title: e.detail.value
    })
  },
  // 输入描述
  inputDescribe (e) {
    this.setData({
      describe: e.detail.value
    })
  },
  // 打开地图
  openMap () {
    wx.chooseLocation({
      success: res => {
        let params = {
          space_id: this.data.spaceId,
          address: res.address,
          lat: res.latitude,
          lng: res.longitude
        }
        app.http('/space/published_map', params)
          .then(res2 => {
            this.setData({
              address: res.address
            })
          })
      },
    })
  },
  // 选择品牌
  choosePin(e) {
    let arr = this.data.category
    let id = e.currentTarget.dataset.id
    if (arr.indexOf(id) > -1) {
      arr.remove(id)
    } else {
      arr.push(id)
    }
    this.setData({
      category: arr
    })
  },
  // 选择便利设施
  chooseCon(e) {
    let arr = this.data.convenience
    let id = e.currentTarget.dataset.id
    if (arr.indexOf(id) > -1) {
      arr.remove(id)
    } else {
      arr.push(id)
    }
    this.setData({
      convenience: arr
    })
  },
  // 输入店长介绍
  inputIntroduce(e) {
    this.setData({
      store_introduce: e.detail.value
    })
  },
  // 选择店长技能
  chooseCra(e) {
    let arr = this.data.craftsmanship
    let id = e.currentTarget.dataset.id
    if (arr.indexOf(id) > -1) {
      arr.remove(id)
    } else {
      arr.push(id)
    }
    this.setData({
      craftsmanship: arr
    })
  },
  // 下一步
  pubStep4() {
    let attributeIndex = this.data.attributeIndex
    let consumption_orientationIndex = this.data.consumption_orientationIndex
    let category = this.data.category
    let params = {
      space_id: this.data.spaceId,
      title: this.data.title,
      describe: this.data.describe,
      store_introduce: this.data.store_introduce,
      attribute: this.data.attributesArrar[attributeIndex].id,
      consumption_orientation: this.data.consumption_orientationsArray[consumption_orientationIndex].id,
      category,
      convenience: this.data.convenience,
      store_introduce: this.data.store_introduce,
      craftsmanship: this.data.craftsmanship
    }
    console.log(params)
    if(!params.title) {
      wx.showToast({
        title: '请填写空间标题',
        icon: 'none'
      })
      return
    }
    if (!params.describe) {
      wx.showToast({
        title: '请填写空间描述',
        icon: 'none'
      })
      return
    }
    if (!this.data.address) {
      wx.showToast({
        title: '请选择空间位置',
        icon: 'none'
      })
      return
    }
    if (params.category.length < 1){
      wx.showToast({
        title: '请选择品牌定位',
        icon: 'none'
      })
      return
    }
    if (params.convenience.length < 1) {
      wx.showToast({
        title: '请选择店铺设施',
        icon: 'none'
      })
      return
    }
    app.http('/space/published_three', params)
      .then(res => {
        console.log(res)
        wx.navigateTo({
          url: `add-6?spaceId=${this.data.spaceId}`,
        })
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