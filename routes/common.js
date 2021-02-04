//验证用户数据格式是否符合规则,返回一个对象，对象有两个属性，包含错误信息与是否符合规则
var checkUser = (user) => {
    let result = {};
    result["errorMessage"] = "";
    result["checkFlag"] = true;
    //验证用户名部分
    if (user.uname) {
        if (user.uname.length < 2 || user.uname.length > 12) {
            result["errorMessage"] = "用户名长度不符合规则";
            result["checkFlag"] = false;
            return result;
        }
    } else {
        result["errorMessage"] = "用户名为空";
        result["checkFlag"] = false;
        return result;
    }

    //验证邮箱部分
    if (user.email) {
        //验证邮箱的正则
        var reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
        if (!reg.test(user.email)) {
            result["errorMessage"] = "邮箱格式不正确";
            result["checkFlag"] = false;
            return result;
        }

    } else {
        result["errorMessage"] = "邮箱为空";
        result["checkFlag"] = false;
        return result;
    }

    //验证密码
    if (user.password) {
        if (user.password.length < 6 || user.password.length > 12) {
            result["errorMessage"] = "密码长度不符合规则";
            result["checkFlag"] = false;
            return result;
        }
    } else {
        result["errorMessage"] = "密码为空";
        result["checkFlag"] = false;
        return result;
    }
    return result;
};
module.exports = { checkUser };