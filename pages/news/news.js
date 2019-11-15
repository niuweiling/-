// pages/news/news.js
var page = 2 ;
var handLastPage = false;
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
     isIPhoneX:app.globalData.isIPhoneX
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.getData();

  
  },

  getData:function(){
    wx.showLoading()
   console.log("加载数据中.................................")
    var th = this;
    wx.request({
      url: getApp().globalData.url + '/wentipjzx.html',
      data: {
        page:1
      },
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: function (res){
        console.log(res);
        wx.hideLoading()
        if (res.data.result == 'true') {

          var array = JSON.stringify(res.data.data);

          th.setData({
            array: JSON.parse(array)
          })


        } else {
          wx.showModal({

            content: res.data.msg,
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
//                console.log('用户点击确定')
              }
            }
          })
        }


      }
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

    // var th = this;
    // wx.request({
    //   url: getApp().globalData.url + '/wentipjzx.html',
    //   data: {
    //     page: 1

    //   },
    //   method: 'GET',
    //   header: {
    //     'content-type': 'application/json'
    //   },
    //   success: function (res) {
    //     if (res.data.result == 'true') {

    //       var array = JSON.stringify(res.data.data);

    //       th.setData({
    //         array: JSON.parse(array)
    //       })


    //       console.log("下拉刷新加载数据中完毕!!!!!!!!!!!!!!!!!!");
    //       // 隐藏导航栏加载框  
    //       wx.hideNavigationBarLoading();
    //       // 停止下拉动作  
    //       wx.stopPullDownRefresh();  

    //     } else {
    //       wx.showModal({

    //         content: res.data.msg,
    //         showCancel: false,
    //         success: function (res) {
    //           if (res.confirm) {
    //             console.log('用户点击确定')
    //           }
    //         }
    //       })
    //     }


    //   }
    // })

  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    wx.showLoading()
//    console.log("页面上拉触底事件的处理函数中...................")

    var th = this;
    wx.request({
      url: getApp().globalData.url + '/wentipjzx.html',
      data: {
        page: page
      },
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        if (res.data.result == 'true') {

          if (handLastPage) {

            wx.showToast({
              title: '到底了',
            })

            handLastPage = true;
            return;

          }

          wx.hideLoading()
          var array_list = th.data.array;

          for (var i = 0; i < res.data.data.length; i++) {
            array_list.push(res.data.data[i]);
          }

          var array = JSON.stringify(array_list);

          th.setData({
            array: JSON.parse(array)
          })
 
          if (res.data.data.length < 10) {


            handLastPage = true;
            return;

          } else {
            page++;
          }

          // 隐藏加载框  
          wx.hideLoading(); 

//          console.log("页面上拉触底事件的处理函数完毕!!!!!!!!!!!!!!!!!!");
          

        } else {
          wx.showModal({

            content: res.data.msg,
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
//                console.log('用户点击确定')
              }
            }
          })
        }


      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  goto: function (e) {

//    console.log("詳情信息鏈接:"+e.currentTarget.dataset.url)
    wx.navigateTo({
      url: 'newsdetial/newsdetial?url=' + e.currentTarget.dataset.url
    })
  }
})