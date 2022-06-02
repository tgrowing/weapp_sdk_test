// index.js
// 获取应用实例
const app = getApp();
const BeaconAction = require('../../utils/tgp_mini_sdk.min.js');
var success = e => {
  console.log('onReportSuccess : ' + e);
};
var fail = e => {
  console.log('onReportFail : ' + e);
  wx.showToast({
    title: '事件上报失败',
    icon: 'error',
  });
};

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName'), // 如需尝试获取用户信息可改为f
    // sdk
    // reportUrl: 'https://report.growth.qq.com/logserver/analytics/upload?tp=weapp',
    reportUrl: '',
    appkey: 'L319S5VT2AID4SZI',
    newAppkey: '',
    eventCode: '',
    customParam: '',
    inited: false,
    stoped: false,
  },
  initSDK() {
    app.globalData.beacon = new BeaconAction({
      appkey: this.data.appkey, //小程序appKey，从灯塔官网获取,必填
      channelID: 'beacon-mp-sdk-test', //小程序渠道号，选填
      reportUrl: this.data.reportUrl,
      isDebug : false ,//是否测试环境，选填
      delay: this.data.delay || 0, // 普通事件延迟上报时间(单位毫秒), 默认5000(5秒),选填
      maxDBCount: this.data.maxDBCount || 0, // 存储最大值
      onPullDownRefresh: true,//下拉刷新事件统计，默认开启，选填
      onReachBottom: true,//页面下拉触底统计，默认开启，选填
      onReportSuccess: success, // 上报成功回调，选填
      onReportFail: fail, // 上报失败回调，选填
    });  
    wx.showToast({
      title: 'sdk初始化成功',
      icon: 'success',
    });
    this.setData({
      inited: true
    });
  },
  bindCustomEventReport() {
    if (!app.globalData.beacon) {
      wx.showToast({
        title: '请先初始化sdk',
        icon: 'error',
      });
      return;
    }
    if (!this.data.eventCode) {
      wx.showToast({
        title: '事件名不可为空',
        icon: 'error',
      });
      return;
    }
    if (this.data.customParam) {
      app.globalData.beacon.onUserAction(this.data.eventCode, JSON.parse(this.data.customParam));
    } else {
      app.globalData.beacon.onUserAction(this.data.eventCode);
    }
  },
  bindCustomEventReportBatch() {
    if (!app.globalData.beacon) {
      wx.showToast({
        title: '请先初始化sdk',
        icon: 'error',
      });
      return;
    }
    if (!this.data.eventCode) {
      wx.showToast({
        title: '事件名不可为空',
        icon: 'error',
      });
      return;
    }
    let i = 0;
    const count = 500;
    while(i < count) {
      if (this.data.customParam) {
        app.globalData.beacon.onUserAction(this.data.eventCode, JSON.parse(this.data.customParam));
      } else {
        app.globalData.beacon.onUserAction(this.data.eventCode);
      }
      i++;
    }
  },
  bindCustomRealEventReport() {
    if (!app.globalData.beacon) {
      wx.showToast({
        title: '请先初始化sdk',
        icon: 'error',
      });
      return;
    }
    if (!this.data.eventCode) {
      wx.showToast({
        title: '事件名不可为空',
        icon: 'error',
      });
      return;
    }
    if (this.data.customParam) {
      app.globalData.beacon.onDirectUserAction(this.data.eventCode, JSON.parse(this.data.customParam));
    } else {
      app.globalData.beacon.onDirectUserAction(this.data.eventCode);
    }
  },
  bindStopReport() {
    app.globalData.beacon.stopReport();
    this.setData({
      stoped: true
    });
  },
  bindStopReportIM() {
    app.globalData.beacon.stopReport(true);
    this.setData({
      stoped: true
    });
  },
  bindResumeReport() {
    app.globalData.beacon.resumeReport();
    this.setData({
      stoped: false
    });
  },
  setAppKey() {
    if (this.data.newAppkey) {
      app.globalData.beacon.setAppKey(this.data.newAppkey);
      wx.showToast({
        title: 'appkey更新成功',
        icon: 'success',
      });
    }
  },

  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad() {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // app.globalData.beacon.setUserInfo(res);//灯塔会获取用户昵称
            }
          })
        }
      }
    })
  },

  // 转发
  onShareAppMessage() {
    const promise = new Promise(resolve => {
      setTimeout(() => {
        resolve({
          title: '自定义转发标题'
        })
      }, 2000)
    })
    return {
      title: '自定义转发标题',
      path: '/page/user?id=123',
      promise 
    }
  },
  
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
  getUserInfo(e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
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
  goWebview() {
    wx.navigateTo({
      url: '../webview/index?a=1'
    })
  },
  onReachBottom() {
    // 触发下拉刷新
    wx.startPullDownRefresh();
  }
})
