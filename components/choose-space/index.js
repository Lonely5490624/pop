// components/choose-space/index.js
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
    show: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    toggleList() {
      this.setData({
        show: !this.data.show
      })
    },
    _submit: function () {
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
    // getSpaceList(){
    //   var data = {}
    //   app.http('/message/index', data)
    //     .then(res => {
    //       this.setData({
    //         newsList: res.data
    //       })
    //     })
    // }
  }
})
