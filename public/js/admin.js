var urlOption = "";
var flagOption = 0;
//tab栏切换
$(".tab-nav ul li").click(function() {
    flagOption = $(this).index();
    // 内容部分tab
    $(this).addClass("show").siblings().removeClass("show");
    $(".tab-content ul li").eq($(this).index()).addClass("show").siblings().removeClass("show");

    // 根据点击的不同管理设置请求的分页地址
    if (flagOption == 0) {
        urlOption = "/getAllUser";
    } else if (flagOption == 1) {
        urlOption = "/getAllArticle";
    } else if (flagOption == 2) {
        urlOption = "/getAllComment";
    } else {
        urlOption = "/getAllUser";
    }

});
// 渲染用户管理的函数
function niubi(response) {
    // 用户数据渲染部分
    var html = template("userManagementTpl", { data: response });
    $("#userManagementBox").html(html);
    //分页渲染
    var paginationHtml = template("paginationTpl", { data: response });
    $("#paginationBox").html(paginationHtml);
}
// 渲染文章管理的函数
function niubi1(response) {
    // 用户数据渲染部分
    var html = template("articleManagementTpl", { data: response });
    $("#articleManagementBox").html(html);
    //分页渲染
    var paginationHtml = template("paginationTpl", { data: response });
    $("#paginationBox").html(paginationHtml);
}
// 渲染文章管理的函数
function niubi2(response) {
    // 用户数据渲染部分
    var html = template("commentManagementTpl", { data: response });
    $("#commentManagementBox").html(html);
    //分页渲染
    var paginationHtml = template("paginationTpl", { data: response });
    $("#paginationBox").html(paginationHtml);
}
//页面一上来就发送请求获取用户数据，默认显示用户管理部分的
$.ajax({
    type: "get",
    url: "/getAllUser",
    success: function(response) {
        niubi(response);
    }
});
//当点击用户管理，发送请求到服务器获取所有用户信息
$("#userManagement").click(function() {
    $.ajax({
        type: "get",
        url: "/getAllUser",
        success: function(response) {
            niubi(response);

        }
    });
});
//给用户管理的每个删除按钮添加委托事件
$("#userManagementBox").on("click", ".userDel", function() {
    if (confirm("您确定要删除吗？")) {
        var id = $(this).attr("data-id");
        //发送id到服务器，根据id删除用户
        $.ajax({
            type: "post",
            url: "/delUserById",
            data: {
                id: id
            },
            success: function(response) {
                alert(response);
                location.reload();
            }
        });
    }
});

//分页渲染函数
function fenye(response) {
    if (flagOption == 0) {
        niubi(response);
    } else if (flagOption == 1) {
        niubi1(response);
    } else if (flagOption == 2) {
        niubi2(response);
    } else {
        niubi(response);
    }
}
//给分页的每个a标签注册委托事件
$("#paginationBox").on("click", ".paginationEle", function() {
    var page = $(this).attr("data-page") || 1;
    $.ajax({
        type: "get",
        url: urlOption,
        data: {
            page: page
        },
        success: function(response) {
            fenye(response);
        }
    });
});
// 当点击上一页下一页
$("#paginationBox").on("click", "#prePagination", function() {
    var page = $(this).attr("data-page") - 1;
    $.ajax({
        type: "get",
        url: urlOption,
        data: {
            page: page > 1 ? page : 1
        },
        success: function(response) {
            fenye(response);
        }
    });
});
$("#paginationBox").on("click", "#nextPagination", function() {
    var pageMax = $(this).attr("page-max") <= 0 ? 1 : $(this).attr("page-max");
    var page = parseInt($(this).attr("data-page")) + 1;
    $.ajax({
        type: "get",
        url: urlOption,
        data: {
            page: page < pageMax ? page : pageMax,
        },
        success: function(response) {
            fenye(response);
        }
    });
});




//文章管理部分
$("#articleManagement").click(function() {
    $.ajax({
        type: "get",
        url: "/getAllArticle",
        success: function(response) {
            console.log(response);
            niubi1(response);
        }
    });
});

//根据id删除文章
$("#articleManagementBox").on("click", ".articleDel", function() {
    if (confirm("您确定要删除吗？")) {
        var id = $(this).attr("data-id");
        //发送id到服务器，根据id删除用户
        $.ajax({
            type: "post",
            url: "/delArticleById",
            data: {
                id: id
            },
            success: function(response) {
                alert(response);
                location.reload();
            }
        });
    }
});
//评论部分
$("#commentManagement").click(function() {
    $.ajax({
        type: "get",
        url: "/getAllComment",
        success: function(response) {
            niubi2(response);
        }
    });
});
//根据id删除评论
$("#commentManagementBox").on("click", ".commentDel", function() {
    if (confirm("您确定要删除吗？")) {
        var id = $(this).attr("data-id");
        //发送id到服务器，根据id删除用户
        $.ajax({
            type: "post",
            url: "/delCommentById",
            data: {
                id: id
            },
            success: function(response) {
                alert(response);
                location.reload();
            }
        });
    }
});