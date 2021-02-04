searchInput(); //搜索部分
//从地址栏获取到的文章的id
var urlId = getQueryString("_id");
$.ajax({
    type: "get",
    url: "/articleDetail",
    data: {
        _id: urlId
    },
    success: function(response) {
        var html = template("articleDetailTpl", { data: response });
        $("#articleDetailBox").html(html);
    }
});

//获得一个格式化的当前时间
function getTimer() {
    var time = new Date();
    var year = time.getFullYear();
    var month = time.getMonth() + 1;
    var dates = time.getDate();
    var str = year + "年" + month + "月" + dates + "日";
    return str;
}
//提交评论
$("#submitCommentBox").on("submit", function() {
    if (!isLogin) {
        alert("请先登录再评论！");
        location.href = "../html/login.html";
        return false;
    }
    var articleid = getQueryString("_id"); //从地址栏获取文章id
    var commentUserId = getQueryString("userId"); //获取评论人的id
    var commentTime = getTimer(); //获取一个格式化的当前时间
    var commentContent = $("#textareaEle").val(); //获取评论内容
    if (commentContent == "") {
        alert("评论内容不能为空");
        return false;
    }
    $.ajax({
        type: "post",
        url: "/submitComment",
        data: {
            aid: articleid,
            uid: commentUserId,
            time: commentTime,
            content: commentContent
        },
        success: function(response) {
            alert("评论成功");
            location.reload();
        }
    });
    return false;
});


//获取所有评论
$.ajax({
    type: "get",
    url: "/getAllComments",
    data: {
        id: urlId
    },
    success: function(response) {
        var html = template("allCommentTpl", { data: response });
        $("#commentBox").html(html);
    }
});