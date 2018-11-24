// pages/fd/data/data-income.js
var app=getApp();
Array.prototype.max = function() {
  var max = this[0]
  this.forEach(item => {
    if (item > max) {
      max = item
    }
  })
  return max
}

const currentMonth = new Date().getMonth() + 1

Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentMonth,
    tabId: 1,
    currentId: null,
    scrollLeft: 0,
    maxHeight: null,
    show: false,
    spaceList: [],
    chooseId: '-1',
    title: '全部空间',
    dataIncome:[],
    transfer_order_info_list:{},//已转款
    no_transfer_order_info_list: {},//未转款
    income: []
  },
  changeTab(e) {
    let id = e.currentTarget.dataset.id;
    this.setData({
      tabId: id
    })
  },
  onLoad: function(e) {
    let arr = []
    this.data.income.forEach(item => {
      arr.push(parseInt(item.yi) + parseInt(item.ji))
    })
    this.setData({
      maxHeight: arr.max()
    })
    this.getincome_data()
  },
  getincome_data: function(space_id) {
    var data = {
      member_type: '2'
    }
    if (space_id != undefined) {
      data.space_id = space_id
    }
    app.http('/data/income_data', data)
      .then(res => {
        this.setData({
          dataIncome: res.data,
          spaceList:res.data.space,
          transfer_order_info_list: res.data.transfer_order_info_list,
          no_transfer_order_info_list:res.data.no_transfer_order_info_list
        })
        var arr=[]
        for(var i=0;i<12;i++){
          arr.push({
            id:i,
            date: res.data.month_arr[i],
            yi: res.data.transfer_arr[i],
            ji: res.data.no_transfer_arr[i],
          })
        }
        this.setData({
          income: arr
        })
      })
  },
  // 图表选中
  chooseItem(e) {
    console.log(e)
    this.setData({
      currentId: e.currentTarget.dataset.id
    })
  },
  //选择空间
  chooseSpace: function(e) {
    this.setData({
      chooseId: e.target.id,
      show: false,
      title: e.currentTarget.dataset.name
    })
    if (e.target.id == -1) {
      this.getincome_data()
    } else {
      this.getincome_data(this.data.chooseId)
    }
  },
  //切换空间选择下拉框
  toggleList() {
    this.setData({
      show: !this.data.show
    })
  },
  // 左侧点击
  prevTap(e) {
    if (this.data.scrollLeft > 0) {
      this.setData({
        scrollLeft: this.data.scrollLeft - 98
      })
    }
  },
  // 右侧点击
  nextTap(e) {
    this.setData({
      scrollLeft: this.data.scrollLeft + 98
    })
  },
})