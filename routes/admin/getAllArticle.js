const { Article } = require('../../model/article');
const pagination = require("mongoose-sex-page");
module.exports = async(req, res) => {
    var page = req.query.page || 1;
    //查询条件
    var condition = {};
    var allArticle = await pagination(Article).page(page).populate("author").size(8).display(2).find(condition).exec();
    res.send(allArticle);
}