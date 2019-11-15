// pages/shouye/nopmxq/nopmxq.js
var app = getApp();
Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    detail : null,
    drafttypes:['纸质商业承兑汇票', '纸质银行承兑汇票', '电子商业承兑汇票','电子银行承兑汇票'],
    id:null
  

  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    this.setData({
      id: options.id
    })
    this.details(options.id);
    
  
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
  pmxq:function(){


    var front_img = this.data.detail.draft_img_url

    this.data.detail.id = this.data.id;

    this.data.detail.title = this.data.drafttypes[this.data.detail.draft_type - 1]

//    console.log(this.data.detail.title)

    wx.navigateTo({
      url: '../pmxq/pmxq?jsonstr=' + JSON.stringify(this.data.detail) + "&comein=clickxq&front_img=" + front_img ,
    })
  },
  details:function(id){
    wx.showLoading()
    var that = this;
    wx.request({
      url: app.globalData.url + '/home_details.html',
      data: {
        access_token: app.getaccess_token(),
        timestamp: app.gettimestamp(),
        id: id

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

         

         wx.setNavigationBarTitle({ title: that.data.drafttypes[ data.data.draft_type - 1 ] })


         var front_img = data.data.draft_img_url;
        
          data.data.draft_img_url = front_img.replace('http', 'https').replace('***', '?').replace('###', '=')
          that.setData({
            detail: data.data
          })





        } else {

        }

      }
    })



  },
  //图片点击事件
  ckpm: function (event) {
    var url = event.currentTarget.dataset.url;//获取data-src

    var urls = [event.currentTarget.dataset.url]
    
    //图片预览
    wx.previewImage({
      current: url, // 当前显示图片的http链接
      urls: urls // 需要预览的图片http链接列表
    })
  }
})