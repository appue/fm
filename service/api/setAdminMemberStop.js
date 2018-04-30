const connect = require('../db').connect;
const widget  = require('../components/widget');
const $$  = require('../components/dbhandler');
const ObjectId = require('mongodb').ObjectId;

exports.setAdminMemberStop = function (req, res, next) {
    widget.checkAuth(res, req, 'admin').then(user => {
        if (!req.body.id) return;

        $$.updates('member', {'_id': ObjectId(req.body.id)}, {state: 1}).then(raw => {
            res.json(widget.setReponse('01'));
        });
    }, err => {
        res.json(widget.setReponse('02'));
    });
};
