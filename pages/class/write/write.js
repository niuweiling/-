// pages/class/write/write.js
var app=getApp();
const api=require('../../../utils/api.js');
const writeurl=app.globalData.newurl+"api/billclass/score";
var pos;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    stars: ['../../images/greystar.png', '../../images/greystar.png', '../../images/greystar.png', '../../images/greystar.png', '../../images/greystar.png'],
    activestars:["../../images/star.png","../../images/star.png","../../images/star.png","../../images/star.png","../../images/star.png"],
    width:"0",
    word:0,
    able:false,
    id:null,
    score:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     this.setData({id:options.id});
     
  },
  submitform:function(){
    
  },
  starclick:function(e){
     // console.log(e.currentTarget.dataset.pos);
      let pos=e.currentTarget.dataset.pos+1;
      this.setData({
        score:pos,
        width:pos*60
      })
     // console.log(this.data.width);
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  write:function(e){
    let str = e.detail.value.replace(/(.)(?=[^$])/g, "$1,").split(",").length;
    /*if(str==140){
       this.setData({
         able:true
       })
    }*/
    this.setData({
      word:str
    })
    
  }, 
  save:function(e){
  if(this.data.score==""||this.data.word==""){
    wx.showToast({
      title: '内容不能为空',
      icon: 'none',
      duration: 3000,
      mask: true
    })
     return;
  }
  var cacheuserInfo = wx.getStorageSync('cacheuserInfo');
   // console.log(cacheuserInfo.nickName);
   api.get(writeurl,{
     uid:app.globalData.uid,
     cid:this.data.id,
     access_token:app.getaccess_token(),
     timestamp:app.gettimestamp(),
     content:this.data.word,
     score:this.data.score,
     is_anonymous:this.data.checked,
     nickname:cacheuserInfo.nickName,

   }).then( res =>{
      console.log(res);
      wx.showToast({
        title: '您已成功提交评价',
      })
      wx.navigateBack({
        
      })
   }).catch( e =>{
     console.log(e);
   })
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

  }
})