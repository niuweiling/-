var app = getApp();
Page({
	data: {
		array: ['微信朋友圈', '微信群', '同行推荐'],
		draft_name: ['纸质商业承兑汇票', '纸质银行承兑汇票', '电子商业承兑汇票', '电子银行承兑汇票'],
		showView: false,
		index: 0,
		items: [{
				name: 'Y',
				value: '已成交',
				checked: false
			},
			{
				name: 'N',
				value: '未成交',
				checked: true
			}
		],
		selectPerson: true,
		selectArea: false,
		title: '全部',
		comein: 'save',
		draft_type: 0,
		is_sale: 'N'
	},
	bindPickerChange: function(e) {
		//   console.log('picker发送选择改变，携带值为', e.detail.value)
		this.setData({
			index: e.detail.value
		})
	},
	onLoad: function(options) {
		// 生命周期函数--监听页面加载


		var data = JSON.parse(options.jsonstr);

		var comein = options.comein;
		var front_img = options.front_img;


		if (comein == 'clickxq') {

			//   console.log(data)
			var array = this.data.array;
			for (var i = 0; i < array.length; i++) {
				if (array[i] == data.source) {
					this.setData({
						index: i

					})
				}
			}

			var items = this.data.items;


			for (var j in items) {
				if (items[j].name == data.is_sale) {
					items[j].checked = true;
				} else {
					items[j].checked = false;
				}
			}
			this.setData({
				items: items,
				comein: comein,
				is_sale: data.is_sale
			})



			this.setData({
				invoiceNo: data.number, ////票据号码 
				acceptorName: data.accept_name, //承兑人全称
				invoice_amount: data.amount, //票据金额
				theTicketDate: data.start_time, //出票日期
				billDueDateOf: data.expire_time, //汇票到期日
				acceptorBankNo: data.accept_bank_num, //承兑人开户行行号
				acceptorAccountNo: data.accept_num, //承兑人银行账号
				theTicketOrgName: data.seller_name, //出票人全称
				theTicketOrgAccountNo: data.seller_num, //出票人账号
				theTicketOrgOpeningBankName: data.seller_bank_name, //出票人开户银行
				receivablesOrgName: data.buyer_name, //收款人全称
				receivablesOrgAccountNo: data.buyer_num, //收款人账号
				receivablesOrgOpeningBankName: data.buyer_bank_name, //收款人开户银行
				isNetAttorn: data.is_transfer, //能否转让
				billstatus: data.draft_status, //票据状态,
				acceptorOpeningBankName: data.accept_bank_name, //承兑人开户行名称
				front_img: front_img,
				title: data.title,
				contacts: data.contacts,
				phone: data.phone,
				id: data.id,
				draft_type: data.draft_type
			})





			return;
		}


		//  console.log(data)

		var draft_name = this.data.draft_name;
		for (var i = 0; i < draft_name.length; i++) {
			if (draft_name[i] == data.title) {
				this.setData({
					draft_type: (i + 1)

				})
				break;
			}
		}


		this.setData({
			invoiceNo: data.invoiceNo, ////票据号码 
			acceptorName: data.acceptorName, //承兑人全称
			invoice_amount: data.invoice_amount, //票据金额
			theTicketDate: data.theTicketDate, //出票日期
			billDueDateOf: data.billDueDateOf, //汇票到期日
			acceptorBankNo: data.acceptorBankNo, //承兑人开户行行号
			acceptorAccountNo: data.acceptorAccountNo, //承兑人银行账号
			theTicketOrgName: data.theTicketOrgName, //出票人全称
			theTicketOrgAccountNo: data.theTicketOrgAccountNo, //出票人账号
			theTicketOrgOpeningBankName: data.theTicketOrgOpeningBankName, //出票人开户银行
			receivablesOrgName: data.receivablesOrgName, //收款人全称
			receivablesOrgAccountNo: data.receivablesOrgAccountNo, //收款人账号
			receivablesOrgOpeningBankName: data.receivablesOrgOpeningBankName, //收款人开户银行
			isNetAttorn: data.isNetAttorn, //能否转让
			billstatus: data.billstatus, //票据状态,
			acceptorOpeningBankName: data.acceptorOpeningBankName, //承兑人开户行名称
			front_img: front_img,
			title: data.title
		})


	},
	radioChange: function(e) {
		//  console.log('radio发生change事件，携带value值为：', e.detail.value)
		this.setData({
			is_sale: e.detail.value
		})

	},
	clickPerson: function() {
		var selectPerson = this.data.selectPerson;
		if (selectPerson == true) {
			this.setData({
				selectArea: true,
				selectPerson: false,
			})
		} else {
			this.setData({
				selectArea: false,
				selectPerson: true,
			})
		}
	},
	clickPersonone: function(e) {
		//  console.log(e.currentTarget.dataset.value)
		//   console.log(e.currentTarget.dataset.title)

		this.clickPerson();

		this.setData({
			title: e.currentTarget.dataset.title,
			draft_type: e.currentTarget.dataset.value

		})

	},
	saveOrUpdate: function(e) {

		//更新
		if (this.data.comein == 'clickxq') {

			//  console.log(e.detail.value)

			var params = e.detail.value;

			wx.showLoading()
			var that = this;
			wx.request({
				url: app.globalData.url + '/home_updatedetails.html',
				data: {
					access_token: app.getaccess_token(),
					timestamp: app.gettimestamp(),
					id: params.id,
					draft_type: that.data.draft_type,
					draft_status: params.billstatus,
					number: params.invoiceNo,
					start_time: params.theTicketDate,
					expire_time: params.billDueDateOf,
					seller_name: params.theTicketOrgName,
					seller_num: params.theTicketOrgAccountNo,
					seller_bank_name: params.theTicketOrgOpeningBankName,
					buyer_name: params.receivablesOrgName,
					buyer_num: params.receivablesOrgAccountNo,
					buyer_bank_name: params.receivablesOrgOpeningBankName,
					amount: params.invoice_amount,
					accept_name: params.acceptorName,
					accept_num: params.acceptorAccountNo,
					accept_bank_num: params.acceptorBankNo,
					accept_bank_name: params.acceptorOpeningBankName,
					is_transfer: params.isNetAttorn,
					source: that.data.array[params.source],
					is_sale: that.data.is_sale,
					contacts: params.contacts,
					phone: params.phone,

				},
				method: 'GET',
				header: {
					'content-type': 'application/json'
				},
				success: function(res) {

					// console.log(res)
					wx.hideLoading()
					var data = res.data;

					// console.log(data)
					if (data.status == '1') {



						wx.showModal({
							title: '提示',
							content: data.message,
							success: function(res) {

								wx.navigateBack({
									delta: 2
								})

							}
						})

					} else {

						wx.showModal({
							title: '提示',
							content: data.message,
							success: function(res) {

								wx.navigateBack({
									delta: 2
								})

							}
						})

					}

				}
			})


		} else { //保存


			// console.log(e.detail.value)


			var params = e.detail.value;



			wx.showLoading()
			var that = this;

			var front_img = that.data.front_img;

			front_img = front_img.replace('https', 'http');

			wx.request({
				url: app.globalData.url + '/home_createdetails.html',
				data: {
					access_token: app.getaccess_token(),
					timestamp: app.gettimestamp(),
					uid: app.globalData.uid,
					draft_img_url: front_img,


					draft_type: that.data.draft_type,
					draft_status: params.billstatus,
					number: params.invoiceNo,
					start_time: params.theTicketDate,
					expire_time: params.billDueDateOf,
					seller_name: params.theTicketOrgName,
					seller_num: params.theTicketOrgAccountNo,
					seller_bank_name: params.theTicketOrgOpeningBankName,
					buyer_name: params.receivablesOrgName,
					buyer_num: params.receivablesOrgAccountNo,
					buyer_bank_name: params.receivablesOrgOpeningBankName,
					amount: params.invoice_amount,
					accept_name: params.acceptorName,
					accept_num: params.acceptorAccountNo,
					accept_bank_num: params.acceptorBankNo,
					accept_bank_name: params.acceptorOpeningBankName,
					is_transfer: params.isNetAttorn,
					source: that.data.array[params.source],
					is_sale: that.data.is_sale,
					contacts: params.contacts,
					phone: params.phone,

				},
				method: 'GET',
				header: {
					'content-type': 'application/json'
				},
				success: function(res) {

					// console.log(res)
					wx.hideLoading()
					var data = res.data;

					// console.log(data)
					if (data.status == '1') {



						wx.showModal({
							title: '提示',
							content: data.message,
							success: function(res) {

								wx.navigateBack({
									delta: 1
								})

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

				}
			})




		}



	},
	//图片点击事件
	ckpm: function(event) {
		var url = event.currentTarget.dataset.url; //获取data-src

		var urls = [event.currentTarget.dataset.url]

		//图片预览
		wx.previewImage({
			current: url, // 当前显示图片的http链接
			urls: urls // 需要预览的图片http链接列表
		})
	}
})
