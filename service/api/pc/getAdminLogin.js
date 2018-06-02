const connect = require('../../db').connect;
const widget  = require('../../components/widget');
const $$      = require('../../components/dbhandler');
const md5     = require('md5');
const config  = require('../../config');

// const sql = require('../components/sql');

exports.getAdminLogin = function (req, res, next) {
    const data = req.body;

    if (!data.username || !data.password) {
        res.json(widget.setReponse('03'));
        return;
    }
    // sql.createAdmin(res);
    $$.find('admin', {name: data.username, password:data.password}).then(raw => {
        if (raw && !raw.length) {
            res.json(widget.setReponse('02'));
        } else {
            const tnow = new Date().getTime();
            const auth = widget.getAuth({name: data.username, password: data.password});

            $$.updates('admin', {'name': data.username}, {auth, lasttime:tnow}).then(resp => {
                res.json(widget.setReponse('01', auth));
            });
        }
    });

    // connect((dbo, db) => {
    //     const data = req.body;
    //
    //     if (!data.username || !data.password) return;
    //
    //     dbo.collection('pm').find({name: data.username, password: data.password}).toArray((err, resp) => {
    //         if (err) {
    //             console.log('Error:'+ err);
    //             res.json(widget.setError('01'));
    //             db.close();
    //             return;
    //         }
    //         if (resp && !resp.length) {
    //             res.json(widget.setError('01'));
    //         } else {
    //             res.json(widget.getAuth(resp));
    //         }
    //         db.close();
    //     });
    // })
};
