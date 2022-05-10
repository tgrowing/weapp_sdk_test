// sdk 初始化
var beacon = null;

App({
  onLaunch() {
    this.sdk = {}
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    // 登录
    wx.login({
      success: res => {
      }
    })
  },
  onShow() {
    console.log('appshow');
  },
  onHide() {
    console.log('apphide');
  },
  globalData: {
    userInfo: null,
    beacon: beacon
  }
})
