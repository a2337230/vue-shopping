const express = require('express');
const router = express.Router();
const axios = require('axios');
const conn = require('./../../db/fhdb');
const svgCaptcha = require('svg-captcha');
const md5 = require('blueimp-md5');
const sms_util = require('./../../util/sms_util');
const superagent = require("superagent");
let users = {};
var cheerio = require('cheerio');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('111');
});

// 首页商品数据
router.get('/hotGoods', (req, res) => {
  let page = req.query.page || 1;
  let size = req.size || 40;
  axios.get(`http://mobile.yangkeduo.com/proxy/api/api/alexa/v1/goods?list_update_time=true&platform=1&assist_allowed=1&page=${page}&size=${size}&list_id=pmU0WQ2fEM&antiContent=0alAfxn5ryloU9dVzi6xXe7XBEYG502O5QNB8_sG4p22Vf9cZQpuUSMMuP4fvPAT2nN2sRzPZRCJcDmM6oMfYm09lY0zZClJTeFxvvkvAz5EAwstf7TkLbAe_GAs8Kdb9D9fvfK4N2Q4Lw8cgv_72nB1XXrxZZqQDuMQa06HpaBQgKmVYPDK_6_9lbTI54qp_Oa2zncks1ZF8073pgAdxSZ3jp42uKgzO8PUpW_wSmnCZRJwK7JNPc5vPSD5-LZ5KxUavSrJmsU5HrR6UraPdHptbUfLQQSe9p8csiz_ZaglftvJe1jpM_GJmbSlQnWcjWjwdwemERWa6EMZLv2_sQCR3Y8Znl8QP1MQlsDAEb0sNzLpF0BuD0f38dbJrYuCHB_lsPr1RFoJTNJMU8ZrEIQaojNIRbnRoGIgjJ7&pdduid=1380431667033`)
    .then(hot => {
      res.json({
        success_code: 200,
        message: hot.data
      })
      console.log('用户进入了首页')
    })
})
// 推荐页商品数据
router.get('/recommend', (req, res) => {
  let page = req.query.page || 1
  let size = page * 20 || 0
  console.log(size)
  axios.get(`http://mobile.yangkeduo.com/proxy/api/api/barrow/query?app_name=rectab_sim_gyl&offset=${size}&count=20&list_id=goods_RLky1Q&dp_list_id=single_M09os4&pdduid=0`)
    .then(hot => {
      res.json({
        success: 200,
        message: hot.data
      })
      console.log('用户已进入推荐页')
    })
})
// 搜索热词
router.get('/hotSearch', (req, res) => {
  let random = Math.ceil(Math.random() * 9380431666969 + 1)
  axios.get(`http://mobile.yangkeduo.com/proxy/api/search_hotquery?pdduid=${random}&is_back=1`)
    .then(hot => {
      res.json({
        success: 200,
        message: hot.data
      })
    })
})
// 推荐列表
router.get('/searchMenu', (req, res) => {
  setTimeout(function () {
    const data = require('./../../data/search.json');
    res.json({success_code: 200, message: data})
    console.log('用户进入了搜索页')
  },10)
})
// 商品详情页
router.get('/shopInfo', (req, res) => {
  let userId = req.session.userId
  let goods_id = req.query.goodsId
  let price = req.query.price
  superagent.get(`http://mobile.yangkeduo.com/goods.html?goods_id=${goods_id}&_oak_gallery=http%3A%2F%2Ft00img.yangkeduo.com%2Fgoods%2Fimages%2F2019-03-01%2F16739ecac9aca7930f22b22f387e21d4.jpeg&refer_page_name=index&refer_page_id=10002_1553861683278_clWUwi1VYs&refer_page_sn=10002`)
    .end((error, response) => {
      let content = response.text;
      let $ = cheerio.load(content);
      let result = {
        shop_title : $('.enable-select').text(),
        shop_price: $('.g-group-price').text().substr(1),
        count:$('.g-sales').text().substr(2),
        goods_mall_name: $('.goods-mall-name').text(),
        goods_description: content.substring(content.indexOf('"goodsDesc\":\"'),content.indexOf('\",\"goodsID\"')).substr(13),
        goods_des_img: [],
        goods_swiper: [],
        goods_mall_name: $('.goods-mall-name').text(),
        mall_logo: $('.mall-logo img').attr('src')
      };
      // 商品详情图片
      let disimgS = '"detailGallery":[{"url":"';
      let disimgE = '}]'
      let text1 = content.substring(content.indexOf(disimgS),content.indexOf(disimgE)).substr(disimgS.length).replace(/u002F/g,'').replace(/{"url":"\\\\/g,'')
      let imgData = text1.split('?imageMogr2\\quality\\70"').forEach(item => {
        let index = item.indexOf('t00img.yangkeduo.com')
        if (index !== -1) {
          result.goods_des_img.push(item.substr(index))
          let text3 = item.substr(index)
        }
      })
      // 轮播图
      let swiperS = '"viewImageData":'
      let swiperE = ',"detailGallery":[{"url"'
      let swiperInfo = text1 = content.substring(content.indexOf(swiperS),content.indexOf(swiperE)).substr(swiperS.length)
      result.goods_swiper = JSON.parse(swiperInfo)
      res.json({
        message: result
      })
      console.log("用户已经打开商品详情页")
      // 如果用户已经登录，添加浏览记录
      
      if (userId) {
        let hisData = {
          userId: userId,
          goodsId: goods_id,
          count: result.count,
          price: price,
          name: result.shop_title,
          img: 'http://' + result.goods_swiper[0]
        }
        const findStr = `SELECT * FROM history WHERE user_id=${userId} AND goods_id=${hisData.goodsId}`
        conn.query(findStr, (error, results, fields) => {
          if (results.length === 0) {
            const sqlStr = `INSERT INTO history (user_id,goods_id,thumb_url,normal_price,short_name,sales_tip) VALUES (?,?,?,?,?,?)`
            let params = [hisData.userId,hisData.goodsId,hisData.img,hisData.price,hisData.name,hisData.count]
            conn.query(sqlStr, params, (error, results, fields) => {
              console.log(`用户:${userId} 已经登录, 浏览了${goods_id} 商品详情页`)
            })
          } else {
            const delStr = `DELETE FROM history WHERE user_id=${userId} AND goods_id=${hisData.goodsId}`
            conn.query(delStr, (error, results, fields) => {
              if (!error) {
                const sqlStr = `INSERT INTO history (user_id,goods_id,thumb_url,normal_price,short_name,sales_tip) VALUES (?,?,?,?,?,?)`
                let params = [hisData.userId,hisData.goodsId,hisData.img,hisData.price,hisData.name,hisData.count]
                conn.query(sqlStr, params, (error, results, fields) => {
                  console.log(`用户:${userId} 已经登录, 浏览了${goods_id} 商品详情页`)
                })
              }
            })
          }
        })
      }
    })
})
// 详情页详细信息
router.get('/shopRec', (req, res) => {
  let goods_id = req.query.goodsId
  let data = {
    mall_recommend: null,
    shop_recommend: null
  }
  axios.get(`http://apiv3.yangkeduo.com/api/tesla/query?app_name=goods_detail_mall&goods_id=${goods_id}`)
    .then(shop => {
      data.mall_recommend = shop.data.data
    })
  axios.get(`http://apiv3.yangkeduo.com/api/tesla/query?app_name=goods_detail&goods_id=${goods_id}&page=1`)
    .then(rec => {
      data.shop_recommend = rec.data.data
    })
  let timer = setInterval(function () {
    if (data.shop_recommend) {
      res.json({
        success_code: 200,
        message: data
      })
      clearInterval(timer)
    }
  },20)
})
// 商家页信息
router.get('/mallInfo', (req, res) => {
  let mall_id = req.query.mallId
  let data = {
    mall_copons: {},
    mall_shop:{}
  }
  axios.get(`http://mobile.yangkeduo.com/proxy/api/mall/${mall_id}/info`)
    .then(mall => {
      if (mall.data.mall_id) {
        data.mall_copons = mall.data
        axios.get(`http://mobile.yangkeduo.com/proxy/api/api/turing/mall/query_mall_home_info?mall_id=${mall_id}`)
          .then(rec => {
            data.mall_shop = rec.data
            res.json({
              success_code: 200,
              message: data
            })
            console.log('用户进入了商家页面')
          })
      } else {
        res.json({
          error_code: 0,
          message: '数据库连接失败'
        })
      }
    })
})
// 商品搜索
router.get('/searchShop', (req, res) => {
  let keyword = req.query.keyword;
  let page = req.query.page
  axios({
    url: "http://apiv3.yangkeduo.com/search",
    methods: "GET",
    params: {
      q: keyword,
      requery: 0,
      page: page,
    },
    headers: {
      "User-Agent": "android Mozilla/5.0 (Linux; Android 8.1.0; vivo NEX A Build//OPM1.171019.019; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/62.0.3202.84 Mobile Safari/537.36  phh_android_version/3.23.0 phh_android_build/228842 phh_android_channel/qihu360"
    }
  }).then(res1 => {
    res.json({
      success: 200,
      message: res1.data.items
    })
    console.log(`用户进行了搜索,关键字${keyword}，用户名${req.session.userId}`)
  })
})
// 获取验证码
router.get('/captcha', (req, res) => {
  // 1. 生成随机验证码
  let captcha = svgCaptcha.create({
      color: true,
      noise: 3,
      ignoreChars: '0o1i',
      size: 4
  });
  // 2. 保存
  req.session.captcha = captcha.text.toLocaleLowerCase();
  // 3. 返回客户端
  res.type('svg');
  res.send(captcha.data);
});
// 短信验证码接口
router.get('/sendcode', (req,res) => {
  // 获取手机号码
  let phone = req.query.phone;
  // 生成验证码
  let code = sms_util.randomCode(6)
  sms_util.sendCode(phone, code, function (success) {
      if (success) {
        users[phone] = code;
        res.json({success_code: 200, message: "发送成功"})
        console.log(`手机用户${phone} 获取验证码成功了`)
      } else {
        console.log(success)
        res.json({err_code: 0, message: "验证码获取失败"})
      }
  })
})
// 短信登录
router.post('/login_code', (req, res) => {
  // 1. 获取数据
  const phone = req.body.phone;
  const code = req.body.code;
  const tel = 1;
  const random = Math.ceil(Math.random() * 272)
  const avatar = `http://jrf.lookmeinv.com/fanhuijie/${random}.png`
  // 2. 验证验证码是否正确
  if (users[phone] !== code) {
      res.json({err_code: 0, message: '验证码不正确!'});
  }

  // 3. 查询数据
  delete  users[phone];

  let sqlStr = "SELECT * FROM users WHERE user_phone = '" + phone + "' LIMIT 1";

  conn.query(sqlStr, (error, results, fields) => {
      if (error) {
          res.json({err_code: 0, message: '请求数据失败'});
      } else {
          results = JSON.parse(JSON.stringify(results));
          if (results[0]) {  // 用户已经存在
              req.session.userId = results[0].id;
              // 返回数据给客户端
              delete results[0].user_pwd
              res.json({
                  success_code: 200,
                  message: results[0]
              });
              console.log(`手机用户${phone} 进行了第N次登录`)
          } else { // 新用户
              const addSql = "INSERT INTO users (user_name, user_phone, user_avatar, user_pet, tel) VALUES (?, ?, ?, ?, ?)";
              const addSqlParams = [phone, phone, avatar, phone, tel];
              conn.query(addSql, addSqlParams, (error, results, fields) => {
                  results = JSON.parse(JSON.stringify(results));
                  if (!error) {
                      req.session.userId = results.insertId;
                      let sqlStr = "SELECT * FROM users WHERE id = '" + results.insertId + "' LIMIT 1";
                      conn.query(sqlStr, (error, results, fields) => {
                          if (error) {
                              res.json({err_code: 0, message: '请求数据失败'});
                          } else {
                              results = JSON.parse(JSON.stringify(results));
                              // 返回数据给客户端
                              delete results[0].user_pwd
                              res.json({
                                  success_code: 200,
                                  message: results[0]
                              });
                              console.log(`手机用户${phone} 进行了第1次登录`)
                          }
                      });
                  }
              });
          }
      }
  });

});
// 用户名登录
router.post('/login_pwd', (req, res) => {
  // 1. 获取数据
  const user_name = req.body.name;
  const user_pwd = md5(req.body.pwd);
  const captcha = req.body.captcha.toLowerCase();
  const random = Math.ceil(Math.random() * 272)
  const avatar = `http://jrf.lookmeinv.com/fanhuijie/${random}.png`
  // 2. 验证图形验证码是否正确
  if (captcha !== req.session.captcha) {
      res.json({err_code: 0, message: '图形验证码不正确!'});
      return;
  }
  // 3. 查询数据
  let sqlStr = "SELECT * FROM users WHERE user_name = '" + user_name + "' LIMIT 1";
  conn.query(sqlStr, (error, results, fields) => {
      if (error) {
          res.json({err_code: 0, message: '用户名不正确!'});
      } else {
          results = JSON.parse(JSON.stringify(results));
          if (results[0]) {  // 用户已经存在
              // 验证密码是否正确
              if (results[0].user_pwd !== user_pwd) {
                  res.json({err_code: 0, message: '密码不正确!'});
              } else {
                  req.session.userId = results[0].id;
                  // 返回数据给客户端
                  delete results[0].user_pwd
                  res.json({
                      success_code: 200,
                      message: results[0],
                      info: '登录成功!'
                  });
                  console.log(`已有用户${user_name} 进行了第N次登录`)
              }
          } else { // 新用户
              const addSql = "INSERT INTO users(user_name, user_pwd,user_avatar, user_pet) VALUES (?, ?,?, ?)";
              const addSqlParams = [user_name, user_pwd,avatar, user_name];
              conn.query(addSql, addSqlParams, (error, results, fields) => {
                  results = JSON.parse(JSON.stringify(results));
                  if (!error) {
                      req.session.userId = results.insertId;
                      let sqlStr = "SELECT * FROM users WHERE id = '" + results.insertId + "' LIMIT 1";
                      conn.query(sqlStr, (error, results, fields) => {
                          if (error) {
                              res.json({err_code: 0, message: '请求数据失败'});
                          } else {
                              results = JSON.parse(JSON.stringify(results));
                              // 返回数据给客户端
                              delete results[0].user_pwd
                              res.json({
                                  success_code: 200,
                                  message: results[0]
                              });
                              console.log(`新用户${user_name} 进行了登录`)
                          }
                      });
                  }
              });
          }
      }
  });
});
// 根据session的用户数据获取用户信息
router.get('/user_info', (req,res) => {
  let userId = req.session.userId;
  let sqlStr = "SELECT * FROM users WHERE id = '" + userId + "' LIMIT 1";
  conn.query(sqlStr, (error, results, fields) => {
      if (error) {
          res.json({err_code: 0, message: '请求数据失败'});
      } else {
        results = JSON.parse(JSON.stringify(results));
        if (!results[0]) {
          delete req.session.userId
          res.json({
            error_code: 1,
            message: "请登录"
          })
        } else {
          // 返回数据给客户端
          delete results[0].user_pwd
          res.json({
            success_code: 200,
            message: results[0]
          });
          // 后端输出用户登录信息
          let nodeLogin = results[0].user_phone?results[0].user_phone:results[0].user_name
          console.log(`用户请求了用户信息成功,登录信息${nodeLogin}`)
        }
      }
  });
})
// 签到
router.get('/me_sign', (req, res) => {
  let userId = req.session.userId;
  let sqlStr = `UPDATE users SET sign='1',user_sign=user_sign+1 WHERE id=${userId}`
  conn.query(sqlStr, (error, results, fields) => {
    if (!error) {
      res.json({
        success_code: 200,
        message: "签到成功"
      })
      console.log(`用户${userId}进行了签到`)
    }
  })
})
// 加入购物车
router.get('/shop_cat', (req, res) => {
  let data = req.query
  let userId = req.session.userId
  console.log(userId)
  let sqlStr = `SELECT * FROM shopcat WHERE user_id=${userId} AND goods_id=${data.shop_id}`
  conn.query(sqlStr, (error, results, fields) => {
    if (results[0]) {
      let upStr = `UPDATE shopcat SET count=count+1 WHERE user_id=${userId} AND goods_id=${data.shop_id}`
      conn.query(upStr, (error, results, fields) => {
        res.json({
          success_code: 200,
          message: '添加购物车成功'
        })
        console.log(`用户${userId}进行了添加购物车`)
      })
    } else {
      let addStr = `INSERT INTO shopcat(user_id,goods_id,thumb_url,price,goods_name,count, tip, mall_id, mall_name, mall_logo) VALUES(?,?,?,?,?,?,?,?,?,?)`
      let sqlParams = [userId,data.shop_id,'http:' + data.thumb_url, data.price, data.goods_name, 1, data.tip, data.mallId, data.mallTitle, data.mallLogo]
      conn.query(addStr, sqlParams, (error, results, fields) => {
        res.json({
          success_code: 200,
          message: '添加购物车成功'
        })
        console.log(`用户${userId}进行了添加购物车`)
      })
    }
  })
})
// 查询购物车
router.get('/find_cat', (req, res) => {
  let userId = req.session.userId
  let sqlStr = `SELECT * FROM shopcat WHERE user_id=${userId}`
  
  conn.query(sqlStr, (error, results, fields) => {
    res.json({
      success_code: 200,
      message: results
    })
  })
})
// 用户购物车选择
router.get('/cat_checked', (req, res) => {
  let userId = req.session.userId
  let goodsId = req.query.goodsId
  let checked = req.query.check
  const sqlStr = `UPDATE shopcat SET checked=${checked} WHERE user_id=${userId} AND goods_id=${goodsId}`
  conn.query(sqlStr, (error, results, fields) => {
    res.json({
      success_code: 200,
      message: '选择成功'
    })
  })
})
// 用户全选
router.get('/cat_all_checked', (req, res) => {
  let userId = req.session.userId
  let checked = req.query.check
  const allStr = `UPDATE shopcat SET checked=${checked} WHERE user_id=${userId}`
  conn.query(allStr, (error, results, fields) => {
    res.json({
      success_code: 200,
      message: '选择成功'
    })
  })
})
// 购物车增减
router.get('/cat_update', (req, res) => {
  let userId = req.session.userId
  let count = req.query.count
  let goodsId = req.query.goodsId
  const allStr = `UPDATE shopcat SET count=count + ${count} WHERE user_id=${userId} AND goods_id=${goodsId}`
  conn.query(allStr, (error, results, fields) => {
    res.json({
      success_code: 200,
      message: '购物车更改成功'
    })
    console.log(`用户${userId} 进行了更改购物车`)
  })
})
// 查找历史记录
router.get('/history', (req, res) => {
  let userId = req.session.userId
  const hisStr = `SELECT * FROM history WHERE user_id=${userId} ORDER BY id DESC LIMIT 40`
  conn.query(hisStr, (error, result) => {
    res.json({
      success: 200,
      message: result
    })
    console.log(`用户${userId} 进行了查找历史记录`)
  })
})
// 查询收藏
router.get('/findColl', (req, res) => {
  let userId = req.session.userId
  let goodsId = req.query.goodsId
  const findStr = `SELECT * FROM coll WHERE user_id=${userId} AND goods_id=${goodsId}`
  conn.query(findStr, (error, result) => {
    if (!result || result.length === 0) {
      res.json({
        coll_code: 0
      })
    } else {
      res.json({
        coll_code: 1
      })
    }
  })

  // console.log(hisData)
  // if (userId) {
  //   let hisData = {
  //     userId: userId,
  //     goodsId: goodsId,
  //     count: req.query.count,
  //     price: req.query.price,
  //     name: req.query.name,
  //     img: req.query.img
  //   }
  //   const findStr = `SELECT * FROM history WHERE user_id=${userId} AND goods_id=${hisData.goodsId}`
  //   conn.query(findStr, (error, results, fields) => {
  //     if (results.length === 0) {
  //       const sqlStr = `INSERT INTO history (user_id,goods_id,thumb_url,normal_price,short_name,sales_tip) VALUES (?,?,?,?,?,?)`
  //       let params = [hisData.userId,hisData.goodsId,hisData.img,hisData.price,hisData.name,hisData.count]
  //       conn.query(sqlStr, params, (error, results, fields) => {
  //         console.log(`用户:${userId} 已经登录, 浏览了${goods_id} 商品详情页`)
  //       })
  //     } else {
  //       const delStr = `DELETE FROM history WHERE user_id=${userId} AND goods_id=${hisData.goodsId}`
  //       conn.query(delStr, (error, results, fields) => {
  //         if (!error) {
  //           const sqlStr = `INSERT INTO history (user_id,goods_id,thumb_url,normal_price,short_name,sales_tip) VALUES (?,?,?,?,?,?)`
  //           let params = [hisData.userId,hisData.goodsId,hisData.img,hisData.price,hisData.name,hisData.count]
  //           conn.query(sqlStr, params, (error, results, fields) => {
  //             console.log(`用户:${userId} 已经登录, 浏览了${goods_id} 商品详情页`)
  //           })
  //         }
  //       })
  //     }
  //   })
  // }
})
// 加入收藏
router.get('/coll', (req, res) => {
  let userId = req.session.userId
  let goodsId = req.query.goodsId
  let img = req.query.img
  let price = req.query.price
  let name = req.query.name
  let count = req.query.count
  const findStr = `SELECT * FROM coll WHERE user_id=${userId} AND goods_id=${goodsId}`
  conn.query(findStr, (error, results) => {
    if (results.length === 0) {
      const sqlStr = `INSERT INTO coll (user_id,goods_id,thumb_url,normal_price,short_name,sales_tip) VALUES (?,?,?,?,?,?)`
      const params= [userId, goodsId, img, price, name, count]
      conn.query(sqlStr, params, (error, results) => {
        res.json({
          coll_code: 1
        })
      })
      console.log(`用户：${userId} 已添加收藏， 加入收藏商品ID为${goodsId}`)
    } else {
      const delStr = `DELETE FROM coll WHERE user_id=${userId} AND goods_id=${goodsId}`
      conn.query(delStr, (error, results) => {
        res.json({
          coll_code: 0
        })
      })
      console.log(`用户：${userId} 已取消收藏, 取消收藏商品ID为${goodsId}`)
    }
  })
})
// 查询用户全部收藏
router.get('/allColl', (req, res) => {
  const userId = req.session.userId
  const findStr = `SELECT * FROM coll WHERE user_id=${userId}`
  conn.query(findStr, (error, results) => {
    res.json({
      success: 200,
      message: results
    })
    console.log(`用户${userId} 查询了收藏`)
  })
})
// 模拟购买
router.get('/buyShop', (req, res) => {
  let userId = req.session.userId
  let goodsId = req.query.goodsId
  let img = req.query.img
  let price = req.query.price
  let name = req.query.name
  let count = req.query.count
  let mallId = req.query.mallId
  let mallName = req.query.mallTitle
  let mallLogo = req.query.mallLogo
  const findStr = `SELECT * FROM buyshop WHERE user_id=${userId} AND goods_id=${goodsId} AND buy_state < 4`
  conn.query(findStr, (error, results) => {
    if (results.length === 0) {
      const sqlStr = `INSERT INTO buyshop (user_id,goods_id,thumb_url,normal_price,short_name,sales_tip, buy_state, mall_id, mall_name, mall_logo) VALUES (?,?,?,?,?,?,?,?,?,?)`
      const params= [userId, goodsId, img, price, name, count, 1, mallId, mallName, mallLogo]
      conn.query(sqlStr, params, (error, results) => {
        res.json({
          success: 200,
          message: results
        })
      })
      console.log(`用户：${userId} 已模拟购买`)
    } else {
      const delStr = `DELETE FROM buyshop WHERE user_id=${userId} AND goods_id=${goodsId}`
      conn.query(delStr, (error, results) => {
        const sqlStr = `INSERT INTO buyshop (user_id,goods_id,thumb_url,normal_price,short_name,sales_tip, buy_state, mall_id, mall_name, mall_logo) VALUES (?,?,?,?,?,?,?,?,?,?)`
        const params= [userId, goodsId, img, price, name, count, 1, mallId, mallName, mallLogo]
        conn.query(sqlStr, params, (error, results) => {
          res.json({
            success: 200,
            message: results
          })
        })
        console.log(`用户：${userId} 已模拟购买`)
      })
    }
  })
})
// 批量购买
router.post('/all_cat', (req, res) => {
  let userId = req.session.userId
  let allCat = req.body.allCat
  allCat.forEach(item => {
    let goodsId = item.goods_id
    let img = item.thumb_url
    let price = item.price
    let name = item.goods_name
    let count = item.count
    let mallId = item.goods_id
    let mallName = item.mall_name
    let mallLogo = item.mall_logo
    console.log(userId, goodsId, img, price, name, count, 1, mallId, mallName, mallLogo)
    const findStr = `SELECT * FROM buyshop WHERE user_id=${userId} AND goods_id=${goodsId} AND buy_state < 4`
    conn.query(findStr, (error, results) => {
      if (!results) {
        const sqlStr = `INSERT INTO buyshop (user_id,goods_id,thumb_url,normal_price,short_name,buy_num, buy_state, mall_id, mall_name, mall_logo) VALUES (?,?,?,?,?,?,?,?,?,?)`
        const params= [userId, goodsId, img, price, name, count, 1, mallId, mallName, mallLogo]
        conn.query(sqlStr, params, (error, results) => {
          console.log(`用户：${userId} 已模拟批量购买,购买商品${goodsId}`)
        })
      } else {
        const delStr = `DELETE FROM buyshop WHERE user_id=${userId} AND goods_id=${goodsId}`
        conn.query(delStr, (error, results) => {
          const sqlStr = `INSERT INTO buyshop (user_id,goods_id,thumb_url,normal_price,short_name,buy_num, buy_state, mall_id, mall_name, mall_logo) VALUES (?,?,?,?,?,?,?,?,?,?)`
          const params= [userId, goodsId, img, price, name, count, 1, mallId, mallName, mallLogo]
          conn.query(sqlStr, params, (error, results) => {
            console.log(`用户：${userId} 已模拟批量购买,购买商品${goodsId}`)
          })
        })
      }
    })
    const delStr = `DELETE FROM shopcat WHERE user_id=${userId} AND goods_id=${goodsId}`
    conn.query(delStr, (error, results) => {})
  })
  res.json({
    success: 200,
    message: '批量加入购物车成功'
  })
})
// 查询模拟购买单分类
router.get('/buyShopOne', (req, res) => {
  let userId = req.session.userId
  let type = req.query.type
  const sqlStr = `SELECT * FROM buyshop WHERE user_id=${userId} AND buy_state=${type}`
  conn.query(sqlStr, (error, results) => {
    res.json({
      success: 200,
      message: results
    })
  })
  let info = ''
  if (type == 1) {
    info = '已付款'
  } else if (type == 2) {
    info = '已发货'
  } else if (type == 2) {
    info = '已收货'
  } else {
    info = '已评价'
  }
  console.log(`用户${userId} 查询了${info} 订单`)
})
// 修改个人信息
router.post('/updatePersonal', (req, res) => {
  let userId = req.session.userId
  let sex = req.body.sex
  let birthday = req.body.birthday
  let city = req.body.city
  let pet = req.body.pet
  let upStr = ''
  if (sex) {
    upStr = `UPDATE users SET user_sex='${sex}' WHERE id=${userId}`
  } else if (birthday) {
    upStr = `UPDATE users SET user_birthday='${birthday}' WHERE id=${userId}`
  } else if (city) {
    upStr = `UPDATE users SET user_address='${city}' WHERE id=${userId}`
  } else {
    upStr = `UPDATE users SET user_pet='${pet}' WHERE id=${userId}`
  }
  conn.query(upStr, (error, result) => {
    const findStr = `SELECT * FROM users WHERE id=${userId}`
    conn.query(findStr, (error, result) => {
      res.json({
        success: 200,
        message: result[0]
      })
      console.log(`用户${userId} 修改了个人信息`)
    })
  })
})
// 退出登录
router.get('/loginout', (req, res) => {
  console.log(`用户${req.session.userId} 已退出登录`)
  delete req.session.userId
  res.json({
    success: 200,
    message: '退出登录成功'
  })
})
// 保存收货地址
router.post('/setaddress', (req, res) => {
  const userId = req.session.userId
  const name = req.body.name
  const tel = req.body.tel
  const city = req.body.city
  const address = req.body.address
  const sqlStr = `SELECT * FROM address WHERE user_id=${userId}`
  conn.query(sqlStr, (error, result) => {
    if (result.length === 0) {
      const addSql = `INSERT INTO address(user_id, name, tel, city, address) VALUES(?,?,?,?,?)`
      const params = [userId, name, tel, city, address]
      conn.query(addSql, params, (error, results) => {
        conn.query(sqlStr, (error, result) => {
          res.json({
            success: 200,
            message: result[0]
          })
          console.log(`用户${userId} 第一次修改了收货地址`)
        })
      })
    } else {
      const upStr = `UPDATE address SET name='${name}',tel='${tel}',city='${city}',address='${address}' WHERE user_id=${userId}`
      conn.query(upStr, (error, result) => {
        conn.query(sqlStr, (error, result) => {
          res.json({
            success: 200,
            message: result[0]
          })
          console.log(`用户${userId} 第N次修改了收货地址`)
        })
      })
    }
  })
})
// 查询收货地址
router.post('/findaddress', (req, res) => {
  const userId = req.session.userId
  const sqlStr = `SELECT * FROM address WHERE user_id=${userId}`
  conn.query(sqlStr, (error, result) => {
    res.json({
      success: 200,
      message: result
    })
    console.log(`用户${userId} 查询了收货地址`)
  })
})
module.exports = router;