import * as echarts from '../../../ec-canvas/echarts.min';

var app = getApp();
var yData = []
var xData1 = []
var xData2 = []

function initChart(canvas, width, height) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);
  var option = {
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['已转款', '即将转款']
    },
    xAxis: [
      {
        type: 'category',
        data: yData
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: [
      {
        name: '已转款',
        type: 'bar',
        data: xData1
      },
      {
        name: '即将转款',
        type: 'bar',
        data: xData2
      }
    ]
  };

  chart.setOption(option);
  return chart;
}


Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabId: 1,
    show: false,
    spaceList: [],
    chooseId: '-1',
    title: '全部空间',
    ec: {
      onInit: initChart
    },
    transfer_order_info_list: [],
    no_transfer_order_info_list: [],
    current_income: 0,
    current_month: 1,
    transfer_order_income: 0,
    no_transfer_order_income: 0
  },
  changeTab(e) {
    let id = e.currentTarget.dataset.id;
    this.setData({
      tabId: id
    })
  },
  onLoad: function(e) {
    this.getincome_data()
  },
  getincome_data: function(space_id) {
    var data = {
      member_type: '2'
    }
    if (space_id != undefined) {
      data.space_id = space_id
    }
    this.ecComponent = this.selectComponent('#mychart-dom-line')
    app.http('/data/income_data', data)
      .then(res => {
        xData1 = res.data.transfer_arr
        xData2 = res.data.no_transfer_arr
        yData = res.data.month_arr
        this.ecComponent.init((canvas, width, height) => {
          const chart = echarts.init(canvas, null, {
            width: width,
            height: height
          });
          this.setOption(chart);
          this.chart = chart;
          return chart;
        });
        this.setData({
          spaceList: res.data.space,
          transfer_order_info_list: res.data.transfer_order_info_list,
          no_transfer_order_info_list: res.data.no_transfer_order_info_list,
          current_income: res.data.current_income,
          current_month: res.data.current_month,
          transfer_order_income: res.data.transfer_order_income,
          no_transfer_order_income: res.data.no_transfer_order_income
        })
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
  setOption(chart) {
    var option = {
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['已转款', '即将转款']
      },
      xAxis: [
        {
          type: 'category',
          data: yData
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: '已转款',
          type: 'bar',
          data: xData1
        },
        {
          name: '即将转款',
          type: 'bar',
          data: xData2
        }
      ]
    };
    chart.setOption(option)
  }
})