// pages/my/myptlogin/myptlogin.js
var app = getApp();
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		a2psw: '',
		a2psw2: 'none',
		// phone: '13811901754',
		// password: 'mia517',
		// phone: '17610600927',
		// password: '123456',
		// phone: '15652455477',
		// password: '1',
		phone: '',
		password: '',
		showView: true

	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {
		showView: (options.showView == "true" ? true : false)
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

	},
	wjmm: function() {
		wx.navigateTo({
			url: '../myzhuce/myzhuce?from=wjmm',
		})
	},
	blurpsw: function(e) {
		this.setData({
			password: e.detail.value
		});
	},
	blurphone: function(e) {
		this.setData({
			phone: e.detail.value
		});
	},

	eyeclick: function() {
		if (this.data.a2psw == '') {
			this.setData({
				a2psw: 'none',
				a2psw2: ''
			});
		} else {
			this.setData({
				a2psw: '',
				a2psw2: 'none'
			});
		}

		var that = this;
		that.setData({
			showView: (!that.data.showView)
		})
	},
	login: function() {
		var that = this;
		if (this.data.phone == null || this.data.phone == '') {
			that.message("手机号不能为空");
			return;
		}
		if (this.data.password == null || this.data.password == '') {
			that.message("密码不能为空");
			return;
		}
		console.log("手机:" + that.data.phone + ",密码：" + that.data.password)
		that.loginrequest(that.data.phone, that.data.password);
	},

	loginrequest: function(phone, password) {
		var that = this;
		wx.request({
			url: app.globalData.url + '/me_login.html',
			data: {
				access_token: app.getaccess_token(),
				timestamp: app.gettimestamp(),
				phone: phone,
				password: password,
				version: "3.0.1",
				client: "weixin",
				openid: app.globalData.openid
			},
			method: 'GET',
			header: {
				'content-type': 'application/json'
			},
			success: function(res) {
				var data = res.data;
				if (data.status == '1') {
					app.setUid(data.data.id, data.data.token)
					wx.navigateBack({
						delta: 2
					})
				} else {
					that.message(data.message);
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
})
