// pages/fd/space/add-4.js
const app = getApp()
Array.prototype.remove = function (val) {
  var index = this.indexOf(val);
  if (index > -1) {
    this.splice(index, 1);
  }
};

const unsubscribeArray = [{
  id: 1,
  name: '灵活'
}, {
  id: 2,
  name: '轻松'
}]
const subscribeTimeArray = [{
  id: 1,
  name: '30天'
}, {
  id: 2,
  name: '60天'
}, {
  id: 3,
  name: '90天'
}, {
  id: 4,
  name: '6个月'
}, {
  id: 5,
  name: '一年'
}]

Page({

  /**
   * 页面的初始数据
   */
  data: {
    spaceId: null,
    demand: [],
    demandList: [],
    unsubscribes: ['灵活', '轻松'],
    unsubscribeArray,
    unsubscribeIndex: 0,
    rules: '',
    min_subscribe_time: '',
    min_hire_time: '',
    max_hire_time: '',
    subscribeTimes: ['30天', '60天', '90天', '6个月', '一年'],
    subscribeTimeArray,
    subscribeTimeIndex: 0,
    arrival_start_time: '',
    arrival_end_time: '00:00',
    leave_time: '00:00',
    construct_start_time: '00:00',
    construct_end_time: '00:00'
  },
  changeUnsubscribe: function (e) {
    this.setData({
      unsubscribeIndex: e.detail.value
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // options.spaceId = 189
    this.setData({
      spaceId: options.spaceId
    })
    // 获取要求
    app.http('/info/demand')
      .then(res => {
        this.setData({
          demandList: res.data
        })
      })
    app.http('/space/unpublished', { space_id: options.spaceId })
      .then(res => {
        let unsubscribeIndex
        this.data.unsubscribeArray.forEach((item, index) => {
          if (item.id == res.data.unsubscribe_policy) unsubscribeIndex = index
        })
        let subscribeTimeIndex
        this.data.subscribeTimeArray.forEach((item, index) => {
          if (item.id == res.data.max_subscribe_time) subscribeTimeIndex = index
        })
        this.setData({
          unsubscribeIndex,
          rules: res.data.rules,
          demand: res.data.demand,
          everyday_price: res.data.everyday_price == -1 ? '' : res.data.everyday_price,
          week_price: res.data.week_price == -1 ? '' : res.data.week_price,
          clear_price: res.data.clear_price == -1 ? '' : res.data.clear_price,
          min_subscribe_time: res.data.min_subscribe_time == -1 ? '' : res.data.min_subscribe_time,
          subscribeTimeIndex,
          min_hire_time: res.data.min_hire_time == -1 ? '' : res.data.min_hire_time,
          max_hire_time: res.data.max_hire_time == -1 ? '' : res.data.max_hire_time,
          arrival_start_time: res.data.arrival_start_time,
          arrival_end_time: res.data.arrival_end_time,
          leave_time: res.data.leave_time,
          construct_start_time: res.data.construct_start_time,
          construct_end_time: res.data.construct_end_time
        })
      })
  },
  // 选择要求
  chooseDem(e) {
    let arr = this.data.demand
    let id = e.currentTarget.dataset.id
    if (arr.indexOf(id) > -1) {
      arr.remove(id)
    } else {
      arr.push(id)
    }
    this.setData({
      demand: arr
    })
  },
  // 输入空间守则
  inputRules (e) {
    this.setData({
      rules: e.detail.value
    })
  },
  // 输入每日价格
  inputEverydayPrice(e) {
    this.setData({
      everyday_price: e.detail.value
    })
  },
  // 输入周末价格
  inputWeekPrice(e) {
    this.setData({
      week_price: e.detail.value
    })
  },
  // 输入xx价格
  inputClearPrice(e) {
    this.setData({
      clear_price: e.detail.value
    })
  },
  // 输入提前预定天数
  inputSubscribe(e) {
    this.setData({
      min_subscribe_time: e.detail.value
    })
  },
  // 选择可预订时段
  changeSubscribeTime(e) {
    this.setData({
      subscribeTimeIndex: e.detail.value
    })
  },
  // 最少预定天数
  inputMinHireTime(e) {
    this.setData({
      min_hire_time: e.detail.value
    })
  },
  // 最多预定天数
  inputMaxHireTime(e) {
    this.setData({
      max_hire_time: e.detail.value
    })
  },
  // 选择入驻开始时间
  bindArrivalStartTime(e) {
    this.setData({
      arrival_start_time: e.detail.value
    })
  },
  // 选择入驻结束时间
  bindArrivalEndTime(e) {
    this.setData({
      arrival_end_time: e.detail.value
    })
  },
  // 选择离开时间
  bindLeaveTime(e) {
    this.setData({
      leave_time: e.detail.value
    })
  },
  // 选择施工开始时间
  bindConstructStartTime(e) {
    this.setData({
      construct_start_time: e.detail.value
    })
  },
  // 选择施工结束时间
  bindConstructEndTime(e) {
    this.setData({
      construct_end_time: e.detail.value
    })
  },
  // 发布完成
  pubDone() {
    let unsubscribeIndex = this.data.unsubscribeIndex
    let subscribeTimeIndex = this.data.subscribeTimeIndex
    let params = {
      space_id: this.data.spaceId,
      unsubscribe_policy: this.data.unsubscribeArray[unsubscribeIndex].id,
      rules: this.data.rules,
      demand: this.data.demand,
      everyday_price: this.data.everyday_price,
      week_price: this.data.week_price,
      clear_price: this.data.clear_price,
      min_subscribe_time: this.data.min_subscribe_time,
      max_subscribe_time: this.data.subscribeTimeArray[subscribeTimeIndex].id,
      min_hire_time: this.data.min_hire_time,
      max_hire_time: this.data.max_hire_time,
      arrival_start_time: this.data.arrival_start_time,
      arrival_end_time: this.data.arrival_end_time,
      leave_time: this.data.leave_time,
      construct_start_time: this.data.construct_start_time,
      construct_end_time: this.data.construct_end_time
    }
    if (params.demand.length < 1) {
      wx.showToast({
        title: '请选择对租客的要求',
        icon: 'none'
      })
      return
    }
    if (!params.rules) {
      wx.showToast({
        title: '请填写空间守则',
        icon: 'none'
      })
      return
    }
    if (!params.everyday_price && params.everyday_price != -1) {
      wx.showToast({
        title: '请填写每日价格',
        icon: 'none'
      })
      return
    }
    if (!params.min_subscribe_time && params.min_subscribe_time != -1) {
      wx.showToast({
        title: '请填写提前预定天数',
        icon: 'none'
      })
      return
    }
    if (!params.min_hire_time && params.min_hire_time != -1) {
      wx.showToast({
        title: '请填写最少预定天数',
        icon: 'none'
      })
      return
    }
    if (!params.max_hire_time) {
      wx.showToast({
        title: '请选择最多预定天数',
        icon: 'none'
      })
      return
    }
    if (!params.arrival_start_time) {
      wx.showToast({
        title: '请选择营业时间',
        icon: 'none'
      })
      return
    }
    if (!params.arrival_end_time) {
      wx.showToast({
        title: '请选择歇业时间',
        icon: 'none'
      })
      return
    }
    if (!params.construct_start_time) {
      wx.showToast({
        title: '请选择施工开始时间',
        icon: 'none'
      })
      return
    }
    if (!params.construct_end_time) {
      wx.showToast({
        title: '请选择施工结束时间',
        icon: 'none'
      })
      return
    }
    app.http('/space/published_four', params)
      .then(res => {
        wx.setStorageSync('member_type', 2)
        getApp().globalData.member_type = wx.getStorageSync('member_type');  
        wx.navigateTo({
          url: `add-5`,
        })
      })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})