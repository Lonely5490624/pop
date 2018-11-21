//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    userData: [],
    newsList: [],
    info_id: "",
    order_id: "",
    space_id: "",
    newsContent: '',
    newsDetail: [],
    fkBtn: false,
    fdBtn: false,
    message_id: 0,
    //sendMcont: '',
    dfnewsList: [],
    dfnewsListarr: [],
    wfnewsList: [],
    wfnewsListarr: [],
    lastId: 0,
    member_head: '',
    value: ''
  },
  onLoad: function(options) {
    var that = this
    that.setData({
      userData: wx.getStorageSync('userData'),
      space_id: options.space_id,
    })
    that.getChatDetail();
  },
  //获取聊天详情
  getChatDetail: function() {
    var that = this
    var data = {
      member_type: that.data.userData.member_type,
      space_id: that.data.space_id
    }
    if (that.data.order_id != '') {
      data.order_id = that.data.order_id
    }
    if (that.data.info_id != '') {
      data.info_id = that.data.info_id
    }
    app.http('/message/detail', data)
      .then(res => {
        that.setData({
          newsDetail: res.data.info
        })
        for (var i = 0; i < res.data.result.length; i++) {
          if (that.data.userData.member_id == res.data.result[i].send_member_id) {
            that.data.wfnewsList.push(res.data.result[i])
          } else {
            that.data.dfnewsList.push(res.data.result[i])
          }
        }
        if (res.data.result != '') {
          var len = res.data.result.length
          that.setData({
            member_head: res.data.result[0].member_head,
            lastId: res.data.result[len - 1].id
          })
        }
        //轮询执行
        setInterval(() => {
          that.get_message(that.data.lastId);
          this.setData({
            wfnewsListarr: this.data.wfnewsList,
            dfnewsListarr: this.data.dfnewsList
          })
          //this.pageScrollToBottom() 
          //this.scr()
        }, 1000)

        if (res.data.info.order_status == '') {
          that.setData({
            'newsDetail.order_status': '咨询中'
          })
        }
        //显示订单相关的信息
        if (res.data.order != '') {
          var order = res.data.order
          if (that.data.userData.member_type == 2) {
            //房东端
            if (rorder.status == 1 && rorder.refund_status == 0) {
              //显示是否接受按钮
              that.setData({
                fdBtn: true
              })
            }
          } else {
            //房客端
            if (rorder.status == 4 && rorder.refund_status == 0) {
              //显示评价按钮
              that.setData({
                fkBtn: true
              })
            }
          }
        }

      })
  },
  getNewContent: function(e) {
    this.setData({
      newsContent: e.detail.value
    })
  },
  //获取最新消息
  get_message: function(last_id) {
    var that = this
    var data = {
      member_type: that.data.userData.member_type,
      space_id: that.data.space_id,
      last_id: last_id
    }
    if (that.data.order_id != '') {
      data.order_id = that.data.order_id
    }
    app.http('/message/get_message', data)
      .then(res => {
        for (var i = 0; i < res.data.result.length; i++) {
          if (res.data.result[i].send_member_id == that.data.userData.member_id) {
            that.data.wfnewsList.push(res.data.result[i])
          } else {
            that.data.dfnewsList.push(res.data.result[i])
          }
          //显示订单相关的信息
          if (res.data.order != '') {
            var order = res.data.order
            if (that.data.userData.member_type == 2) {
              //房东端
              if (rorder.status == 1 && rorder.refund_status == 0) {
                //显示是否接受按钮
                that.setData({
                  fdBtn: true
                })
              }
            } else {
              //房客端
              if (rorder.status == 4 && rorder.refund_status == 0) {
                //显示评价按钮
                that.setData({
                  fkBtn: true
                })
              }
            }
          }
        }

      })
  },
  //发消息
  send: function() {
    var that = this
    this.setData({
      value: ""
    })
    var data = {
      member_type: that.data.userData.member_type,
      info_id: that.data.lastId,
      order_id: that.data.order_id,
      space_id: that.data.space_id,
      content: that.data.newsContent
    }
    app.http('/message/send_message', data)
      .then(res => {
        this.setData({
          lastId: res.data.message_id
        })
        var data = res.data
        data = {
          content: that.data.newsContent
        }
        that.data.wfnewsList.push(data)
        //this.pageScrollToBottom()        
      })

  },
  //拒绝订单
  refuse: function(e) {
    wx.showModal({
      title: '确认拒绝吗',
      content: '订单一旦拒绝，将不可恢复，您确定要拒绝xxx的订单吗？',
      success: function(res) {
        if (res.confirm) {
          //拒绝
          var data = {
            space_id: 0,
            order_id: 0,
            type: 2 //1接收 2拒绝
          }
          app.http('/order/update_order', data)
            .then(res => {
              // this.setData({
              //   newsList: res.data
              // })
            })
        } else {
          console.log('取消')
        }

      }
    })
  },
  //接受订单
  accept: function(e) {
    wx.showModal({
      title: '',
      content: '您确定接受xxx的订单吗？',
      success: function(res) {
        if (res.confirm) {
          //接受
          var data = {
            space_id: 0,
            order_id: 0,
            type: 1 // 1接收 2拒绝
          }
          app.http('/order/update_order', data)
            .then(res => {
              // this.setData({
              //   newsList: res.data
              // })
            })
        } else {
          console.log('取消')
        }

      }
    })
  },
  scr:function(){
    wx.pageScrollTo({
      scrollTop: 600,
      duration: 300
    })
  }
  // pageScrollToBottom: function () {
  //   wx.createSelectorQuery().select('#chatBox').boundingClientRect(function (rect) {
  //     // 使页面滚动到底部
  //     wx.pageScrollTo({
  //       scrollTop: rect.bottom
  //     })
  //   }).exec()
  // },
  

})