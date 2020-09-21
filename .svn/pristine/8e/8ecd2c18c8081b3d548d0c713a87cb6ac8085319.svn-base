// pages/forum/reply/reply.js

const app = getApp()
import decound from '../../../utils/decound.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    write: '',  //描述
    houseImg: [],  //添加的图片
    id: 0,
    isShow: false, //上传图片是否好使
    current:'',
    urls:[],
    flg:false,
  },

  // 监听描述
  bindWrite(e){
    this.setData({
      write: e.detail.value.replace(/\s+/g, '')
    })
  },
  // 上传图片
  uploadImage:function(e){
    wx.chooseImage({
      count: 9,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],    
      success:(res)=> {
        var imgs = res.tempFilePaths;
        if(imgs.length > 9){
          wx.showToast({
            title: '最多上传九张图片',
          })
          return false;
        }
        for (var i = 0; i < imgs.length; i++) {        
          this.uploadSignle(imgs[i])
        }
      },
   });
  },
  // 请求上传图片接口
  uploadSignle: function(file) {
    wx.uploadFile({
      url: app.globalData.newurl +'/api/v1/common/upload',
      formData: {
        access_token: app.getaccess_token(),
        timestamp: app.gettimestamp(),
        uid: app.globalData.uid + "",
      },
      filePath:file,
      name:'file',
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      success: res=>{
        const data = res.data
        let obj = JSON.parse(data)
        console.log(obj)
        if(obj.status == '10001'){
          const oldImg = this.data.houseImg;
          if(this.data.houseImg.length<9){//上传9张
            oldImg.push(obj.data)
            this.setData({
              houseImg: oldImg
            })
          }else{
            // this.message("最多只能选择9个图片")
              wx.showToast({
                title:'图片不超过9张',
              })
          }

          // oldImg.push(obj.data)
          //  this.setData({
          //    houseImg:oldImg
          //  })
        }else{
          console.log(obj.message)
        }
      }
    })
  },

  // 长按图片删除
deleteImage:function(e){
  console.log(e)
  var that = this;
  var images = that.data.houseImg;
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
      houseImg:images
    });
   }
  })

},
  // 查看票面
  ckpm:function(event){
    console.log(event)
    var url = e.currentTarget.dataset.url;
    var urls = [e.currentTarget.dataset.url];
    wx.previewImage({
      current: url,
      urls: urls,
    })
  },

  // 发表
  send:decound.throttle(function(){
    if(this.data.write == null || this.data.write == ""){
      this.message('内容不能为空')
    }else{
        wx.request({
          url: app.globalData.newurl + '/api/v1/bbs/store',
          data: {
            access_token: app.getaccess_token(),
            timestamp: app.gettimestamp(),
            uid: app.globalData.uid + "",
            token: app.globalData.token,
            type:1,
            content: this.data.write,
            title: '',
            images: JSON.stringify(this.data.houseImg || []),
            bid: this.data.id
          },
          method: 'POST',
          header: {
            'content-type': 'application/json'
          },
          success: res=>{
            wx.redirectTo({
              url: '/pages/forum/forum?id=' + this.data.id,
            })
          }
        })
    }
  },1000),



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
    this.setData({
      id: options.id
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