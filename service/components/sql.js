const connect = require('../db').connect;
const widget  = require('./widget');
const $$  = require('./dbhandler');
const md5 = require('md5');
const config = require('../config');

module.exports = {
    createAdmin (res) {
        const password = '202cb962ac59075b964b07152d234b70';
        const username = 'admin';
        const time = new Date().getTime();
        const last = time + config.auth;
        const auth = md5(password + username + last);
        connect((dbo, db) => {
            dbo.collection('admin').insertOne({
                "name": username,
                "password": password,
                "createtime": time,
                "lasttime": time,
                "auth": auth
            }, (err, raw) => {
                res.json(widget.setReponse('01', auth));
                dbo.collection('admin').ensureIndex({name:1},{unique:true}, (err) => {
                    db.close();
                });
            });
        });
    },

    createProgram (res) {
        const time = new Date().getTime();
        const opts = [
            {
                'program': '测试节目1',
                'media': 'http://short-audio.ajmide.com/audio/201804/27/5ae2f4d203a781524823250',
                'createtime': time,
                'updatetime': time,
                'content': '内容',
                'compere': 1,
                'image': '/themes/img/program/01.jpg'
            },
            {
                'program': '测试节目2',
                'media': 'http://short-audio.ajmide.com/audio/201804/27/5ae2f4d203a781524823250',
                'createtime': time,
                'updatetime': time,
                'content': '内容',
                'compere': 1,
                'image': '/themes/img/program/01.jpg'
            },
            {
                'program': '测试节目3',
                'media': 'http://short-audio.ajmide.com/audio/201804/27/5ae2f4d203a781524823250',
                'createtime': time,
                'updatetime': time,
                'content': '内容',
                'compere': 1,
                'image': '/themes/img/program/01.jpg'
            }
        ];

        connect((dbo, db) => {
            dbo.collection('program').insert(opts, (err, raw) => {
                res.json(widget.setReponse('01', opts));
                db.close();
            });
        });
    },

    createCompere (res) {
        connect((dbo, db) => {
            dbo.collection('compere').insertOne({
                "name": "主持人1",
                "images": "/themes/img/compere/01.jpg",
                "createtime": new Date().getTime(),
                "lasttime": new Date().getTime()
            }, (err, raw) => {
                res.json(widget.setReponse('01', ''));
                // dbo.collection('admin').ensureIndex({name:1},{unique:true}, (err) => {
                //     db.close();
                // });
            });
        });
    }
}
