// pages/card/card.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: "",
    position: "",
    bpt: "",
    phone: "",
    org_name: "",
    address: "",
    avatar: '../../images/tx.png',
    num:0 ,
    soucCount: 0,
    liulCount: 0,
    dianzCount: 0,


    share_openid:null,
    isthrough:false,
    soucimg: '../../images/card_02.png',  //../../images/card_01.png  
    dianzimg: '../../images/card_05.png',//  ../../images/card_04.png，
    soucvaild:'Y',
    dianzvaild:'Y'

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var that = this;
    setTimeout(function () {
      
    var share_openid = options.share_openid;
    //share_openid ="oGF3s0MU_R_SEGgOklvvmrc0s7_w"
    
    that.setData({
      share_openid: share_openid
    
    })

    console.log("onload.................." + share_openid+"................................")
   // console.log(app.globalData.userInfo.nickName)
    

//    console.log("转发：" + share_openid)

    

   
    
    var openid = wx.getStorageSync('cacheopenid');
    //
    console.log("cacheopenid.................." + openid + "................................")
    if (openid != null && openid != '' || Object.prototype.toString.call(openid) === '[object Undefined]'){

      
//      console.log("获取app.js的openid：" + app.globalData.openid)

      if ( openid != share_openid ){
        that.card_register(share_openid, '2');  //添加浏览记录
        that.isdianzOrsouc(share_openid, openid);//查看是否可以收藏和点赞

        that.setData({    //设置点击按钮开关
          isthrough: true

        })


      }else{


        that.getcardrelationcount(share_openid);  //获取收藏浏览点赞的数量
      }

      



      
    }else{
      console.log("调取getLogin接口。")
      app.getLogin();
//      console.log("获取app.js的openid为null：" + app.globalData.openid)
    }


    that.getwentimpbj(share_openid, that);//获取名片信息

    }, 1500)
   
  },
  
  getwentimpbj: function (share_openid, that){
   
    wx.showLoading()
    wx.request({
      url: getApp().globalData.url + '/getwentimpbj.html',
      data: {
        uid: share_openid
      },
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        wx.hideLoading()
        //        console.log(res.data)
        var data = res.data;
        if (data.result == 'true') {

          var avatar = "../../images/tx.png";

          if (data.data.fileUrl != '' && data.data.fileUrl != null) {
            avatar = data.data.fileUrl;
          }

          that.setData({
            name: data.data.name,
            position: data.data.duties,
            bpt: data.data.business,
            phone: data.data.phone,
            org_name: data.data.company,
            address: data.data.address,
            avatar: avatar
          })


          //          console.log(data.data.fileUrl)
        }

      }
    })


  },
  isdianzOrsouc: function (share_openid, otheropenid) {

    var that = this;
    wx.request({
      url: app.globalData.url + '/cardrelationcount.html',
      data: {
        openid: share_openid,
        otheropenid: otheropenid
      },
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
//        console.log('查看是否可以点赞和收藏')
    //    console.log(res.data)
        var data = res.data;
        if (data.status == '1') {

          data = res.data.data;
          for (var i in data) {
            if (data[i].type == '1') {
              if (data[i].count > 0){
                that.setData({
                  soucimg: '../../images/card_01.png',
                  soucvaild: 'N'

                })
              }
              continue;
            } else if (data[i].type == '3') {
              if (data[i].count > 0) {
                that.setData({
                  dianzimg: '../../images/card_04.png',
                  dianzvaild:'N'

                })
              }
              continue;
            }
          }

          //          console.log(data.data.fileUrl)
        }

      }
    })
  },


  getcardrelationcount: function (share_openid) {

    var that = this;
    wx.request({
      url: app.globalData.url + '/cardrelationcount.html',
      data: {
        openid: share_openid
      },
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {

//        console.log('获取收藏浏览点赞的数量')
 
    //    console.log(res.data)
        var data = res.data;
        if (data.status == '1') {

          data = res.data.data;
          for (var i in data) {
            if (data[i].type == '1') {
              that.setData({
                soucCount: data[i].count

              })
              continue;
            } else if (data[i].type == '2') {
              that.setData({
                liulCount: data[i].count

              })
              continue;
            } else if (data[i].type == '3') {
              that.setData({
                dianzCount: data[i].count

              })
              continue;
            }
          }

          //          console.log(data.data.fileUrl)
        } 

      }
    })
  },



  card_register: function (share_openid,Ltype){
    var that = this;
    wx.request({
      url: app.globalData.url + '/card_register.html',
      data: {
        meopenid: share_openid,
        otheropenid: app.globalData.openid,
        type: Ltype

      },
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {


        that.getcardrelationcount(share_openid);

        console.log(res.data)
        var data = res.data;
        if (data.status == '1') {

        

          //          console.log(data.data.fileUrl)
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



    if (getApp().globalData.num == 'true'){
    
      this.onLoad();

      getApp().globalData.num = null;
    }
    


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
  goto: function () {

    wx.switchTab({
      url: '/pages/shouye/shouye'
    })
  },

  bindsouc:function(e){
// soucvaild: 'Y',
  // dianzvaild:'Y'
    if (this.data.isthrough){

//      console.log("点击事件。。。。。。。。。。。。")
      var name = e.currentTarget.dataset.name;


      var vaild = e.currentTarget.dataset.vaild;

      //点击效果

      

      if (name == 'souc') {



        var that = this
        that.setData({
          soucstyle_img: 'transform:scale(1.3);'
        })
        setTimeout(function () {
          that.setData({
            soucstyle_img: 'transform:scale(1);'
          })
        }, 500)


        this.updatestatus('1', vaild);
//        console.log("点击事件  收藏。。。。。。。。。。。。" + vaild)

      } else if (name == 'dianz') {


        var that = this
        that.setData({
          dianzstyle_img: 'transform:scale(1.3);'
        })
        setTimeout(function () {
          that.setData({
            dianzstyle_img: 'transform:scale(1);'
          })
        }, 500)


        this.updatestatus('3', vaild);
//        console.log("点击事件  点赞。。。。。。。。。。。。" + vaild)
      }
    }
    
  },
  updatestatus: function (Ltype, vaild) {
    
      var that = this;
      wx.request({
        url: app.globalData.url + '/card_register.html',
        data: {
          meopenid: that.data.share_openid,
          otheropenid: app.globalData.openid,
          type: Ltype,
          vaild: vaild

        },
        method: 'GET',
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {

//          console.log(res.data)
          var data = res.data;
          if (data.status == '1') {

            if (Ltype == '1'){
              that.setData({
                soucvaild: data.data

              })


              // soucimg: '../../images/card_02.png',  //../../images/card_04.png  
              //   dianzimg: '../../images/card_05.png',//  ../../images/card_01.png，
              if (data.data == 'Y'){



                that.setData({
                  soucimg: '../../images/card_02.png',
                  soucCount: that.data.soucCount -1
                  

                })
              }else{
                that.setData({
                  soucimg: '../../images/card_01.png',
                  soucCount: that.data.soucCount + 1
                  

                })
              }
            } else if (Ltype == '3') {
              that.setData({
                dianzvaild: data.data

              })

              if (data.data == 'Y') {
                that.setData({
                  dianzimg: '../../images/card_05.png',
                  dianzCount: that.data.dianzCount - 1

                })
              } else {
                that.setData({
                  dianzimg: '../../images/card_04.png',
                  dianzCount: that.data.dianzCount + 1

                })
              }

            }

//               console.log(data.data)
          }

        }
      })


    },


})