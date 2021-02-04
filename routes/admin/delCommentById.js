const { Comment } = require('../../model/comment');
module.exports = async(req, res) => {
    Comment.findOneAndDelete({ _id: req.fields.id }).then(() => {
        res.send("删除成功");
    }).catch(() => {
        res.send("删除失败");
    });
};