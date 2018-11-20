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
    sendMcont: '',
    dfnewsList: [],
    wfnewsList: [],
    lastId: 0,
    member_head: ''
  },
  onLoad: function(options) {
    var that = this
    that.setData({
      userData: wx.getStorageSync('userData'),
      space_id: options.space_id,
    })
    that.getChatDetail();
    that.get_message(that.data.lastId)
    setInterval(() => {
      that.get_message(that.data.lastId);
    }, 1000)
    console.log(0)
    console.log(that.data.wfnewsList)
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
        this.setData({
          newsDetail: res.data.info
        })
        for (var i = 0; i < res.data.result.length;i++){
          //console.log(res.data.result[i].send_member_id)
          //console.log(res.data.result[i].send_member_id == that.data.userData.member_id)
          if (res.data.result[i].send_member_id == that.data.userData.member_id){            
            that.data.wfnewsList.push(res.data.result[i])
            //console.log(that.data.wfnewsList)
          }else{
            that.data.dfnewsList.push(res.data.result[i])
          }
        }
        if (res.data.result!=''){
          var len = res.data.result.length
          this.setData({
            member_head: res.data.result[0].member_head,
            lastId: res.data.result[len-1].id
          })          
        }
        if (res.data.info.order_status == '') {
          this.setData({
            'newsDetail.order_status': '咨询中'
          })
        }
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
        // this.setData({
        //   dfnewsList: res.data.result
        // }) 
        for (var i = 0; i < res.data.result.length; i++) {
          if (res.data.result[i].send_member_id == that.data.userData.member_id) {
            that.data.wfnewsList.push(res.data.result[i])
          } else {
            that.data.dfnewsList.push(res.data.result[i])
          }
          console.log(that.data.wfnewsList[i].content)  
        } 
        
      })
  },
  //发消息
  send: function() {
    var that = this
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
        that.get_message(that.data.lastId);
        console.log(that.data.lastId)
        //this.data.wfnewsList.push({content:that.data.newsContent});
        //console.log(that.data.newsContent)
        //console.log(this.data.wfnewsList)
        //that.get_message(res.data.message_id, res.data.message_id)
        that.getChatDetail();
      })
  },
  refuse: function(e) {
    wx.showModal({
      title: '确认拒绝吗',
      content: '订单一旦拒绝，将不可恢复，您确定要拒绝xxx的订单吗？',
      success: function(res) {
        if (res.confirm) {
          console.log('确定')
        } else {
          console.log('取消')
        }

      }
    })
  },
  accept: function(e) {
    wx.showModal({
      title: '',
      content: '您确定接受xxx的订单吗？',
      success: function(res) {
        if (res.confirm) {
          console.log('确定')
        } else {
          console.log('取消')
        }

      }
    })
  }

})