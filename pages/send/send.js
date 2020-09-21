// pages/send/send.js
const app = getApp();
Page({

	/**
	 * 页面的初始数据
	 */
	data: {

	},
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
	// 卖票
	handleSell() {
		var that = this;
		if (that.checklogin()) {
			return
		}
		wx.navigateTo({
			url: '/pages/forum/sell/sell',
		})
	},

	// 收票
	handleBuy() {
		var that = this;
		if (that.checklogin()) {
			return
		}
		wx.navigateTo({
			url: '/pages/forum/buy/buy',
		})
	},

	// 文字
	handleWrite() {
		var that = this;
		if (that.checklogin()) {
			return
		}
		wx.navigateTo({
			url: '/pages/forum/writing/writing',
		})
	},

	// 图片
	handlePic() {
		var that = this;
		if (that.checklogin()) {
			return
		}
		wx.navigateTo({
			url: '/pages/forum/picture/picture',
		})
	},

	// 关闭去首页
	close() {
		wx.reLaunch({
			url: '/pages/shouye/index/index',
		})
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
		// 自定义tabber
		if (typeof this.getTabBar === 'function' && this.getTabBar()) {
			this.getTabBar().setData({
				selected: 1
			})
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

	}
})
