//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    newsList: [],
    member_type: '',
    member_id: '',
    info_id: "",
    order_id: "",
    space_id: "",
    newsContent: '',
    newsDetail: [],
    fkBtn: false,
    fdBtn: false,
    message_id: 0,
    lastId: 0,
    member_head: '',
    value: ''
  },
  onLoad: function(options) {
    var that = this
    that.setData({
      member_type: app.globalData.member_type,
      space_id: options.space_id,
      info_id: options.info_id,
      member_id: wx.getStorageSync('member_id')
    })
    that.getChatDetail();
  },
  onUnload: function() {
    this.endSetInter()
  },
  onHide: function() {
    this.endSetInter()
  },
  onShow: function() {
    // 生命周期函数--监听页面显示
    this.startSetInter()
  },
  startSetInter: function() {
    var that = this;
    that.data.setInter = setInterval(() => {
      that.get_message(that.data.lastId);
    }, 1000)
  },
  endSetInter: function() {
    var that = this;
    //清除计时器  即清除setInter
    clearInterval(that.data.setInter)
  },
  //获取聊天详情
  getChatDetail: function() {
    var that = this
    var data = {
      member_type: that.data.member_type,
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
        for (var i = 0; i < res.data.result.length; i++) {
          if (that.data.member_id == res.data.result[i].send_member_id) {
            res.data.result[i].flag = true
          } else {
            res.data.result[i].flag = false
          }
        }
        that.setData({
          newsDetail: res.data.info,
          newsList: res.data.result
        })
        if (res.data.result != '') {
          var len = res.data.result.length
          that.setData({
            member_head: res.data.result[0].member_head,
            lastId: res.data.result[len - 1].id
          })
        }
        if (res.data.info.order_status == '') {
          that.setData({
            'newsDetail.order_status': '咨询中'
          })
        }
        //显示订单相关的信息
        if (res.data.order != '') {
          var order = res.data.order
          if (that.data.member_type == 2) {
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
      member_type: that.data.member_type,
      space_id: that.data.space_id,
      last_id: last_id,
      info_id: that.data.info_id,
    }
    if (that.data.order_id != '') {
      data.order_id = that.data.order_id
    }
    app.http('/message/get_message', data)
      .then(res => {
        let newsList = that.data.newsList
        if (res.data.result.length > 0) {
          that.setData({
            lastId: res.data.result[0].id
          })
          for (var i = 0; i < res.data.result.length; i++) {
            if (that.data.member_id == res.data.result[i].send_member_id) {
              res.data.result[i].flag = true
            } else {
              res.data.result[i].flag = false
            }
            //显示订单相关的信息
            if (res.data.order != '') {
              var order = res.data.order
              if (that.data.member_type == 2) {
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
          newsList.push(res.data.result[0])
        }
        that.setData({
          newsList
        })
        // console.log(that.data.newsList);
        // console.log(that.data.newsList.length);
      })
  },
  //发消息
  send: function() {
    var that = this
    this.setData({
      value: ""
    })
    var data = {
      member_type: that.data.member_type,
      info_id: that.data.info_id,
      order_id: that.data.order_id,
      space_id: that.data.space_id,
      content: that.data.newsContent
    }
    app.http('/message/send_message', data)
      .then(res => {
        this.setData({
          lastId: res.data.message_id
        })
        data = {
          message_id: res.data.message_id
        }
        that.data.newsList.push(data)
        that.getChatDetail();   
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
  scr: function() {
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