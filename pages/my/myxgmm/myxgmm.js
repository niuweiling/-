// pages/my/myxgmm/myxgmm.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    oldpsw:'',
    newpsw1: '',
    newpsw2: ''
   

  
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

  // /**
  //  * 用户点击右上角分享
  //  */
  // onShareAppMessage: function () {
  
  // },
  oldpsw: function (e) {
    this.setData({ oldpsw: e.detail.value });
  },
  newpsw1: function (e) {
    this.setData({ newpsw1: e.detail.value });
  },
  newpsw2: function (e) {
    this.setData({ newpsw2: e.detail.value });
  },
  updatepassword:function(){
//    console.log(this.data.oldpsw + ":" + this.data.newpsw1 + ":" + this.data.newpsw2 + ":");

    var that = this;
    

    if (app.globalData.uid == ''){
      app.message("请先登录")
      return;
    }

    if (that.data.newpsw1 != that.data.newpsw2) {
      app.message("两次密码不一致")
      return;
    }


    if (that.data.oldpsw == '') {
      app.message("原始密码不能为空")
      return;
    }

    if (that.data.newpsw1 == '') {
      app.message("新密码不能为空")
      return;
    }

    if (that.data.newpsw2 == '') {
      app.message("新密码不能为空")
      return;
    }




    
    wx.showLoading()
    wx.request({
      url: app.globalData.url + '/me_updatepassword.html',
      data: {
        access_token: app.getaccess_token(),
        timestamp: app.gettimestamp(),
        uid: app.globalData.uid,
        token: app.globalData.token,
        old_password: that.data.oldpsw,
        new_password: that.data.newpsw2,

      },
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        wx.hideLoading()
        var data = res.data;



        if (data.status == 1) {

          that.setData({ 
            oldpsw: '',
            newpsw1: '',
            newpsw2: ''
          });

          app.message("修改成功")
         }else{
          app.message(data.message)
         }



      }
    })




  }
})