// pages/shouye/index/index.js
const app = getApp();
let user = require("../../../utils/user.js");
import NIM from '../../../plugin/NIM_Web_NIM_miniapp_v7.8.1.js';
Page({
  /* 页面的初始数据*/
  data: {
    avatar: "",
    name: "",
    openid: "",
    hisCompany: {},
    news: [],
    offset: 0, //票友论坛请求数据的页码
    forumList: [], //票友论坛请求到的数据
    forumId: 0,
    istrue: false,//点赞
    color: '/images/index/12.png',
    iscolor: '/images/index/13.png',
    flag: true
    // favorite_count: 0
  },
  /*生命周期函数--监听页面加载*/
  onLoad: function(options) {
    if (app.globalData.uid == '' || app.globalData.token == '') {
      wx.switchTab({
        url: '/pages/my/my',
      })
    } else {

    }
  },
  onShow: function() {
    this.setData({
      offset:0
    });
    // 自定义tabBar
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 0
      })
    }
    let nim = NIM.getInstance({
      debug: false, // 是否开启日志，将其打印到console。集成开发阶段建议打开。
      appKey: 'b5f2c765c9c9de16d0783c63e118ad73',
      account: app.globalData.uid,
      token: app.globalData.token,
      db: true, //若不要开启数据库请设置false。SDK默认为true。
    });
    var that = this;
    wx.request({
      url: app.globalData.newurl + 'api/v1/bbs/list',
      data: {
        access_token: app.getaccess_token(),
        timestamp: app.gettimestamp(),
        uid: app.globalData.uid + "",
        token: app.globalData.token,
        id: '',
        type: '',
        offset: this.data.offset,
        limit: 5
      },
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      success: res => {
        const data = res.data
        if (res.data.status == '10001') {
          const list = res.data.data;
          console.log('onShow请求：',res.data.data)
          for (let i in list) {
            nim.getUser({
              account: list[i].uid,
              done: function(error, user) {
                list[i].name = user.nick ? user.nick : '默认';
                list[i].avatar = user.avatar ? user.avatar : '/images/forum/default.png';
                list[i].istrue = false;
                that.setData({
                  forumList: list
                })
              }
            })
          }
          this.setData({
            forumList: list
          })
          console.log('onShow Data中', that.data.forumList)
        } else {
          console.log(data.message)
        }
      }
    })

    wx.request({
      url: app.globalData.url + '/home_gethome.html',
      data: {
        access_token: app.getaccess_token(),
        timestamp: app.gettimestamp()
      },
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: function(res) {
        var data = res.data;
        if (data.status == '1') {
          that.setData({
            hisCompany: data.data.his_company
          })
        }
      }
    });

    // 请求热点时讯数据
    wx.request({
      url: getApp().globalData.url + '/wentipjzx.html',
      data: {
        page: 1
      },
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: res => {
        wx.hideLoading()
        if (res.data.result == 'true') {
          this.setData({
            news: res.data.data
          })
        } else {
          wx.showModal({
            content: res.data.msg,
            showCancel: false,
            success: function(res) {
              if (res.confirm) {
                //                console.log('用户点击确定')
              }
            }
          })
        }
      }
    })
  },

  /* 页面相关事件处理函数--监听用户下拉动作 */
  onPullDownRefresh: function() {
    this.setData({
      offset:0
    });
    let nim = NIM.getInstance({
      debug: false, // 是否开启日志，将其打印到console。集成开发阶段建议打开。
      appKey: 'b5f2c765c9c9de16d0783c63e118ad73',
      account: app.globalData.uid,
      token: app.globalData.token,
      db: true, //若不要开启数据库请设置false。SDK默认为true。
    });
    if (app.globalData.uid == '' || app.globalData.token == '') {
      wx.switchTab({
        url: '/pages/my/my',
      })
    } else {
      let offset = this.data.offset;
      var that = this;
      wx.request({
        url: app.globalData.newurl + 'api/v1/bbs/list',
        data: {
          access_token: app.getaccess_token(),
          timestamp: app.gettimestamp(),
          uid: app.globalData.uid + "",
          token: app.globalData.token,
          id: '',
          type: '',
          offset: offset,
          limit: 5
        },
        method: 'POST',
        header: {
          'content-type': 'application/json'
        },
        success: res => {
          const data = res.data
          if (res.data.status == '10001') {
            const list = res.data.data;
            console.log('下拉刷新请求的数据', list)
            for (let i in list) {
              nim.getUser({
                account: list[i].uid,
                done: function(error, user) {
                  list[i].name = user.nick ? user.nick : '默认';
                  list[i].avatar = user.avatar ? user.avatar : '/images/forum/default.png';
                  list[i].istrue = false;
                  that.setData({
                    forumList: list
                  })
                }
              })
            }
            this.setData({
              forumList: list
            }),
            console.log('下拉刷新之后data中的数据',this.data.forumList)
          } else {
            console.log(data.message)
          }
        }
      })
      // this.forumRequest(5)
    }
  },

  // 触底加载
  onReachBottom: function() {
    let nim = NIM.getInstance({
      debug: false, // 是否开启日志，将其打印到console。集成开发阶段建议打开。
      appKey: 'b5f2c765c9c9de16d0783c63e118ad73',
      account: app.globalData.uid,
      token: app.globalData.token,
      db: true, //若不要开启数据库请设置false。SDK默认为true。
    });
    let offset = this.data.offset + 1;
    this.setData({
      offset: offset
    })
    console.log('offset',offset)
    var that = this;
    wx.request({
      url: app.globalData.newurl + 'api/v1/bbs/list',
      data: {
        access_token: app.getaccess_token(),
        timestamp: app.gettimestamp(),
        uid: app.globalData.uid + "",
        token: app.globalData.token,
        id: '',
        type: '',
        offset: this.data.offset,
        limit: 5
      },
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      success: res => {
        const data = res.data
        if (res.data.status == '10001') {
          const list = res.data.data;
          console.log('触底加载请求的数据：', list)
          let oldList = this.data.forumList;
          oldList.push(...list);
          console.log('数据增加的数组：', oldList)
          that.setData({
            forumList: oldList
          }),
          console.log(that.data.forumList)
          let forumList = this.data.forumList;
          for (let i in oldList) {
            nim.getUser({
              account: forumList[i].uid,
              done: function(error, user) {
                oldList[i].name = user.nick ? user.nick : '默认';
                oldList[i].avatar = user.avatar ? user.avatar : '/images/forum/default.png';
                oldList[i].istrue = false;
                that.setData({
                  forumList: oldList
                })
              }
            })
          }
          this.setData({
            forumList: oldList
          })
          console.log('触底之后的data数据', this.data.forumList)
        } else {
          console.log(data.message)
        }
      }
    })
  },

  // --------------------------------------------  操作  ------------------------------------------------------------------
  // 跳转到搜索页
  search: function() {
    var hisCompany = JSON.stringify(this.data.hisCompany);
    // console.log(hisCompany.split('?').join('***').split('=').join('###'))
    var that = this;
    if (that.checklogin()) {
      return
    }
    wx.navigateTo({
      url: '/pages/shouye/search/search?hisCompany=' + hisCompany.split('?').join('***').split('=').join('###')
    })
  },
  // 跳转到贴现计算器
  tapcal: function() {
    var that = this;
    if (that.checklogin()) {
      return;
    };
    wx.navigateTo({
      url: "/pages/cal/cal"
    })

  },
  // 跳转到票据课堂
  tapclass: function() {
    var that = this;
    if (that.checklogin()) {
      return;
    };
    wx.navigateTo({
      url: "/pages/class/class"
    })
  },
  // 跳转到乐享计算器
  tapcounter: function() {
    var that = this;
    if (that.checklogin()) {
      return;
    };
    wx.navigateTo({
      url: '/pages/counter/counter',
    })
  },
  // 跳转到汇票收藏
  taphpsc: function() {
    var that = this;
    if (that.checklogin()) {
      return;
    };
    wx.navigateTo({
      url: "/pages/shouye/hpsc/hpsc"
    })
  },
  // 名片分享
  gocard: function() {
    var that = this;
    if (that.checklogin()) {
      return;
    };
    user.getUserInfo(this, function(res) {
      console.log('res的值：' + res)
      if (res) {
        var openid = wx.getStorageSync('cacheopenid')
        console.log(openid)
        wx.showLoading()
        wx.request({
          url: getApp().globalData.url + '/getwentimpbj.html',
          data: {
            uid: openid
          },
          method: 'GET',
          header: {
            'content-type': 'application/json'
          },
          success: function(res) {
            wx.hideLoading()
            var data = res.data;
            if (data.result == 'true') {
              wx.navigateTo({
                url: '/pages/card/card?from=card'
              })
            } else {
              wx.navigateTo({
                url: '/pages/card/carddetail/carddetail?from=index'
              })

            }
          }
        })
        return;
      }
    }).then(function() {}, function(error) {
      that.setData({
        showModel: '',
        showModel2: 'none'
      })
    })
  },

  // 跳转到大额行号
  tapbank: function() {
    var that = this;
    if (that.checklogin()) {
      return;
    };
    wx.navigateTo({
      url: '/pages/bank/bank',
    })
  },
  // 跳转到汇票收藏
  tapapply: function() {
    var that = this;
    if (that.checklogin()) {
      return;
    };
    wx.navigateTo({
      url: "/pages/shouye/apply/apply"
    })
  },
  // 跳转到shibor
  tapshibor: function() {
    var that = this;
    if (that.checklogin()) {
      return;
    };
    wx.navigateTo({
      url: '/pages/shibor/shibor',
    })
  },
  // 跳转到热点时讯
  tapnews: function() {
    var that = this;
    if (that.checklogin()) {
      return;
    };
    wx.navigateTo({
      url: '/pages/news/news',
    })
  },

  // 点赞
  zan: function(e) {
    var that=this;
    let id = e.currentTarget.dataset.id;
    let index = e.currentTarget.dataset.index;
    let favoritecount = e.currentTarget.dataset.favoritecount;
    let forumList = this.data.forumList;
    forumList[index]["istrue"] = true;
    that.setData({
      forumList: forumList
    })
    setTimeout(res => {
      forumList[index]["istrue"] = false
      that.setData({
        forumList: forumList
      })
      clearTimeout()
    }, 500);
    wx.request({
      url: app.globalData.newurl + '/api/v1/bbs/focus',
      data: {
        access_token: app.getaccess_token(),
        timestamp: app.gettimestamp(),
        uid: app.globalData.uid + "",
        token: app.globalData.token,
        type: 3,
        rid: id,
      },
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      success: res => {
        console.log(res)
        if (res.data.data.status == '1') {
          forumList[index]['favorite_count'] = parseInt(favoritecount) + 1;
          this.setData({
            forumList: forumList,
            // istrue:true
          });
          // this.setData({
          //   favorite_count: res.data.data.count
          // })
        } else {
          console.log(res.data.message)
        }
      }
    })
  },


  // 跳转到论坛
  forum(e) {
    var that = this;
    if (that.checklogin()) {
      return;
    };
    this.setData({
      forumId: e.currentTarget.dataset.id
    })
    wx.navigateTo({
      url: '/pages/forum/forum?id=' + this.data.forumId,
    })
    // wx.na({
    //   url: '/pages/forum/forum?id=' + this.data.forumId,
    // })
  },

  // 查看大图
  // ckpm: function(event) {
  //   console.log(event)
  //   var url = event.currentTarget.dataset.url; //获取data-src
  //   var urls = [event.currentTarget.dataset.url]
  //   console.log(url, urls)
  //   //图片预览
  //   wx.previewImage({
  //     current: url, // 当前显示图片的http链接
  //     urls: urls // 需要预览的图片http链接列表
  //   })
  // },




  // ------------------------------------------------------  请求 ----------------------------------------------------------
  // 检查是否登录
  checklogin: function() {
    if (app.globalData.uid == '' || app.globalData.token == '') {
      wx.showModal({
        title: '提示',
        content: "您尚未登录是否跳转登录",
        success: function(res) {
          if (res.confirm) {
            // console.log('用户点击确定')
            wx.switchTab({
              url: '/pages/my/my'
            })
          } else if (res.cancel) {
            //  console.log('用户点击取消')
          }
        }
      })
      return true;
    }
    return false;
  },

  // 请求票友论坛
  forumRequest: function(limit) {
    let offset = this.data.offset;
    var that = this;
    wx.request({
      url: app.globalData.newurl + 'api/v1/bbs/list',
      data: {
        access_token: app.getaccess_token(),
        timestamp: app.gettimestamp(),
        uid: app.globalData.uid + "",
        token: app.globalData.token,
        id: '',
        type: '',
        offset: offset,
        limit: limit
      },
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      success: res => {
        const data = res.data
        if (res.data.status == '10001') {
          const list = res.data.data;
          console.log(list)
          // let oldList = this.data.forumList;
          // oldList.push(...list);
          let forumList = this.data.forumList;
          // let a=forumList.favorite_count;
          this.setData({
            forumList: list
          }),
          // console.log(json)
          console.log(that.data.forumList)
          // for (let i in forumList) {
          //   nim.getUser({
          //     account: forumList[i].uid,
          //     done: function(error, user) {
          //       forumList[i].name = user.nick ? user.nick : '默认';
          //       forumList[i].avatar = user.avatar ? user.avatar : '/images/forum/default.png';
          //       forumList[i].istrue = false;
          //       that.setData({
          //         forumList: forumList
          //       })
          //     }
          //   })
          // }
          // console.log("res", res)
        } else {
          console.log(data.message)
        }
      }
    })
  },

  message: function(message) {
    wx.showModal({
      title: '提示',
      content: message,
      success: function(res) {

      }
    })
  },

  /*生命周期函数--监听页面初次渲染完成*/
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */




  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },


  

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})