// pages/search/search.js

const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 存放数据
    resultList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
  bindToHome(){
    wx.navigateBack({
      url: '../home/home',
    })
  },
  searchMovie(e){
    var self = this;
    var value = e.detail.value;
    var url = app.globalData.doubanBase + app.globalData.ResourcesURL + value +"&&start=0&&count=10"; //从第0位开始，取10条数据；

    // var url = 'https://www.easy-mock.com/mock/5b4c4032189fc57b63eb8410/example/getMovie'
    //微信请求方式的写法
    wx.request({
      url: url,
      method: 'GET',
      header: {'content-type': 'json'},
      success(res) {
        self.handleData(res.data.subjects);
      },
      fail(err) {
        console.log(err);
      }
    })  
  },
  handleData(data) {
    var resultList = []
    data.forEach(item => {
      let directors = item.directors.map(i => i.name).join('/');
      let desc = item.rating.average + '分/' + item.year + '/' + directors;
      resultList.push({
        title: item.title,
        image: item.images.small,
        desc,
        id: item.id
      })
    })
    this.setData({resultList:resultList});//将此处resultList的值放在数据data的resultList中
  
  }
})