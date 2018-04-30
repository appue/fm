const connect  = require('../db').connect;
const widget   = require('../components/widget');
const $$       = require('../components/dbhandler');
const ObjectId = require('mongodb').ObjectId;

exports.setComment = function (req, res, next) {
    widget.checkAuth(res, req, 'app').then(user => {
        const data = req.body;

        if (!data.pid || !data.content) {
            res.json(widget.setReponse('03'));
            return;
        }

        const opts = {
            "pid": data.pid,
            "uid": user._id,
            "content": data.content,
            "createtime": new Date().getTime(),
            "updatetime": new Date().getTime()
        };

        $$.insert('comment', opts).then(raw => {
            res.json(widget.setReponse('01', {pid: data.pid}));
        });
    }, err => {
        res.json(widget.setReponse('02'));
    });
};
