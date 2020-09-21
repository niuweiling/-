// pages/forum/sell/sell.js
const app = getApp();
import decound from '../../../utils/decound.js'
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		text:'标题：',
		title: '',
		acceptorName: '', //承兑人名称
		billDueDateOf: '', //汇票到期日
		invoice_amount: '', //票面金额
		draft_type: '商票', //商票
		chooseUrl: [],
		current: '',
		urls: [],
	},
	handleTitle(e) {
		// console.log(e.detail.value)
		this.setData({
			title: e.detail.value.replace(/\s+/g, '')
		})
	},
	// 获取在出户承兑人的值
	handleCdr(e) {
		this.setData({
			acceptorName: e.detail.value.replace(/\s+/g, '')
		})
	},
	// 获取票面金额的值
	handlePmje(e) {
		this.setData({
			invoice_amount: e.detail.value.replace(/\s+/g, '')
		})
	},

	// 获取到期日的值
	bindDateChange(e) {
		this.setData({
			billDueDateOf: e.detail.value.replace(/\s+/g, '')
		})
	},

	handleType(e) {
		this.setData({
			draft_type: e.detail.value.replace(/\s+/g, '')
		})
	},

	// 图片识别
	chooseImage() {
		wx.chooseImage({
			count: 1,
			sizeType: ['original', 'compressed'],
			sourceType: ['album', 'camera'],
			success: (res) => {
				// tempFilePath可以作为img标签的src属性显示图片
				const tempFilePaths = res.tempFilePaths
				// 请求识别接口
				this.choose(tempFilePaths)
				wx.showLoading({
					title: '加载中...',
				})
			}
		})
	},

	// 请求识别接口
	choose: function(file) {
		wx.uploadFile({
			url: app.globalData.newurl + '/api/v1/common/discern',
			formData: {
				access_token: app.getaccess_token(),
				timestamp: app.gettimestamp(),
				uid: app.globalData.uid + "",
				type: 4,
			},
			filePath: file[0],
			name: 'file',
			method: 'POST',
			header: {
				'content-type': 'application/json'
			},
			success: res => {
			let tt=this.data.text;
			console.log(tt)
			tt = '';
			this.data.text=tt;
			console.log(this.data.text)
				wx.hideLoading()
				let obj = JSON.parse(res.data)
				if (obj.status == '10001') {
					console.log(obj.data)
					const img = obj.data.img;
					const oldUrl = this.data.chooseUrl;
					oldUrl[0] = img
					this.setData({
						text:'在户出：',
						// title: '在户出：' + obj.data.acceptorName + '、' + obj.data.invoice_amount + '元的' + this.data.
						title: obj.data.acceptorName + '、' + obj.data.invoice_amount + '元的' + this.data.
						draft_type,
						acceptorName: obj.data.acceptorName,
						invoice_amount: obj.data.invoice_amount + '元',
						billDueDateOf: obj.data.billDueDateOf,
						chooseUrl: oldUrl
					})
					console.log(this.data.chooseUrl)
					if (obj.data.draft_type == "4") {
						this.setData({
							draft_type: '银票'
						})
					}
				} else {
					this.message(obj.message)
				}
			}
		})
	},
	// 发布
	send:decound.throttle(function(){
		// tit=this.data.title;
		if (this.data.title == '' || this.data.title == null) {
			this.message('标题不能为空')
		} else if (this.data.acceptorName == '' || this.data.acceptorName == null) {
			this.message('承兑人不能为空')
		} else if (this.data.invoice_amount == '' || this.data.invoice_amount == null) {
			this.message('票面金额不能为空')
		} else if (this.data.billDueDateOf == '' || this.data.billDueDateOf == null) {
			this.message('到期日不能为空')
		} else {
			wx.request({
				url: app.globalData.newurl + '/api/v1/bbs/store',
				data: {
					access_token: app.getaccess_token(),
					timestamp: app.gettimestamp(),
					uid: app.globalData.uid + "",
					token: app.globalData.token,
					type: 1,
					content: '\r\n' + '在户出承兑人：' + this.data.acceptorName + '\r\n' + '票面金额：' + this.data.invoice_amount + '\r\n' +
						'到期日：' + this.data.billDueDateOf + '\r\n' + '有能接收的请私信我',
					// title: '在户出：'+(this.data.title).substring(3),
					title:'在户出：'+(this.data.title),
					// title:this.data.title,
					images: JSON.stringify(this.data.chooseUrl || []),
					bid: ""
				},
				method: 'POST',
				header: {
					'content-type': 'application/json'
				},
				success: res => {
					if (res.data.status == '10001') {
						wx.reLaunch({
							url: '/pages/shouye/index/index'
						})
					} else {
						console.log(res.data.message)
					}
				}
			})
		}
	},1000),

	// 信息提示
	message: function(message) {
		wx.showModal({
			title: '提示',
			content: message,
			success: function(res) {

			}
		})
	},

	// 查看大图
	ckpm: function(event) {
		var url = event.currentTarget.dataset.url; //获取data-src
		var urls = [event.currentTarget.dataset.url]
		console.log(url, urls)
		//图片预览
		wx.previewImage({
			current: url, // 当前显示图片的http链接
			urls: urls // 需要预览的图片http链接列表
		})
	},


	/* 生命周期函数--监听页面加载 */
	onLoad: function(options) {

	},

	/* 生命周期函数--监听页面初次渲染完成 */
	onReady: function() {

	},

	/* 生命周期函数--监听页面显示 */
	onShow: function() {

	},

	/* 生命周期函数--监听页面隐藏 */
	onHide: function() {

	},

	/* 生命周期函数--监听页面卸载 */
	onUnload: function() {

	},

	/* 页面相关事件处理函数--监听用户下拉动作 */
	onPullDownRefresh: function() {

	},

	/* 页面上拉触底事件的处理函数 */
	onReachBottom: function() {

	},

	/* 用户点击右上角分享 */
	onShareAppMessage: function() {

	}
})
