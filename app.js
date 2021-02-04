//引入express模块
const express = require("express");
//创建web服务器
const app = express();
//引入path模块
const path = require("path");
// 引入session模块
var session = require('express-session');
// session配置
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));

//出错了？？？=======注释之后可以正常，可能是这个的app.use拦截所有请求后，下面的formidable可能会处理不了了
// const bodyParser = require('body-parser');
// // 处理post请求参数
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// // 数据库连接
require("./model/connect");
// 处理文件上传
const formidableMiddleware = require("express-formidable");
// 配置文件上传路径
app.use(formidableMiddleware({
    //文件上传目录
    uploadDir: path.join(__dirname, "public", "uploads"),
    //最大上传文件
    maxFileSize: 4 * 1024 * 1024,
    //是否保留文件拓展名
    keepExtensions: true
}));
//配置静态资源访问
app.use(express.static(path.join(__dirname, "public")));
//路由
require("./routes")(app);
// 侦听端口
app.listen(3000, () => {
    console.log("web服务器启动成功!");
})