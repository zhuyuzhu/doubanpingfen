// pages/home/home.js

var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inThearters: [],
    comingSoon: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var inTheartersURl = app.globalData.doubanBase + app.globalData.inThearters+ '?start=0&count=10';
    var comingSoonURL = app.globalData.doubanBase + app.globalData.comingSoon + '?start=0&count=10';
    //调用自定义函数，获取指定对象属性的数据；
    this.getMovieListData(inTheartersURl, 'inThearters');
    this.getMovieListData(comingSoonURL, 'comingSoon');
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
  
  },
  bindToSearch() {
    wx.navigateTo({
      url: '../search/search',
    })
  },
  //封装函数getMovieListData
  getMovieListData(url, _type) {
    //加载资源的内部函数
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 5000
    });
    wx.request({
      url,//url:url,可以简写
      type: 'GET',
      header: {'content-type': 'json'},
      success:res => {
        this.setData({[_type]: res.data.subjects})
       
        },
      fail: err => console.log(err),
      //请求完成后，触发函数
      complete(){
        //请求完成后，隐藏“加载中”
        wx.hideToast();
      }
    })
  },
  bindToMore(event) {
   
    var typeId = event.currentTarget.dataset.typeId;
    wx.navigateTo({
      url: '../movie-more/movie-more?typeId=' + typeId,
    })
  },
  toDetail(e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../movie-detail/movie-detail?id=' + id,
    })
  }
})