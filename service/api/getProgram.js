const connect = require('../db').connect;
const widget  = require('../components/widget');
const $$  = require('../components/dbhandler');

exports.getProgram = function (req, res, next) {
    $$.find('program', {}).then(raw => {
        if (raw && !raw.length) {
            res.json(widget.setError('01'));
        } else {
            raw.forEach((v, k) => {
                v.pid = v._id;
            });
            res.json(widget.setReponse('01', {list: raw}));
        }
    });
};
