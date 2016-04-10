$.extend({
//      全局提示框
    globalMsg: function() {
        $msg = arguments[0] ? arguments[0] : "";
        $url = arguments[1] ? arguments[1] : "";
        $delay = arguments[2] ? arguments[2] : 1500;

        $(".global_msg", parent.document).remove();
        $("body", parent.document).append("<div class='global_msg'>" + $msg + "</div> ");
        $globalMsg = $(".global_msg", parent.document);
        $globalMsg.stop(true, false).slideDown(500);
        setTimeout("$globalMsg.stop(true, false).slideUp(500);", $delay);
        setTimeout(function() {
            $globalMsg.remove();
            $url ? window.parent.location.href = $url : "";
        }, $delay + 600);
        return false;
    },
//      处理消息框
    handleMsg: function() {
        $title = arguments[0] ? arguments[0] : "";
        $msg = arguments[1] ? arguments[1] : "";
        $url = arguments[2] ? arguments[2] : "";
        $delay = arguments[3] ? arguments[3] : 1500;

        $handleMsgBox = $(".handle_msg_box", parent.document);
        !$handleMsgBox.length ? $("body", parent.document).append("<div class='handle_msg_box'></div>") : "";

        $handleMsgBox = $(".handle_msg_box", parent.document);
        $handleMsg = "<div class='handle_msg'><div class='close'>×</div>" + ($title ? "<div class='m_title'>" + $title + "</div>" : "");
        $handleMsg = $handleMsg + "<div class='m_body'>" + $msg + "</div></div>";

        $tempBox = $("body", parent.document).append("<div class='handle_msg_box'></div>");
        $tempBox = $(".handle_msg_box:last ", parent.document);
        $tempBox.prepend($handleMsg);
        $tempMsg = $tempBox.children().first();
        $thisMsgWidth = $tempMsg.width() + 20;
        $thisMsgHeight = $tempMsg.height() + 10;
        $tempBox.remove();

        $handleMsgBox.prepend($handleMsg);
        $thisMsg = $handleMsgBox.children().first();
        $thisMsg.css({"width": $thisMsgWidth, "height": 0, "top": 0});
        $thisMsg.nextAll(".handle_msg").each(function() {
            $(this).css("width", $(this).css("width"));
            $(this).css("position", "absolute");
            $(this).css("top", Number($(this).css("top").replace("px", "")) + Number($thisMsgHeight) + 10 + "px");
        });
        $thisMsg.children(".close").click(function() {
            $thisMsg.stop(true, false).animate({
                    height: "toggle",
                    opacity: 0
                },
                500
            );
        });
        $thisMsg.animate({
                height: $title ? "42px" : "21px",
                opacity: ".5",
                right: 0
            },
            500
        ).delay($delay).animate({
                height: "toggle",
                opacity: 0
            },
            500
        );
        return false;
    }
});

$.fn.extend({
    /*  AJAX按钮 input[type=submit]和a.ajaxBtn
        自动发起AJAX请求，可完成基本的表单验证和get请求
    */
    ajaxBtn: function() {
        $callback = typeof arguments[0] == "function" ? arguments[0] : undefined;
        $(this).die().live("click", function() {
            /* 判断按钮类型 */
            if($(this).attr("type") == "submit") {
                $buttom = "submit";

                $form = $(this).parents("form");

                /* 检验必填项是否为空 */
                $break = false;
                $form.find("input:text[required]").each(function() {
                    if($(this).val() == "" || $(this).val() == null) {
                        $break = true;
                        $label = $(this).parents("div.row").find("label:first-child").text().replace("：", "");
                        $.handleMsg("", "必填项 [ " + $label.replace(/\s+/, '') + " ] 为空！");
                        $(this).focus();
                        return false;//跳出遍历
                    }
                });
                if($break) return false;//有必填项为空，停止请求

                /* 检验多选项是否选择 */
                $break = false;
                $form.find("input:checkbox[required]").each(function() {

                });
                /* 检验重复确认输入是否正确 */
                $form.find("[name$=_confirm]").each(function() {
                    $confirmName = $(this).attr("name").replace("_confirm", "");
                    $confirmObj = $("[name=" + $confirmName + "]");
                    if($confirmObj.val() != "" && $confirmObj.val() != $(this).val()) {
                        $break = true;
                        $.handleMsg("", $(this).parents("div.row").find("label:first-child").text().replace("：", "") + "与" + $confirmObj.parents("div.row").find("label:first-child").text().replace("：", "") + "不一致！");
                        $(this).focus();
                        return false;
                    }
                });
                if($break) return false;//有重复确认输入不一致，停止请求

                $(this).attr("disabled", true);//禁用按钮防止重复提交
                $type = "post";
                $url = $form.attr("action");
                $data = $form.serialize();
            } else {
                $buttom = "a";

                $type = "get";
                $url = $(this).attr("href");
                $data = "";

                $(this).attr("disabled", true);//禁用按钮
                $href = $(this).attr("href");
                $(this).attr("href", "Javascript:void(0);");
            }
            /* 显示Loading图像 */
            $("#loading", parent.document).length == 0 ? $("body", parent.document).append("<img id='loading' src='" + window.parent.public + "/Img/Elements/loaders/12.gif'>") : "";
            $("#loading", parent.document).fadeIn(500);
            /* AJAX开始 */
            $_this = $(this);
            $.ajax({
                type: $type,
                url: $url,
                data: $data,
                timeout: 10000,
                success: function($data) {
                    if($data.status == 1) {
                        $.handleMsg($data.title, $data.info);
                        $callback ? $callback.call($_this) : "";
                    } else if($data.status == 0 && $data.url == undefined) {
                        $.handleMsg($data.title, $data.info);
                    } else if($data.status == 0 && $data.url != undefined) {
                        $.globalMsg($data.info, $data.url);
                    } else {
                        $.handleMsg("", "操作失败！");
                    }
                },
                error: function() {$.handleMsg("请求失败", "可能原因：1.服务器错误；2.请求超时。")},
                complete: function() {
                    /* 恢复按钮状态 */
                    if($buttom == "submit") {
                        $_this.attr("disabled", false);
                    } else {
                        $_this.attr("disabled", false);
                        $_this.attr("href", $href);
                    }
                    $("#loading", parent.document).fadeOut(200);
                }
            });
            return false;
        });
    }
});