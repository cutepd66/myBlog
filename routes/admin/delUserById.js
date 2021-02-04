const { User } = require('../../model/user');
const { Article } = require('../../model/article');
const { Comment } = require('../../model/comment');
module.exports = async(req, res) => {
    User.findOneAndDelete({ _id: req.fields.id }).then(() => {
        //当根据id删除了某个用户，应该找到该用户发表的文章，删除该文章
        // Article.deleteMany({ author: req.fields.id }).then(() => { console.log("删除用户时删除该用户发表的文章成功") });
        Article.deleteMany({ author: req.fields.id }).then();
        //删除该用户的评论
        // Comment.deleteMany({ uid: req.fields.id }).then(() => { console.log("删除用户时删除该用户发表的评论成功") });
        Comment.deleteMany({ uid: req.fields.id }).then();
        res.send("删除成功");
    }).catch(() => {
        res.send("删除失败");
    });
};