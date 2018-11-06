// components/filter/filter.js
var app = getApp()
const spaceTypeList = [{
  id: 1,
  name: '独立空间'
}, {
  id: 2,
  name: '共享空间'
}]
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    low: 0,
    high: 10000,
    min: 0,
    max: 10000,
    categoryList: [],
    getconvenienceList: [],
    spaceTypeList
  },

  ready: function () {
    this.getCategory();
    this.getconvenience();
  },
  /**
   * 组件的方法列表
   */
  methods: {
    // 获取品类
    getCategory() {
      let that = this;
      wx.request({
        url: app.data.requestUrl + 'Home/home/categoryList',
        method: 'POST',
        success: function (res) {
          that.setData({
            categoryList: res.data.data
          })
        }
      })
    },
    // 获取便利设施
    getconvenience() {
      let that = this;
      wx.request({
        url: app.data.requestUrl + 'Home/home/convenienceList',
        method: 'POST',
        success: function (res) {
          that.setData({
            getconvenienceList: res.data.data
          })
        }
      })
    },
    // 选中类型
    chooseType (e) {
      console.log(e)
    },

    lowValueChangeAction: function (e) {
      this.setData({
        low: e.detail.lowValue
      })
    },

    highValueChangeAction: function (e) {
      this.setData({
        high: e.detail.highValue
      })
    },

    _close: function() {
      this.triggerEvent('myevent', {
        fuc: "close"
      })
    }
  }
})
