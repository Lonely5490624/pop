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
    detailBtn:false,
    message_id: 0,
    lastId: 0,
    member_head: '',
    value: ''
  },
  onLoad: function(options) {
    var that = this
    if (options.info != undefined){
      that.setData({
        space_id: JSON.parse(options.info).space_id,
        info_id: JSON.parse(options.info).info_id,
        order_id: JSON.parse(options.info).order_id
      })
    }
    if (options.space_id != undefined) {
      that.setData({
        space_id: options.space_id,
      })
    }
    if (options.info_id != undefined){
      that.setData({
        space_id: options.space_id,
        info_id: options.info_id,
        order_id: options.order_id
      })
    }

    that.setData({
      member_type: app.globalData.member_type,
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
          that.setData({
            detailBtn: true
          })
          var order = res.data.order
          if (that.data.member_type == 2) {
            //房东端
            if (order.status == 1 && order.refund_status == 0) {
              //显示是否接受按钮
              that.setData({
                fdBtn: true
              })
            }
          } else {
            //房客端
            if (order.status == 4 && order.refund_status == 0) {
              //显示评价按钮
              that.setData({
                fkBtn: true
              })
            }
          }
        }else{          
          that.setData({
            detailBtn: false
          })
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
              that.setData({
                detailBtn: true
              })
              var order = res.data.order
              if (that.data.member_type == 2) {
                //房东端
                if (order.status == 1 && order.refund_status == 0) {
                  //显示是否接受按钮
                  that.setData({
                    fdBtn: true
                  })
                }
              } else {
                //房客端
                if (order.status == 4 && order.refund_status == 0) {
                  //显示评价按钮
                  that.setData({
                    fkBtn: true
                  })
                }
              }
            }else{
              that.setData({
                detailBtn: false
              })
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
  gotoDetail:function(){
    if (this.data.member_type==1){
      wx.navigateTo({
        url: "/pages/fk/trip/tripInfo?id=" + this.data.order_id
      })
    }else{
      wx.navigateTo({
        url: "/pages/fk/trip/tripInfofd?id=" + this.data.order_id
      })
    }
    
  },
  //拒绝订单
  refuse: function(e) {
    wx.showModal({
      title: '确认拒绝吗',
      content: '订单一旦拒绝，将不可恢复，您确定要拒绝该的订单吗？',
      success: function(res) {
        if (res.confirm) {
          //拒绝
          var data = {
            space_id: that.data.space_id,
            order_id: that.data.order_id,
            type: 2 //1接收 2拒绝
          }
          app.http('/order/update_order', data)
            .then(res => {
              wx.showToast({
                title: '操作成功',
                icon: 'none',
                duration: 2000
              })
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
      content: '您确定接受该订单吗？',
      success: function(res) {
        if (res.confirm) {
          //接受
          var data = {
            space_id: that.data.space_id,
            order_id: that.data.order_id,
            type: 1 // 1接收 2拒绝
          }
          app.http('/order/update_order', data)
            .then(res => {
              wx.showToast({
                title: '操作成功',
                icon: 'none',
                duration: 2000
              })
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