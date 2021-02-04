$("#loginForm").on("submit", function() {
    var regEmail = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/; //邮箱正则
    var regPassword = /^[a-zA-Z0-9]{6,12}$/; //验证密码正则
    var emailInp = $("#eamilInp").val();
    var passwordInp = $("#passwordInp").val();
    var verifyCode = $("#veryfyEle").val();
    if (!(regEmail.test(emailInp) && regPassword.test(passwordInp))) {
        alert("邮箱或密码不符合规则");
        return false;
    }
    $.ajax({
        type: "post",
        url: "/login",
        data: {
            email: emailInp,
            password: passwordInp,
            verifyCode: verifyCode
        },
        success: function(response) {
            localStorage.setItem("_id", response._id);
            localStorage.setItem("avatar", response.avatar);
            alert(response.message);
            if (response.admin) {
                location.href = "../admin/admin.html";
            } else {
                location.href = "../index.html" + "?" + "avatar=" + response.avatar + "&_id=" + response._id;
            }
        },
        error: function() {
            alert("邮箱没有注册");
            location.href = "../html/register.html";
        }
    });
    return false;
});


//点击验证码更新验证码
$("#veryImg").click(function() {
    $(this).attr("src", $(this).attr("src") + "?v=" + Math.random());
});