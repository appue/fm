const connect  = require('../db').connect;
const widget   = require('../components/widget');
const $$       = require('../components/dbhandler');
const ObjectId = require('mongodb').ObjectId;

exports.setAdminMemberEdit = function (req, res, next) {
    widget.checkAuth(res, req, 'admin').then(user => {
        if (!req.body.uid || !req.body.image) {
            res.json(widget.setReponse('03'));
            return;
        }

        $$.updates('member', {'_id': ObjectId(req.body.uid)}, {image: req.body.image}).then(raw => {
            res.json(widget.setReponse('01'));
        });
    }, err => {
        res.json(widget.setReponse('02'));
    });
};
