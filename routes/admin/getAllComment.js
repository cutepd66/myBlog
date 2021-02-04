const { Comment } = require('../../model/comment');
const pagination = require("mongoose-sex-page");
module.exports = async(req, res) => {
    var page = req.query.page || 1;
    //查询条件
    var condition = {};
    var allComment = await pagination(Comment).page(page).populate("uid").populate("aid").size(8).display(2).find(condition).exec();
    res.send(allComment);
}