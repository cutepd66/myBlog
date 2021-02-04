const { User } = require('../../model/user');
const pagination = require("mongoose-sex-page");
module.exports = async(req, res) => {
    var page = req.query.page || 1;
    //查询条件
    var condition = {};
    var allUser = await pagination(User).page(page).size(8).display(2).find(condition).exec();
    res.send(allUser);
}