const { Comment } = require("../model/comment");
module.exports = async(req, res) => {
    if (!req.query.id) {
        res.send("文章id错误！");
        return;
    }
    var id = req.query.id;
    var result = await Comment.find({ aid: id }).populate("uid");

    res.send(result);
};