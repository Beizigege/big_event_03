$(function () {
    let form = layui.form;
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return "昵称长度为1~6之间！"
            }
        }
    })

    // 2.用户渲染
    initUserInfo();
    let layer = layui.layer;
    // 封装函数
    function initUserInfo() {
        $.ajax({
            url: '/my/userinfo',
            method: 'get',
            // data: {},
            success: (res) => {
                // console.log(res);
                if (res.status != 0) {
                    return layer.msg(res.message, { icon: 5 })
                }
                // 成功后渲染
                form.val("formUserInfo", res.data)
            }
        })

    }

    // 重置
    $("#btnReset").on("click", function (e) {
        e.preventDefault();
        // 用上面的渲染方法实现
        initUserInfo()
    })

    // 修改用户信息
    $(".layui-form").on("submit", function (e) {
        e.preventDefault();
        $.ajax({
            url: '/my/userinfo',
            method: 'post',
            data: $(this).serialize(),
            success: (res) => {
                // console.log(res);
                if (res.status != 0) return layer.msg("用户信息修改失败", { icon: 5 })
                // 成功
                layer.msg("用户信息修改成功", { icon: 6 })
                // 调用父页面的用户信息和头像方法
                window.parent.getuSerInfo();
            }
        })
    })
})