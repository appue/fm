const connect = require('../db').connect;
const widget  = require('../components/widget');
const $$      = require('../components/dbhandler');
const md5     = require('md5');

// DEBUG
// const sql = require('../components/sql');

exports.getAdminProgram = function (req, res, next) {
    widget.checkAuth(res, req, 'admin').then(user => {
        const data = req.body;
        const selector = {};
        if (data.keyword) {
            selector.program = eval("/"+ data.keyword +"/");
        }
        // sql.createProgram(res);
        $$.find('program', selector).then(raw => {
            if (raw && !raw.length) {
                res.json(widget.setReponse('02'));
            } else {
                raw.forEach((v, k) => {
                    v.pid = v._id;
                });
                res.json(widget.setReponse('01', {list: raw}));
            }
        });
    }, err => {
        res.json(widget.setReponse('02'));
    });
};
