var https = require('https');
var http = require('http');
var IHuyi = require("ihuyi106");
const SMSClient = require('@alicloud/sms-sdk')
module.exports = {
  httpRequest(options, res){
      var reqResult = http.request(options, (result) => {
        var str = "";
        result.on('data', (val) => {
          str += val;
        })
        result.on('end', () =>{
//        console.log(str);
          res.send(str)
        })
      })
      reqResult.on('error', function(err){
        console.log(err)
      })
      reqResult.end();
  },
  httpsRequest(options, res){
      var reqResult = https.request(options, (result) => {
        var str = "";
        result.on('data', (val) => {
          str += val;
        })
        result.on('end', () =>{
//        console.log(str);
          res.send(str)
        })
      })
      reqResult.on('error', function(err){
        console.log(err)
      })
      reqResult.end();
  },
  /*
   * 互亿无线发送短信
   * cnpm install ihuyi106 -S
   */
  hySendMsg(mobile, code, failCallBack, successCallBack){
    
    var account = ""; //对应APIID
    var password = "";//APIKEY
    var mobile = mobile;
    var content = "您的验证码是："+code+"。请不要把验证码泄露给其他人。";//短信模板内容
    
    var iHuyi = new IHuyi(account, password);
    iHuyi.send(mobile, content, function(err, smsId) {
        if(err) {
            console.log(err.message);
            failCallBack(err.message);
        } else {
            console.log("发送成功");
            successCallBack();
        }
    });
  },
  /*
   * 阿里云发送短信
   */
  aliyunSendMsg(mobile, res1){
    const accessKeyId = 'LTAIXlo59q84aFQq';
const secretAccessKey = 'hD3iZ8WCVQevyOHDVL4B5SA3gQLdEh';
//初始化sms_client
let smsClient = new SMSClient({accessKeyId, secretAccessKey})
//发送短信
smsClient.sendSMS({
    PhoneNumbers: mobile,
    SignName: '廉孟哲',
    TemplateCode: 'SMS_111785952',
    TemplateParam: '{"code":"12345","product":"云通信"}'
}).then(function (res) {
    let {Code}=res
    if (Code === 'OK') {
        //处理返回参数
        console.log(res)
        res1.send("1")
    }
}, function (err) {
    console.log(err)
     res1.send("0")
})
  }
}
