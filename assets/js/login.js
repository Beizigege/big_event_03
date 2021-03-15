$(function () {
    // 登录注册切换
    $("#link_reg").on("click", function () {
        $(".login_box").hide()
        $(".reg_box").show()
    })
    $("#link_login").on("click", function () {
        $(".reg_box").hide()
        $(".login_box").show()
    })

    // 2.自定义layui校验规则
    let form = layui.form;
    // verify()的参数是一个对象
    form.verify({
        // 属性是校验规则名称，值是函数或者数组
        pwd: [
            /^[\S]{6,12}$/,
            '密码必须6到12位，且不能出现空格'
        ],
        // 重复密码校验规则
        repwd: function (value, item) {//value：表单的值、itme：表单的DOM对象
            // 重复密码里面input的valur值
            if (value != $(".reg_box input[name=password]").val()) {
                return "两次密码输入不一致，请重新输入"
            }
        }
    })

    // 注册
    let layer = layui.layer;
    $("#form_reg").on("submit", function (e) {
        // 阻止表单默认提交
        e.preventDefault();
        // 发送ajax
        $.ajax({
            url: '/api/reguser',
            type: 'post',
            data: {
                username: $(".reg_box input[name=username]").val(),
                password: $(".reg_box input[name=password]").val(),
            },
            success: (res) => {
                console.log(res);
                if (res.status != 0) {
                    return layer.msg(res.message)
                }
                layer.msg(res.message)
                // 切换回登录模块
                $("#link_login").click();
                // 表单清空
                $("#form_reg")[0].reset();
            }
        })
    })
    // 用户登录
    $("#form_login").on("submit", function (e) {
        // 阻止默认提交
        e.preventDefault();
        $.ajax({
            url: '/api/login',
            type: 'post',
            data: $("#form_login").serialize(),
            success: (res) => {
                if (res.status != 0) return layer.msg(res.message)
                location.href = "/index.html"
                // 保存token
                localStorage.setItem("token", res.token)
            }
        })
    })

})