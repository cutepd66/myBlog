//创建home路由
const home = require("express").Router();
home.get("/", (req, res) => {
    res.send("欢迎来到首页");
});
module.exports = home;