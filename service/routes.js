var express = require('express');
var router  = express.Router();;
var datas   = require('./api/data');

router.use(function setheader(req, res, next) {

    // res.header("Content-Type", "text/plain");
    // res.header("Access-Control-Allow-Origin", "http://localhost:7777");
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
    res.header("Content-Type", "application/json");
    res.header("X-Powered-By", "Express");

    // console.log(req.params);
    // console.log(req.hostname);
    // console.log(req.method);

    if (req.method == "OPTIONS") {
        res.sendStatus(200);
    } else {
        var params = req.body;

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

router.all('/getDetailData', datas.getDetailData);

module.exports = router;
