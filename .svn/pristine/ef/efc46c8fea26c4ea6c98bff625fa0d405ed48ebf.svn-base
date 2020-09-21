// pages/my/myzhuce/myzhuce.js
var countdown = 60;
var settime = function (that) {
 if (countdown == 0) {
  that.setData({
   is_show: true
  })
  countdown = 60;
  return;
 } else {
  that.setData({
   is_show:false,
   last_time:countdown
  })
 
  countdown--;
 }
 setTimeout(function () {
  settime(that)
 }, 1000)
}

var app = getApp();
Page({

  /* 页面的初始数据*/
  data: {
    last_time: '',
    is_show: true,
    showView: true,
    phone:'',
    password:'',
    verify:'',
    verify_id:'',
    from: 'zhuce',
    pswvalue :'密码',
    // checkboxChange:true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.from == 'wjmm'){
      this.setData({ 
        from: options.from,
        pswvalue:'新密码'
      });
      wx.setNavigationBarTitle({ title: '忘记密码' })
    }
    showView: (options.showView == "true" ? true : false)
  
  },
  // 手机号
  blurphone:function(e){
    this.setData({
      phone: e.detail.value 
    });
  },
  // 密码
  blurpsw:function(e){
    this.setData({ 
      password: e.detail.value
     });
  },
  // 验证码
  blurverify:function(e) {
    this.setData({ 
      verify: e.detail.value
    });
  },
  // 是否显示密码
  eyeclick: function () {
    this.setData({
      showView: !this.data.showView
    })
  },
  // 验证码
  clickVerify:function () {
    var that = this;
    if (that.data.from == 'wjmm'){
      wx.request({
        url: app.globalData.url + '/me_verifyforget.html',
        data: {
          access_token: app.getaccess_token(),
          timestamp: app.gettimestamp(),
          phone: that.data.phone

        },
        method: 'GET',
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          console.log(res)
          var data = res.data;
//          console.log(data)
          if (data.status == '1') {
            // 将获取验证码按钮隐藏60s，60s后再次显示
            that.setData({
              is_show: (!that.data.is_show),  //false
              verify_id: data.data.verify_id
            })
            settime(that);
          } else {
            app.message(data.message);
          }
        }
      })
      return;
    }else{
      wx.request({
        url: app.globalData.url + '/me_verifyreg.html',
        data: {
          access_token: app.getaccess_token(),
          timestamp: app.gettimestamp(),
          phone: that.data.phone
        },
        method: 'GET',
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          var data = res.data;
//          console.log(data)
          if (data.status == '1') {
            // 将获取验证码按钮隐藏60s，60s后再次显示
            that.setData({
              is_show: (!that.data.is_show),  //false
              verify_id: data.data.verify_id
            })
            settime(that);
          } else {
            app.message(data.message);
          }
        }
      })
    }
  },
  /* 提交*/
  register:function(){
    var that = this;
    if (that.checkpassword(that.data.password)){
      return;
    }
    if (that.data.from == 'wjmm') {
      wx.showLoading()
      wx.request({
        url: app.globalData.url + '/me_forgetpassword.html',
        data: {
          access_token: app.getaccess_token(),
          timestamp: app.gettimestamp(),
          phone: that.data.phone,
          password: that.data.password,
          verify: that.data.verify,
          verify_id: that.data.verify_id
        },
        method: 'GET',
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          var data = res.data;
          wx.hideLoading()
          if (data.status == '1') {
            wx.showModal({
              title: '提示',
              content: data.message,
              success: function (res) {
                if(res.confirm){
                  wx.navigateTo({
                    url: '/pages/shouye/index/index',
                  })
                }
              }
            })
          } else {
            app.message(data.message);
          }
        }
      })
      return;
    }else{
      // if (!that.data.checkboxChange) {
      //   app.message('请同意《云票据服务协议》');
      //   return;
      // }
      wx.showLoading()
      wx.request({
        url: app.globalData.url + '/me_register.html',
        data: {
          access_token: app.getaccess_token(),
          timestamp: app.gettimestamp(),
          phone: that.data.phone,
          password: that.data.password,
          verify: that.data.verify,
          verify_id: that.data.verify_id,
          usertype: app.globalData.role,
        },
        method: 'GET',
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          wx.hideLoading()
          var data = res.data;
          if (data.status == '1') {
            
            wx.showModal({
              title: '提示',
              content: data.message,
              success: function (res) {
                that.loginrequest(that.data.phone, that.data.password);
              }
            })
          } else {
            app.message(data.message);
          }
        }
      })
    }
  },
  // 判断密码格式
  checkpassword: function (value) {
    var that = this;
    var strkong = /^[0-9a-zA-Z]{0,25}$/g;
    if (strkong.test(value)) {
      return false; 
    } else {
      wx.showModal({
        title: '提示',
        content: '密码由0~25位数字或26个英文字母而成',
        showCancel: false,
        success: function (res) {
        }
      }) 
      return true; 
    } 
  },

  loginrequest: function (phone, password) {
    var that = this;
    wx.request({
      url: app.globalData.url + '/me_login.html',
      data: {
        access_token: app.getaccess_token(),
        timestamp: app.gettimestamp(),
        phone: phone,
        password: password,
        version: "3.0.1",
        client: "weixin",
        openid: app.globalData.openid
      },
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        var data = res.data;
        if (data.status == '1') {
          app.setUid(data.data.id, data.data.token)
          console.log('1111')
          wx.reLaunch({
            url: '/pages/shouye/index/index',
          })
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  // 选择同意协议
  // checkboxChange:function(){
  //   this.setData({
  //     checkboxChange: !this.data.checkboxChange,
  //   })
  // },


  openxy:function(e){
    var url = 'https://www.cpiaoju.com//apphtml/service';
    wx.navigateTo({
      url: '../../shouye/details/details?url=' + url +'&name=xieyi'
    })
  },
})