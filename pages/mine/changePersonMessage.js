var app=getApp()
Page({
  data: {
    imgurl: app.data.imgurl,
    // 省市区三级联动初始化
    region: [],
    userInfo: [],
    userData:[],
    wxtx:'',
    head_img_url: null,
    is_bind_wx: 0
  },
  onLoad: function (options) {

    this.setData({
      wxtx: wx.getStorageSync('wxUserData').avatarUrl,
      userData: wx.getStorageSync('userData'),
      userInfo: JSON.parse(options.userInfo),
      is_bind_wx: wx.getStorageSync('is_bind_wx')
    })
    if (this.data.userInfo.province!=null){
      this.setData({
        'region[0]': this.data.userInfo.province,
        'region[1]': this.data.userInfo.city,
        'region[2]': this.data.userInfo.county
      })
    }
    app.http('/my/index')
      .then(res => {
        this.setData({
          head_img_url: res.data.head_img_url
        })
      })
    
  },
  // 选择省市区函数
  changeRegin(e) {
    this.setData({
      region: e.detail.value,
      'userInfo.province': e.detail.value[0],
      'userInfo.city': e.detail.value[1],
      'userInfo.county': e.detail.value[2],
    });
  },
  clearWx : function(){
    app.http('/my/remove_openid')
      .then(res => {
        if (res.code == 200) {
          wx.removeStorageSync('time')
          wx.removeStorageSync('member_id')
          wx.removeStorageSync('member_type')
          wx.navigateTo({
            url: '../fk/index/index'
          })
        }
      })
  },
  //保存
  saveInfo: function() {
    var data={
      nick_name: this.data.userInfo.nick_name,
      synopsis: this.data.userInfo.synopsis,
      credentials_numbere: this.data.userInfo.credentials_numbere,
      head_img_url: this.data.head_img_url,
      address: this.data.userInfo.province + ',' + this.data.userInfo.city + ',' + this.data.userInfo.county
  }
    app.http('/my/save', data)
      .then(res => {
        wx.showToast({
          title: res.msg,
          icon: 'none',
          duration: 2000
        })
        if (res.code == 200) {
          wx.navigateTo({
            url: 'mine'
          })
        }  
      })
  },
  onShow: function() {
    let pages = getCurrentPages();
    let currPage = pages[pages.length - 1];
    if (currPage.data.name != undefined) {
      this.setData({
        'userInfo.nick_name': currPage.data.name
      })
    }
    if (currPage.data.info != undefined) {
      this.setData({
        'userInfo.synopsis': currPage.data.info
      });
    }
    if (currPage.data.idCardNum != undefined) {
      this.setData({
        'userInfo.credentials_numbere': currPage.data.idCardNum
      });
    }
  }  
})