//引入mongoose模块
const mongoose = require("mongoose");
//引入模型规则
const { Schema } = mongoose;
const articleSchmea = new Schema({
    title: {
        type: String,
        minlength: 2,
        maxlength: 32,
        required: [true, "请传入文章标题"]
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "请传入作者"]
    },
    publishDate: {
        type: String,
        default: Date.now
    },
    views: {
        type: Number
    },
    cover: {
        type: String,
        default: null
    },
    content: {}
});
mongoose.set('useCreateIndex', true)
    //根据集合规则创建集合
const Article = mongoose.model("Article", articleSchmea);
//将集合导出
module.exports = { Article };