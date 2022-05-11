# 基础知识
##### 1. 事件模型（Event Model）
事件模型（Event Model）是以事件为基本研究对象，用来定义和描述一个用户在某个时间通过某种方式完成某个行为。事件的划分和定义，可以反映上报日志的名称和内在数据结构，需要业务根据自身情况需求进行合理设置
在事件模型中，定义的事件包括以下类型的信息。
![image.png](https://tencent-growth-platform-1251316161.cos.ap-beijing.myqcloud.com//sdk/images/weapp-sdk-demo/weapp_step1.png)

What： 描述用户所做的这个事件的具体内容。在平台中，会通过日志里的 eventCode 来区分用户的不同行为，例如登录、播放、购买、页面访问等。

Who： 即触发这次事件的用户。在平台中，会通过日志里的UIN字段默认分配一个设备唯一ID来标识当前用户，即设备ID。当然，也可以通过自定义其他字段来上报其他类型UID，例如imei、mac、guid、QQ号、OpenID、业务账号UID等。

When： 即这个事件发生的实际时间。在平台中，使用 event_time 字段来记录精确到毫秒的触发时间。如果由于网络问题延迟上报，事件原始触发时间不会发生变化。但是这条日志进入的分区可能会延后到第二天，因此分区时间ds可能包含少量不在当天触发的事件。建议尽量使用 event_time 事件触发时间来进行分析，更加反应事件的客观情况。

以上的 What、Who、When 是一条事件的3个基本要素，在事件定义中缺一不可。

Params： 即用户从事这个事件的方式。这个概念比较广，包括用户所在的地理位置、使用的设备、使用的浏览器、使用的 App 版本、操作系统版本、进入的渠道、跳转过来时的 referer 、当前行为的类别等。这些参数字段能够详细记录用户触发事件的具体情况属性，以便于进行灵活精准地数据分析工作。

在 Params 扩展属性参数这部分中，如果使用平台SDK上报，平台会预置一些参数字段作为接口供业务上报。预置字段能够使数据上报更加规范、减少由于对名称理解不一所导致的误解，因此建议尽量使用预置的字段上报对应信息，如果没有相应的预置字段，可以通过定义自定义参数字段来扩展上报。
##### 2.定义事件的 event code 和显示名
（一）定义事件event code的核心问题是如何把握事件的颗粒度。
理论上可以随意定义事件名称，然后交由开发按特定规则进行拼接、解析、统计。但是平台定位于自动敏捷分析，中间无人工参与，因此为了确保最终业务的分析使用效率，请重视这个环节。这个环节重要但是不复杂。
如果颗粒度过粗，例如命名为“页面访问事件”“点击事件”“内容曝光事件”，那么分析用户行为时，非常宽泛且没有针对性，并且总是需要结合多个参数字段，去筛选出特定的某项操作；
如果颗粒度过细，例如“首页点击播放音乐”“列表页点击播放音乐”“歌单页点击播放音乐”，便显得重复累赘，数量过多不便维护。
（二）具体怎么把握事件的划分呢？
通常一个App产品的事件数量， 不多于500个，不少于10个为宜 。（按产品功能复杂度有所调整，这个数字只是个参考。除非你的App是个类似QQ浏览器、手机QQ等，集成了复杂业务形态的超级App；或者是个手电筒App交互足够简单的工具App）



# 接入说明

### 集成SDK

#### 手动引入

![image.png](https://tencent-growth-platform-1251316161.cos.ap-beijing.myqcloud.com/sdk/images/weapp-sdk-demo/weapp_step2.png)

### 初始化SDK及上报

#### 引入头文件
```js
// 入口文件
const BeaconAction = require('./tgp_mini_sdk.min.js');
```

#### 初始化SDK

```js
const success = e => {  
  console.log('onReportSuccess : ' + e);  
};  
const fail = e => {  
  console.log('onReportFail : ' + e);  
};  
const beacon = new BeaconAction({  
  appkey: 'appkey', //小程序appKey，从灯塔官网获取,必填  
  reportUrl: 'https://xxx', // 上报url, 必填
  versionCode: 'versionCode', //小程序版本号，选填, 不设置会走默认配置   
  channelID: 'channelID', //小程序渠道号，选填, 不设置会走默认配置  
  openid: 'openid', // 用户标示符号，选填, 不设置会走默认配置   
  unionid: 'unionid', // 用户唯一标示符号，选填, 不设置会走默认配置   
  delay: 2000, // 普通事件延迟上报时间(单位毫秒), 默认2000(2秒),选填, 不设置会走默认配置   
  onPullDownRefresh: true,//下拉刷新事件统计，默认 开启，选填, 不设置会走默认配置   
  onReachBottom: true,//页面下拉触底统计，默认 开启，选填, 不设置会走默认配置   
  onReportSuccess: success, // 上报成功回调，选填, 不设置会走默认配置   
  onReportFail: fail, // 上报失败回调，选填, 不设置会走默认配置   
}); 

```
Appkey获取渠道之一：
- DataInsight官网地址 [https://growth.qq.com](https://growth.qq.com/)
![image.png](https://tencent-growth-platform-1251316161.cos.ap-beijing.myqcloud.com/sdk/images/weapp-sdk-demo/weapp_step3.png)


#### 至此，SDK已初始化完成，可以开始上报事件
平台 SDK 上报格式默认为 K-V 对形式。其中，Key 值有唯一含义，不需要通过其它解析标志其含义；Value 值有唯一含义，不需要通过其它解析标志其含义。
后端对接可支持 K-V 对形式及宽表结构数据。K-V 对格式要求如上，宽表结构数据要求每一列有明确的含义，不需要通过其它解析标志其含义
### SDK API

#### 普通事件上报接口

注意!!!! value 类型只能是 string 或者 number 类型, eventCode不允许与预置事件名相同

```js
beacon.onUserAction('eventCode', {
  'city': 'shenzhen'
});
```
#### 实时事件上报接口

注意!!!! value 类型只能是 string 或者 number 类型, eventCode不允许与预置事件名相同

```js
beacon.onDirectUserAction('eventCode', {
  'city': 'shenzhen'
});
```

#### 获取 设备id

```js
beacon.getDeviceId()
```
#### 设置公共参数

注意 !!!! , 相比老接口(setAdditionalParams)新接口是追加,老接口为替换

```js
beacon.addAdditionalParams({
  'additionalParams': 'params'
});
```

#### 手动上报 PV

```js
beacon.reportPV();
```
#### 设置 用户id

```js
beacon.setOpenId('openid');
```
#### 设置 unionid

```js
beacon.setUnionid('setUnionid');  
```
#### 设置 渠道id

```js
beacon.setChannelId('setChannelId');  
```

#### 设置用户信息

```js
// 获取用户信息  
wx.getSetting({  
  success: res => {  
    if (res.authSetting['scope.userInfo']) {  
      // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框  
      wx.getUserInfo({  
        success: res => {  
          beacon.setUserInfo(res);//灯塔会获取用户昵称  
        }  
      })  
    }  
  }  
})  
```

#### 设置位置信息

```js
wx.getLocation({  
  type: "wgs84",  
  success: res => {  
    beacon.setLocation(res);  
  }  
) 
```

### 事件上报

#### 上报事件登记

##### 进入到应用

![image.png](https://tencent-growth-platform-1251316161.cos.ap-beijing.myqcloud.com/sdk/images/weapp-sdk-demo/weapp_step4.png)
##### 登记事件（创建登记事件或查看登记事件）

![image.png](https://tencent-growth-platform-1251316161.cos.ap-beijing.myqcloud.com/sdk/images/weapp-sdk-demo/weapp_step5.png)

##### 对应事件上传代码展示

```js
// 上报实时事件
beacon.onDirectUserAction('testDemoButtonClick', {
  button_name: 'report_button1'
});

// 上报普通事件
beacon.onUserAction('testDemoButtonClick', {
  button_name: 'report_button1'
});
```

#### 判断事件的发送情况

#### 方法一

事件数据发送成功时，可以在微信开发者工具的 Network 模块中，可以看到 upload 的请求，如果状态码为 200，则代码事件数据发送成功。

![image.png](https://tencent-growth-platform-1251316161.cos.ap-beijing.myqcloud.com/sdk/images/weapp-sdk-demo/weapp_step12.png)


#### 方法二

借助初始化时设置的回调函数。回调函数用户可按自己需求定义，这里给到的是一种打印到微信开发者工具Console以查看事件发送情况的方案。

![image.png](https://tencent-growth-platform-1251316161.cos.ap-beijing.myqcloud.com/sdk/images/weapp-sdk-demo/weapp_step13.png)

#### 上报事件查看

![image.png](https://tencent-growth-platform-1251316161.cos.ap-beijing.myqcloud.com/sdk/images/weapp-sdk-demo/weapp_step14.png)

### 本地启动demo操作流程

1、安装微信开发者工具

下载地址：https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html
版本：选择【稳定版】

2、申请小程序测试号

申请地址：https://mp.weixin.qq.com/wxopen/waregister?action=step1

3、运行小程序测试demo

a. 打开微信开发者工具，点击“+”号按钮，弹出【创建小程序】弹窗

![image.png](https://tencent-growth-platform-1251316161.cos.ap-beijing.myqcloud.com/sdk/images/weapp-sdk-demo/weapp_step6.png)

b. 创建小程序。其中项目名称不做要求，可自定义填写；目录项选择【小程序测试demo】所在文件路径；AppID填写为之前准备阶段中你申请的小程序测试号。

![image.png](https://tencent-growth-platform-1251316161.cos.ap-beijing.myqcloud.com/sdk/images/weapp-sdk-demo/weapp_step7.png)

c. 点击菜单栏里的“真机调试”后，会弹出调试二维码，通过手机扫码，即可在手机端调起小程序。

![image.png](https://tencent-growth-platform-1251316161.cos.ap-beijing.myqcloud.com/sdk/images/weapp-sdk-demo/weapp_step15.png)

4、初始化参数填写示例

![image.png](https://tencent-growth-platform-1251316161.cos.ap-beijing.myqcloud.com/sdk/images/weapp-sdk-demo/weapp_step8.png)

5、事件上报填写示例

![image.png](https://tencent-growth-platform-1251316161.cos.ap-beijing.myqcloud.com/sdk/images/weapp-sdk-demo/weapp_step9.png)

6、事件上报日志展示

![image.png](https://tencent-growth-platform-1251316161.cos.ap-beijing.myqcloud.com/sdk/images/weapp-sdk-demo/weapp_step10.png)


### 扩展功能

#### 微信小程序打通H5

1、方案概述
 
 小程序与 H5 的数据打通，是小程序将必要预置属性（这里支持用户标识、用户ID和是否为新用户） 通过 URL 方式传递给 H5 端，H5 端解析URL替换对应事件属性，达到统一用户标识和其他必要属性的目的。
2、方案实现

调用 wx.setWebViewUrl(URL), 拼接好包含 distinctID 的 URL，微信小程序 V1.14.12 及以上版本支持；URL 参数是绑定的 web-view 的 src 属性值。

```js
// webview.js  
Page({  
  data: {  
    webUrl: ''  
  },  
  onLoad: function (options) {  
    const URL = 'https://example/demo.html' //必填项  
    this.setData({  
      webUrl: beacon.setWebViewUrl(URL)  
    });  
  }  
});  
// webview.wxml  
<web-view src="{{ webUrl }}"></web-view> 
```
