const connect  = require('../../db').connect;
const widget   = require('../../components/widget');
const $$       = require('../../components/dbhandler');
const md5      = require('md5');
const ObjectId = require('mongodb').ObjectId;

exports.setPassword = function (req, res, next) {
    const data = req.body;

    if (!data.password || !data.password1 || !data.password2) {
        res.json(widget.setReponse('03'));
        return;
    }

    if (data.password1 !== data.password2) {
        res.json(widget.setReponse('04'));
        return;
    }

    widget.checkAuth(res, req, 'app').then(user => {
        $$.find('member', {'_id':ObjectId(user._id), 'password':data.password}).then(raw => {
            if (!raw || !raw.length) {
                res.json(widget.setReponse('04'));
                return;
            }

            $$.updates('member', {'_id': ObjectId(user._id)}, {password: data.password1}).then(resp => {
                $$.find('member', {'_id': ObjectId(user._id), password:data.password1, state:{$ne:1}}).then(raw => {
                    const tnow = new Date().getTime();
                    const auth = widget.getAuth({name: user.name, password: data.password1});

                    $$.updates('member', {'name': user.name}, {auth, lasttime:tnow}).then(resp => {
                        res.json(widget.setReponse('01', auth));
                    });
                });
            });
        });
    }, err => {
        res.json(widget.setReponse('02'));
    });
};
