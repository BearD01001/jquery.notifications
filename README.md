# jquery.notifications
扁平化风格的提示框，灵感来源于WP
提取自开发项目，暂未测试

全局提示框：
$.globalMsg([$msg = '', url = '', delay = 1500])

处理进度提示框：
$.handleMsg([$title = '', $msg = '', $url = '', delay = 1500])

Ajax按钮 适用于input[type=submit]和a.ajaxBtn
自动发起AJAX请求，可完成基本的表单验证和get请求
$.ajaxBtn()