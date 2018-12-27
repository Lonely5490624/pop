// pages/fd/space/uploadImg.js
import WeCropper from '../../../we-cropper/dist/we-cropper.min.js'
const device = wx.getSystemInfoSync() // 获取设备信息
const width = device.windowWidth // 示例为一个与屏幕等宽的正方形裁剪框
const height = width
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cropperOpt: {
      id: 'cropper',
      width,  // 画布宽度
      height, // 画布高度
      scale: 2.5, // 最大缩放倍数
      zoom: 10, // 缩放系数
      cut: {
        x: (width - 268) / 2, // 裁剪框x轴起点
        y: (width - 150.75) / 2, // 裁剪框y轴期起点
        width: 268, // 裁剪框宽度
        height: 150.75 // 裁剪框高度
      }
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { cropperOpt } = this.data

    // 若同一个页面只有一个裁剪容器，在其它Page方法中可通过this.wecropper访问实例
    new WeCropper(cropperOpt)
      .on('ready', (ctx) => {
        console.log(`wecropper is ready for work!`)
      })
      .on('beforeImageLoad', (ctx) => {
        console.log(`before picture loaded, i can do something`)
        console.log(`current canvas context: ${ctx}`)
        wx.showToast({
          title: '上传中',
          icon: 'loading',
          duration: 20000
        })
      })
      .on('imageLoad', (ctx) => {
        console.log(`picture loaded`)
        console.log(`current canvas context: ${ctx}`)
        wx.hideToast()
      })
  },
  touchStart(e) {
    this.wecropper.touchStart(e)
  },
  touchMove(e) {
    this.wecropper.touchMove(e)
  },
  touchEnd(e) {
    this.wecropper.touchEnd(e)
  },
  uploadTap() {
    const self = this

    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success(res) {
        const src = res.tempFilePaths[0]

        self.wecropper.pushOrign(src)
      }
    })
  },
  cancel() {
    wx.navigateBack({
      alpha: 1
    })
  },
  getCropperImage() {
    var FSM = wx.getFileSystemManager();
    this.wecropper.getCropperImage((src) => {
      console.log(src)
      if (src) {
        FSM.readFile({
          filePath: src,
          encoding: "base64",
          success: function (data) {
            let img = 'data:image/jpeg;base64,' + data.data
            app.http('/space/upload_img', { data_img: img })
              .then(res => {
                let pages = getCurrentPages()
                let prevPage = pages[pages.length - 2]
                app.http('/order/upload_voucher', { order_id: prevPage.data.order_id, file: res.data })
                  .then(res => {
                    prevPage.setData({
                      img: res.data
                    })
                    wx.navigateBack({
                      alpha: 1
                    })
                  })
              })
          }
        })
      } else {
        console.log('获取图片地址失败，请稍后重试')
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