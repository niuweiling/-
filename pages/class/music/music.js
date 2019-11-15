// pages/class/music/music.js
var app = getApp();
const api=require('../../../utils/api.js');
var offset=1;
var handLastPage=1;
var audiourl=app.globalData.newurl+'api/billclass/audiolist';
var detailurl=app.globalData.newurl+'api/billclass/detail';
var recordurl=app.globalData.newurl+'api/billclass/keep';
var recordStatus;
//var flag=false;
var pos;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      '../../images/s.jpg',
      'https://images.unsplash.com/photo-1551214012-84f95e060dee?w=640',
      'https://images.unsplash.com/photo-1551446591-142875a901a1?w=640'
    ],
    id:null,
    flag:false,
    pos:0,
    indicatorDots: false,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    showlist:false,
    recordS:false,
    picindex:1,
    cur:1,
    total:12,
    playStatus: true,
    audioIndex: 0,
    progress: 0,
    duration: 0,
    audioList: [],
    progressText:"00:00",
    durationText:"00:00",
    showList: false,
    isIPhoneX: app.globalData.isIPhoneX
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
   this.setData({
      id:options.id,
      audioIndex:Number(options.chapter),
      cur:Number(options.chapter)+1
    })
   
   
  },
  loadData:function(id){
     api.get(detailurl,{
         uid:app.globalData.uid,
         'access_token':app.getaccess_token(),
         'timestamp':app.gettimestamp(),
         id:id
     }).then(res =>{
       console.log(res);
        this.setData({
          detail:res.data
        });
       recordStatus = res.data.keep;
       if (recordStatus == 1) {
         this.setData({ recordS: true });
       } else {
         this.setData({ recordS: false });
       }
        
     }).catch( e=>{
         console.log(e);
     });
     api.get(audiourl,{
        offset:offset,
        id:this.data.id,
       'access_token':app.getaccess_token(),
       'timestamp':app.gettimestamp(),
        uid:app.globalData.uid,

     }).then(res =>{
       // console.log(res);
        this.setData({
          audioList:res.data.list,
        })
        //console.log(this.data.audioIndex);
        this.playMusic();
        console.log(this.data.audioList[0]);
     }).catch( e=>{
        console.log(e);
     })
  },
  playMusic: function () {
    let audio = this.data.audioList[this.data.audioIndex];
    let manager = wx.getBackgroundAudioManager();
    manager.title = audio.title || "音频标题";
   // manager.epname = audio.epname || "专辑名称";
  //  manager.singer = audio.author || "歌手名";
   // manager.coverImgUrl = audio.poster;
    // 设置了 src 之后会自动播放
    manager.src = audio.url;

    //console.log(this.data.audioList[0]);
    manager.currentTime = 0;
    let that = this;
    manager.onPlay(function () {
      console.log("======onPlay======");
      that.setData({
        playStatus: true
      })
      that.countTimeDown(that, manager);
    });
    manager.onPause(function () {
      that.setData({
        playStatus: false
      })
      console.log("======onPause======");
    });
    manager.onEnded(function () {
      console.log("======onEnded======");
      that.setData({
        playStatus: false
      })
      setTimeout(function () {
        that.nextMusic();
      }, 1500);
    });
  },
  //循环计时
  countTimeDown: function (that, manager, cancel) {
    if (that.data.playStatus) {
      setTimeout(function () {
        if (that.data.playStatus) {
          // console.log("duration: " + manager.duration);
          // console.log(manager.currentTime);
          that.setData({
            progress: Math.ceil(manager.currentTime),
            progressText: that.formatTime(Math.ceil(manager.currentTime)),
            duration: Math.ceil(manager.duration),
            durationText: that.formatTime(Math.ceil(manager.duration))
          })
          that.countTimeDown(that, manager);
        }
      }, 1000)
    }
  },
  //拖动事件
  sliderChange: function (e) {
    let manager = wx.getBackgroundAudioManager();
    manager.pause();
    manager.seek(e.detail.value);
    this.setData({
      progressText: this.formatTime(e.detail.value)
    })
    setTimeout(function () {
      manager.play();
    }, 1000);
  },
  //上一首
  lastMusic: function () {
    let audioIndex = this.data.audioIndex > 0 ? this.data.audioIndex - 1 : this.data.audioList.length - 1;
    if (this.data.flag) {
      this.setData({
        cur: this.data.audioList.length - audioIndex
      })
    } else {
      this.setData({
        cur: audioIndex + 1
      })
    }
    this.setData({
      audioIndex: audioIndex,
      playStatus: false,
      progress: 0,
      progressText: "00:00",
      durationText: "00:00"
    })
    setTimeout(function () {
      this.playMusic();
    }.bind(this), 1000);
  },
  //播放按钮
  playOrpause: function () {
    let manager = wx.getBackgroundAudioManager();
    if (this.data.playStatus) {
      manager.pause();
    } else {
      manager.play();
    }
  },
  //下一首
  nextMusic: function () {
    
    let audioIndex = this.data.audioIndex < this.data.audioList.length - 1 ? this.data.audioIndex + 1 : 0;
    console.log(audioIndex);
    if (this.data.flag) {
      this.setData({
        cur: this.data.audioList.length-audioIndex
      })
    }else{
      this.setData({
        cur:audioIndex+1
      })
    }
    this.setData({
      audioIndex: audioIndex,
      playStatus: false,
      progress: 0,
      progressText: "00:00",
      durationText: "00:00"
    })
   

    setTimeout(function () {
      this.playMusic();
    }.bind(this), 1000);
  },
  //列表点击事件
  listClick: function (e) {
    let pos = e.currentTarget.dataset.pos;
    if (pos != this.data.audioIndex) {
      this.setData({
        audioIndex: pos,
        showlist: false
      })
      if(this.data.flag){
         this.setData({
           cur:this.data.audioList.length-this.data.audioIndex,
         })
      }else{
        this.setData({
          cur:this.data.audioIndex+1
        })
      }
      this.playMusic();
    } else {
      this.setData({
        showlist: false
      })
    }
  },
  //界面切换
  pageChange: function () {
    this.setData({
      showlist: true
    })
  },
  reve:function(){
     if(this.data.flag){
  
      // flag=false;
       
     this.setData({flag:false})
     }else{
       //flag=true;
      this.setData({flag:true})
     }
//console.log(flag);
     let that=this;
     let pos=that.data.audioIndex;
     let len=that.data.audioList.length;
     let audiolist2=that.data.audioList.reverse();
     console.log(audiolist2);
     that.setData({
       cur:this.data.audioIndex+1,
       audioList:audiolist2,
       audioIndex:len-pos-1,
     })
    
  },
  //格式化时长
  formatTime: function (s) {
    let t = '';
    s = Math.floor(s);
    if (s > -1) {
      let min = Math.floor(s / 60) % 60;
      let sec = s % 60;
      if (min < 10) {
        t += "0";
      }
      t += min + ":";
      if (sec < 10) {
        t += "0";
      }
      t += sec;
    }
    return t;
  },
  //关闭弹框
  close:function(){
     this.setData({
       showlist:false
     })
  },
  goto:function(){
    let manager=wx.getBackgroundAudioManager();
    manager.pause();
      wx.navigateTo({
        url: '../classlist/classlist?id='+this.data.id,
      })

  },
  go:function(){
    let manager=wx.getBackgroundAudioManager();
    manager.pause();
    wx.navigateTo({
      url: '../classlist/classlist?id=' + this.data.id+"&tap=3",
    })
  },
  record: function () {
    // let manager = wx.getBackgroundAudioManager();
    //manager.pause();
    api.get(recordurl, {
      id: this.data.id,
      uid: app.globalData.uid,
      access_token: app.getaccess_token(),
      timestamp: app.gettimestamp(),
    }).then(res => {

    }).catch(e => {
      console.log(e);
    })
    if (this.data.recordS) {
      wx.showToast({
        title: '取消收藏成功',
      })
      recordStatus = false;
      this.setData({ recordS: recordStatus });
    } else {
      wx.showToast({
        title: '收藏成功',
      })
      recordStatus = true;
      this.setData({ recordS: recordStatus });
      // this.onLoad();
    }
  },
  onSliderChange:function(e){
     var _this=this
     _this.setData({picindex:e.detail.current+1})
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