var publishBox = $("#publish-box");
//图片的name的全局变量
var imgVar = 0;
var textareaVar = 0;
var subtitleVar = 0;
var linkVar = 0;
//添加文字部分
$("#add-word").click(function() {
    // 创建一个div，append到publishBox，为div添加类each-publish
    var eleDiv = $("<div class='each-publish'></div>").appendTo(publishBox);
    //创建一个textarea，添加到上面创建的div中，
    var textareaInp = $('<textarea name="" style="width:860px;height:120px;resize: none;"></textarea>').appendTo(eleDiv);
    textareaInp.attr("name", "articleArea" + (textareaVar++));
});



//添加图片部分
$("#add-pic").click(function() {
    // 创建一个div，append到publishBox，为div添加类each-publish
    var eleDiv = $("<div class='each-publish'></div>").appendTo(publishBox);
    //创建一个input添加到div中
    var eleInp = $("<input type='file' style='display:none;'></input>").appendTo(eleDiv);
    var hiddenInp = $("<input type='hidden' class='hiddenImg'></input>").appendTo(eleDiv);
    hiddenInp.attr("name", "Img" + (imgVar++));
    eleInp.trigger("click");
    eleInp.change(function() {
        //创建img标签加到div中
        var eleImg = $('<img src="" alt="">').appendTo(eleDiv);
        //当点击添加图片，创建div，file控件，img标签，并手动触发file控件的点击事件弹出选择文件的窗口

        var formData = new FormData();
        formData.append("avatar", this.files[0]);
        $.ajax({
            type: "post",
            url: "/upload",
            data: formData,
            processData: false,
            contentType: false,
            success: function(response) {
                // 实现图片预览功能
                eleImg.attr("src", response[0].avatar);
                hiddenInp.val(response[0].avatar);
            },
            error: function() {
                alert("错误！");
            }
        });


        // //创建文件读取对象
        // var reader = new FileReader();
        // //读取文件
        // reader.readAsDataURL(this.files[0]);
        // //onload事件，文件读取完成
        // reader.onload = function() {
        //     // console.log("进来了");
        //     eleImg.attr("src", reader.result);
        // }
    });
});






$("#add-subtitle").click(function() {
    // 创建一个div，append到publishBox，为div添加类each-publish
    var eleDiv = $("<div class='each-publish'></div>").appendTo(publishBox);
    var eleInp = $("<input type='text' class='article-subtitle'></input>").appendTo(eleDiv);
    eleInp.attr("name", "subtitle" + (subtitleVar++));
});
$("#add-link").click(function() {
    // 创建一个div，append到publishBox，为div添加类each-publish
    var eleDiv = $("<div class='each-publish'></div>").appendTo(publishBox);
    var eleInp = $("<input type='text' class='article-link'></input>").appendTo(eleDiv);
    eleInp.attr("name", "link" + (linkVar++));
});



$("#publishForm").on("submit", function() {
    var formData = $(this).serialize();
    var id = getQueryString("_id");
    formData = formData + "&_id=" + id;
    $.ajax({
        type: "post",
        url: "/publish",
        data: formData,
        success: function(response) {
            alert(response);
            location.reload();
        }
    });
    return false;
});

$("#add-cover").click(function() {
    // 创建一个div，append到publishBox，为div添加类each-publish
    var eleDiv = $("<div class='each-publish'></div>").appendTo(publishBox);
    //创建一个input添加到div中
    var eleInp = $("<input type='file' style='display:none;'></input>").appendTo(eleDiv);
    var hiddenInp = $("<input type='hidden' class='hiddenImg'></input>").appendTo(eleDiv);
    hiddenInp.attr("name", "cover");
    eleInp.trigger("click");
    eleInp.change(function() {
        //获取封面的img
        var coverImg = $("#cover");
        coverImg.css("display", "block");
        var formData = new FormData();
        formData.append("avatar", this.files[0]);
        $.ajax({
            type: "post",
            url: "/upload",
            data: formData,
            processData: false,
            contentType: false,
            success: function(response) {
                // 实现图片预览功能
                coverImg.attr("src", response[0].avatar);
                hiddenInp.val(response[0].avatar);
            },
            error: function() {
                alert("错误！");
            }
        });
    });
})