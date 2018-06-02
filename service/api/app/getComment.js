const connect  = require('../../db').connect;
const widget   = require('../../components/widget');
const $$       = require('../../components/dbhandler');
const ObjectId = require('mongodb').ObjectId;

// 获取评论信息
exports.getComment = function (req, res, next) {
    if (!req.body.pid) {
        res.json(widget.setReponse('03'));
        return;
    }

    $$.find('comment', {pid: req.body.pid, state: {$ne: 1}}).then(raw => {
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
            let pm = resp[1][0];

            resp[0].forEach((v, k) => {
                mb[v._id] = {
                    name: v.name,
                    image: v.image,
                    uid: v._id
                };
            });

            raw.forEach((v, k) => {
                v.user = mb[v.uid];
            });

            res.json(widget.setReponse('01', {
                list: raw,
                program: pm
            }));
        });
    });
};
