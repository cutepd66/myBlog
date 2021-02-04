module.exports = app => {
    //首页
    app.use("/", require("./home"));
    //用户注册部分
    app.use("/register", require("./register"));
    //用户登录部分
    app.post("/login", require("./login"));
    //判断用户是否登录
    app.use("/login/status", require("./loginStatus"));
    //用户退出
    app.use("/logout", require("./logout"));
    //处理文件上传
    app.post("/upload", require("./upload"));
    //用户提交文章路由
    app.post("/publish", require("./publish"));
    //获取所有文章路由
    app.use("/allArticle", require("./allArticle"));
    //根据id获取指定文章
    app.get("/articleDetail", require("./articleDetail"));
    //提交评论的路由
    app.post("/submitComment", require("./submitComment"));
    //获取根据文章id获取所有评论的路由
    app.get("/getAllComments", require("./getAllComments"));
    //获取用户信息
    app.get("/getUserInfo", require("./getUserInfo"));
    //获取所有文章
    app.get("/getUserAllArticle", require("./getUserAllArticle"));
    //获取所有用户的信息
    app.get("/getAllUser", require("./admin/getAllUser"));
    //根据id删除用户
    app.post("/delUserById", require("./admin/delUserById"));
    //获取所有文章路由
    app.get("/getAllArticle", require("./admin/getAllArticle"));
    //根据id删除文章
    app.post("/delArticleById", require("./admin/delArticleById"));
    //获取所有评论
    app.get("/getAllComment", require("./admin/getAllComment"));
    //根据id删除评论
    app.post("/delCommentById", require("./admin/delCommentById"));
    //图片随机验证码
    app.get("/imgCode", require("./getImgCode"));
}