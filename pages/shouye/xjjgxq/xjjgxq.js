// pages/shouye/xjjgxq/xjjgxq.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

    institutioninfo : null,
    isIPhoneX:app.globalData.isIPhoneX,
    draft_name: ['纸银', '电银'],
    authestatus: ['已认证', '未认证'],
    tipsshow: "none",
    isIPhoneX:app.globalData.isIPhoneX
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
//    console.log(options.selectprice_id + "," + options.draft_quote_id);

    var that = this;
    wx.showLoading()
    wx.request({
      url: app.globalData.url + '/home_institutioninfo.html',
      data: {
        access_token: app.getaccess_token(),
        timestamp: app.gettimestamp(),
        uid: app.globalData.uid,
        token: app.globalData.token,       
        draft_quote_id: options.draft_quote_id,
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

//        console.log(data)
        if (data.status == '1') {


          

          that.setData({

            institutioninfo: data.data

          });


        } else {
          app.message(data.message);
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
  // ckpm:function(e){
  //   wx.navigateTo({
  //     url: '../ckpm/ckpm?url=' + e.currentTarget.dataset.url,
  //   })
  // },

  //图片点击事件
  ckpm: function (event) {
    var url = event.currentTarget.dataset.url;//获取data-src

    var urls = [event.currentTarget.dataset.url]

    //图片预览
    wx.previewImage({
      current: url, // 当前显示图片的http链接
      urls: urls // 需要预览的图片http链接列表
    })
  },

  calling: function (e) {

    
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.phone, 
      success: function () {
//        console.log("拨打电话成功！")
      },
      fail: function () {
  //      console.log("拨打电话失败！")
      }
    })
  } 
})