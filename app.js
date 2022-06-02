// sdk 初始化
var beacon = null;
// const BeaconAction = require('./utils/tgp_mini_sdk.min.js');
// beacon = new BeaconAction({
//   appkey: 'L319S5VT2AID4SZI', //小程序appKey，从灯塔官网获取,必填
//   channelID: 'beacon-mp-sdk-test', //小程序渠道号，选填
//   reportUrl: 'https://report.growth.qq.com/logserver/analytics/upload?tp=weapp',
//   isDebug : false ,//是否测试环境，选填
//   onPullDownRefresh: true,//下拉刷新事件统计，默认开启，选填
//   onReachBottom: true,//页面下拉触底统计，默认开启，选填
// }); 
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
