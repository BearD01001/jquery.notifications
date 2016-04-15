# jquery.notifications
扁平化风格的提示框，灵感来源于WP
提取自开发项目，暂未测试

全局提示框：
$.globalMsg([$msg = '', url = '', delay = 1500])
在页面顶部居中slide down一个消息提示栏，显示完后自动缩回，
该提示框会检测是否当前文档是否为 _top ，若不是会自动向上检测直到 _top 。

处理进度提示框：
$.handleMsg([$title = '', $msg = '', $url = '', delay = 1500])
带有$title和$msg两个主要参数，显示一个有标题栏的消息条

* $url 参数为消息显示完毕后的跳转地址

Ajax按钮 适用于input[type=submit]和a.ajaxBtn
自动发起AJAX请求，可完成基本的表单验证和get请求
$.ajaxBtn()