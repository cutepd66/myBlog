const { Comment } = require("../model/comment");
module.exports = async(req, res) => {
    var result = await Comment.create(req.fields);
    res.send(result);
}