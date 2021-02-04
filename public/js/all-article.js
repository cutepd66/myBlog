//根据用户id获取用户发布的所有文章
$.ajax({
    type: "get",
    url: "/getUserAllArticle",
    data: {
        id: getQueryString("_id")
    },
    success: function(response) {
        if (response.length == 0) {
            alert("您还没有发表文章");
            location.href = "../index.html";
            return;
        }
        var html = template("allArticleTpl", { data: response });
        $("#allArticleBox").html(html);
    }
});