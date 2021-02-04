var svgCaptcha = require("svg-captcha")
module.exports = (req, res) => {
    var codeConfig = {
        size: 5, // 验证码长度
        ignoreChars: '0o1i', // 验证码字符中排除 0o1i
        noise: 2, // 干扰线条的数量
        fontSize: 42,
        color: true, //开启文字颜色
        background: "#cc9966", //背景色
        width: 150,
        height: 44
    }
    var captcha = svgCaptcha.create(codeConfig);
    // 上面的代码是生成一个四位的随机字母数字串，如果你想生成数学计算的字符串可以使用下面这个
    // svgCaptcha.createMathExpr(options);//options参数不变

    // 如果你觉得他的字体不是太好看，你也可以选择使用自己的字体：
    // svgCaptcha.loadFont(url)
    // url则为你需要加载的字体路径。


    req.session.captcha = captcha.text.toLowerCase(); //存session用于验证接口获取文字码
    // console.log(req.session.captcha);
    var codeData = {
        img: captcha.data
    }
    res.type('svg');
    res.status(200).send(captcha.data);
}