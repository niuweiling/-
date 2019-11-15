// pages/my/myliul/myliul.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cardList:null,
    cur1:'',
    cur2: '',
    cur3: '',
    isinfomation: true
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.setCur(options.name);
  
  },

  onLoadList:function(Ltype){

    var that = this;
    wx.showLoading();
    wx.request({
      url: app.globalData.url + '/cardrelationlist.html',
      data: {
        type: Ltype,
        openid: app.globalData.openid
      },
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        wx.hideLoading()
//              console.log(res.data)
        var data = res.data;
        if (data.status == '1') {
          that.setData({
            cardList: data.data,
            
          })

          if (data.data.length <= 0){
            that.setData({

              isinfomation: false

            })
          }
          

         

        } else {

          that.setData({

            isinfomation: true

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
  bindbutton: function (e) {



    var name = e.currentTarget.dataset.name;
    this.setCur(name);

  },
  setCur:function(name){
    if (name == 'souc') {

      this.setData({
        cur1: 'cur',
        cur2: '',
        cur3: '',
      })

      this.onLoadList('1');
    } else if (name == 'liul') {
      this.setData({
        cur1: '',
        cur2: 'cur',
        cur3: '',
      })
      this.onLoadList('2');
    } else if (name == 'dianz') {
      this.setData({
        cur1: '',
        cur2: '',
        cur3: 'cur',
      })
      this.onLoadList('3');
    }
  },
  calling: function (e) {


    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.phone,
      success: function () {
//        console.log("拨打电话成功！")
      },
      fail: function () {
     //   console.log("拨打电话失败！")
      }
    })
  } 
})