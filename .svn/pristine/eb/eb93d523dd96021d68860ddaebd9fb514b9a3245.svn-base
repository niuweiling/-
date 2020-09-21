var app = getApp();
Page({
	data: {
		array: ['AAA', 'AA+', 'AA', 'AA-', 'A+', 'A', 'A-', 'BBB+', 'BBB', 'BBB-', 'BB+', 'BB', 'BB-', 'B+', 'B', 'B-',
			'CCC+', 'CCC', 'CCC-', 'CC+', 'CC', 'CC-', 'C+', 'C', 'C-'
		],
		showView: false,
		index: 0,
		avatar: '',
		apply_img: '../../images/apply_01.png'

		// company_name: 承兑企业名称
		// uid: 46
		// company_contacts: 企业联系人
		// drawer: 出票人全称
		// rating: 请选择信用等级
		// taker: 收票人全称
		// contactnumber: 13111111111
		// acceptor: 承兑人信息
		// token: fa150396dcd2f7fa4024a1ae2646a212
		// money: 200

	},

	applycredit: function(e) {


		//    console.log(e.detail.value)



		var params = e.detail.value;

		wx.showLoading()
		var that = this;

		if (that.data.avatar != null & that.data.avatar != '') {



			wx.uploadFile({
				url: app.globalData.url + '/home_applycredit.html',
				filePath: that.data.avatar,
				name: 'file',
				formData: {
					access_token: app.getaccess_token(),
					timestamp: app.gettimestamp(),
					acceptor: params.acceptor,
					company_contacts: params.company_contacts,
					company_name: params.company_name,
					contactnumber: params.contactnumber,
					drawer: params.drawer,
					money: params.money,
					rating: that.data.array[that.data.index], //信用等级
					taker: params.taker,
					token: app.globalData.token,
					uid: app.globalData.uid
					//file: that.data.avatar//汇票图片
				},
				header: {
					"Content-Type": "multipart/form-data"
				},
				success: function(res) {
					that.repose(res);


				}
			})
		} else {



			wx.request({
				url: app.globalData.url + '/home_applycredit2.html',
				data: {
					access_token: app.getaccess_token(),
					timestamp: app.gettimestamp(),
					acceptor: params.acceptor,
					company_contacts: params.company_contacts,
					company_name: params.company_name,
					contactnumber: params.contactnumber,
					drawer: params.drawer,
					money: params.money,
					rating: that.data.array[that.data.index], //信用等级
					taker: params.taker,
					token: app.globalData.token,
					uid: app.globalData.uid

				},
				method: 'GET',
				header: {
					'content-type': 'application/json'
				},
				success: function(res) {
					that.repose(res);

				}
			})



		}

	},

	repose: function(res) {

		var that = this;
		wx.hideLoading()

		var data = res.data;

		if (typeof data == 'string') {
			//      console.log('--------------------------------------')
			data = JSON.parse(data);
		}



		//    console.log(data.message)
		if (data.status == '1') {

			wx.showModal({
				title: '提示',
				content: data.message + ' 是否继续授信申请?',
				success: function(res) {

					if (res.confirm) {

						that.setData({
							acceptor: '',
							company_contacts: '',
							company_name: '',
							contactnumber: '',
							drawer: '',
							money: '',
							index: '0',
							taker: '',
							apply_img: '../../images/apply_01.png'

						});


					} else if (res.cancel) {
						//            console.log('用户点击取消')

						wx.navigateBack({
							delta: 1
						})


					}


				}
			})



		} else {
			wx.showModal({
				title: '提示',
				content: data.message,
				success: function(res) {



				}
			})


		}

	},
	bindPickerChange: function(e) {
		//    console.log('picker发送选择改变，携带值为', e.detail.value)
		this.setData({
			index: e.detail.value
		})
	},
	onLoad: function(options) {
		// 生命周期函数--监听页面加载
		showView: (options.showView == "true" ? true : false)

		this.getcreditrating(); //获取信用等级



	},
	onChangeShowState: function() {
		// var that = this;
		// that.setData({
		//   showView: (!that.data.showView)
		// })

		let _this = this;
		wx.showActionSheet({
			itemList: ['从相册中选择', '拍照'],
			//itemColor: '#DE4A2A',
			success: function(res) {
				if (!res.cancel) {
					if (res.tapIndex == 0) {
						_this.chooseWxImage('album')
					} else if (res.tapIndex == 1) {
						_this.chooseWxImage('camera')
					}
				}
			}
		})
	},

	chooseWxImage: function(type) {


		var that = this;
		wx.chooseImage({
			count: 1,
			sizeType: ['original', 'compressed'],
			sourceType: [type],
			success: function(res) {

				var avatar = res.tempFilePaths;

				that.setData({
					avatar: avatar[0],
					apply_img: avatar[0],
				})

				//         console.log(avatar[0])


			}
		})

	},

	/**
	 * 获取信用等级
	 */
	getcreditrating: function() {

		wx.showLoading()
		var that = this;
		wx.request({
			url: app.globalData.url + '/home_creditrating.html',
			data: {
				access_token: app.getaccess_token(),
				timestamp: app.gettimestamp()

			},
			method: 'GET',
			header: {
				'content-type': 'application/json'
			},
			success: function(res) {
				wx.hideLoading()
				var data = res.data;

				//         console.log(data)
				if (data.status == '1') {

					var data = data.data;
					var array = [];
					for (var i in data) {
						array[i] = data[i].name
					}
					that.setData({
						array: array

					})



				}

			}
		})


	},
	foo: function() {
		if (this.data.inputValue) {
			//Do Something
		} else {
			//Catch Error
		}
		this.setData({
			inputValue: '' //将data的inputValue清空
		});
		return;
	}
})
