// component/search/search.js
var app = getApp()
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
    cityList: [],
    index:0
  },
  ready: function () {
    this.getCityList();
  },
  /**
   * 组件的方法列表
   */
  methods: {
    // 获取品类
    getCityList() {
      app.http('/area/cityList')
        .then(res => {
          this.setData({
            cityList: res.data
          })
          console.log(res.data);
        })
    }, 
    toSearch:function(){
      wx.navigateTo({
        url: '/pages/fk/search/search'
      })
    },
    bindPickerChange: function (e) {
      console.log('picker发送选择改变，携带值为', e.detail.value)
      this.setData({
        index: e.detail.value
      })
    },
  }
})
