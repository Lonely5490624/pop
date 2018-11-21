Page({
  data: {
    link_address:''
  },
  onLoad: function(options) {
    this.setData({
      link_address: options.link_address
    })
  }
})