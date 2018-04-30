const connect = require('../db').connect;
const widget  = require('../components/widget');
const $$  = require('../components/dbhandler');
const md5 = require('md5');

exports.getAdminMember = function (req, res, next) {
    widget.checkAuth(res, req, 'admin').then(user => {
        $$.find('member', {}).then(raw => {
            res.json(widget.setReponse('01', {list: raw}));
        });
    }, err => {
        res.json(widget.setReponse('02'));
    });
};
