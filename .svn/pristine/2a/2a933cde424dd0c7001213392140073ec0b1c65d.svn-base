//index.js
//获取应用实例
const app = getApp();
var user = require('../../utils/user.js');


Page({
  data: {
    src: '../images/table.png',
    cardsrc: '../images/card.png',
    banksrc: '../images/bank.png',
    risksrc: '../images/risk.png',
    shiborsrc: '../images/shibor.png',
    newsrc: '../images/news.png',
    showModel:'none',
    showModel2:''
    

  },
  //事件处理函数
  bindViewTap: function() {
    
  },
  onLoad: function () {
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      showModel: 'none',
      showModel2: ''
    })

  },
 
  gocal:function () {
    wx.navigateTo({
      url: '../cal/cal'
    })
  },
  gocard:function(){
    var that = this;

    

    user.getUserInfo(this, function (res) {

      console.log('res的值：'+res)

      if (res) {


        
        var openid = wx.getStorageSync('cacheopenid')
        console.log(openid)
        wx.showLoading()
        wx.request({
          url: getApp().globalData.url + '/getwentimpbj.html',
          data: {
            uid: openid
          },
          method: 'GET',
          header: {
            'content-type': 'application/json'
          },
          success: function (res) {
            wx.hideLoading()
            var data = res.data;
            if (data.result == 'true') {
              wx.navigateTo({
                url: '../card/card?from=card'
              })


            } else {

              wx.navigateTo({
                url: '../card/carddetail/carddetail?from=index'
              })

            }

          }
        })
        return;
      }



    }).then(function () {}, function (error) {
        // failure

      that.setData({
        showModel: '',
        showModel2: 'none'
      })


        console.log("false1122 .....");
    })



    

 

  },
  gobank:function () {
    wx.navigateTo({
      url: '../bank/bank'
    })
  },
  gorisk:function () {
    wx.navigateTo({
      url: '../danger/danger'
    })
  },
  goshibor: function () {
    wx.navigateTo({
      url: '../shibor/shibor'
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  gonews: function () {
    wx.navigateTo({
      url: '../news/news'
    })
  }
})
