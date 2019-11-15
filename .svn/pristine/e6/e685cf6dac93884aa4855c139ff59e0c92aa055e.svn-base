// pages/shouye/xjjg/xjjg.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

    offset:0, //分页 开始。。。。默认取20条 ,
    manuallist: null,
    isIPhoneX:app.globalData.isIPhoneX                 
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
//    console.log(options.selectprice_id)

    

    if (options.selectprice_id != '' & options.selectprice_id != null){


      var that = this;
      wx.showLoading()
      wx.request({
        url: app.globalData.url + '/home_newmanuallist.html',
        data: {
          access_token: app.getaccess_token(),
          timestamp: app.gettimestamp(),
          uid: app.globalData.uid,
          token: app.globalData.token,
          offset: that.data.offset,
          limit: 100,
          role: app.globalData.role,
          selectprice_id: options.selectprice_id

          
          
          

        },
        method: 'GET',
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          wx.hideLoading()
          var data = res.data;

//          console.log(data)
          if (data.status == '1') {

            console.log("询价机构 返回个数:" + data.data.length);

            that.setData({ 
              
              manuallist : data.data

            });
           

          } else {
            app.message(data.message);
          }

        }
      })



    }
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

  // /**
  //  * 用户点击右上角分享
  //  */
  // onShareAppMessage: function () {
  
  // },
  xjjgxq:function(e){


    wx.navigateTo({
      url: '../xjjgxq/xjjgxq?selectprice_id=' + e.currentTarget.dataset.selectprice_id + '&draft_quote_id=' + e.currentTarget.dataset.draft_quote_id,
    })
  }
})