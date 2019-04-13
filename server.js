const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const path = require('path');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const Fanhui = require('./router/fanhuijie/index')
const router = express.Router();
const proxy = require('http-proxy-middleware');
const axios = require('axios')
app.use(cors());
// 设置token
const jwt = require('jsonwebtoken');

app.use(session({
  secret :  '12345', // 对session id 相关的cookie 进行签名
  cookie : {maxAge : 1000 * 60 * 60 * 24}, // 设置 session 的有效时间，单位毫秒},
  resave : false,
  saveUninitialized: true, // 是否保存未初始化的会话
}));
app.use(cookieParser());
// 设置跨域
app.all("*", function(req, res, next) {
  if (!req.get("Origin")) return next();
  // use "*" here to accept any origin
  res.set("Access-Control-Allow-Origin","*");
  res.set("Access-Control-Allow-Methods", "GET");
  res.set("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
  // res.set('Access-Control-Allow-Max-Age', 3600);
  if ("OPTIONS" === req.method) return res.sendStatus(200);
  next();
});
proxyOption = {
  target: 'http://mobile.yangkeduo.com',
  pathRewrite: {
     '^/api/' : '/' // 重写请求，api/解析为/
   },
   changeOrigoin:true
 };
 app.use('/api', proxy(proxyOption));
// app.get('/dd',  (req, res) => {
//   axios.get(`http://localhost:5000/api/proxy/api/api/alexa/v1/goods?list_update_time=true&platform=1&assist_allowed=1&page=1&size=20&list_id=pmU0WQ2fEM&antiContent=0alAfxn5ryloU9dVzi6xXe7XBEYG502O5QNB8_sG4p22Vf9cZQpuUSMMuP4fvPAT2nN2sRzPZRCJcDmM6oMfYm09lY0zZClJTeFxvvkvAz5EAwstf7TkLbAe_GAs8Kdb9D9fvfK4N2Q4Lw8cgv_72nB1XXrxZZqQDuMQa06HpaBQgKmVYPDK_6_9lbTI54qp_Oa2zncks1ZF8073pgAdxSZ3jp42uKgzO8PUpW_wSmnCZRJwK7JNPc5vPSD5-LZ5KxUavSrJmsU5HrR6UraPdHptbUfLQQSe9p8csiz_ZaglftvJe1jpM_GJmbSlQnWcjWjwdwemERWa6EMZLv2_sQCR3Y8Znl8QP1MQlsDAEb0sNzLpF0BuD0f38dbJrYuCHB_lsPr1RFoJTNJMU8ZrEIQaojNIRbnRoGIgjJ7&pdduid=1380431667033`)
//     .then(hot => {
//       res.json({
//         success_code: 200,
//         message: hot.data
//       })
//       console.log('用户进入了首页')
//     })
// })

//使用body-parser中间件
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

// 返惠街接口
app.use('/fanhui', Fanhui)

// app.use('/api',
//   proxy({
//       // 代理目标地址
//       target: "http://www.soso.com",
//       changeOrigin: true,
//       pathRewrite: {
//           // 地址重写
//           "/api": "/"
//       }
// }));


const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("服务器启动成功")
})
