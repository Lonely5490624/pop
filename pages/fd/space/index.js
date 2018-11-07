// pages/fd/space/index.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeId: 1,
    pubList: [],
    unpubList: []
  },
  choose: function(e) {
    let id = e.target.dataset.id
    this.setData({
      activeId: id
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      imgUrl: app.data.imgurl,
      userData: wx.getStorageSync('userData')
    })
    this.getPub()
    this.getUnpub()
  },
  // 获取已发布空间
  getPub: function () {
    var that = this;
    wx.request({
      url: app.data.requestUrl + 'home/space/published_list',
      methods: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        member_id: that.data.userData
      },
      success: function (res) {
        res = {
          "code": 200,
          "msg": "请求成功",
          "data": [
            {
              "id": "4",
              "title": "杜的空间",
              "banner": "home/201810221831307565278.jpeg",
              "status": "0",
              "examine_status": "0"
            }
          ]
        }
        that.setData({
          pubList: res.data
        })
      }
    })
  },
  // 获取未发布空间列表
  getUnpub: function () {
    var that = this;
    wx.request({
      url: app.data.requestUrl + 'home/space/unpublished_list',
      methods: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        member_id: that.data.userData
      },
      success: function (res) {
        res = {
          "code": 200,
          "msg": "请求成功",
          "data": [
            {
              "id": "4",
              "title": "杜的空间",
              "banner": "home/201810221831307565278.jpeg",
              "status": "0",
              "examine_status": "0"
            }
          ]
        }
        that.setData({
          unpubList: res.data
        })
      }
    })
  },
  // 下架空间
  handleDown(e) {
    var that = this;
    wx.request({
      url: app.data.requestUrl + 'home/space/lower_space',
      methods: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        member_id: that.data.userData,
        space_id: e.currentTarget.dataset.id
      },
      success: function (res) {
        if(res.data.code == 200) {

        } else {
          console.log(res.data.msg)
        }
      }
    })
  },
  // 删除空间
  handleDel(e) {
    var that = this;
    wx.request({
      url: app.data.requestUrl + 'home/space/del_space',
      methods: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        member_id: that.data.userData,
        space_id: e.currentTarget.dataset.id
      },
      success: function (res) {
        if (res.data.code == 200) {

        } else {
          console.log(res.data.msg)
        }
      }
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