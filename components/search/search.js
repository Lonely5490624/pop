// component/search/search.js
var app = getApp()
// 引入SDK核心类
var QQMapWX = require('../../lib/script/qqmap-wx-jssdk.min.js');
var qqmapsdk;
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
    index: 0
  },
  ready: function() {
    var that = this;
    that.getCityList();
    // 实例化API核心类
    qqmapsdk = new QQMapWX({
      key: 'VY3BZ-HYDL6-RGYSX-MXXQU-4VDPO-ZZFQR'
    });
    //1、获取当前位置坐标
    wx.getLocation({
      type: 'wgs84',
      success: function(res) {
        //2、根据坐标获取当前位置名称，显示在顶部:腾讯地图逆地址解析
        qqmapsdk.reverseGeocoder({
          location: {
            latitude: res.latitude,
            longitude: res.longitude
          },
          success: function(addressRes) {
            var address = addressRes.result.formatted_addresses.recommend;
            var index = address.indexOf("市")
            var shi = address.substring(0, index)
            for (var i = 0; i < that.data.cityList.length; i++) {
              if (that.data.cityList[i].name === shi) {
                that.setData({
                  index: i
                })
              }
            }


          }
        })
      }
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {

    // 获取品类
    getCityList() {
      app.http('/area/cityList', {}, true)
        .then(res => {
          this.setData({
            cityList: res.data
          })
          console.log(res.data);
        })
    },
    toSearch: function() {
      wx.navigateTo({
        url: '/pages/fk/search/search'
      })
    },
    bindPickerChange: function(e) {
      console.log('picker发送选择改变，携带值为', e.detail.value)
      this.setData({
        index: e.detail.value
      })      
    },
  }
})