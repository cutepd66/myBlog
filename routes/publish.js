const { Article } = require("../model/article");
// 格式化时间日期
function getTimer() {
    var time = new Date();
    var year = time.getFullYear();
    var month = time.getMonth() + 1;
    var dates = time.getDate();
    var str = year + "年" + month + "月" + dates + "日";
    return str;
}
module.exports = async(req, res) => {
    //判断文章标题是否为空
    if (req.fields.topic == "") {
        res.send("文章标题为空");
        return;
    }
    //验证文章id是否合法
    if (!/^[0-9a-fA-F]{24}$/.test(req.fields._id)) {
        res.send("文章id不合规范");
        return;
    }
    var addArticle = {};
    addArticle["title"] = req.fields.topic;
    addArticle["author"] = req.fields._id;
    addArticle["publishDate"] = getTimer();
    addArticle["views"] = "0";
    addArticle["cover"] = req.fields.cover || "";
    var articleContent = {};
    for (attr in req.fields) {
        //如果是文章标题
        if (attr == "topic" || attr == "cover" || attr == "_id") {
            continue;
        }
        articleContent[attr] = req.fields[attr];
    }
    addArticle["content"] = articleContent;

    //往数据库添加文章
    var addResult = await Article.create(addArticle);
    if (!addArticle) {
        res.send("往数据库添加文章失败");
        return;
    }
    res.send("添加文章成功");
}