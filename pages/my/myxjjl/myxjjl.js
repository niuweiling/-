// pages/my/myxjjl/myxjjl.js
var app = getApp();

var time = 0;
var iscolse = true;

var isLoad = true;

Page({

  /**
   * 页面的初始数据
   */
  data: {

    showView1: false,
    priceloglist:[],
    isinfomation: false,
    time: 0,
    offset: 0,
    limit: 20,
    pageSize: 20,
    islastpage: false,
    currentPage: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
    showView1: (options.showView1 == "true" ? true : false);
    this.selectpriceloglist();
  },


  //获取列表数据
  selectpriceloglist:function(){


    wx.showLoading()
    
    var that = this;
    wx.request({
      url: app.globalData.url + '/me_selectpriceloglist.html',
      data: {
        access_token: app.getaccess_token(),
        timestamp: app.gettimestamp(),
        uid: app.globalData.uid,
        token: app.globalData.token,
        offset: that.data.offset,
        limit: that.data.limit,
        role: app.globalData.role,

      },
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        wx.hideLoading()
        var data = res.data;

//        console.log(data.data)
        if (data.status == '1') {






          var array_list = that.data.priceloglist;

          console.log('返回信息的个数:' + data.data.length)

          for (var i = 0; i < data.data.length; i++) {
            array_list.push(data.data[i]);
          }

          var array = JSON.stringify(array_list);

          that.setData({
            priceloglist: JSON.parse(array),
            isinfomation: true,
          })
          isLoad = true;


          if (data.data.length < that.data.pageSize) {
            that.setData({
              islastpage: true, //设置是最后一页
              isinfomation: false,
            })

            return;
          } else {
            that.setData({
              islastpage: false //设置是最后一页
            })
          }


        } else {

          if (that.data.priceloglist <= 0) {
            that.setData({
              priceloglist: [],
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

    console.log('监听用户下拉动作')
    // 隐藏导航栏加载框  
    wx.hideNavigationBarLoading();
    // 停止下拉动作  
    wx.stopPullDownRefresh();  
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

    var that = this;
    // 当前页是最后一页
    if (that.data.islastpage) {
      wx.showToast({
        title: '到底了',
      })
      return;
    }

    if (isLoad) {

      console.log('上拉加载更多');
      var tempCurrentPage = that.data.currentPage;
      tempCurrentPage = tempCurrentPage + 1;

      that.getMinPageAndMaxPageNum(tempCurrentPage);
      isLoad = false;
      that.selectpriceloglist();

    }



  },

  getMinPageAndMaxPageNum: function (inowpage) {

    var that = this;
    var ipagesize = that.data.pageSize;
    var offset = (ipagesize * (inowpage - 1));

    that.setData({
      offset: offset,
      currentPage: inowpage
    })

  },

  // /**
  //  * 用户点击右上角分享
  //  */
  // onShareAppMessage: function (e) {
  
  // },
  close: function () {
    var that = this;
    that.setData({
      showView1: (!that.data.showView1)
    })
  },
  xjjg:function(e){

    wx.navigateTo({
      url: '../../shouye/xjjg/xjjg?selectprice_id=' + e.currentTarget.dataset.id,
    })
  },
  



  //再次询价
  againSelectpricelist:function(e){



    let _this = this;
    //调用上面定义的递归函数，一秒一刷新时间
    time = 0;

    _this.setData({
      showView1: true
    })
    var selectprice_id = e.currentTarget.dataset.id;
    _this.countdown(_this, selectprice_id);

   

  },

  countdown: function (that, selectprice_id) {


    that.setData({
      time: time
    })


//    console.log("time的值：" + time);
    if (time >= 1000) {

      time = 0;
      iscolse = true;
      return;
    }

    if (time == 93) {
      iscolse = false;


//      console.log("后台拉去数据。。。。")
       that.againSelectpriceLoad(selectprice_id);
      time = 0;
      return;
    }


    setTimeout(function () {

      time += 1;

     

      that.countdown(that, selectprice_id);
     
      

    }, 80)

  },

  close: function () {
    if (iscolse) {
      time = 1000;
      var that = this;
      that.setData({
        showView1: (!that.data.showView1)
      })
    }

  },


  againSelectpriceLoad: function (selectprice_id){

   
    // wx.showLoading()

    var that = this;
    wx.request({
      url: app.globalData.url + '/me_againSelectpricelist.html',
      data: {
        access_token: app.getaccess_token(),
        timestamp: app.gettimestamp(),
        uid: app.globalData.uid,
        token: app.globalData.token,
        role: app.globalData.role,
        selectprice_id: selectprice_id

      },
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        wx.hideLoading()
        var data = res.data;
//        console.log(data)
 //       console.log(data.data)
        if (data.status == '1') {

          setTimeout(function () {
            that.setData({
              time: 99
            })

            setTimeout(function () {
              that.setData({
                time: 100
              })

              iscolse = true;
              that.setData({
                showView1: false
              })

              wx.navigateTo({
                url: '../../shouye/xjjg/xjjg?selectprice_id=' + data.data.selectprice_id
              })

            }, 500)

          }, 500)

        } else {
          iscolse = true;
          wx.showModal({
            title: '提示',
            content: data.message,
            success: function (res) {

              that.setData({
                showView1: (!_this.data.showView1)
              })

            }
          })
          return;

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