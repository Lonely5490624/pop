// pages/fd/space/add-3.js
const app = getApp()
Array.prototype.remove = function (val) {
  var index = this.indexOf(val);
  if (index > -1) {
    this.splice(index, 1);
  }
};

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageUrl: app.data.imgurl,
    spaceId: null,
    images: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    options.spaceId = 165
    this.setData({
      spaceId: options.spaceId
    })
    app.http('/space/unpublished', { space_id: options.spaceId })
      .then(res => {
        let images = res.data.pics
        if (images) {
          this.setData({
            images
          })
        }
      })
  },
  // 去上传
  goUpload() {
    wx.navigateTo({
      url: 'uploadImg',
    })
  },
  // 上传图片
  uploadImg() {
    let images = this.data.images || []
    wx.chooseImage({
      success: (res) => {
        console.log(this.wecropper)
        this.wecropper.pushOrign(res.tempFilePaths[0])
        res.tempFilePaths.forEach(item => {
          images.push(item)
        })
        this.setData({
          images
        })
      },
    })
  },
  // 删除照片
  delImage (e) {
    let url = e.currentTarget.dataset.url
    let images = this.data.images
    images.remove(url)
    this.setData({
      images
    })
  },
  // 清空照片
  clearImg () {
    this.setData({
      images: []
    })
  },
  // 下一步
  pubStep3() {
    let params = {
      space_id: this.data.spaceId,
      img_url: this.data.images
    }
    if(params.img_url.length < 1) {
      wx.showToast({
        title: '请选择图片',
        icon: 'none'
      })
      return
    }
    app.http('/space/published_two', params)
      .then(res => {
        console.log(res)
        wx.navigateTo({
          url: `add-4?spaceId=${this.data.spaceId}`,
        })
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