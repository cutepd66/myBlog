searchInput();
// 用户头像
var userAvatar = localStorage.getItem("avatar");
//用户id
var userId = localStorage.getItem("_id");
// 判断是否登录，从而是否显示登录与注册
if (isLogin) {
    $("#isLogin1").html("");
    $("#isLogin2").html("");
    $('<a href="./html/person.html" class="person" id="personA"><img src=' + userAvatar + '></a>').appendTo($("#person"));
    $(".logout").css({
        "display": "block"
    });
}


//退出登录
$('#logout').on('click', function() {
    var isConfirm = confirm('您真的要退出吗?');
    if (isConfirm) {
        $.ajax({
            type: 'post',
            url: '/logout',
            success: function() {
                location.reload();
            },
            error: function() {
                alert('退出失败');
            }
        })
    }
});

// 当在首页点击发表时候
$("#publishA").click(function() {
    if (isLogin) { //判断是否登录
        //如果登录了在跳转到文章发表页面
        location.href = "./html/publish.html?" + "_id=" + userId;
        return false;
    } else {
        //如果没有登录弹框提示用户先登录
        alert("请先登录或注册");
        return false;
    }
});


// 模板渲染部分
function templateHtml(response) {
    var html = template("articleTpl", { data: response });
    $("#articleBox").html(html);

    var paginationHtml = template("paginationTpl", { data: response });
    $("#paginationBox").html(paginationHtml);
}
//页面一打开就想服务器发送请求，请求文章
$.ajax({
    type: "get",
    url: "/allArticle",
    success: function(response) {
        templateHtml(response);
        $("#paginationBox").on("click", ".niubi", function() {
            $.ajax({
                type: "get",
                url: "/allArticle",
                data: {
                    page: $(this).html(),
                    avatar: userAvatar,
                    _id: userId
                },
                success: function(response) {
                    templateHtml(response);
                }
            });
        })
    }
});

//上一页下一页
$("#paginationBox").on("click", "#pre-page", function() {
    var page = $(this).attr("data-page") - 1; //相减有隐式转为数字的
    //发送请求
    $.ajax({
        type: "get",
        url: "/allArticle",
        data: {
            page: page > 1 ? page : 1,
            avatar: userAvatar,
            _id: userId
        },
        success: function(response) {
            templateHtml(response);
        }
    });
})
$("#paginationBox").on("click", "#next-page", function() {
    var pageMax = $(this).attr("page-max");
    var page = parseInt($(this).attr("data-page")) + 1; //需要将字符串转为数字
    //发送请求
    $.ajax({
        type: "get",
        url: "/allArticle",
        data: {
            page: page < pageMax ? page : pageMax,
            avatar: userAvatar,
            _id: userId
        },
        success: function(response) {
            templateHtml(response);
        }
    });
});
//点击用户头像
$("#person").on("click", "#personA", function() {
    var uid = userId;
    location.href = "../html/person.html?" + "uid=" + uid;
    return false;
})