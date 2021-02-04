// 定义一个flag来标识表单是否符合规则
var formFlag = false;
//验证用户名是否符合规则
$("#uname-input").blur(function() {
    // 创建验证用户名的正则对象
    var regUname = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？ ]");
    if (regUname.test($(this).val())) {
        formFlag = false;
        alert("用户名不要包含空格下划线等特殊字符");
        return false;
    }
    if ($(this).val().trim().length < 2 || $(this).val().trim().length > 12) {
        formFlag = false;
        alert("用户名长度应包含在2到12个字符");
        return false;
    }
    formFlag = true;
});
// 验证密码是否符合规则
$("#password-input").blur(function() {
    var reg = /^[A-Za-z0-9]{6,12}$/;
    if (!reg.test($(this).val())) {
        formFlag = false;
        alert("请输入6~12的数字字母的密码");
        return false;
    }
    formFlag = true;
});
//提交表单
$("#formUser").on("submit", function() {
    if (!formFlag) { //如果表单不符合规则，直接return
        alert("请填写信息");
        return false;
    }
    //当表单发生提交行为
    var formData = $(this).serialize();
    $.ajax({
        type: "post",
        url: "/register",
        data: formData,
        success: function(response) {
            alert(response.message);
            location.reload();
        }
    });
    return false; //阻止表单默认行为
});
//处理用户头像上传部分的
$("#formUser").on("change", "#change-file", function() {
    $("#head-preview").css("display", "block");
    var formData = new FormData();
    formData.append("avatar", this.files[0]);
    $.ajax({
        type: "post",
        url: "/upload",
        data: formData,
        processData: false,
        contentType: false,
        success: function(response) {
            //实现头像预览功能
            $("#head-preview").attr("src", response[0].avatar);
            //设置隐藏域中的值，即上传图片的地址
            $("#hiddenAvatar").val(response[0].avatar);
        },
    });
});

//点击验证码更新验证码
$("#veryImg").click(function() {
    $(this).attr("src", $(this).attr("src") + "?v=" + Math.random());
});