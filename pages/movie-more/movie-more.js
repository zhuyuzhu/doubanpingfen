// pages/movie-more/movie-more.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //定义两个变量，
    showInThearter: true,
    showComingSoon: false,
    //下面两个对象用来存放加载到的数据offset和total
    //让这两个对象和typeId同名，方便使用
    inThearters: {},
    comingSoon: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var typeId = options.typeId;
   
    if(typeId === 'inThearters'){
      this.setData({showInThearter: true,showComingSoon: false});
    }else{
      this.setData({showInThearter: false, showComingSoon: true})
    }
    this.getMovieListData(typeId);//根据唯一标示获取对应的数据
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
  selectTap(event) {
    var tabId = event.currentTarget.dataset.tabId;
    
    //注意此处的tabId是text标签中（正在上映、即将上映）中的data-tab-id的值
    //这里最好还是要换一个标示，不然跟上面的标示重名，容易混淆
    if (tabId === 'inThearters') {
      this.setData({ showInThearter: true, showComingSoon: false });
    } else {
      this.setData({ showInThearter: false, showComingSoon: true })
    }
    //在两个值切换的时候，如果没有数据再进行加载
    if(!this.data[tabId].total) {
      
      this.getMovieListData(tabId);
    }
  },
  getMovieListData(typeId) {
   
    //因为more页面只展示其中一个的数据，所以用一个URL来代替不同情况
    var URL;
    if(typeId === 'inThearters'){
      URL = app.globalData.doubanBase + app.globalData.inThearters;
    }else {
      URL = app.globalData.doubanBase + app.globalData.comingSoon;
    }

    //data对象中的inThearters和comingSoon对象和此处的typeId同名
    var offset = this.data[typeId].offset || 0;//数据的当前位置（比如第520个数据）
    var total = this.data[typeId].total || 999;//数据的总数
    //当没有数据的时候，就不发送请求
    if(offset >= total){
      return 
    }

    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 10000
    })
    wx.request({
      url: URL,
      type: 'GET',
      header: {'content-type' : 'json'},
      data: {
        start: offset,
        count: 5
      },
      success: res => {
        var movies = this.data[typeId].movies || [],
            total = res.data.total,
            subjects = res.data.subjects,
            offset = this.data[typeId].offset || 0;
        offset += subjects.length;//下一次请求，请求新的位置的
       
        //遍历subjects中的每一项，casts演员
        subjects.forEach(item => {
          //注意map的用法
          let allCasts = item.casts.map(i => i.name).join(' / ');//演员
          let allDirs = item.directors.map(i => i.name).join(' / ');//导演
          let allGenres = item.genres.join(' / ');//类型
          let movie = {
            allCasts,
            allDirs,
            allGenres,
            ...item,
            typeId
          }
          movies.push(movie);
          
        })
        this.setData({[typeId] : {offset, total, movies}})//将数据设置到对应的位置
       
      },
      fail: err => console.log(err),
      complete(){
        wx.hideToast();
      }
    })
  },
  //下拉加载数据
  loadMore() {
   
    let typeId = '';
    if(this.data.showInThearter){
      typeId = 'inThearters'
    }else {
      typeId = 'comingSoon'
    }
   
    this.getMovieListData(typeId);
  },
  //
  handleTicket() {
    wx.showModal({
      title: '提示',
      content: '用户点击购票',
      success:function(res) {
        console.log(res);
      },
      fail: function(err) {
        console.log(err); 
      }
    })
  },
  handleWish() {
    wx.showModal({
      title: '提示',
      content: '记得看哦',

    })
  },
  //跳转到详情页
  toDetail(e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../movie-detail/movie-detail?id=' + id,
    })
  }

})