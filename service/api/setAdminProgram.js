const connect = require('../db').connect;
const widget  = require('../components/widget');
const $$  = require('../components/dbhandler');
const ObjectId = require('mongodb').ObjectId;

exports.setAdminProgram = function (req, res, next) {
    widget.checkAuth(res, req, 'admin').then(user => {
        const data = req.body;
        let type = 'add';
        if (data.pid) type = 'edit';

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
        if (type == 'edit') opts.pid = data.pid;
        if (type == 'add') opts.createtime = new Date().getTime();

        if (type == 'edit') {
            $$.updates('program', {"_id": ObjectId(data.pid)}, opts).then(raw => {
                res.json(widget.setSuccess({pid: data.pid}));
            });
        } else {
            $$.insert('program', opts).then(raw => {
                res.json(widget.setSuccess());
            });
        }
    }, err => {
        res.json(widget.setReponse('02'));
    });
};