const { Article } = require("../model/article");
const pagination = require("mongoose-sex-page");
module.exports = async(req, res) => {
    var page = req.query.page || 1;
    //查询条件
    var condition = {};
    var article = await pagination(Article).page(page).size(12).display(4).find(condition).populate("author").exec();
    res.send(article);
}