const connect = require('../db').connect;
const widget  = require('../components/widget');
const $$  = require('../components/dbhandler');
const md5 = require('md5');

const sql  = require('../components/sql');

exports.setAdminPassword = function (req, res, next) {
    const data = req.body;
    if (!data.username || !data.password) return;

    // sql.createAdmin(res);

    $$.find('admin', {name: data.username, password:data.password}).then(resp => {
        if (resp && !resp.length) {
            res.json(widget.setError('01'));
        } else {
            res.json(widget.setReponse('01', resp));
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
