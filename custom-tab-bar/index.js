Component({
	data: {
		selected: 0,
		"selectedColor": "#518cee",
		"color": "#374966",
		"list": [{
				"pagePath": "/pages/shouye/index/index",
				"text": "云票据",
				"iconPath": "/images/tabbar/ypj.png",
				"selectedIconPath": "/images/tabbar/ypj_active.png"
			},
			{
				"heigher": true,
				"pagePath": "/pages/send/send",
				"text": "发布",
				"color": "518cee",
				"iconPath": "/images/tabbar/send_active.png",
				"selectedIconPath": "/images/tabbar/send_active.png"
			},
			{
				"pagePath": "/pages/my/my",
				"text": "我的",
				"iconPath": "/images/tabbar/profile.png",
				"selectedIconPath": "/images/tabbar/profile_active.png"
			}
		]
	},
	attached() {},
	methods: {
		switchTab(e) {
			const data = e.currentTarget.dataset
			const url = data.path
			this.setData({
				selected: data.index
			})
			wx.switchTab({
				url
			})
		}
	}
})
