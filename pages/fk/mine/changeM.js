// pages/fk/order/order-confirm-3.js
Page({
  data: {
    noteMaxLen: 100,
    input: false,
    textarea: false,
    sfinput: false,
    bg: false,
    ytype: '',
    name: '',
    info: '',
    idCardNum: ''

  },
  onLoad: function(options) {
    if (options.type == 'nm') {
      this.setData({
        input: true,
        textarea: false,
        sfinput: false,
        ytype: options.type
      })
    } else if (options.type == 'if') {
      this.setData({
        input: false,
        textarea: true,
        sfinput: false,
        ytype: options.type
      })
    } else if (options.type == 'sf') {
      this.setData({
        input: false,
        textarea: false,
        sfinput: true,
        ytype: options.type
      })
    }
    this.setData({
      limitNoteLen: 100 //剩余字数
    });
  },
  //身份证号码
  getsfNum: function(e) {
    var value = e.detail.value,
      len = parseInt(value.length)
    this.setData({
      idCardNum: value,
    });
    if (len > 0) {
      this.setData({
        bg: true,
      });
    } else {
      this.setData({
        bg: false,
      });
    }
  },
  //昵称
  getNewName: function(e) {
    var value = e.detail.value,
      len = parseInt(value.length)
    this.setData({
      name: value,
    });
    if (len > 0) {
      this.setData({
        bg: true,
      });
    } else {
      this.setData({
        bg: false,
      });
    }
  },
  save: function() {
    let pages = getCurrentPages(); //当前页面
    let prevPage = pages[pages.length - 2]; //上一页面
    if (this.data.ytype == 'nm') {
      prevPage.setData({ //直接给上移页面赋值
        name: this.data.name
      });
    } else if (this.data.ytype == 'if') {
      prevPage.setData({
        info: this.data.info
      })
    } else if (this.data.ytype == 'sf') {
      if (!(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(this.data.idCardNum))) {
        wx.showToast({
          title: '身份证号码有误',
          duration: 2000,
          icon: 'none'
        });
        return false;
      } else {
        prevPage.setData({
          idCardNum: this.data.idCardNum
        })
      }
    }
    wx.navigateBack({ //返回
      delta: 1
    })

  },
  // 简介
  bindWordLimit: function(e) {
    var value = e.detail.value,
      len = parseInt(value.length);
    if (len > this.data.noteMaxLen) return;
    this.setData({
      limitNoteLen: this.data.noteMaxLen - len, //剩余字数
      info: value
    })
    if (len > 0) {
      this.setData({
        bg: true,
      });
    } else {
      this.setData({
        bg: false,
      });
    }
  }
})