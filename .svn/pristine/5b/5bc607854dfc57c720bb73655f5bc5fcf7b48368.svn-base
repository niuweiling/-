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
		avatar: '',
		num: 0,
		soucCount: 0,
		liulCount: 0,
		dianzCount: 0,
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {

		console.log("执行刷新onLoad方法")
		//    console.log("onload..................................................")
		var that = this;
		var openid = wx.getStorageSync('cacheopenid')



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
				//        console.log(res.data)
				var data = res.data;
				if (data.result == 'true') {

					var avatar = "../images/tx.png";

					if (data.data.fileUrl != '' && data.data.fileUrl != null) {
						avatar = data.data.fileUrl;
					} else {
						var cacheuserInfo = wx.getStorageSync('cacheuserInfo');
						if (cacheuserInfo != '' & cacheuserInfo != null) {
							avatar = cacheuserInfo.avatarUrl;
						}
					}

					that.setData({
						avatar: avatar,
						name: data.data.name,
						position: data.data.duties,
						bpt: data.data.business,
						phone: data.data.phone,
						org_name: data.data.company,
						address: data.data.address

					})


					//          console.log(data.data.fileUrl)
				} else {
					var cacheuserInfo = wx.getStorageSync('cacheuserInfo');
					if (cacheuserInfo != '' & cacheuserInfo != null) {
						that.setData({
							name: cacheuserInfo.nickName,
							avatar: cacheuserInfo.avatarUrl
						})
					}


				}

			}
		})



		that.getcardrelationcount(openid);




	},

	getcardrelationcount: function(openid) {

		var that = this;
		wx.request({
			url: app.globalData.url + '/cardrelationcount.html',
			data: {
				openid: openid
			},
			method: 'GET',
			header: {
				'content-type': 'application/json'
			},
			success: function(res) {
				//
				console.log(res.data)
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
	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function() {

	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function() {



		if (getApp().globalData.num == 'true') {

			this.onLoad();

			getApp().globalData.num = null;
		}



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

	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function() {

	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function() {

		return {
			title: '分享名片',

			path: '/pages/card/sharecard/card?share_openid=' + app.globalData.openid
		}


	},
	goto: function() {
			wx.navigateTo({
				url: 'carddetail/carddetail?data=' + JSON.stringify(this.data)
			})
		}

		,
	myjl: function(e) {
		var name = e.currentTarget.dataset.name;

		console.log(name)

		wx.navigateTo({
			url: '../my/myjl/myjl?name=' + name,
		})


	}
})
