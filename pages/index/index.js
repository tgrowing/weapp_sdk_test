// index.js
// 获取应用实例
const app = getApp()
const BeaconAction = require('../../utils/tgp_mini_sdk.min.js');
var success = e => {
  console.log('onReportSuccess : ' + e);
};
var fail = e => {
  console.log('onReportFail : ' + e);
};

var beacon = new BeaconAction({
  appkey: 'KSPOLJTM3Z9A4AL1', //小程序appKey，从灯塔官网获取,必填
  versionCode: '  ', //小程序版本号，选填
  channelID: 'beacon-mp-sdk-test', //小程序渠道号，选填
  openid: '', // 用户标示符号，选填
  reportUrl: 'https://otheve.beacon.qq.com/analytics/upload?tp=weapp', // 上报URL, 选填
  unionid: 'unionid', // 用户唯一标示符号，选填
  isDebug :false ,//是否测试环境，选填
  delay: 2000, // 普通事件延迟上报时间(单位毫秒), 默认2000(2秒),选填
  onPullDownRefresh: true,//下拉刷新事件统计，默认开启，选填
  onReachBottom: true,//页面下拉触底统计，默认开启，选填
  onReportSuccess: success, // 上报成功回调，选填
  onReportFail: fail, // 上报失败回调，选填
});

beacon.setCusHeaders({
  paasid: "zgt_dev_api",
  paastoken: "KGuC1nFvOpP1otrPgF43IxJaM6bPD8ZJ",
})

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName'), // 如需尝试获取用户信息可改为f
    // sdk
    reportUrl: 'http://129.204.58.230:31000/analytics/upload?tp=weapp',
    appkey: 'KSPOLJTM3Z9A4AL1',
    eventCode: '',
    customParam: ''
  },
  // 事件处理函数
  
  initSDK() {
    beacon = new BeaconAction({
      appkey: this.data.appkey, //小程序appKey，从灯塔官网获取,必填
      versionCode: 'versionCode', //小程序版本号，选填
      channelID: '', //小程序渠道号，选填
      openid: '', // 用户标示符号，选填
      reportUrl: this.data.reportUrl, // 上报URL, 选填
      unionid: 'unionid', // 用户唯一标示符号，选填
      isDebug :false ,//是否测试环境，选填
      delay: 2000, // 普通事件延迟上报时间(单位毫秒), 默认2000(2秒),选填
      onPullDownRefresh: true,//下拉刷新事件统计，默认开启，选填
      onReachBottom: true,//页面下拉触底统计，默认开启，选填
      onReportSuccess: success, // 上报成功回调，选填
      onReportFail: fail, // 上报失败回调，选填
    });
  },

  bindCustomEventReport() {
    if (this.data.customParam) {
      beacon.onDirectUserAction(this.data.eventCode, JSON.parse(this.data.customParam));
    } else {
      beacon.onDirectUserAction(this.data.eventCode);
    }
  },

  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad() {
    beacon.clearCusHeader
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })

    }
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
  getUserInfo(e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    console.log(e)
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  goPage() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
})
