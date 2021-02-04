const { Article } = require("../model/article");
module.exports = async(req, res) => {
    var allArticle = await Article.find({ author: req.query.id }).populate("author");
    res.send(allArticle);
};