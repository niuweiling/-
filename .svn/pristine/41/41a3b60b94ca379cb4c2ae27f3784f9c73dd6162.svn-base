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
		showView1: false, //上传
		selectPerson: true,
		selectArea: false,
		time: 0,
		title: '全部',
		draft_type: 0,
		offset: 0,
		limit: 5,
		pageSize: 5,
		currentPage: 1,
		collectlist: [],
		drafttype: ['yellow', 'blue', 'h7', 'h8'],
		isinfomation: true,
		Height: parseInt(wx.getSystemInfoSync().windowHeight - 60),
		searchvlue: '',
		collectlist2: null,
		searchView: '',
		searchClose: 'none',
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {
		showView: (options.showView == "true" ? true : false);
		showView1: (options.showView1 == "true" ? true : false);





	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function() {


		// wx.navigateTo({
		//   url: '../pmxq/pmxq'
		// })


	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function() {

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

	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function() {
		console.log('页面上拉触底事件的处理函数')
	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function() {

	},
	onChangeShowState: function() {

	},

	searchClose: function() {
		this.setData({
			searchvlue: '',
			searchClose: 'none'
		})
	},

	bindinputValue: function(res) {
		var Keyword = res.detail.value;

		if (Keyword == '') {
			this.setData({

				searchClose: 'none'
			})

		} else {
			this.setData({

				searchClose: ''
			})
		}


	},


	/**
	 * 汇票详情
	 */
	tapcollect: function(e) {

		wx.navigateTo({
			url: '../nopmxq/nopmxq?id=' + e.currentTarget.dataset.id + "&name=test"
		})

	},
	searchkey: function(e) {

		var searchvlue = e.detail.value
		if (this.data.searchvlue != searchvlue) {
			this.setData({
				searchvlue: searchvlue,
				collectlist: [],
				offset: 0,
				limit: 5,
				currentPage: 1
			})

			this.loadsearchList(searchvlue);
			//搜索查询
			//      console.log(searchvlue)

		}

	},


	loadsearchList: function(searchvlue) {
		wx.showLoading()
		var that = this;

		console.log(that.data.offset + ",,,,111111,,,,,,1111111111111111")
		wx.request({
			url: app.globalData.url + '/home_search.html',
			data: {
				access_token: app.getaccess_token(),
				timestamp: app.gettimestamp(),
				uid: app.globalData.uid,
				keyword: searchvlue,
				offset: that.data.offset,
				limit: that.data.limit,

			},
			method: 'GET',
			header: {
				'content-type': 'application/json'
			},
			success: function(res) {
				wx.hideLoading()
				var data = res.data;

				//        console.log(data)
				if (data.status == '1') {



					var array_list = that.data.collectlist;

					console.log('返回信息的个数:' + data.data.length)

					for (var i = 0; i < data.data.length; i++) {
						array_list.push(data.data[i]);
					}

					var array = JSON.stringify(array_list);

					that.setData({
						collectlist: JSON.parse(array),
						isinfomation: true,
					})
					isLoad = true;


					if (data.data.length < that.data.pageSize) {
						that.setData({
							islastpage: true //设置是最后一页
						})

						return;
					} else {
						that.setData({
							islastpage: false //设置是最后一页
						})
					}


				} else {

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

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	refresh: function() {

		wx.showLoading()
		setTimeout(function() {

			wx.hideLoading();

		}, 500)



	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	loadMore: function() {
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
			that.loadsearchList(that.data.searchvlue);

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

})
