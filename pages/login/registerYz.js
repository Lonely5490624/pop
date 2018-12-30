// pages/login/registerYz.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mobile: '',
    nick_name: '',
    head_img_url: '',
    synopsis: '',
    true_name: '',
    credentials_numbere: '',
    showXieyi: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options) {
      this.setData({
        mobile: options.mobile,
        nick_name: options.nick_name,
        head_img_url: options.head_img_url,
        synopsis: options.synopsis
      })
    }
  },
  // 输入真实姓名
  changeTrueName (e) {
    this.setData({
      true_name: e.detail.value
    })
  },
  // 输入身份证号码
  changeCredent (e) {
    this.setData({
      credentials_numbere: e.detail.value
    })
  },
  // 完成
  done (e) {
    let type = e.target.dataset.type
    let params = {
      mobile: this.data.mobile,
      nick_name: this.data.nick_name,
      head_img_url: this.data.head_img_url,
      synopsis: this.data.synopsis,
      true_name: this.data.true_name,
      credentials_numbere: this.data.credentials_numbere,
      type
    }
    let nameReg = /^[\u4e00-\u9fa5]{2,4}$/,
      numReg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
    if (type == 1) {
      if (!nameReg.test(params.true_name)) {
        wx.showToast({
          title: '请填写正确的真实姓名',
          icon: 'none'
        })
        return
      }
      if (!numReg.test(params.credentials_numbere)) {
        wx.showToast({
          title: '请填写正确的身份证号码',
          icon: 'none'
        })
        return
      }
    }
    app.http('/member/register', params, true)
      .then(res => {
        wx.redirectTo({
          url: 'login',
        })
      })
    // wx.request({
    //   url: app.data.requestUrl + '/member/register',
    //   method: "POST",
    //   data: params,
    //   header: {
    //     "Content-Type": "application/x-www-form-urlencoded"
    //   },
    //   success: function (res) {
    //     // wx.redirectTo({
    //     //   url: 'login',
    //     // })
    //   }
    // })
  },
  // 显示协议
  openXieyi () {
    this.setData({
      showXieyi: true
    })
  },
  closeXieyi () {
    this.setData({
      showXieyi: false
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