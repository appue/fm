const connect = require('../db').connect;
const widget  = require('../components/widget');
const $$      = require('../components/dbhandler');
const md5     = require('md5');
const config  = require('../config');

exports.getLogin = function (req, res, next) {
    const data = req.body;

    if (!data.username || !data.password) {
        res.json(widget.setReponse('03'));
        return;
    }
    
    $$.find('member', {name:data.username, password:data.password}).then(raw => {
        if (raw && !raw.length) {
            res.json(widget.setReponse('02'));
        } else {
            res.json(widget.setReponse('01', raw[0].auth));
        }
    });
};
