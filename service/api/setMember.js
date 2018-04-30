const connect  = require('../db').connect;
const widget   = require('../components/widget');
const $$       = require('../components/dbhandler');
const ObjectId = require('mongodb').ObjectId;

exports.setMember = function (req, res, next) {
    const data = req.body;

    if (!data.username || !data.password || !data.password1) {
        res.json(widget.setReponse('03'));
        return;
    }
    if (data.password !== data.password) {
        res.json(widget.setReponse('04'));
        return;
    }

    const opts = {
        name: data.username,
        password: data.password,
        createtime: new Date().getTime(),
        lasttime: new Date().getTime()
    };
    const auth = widget.getAuth({
        password: opts.password,
        name: opts.name,
        time: opts.createtime,
        last: opts.lasttime
    });
    opts.auth = auth;

    $$.insert('member', opts).then(raw => {
        res.json(widget.setReponse('01', auth));
    });
};
