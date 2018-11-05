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
    high: 100
  },

  onload: function() {

  },

  lowValueChangeAction: function (e) {
    console.log(e)
    this.setData({
      low: e.detail.lowValue
    })
  },

  highValueChangeAction: function (e) {
    console.log(e)
    this.setData({
      high: e.detail.highValue
    })
  },
  /**
   * 组件的方法列表
   */
  methods: {
    _close: function() {
      this.triggerEvent('myevent', {
        fuc: "close"
      })
    }
  }
})
