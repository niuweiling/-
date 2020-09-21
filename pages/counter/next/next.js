// pages/counter/next/next.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		ckje: "", //存款金额(万元)
		txll: "", //贴现利率(%)
		date1: "", //贴现日期
		week1: "", //贴现日期
		date2: "", //到期日期
		week2: "", //到期日期
		kpsxfl: "", //开票手续费率(%)
		zjcbl: "", //资金成本率(%)
		zjzyts: "", //资金占用天数
		hzckll: "", //后置存款利率
		txxzj: "", //贴现息资金占用成本(元)
		qtcb: "", //其他成本(元)
		pmje: "0.00", //票面金额
		txje: "0.00", //贴现金额
		kpsxf: "0.00", //开票手续费
		zjcb: "0.00", //资金成本
		hzcksy: "0.00", //后置存款收益
		hzsy: "0.00" //后置收益
	},
	// 存款金额
	bindCkje(e) {
		this.setData({
			ckje: e.detail.value
		})
	},

	// 提现利率
	bindTxll(e) {
		this.setData({
			txll: e.detail.value
		})
	},

	// 贴现日期
	dateChange: function(e) {
		this.setData({
			date1: e.detail.value
		});
		var week = this.weekday(this.data.date1);
		this.setData({
			week1: week
		});
	},
	// 到期日期
	dateChanges: function(e) {
		this.setData({
			date2: e.detail.value
		});
		var week = this.weekday(this.data.date2);
		this.setData({
			week2: week
		});
	},
	// 时间显示星期
	weekday: function(m) {
		var n = new Date(m).getDay();
		switch (n) {
			case 1:
				return "—星期一";
				break;
			case 2:
				return "—星期二";
				break;
			case 3:
				return "—星期三";
				break;
			case 4:
				return "—星期四";
				break;
			case 5:
				return "—星期五";
				break;
			case 6:
				return "—星期六";
				break;
			case 0:
				return "—星期日";
				break;

		}
	},
	// 开票手续费率
	bindKpsxfl(e) {
		this.setData({
			kpsxfl: e.detail.value
		})
	},
	// 资金成本率
	bindZjcbl(e) {
		this.setData({
			zjcbl: e.detail.value
		})
	},
	// 资金占用天数
	bindZjzyts(e) {
		this.setData({
			zjzyts: e.detail.value
		})
	},
	// 后置存款利率
	bindHzckll(e) {
		this.setData({
			hzckll: e.detail.value
		})
	},
	// 贴现息资金占用成本(元)
	bindTxxzj(e) {
		this.setData({
			txxzj: e.detail.value
		})
	},
	// 其他成本(元)
	bindQtcb(e) {
		this.setData({
			qtcb: e.detail.value
		})
	},
	// 计算天数
	checkDate: function(startTime, endTime) {
		var data = {
			"2020-01-19": 0,
			"2020-02-01": 0,
			"2020-04-26": 0,
			"2020-05-09": 0,
			"2020-06-28": 0,
			"2020-09-27": 0,
			"2020-10-10": 0,
			"2020-01-01": 1,
			"2020-01-30": 1,
			"2020-04-06": 1,
			"2020-05-05": 1,
			"2020-06-27": 1,
			"2020-10-08": 1,
			"2020-01-29": 2,
			"2020-04-05": 2,
			"2020-05-04": 2,
			"2020-06-26": 2,
			"2020-10-07": 2,
			"2020-01-28": 3,
			"2020-04-04": 3,
			"2020-05-03": 3,
			"2020-06-25": 3,
			"2020-10-06": 3,
			"2020-01-27": 4,
			"2020-05-02": 4,
			"2020-10-05": 4,
			"2020-01-26": 5,
			"2020-05-01": 5,
			"2020-10-04": 5,
			"2020-01-25": 6,
			"2020-10-03": 6,
			"2020-01-24": 7,
			"2020-10-02": 7,
			"2020-10-01": 8
		}
		//日期格式化
		var start_date = new Date(startTime.replace(/-/g, "/"));
		var end_date = new Date(endTime.replace(/-/g, "/"));
		//转成毫秒数，两个日期相减
		var ms = end_date.getTime() - start_date.getTime();
		//转换成天数
		var day = parseInt(ms / (1000 * 60 * 60 * 24));
		//do something

		//累加调整天输出
		for (var i in data) {
			if (i == endTime) {
				day += data[i]
			}
		}

		if (data[endTime] == undefined) {
			if (new Date(endTime).getDay() == 6) {
				day += 2; //周六加一天
			} else if (new Date(endTime).getDay() == 0) {
				day += 1; //周天加两天
			}
		}
		return day
	},

	// 计算
	bindCount() {
		if (this.data.ckje == "") {
			wx.showToast({
				title: '存款金额必填',
				icon: 'none'
			})
		} else if (this.data.txll == "") {
			wx.showToast({
				title: '贴现利率必填',
				icon: 'none'
			})
		} else if (this.data.zjzyts == "") {
			wx.showToast({
				title: '占用天数必填',
				icon: 'none'
			})
		} else if (this.data.hzckll == "") {
			wx.showToast({
				title: '后置存款必填',
				icon: 'none'
			})
		} else if (this.data.txxzj == "") {
			wx.showToast({
				title: '贴现息资金必填',
				icon: 'none'
			})
		} else {
			// 存款金额
			let ckje = this.data.ckje * 10000;
			// 票面金额
			let pmje = this.data.ckje * 10000;
			// 到期日-贴现日
			let date = this.checkDate(this.data.date1, this.data.date2);
			// 贴现金额
			let txje = pmje - (pmje * this.data.txll / 100 * date / 360);
			// 开票手续费
			let kpsxf = pmje * this.data.kpsxfl / 100;
			// 资金成本
			let zjcb = this.data.ckje * 10000 * this.data.zjcbl / 100 * this.data.zjzyts;
			// 后置存款收益
			let hzcksy = this.data.ckje * 10000 * this.data.hzckll / 100
			// 后置收益
			let sub = ckje + kpsxf + zjcb + Number(this.data.qtcb) + Number(this.data.txxzj);
			let hzsy = (txje - sub + hzcksy).toFixed(2);
			console.log(hzsy);
			this.setData({
				pmje: pmje,
				txje: txje,
				kpsxf: kpsxf,
				zjcb: zjcb,
				hzcksy: hzcksy,
				hzsy: hzsy
			})
		}
	},

	// 清空
	bindEmpty() {
		let date1 = this.formartData();
		var week = this.weekday(date1);
		let date2 = this.formartDatas();
		let week2 = this.weekday(date2);
		this.setData({
			ckje: "", //存款金额(万元)
			txll: "", //贴现利率(%)
			date1: date1, //贴现日期
			week1: week, //贴现日期
			date2: date2, //到期日期
			week2: week2, //到期日期
			kpsxfl: "", //开票手续费率(%)
			zjcbl: "", //资金成本率(%)
			zjzyts: "", //资金占用天数
			hzckll: "", //后置存款利率
			txxzj: "", //贴现息资金占用成本(元)
			qtcb: "", //其他成本(元)
			pmje: "0.00", //票面金额
			txje: "0.00", //贴现金额
			kpsxf: "0.00", //开票手续费
			zjcb: "0.00", //资金成本
			hzcksy: "0.00", //后置存款收益
			hzsy: "0.00" //后置收益
		})
	},


	// 跳转到前置计算
	bindPre() {
		wx.redirectTo({
			url: '/pages/counter/counter',
		})
	},
	// 跳转到组合计算
	bindMix() {
		wx.redirectTo({
			url: '/pages/counter/mix/mix',
		})
	},
	// 跳转到普通计算
	bindCalor() {
		wx.navigateTo({
			url: '/pages/cal/calor/calor',
		})
	},




	// 获取当天的时间
	formartData() {
		var date = new Date();
		var arr = [
			date.getFullYear() + '-',
			date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) + '-' : date.getMonth() + 1 + '-',
			date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
		];
		return arr.join("");
	},
	// 获取当天的时间加一年
	formartDatas() {
		var date = new Date();
		var arr = [
			date.getFullYear() + 1 + '-',
			date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) + '-' : date.getMonth() + 1 + '-',
			date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
		];
		return arr.join("");
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {
		let date1 = this.formartData();
		var week = this.weekday(date1);
		let date2 = this.formartDatas();
		let week2 = this.weekday(date2)
		this.setData({
			date1: date1,
			week1: week,
			date2: date2,
			week2: week2
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
