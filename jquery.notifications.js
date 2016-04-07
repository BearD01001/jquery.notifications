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