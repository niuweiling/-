// pages/danger/danger.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		billnum: ''
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
	getinfor: function(e) {



		if (this.data.billnum.length != 16) {
			wx.showModal({
				title: '提示',
				content: "请输入16位票号",
				showCancel: false
			})

			return;
		}

		wx.showLoading()

		wx.request({
			url: getApp().globalData.url + '/wentipiao.html',
			data: {

				draft_num: this.data.billnum

			},
			method: 'GET',
			header: {
				'content-type': 'application/json'
			},
			success: function(res) {
				wx.hideLoading()
				//        console.log(res.data)
				wx.showModal({
					title: '查询结果',
					content: res.data.result,
					showCancel: false,
					success: function(res) {
						if (res.confirm) {
							//              console.log('用户点击确定')
						}
					}
				})

			}
		})


	},
	EventHandle: function(e) {
		//  console.log(e.detail.value),
		this.setData({
			billnum: e.detail.value
		})
	}
})
