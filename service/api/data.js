const util   = require('util');

/**
 * 获取除点击统计以外的统计数据
 * getDetailData
 */
exports.getDetailData = function (req, res, next) {
    var obj = {
        "code": 0
    };
    res.json(obj);
};
