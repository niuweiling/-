// pages/my/mylogin/mylogin.js
var app = getApp();
Page({

	/**
	 * 页面的初始数据
	 */
	data: {

	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {

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
	logintap: function() {


		wx.navigateTo({
			url: '../myptlogin/myptlogin'
		})

	},
	zhuce: function() {
		wx.navigateTo({
			url: '../myzhuce/myzhuce'
		})
	},
	weixinlogin: function() {
		var that = this;
		var openid = wx.getStorageSync('cacheopenid');
		console.log(openid)
		wx.request({
			url: app.globalData.url + '/home_weilogin.html',
			data: {
				openid: openid
			},
			method: 'GET',
			header: {
				'content-type': 'application/json'
			},
			success: function(res) {
				var data = res.data;
				//   console.log(data)
				if (data.status == '1') {
					app.setUid(data.data.id, '')

					wx.navigateBack({
						delta: 2
					})

				} else {
					wx.navigateTo({
						url: '../myzhuce/myzhuce'
					})
				}
			}
		})
	},
	calling: function() {
		wx.makePhoneCall({
			phoneNumber: '400-628-7087',
			success: function() {
				//        console.log("拨打电话成功！")
			},
			fail: function() {
				//   console.log("拨打电话失败！")
			}
		})
	}
})
