// pages/class/classlist/classlist.js

const api=require('../../../utils/api');
var app = getApp();
const detailurl=app.globalData.newurl+'api/billclass/detail';
const curseurl=app.globalData.newurl+'api/billclass/audiolist';
const recordurl=app.globalData.newurl+'api/billclass/keep';
const commenturl=app.globalData.newurl+'api/billclass/commentlist';
var offset=1;
var handLastPage=false;
var recordStatus;
var id;
Page({

  /**
   * 页面的初始数据
   */
  data: {
        selected : true,
        selected1:false,
        selected2:false,
        isIPhoneX: app.globalData.isIPhoneX,
        id:null,
        recordS:false,
        audioList:[],
        detail:[],
        nodata:true,
        num:25.6666
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.id == "" || options.id == null) {
      wx.navigateBack({

      })
    }
        id=options.id;
        this.setData({
          id:options.id
        })
       // this.loadData(this.data.id);
        if(options.tap==3){
          this.setData({
            selected2:true,
            selected1:false,
            selected:false,
          })
        };
  },
  loadData: function (id) {
    api.get(detailurl, {
      offset: 0,
      id:id,
     // car:true,
      'access_token': app.getaccess_token(),
      'timestamp': app.gettimestamp(),
       uid: app.globalData.uid,
    }).then(res => {
      console.log('详情');
      console.log(res);
      this.setData({ detail: res.data });

      recordStatus=res.data.keep;
      if(recordStatus==1){
        this.setData({ recordS: true });
      }else{
        this.setData({recordS:false});
      }

    }).catch(e => {
      console.log(e);
    });
    api.get(detailurl, {
      offset: 0,
      id: this.data.id,
      car: true,
      'access_token': app.getaccess_token(),
      'timestamp': app.gettimestamp(),
      uid: app.globalData.uid,
    }).then(res => {
      console.log('课程');
      console.log(res);
      this.setData({ 
        audio:res.data.audio_list,
        audioList: res.data.audio_list.list
        });

    }).catch(e => {

      console.log(e);
    });
    api.get(commenturl, {
      offset: 0,
      cid: this.data.id,
     // car: true,
      'access_token': app.getaccess_token(),
      'timestamp': app.gettimestamp(),
      uid: app.globalData.uid,
    }).then(res => {
      console.log('评价');
      console.log(res);
      if (res.data.list.length>0){
            console.log("拿到数据了...............");
            this.setData({
              nodata:false
            })
          for (var i = 0; i < res.data.list.length; i++) {
            if (res.data.list[i].pic === '0') {
              res.data.list[i].pic = "../../images/my.png"
            }
            console.log(res.data.list[i].pic);
          }
          this.setData({
            comment: res.data.list
          });
        }
    }).catch(e => {

      console.log(e);
    });
    
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
     this.loadData(this.data.id);
    
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
  selected:function(e){
         this.setData({
           selected1:false,
           selected2:false,
           selected:true
         })
  },
  selected1:function(e){
        this.setData({
          selected2:false,
          selected:false,
          selected1:true
        })
  },
  selected2:function(e){
        this.setData({
          selected:false,
          selected1:false,
          selected2:true
        })
  },
  listen:function(){
      //开始收听默认赋值第一首
       wx.navigateTo({
         url: '../music/music?id='+this.data.id+"&chapter="+"0",
       })
  },
  listenrow:function(e){
     wx.navigateTo({
       url: '../music/music?id='+ this.data.id+"&chapter="+e.currentTarget.dataset.id
     })

  },
  write:function(){
      wx.navigateTo({
        url: '../write/write?id='+this.data.id,
      })
  },
  record:function(){
    api.get(recordurl, {
      id: this.data.id,
      uid: app.globalData.uid,
      access_token: app.getaccess_token(),
      timestamp: app.gettimestamp(),
    }).then(res => {
        
    }).catch(e => {
      console.log(e);
    }) 
    if(this.data.recordS){
        wx.showToast({
          title: '取消收藏成功',
        })
        recordStatus=false;
        this.setData({recordS:recordStatus});
    }else{
        wx.showToast({
          title: '收藏成功',
        })
        recordStatus=true;
        this.setData({recordS:recordStatus});
        // this.onLoad();
    }
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    // 隐藏导航栏加载框  
    wx.hideNavigationBarLoading();
    // 停止下拉动作  
    wx.stopPullDownRefresh();
    this.loadData(this.data.id);
  },
  
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    wx.showLoading();

    api.get(detailurl, {
      offset: offset,
      id:this.data.id,
      'access_token': app.getaccess_token(),
      'timestamp': app.gettimestamp(),
      car:true,
      uid: app.globalData.uid,
    }).then(res => {
      if (handLastPage) {
        wx.showToast({
          title: '到底了',
        });
        handLastPage = true;
        return;
      }
      wx.hideLoading();
      var arrList = this.data.class;
      for (var i = 0; i < res.data.length; i++) {
        arrList.push(res.data[i]);
      }
      console.log(arrList);
      this.setData({
        class: arrList
      })

      if (res.data.length < 10) {
        handLastPage = true;
        return;

      } else {
        offset++;
      }

    }).catch(e => {
      console.log(e);
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})