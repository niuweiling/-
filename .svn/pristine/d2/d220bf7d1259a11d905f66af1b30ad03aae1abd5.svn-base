// pages/shouye/xjsd/xjsd.js
var util = require('../../../utils/util.js');
var app = getApp();


Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: [],
    index: 0,
    items: [
      { name: '2', value: '电票', checked: 'true'},
      { name: '1', value: '纸票' }
    ],
    itemvalue :'2',
    date: util.formatDate(app.gettimestamp(), 'Y-M-D'),

    money:''
  },
  radioChange: function (e) {
//    console.log('radio发生change事件，携带value值为：', e.detail.value)
    this.data.itemvalue = e.detail.value;
  },
  bindPickerChange: function (e) {
 //   console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  bindDateChange: function (e) {
  //  console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  money:function(e){
    this.setData({ money: e.detail.value });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {



 
    if (app.globalData.cdharray.length <= 0){
      var that = this;
      wx.showLoading()
      wx.request({
        url: app.globalData.url + '/home_getbanklist.html',
        data: {
          access_token: app.getaccess_token(),
          timestamp: app.gettimestamp()
        },
        method: 'GET',
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          wx.hideLoading()
          var data = res.data;

        //  console.log(data)
          if (data.status == '1') {

            var array = [];

            for (var i = 0; i < data.data.length; i++) {
              array[i] = data.data[i].name
            }

            app.globalData.cdharray = array;
            that.setData({
              array: array
            })


          }

        }
      })
    }else{

    //  console.log(app.globalData.cdharray)
      this.setData({
        array: app.globalData.cdharray
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  
  xjjg: function () {

    var that = this;
    wx.showLoading()
    wx.request({
      url: app.globalData.url + '/home_manual.html',
      data: {
        access_token: app.getaccess_token(),
        timestamp: app.gettimestamp(),
        uid: app.globalData.uid,
        token: app.globalData.token,
        type: that.data.itemvalue,
        bank_type: that.data.array[that.data.index],
        money: that.data.money,
        expire_time: that.data.date,
        role: app.globalData.role
        
      },
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        wx.hideLoading()
        var data = res.data;

        //console.log(data)
        if (data.status == '1') {
        wx.navigateTo({
          url: '../xjjg/xjjg?selectprice_id=' + data.data.selectprice_id,
        })

        }else{
          app.message(data.message);
        }

      }
    })

    
  }
})