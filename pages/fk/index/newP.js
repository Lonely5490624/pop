Page({
  data: {
    id: '',
    link_address:''
  },
  onLoad: function(options) {
    this.setData({
      id: options.id
    })
  }
})