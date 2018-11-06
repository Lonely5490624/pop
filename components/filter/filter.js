// components/filter/filter.js
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
    categoryList: []
  },

  ready: function () {
    let that = this;
    wx.request({
      url: 'http://pop.aieye8.com/index.php/Home/home/categoryList',
      method: 'POST',
      success: function (res) {
        that.setData({
          categoryList: res.data.data
        })
      }
    })
  },
  /**
   * 组件的方法列表
   */
  methods: {
    getCategory () {
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
