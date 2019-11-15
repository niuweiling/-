//app.js  
// 这里是调用公共函数库  
var util = require('./utils/util.js');
var utilMd5 = require('./utils/md5.js');

App({
 
  /**  
  * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）                                                                                                                                 
  */
  onLaunch: function (options) {

    // 调用API从本地缓存中获取数据  
    var that = this
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs);


    
    var user = wx.getStorageSync('user') == "" ? [] : wx.getStorageSync('user')
    if (user.length > 0) {
      that.globalData.uid = user[0];
      that.globalData.token = user[1];
      console.log('user：' + user[0] + ",user[1]:" + user[1]);

    }

    

   // console.log(wx.getStorageSync('userInfo'))

  },

  /**  
  * 当小程序启动，或从后台进入前台显示，会触发 onShow  
  */
  onShow: function (options) {
    var that = this;
    that.checkMobilePhone();
    var openid = wx.setStorageSync('cacheopenid', openid);
    if (openid == '' || openid == null || Object.prototype.toString.call(openid) === '[object Undefined]'){
      that.getLogin();
    }

  


    // //获取用户信息  
    // that.getUserInfo(function (userInfo) {
    //   // 判断场景是否是从公众号进入（这里的意思是如果用户从公众号的自定义菜单进入的话且参数sid为1的话触发什么方法）  
    //   // 获取场景值在onLaunch方法中也可以获取到，但是呢由于业务要求我们的这个方法需要用户进入就会触发  
    //   // 各位可以根据需求去决定在哪里获取合适一些,onLaunch是小程序未关闭的情况下只执行一次,所以各位一定要考虑清楚  
    //   if (scenes === 1035 && sid === 1) {
    //     // 这里是从什么场景下要执行的方法  
    //   }
    // })
  },
  checkMobilePhone: function () {
    var self = this;
    wx.getSystemInfo({
      success: function (e) {
        var a = e.model;
        if (a.search("iPhone X") != -1 || a.search("iPhone XS") != -1) {//找到
          self.globalData.isIPhoneX = true;
        } else {
          self.globalData.isIPhoneX = false
        }
        console.log(self.globalData.isIPhoneX);
      }
    })
  },

  getLogin: function(){




    console.log("获取用户id:..........................................")
    var that = this;
    wx.login({
      success: function (res) {

        // 登录成功  
        // 在这里登录的时候会返回一个登录凭证，以前是发送一次请求换一个，现在好像是登录凭证有5分钟的有效时间  
        // 从这种情况来看微信小程序的发展还是不错的，以前估计没多少人访问，现在访问量上去后后台的布局都重新架构了  
        var code = res.code// 登录凭证  

       

        wx.request({
          url: getApp().globalData.url + '/jscode2session.html',
          data: {
            code: code
          },
          method: 'GET',
          header: {
            'content-type': 'application/json'
          },
          success: function (res) {

            var openid = res.data.openid //返回openid
            that.globalData.openid = openid;

            wx.setStorageSync('cacheopenid', openid);

            console.log('openid:'+openid)

            return openid;
          

          }
        })


      }

    }) ;  

  },

  /**  
  * 获取用户信息  
  */
  getUserInfo: function () {

    var that = this

    if (this.globalData.userInfo) {

      wx.setStorageSync('cacheuserInfo', this.globalData.userInfo);

      console.log('getUserInfo.....true')

    } else {
      console.log('getUserInfo.....false,登录接口')

          // 获取用户信息  
          wx.getUserInfo({
            success: function (res2) {
              that.globalData.userInfo = res2.userInfo
              console.log(res2.userInfo)
              wx.setStorageSync('cacheuserInfo', res2.userInfo);

            },

            // 这里是点击拒绝触发的方法  
            fail: function (res2) {
             
              wx.openSetting({
                success: (res) => {
                
                  if (res.authSetting["scope.userInfo"]) {
                   
                    that.getUserInfo()
                  }
                }
              })
            }
          })
    }
  },
  getaccess_token:function(){

    var access_token = utilMd5.hexMD5("cpiaoju^#^^-^" + this.gettimestamp());

    return access_token;
   


  },
  gettimestamp:function(){
    var timestamp = Date.parse(new Date());
    timestamp = timestamp / 1000;
    
    return timestamp;

  },

  setUid: function (uid, token){

    this.globalData.uid = uid;
    this.globalData.token = token;
    //清空缓存
    var user = [];
    wx.setStorageSync('user', user);
    //重新缓存新对象
    user[0] = uid;
    user[1] = token;

    wx.setStorageSync('user', user);

  },

  message: function (message) {

    wx.showModal({
      title: '提示',
      content: message,
      success: function (res) {

      }
    })


  },

  /**  
  * 全局变量配置（在这里放一些常量和配置文件，如果公共参数多的话大家也可以去重新布局一个文件，在里面进行设置）  
  */
  globalData: {
    // userInfo: null,
    openid:'',
    uid:'',
    token:'',
    cdharray :[],//承兑行类型
    role:1,
    //url: 'http://117.122.211.252:8088/billMate',//测试服务器
    url: 'https://pay.cpiaoju.com',//正式服务器
    newurl:'http://test.cpiaoju.com:8082/',
    //url: 'http://127.0.0.1:8095/billMate',

   isIPhoneX:false

   
  }
})



