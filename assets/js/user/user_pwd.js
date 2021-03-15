$(function () {
    // 1. 定义密码规则
    let form = layui.form;
    form.verify({
        // 密码
        pwd: [
            /^[\S]{6,12}$/,
            '密码必须6到12位，且不能出现空格'
        ],
        // 新密码(不能和原密码重复)
        samePwd: function (value) {
            // 新密码和原密码一致后报错
            if (value === $("[name=oldPwd]").val()) {
                return "新密码和原密码不能重复！"
            }
        },
        // 确认新密码(必须和新密码一致)
        rePwd: function (value) {
            // 确认新密码和新密码不一致就报错
            if (value != $("[name=newPwd]").val()) {
                return "确认新密码和新密码必须一致！"
            }
        }
    });

    // 2.修改密码
    $("form").on("submit", function (e) {
        e.preventDefault();
        $.ajax({
            url: '/my/updatepwd',
            type: 'post',
            data: $(this).serialize(),
            success: (res) => {
                // 状态判断
                if (res.status != 0) {
                    return layui.layer.msg(res.message)
                }
                // 成功提示，清空密码
                layui.layer.msg("恭喜您，密码修改成功！")
                $("form")[0].reset();
            }
        })
    })
})