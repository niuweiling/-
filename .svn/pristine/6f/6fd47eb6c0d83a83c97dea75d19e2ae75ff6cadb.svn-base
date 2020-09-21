// pages/forum/picture/picture.js
const app=getApp();
import decound from '../../../utils/decound.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '', //标题
    write: '',  //描述
    chooseUrl: [],  //添加的图片
    isShow: false //上传图片是否好使
  },

  // 监听标题
  bindTitle(e){
    this.setData({
      title: e.detail.value.replace(/\s+/g, '')
    })
  },

  // 监听描述
  bindWrite(e){
    this.setData({
      write: e.detail.value.replace(/\s+/g, '')
    })
  },

  // 上传图片
  handleChoose(){
    wx.chooseImage({
      count: 9,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (res)=> {
        let tempFilePaths = res.tempFilePaths;
        console.log(tempFilePaths.length)
        if(tempFilePaths.length > 9){
          this.setData({
            isShow:false
          })

          // for(let i = 0; i < tempFilePaths.length; i++){
          //   this.uploadSignle(tempFilePaths[i])
          // }
        //   this.message("图片不能为空单次上次小于9张")
        //   wx.showToast({
        //     title:'图片不能大于9张!',
        // })
        }else{
           for(let i = 0; i < tempFilePaths.length; i++){
            this.uploadSignle(tempFilePaths[i])
          
          }
        
        }
        
      }
    })
  },
  // 请求上传图片接口
  uploadSignle: function (file) {
    console.log(file)
    wx.uploadFile({
      url: app.globalData.newurl + '/api/v1/common/upload',
      formData: {
        access_token: app.getaccess_token(),
        timestamp: app.gettimestamp(),
        uid: app.globalData.uid+"",
      },
      filePath: file,
      name: 'file',
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      success: res => {
        const data = res.data
        let obj = JSON.parse(data)
        console.log(obj)
        if (obj.status == '10001') {
          const oldImg = this.data.chooseUrl;
          console.log(oldImg)
          if(this.data.chooseUrl.length<9){//上传9张
            oldImg.push(obj.data)
            this.setData({
              chooseUrl: oldImg
            })
          }else{
            
            wx.showToast({
              title:'图片不超过9张',
           })
            
          }

          // console.log(this.data.chooseUrl.length)
          //  oldImg.push(obj.data)
          // this.setData({
          //   chooseUrl: oldImg
          // })
         
        } else {
        //   this.message("最多只能选择9个图片")
        //   wx.showToast({
        //     title:'图片不能大于9张!',
        //  })
          console.log(obj.message)
        }
      }
    })
  },
// 长按图片删除
deleteImage:function(e){
  console.log(e)
  var that = this;
  var images = that.data.chooseUrl;
  var index = e.currentTarget.dataset.index;//获取当前长按图片下标
  wx.showModal({
   title: '提示',
   content: '确定要删除此图片吗？',
   success: function (res) {
    if (res.confirm) {
     console.log('点击确定了');
     images.splice(index, 1);
    } else if (res.cancel) {
      console.log('点击取消了');
      return false;    
     }
    that.setData({
     chooseUrl:images
    });
   }
  })

},

  // 发布
  bindSend:decound.throttle(function(){
    if(this.data.title == null || this.data.title == ""){
      this.message('标题不能为空')
    }else if(this.data.write == null || this.data.write == ""){
      this.message("描述不能为空")
    }else if(this.data.chooseUrl == null || this.data.chooseUrl == ""){
      this.message("图片不能为空")
    }else{
      wx.request({
        url: app.globalData.newurl + '/api/v1/bbs/store',
        data: {
          access_token: app.getaccess_token(),
          timestamp: app.gettimestamp(),
          uid: app.globalData.uid+"",
          token: app.globalData.token,
          title: this.data.title,
          content: this.data.write,
          images: JSON.stringify(this.data.chooseUrl || []),
          bid: "",
          type: 1
        },
        method: 'POST',
        header: {
          'content-type': 'application/json'
        },
        success: res => {
          console.log(res)
          if (res.data.status == '10001') {
            wx.reLaunch({
              url: '/pages/shouye/index/index',
            })
          } else {
            console.log(res.data.message)
          }
        }

      })
    }
  },1000),

  // 查看票面
  ckpm(e){
    console.log(e)
    const url = e.currentTarget.dataset.url;
    console.log(url)
    const urls = [e.currentTarget.dataset.url];
    console.log(urls)
    wx.previewImage({
      url: url,
      urls: urls,
    })
  },

  // 弹框封装
  message: function(message){
    wx.showModal({
      title: '提示',
      content: message,
      success: res => {

      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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

  }
})