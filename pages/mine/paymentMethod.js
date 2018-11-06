// pages/fk/order/order-confirm-3.js
Page({
  data: {
    userData:[],
    banklist:[]
  },
  onLoad: function (options) {    
    var that=this
    that.setData({
      userData: wx.getStorageSync('userData')
    })
    console.log(that.data.userData.member_id)
    wx.request({
      url: 'http://pop.aieye8.com/index.php/home/my/get_bank',
      data: {
        member_id: that.data.userData.member_id
      },
      success: function (res) {            
        that.setData({
          banklist: res.data.data
        })
        for (var i = 0; i < res.data.data.length; i++){
          var num = that.data.banklist[i].bank_number.substr(0, 4) + '******' + that.data.banklist[i].bank_number.substr(15, 19);
          that.setData({
            'banklist[i].bank_number': num
          })          
        }
        
        
        console.log(that.data.banklist)
        
      }
    })
    

  },
  gotoEdit:function(){
    var userInfo = JSON.stringify(this.data.userInfo);
    wx.navigateTo({
      url: 'changePersonMessage?userInfo=' + userInfo
    })
  }
})