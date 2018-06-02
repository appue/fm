const express = require('express');
const router  = express.Router();

router.use(function setheader(req, res, next) {

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
    res.header("Content-Type", "application/json");
    res.header("X-Powered-By", "Express");
    res.header("Access-Control-Max-Age", 3600);

    if (req.method == "OPTIONS") {
        res.sendStatus(200);
    } else {
        // var params = req.body;
        // if (!params.Header.UserId) {
        //     res.json({
        //         Response: {
        //             Ack: 'failure',
        //             State: false,
        //             Time: new Date().getTime()
        //         }
        //     })
        // } else {
        //     next();
        // }
        next();
    }
});

// 前台接口
router.all('/getIndex', require('./api/app/getIndex').getIndex); // 首页
router.all('/getProgram', require('./api/app/getProgram').getProgram); // 获取节目
router.all('/getProgramDetail', require('./api/app/getProgramDetail').getProgramDetail); // 获取节目详情
router.all('/getLogin', require('./api/app/getLogin').getLogin); // 登录
router.all('/getComment', require('./api/app/getComment').getComment); // 获取评论
router.all('/setComment', require('./api/app/setComment').setComment); // 发布评论
router.all('/setMember', require('./api/app/setMember').setMember); // 注册
router.all('/setPassword', require('./api/app/setPassword').setPassword); // 修改密码

// 管理后台接口
router.all('/getAdminIndex', require('./api/pc/getAdminIndex').getAdminIndex); // 首页
router.all('/getAdminLogin', require('./api/pc/getAdminLogin').getAdminLogin); // 登录
router.all('/getAdminProgram', require('./api/pc/getAdminProgram').getAdminProgram); // 获取节目
router.all('/getAdminComment', require('./api/pc/getAdminComment').getAdminComment); // 获取评论
router.all('/getAdminMember', require('./api/pc/getAdminMember').getAdminMember); // 获取用户
router.all('/setAdminMemberStop', require('./api/pc/setAdminMemberStop').setAdminMemberStop); // 禁止用户
router.all('/setAdminMemberStart', require('./api/pc/setAdminMemberStart').setAdminMemberStart); // 启用用户
router.all('/setAdminMemberEdit', require('./api/pc/setAdminMemberEdit').setAdminMemberEdit); // 编辑用户
router.all('/setAdminCommentDelete', require('./api/pc/setAdminCommentDelete').setAdminCommentDelete); // 删除评论
router.all('/setAdminPassword', require('./api/pc/setAdminPassword').setAdminPassword); // 修改密码
router.all('/setAdminProgram', require('./api/pc/setAdminProgram').setAdminProgram); // 编辑、新增节目

// router.all('/getAdmin', require('./api/getAdmin').getAdmin);

module.exports = router;
