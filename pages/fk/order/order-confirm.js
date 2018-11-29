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
    space_info: [],
    space_id: '',
    imgUrl: '',
    yt: '',
    startDate: "请选择",
    dayNum: 0,
    endDate: "请选择",
    opendate: false,
    moneyY: 0,
    moneyAll: 0,
    moneyW: 0,
    dateArray: [],
    bg: false,
    ischeck:false
  },
  opendate: function() {
    wx.navigateTo({
      url: "/pages/fd/calendar/index3?space_id=" + this.data.space_id
    })
  },
  onShow: function() {
    let pages = getCurrentPages();
    let currPage = pages[pages.length - 1];
    if (currPage.data.info != undefined) {
      this.setData({
        startDate: currPage.data.startDate,
        dayNum: currPage.data.dayNum,
        endDate: currPage.data.endDate
      });
    }
  },
  onLoad: function(options) {    
    var that = this
    that.setData({
      space_id: options.space_id,
      imgUrl: app.data.imgurl
    })
    app.http('/space/getSpaceDetail', {
        space_id: that.data.space_id
      })
      .then(res => {
        that.setData({
          space_info: res.data
        })
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
  onFilter: function(e) {
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
      this.getList(params)
    }
  },
  //同意守则
  checkboxChange:function(e){
    if (e.detail.value == '同意') {
      this.setData({
        ischeck:true,
        bg: true
      })      
    }else {
      this.setData({
        ischeck: false,
        bg: false
      })
    }
  },  
  // 下一步
  confirmNext() {    
    let params = `date=${this.data.dateArray}&signid=${this.data.contractorId}&space_id=${this.data.space_info.id}&title=${this.data.space_info.title}&img=${this.data.space_info.banner}&depositRate=${this.data.space_info.depositRate}&totalPrice=${this.data.moneyAll}&deposit=${this.data.moneyY}&balance=${this.data.moneyW}&payEndTime=${this.data.space_info.final_payment_time}`
    if (this.data.startDate != "请选择" && this.data.endDate != "请选择" && this.data.contractorName != null && this.data.ischeck) {
      wx.navigateTo({
        url: `order-confirm-2?${params}`,
      })
    }else{
      wx.showToast({
        title: '请选择相关信息',
        icon: 'none',
        duration: 2000
      })
    }

  }
})