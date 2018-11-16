// pages/fk/order/order-confirm.js
var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    contractors: null,
    isContractorOpen: false,
    contractorId: null,
    contractorName: null,
    space_info:[],
    space_id:'54',
    imgUrl:'',
    yt:'',
    opendate:false
  },
  opendate: function () {
    this.setData({
      opendate: true
    })    
  },
  onLoad: function(options) {
    // if (options != '') {
    //   this.setData({
    //     space_id: options.id
    //   })      
    // }
     
    var that = this
    that.setData({
      imgUrl: app.data.imgurl,
    }) 
    app.http('/space/getSpaceDetail', {space_id: that.data.space_id})
      .then(res => {
        that.setData({
          space_info: res.data
        })
        console.log(res.data)
        // var ss = []
        // for (var i = 0; i < that.data.space_info.category.length;i++){          
        //   ss.push(that.data.space_info.category[i].name)      
        // }
        // that.setData({
        //   yt:ss.join('、')
        // })
      }),
      this.getSignList()
  },
  contractorOpen: function() {
    this.setData({
      isContractorOpen: true
    })
  },
  // 关闭添加签约人
  contractorClose: function() {
    this.setData({
      isContractorOpen: false
    })
  },

  // 获取签约人列表
  getSignList() {
    app.http('/space/getSignList')
      .then(res => {
        this.setData({
          contractors: res.data
        })
      })

  },
  // 选择签约人
  chooseContractor(e) {
    this.setData({
      contractorId: e.currentTarget.dataset.id,
      contractorName: e.currentTarget.dataset.name
    })
  },
  onFilter: function (e) {
    // 自定义组件触发事件时提供的detail对象
    let that = e.detail;
    // this.setData({
    //   start: util.datefuc('Y-m-d H:i:s', new Date(that.start).getTime() / 1000, true),
    //   end: util.datefuc('Y-m-d H:i:s', new Date(that.end).getTime() / 1000, true),
    //   starttime: util.datefuc('m月d日', new Date(that.start).getTime() / 1000, true),
    //   endtime: util.datefuc('m月d日', new Date(that.end).getTime() / 1000, true),
    //   compareday: util.compare(new Date(that.start).getTime(), new Date(that.end).getTime()),
    // });
    if (that.fuc == "close") {
      this.setData({
        opendate: 0,
      })
    } else if (that.fuc == 'submit') {
      this.setData({
        openFilter: 0,
      })
      let params = {
        start_price: that.data.low,
        end_price: that.data.high,
        space_type: that.data.currentTypes.join(','),
        category_ids: that.data.currentCates.join(','),
        convenience_facilities_ids: that.data.currentFacs.join(',')
      }
      console.log(params)
      this.getList(params)
    }
  }
})