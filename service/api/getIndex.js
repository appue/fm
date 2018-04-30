const connect  = require('../db').connect;
const widget   = require('../components/widget');
const $$       = require('../components/dbhandler');
const ObjectId = require('mongodb').ObjectId;

exports.getIndex = function (req, res, next) {
    $$.find('comment', {state: {$ne: 1}}).then(raw => {
        let uids = [];
        let pids = [];

        raw.forEach((v, k) => {
            uids.push(ObjectId(v.uid));
            pids.push(ObjectId(v.pid));
        });

        Promise.all([
            $$.find('member', {'_id': {'$in': uids}}),
            $$.find('program', {'_id': {'$in': pids}})
        ]).then(resp => {
            let mb = {};
            let pm = {};

            resp[0].forEach((v, k) => {
                mb[v._id] = {
                    name: v.name,
                    image: v.image,
                    uid: v._id
                };
            });
            resp[1].forEach((v, k) => {
                pm[v._id] = {
                    program: v.program,
                    image: v.image,
                    media: v.media
                };
            });

            raw.forEach((v, k) => {
                v.user = mb[v.uid];
                v.program = pm[v.pid];
            });

            res.json(widget.setReponse('01', {list: raw}));
        });
    });
};
