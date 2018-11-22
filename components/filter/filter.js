// components/filter/filter.js
Array.prototype.remove = function (val) {
  var index = this.indexOf(val);
  if (index > -1) {
    this.splice(index, 1);
  }
};

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
    spaceTypeList,
    currentTypes: [],
    currentCates: [],
    currentFacs: [],
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
      app.http('/home/categoryList', {}, true)
        .then(res => {
          this.setData({
            categoryList: res.data
          })
        })
    },
    // 获取便利设施
    getconvenience() {
      app.http('/home/convenienceList', {}, true)
        .then(res => {
          this.setData({
            getconvenienceList: res.data
          })
        })
    },
    // 选择类型
    chooseType (e) {
      let arr = this.data.currentTypes
      let id = e.currentTarget.dataset.id
      if (arr.indexOf(id) > -1) {
        arr.remove(id)
      } else {
        arr.push(id)
      }
      this.setData({
        currentTypes: arr
      })
    },
    // 选择品类
    chooseCate(e) {
      let arr = this.data.currentCates
      let id = e.currentTarget.dataset.id
      if (arr.indexOf(id) > -1) {
        arr.remove(id)
      } else {
        arr.push(id)
      }
      this.setData({
        currentCates: arr
      })
    },
    // 选择设施
    chooseFac(e) {
      let arr = this.data.currentFacs
      let id = e.currentTarget.dataset.id
      if (arr.indexOf(id) > -1) {
        arr.remove(id)
      } else {
        arr.push(id)
      }
      this.setData({
        currentFacs: arr
      })
    },
    // 重置选项
    reset () {
      this.setData({
        low: this.data.min,
        high: this.data.max,
        currentTypes: [],
        currentCates: [],
        currentFacs: []
      })
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
    },
    _submit: function() {
      this.triggerEvent('myevent', {
        fuc: "submit",
        data: {
          currentTypes: this.data.currentTypes,
          currentCates: this.data.currentCates,
          currentFacs: this.data.currentFacs,
          low: this.data.low,
          high: this.data.high
        }
      })
    }
  }
})
