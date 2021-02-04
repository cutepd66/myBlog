const { Article } = require('../../model/article');
const { Comment } = require('../../model/comment');
module.exports = async(req, res) => {
    Article.findOneAndDelete({ _id: req.fields.id }).then(() => {
        //当删除文章后，根据该文章id找到该文章所有的评论并删除
        // Comment.deleteMany({ aid: req.fields.id }).then(() => { console.log("删除文章时删除该文章所有评论成功") });
        Comment.deleteMany({ aid: req.fields.id }).then();
        res.send("删除成功");
    }).catch(() => {
        res.send("删除失败");
    });
};