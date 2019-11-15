function getUserInfo(that,cb) {


  console.log('获取用户信息。')
  return new Promise(function(resolve,reject){
    wx.showLoading()
    //wx.getuserinfo接口不再支持
    wx.getSetting({
      success: (res) => {
        //判断用户已经授权。不需要弹框
        if (res.authSetting['scope.userInfo']) {
          
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              that.setData({
                showModel: 'none',
                showModel2:''
              })
              wx.setStorageSync('cacheuserInfo', res.userInfo);
              console.log(res.userInfo)

              typeof cb == "function" && resolve(cb(true));

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (that.userInfoReadyCallback) {
                that.userInfoReadyCallback(res)
              }
            }
          })
          
          
        } else {//没有授权需要弹框
          that.setData({
            showModel: '',
            showModel2: 'none'
          })
          reject(new Error('未授权'));
          
          
        }

        wx.hideLoading()
      },
      fail: function () {
        wx.showToast({
          title: '系统提示:网络错误',
          icon: 'warn',
          duration: 1500,
        })
        wx.hideLoading()
        reject(new Error('网络错误'));
        
      }
    })
      
  })
  
 
}



module.exports = {
  getUserInfo: getUserInfo
}