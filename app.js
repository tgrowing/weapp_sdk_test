// app.js
// import config from './constant/config'
// const WxReportV2 = require('./components/report/report_v2.js');
// const wxReport = new WxReportV2(config.reportConfig);
// const BeaconAction = require('./utils/tgp_mini_sdk.min.js');
// var success = e => {
//   console.log('onReportSuccess : ' + e);
// };
// var fail = e => {
//   console.log('onReportFail : ' + e);
// };

// var beacon = new BeaconAction({
//   appkey: "KR49ODP129HU5NTD", //小程序appKey，从灯塔官网获取,必填
//   versionCode: 'versionCode', //小程序版本号，选填
//   channelID: '', //小程序渠道号，选填
//   openid: '', // 用户标示符号，选填
//   reportUrl: 'https://www.szsiq.com/track_api/logserver/analytics/upload?tp=weapp', // 上报URL, 选填
//   unionid: 'unionid', // 用户唯一标示符号，选填
//   isDebug :false ,//是否测试环境，选填
//   delay: 2000, // 普通事件延迟上报时间(单位毫秒), 默认2000(2秒),选填
//   onPullDownRefresh: true,//下拉刷新事件统计，默认开启，选填
//   onReachBottom: true,//页面下拉触底统计，默认开启，选填
//   onReportSuccess: success, // 上报成功回调，选填
//   onReportFail: fail, // 上报失败回调，选填
// });

App({
  onLaunch() {
    this.sdk = {}
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    // this.sdk.wxReport = wxReport
    // 登录
    wx.login({
      success: res => {
    //     // 普通上报
    //     beacon.onUserAction('ceshi666', {
    //       'city': 'shenzhen'
    //   });
    //   // 实时上报
    //   beacon.onDirectUserAction('eventCode', {
    //     'city': 'shenzhen'
    // });
        // this.sdk.wxReport.startReport()
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
  globalData: {
    userInfo: null,
    beacon: null
  }
})
