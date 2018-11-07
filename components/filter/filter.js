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
<<<<<<< HEAD

=======
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
>>>>>>> 3e71efcf071090fe1435ed7a1a387337e01fbae2
  },

  /**
   * 组件的方法列表
   */
  methods: {
<<<<<<< HEAD
=======
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

>>>>>>> 3e71efcf071090fe1435ed7a1a387337e01fbae2
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
