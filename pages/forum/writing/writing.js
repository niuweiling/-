// pages/forum/writing/writing.js
const app = getApp();
import decound from '../../../utils/decound.js'
Page({

	/* 页面的初始数据*/
	data: {
		title: '',
		write: '',
	},
	// 获取标题的值
	bindTitle(e) {
		this.setData({
			title: e.detail.value.replace(/\s+/g, '')
		})
	},
	// 随便说点什么
	bindWrite(e) {
		this.setData({
			write: e.detail.value.replace(/\s+/g, '')
		})
	},

	// 发布
	bindSend:decound.throttle(function() {
		if (this.data.title == null || this.data.title == "" || this.data.title == ' ') {
			this.message('标题不能为空')
			return;
		} else if (this.data.write == null || this.data.write == "" || this.data.title == ' ') {
			this.message('内容不能为空')
			return;
		} else {
			wx.request({
				url: app.globalData.newurl + '/api/v1/bbs/store',
				data: {
					access_token: app.getaccess_token(),
					timestamp: app.gettimestamp(),
					uid: app.globalData.uid + "",
					token: app.globalData.token,
					title: this.data.title,
					content: this.data.write,
					images: JSON.stringify([]),
					bid: "",
					type: 1
				},
				method: 'POST',
				header: {
					'content-type': 'application/json'
				},
				success: res => {
					console.log(res)
					if (res.data.status == '10001') {
						wx.reLaunch({
							url: '/pages/shouye/index/index',
						})
					} else {
						console.log(res.data.message)
					}
				}

			})
		}

	},1000),

	// 弹框封装
	message: function(message) {
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
		if (typeof this.getTabBar === 'function' && this.getTabBar()) {
			this.getTabBar().setData({
				selected: 0
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
