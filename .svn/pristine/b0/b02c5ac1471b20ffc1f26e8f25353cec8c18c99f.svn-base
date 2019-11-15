// pages/shouye/details/details.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url:'',
    selectPerson: true,
    selectPerson1: true,
    selectPerson2: true, 
    selectPerson3: true, 
    selectPerson4: true, 
    selectArea: false
  },
  clickPerson: function () {
    var selectPerson = this.data.selectPerson;
    if (selectPerson == true) {
      this.setData({
        selectArea: true,
        selectPerson: false,
        selectArea1: false,
        selectPerson1: true,
        selectArea2: false,
        selectPerson2: true,
        selectArea3: false,
        selectPerson3: true
      })
    } else {
      this.setData({
        selectArea: false,
        selectPerson: true,
      })
    }
  },
  clickPerson1: function () {
    var selectPerson1 = this.data.selectPerson1;
    if (selectPerson1 == true) {
      this.setData({
        selectArea1: true,
        selectPerson1: false,
        selectArea: false,
        selectPerson: true,
        selectArea2: false,
        selectPerson2: true,
        selectArea3: false,
        selectPerson3: true
      })
    } else {
      this.setData({
        selectArea1: false,
        selectPerson1: true,
      })
    }
  },
  clickPerson2: function () {
    var selectPerson2 = this.data.selectPerson2;
    if (selectPerson2 == true) {
      this.setData({
        selectArea2: true,
        selectPerson2: false,
        selectArea: false,
        selectPerson: true,
        selectArea1: false,
        selectPerson1: true,
        selectArea3: false,
        selectPerson3: true
      })
    } else {
      this.setData({
        selectArea2: false,
        selectPerson2: true,
      })
    }
  },
  clickPerson3: function () {
    var selectPerson3 = this.data.selectPerson3;
    if (selectPerson3 == true) {
      this.setData({
        selectArea3: true,
        selectPerson3: false,
        selectArea: false,
        selectPerson: true,
        selectArea1: false,
        selectPerson1: true,
        selectArea2: false,
        selectPerson2: true
      })
    } else {
      this.setData({
        selectArea3: false,
        selectPerson3: true,
      })
    }
  },
  year:function(){
    wx.navigateTo({
      url: '../year/year',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    
    
    
    var url = options.url;

    this.setData({
      url: url.replace('***', '?').replace('###', '=').replace('https', 'http').replace('http', 'https')
    }) 

    // var name = options.name;

    // if (name == 'xieyi') {

     
    //   wx.setNavigationBarTitle({ title: '云票据服务协议' })
    // }else{
    //   wx.setNavigationBarTitle({ title: '授信企业详情' })
      
    // }
   
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
  
  // }
})