// 根据id发送请求，得到当前用户的信息
$.ajax({
    type: "get",
    url: "/getUserInfo",
    data: {
        id: getQueryString("uid")
    },
    success: function(response) {
        console.log(response);
        var html = template("userInfoTpl", { data: response });
        $("#userInfoBox").html(html);
    }
});