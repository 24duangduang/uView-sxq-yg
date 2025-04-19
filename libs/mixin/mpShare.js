module.exports = {
	async onLoad() {
		await this.$getToken;
		try{
			if (!uni.getStorageSync('userInfo')) return;
			var userInfo = JSON.parse(uni.getStorageSync('userInfo'));
			var shareLinkStr = uni.getStorageSync('shareLinkStr');
			
			if (!shareLinkStr) {
				if (!uni.getStorageSync('token')) return;
				this.$gather.user.getShareLink().then(res=>{
					uni.setStorageSync('shareLinkStr', res.data.shareLink);
					this.$u.mpShare = {
						title: '树小柒 厂家共享商城',
						path: `/pages/index/index?pid=${userInfo.uid}&shareLinkStr=${res.data.shareLink}`,
						imageUrl: ''
					}
				})
			} else {
				this.$u.mpShare = {
					title: '树小柒 厂家共享商城',
					path: `/pages/index/index?pid=${userInfo.uid}&shareLinkStr=${shareLinkStr}`,
					imageUrl: ''
				}
			}
			
			this.$on('hook:onShareAppMessage', () => {
				console.log('分享');
				console.log(this.$u.mpShare)
			})
		}catch(e){console.log(e)}
	},
	onUnload() {
		this.$off("hook:onShareAppMessage");
	},
	onShareAppMessage() {
		return this.$u.mpShare
	},
	// #ifdef MP-WEIXIN
	onShareTimeline() {
		return this.$u.mpShare
	}
	// #endif
}
