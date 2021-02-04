//引入User集合
const { User } = require('../model/user');
// 引入bcryptjs模块
const bcrypt = require('bcryptjs');
const { query } = require('express');
// const { query } = require('express');
module.exports = async(req, res) => {
    var veriCode = req.fields.verifyCode.toLowerCase();
    if (!(req.session.captcha == veriCode)) {
        res.send({ message: "随机验证码错误" });
    } else {
        var regEmail = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/; //邮箱正则
        var regPassword = /^[a-zA-Z0-9]{6,12}$/; //验证密码正则

        if (!(regEmail.test(req.fields.email) && regPassword.test(req.fields.password))) {
            // 如果邮箱或密码格式不符合规则，return退出
            res.send({ message: "邮箱或密码不符合规则" });
            return;
        }

        //从数据库查找该邮箱用户
        var queryUser = await User.findOne({ email: req.fields.email });
        if (!queryUser) {
            res.status(400).send({ message: "该邮箱还没有注册" });
            return;
        }
        //说明邮箱已经注册了
        var validPassword = await bcrypt.compare(req.fields.password, queryUser.password);
        if (!validPassword) {
            res.send({ message: "密码或邮箱错误" });
            return;
        }
        req.session.userInfo = queryUser;
        var obj = queryUser.toObject(); //需要转为
        if (obj.email == "cutepd66@foxmail.com") {
            obj["admin"] = true;
        }
        obj["message"] = "登录成功";
        res.send(obj);
    }



};