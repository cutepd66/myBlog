const { Article } = require("../model/article");
module.exports = async(req, res) => {
    //从数据库根据id查询指定文章
    var result = await Article.findOne({ _id: req.query._id }).populate("author");
    var view = parseInt(result.views);
    view = view + 1;
    //浏览量增加一
    Article.updateOne({ _id: req.query._id }, { views: view }).then(); //必须需要调用then，否则更改不了？？？？
    res.send(result);
}