const mongoose = require("mongoose");
mongoose.connect(`mongodb://localhost/myBlog`, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => { console.log("mongodb数据库连接成功") })
    .catch(() => { console.log("mongodb数据库连接失败") });