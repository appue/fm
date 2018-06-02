const connect = require('../../db').connect;
const widget  = require('../../components/widget');
const $$      = require('../../components/dbhandler');
const md5     = require('md5');
const config  = require('../../config');

// 登录
exports.getLogin = function (req, res, next) {
    const data = req.body;

    if (!data.username || !data.password) {
        res.json(widget.setReponse('03'));
        return;
    }

    $$.find('member', {name:data.username, password:data.password, state:{$ne:1}}).then(raw => {
        if (raw && !raw.length) {
            res.json(widget.setReponse('06'));
        } else {
            // res.json(widget.setReponse('01', raw[0].auth));
            const tnow = new Date().getTime();
            const auth = widget.getAuth({name: data.username, password: data.password});

            $$.updates('member', {'name': data.username}, {auth, lasttime:tnow}).then(resp => {
                res.json(widget.setReponse('01', auth));
            });
        }
    });
};
