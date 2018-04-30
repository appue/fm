const connect = require('../db').connect;
const widget  = require('../components/widget');
const $$  = require('../components/dbhandler');
const ObjectId = require('mongodb').ObjectId;

exports.setAdminProgram = function (req, res, next) {
    widget.checkAuth(res, req, 'admin').then(user => {
        const data = req.body;

        if (!data.pid) return;
        if (!data.program) return;
        if (!data.media) return;
        if (!data.compere) return;
        if (!data.image) return;
        if (!data.content) return;

        const opts = {
            "program": data.program,
            "media": data.media,
            "compere": data.compere,
            "image": data.image,
            "content": data.content,
            "updatetime": new Date().getTime()
        };

        $$.updates('program', {"_id": ObjectId(data.pid)}, opts).then(raw => {
            res.json(widget.setSuccess({pid: data.pid}));
        });
    }, err => {
        res.json(widget.setReponse('02'));
    });
};
