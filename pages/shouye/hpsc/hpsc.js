// pages/shouye/hpsc/hpsc.js
var app = getApp();
var time = 0;
var iscolse = true;

var isLoad = true;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    showView: false,
    showView1: false,  //上传
    selectPerson: true,
    selectArea: false,
    time:0,
    title:'全部',
    draft_type : 0,
    offset: 0 ,
    limit : 5,
    pageSize:5,
    collectlist :[],
    drafttype: ['yellow','blue','h7','h8'],
    isinfomation : true,
    Height: parseInt(wx.getSystemInfoSync().windowHeight - 60),
    islastpage:false,
    currentPage:1,
    isIPhoneX: app.globalData.isIPhoneX
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    showView: (options.showView == "true" ? true : false);
    showView1: (options.showView1 == "true" ? true : false);



   
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {


    // wx.navigateTo({
    //   url: '../pmxq/pmxq'
    // })

  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

    this.loadList();
  
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
  onChangeShowState: function () {
    var that = this;
    that.setData({
      showView: (!that.data.showView)
    })
  },
  close: function () {
    if (iscolse){
      time = 1000;
      var that = this;
      that.setData({
        showView1: (!that.data.showView1)
      })
    }
    
  },
  clickPerson: function () {
    var selectPerson = this.data.selectPerson;
    if (selectPerson == true) {
      this.setData({
        selectArea: true,
        selectPerson: false,
      })
    } else {
      this.setData({
        selectArea: false,
        selectPerson: true,
      })
    }
  },
  changeAvatar: function () {
    let _this = this;
    wx.showActionSheet({
      itemList: ['从相册中选择', '拍照'],
      //itemColor: '#DE4A2A',
      success: function (res) { 
        if (!res.cancel) {
          if (res.tapIndex == 0) {
            _this.chooseWxImage('album')
          } else if (res.tapIndex == 1) {
            _this.chooseWxImage('camera')
          }
        }
      }
    })

  },
  chooseWxImage: function (type) {


    let _this = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: [type],
      success: function (res) {

        _this.setData({
          showView1: true
        })


        

        var avatar = res.tempFilePaths;

//        console.log(avatar)
        
        //调用上面定义的递归函数，一秒一刷新时间
        time = 0;

        //_this.upload(_this, avatar[0]);

        _this.countdown(_this, avatar[0]);
       
      }
    })

  },

  upload: function ( _this,file){


  
    wx.uploadFile({
      url: app.globalData.url + '/home_upload.html',
      filePath: file,
      name: 'file',
      header: {
        "Content-Type": "multipart/form-data"
      },
      success: function (res) {

        
        var data = JSON.parse(res.data);

        
//        console.log(res)
   //     console.log(data.front_img)

        if (data.status == 1){

          setTimeout(function () {
            _this.setData({
              time: 99
            })

            setTimeout(function () {
              _this.setData({
                time: 100
              })

              iscolse = true;
              _this.setData({
                showView1: false
              })

              var front_img = data.front_img
              
             // front_img = front_img.replace('http', 'https').replace('***', '?').replace('###', '=')

              wx.navigateTo({
                url: '../pmxq/pmxq?jsonstr=' + JSON.stringify(data.data) + "&front_img=" + front_img
              })


            }, 500)


          }, 500)

        }else{
          iscolse = true;

          wx.showModal({
            title: '提示',
            content: data.message,
            success: function (res) {

              _this.setData({
                showView1: (!_this.data.showView1)
              })



            }
          })
          return;


        }

        

        



       

      },
      fail: function (res) {
   //     console.log("上传图片失败:" + res.errMsg)
      }


    })

  },

countdown:function(that,file){
  

  that.setData({
    time: time
  })


 // console.log("time的值：" + time);
  if (time >= 1000){

    time = 0;
    iscolse = true;
    return;
  }

  if (time == 93){
    iscolse = false;
    that.upload(that,file);
    time = 0;
    return;
  }

 
  setTimeout(function () {
    
    time += 1;
    that.countdown(that, file);

  }, 80)

},
/**
* 页面相关事件处理函数--监听用户下拉动作
*/
refresh: function () {

  wx.showLoading()
  setTimeout(function () {

    wx.hideLoading();

  }, 500)

 

},

/**
 * 页面上拉触底事件的处理函数
 */
loadMore: function () {
  var that = this;
  // 当前页是最后一页
  if (that.data.islastpage) {
    wx.showToast({
      title: '到底了',
    })
    return;
  }

  if (isLoad){
  
    console.log('上拉加载更多');
    var tempCurrentPage = that.data.currentPage;
    tempCurrentPage = tempCurrentPage + 1;

    that.getMinPageAndMaxPageNum(tempCurrentPage);
    isLoad = false;
    that.loadList();
   
  }
  

},


getMinPageAndMaxPageNum: function (inowpage){
  console.log('.........................当前页:' + inowpage)
  var that = this;
  var ipagesize = that.data.pageSize ;
  var offset = (ipagesize * (inowpage - 1));

  that.setData({
    offset: offset,
    currentPage: inowpage
  })
  
},

loadList :function(){

  var that = this;
  console.log( that.data.offset +",,,,111111,,,,,,1111111111111111"
)
  wx.showLoading()
  
  wx.request({
    url: app.globalData.url + '/home_collectlist.html',
    data: {
      access_token: app.getaccess_token(),
      timestamp: app.gettimestamp(),
      uid: app.globalData.uid,
      draft_type: that.data.draft_type,
      offset: that.data.offset,
      limit: that.data.limit,

    },
    method: 'GET',
    header: {
      'content-type': 'application/json'
    },
    success: function (res) {
      wx.hideLoading()
      var data = res.data;

   //   console.log(data)
      if (data.status == '1') {



        var array_list = that.data.collectlist;

        console.log('返回信息的个数:'+data.data.length)

        for (var i = 0; i < data.data.length; i++) {
          array_list.push(data.data[i]);
        }

        var array = JSON.stringify(array_list);

        that.setData({
          collectlist: JSON.parse(array),
          isinfomation: true,
        })
        isLoad = true;
        
        
        if (data.data.length < that.data.pageSize ){
          that.setData({
            islastpage: true //设置是最后一页
          })
          

          return;
        }else{
          that.setData({
            islastpage: false //设置是最后一页
          })
        }
        
      }else{


        if (that.data.collectlist <= 0) {
          that.setData({
            collectlist: [],
            isinfomation: false,
            islastpage: true //设置是最后一页

          })
        } else {
          
          that.setData({
            islastpage: true //设置是最后一页

          })
        }

      }

    }
  })


  
},

clickPersonone :function(e){
 

  this.clickPerson();

  this.setData({
    title: e.currentTarget.dataset.title,
    draft_type: e.currentTarget.dataset.value,
    collectlist:[],
    offset: 0,
    limit: 5,
    currentPage:1

  })

  this.loadList();
  
  },
  /**
   * 汇票详情
   */
  tapcollect:function(e){

    wx.navigateTo({
      url: '../nopmxq/nopmxq?id=' + e.currentTarget.dataset.id +"&name=test"
    })

  },
  binsearch: function () {

    wx.navigateTo({
      url: '../hpscsearch/hpscsearch'
    })

  },


})