const { User } = require('../model/user');
module.exports = async(req, res) => {
    var userInfo = await User.findOne({ _id: req.query.id });
    res.send(userInfo);
};