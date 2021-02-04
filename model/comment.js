//引入mongoose模块
const mongoose = require("mongoose");
//引入模型规则
const { Schema } = mongoose;
const commentSchmea = new Schema({
    //文章id
    aid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Article"
    },
    // 评论人用户id
    uid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    // 评论时间
    time: {
        type: String
    },
    content: {
        type: String
    }
});
mongoose.set('useCreateIndex', true)
    //根据集合规则创建集合
const Comment = mongoose.model("Comment", commentSchmea);
//将集合导出
module.exports = { Comment };