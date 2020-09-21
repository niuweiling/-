// pages/class/record/record.js
var app = getApp();
var api = require('../../../utils/api.js');
var keepurl = app.globalData.newurl + 'api/billclass/list';
var unkeepurl = app.globalData.newurl + 'api/billclass/unkeepall';
var offset = 1;
var handLastPage = false;
var senum = 0;
var ary = new Array();
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		hasList: false,
		carts: [],
		botshow: true,
		iconshow: false,
		iconselected: false,
		isIPhoneX: app.globalData.isIPhoneX
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {
		this.setData({
			hasList: true,
		});
		this.loadData();
	},
	loadData: function() {
		api.get(keepurl, {
			uid: app.globalData.uid,
			offset: 0,
			access_token: app.getaccess_token(),
			timestamp: app.gettimestamp(),
			keep: 1,
		}).then(res => {
			//console.log(res);
			if (res.data) {
				for (var index in res.data) {
					res.data[index].selected = false;
				}
			}
			//console.log(res.data);
			this.setData({
				carts: res.data
			});
			//console.log(this.data.carts);
		}).catch(e => {
			console.log(e);
		})
	},
	selectList(e) {
		const index = e.currentTarget.dataset.index;
		let carts = this.data.carts;
		const selected = carts[index].selected;
		carts[index].selected = !selected;
		api.get(keepurl, {
			uid: app.globalData.uid,
			offset: offset,
			access_token: app.getaccess_token(),
			timestamp: app.gettimestamp(),
			keep: 1,
		}).then(res => {
			if (res.data) {
				res.data = JSON.parse(carts);
				//console.log(res.data);
			}
			// this.setData({reord:res.data});
			// console.log()
		}).catch(e => {

		});
		if (carts[index].selected == true) {
			senum += 1;
			ary.push(carts[index].id);
		} else {
			senum -= 1;
			for (var i in ary) {
				if (ary[i] == carts[index].id) {
					ary.splice(i);
					i--;
				}
			}
		}
		this.setData({
			carts: carts,
			senum: senum
		});
	},
	showdelete: function() {
		this.setData({
			botshow: false,
			iconshow: true
		})
	},
	dele: function() {
		let carts = this.data.carts;
		let num = 0;
		for (let i = 0; i < this.data.carts.length; i++) {
			if (this.data.carts[i].selected == true) {
				num += 1;
				this.data.carts.splice(i, 1);
				i--;
				continue;
			}
		}
		this.setData({
			carts: carts,
			senum: ""
		})
		senum = 0;
		api.get(unkeepurl, {
			uid: app.globalData.uid,
			id: ary,
			access_token: app.getaccess_token(),
			timestamp: app.gettimestamp(),
		}).then(res => {
			console.log(res);
		}).catch(e => {
			console.log(e);
		});
	},
	cancle: function() {
		this.setData({
			botshow: true,
			iconshow: false
		})
	},
	golist: function(e) {
		//console.log(e.currentTarget.dataset.id);
		wx.navigateTo({
			url: '../classlist/classlist?id=' + e.currentTarget.dataset.id,
		})


	},
	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function() {

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
		// 隐藏导航栏加载框  
		wx.hideNavigationBarLoading();
		// 停止下拉动作  
		wx.stopPullDownRefresh();

		this.loadData();
	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function() {
		wx.showLoading();

		api.get(keepurl, {
			offset: offset,
			'access_token': app.getaccess_token(),
			'timestamp': app.gettimestamp(),
			uid: app.globalData.uid,
			keep: 1,
		}).then(res => {
			if (handLastPage) {
				wx.showToast({
					title: '到底了',
				});
				handLastPage = true;
				return;
			}
			wx.hideLoading();
			var arrList = this.data.class;
			for (var i = 0; i < res.data.length; i++) {
				arrList.push(res.data[i]);
			}
			console.log(arrList);
			if (res.data) {
				for (var index in res.data) {
					res.data[index].selected = false;
				}
			}
			this.setData({
				class: arrList
			})

			if (res.data.length < 10) {
				handLastPage = true;
				return;

			} else {
				offset++;
			}

		}).catch(e => {
			console.log(e);
		})
	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function() {

	}
})
