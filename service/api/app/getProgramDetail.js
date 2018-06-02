const connect  = require('../../db').connect;
const widget   = require('../../components/widget');
const $$       = require('../../components/dbhandler');
const ObjectId = require('mongodb').ObjectId;

// 获取节目详情
exports.getProgramDetail = function (req, res, next) {
    if (!req || !req.body || !req.body.pid) {
        res.json(widget.setReponse('03'));
        return;
    };

    $$.find('program', {'_id': ObjectId(req.body.pid)}).then(raw => {
        let resp = {};
        if (raw && raw.length) resp = raw[0];

        res.json(widget.setReponse('01', resp));
    });
};
