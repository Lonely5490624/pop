var app = getApp();
Page({
  data: {
    week_list: ['日', '一', '二', '三', '四', '五', '六'],
    startDate: '',
    endDate: '',
    date_click: 0,
    spaceList: [],
    imgUrl: '',
    showXZnum: false,
    xzNum: 0,
    able: [], //可编辑日期（黑色）
    unable: [], //已经出租日期（红色）
    chooseDateArr: [],
    chooseDateArrInfo: [],
    space_id: 0,
    currentTypes: [],
    member_type: 0
  },
  // 获取每月总天数
  getAllDaysOfMonth(year, month) {
    return new Date(year, month, 0).getDate();
  },
  // 获取每月第一天是星期几
  getFirstDayOfMonth(year, month) {
    return new Date(year, month - 1, 1).getDay();
  },
  // 计算本月前空了几格
  getEmptyGrids(year, month) {
    // FirstDayOfMonth代表本月的第一天是星期几
    const FirstDayOfMonth = this.getFirstDayOfMonth(year, month);
    let emptyGrids = [];
    // 有空格的情况
    if (FirstDayOfMonth > 0) {
      for (let i = 0; i < FirstDayOfMonth; i++) {
        emptyGrids.push({
          'num': '',
          'fullDate': 'x' //x是我自己定义的一个值，代表没有日期
        });
      }
      // 将空格放入数组
      return emptyGrids;
    } else {
      // 否则返回一个新数组
      return [];
    }
  },
  // 计算本月日历
  getDaysOfThisMonth(year, month) {
    let days = [];
    const AllDaysOfMonth = this.getAllDaysOfMonth(year, month);
    let fullMonth = month.toString().length === 1 ? `0${month}` : month;
    for (let i = 0; i < AllDaysOfMonth; i++) {
      let day = i + 1,
        fullDay = day;
      fullDay = fullDay.toString().length === 1 ? `0${day}` : fullDay;
      days.push({
        day,
        fullDay,
        'fullDate': `${year}-${fullMonth}-${fullDay}`
      });
    }
    // 返回每个月的具体日期
    return days;
  },
  // 循环渲染日历
  // 从本月开始渲染，n代表包括本月开始连续渲染几个月
  fillCalendar(n) {
    let year = this.data.cur_year,
      month = this.data.cur_month,
      fullMonth,
      canlendar_data = [];
    // 计算年月以及具体日历
    for (let i = this.data.cur_month; i < this.data.cur_month + n; i++) {
      let EmptyGrids = this.getEmptyGrids(year, month);
      let DaysOfThisMonth = this.getDaysOfThisMonth(year, month);
      // 把空格和具体日历合为一个数组
      let allDays = [...EmptyGrids, ...DaysOfThisMonth];
      // 对年份和月份的计算做一些判断
      if (month > 12) {
        year++;
        month = 1;
        fullMonth = '01'
        canlendar_data.push({
          year,
          month,
          fullMonth,
          allDays
        });
        month++;
      } else {
        fullMonth = month.toString().length === 1 ? `0${month}` : month;
        canlendar_data.push({
          year,
          month,
          fullMonth,
          allDays
        });
        month++;
      }
    }
    this.setData({
      canlendar_data
    })
  },
  onLoad() {
    var myDate = new Date();
    myDate.toLocaleDateString(); //获取日期与时间
    this.setData({
      imgUrl: app.data.imgurl,
      member_type: app.globalData.member_type
    })
    const date = new Date();
    const cur_year = date.getFullYear();
    const cur_month = date.getMonth() + 1;
    const cur_day = date.getDate();
    this.setData({
      date,
      cur_year,
      cur_month,
      cur_day
    })
    let month = this.data.cur_month.toString().length === 1 ? `0${this.data.cur_month}` : this.data.cur_month;
    let day = this.data.cur_day.toString().length === 1 ? `0${this.data.cur_day}` : this.data.cur_day;
    let nowDate = `${cur_year}-${month}-${day}`;
    this.setData({
      nowDate
    })
    this.fillCalendar(12);
    this.getSpaceList();
  },
  onShow: function() {
    this.getSpaceList();
    this.setData({
      showXZnum: false,
      xzNum: 0,
      chooseDateArr: [],
      //chooseDateArrInfo: [], 
    })
  },
  //获取空间列表
  getSpaceList: function() {
    app.http('/space/getSpaceList')
      .then(res => {
        this.setData({
          spaceList: res.data
        })
      })
  },
  // 点击日期
  chooseDate(e) {
    //点击修改样式
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


    if (e.currentTarget.dataset.unable == '') {
      const year_click = e.currentTarget.dataset.year;
      const month_click = e.currentTarget.dataset.month;
      const day_click = e.currentTarget.dataset.day;
      console.log('date', year_click, month_click, day_click);
      //显示编辑框
      this.setData({
        showXZnum: true
      })
      // 如果是空格或者以前的日期就直接返回
      if (day_click === '' || `${year_click}-${month_click}-${day_click}` < this.data.nowDate) {
        return;
      }
      // 获取点击对象的id
      let id = e.currentTarget.dataset.id;
      //选择的日期添加到chooseDateArr选择日期数组中
      if (this.data.chooseDateArrInfo.indexOf(`${year_click}-${month_click}-${day_click}`) == -1) {
        this.data.chooseDateArr.push(`${month_click}月${day_click}`)
        this.data.chooseDateArrInfo.push(`${year_click}-${month_click}-${day_click}`)
      } else {
        this.data.chooseDateArrInfo.remove(`${year_click}-${month_click}-${day_click}`)
        this.data.chooseDateArr.remove(`${month_click}月${day_click}`)
      }
      console.log(this.data.chooseDateArrInfo)
      if (this.data.chooseDateArr.length == 0) {
        this.setData({
          showXZnum: false
        })
      }
      this.setData({
        xzNum: this.data.chooseDateArr.length
      })
      
    }
  },

  //点击获取空间id
  chooseSpace: function(e) {
    this.setData({
      space_id: e.currentTarget.id
    })
    for (var i = 0; i < this.data.spaceList.length; i++) {
      if (e.currentTarget.id == this.data.spaceList[i].id) {
        this.setData({
          unable: this.data.spaceList[i].calendar.unable,
          able: this.data.spaceList[i].calendar.able,
        })
      }
    }

  },
  gotoEdit: function() {
    if (this.data.space_id == 0) {
      this.setData({
        space_id: this.data.spaceList[0].id
      })
    }
    wx.navigateTo({
      url: "edit?data=" + this.data.chooseDateArr + "&chooseDateArrInfo=" + this.data.chooseDateArrInfo + "&space_id=" + this.data.space_id
    })
  },
  goToList: function() {
    wx.redirectTo({
      url: "../../fk/list/list"
    })
  },
  goToSpace: function() {
    wx.redirectTo({
      url: "../../fd/space/index"
    })
  },
  goToMine: function() {
    wx.redirectTo({
      url: "../../mine/mine"
    })
  },
  goToNews: function() {
    wx.redirectTo({
      url: "../../news/news"
    })
  },
  goToTrip: function() {
    wx.redirectTo({
      url: "../../fk/trip/trip"
    })
  },
  goToCollection: function() {
    wx.redirectTo({
      url: "../../fk/collection/collection"
    })
  },
  goToData: function() {
    wx.redirectTo({
      url: "../../fd/data/index"
    })
  },
  goToCalendar: function() {
    wx.redirectTo({
      url: "../../fd/calendar/index"
    })
  }
})