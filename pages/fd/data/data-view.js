import * as echarts from '../../../ec-canvas/echarts';
const app = getApp();
var xData = []
var yData = []
function initChart(canvas, width, height) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);
  var option = {
    title: {
      text: '',
      left: 'center'
    },
    color: ["#37A2DA", "#67E0E3", "#9FE6B8"],
    // legend: {
    //   data: ['A', 'B', 'C'],
    //   top: 50,
    //   left: 'center',
    //   backgroundColor: 'red',
    //   z: 100
    // },
    grid: {
      containLabel: true
    },
    tooltip: {
      show: true,
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: yData,
      //data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
      // show: false
    },
    yAxis: {
      x: 'center',
      type: 'value',
      splitLine: {
        lineStyle: {
          type: 'dashed'
        }
      }
      // show: false
    },
    series: [{
      name: 'A',
      type: 'line',
      smooth: false,
      //data: [18, 36, 65, 30, 78, 40, -1]//y轴
      data: xData
    }]
  };

  chart.setOption(option);
  return chart;
}

Page({
  onShareAppMessage: function(res) {
    return {
      title: 'ECharts 可以在微信小程序中使用啦！',
      path: '/pages/index/index',
      success: function() {},
      fail: function() {}
    }
  },
  data: {
    viewInfo: [],
    ec: {
      onInit: initChart
    }
  },

  onLoad: function(options) {
    var data = {
      member_type: '2',
      space_id: ''
    }
    this.ecComponent = this.selectComponent('#mychart-dom-line')
    app.http('/data/browse_data', data)
      .then(res => {
        //xData = [18, 36, 65, 30, 78, 40, -1]
        //yData = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        xData = res.data.num_arr,
        yData = res.data.month_arr,
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
          viewInfo: res.data
        })
        console.log(this.data.viewInfo)
        //getApp().globalData.xData = [18, 36, 65, 30, 78, 40, -1];
        //getApp().globalData.yData = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        //console.log(app.globalData.xData)
        //console.log(xData)
        //console.log(yData)
        //initChart(canvas, '500prx', '500rpx')
        
      })
    // console.log(xData)
    //console.log(app.globalData.xData)
    // this.setData({
    //   ec: {
    //     onInit: initChart
    //   }
    // })
  },
  setOption (chart) {
    const option = {
      title: {
        text: '',
        left: 'center'
      },
      color: ["#37A2DA", "#67E0E3", "#9FE6B8"],
      // legend: {
      //   data: ['A', 'B', 'C'],
      //   top: 50,
      //   left: 'center',
      //   backgroundColor: 'red',
      //   z: 100
      // },
      grid: {
        containLabel: true
      },
      tooltip: {
        show: true,
        trigger: 'axis'
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: yData,
        //data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
        // show: false
      },
      yAxis: {
        x: 'center',
        type: 'value',
        splitLine: {
          lineStyle: {
            type: 'dashed'
          }
        }
        // show: false
      },
      series: [{
        name: 'A',
        type: 'line',
        smooth: false,
        //data: [18, 36, 65, 30, 78, 40, -1]//y轴
        data: xData
      }]
    }
    chart.setOption(option)
  }
})