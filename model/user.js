//引入mongoose模块
const mongoose = require("mongoose");
//引入模型规则
const { Schema } = mongoose;
const userSchmea = new Schema({
    avatar: {
        type: String,
        default: null
    },
    uname: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 12
    },
    email: {
        type: String,
        required: true,
        unique: true //表示唯一的
    },
    sex: {
        type: String,
        default: "0",
        enum: ["男", "女"]
    },
    qq: {
        type: String
    },
    hobby: [String],
    password: {
        type: String,
        required: true
    }
});
mongoose.set('useCreateIndex', true)
    //根据集合规则创建集合
const User = mongoose.model("User", userSchmea);
module.exports = {
    User
};