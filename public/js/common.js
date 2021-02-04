// 实现点击小火箭回到顶部
$(window).scroll(function() {
    if ($(window).scrollTop() >= 600) { //scrollTop返回的是数字，没有单位
        $(".go-top").stop().fadeIn(1000);
    } else {
        $(".go-top").stop().fadeOut(1000);
    }
});
$(".go-top").click(function() {
    $("html,body").stop().animate({ scrollTop: 0 }, 300);
});

// 传一个表单元素，返回一个对象，键值对是表单的name跟value
function serializeToJson(form) {
    var result = {};
    // [{name: 'email', value: '用户输入的内容'}]
    var f = form.serializeArray(); //serializeArray是jq的方法，返回一个数组
    f.forEach(function(item) {
        // result.email
        result[item.name] = item.value;
    });
    return result;
}


//控制当点击搜索框时候显示或隐藏input
function searchInput() {
    //获取搜索框所在的a标签
    var searchEle = $("#search-a");
    //获取搜索框input表单
    var searchInp = $("#search-input");

    searchEle.click(function() {
        //当搜索a标签发生点击时候显示input表单
        searchInp.show();
        //input获取焦点
        searchInp.focus();
    });
    searchInp.blur(function() {
        //清空input的内容
        searchInp.val("");
        //当input表单失去焦点时候隐藏
        searchInp.hide();
    });
}

//获取指定地址栏参数
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}