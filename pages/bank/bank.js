// pages/bank/bank.js

var app = getApp();
var util = require("../../utils/util.js");
var province = (util.province || []).map(v => {
  return v.title
});
// 获取到的province["上海市", "江苏省", "浙江省", "安徽省", "北京市", "重庆市", ...]
var city = ((util.city || []).filter(v => { return v.parent_code == "bj" }) || []).map(v => {
  return v.title
});

Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: ['工商银行',
      '农业银行',
      '中国银行',
      '建设银行',
      '国家开发银行',
      '中国进出口银行',
      '中国农业发展银行',
      '交通银行',
      '中信银行',
      '光大银行',
      '华夏银行',
      '民生银行',
      '广发银行',
      '平安银行',
      '招商银行',
      '兴业银行',
      '浦发银行',
      '恒丰银行',
      '浙商银行',
      '渤海银行',
      '徽商银行',
      '重庆三峡银行',
      '上海农商银行',
      '邮政储蓄银行',
      '其他银行'],
    objectArray: [
      {
        id: 0,
        name: '美国'
      },
      {
        id: 1,
        name: '中国'
      },
      {
        id: 2,
        name: '巴西'
      },
      {
        id: 3,
        name: '日本'
      }
    ],
    index: 0,
    region: ['全部', '全部'],
    customItem: '全部',
    bank_name:'',
    //给一个默认值
    p_c: [["北京"], ["北京"]],
    //对应的数组下标 eg: pcIndex[1,2]指的是 p_c[0][1] 省的名称 和 p_c[1][2] 市的名称
    pcIndex: [0, 0],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.p_c[0] = province
    this.data.p_c[1] = city

    //初始化p_c

    this.setData({ p_c: this.data.p_c })
    //console.log(this.data.p_c)
  
  },
  pkIndex: function (e) {
   // console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      pcIndex: e.detail.value
    })
  },
  pkCol: function (e) {
    //console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    var data = {
      p_c: this.data.p_c,
      pcIndex: this.data.pcIndex
    };

    //如果选择省则区的数组会变
    if (e.detail.column == 0) {
      //code默认值为上海
      var code = "sh";
      // 获取我们选择省所对应的code
      (util.province || []).some(v => {
        if (v.title == province[e.detail.value]) {
          code = v.code
          // if选择北京 则code值变为 "bj" 并返回true
          return true
        }
        return false
      });
      // 选取parent_code为"bj"的所有区 把所有区的title放到一个city数组里面

      var city = ((util.city || []).filter(v => { return v.parent_code == code }) || []).map(v => {
        return v.title
      });
      //把区的变化和下标的变化设置data里就ok
      data.p_c[1] = city
      data.pcIndex[0] = e.detail.value
    } else {
      data.pcIndex[1] = e.detail.value;
    }
    this.setData(data)
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
  
  },
  bindPickerChange:function(e){
    this.setData({
      index: e.detail.value
     
    })

  },
 bindRegionChange: function (e) {
    
    this.setData({
      region: e.detail.value
    })
  //  console.log(this.data.region)
  },
 EventHandle: function (e) {

   this.setData({
     bank_name: e.detail.value
   })
   //console.log(this.data.bank_name)
 },
 getinfor:function(){

   wx.showLoading();


    var that = this;


    //console.log(that.data.p_c[0][that.data.pcIndex[0]]+"..................................");

    //console.log(that.data.p_c[1][that.data.pcIndex[1]] + "..................................");
   
     wx.request({
       url: getApp().globalData.url+'/wentidehh.html',
       data: {
         page: 1,
         bank_num: that.data.array[that.data.index],
         bank_province: that.data.p_c[0][that.data.pcIndex[0]],
         bank_city: that.data.p_c[1][that.data.pcIndex[1]],
      
         bank_name: that.data.bank_name
       },
       method: 'GET',
       header: {
         'content-type': 'application/json'
       },
       success: function (res) {

         wx.hideLoading()
//         console.log(res.data)
         if (res.data.result == 'true'){

           var array = JSON.stringify(res.data.data);

//           console.log(that.data.p_c[0][that.data.pcIndex[0]])

           wx.navigateTo({
             url: 'bankdetail/detail?array=' + array + "&bank_num=" + that.data.array[that.data.index]
             + "&bank_province=" + that.data.p_c[0][that.data.pcIndex[0]]
             + "&bank_city=" + that.data.p_c[1][that.data.pcIndex[1]]
        
             + "&bank_name=" + that.data.bank_name
           })
         }else{
           wx.showModal({            
             content: res.data.msg,
             showCancel: false,
             success: function (res) {
               if (res.confirm) {
//                 console.log('用户点击确定')
               }
             }
           })
         }
         

       }
     })




   
   


 }
})