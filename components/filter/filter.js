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
    high: 100,
    min: 0,
    max: 10000
  },

  onload: function() {

  },
  
  /**
   * 组件的方法列表
   */
  methods: {
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
