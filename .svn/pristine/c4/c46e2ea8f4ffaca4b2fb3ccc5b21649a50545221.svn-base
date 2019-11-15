// pages/bank/bankdetail/detail.js
var page = 2;
var handLastPage = false;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array:null,
    bank_num: null,
    bank_province: null,
    bank_city: null,
  
    bank_name: null
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
//    console.log(options.bank_num)
 
    this.setData({
      array: JSON.parse(options.array),
      bank_num: options.bank_num,
      bank_province: options.bank_province,
      bank_city: options.bank_city,
  
      bank_name: options.bank_name


    

    }) 
  
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


    // 隐藏导航栏加载框  
    wx.hideNavigationBarLoading();
    // 停止下拉动作  
    wx.stopPullDownRefresh();  

    // console.log("下拉刷新加载数据中...................")

    // var that = this;
    // wx.request({
    //   url: getApp().globalData.url + '/wentidehh.html',
    //   data: {
    //     page: 1,
    //     bank_num: that.data.bank_num,
    //     bank_province: that.data.bank_province,
    //     bank_city: that.data.bank_city,
   
    //     bank_name: that.data.bank_name

    //   },
    //   method: 'GET',
    //   header: {
    //     'content-type': 'application/json'
    //   },
    //   success: function (res) {

    //     if (res.data.result == 'true') {

    //       var array = JSON.stringify(res.data.data);

    //       that.setData({
    //         array: JSON.parse(array),     
    //       }) ;
    //       // 隐藏导航栏加载框  
    //       wx.hideNavigationBarLoading();
    //       // 停止下拉动作  
    //       wx.stopPullDownRefresh();  


          
    //     }

    //   }
    // })
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

//    console.log("页面上拉触底事件的处理函数中...................")

    if (handLastPage) {

      wx.showToast({
        title: '到底了',
      })

      handLastPage = true;
      return;

    }

    wx.showLoading()
    var that = this;
    wx.request({
      url: getApp().globalData.url + '/wentidehh.html',
      data: {
        page: page,
        bank_num: that.data.bank_num,
        bank_province: that.data.bank_province,
        bank_city: that.data.bank_city,
     
        bank_name: that.data.bank_name

      },
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {

        wx.hideLoading()
        if (res.data.result == 'true') {          
          var array_list = that.data.array;
          for (var i = 0; i < res.data.data.length; i++) {
            array_list.push(res.data.data[i]);
          }
          var array = JSON.stringify(array_list);

          that.setData({
            array: JSON.parse(array)
          })

          if (res.data.data.length < 15) {

            handLastPage = true;
            return;

          } else {
            page++;
          }


          // 隐藏加载框  
          wx.hideLoading();



//          console.log("页面上拉触底事件的处理函数完毕!!!!!!!!!!!!!!!!!!");


        }else{
          handLastPage = true;
        }

      }
    })
  
  },

  // /**
  //  * 用户点击右上角分享
  //  */
  // onShareAppMessage: function () {
  
  // }
})