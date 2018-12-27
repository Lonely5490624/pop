// pages/fd/space/add-1.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    spaceType: 1,
    flag:true,
    openTuiding:false,
    openTuiding1:false
  },
  // 选择空间类型
  chooseType (e) {
    this.setData({
      spaceType: e.currentTarget.dataset.id
    })
  },
  // 下一步
  pubStep1 () {
    
    let params = {
      type: this.data.spaceType
    }
    if (!params.type) {
      wx.showToast({
        title: '请选择空间类型',
        icon: 'none'
      })
      return
    }
    if (!this.data.flag) {
      wx.showToast({
        title: '请阅读并同意上传规则',
        icon: 'none'
      })
      return
    }
    if(this.data.spaceId) {
      params.space_id = this.data.spaceId
    }
    app.http('/space/published', params)
      .then(res => {
        this.setData({
          spaceId: res.data
        })
        wx.navigateTo({
          url: `add-2?spaceId=${this.data.spaceId}`,
        })
      })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // if (options && options.spaceId) {
      this.setData({
        spaceId: options.spaceId || 0
      })
      app.http('/space/unpublished', { space_id: this.data.spaceId })
        .then(res => {
          this.setData({
            spaceType: res.data.type,
            spaceId: res.data.id
          })
        })
    // }
  },
  checkboxChange:function(e){
    
    if (e.detail.value!="1"){
      this.setData({
        flag:false
      })
    }else{
      this.setData({
        flag: true
      })
    }
  },
  bindTuiding() {
    this.setData({
      openTuiding: true
    })
  },
  closeTuiding() {
    this.setData({
      openTuiding: false
    })
  },
  bindTuiding1() {
    this.setData({
      openTuiding1: true
    })
  },
  closeTuiding1() {
    this.setData({
      openTuiding1: false
    })
  },

})