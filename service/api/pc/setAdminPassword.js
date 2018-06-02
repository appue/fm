const connect  = require('../../db').connect;
const widget   = require('../../components/widget');
const $$       = require('../../components/dbhandler');
const md5      = require('md5');
const ObjectId = require('mongodb').ObjectId;

exports.setAdminPassword = function (req, res, next) {
    const data = req.body;

    if (!data.password || !data.password1 || !data.password2) {
        res.json(widget.setReponse('03'));
        return;
    }

    if (data.password1 !== data.password2) {
        res.json(widget.setReponse('04'));
        return;
    }

    widget.checkAuth(res, req, 'admin').then(user => {
        $$.find('admin', {'_id':ObjectId(user._id), 'password':data.password}).then(raw => {
            if (!raw || !raw.length) {
                res.json(widget.setReponse('04'));
                return;
            }
            $$.updates('admin', {'_id': ObjectId(user._id)}, {password: data.password1}).then(resp => {
                res.json(widget.setReponse('01'));
            });
        });
    }, err => {
        res.json(widget.setReponse('02'));
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
