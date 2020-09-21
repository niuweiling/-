var app = getApp();
var isLoad = false;

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		tipsshow: "", //热门奇特搜索集
		tipsshow2: "none", //企业关键字搜索结果集
		tipsshow3: "none", //授信申请
		tipsshow4: "none", //搜索历史
		business: [],
		cachetarry: [],
		hisCompany: null,
		searchClose: 'none',
		inputValue: '',
		offset: 0,
		limit: 10,
		pageSize: 10,
		islastpage: false,
		currentPage: 1
	},

	checklogin: function() {
		// console.log("app.globalData.uid:" + app.globalData.uid);
		if (app.globalData.uid == '') {
			wx.showModal({
				title: '提示',
				content: "您尚未登录是否跳转登录",
				success: function(res) {

					if (res.confirm) {
						// console.log('用户点击确定')
						wx.navigateTo({
							url: '/pages/my/mylogin/mylogin'
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

	details: function(e) {
		//缓存删除和增加
		var keyword = e.currentTarget.dataset.name;
		var url = e.currentTarget.dataset.url;
		var keywords = {};
		keywords.name = keyword;
		keywords.url = url;
		var that = this;
		if (that.checklogin()) {
			return
		}
		wx.navigateTo({
			url: '../details/details?url=' + url.replace('?', '***').replace('=', '###')
		})
		var cachetarry = wx.getStorageSync('cachetarry') == "" ? [] : wx.getStorageSync('cachetarry')
		// console.log("删除后:" + cachetarry)
		var validate = true;
		//判断是否有此数据
		for (var i = 0; i < cachetarry.length; i++) {
			if (keyword == cachetarry[i].name) {
				validate = false;
				continue;
			}
		}
		if (validate) {
			cachetarry.push(keywords);
		}
		// console.log(cachetarry);
		wx.setStorageSync('cachetarry', cachetarry)
		this.setData({
			cachetarry: cachetarry,
			tipsshow4: ""
		})
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {
		var hisCompany = options.hisCompany;
		this.setData({
			hisCompany: JSON.parse(hisCompany.split('http').join('https').split('***').join('?').split('###').join('='))
		});
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function() {
		//缓存删除和增加
		var cachetarry = wx.getStorageSync('cachetarry') == "" ? [] : wx.getStorageSync('cachetarry')
		if (cachetarry.length > 0) {
			this.setData({
				tipsshow4: "",
				cachetarry: cachetarry
			})
		}
	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function() {
		isLoad = false;
	},

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
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh: function() {
		console.log('监听用户下拉动作')
		// 隐藏导航栏加载框  
		wx.hideNavigationBarLoading();
		// 停止下拉动作  
		wx.stopPullDownRefresh();
	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function() {
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
			that.getbusiness();
		}
	},

	getMinPageAndMaxPageNum: function(inowpage) {
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
	// onShareAppMessage: function () {

	// },
	searchClose: function() {
		isLoad = false;
		this.setData({
			tipsshow: '',
			tipsshow2: 'none',
			tipsshow3: 'none',
			inputValue: '',
			searchClose: 'none'
		})
	},

	/**
	 * input监听取值搜索 
	 */
	bindinputValue: function(res) {

		var that = this;

		// console.log(res.detail.value);

		var Keyword = res.detail.value;


		if (Keyword == '') {
			//  console.log("Keyword is not null");

			that.setData({
				tipsshow: '',
				tipsshow2: 'none',
				tipsshow3: 'none',
				searchClose: 'none',
				inputValue: Keyword,
				business: [],
				offset: 0,
				limit: 10,
				currentPage: 1
			})
			isLoad = false;
			return;


		} else {
			that.setData({
				searchClose: '',
				inputValue: Keyword,
				offset: 0,
				limit: 10,
				business: [],
				currentPage: 1
			})
		}

		that.getbusiness();




	},
	keyword: function() {
		wx.navigateTo({
			url: '../keywors/keyword',
		})
	},
	getbusiness: function() {
		wx.showLoading()
		var that = this;
		wx.request({
			url: app.globalData.url + '/home_getbusiness.html',
			data: {
				access_token: app.getaccess_token(),
				timestamp: app.gettimestamp(),
				Keyword: that.data.inputValue,
				offset: that.data.offset,
				limit: that.data.limit,
			},
			method: 'GET',
			header: {
				'content-type': 'application/json'
			},
			success: function(res) {
				//  console.log("返回:" + res)
				wx.hideLoading()
				var data = res.data;
				if (data.status == '1') {
					isLoad = true;
					that.setData({
						tipsshow: 'none',
						tipsshow2: '',
						tipsshow3: 'none',
					})

					var business = JSON.parse(JSON.stringify(data.data));

					var array_list = that.data.business;

					console.log('返回信息的个数:' + business.length)

					for (var i = 0; i < business.length; i++) {
						array_list.push(business[i]);
					}

					var array = JSON.stringify(array_list);

					that.setData({
						business: JSON.parse(array)
					})
					isLoad = true;


					if (business.length < that.data.pageSize) {
						that.setData({
							islastpage: true //设置是最后一页
						})

						wx.showToast({
							title: '没有更多数据了',
						})

						return;
					} else {
						that.setData({
							islastpage: false //设置是最后一页
						})
					}



				} else {



					console.log(that.data.business.length + ",,,,,,111111111111111111111111111")
					if (that.data.business <= 0) {
						that.setData({
							tipsshow: 'none',
							tipsshow2: 'none',
							tipsshow3: '',
							business: [],
							isLoad: false,
							islastpage: true //设置是最后一页

						})
					} else {

						wx.showToast({
							title: '没有更多数据了',
						})

						that.setData({
							isLoad: true,
							islastpage: true //设置是最后一页
						})

					}

				}

			}
		})
	},



	/**
	 * 清空历史记录
	 */
	clearCache: function() {

		var cachetarry = [];

		this.setData({
			cachetarry: cachetarry,
			tipsshow4: "none"
		})


		wx.setStorageSync('cachetarry', cachetarry)
	},
	delcache: function(e) {


		//console.log(e.currentTarget.dataset.name)

		//缓存删除和增加

		var keyword = e.currentTarget.dataset.name;

		var cachetarry = wx.getStorageSync('cachetarry') == "" ? [] : wx.getStorageSync('cachetarry')

		for (var i = 0; i < cachetarry.length; i++) {
			if (keyword == cachetarry[i].name) {
				cachetarry.splice(i, 1)
				continue;
			}
		}


		this.setData({
			cachetarry: cachetarry
		})

		wx.setStorageSync('cachetarry', cachetarry);
		if (cachetarry.length <= 0) {
			this.setData({

				tipsshow4: "none"
			})

		}

	},
	/**
	 * 授信申请
	 */

	tapapply: function() {

		var that = this;
		if (that.checklogin()) {

			return;

		};


		wx.navigateTo({
			url: "../apply/apply"
		})

	},
	checklogin: function() {
		//console.log("app.globalData.uid:" + app.globalData.uid);
		if (app.globalData.uid == '') {




			wx.showModal({
				title: '提示',
				content: "您尚未登录是否跳转登录",
				success: function(res) {

					if (res.confirm) {
						//console.log('用户点击确定')
						wx.navigateTo({
							url: '../../my/mylogin/mylogin'
						})
					} else if (res.cancel) {
						//console.log('用户点击取消')
					}


				}
			})

			return true;
		}
		return false;
	},
})
