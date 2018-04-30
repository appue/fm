const express = require('express');
const router  = express.Router();
// var datas   = require('./api/data');

router.use(function setheader(req, res, next) {

    // res.header("Content-Type", "text/plain");
    // res.header("Access-Control-Allow-Origin", "http://localhost:7777");
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
    res.header("Content-Type", "application/json");
    res.header("X-Powered-By", "Express");
    res.header("Access-Control-Max-Age", 3600);

    // console.log(req.params);
    // console.log(req.hostname);
    // console.log(req.method);

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
router.all('/getIndex', require('./api/getIndex').getIndex); // 首页
router.all('/getProgram', require('./api/getProgram').getProgram); // 获取节目
router.all('/getProgramDetail', require('./api/getProgramDetail').getProgramDetail); // 获取节目详情
router.all('/getLogin', require('./api/getLogin').getLogin); // 登录
router.all('/getComment', require('./api/getComment').getComment); // 获取评论
router.all('/setComment', require('./api/setComment').setComment); // 发布评论
router.all('/setMember', require('./api/setMember').setMember); // 注册

// 管理后台接口
router.all('/getAdminIndex', require('./api/getAdminIndex').getAdminIndex); // 首页
router.all('/getAdminLogin', require('./api/getAdminLogin').getAdminLogin); // 登录
router.all('/getAdminProgram', require('./api/getAdminProgram').getAdminProgram); // 获取节目
router.all('/getAdminComment', require('./api/getAdminComment').getAdminComment); // 获取评论
router.all('/getAdminMember', require('./api/getAdminMember').getAdminMember); // 获取用户
router.all('/setAdminMemberStop', require('./api/setAdminMemberStop').setAdminMemberStop); // 禁止用户
router.all('/setAdminMemberStart', require('./api/setAdminMemberStart').setAdminMemberStart); // 启用用户
router.all('/setAdminMemberEdit', require('./api/setAdminMemberEdit').setAdminMemberEdit); // 编辑用户
router.all('/setAdminCommentDelete', require('./api/setAdminCommentDelete').setAdminCommentDelete); // 删除评论
router.all('/setAdminPassword', require('./api/setAdminPassword').setAdminPassword); // 修改密码
router.all('/setAdminProgram', require('./api/setAdminProgram').setAdminProgram); // 编辑、新增节目

// router.all('/getAdmin', require('./api/getAdmin').getAdmin);

module.exports = router;
