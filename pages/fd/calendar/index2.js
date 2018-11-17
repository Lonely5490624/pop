Page({
  data: {
    week_list: ['日', '一', '二', '三', '四', '五', '六'],
    startDate: '',
    endDate: '',
    date_click: 0,
    dayNum: 0,
    dateArry: []
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
  },
  //日期相减
  dateMinus(startDate, endDate) {　　
    var endDate = new Date(endDate.replace(/-/g, "/"));
    var startDate = new Date(startDate.replace(/-/g, "/"));　　
    // var now = new Date();　　
    var days = endDate.getTime() - startDate.getTime();　　
    var day = parseInt(days / (1000 * 60 * 60 * 24));　　
    return day;
  },
  // 点击日期
  chooseDate(e) {
    const year_click = e.currentTarget.dataset.year;
    const month_click = e.currentTarget.dataset.month;
    const day_click = e.currentTarget.dataset.day;
    console.log('date', year_click, month_click, day_click);


    // 如果是空格或者以前的日期就直接返回
    if (day_click === '' || `${year_click}-${month_click}-${day_click}` < this.data.nowDate) {
      return;
    }

    // 获取点击对象的id
    let id = e.currentTarget.dataset.id;

    // data_click为0代表选择的是入住日期，否则就是离店日期
    if (this.data.date_click == 0) {
      // 选择入住日期
      this.setData({
        startDate: `${year_click}-${month_click}-${day_click}`,
        date_click: 1
      })
    } else {
      let newDay = new Date(Date.parse(id));
      let oldDay = new Date(Date.parse(this.data.startDate));

      // 判断第二次点击的日期在第一次点击的日期前面还是后面
      if (newDay > oldDay) {
        this.setData({
          endDate: `${year_click}-${month_click}-${day_click}`,
          date_click: 2,
          dayNum: this.dateMinus(this.data.startDate, `${year_click}-${month_click}-${day_click}`)
        })

      } else {
        this.setData({
          startDate: `${year_click}-${month_click}-${day_click}`,
          endDate: '',
          date_click: 1,
          dayNum: this.dateMinus(this.data.startDate, `${year_click}-${month_click}-${day_click}`)
        })
      }
    }      
  },
   addDate(date, days) {    
    if (days == undefined || days == '') {
       days = 1;      
    }    
    var date = new Date(date);
     date.setDate(date.getDate() + days);    
    var month = date.getMonth() + 1;    
    var day = date.getDate();    
    var mm = "'" + month + "'";    
    var dd = "'" + day + "'";    
     //单位数前面加0    
    if (mm.length == 3) {
       month = "0" + month;      
    }    
    if (dd.length == 3) {
       day = "0" + day;      
    }
    var time = date.getFullYear() + "-" + month + "-" + day    
    return time;    
  },
  sure() {
    for (var i = 0; i < this.data.dayNum.length;i++){
      var addTime = this.addDate("2017-07-24", i);
      dateArry.push(addTime);
    }    
    console.log(addTime);
    // let pages = getCurrentPages(); //当前页面
    // let prevPage = pages[pages.length - 2]; //上一页面 
    // prevPage.setData({
    //   startDate:this.data.startDate,
    //   dayNum:this.data.dayNum,
    //   endDate:this.data.endDate
    // })
    // wx.navigateBack({ //返回
    //   delta: 1
    // })
  }
})