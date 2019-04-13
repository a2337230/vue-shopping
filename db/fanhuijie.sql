/*
Navicat MySQL Data Transfer

Source Server         : my
Source Server Version : 50718
Source Host           : rm-2ze9k65q394ma1y2u4o.mysql.rds.aliyuncs.com:3306
Source Database       : fanhuijie

Target Server Type    : MYSQL
Target Server Version : 50718
File Encoding         : 65001

Date: 2019-04-14 00:32:19
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for address
-- ----------------------------
DROP TABLE IF EXISTS `address`;
CREATE TABLE `address` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `tel` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of address
-- ----------------------------
INSERT INTO `address` VALUES ('10', '7', '张三', '13517684611', '山西省 长治市 襄垣县', '撒大口径萨克的尽快撒娇的看撒娇打开');
INSERT INTO `address` VALUES ('11', '14', '苟日新', '13864978461', '山西省 阳泉市 矿区', '随心所欲类型何时有空123123');

-- ----------------------------
-- Table structure for buyshop
-- ----------------------------
DROP TABLE IF EXISTS `buyshop`;
CREATE TABLE `buyshop` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` varchar(255) DEFAULT NULL,
  `goods_id` varchar(255) DEFAULT NULL,
  `thumb_url` varchar(255) DEFAULT NULL,
  `normal_price` varchar(255) DEFAULT NULL,
  `short_name` varchar(255) DEFAULT NULL,
  `sales_tip` varchar(255) DEFAULT NULL,
  `buy_state` int(11) DEFAULT NULL,
  `mall_logo` varchar(255) DEFAULT NULL,
  `mall_name` varchar(255) DEFAULT NULL,
  `mall_id` varchar(255) DEFAULT NULL,
  `buy_num` int(11) DEFAULT '1',
  `date_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=177 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of buyshop
-- ----------------------------
INSERT INTO `buyshop` VALUES ('172', '14', '38468536', 'http://omsproductionimg.yangkeduo.com/images/2017-07-31/9c4d9e0e47f2004d8394f29bfbaa35f8.jpeg@750w_1l_50Q.src', '7200', '慕倩夏天透气怀孕期托腹带孕妇用品产前专用三件套孕妈拖腹护腰带', null, '4', '//t16img.yangkeduo.com/pdd_ims/ebd874fa24954c830567efa36c71edea.jpg', '恬贝锘儿', '38468536', '2', '2019-04-09 06:58:32');
INSERT INTO `buyshop` VALUES ('173', '14', '5739416779', 'http://t00img.yangkeduo.com/openapi/images/2019-01-19/7ca918544dbc22838031d19daeef8b54.jpeg?imageMogr2/quality/70', '36180', '十月天使孕妇护肤品孕妈专用保湿补水礼盒套装产后产妇化妆品正品', null, '4', '//t16img.yangkeduo.com/pdd_ims/1a689c49f4f2c26034e871392810ab52.png', '玫瑰花宝宝', '5739416779', '3', '2019-04-09 06:58:32');
INSERT INTO `buyshop` VALUES ('174', '28', '33368163', 'http://t11img.yangkeduo.com/images/2018-03-26/59269f819b1a43d6635c9524a54cd5f7.jpeg?imageMogr2/quality/70', '1800', '广东茂名 新鲜现挖紫薯小紫薯 番薯地瓜越南红薯香薯紫芋头 5斤装', null, '4', '//t16img.yangkeduo.com/pdd_ims/f5825792b104776a10941c0a960961ae.jpg', '好又来农家食品', '33368163', '4', '2019-04-10 23:15:02');
INSERT INTO `buyshop` VALUES ('175', '29', '163356862', '//t00img.yangkeduo.com/goods/images/2018-12-21/f9db79db5bb77536edd6ae87345996c6.jpeg?imageMogr2/quality/70', '1100', '净重新货【七猩猩】夏威夷果500g/110g袋奶油味/原味坚果零食小吃', '已拼10万 件', '4', '//t16img.yangkeduo.com/pdd_ims/e31dbc2d33c52cd330de3694b863fb00.jpg', '七猩猩官方旗舰店', '484743', '1', '2019-04-11 21:05:48');
INSERT INTO `buyshop` VALUES ('176', '29', '7400941517', 'http://t00img.yangkeduo.com/goods/images/2019-04-10/8be5a997-a406-42a1-b4bb-92b4245a7858.jpg?imageMogr2/quality/70', '4100', '【短袖短裤套装】金洋船夏季薄款男士短袖套装5分裤男装潮', null, '4', '//t16img.yangkeduo.com/pdd_ims/2e12ae7ce70948ae16624992cd2232dc.jpg', '金洋船黑骑专卖店', '7400941517', '3', '2019-04-11 21:29:32');

-- ----------------------------
-- Table structure for coll
-- ----------------------------
DROP TABLE IF EXISTS `coll`;
CREATE TABLE `coll` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` varchar(255) DEFAULT NULL,
  `goods_id` varchar(255) DEFAULT NULL,
  `thumb_url` varchar(255) DEFAULT NULL,
  `normal_price` varchar(255) DEFAULT NULL,
  `short_name` varchar(255) DEFAULT NULL,
  `sales_tip` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=70 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of coll
-- ----------------------------
INSERT INTO `coll` VALUES ('68', '29', '650572548', '//t00img.yangkeduo.com/goods/images/2019-03-23/8935b8a2-ca51-4d05-90c1-4953a17ffed2.jpg?imageMogr2/quality/70', '29800', '【金洋船】刺绣套装男中国风纯棉男装潮流半袖套装2019夏季新款', '已拼10万 件');
INSERT INTO `coll` VALUES ('69', '29', '7400941517', '//t00img.yangkeduo.com/goods/images/2019-04-10/8be5a997-a406-42a1-b4bb-92b4245a7858.jpg?imageMogr2/quality/70', '4100', '【短袖短裤套装】金洋船夏季薄款男士短袖套装5分裤男装潮', '已拼6人想买');

-- ----------------------------
-- Table structure for history
-- ----------------------------
DROP TABLE IF EXISTS `history`;
CREATE TABLE `history` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` varchar(255) DEFAULT NULL,
  `goods_id` varchar(255) DEFAULT NULL,
  `thumb_url` varchar(255) DEFAULT NULL,
  `normal_price` varchar(255) DEFAULT NULL,
  `short_name` varchar(255) DEFAULT NULL,
  `sales_tip` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=397 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of history
-- ----------------------------
INSERT INTO `history` VALUES ('386', '28', '616398016', 'http:////t04img.yangkeduo.com/images/2018-03-05/8a913f9174125b8d0c1560120d90d2e0.jpeg?imageMogr2/quality/70', '2200', '【送酸梅粉】台湾珍珠番石榴芭乐广东白心现摘番石榴5斤装8至12装', '933件');
INSERT INTO `history` VALUES ('387', '28', '33368163', 'http:////t11img.yangkeduo.com/images/2018-03-26/59269f819b1a43d6635c9524a54cd5f7.jpeg?imageMogr2/quality/70', '1800', '广东茂名 新鲜现挖紫薯小紫薯 番薯地瓜越南红薯香薯紫芋头 5斤装', '260件');
INSERT INTO `history` VALUES ('390', '29', '163356862', '//t00img.yangkeduo.com/goods/images/2018-12-21/f9db79db5bb77536edd6ae87345996c6.jpeg?imageMogr2/quality/70', '1100', '净重新货【七猩猩】夏威夷果500g/110g袋奶油味/原味坚果零食小吃', '已拼10万 件');
INSERT INTO `history` VALUES ('393', '29', '650572548', '//t00img.yangkeduo.com/goods/images/2019-03-23/8935b8a2-ca51-4d05-90c1-4953a17ffed2.jpg?imageMogr2/quality/70', '29800', '【金洋船】刺绣套装男中国风纯棉男装潮流半袖套装2019夏季新款', '已拼10万 件');
INSERT INTO `history` VALUES ('394', '29', '7400941517', '//t00img.yangkeduo.com/goods/images/2019-04-10/8be5a997-a406-42a1-b4bb-92b4245a7858.jpg?imageMogr2/quality/70', '4100', '【短袖短裤套装】金洋船夏季薄款男士短袖套装5分裤男装潮', '已拼6人想买');
INSERT INTO `history` VALUES ('395', '29', '1063911390', '//t00img.yangkeduo.com/goods/images/2019-01-16/1138865d-a2bf-4f7b-acb2-7f0baa76bc5e.jpg?imageMogr2/quality/70', '3990', '【金洋船】短袖t恤男冰丝大码打底衫V领潮薄款学生上衣服男装', '已拼');
INSERT INTO `history` VALUES ('396', '30', '163356862', '//t00img.yangkeduo.com/goods/images/2018-12-21/f9db79db5bb77536edd6ae87345996c6.jpeg?imageMogr2/quality/70', '1100', '净重新货【七猩猩】夏威夷果500g/110g袋奶油味/原味坚果零食小吃', '已拼10万 件');

-- ----------------------------
-- Table structure for shopcat
-- ----------------------------
DROP TABLE IF EXISTS `shopcat`;
CREATE TABLE `shopcat` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` varchar(255) DEFAULT NULL,
  `goods_id` varchar(255) DEFAULT NULL,
  `thumb_url` varchar(255) DEFAULT NULL,
  `price` varchar(255) DEFAULT NULL,
  `goods_name` varchar(255) DEFAULT NULL,
  `count` int(255) DEFAULT NULL,
  `checked` int(11) NOT NULL,
  `tip` varchar(255) DEFAULT NULL,
  `mall_logo` varchar(255) DEFAULT NULL,
  `mall_name` varchar(255) DEFAULT NULL,
  `mall_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=139 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of shopcat
-- ----------------------------
INSERT INTO `shopcat` VALUES ('34', '10', '136743768', 'http://t08img.yangkeduo.com/images/2018-05-07/3ef6e7d6f33e2803ea5acec05d0e0cb6.jpeg?imageMogr2/quality/70', '780', '3-8幼儿园数字汉字拼音画画写字练字帖儿童学前启蒙小孩练字本', '1', '0', '', '//t16img.yangkeduo.com/pdd_ims/63563732c0a6c8e92eb7eb2abb1d84e2.png', '最美时刻美体店', '469360');
INSERT INTO `shopcat` VALUES ('35', '10', '2120374942', 'http://t00img.yangkeduo.com/t07img/images/2018-07-22/daf47aecc246e540aef2557c519207ea.jpeg?imageMogr2/quality/70', '1380', '春夏季防晒口罩护颈女士雪纺透气面罩骑车开车防紫外线小丝巾围脖', '1', '0', '10万 件', '//t16img.yangkeduo.com/pdd_ims/ae23b0f7cfa1c60c7f2bc1c1adbcb679.jpg', '呼吸自由口罩店', '834403');
INSERT INTO `shopcat` VALUES ('36', '10', '1084602003', 'http://t00img.yangkeduo.com/goods/images/2018-07-31/63ace578c1a12553eed39b98732586f5.jpeg?imageMogr2/quality/70', '960', '【超软毛 搓澡神器】洗澡刷 长柄浴刷搓背刷搓澡刷软毛沐背洗澡刷', '1', '0', '9.1万件', '//t16img.yangkeduo.com/pdd_ims/4f0a1677253ce48325262a7fbcabc3cd.png', '姐妹淘生活馆', '293987982');
INSERT INTO `shopcat` VALUES ('37', '10', '144304661', 'http://t00img.yangkeduo.com/goods/images/2019-04-08/4ffd4339-969c-4359-9271-15b9af8c0fd6.jpg?imageMogr2/quality/70', '618900', '【全新国行正品带票】iPhone X 64G全网通4G苹果手机领券请看详情【预售：4月12日发完】', '1', '0', '', '//t00img.yangkeduo.com/goods/images/2019-01-21/bc6507dd-e7a2-4e3a-a42e-a0c4948c12fb.jpg', '途谷官方旗舰店', '398601');
INSERT INTO `shopcat` VALUES ('38', '10', '79403106', 'http://t00img.yangkeduo.com/goods/images/2019-04-08/4ffd4339-969c-4359-9271-15b9af8c0fd6.jpg?imageMogr2/quality/70', '473800', '【全新国行正品带票】iPhone X 64G全网通4G苹果手机领券请看详情【预售：4月12日发完】', '1', '0', '', '//t00img.yangkeduo.com/goods/images/2019-01-21/bc6507dd-e7a2-4e3a-a42e-a0c4948c12fb.jpg', '途谷官方旗舰店', '398601');
INSERT INTO `shopcat` VALUES ('39', '10', '79403096', 'http://t00img.yangkeduo.com/goods/images/2018-08-01/5cab9f743338d700f93d22cd796e2b53.jpeg?imageMogr2/quality/70', '378800', '【全新国行正品带票】iPhone8 全网通4G手机 Apple 苹果', '2', '0', '2202件', '//t00img.yangkeduo.com/goods/images/2019-01-21/bc6507dd-e7a2-4e3a-a42e-a0c4948c12fb.jpg', '途谷官方旗舰店', '398601');
INSERT INTO `shopcat` VALUES ('40', '10', '2781495715', 'http://t00img.yangkeduo.com/goods/images/2018-09-03/5abc7f4aa9b642c730a1b5cfdbdcff55.jpeg?imageMogr2/quality/70', '3390', '智能手环OPPO小米VIVO华为苹果三星等智能手机通用心率运动手表', '1', '0', '7.4万件', '//t16img.yangkeduo.com/pdd_ims/ca03b0260a374fe321e94983ba17fc9a.jpg', '百纳之家', '71610');
INSERT INTO `shopcat` VALUES ('41', '10', '1223888025', 'http://t00img.yangkeduo.com/t04img/images/2018-05-29/a0c2c9c739ec221b0e71516eb694fb20.jpeg?imageMogr2/quality/70', '2090', '【泡沫箱精装】广西米蕉8斤/5斤小鸡蕉小米蕉/米蕉/小香蕉芭蕉', '1', '0', '10万 件', '//t16img.yangkeduo.com/pdd_ims/32f512d735064c3ba4f82367b136e988.jpg', '禾斗良品', '182966');
INSERT INTO `shopcat` VALUES ('42', '10', '2726277255', 'http://t00img.yangkeduo.com/goods/images/2019-03-15/c4f7b462-f2c8-4165-ab19-bdff7f168ba7.jpg?imageMogr2/quality/70', '700', '买一送一跳跳球儿童玩具弹力闪光蹦蹦球跳环圈健身减肥单脚甩腿球', '1', '0', '10万 件', '//t16img.yangkeduo.com/pdd_ims/b9754291af883b15188576b414467bdd.jpg', '户外运动批发中心', '726922');
INSERT INTO `shopcat` VALUES ('43', '10', '174175007', 'http://t00img.yangkeduo.com/goods/images/2018-09-12/3cb455368c8e34010d7294826e9b8827.jpeg?imageMogr2/quality/70', '1400', '【连续听歌12小时】超长待机无线蓝牙耳机通用所有手机运动入耳式', '1', '0', '8万件', '//t16img.yangkeduo.com/pdd_ims/fbf976b1114a132ace9e28600799a09c.jpg', 'KFD数码', '330070');
INSERT INTO `shopcat` VALUES ('44', '10', '3027211304', 'http://t00img.yangkeduo.com/goods/images/2018-12-24/a15036f8ec3f808656305f69650daf4f.jpeg?imageMogr2/quality/70', '778900', '【全新国行正品带票】iPhone Xs Max 全网通手机【预售：4月10日发完】', '2', '0', '8.8万件', '//t00img.yangkeduo.com/goods/images/2019-01-21/bc6507dd-e7a2-4e3a-a42e-a0c4948c12fb.jpg', '途谷官方旗舰店', '398601');
INSERT INTO `shopcat` VALUES ('45', '10', '476022564', 'http://t00img.yangkeduo.com/goods/images/2019-01-24/92ed5a2f-ff7c-4fa7-b283-4a036039c201.jpg?imageMogr2/quality/70', '6500', '【富贵鸟】新款韩版休闲修身潮流男士外套春秋季青年上衣夹克衫', '1', '0', '10万 件', '//t16img.yangkeduo.com/pdd_ims/963232e34c2e8e1a10cfad6077c90355.png', '恩都城精品服饰', '1440901');
INSERT INTO `shopcat` VALUES ('46', '10', '619454501', 'http://omsproductionimg.yangkeduo.com/images/2017-11-06/65c34d90758cbdc399a40810c69c4514.jpeg@750w_1l_50Q.src', '650', '【优品买二送一】玩手机抗疲劳保护眼睛眼镜防辐射防蓝光平光眼镜', '1', '0', '10万 件', '//t16img.yangkeduo.com/pdd_ims/413f528f7208319ceca192895c239d05.jpg', '记忆阡陌', '2132143');
INSERT INTO `shopcat` VALUES ('47', '10', '715374751', 'http://t00img.yangkeduo.com/goods/images/2018-09-01/491e81eb64069813cc3202266ae0e2b4.jpeg?imageMogr2/quality/70', '980', '汽车用品空调出风口清洁软胶多功能车内饰缝隙键盘清洁泥除尘软胶', '1', '0', '10万 件', '//t00img.yangkeduo.com/goods/images/2018-08-31/8a57f40cd1badda225c57e510f73de2d.jpeg', '路锐车品', '2281699');
INSERT INTO `shopcat` VALUES ('48', '10', '2669844078', 'http://t00img.yangkeduo.com/goods/images/2019-02-14/c3908fea-fcd5-4d9a-af13-07abc9c3866a.jpg?imageMogr2/quality/70', '7990', '【卡帝乐鳄鱼】春季新款长袖t恤圆领韩版修身卫衣上衣服潮牌男装', '1', '0', '10万 件', '//t16img.yangkeduo.com/pdd_ims/82bddf76c66c9612f6e4cb501d0af690.jpg', '杜宾狼服饰专营店', '2227898');
INSERT INTO `shopcat` VALUES ('49', '10', '2801532796', 'http://t00img.yangkeduo.com/goods/images/2018-12-17/43bfff030b45b68ab1c23b77c3757a25.jpeg?imageMogr2/quality/70', '900', '挖耳勺发光耳勺儿童掏耳神器宝宝挖耳朵耳屎镊子工具套装采耳带灯', '1', '0', '10万 件', '//t16img.yangkeduo.com/pdd_ims/7312ae0d2fb27e6e0f83b3303ef0c51f.jpg', '佳品优德家居日用', '635563895');
INSERT INTO `shopcat` VALUES ('97', '19', '174175007', 'http://t00img.yangkeduo.com/goods/images/2018-09-12/3cb455368c8e34010d7294826e9b8827.jpeg?imageMogr2/quality/70', '1400', '【连续听歌12小时】超长待机无线蓝牙耳机通用所有手机运动入耳式', '1', '0', '8万件', '//t16img.yangkeduo.com/pdd_ims/fbf976b1114a132ace9e28600799a09c.jpg', 'KFD数码', '330070');
INSERT INTO `shopcat` VALUES ('98', '19', '2259761701', 'http://t00img.yangkeduo.com/t09img/images/2018-07-18/e62db4bb861bbb76a26b70c5711a193c.jpeg?imageMogr2/quality/70', '1500', '仰卧起坐脚蹬拉力器收腹瘦肚子健身器材床上家用多功能美腿辅助器', '3', '0', '4.7万件', '//t00img.yangkeduo.com/goods/images/2019-03-15/c3ceb1cf-8089-4867-b02e-81f9c56c787a.jpg', '跃尚运动', '358140502');
INSERT INTO `shopcat` VALUES ('99', '19', '2781495715', 'http://t00img.yangkeduo.com/goods/images/2018-09-03/5abc7f4aa9b642c730a1b5cfdbdcff55.jpeg?imageMogr2/quality/70', '3390', '智能手环OPPO小米VIVO华为苹果三星等智能手机通用心率运动手表', '3', '0', '7.4万件', '//t16img.yangkeduo.com/pdd_ims/ca03b0260a374fe321e94983ba17fc9a.jpg', '百纳之家', '71610');
INSERT INTO `shopcat` VALUES ('103', '20', '3244827', 'http://t02img.yangkeduo.com/images/2018-04-14/a1af335e96f146a34911b5972b9eed6c.jpeg?imageMogr2/quality/70', '3900', '【质保一年】夏季防水防滑凉鞋男士软底耐磨凉拖两用透气凉鞋拖男', '2', '0', '10万 件', '//t16img.yangkeduo.com/pdd_ims/f1f3719e4f50bb595067c67697772669new.jpg', '名品馆', '23807');
INSERT INTO `shopcat` VALUES ('104', '20', '401517120', 'http://t00img.yangkeduo.com/goods/images/2018-11-12/a2098a00fc1207dbf596e1d3bf934fa3.jpeg?imageMogr2/quality/70', '4800', '花花公子跑车款皮带男士腰带青年中年商务时尚韩版休闲自动扣皮带', '1', '0', '10万 件', '//t00img.yangkeduo.com/goods/images/2019-03-27/6c3d3c6d-3ba8-4c09-a6f9-0e1034d76aa4.jpg', '阿么服饰配件专营店', '1437537');
INSERT INTO `shopcat` VALUES ('105', '21', '2127805', 'http://t00img.yangkeduo.com/goods/images/2018-10-13/5afc7264f3db700005ac0f30ead978eb.jpeg?imageMogr2/quality/70', '2090', '春季高帮帆布鞋女鞋新款韩版休闲平底板鞋女学生系带鞋情侣帆布鞋', '1', '0', '10万 件', '//t16img.yangkeduo.com/pdd_ims/21a71758c9979935cf3588c416ff5355.jpg', '乐享时尚', '12180');

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_name` varchar(255) DEFAULT NULL,
  `user_pwd` varchar(255) DEFAULT NULL,
  `user_phone` varchar(255) DEFAULT NULL,
  `user_sex` varchar(255) DEFAULT NULL,
  `user_age` varchar(255) DEFAULT NULL,
  `user_avatar` varchar(255) DEFAULT NULL,
  `user_pet` varchar(255) DEFAULT NULL,
  `user_address` varchar(255) DEFAULT NULL,
  `user_birthday` varchar(255) DEFAULT NULL,
  `tel` varchar(255) DEFAULT NULL,
  `user_sign` int(11) NOT NULL,
  `sign` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES ('7', '789456', '71b3b26aaa319e0cdf6fdb8429c112b0', null, '男', null, 'http://jrf.lookmeinv.com/fanhuijie/73.png', '我是大红花', '天津市 天津城区 河东区', '1960-07-01T16:00:00.000Z', null, '2', '0');
INSERT INTO `users` VALUES ('25', '18646602959', null, '18646602959', null, null, 'http://jrf.lookmeinv.com/fanhuijie/86.png', '18646602959', null, null, '1', '0', '0');
INSERT INTO `users` VALUES ('26', '13520166477', '6eea9b7ef19179a06954edd0f6c05ceb', null, null, null, 'http://jrf.lookmeinv.com/fanhuijie/48.png', '13520166477', null, null, null, '0', '0');
INSERT INTO `users` VALUES ('27', '18714324991', null, '18714324991', null, null, 'http://jrf.lookmeinv.com/fanhuijie/112.png', '18714324991', null, null, '1', '0', '0');
INSERT INTO `users` VALUES ('28', '13520166477', null, '13520166477', null, null, 'http://jrf.lookmeinv.com/fanhuijie/52.png', '13520166477', null, null, '1', '0', '0');
INSERT INTO `users` VALUES ('29', 'admin', '21232f297a57a5a743894a0e4a801fc3', null, null, null, 'http://jrf.lookmeinv.com/fanhuijie/142.png', 'admin', null, null, null, '1', '0');
INSERT INTO `users` VALUES ('30', 'a2337230', '6e1cbfd0b8ab6ce303e01952441634b9', null, null, null, 'http://jrf.lookmeinv.com/fanhuijie/243.png', 'a2337230', null, null, null, '0', '0');

-- ----------------------------
-- Event structure for buystart
-- ----------------------------
DROP EVENT IF EXISTS `buystart`;
DELIMITER ;;
CREATE DEFINER=`a2337230`@`%` EVENT `buystart` ON SCHEDULE EVERY 30 SECOND STARTS '2019-04-05 00:00:00' ON COMPLETION NOT PRESERVE ENABLE DO UPDATE buyshop SET buy_state=buy_state+1 WHERE buy_state<4
;;
DELIMITER ;

-- ----------------------------
-- Event structure for qiandao
-- ----------------------------
DROP EVENT IF EXISTS `qiandao`;
DELIMITER ;;
CREATE DEFINER=`a2337230`@`%` EVENT `qiandao` ON SCHEDULE EVERY 1 DAY STARTS '2019-04-01 00:00:00' ON COMPLETION NOT PRESERVE ENABLE COMMENT '签到' DO UPDATE users SET sign='0'
;;
DELIMITER ;
