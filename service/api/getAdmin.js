const connect = require('../db').connect;
const widget  = require('../widget');

exports.getAdmin = function (req, res, next) {
    connect((dbo, db) => {
        dbo.collection('pm').find({}).toArray((err, resp) => {
            if (err) {
                console.log('Error:'+ err);
                return;
            }
            resp.Response = widget.setReponse();
            console.log(resp);
            res.json(resp);
            db.close();
        });
    })
};
