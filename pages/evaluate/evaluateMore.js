// pages/fd/data/index.js
var app=getApp();
Page({
  data: {
    bg: false,
    marketing: 0,
    operational_capacity: 0,
    effect: 0,
    communicate: 0,
    accuracy: 0,
    service: 0,
    landlord_content: '',
    order_id: 0
  },
  onLoad: function(options) {
    this.setData({
      service: options.flag2,
      landlord_content: options.pcount
    })
  },
  //准确度
  cAccuracy1: function() {
    var that = this;
    that.setData({
      accuracy: 1,
    });
  },
  cAccuracy2: function() {
    var that = this;
    that.setData({
      accuracy: 2
    });
  },
  cAccuracy3: function() {
    var that = this;
    that.setData({
      accuracy: 3
    });
  },
  cAccuracy4: function() {
    var that = this;
    that.setData({
      accuracy: 4
    });
  },
  cAccuracy5: function() {
    var that = this;
    that.setData({
      accuracy: 5
    });
  },
  //沟通性
  cCommunicate1: function() {
    var that = this;
    that.setData({
      communicate: 1,
    });
  },
  cCommunicate2: function() {
    var that = this;
    that.setData({
      communicate: 2
    });
  },
  cCommunicate3: function() {
    var that = this;
    that.setData({
      communicate: 3
    });
  },
  cCommunicate4: function() {
    var that = this;
    that.setData({
      communicate: 4
    });
  },
  cCommunicate5: function() {
    var that = this;
    that.setData({
      communicate: 5
    });
  },
  //场景效果
  cEffect1: function() {
    var that = this;
    that.setData({
      effect: 1,
    });
  },
  cEffect2: function() {
    var that = this;
    that.setData({
      effect: 2
    });
  },
  cEffect3: function() {
    var that = this;
    that.setData({
      effect: 3
    });
  },
  cEffect4: function() {
    var that = this;
    that.setData({
      effect: 4
    });
  },
  cEffect5: function() {
    var that = this;
    that.setData({
      effect: 5
    });
  },
  //营销转化
  cMarketing1: function() {
    var that = this;
    that.setData({
      marketing: 1,
    });
  },
  cMarketing2: function() {
    var that = this;
    that.setData({
      marketing: 2
    });
  },
  cMarketing3: function() {
    var that = this;
    that.setData({
      marketing: 3
    });
  },
  cMarketing4: function() {
    var that = this;
    that.setData({
      marketing: 4
    });
  },
  cMarketing5: function() {
    var that = this;
    that.setData({
      marketing: 5
    });
  },
  //运营能力
  cOerational_capacity1: function() {
    var that = this;
    that.setData({
      operational_capacity: 1,
    });
  },
  cOerational_capacity2: function() {
    var that = this;
    that.setData({
      operational_capacity: 2
    });
  },
  cOerational_capacity3: function() {
    var that = this;
    that.setData({
      operational_capacity: 3
    });
  },
  cOerational_capacity4: function() {
    var that = this;
    that.setData({
      operational_capacity: 4
    });
  },
  cOerational_capacity5: function() {
    var that = this;
    that.setData({
      operational_capacity: 5
    });
  },
  next: function() {
    var data = {
      marketing: this.data.marketing,
      operational_capacity: this.data.operational_capacity,
      effect: this.data.effect,
      communicate: this.data.communicate,
      accuracy: this.data.accuracy,
      order_id: this.data.order_id,
      service: this.data.service,
      landlord_content: this.data.landlord_content
    }
    console.log(data)
    app.http('/comment/save_comment',data)
      .then(res => {
        wx.navigateTo({
          url: "evaluateSuccess?space_id=" + space_id
        })
      })

  }
})