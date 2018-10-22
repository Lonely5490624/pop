// pages/fk/list/list.js


const spaceData = [{
    official: true,
    imgUrl: '/images/aaa.jpg',
    info: '商场店铺内的独立空间·美妆',
    title: '这里是空间标题空间标标题空间标题这里是空间标题空间标标题空间标题',
  collect: true,
    price: 200,
    zhengche: '退订政策严格',
    score: 3
  }, {
    official: false,
    imgUrl: '/images/aaa.jpg',
    info: '商场店铺内的独立空间商场店铺内的独立空间·美妆',
    title: '这里是空间标题空间标标题空',
    collect: true,
    price: 200,
    zhengche: '退订政策严格',
    score: 3
  }, {
    official: true,
    imgUrl: '/images/aaa.jpg',
    info: '商场店铺内的独立空间·美妆',
    title: '这里是空间标题空间标标题空间标题这里是空间标题空间标标题空间标题',
    collect: true,
    price: 200,
    zhengche: '退订政策严格',
    score: 3
  }, {
    official: false,
    imgUrl: '/images/aaa.jpg',
    info: '商场店铺内的独立空间·美妆',
    title: '这里是空间标题空间标标题空间标题这里是空间标题空间标标题空间标题',
    collect: true,
    price: 200,
    zhengche: '退订政策严格',
    score: 3
  }, {
    official: false,
    imgUrl: '/images/aaa.jpg',
    info: '商场店铺内的独立空间·美妆',
    title: '这里是空间标题空间标标题空间标题这里是空间标题空间标标题空间标题',
    collect: true,
    price: 200,
    zhengche: '退订政策严格',
    score: 3
  }, {
    official: true,
    imgUrl: '/images/aaa.jpg',
    info: '商场店铺内的独立空间·美妆',
    title: '这里是空间标题空间标标题空间标题这里是空间标题空间标标题空间标题',
    collect: true,
    price: 200,
    zhengche: '退订政策严格',
    score: 3
  }]

Page({
  data: {
    spaceData,
    opendate: false,
    isFilter: false
  },
  opendate: function() {
    this.setData({
      opendate: true
    })
  },
  openFilter: function() {
    this.setData({
      isFilter: true
    })
  },
  onMyEvent: function (e) {
    // 自定义组件触发事件时提供的detail对象
    let that = e.detail;
    // this.setData({
    //   start: util.datefuc('Y-m-d H:i:s', new Date(that.start).getTime() / 1000, true),
    //   end: util.datefuc('Y-m-d H:i:s', new Date(that.end).getTime() / 1000, true),
    //   starttime: util.datefuc('m月d日', new Date(that.start).getTime() / 1000, true),
    //   endtime: util.datefuc('m月d日', new Date(that.end).getTime() / 1000, true),
    //   compareday: util.compare(new Date(that.start).getTime(), new Date(that.end).getTime()),
    // });
    if (that.fuc == "close") {
      this.setData({
        opendate: 0,
      })
    }
    console.log(this.data)
  },
  closeFilter: function(e) {
    let that = e.detail;
    if (that.fuc == 'close') {
      this.setData({
        isFilter: false
      })
    }
  }
})