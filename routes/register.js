//引入User集合
const { User } = require('../model/user');
// 引入bcryptjs模块
const bcrypt = require('bcryptjs');
// User.create({ uname: "admin", email: "cutepd66@foxmail.com", sex: "0", qq: "715073562", password: "123456" });
//引入验证用户信息的函数
const { checkUser } = require("./common.js")
    // //创建register路由
const register = require("express").Router();
register.post("/", async(req, res) => {
    var veriCode = req.fields.verifyCode.toLowerCase();
    if (!(req.session.captcha == veriCode)) {
        res.send({ message: "随机验证码错误" });
    } else {
        var result = checkUser(req.fields);
        //如果用户信息验证符合规则，就从数据库查询是否已经存在
        if (result.checkFlag) {
            var queryUser = await User.findOne({ email: req.fields.email });
            if (queryUser) {
                res.send({ message: "邮箱已经被注册" });
                return;
            }
            //生成随机字符串
            const salt = await bcrypt.genSalt(10);
            //加密明文
            req.fields.password = await bcrypt.hash(req.fields.password, salt);
            //创建用户，向数据库写入数据
            User.create(req.fields);
            res.send({ message: "用户创建成功" });
            return;
        } else {
            res.send({ message: result.errorMessage });
        }
    }

});
module.exports = register;