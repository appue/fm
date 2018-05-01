const connect = require('../db').connect;
const md5 = require('md5');
const config = require('../config');

module.exports = {
    /**
     * 检查Auth的有效性
     * @method checkAuth
     */
    checkAuth (raw, req, type) {
        const self = this;

        return new Promise((resolve, reject) => {
            const data = req.body;
            if (!data.auth) {
                raw.json(widget.setReponse('02'));
                reject();
                return;
            }

            const auth = data.auth;
            let cols = '';
            if (type == 'admin') {
                cols = 'admin';
            } else {
                cols = 'member';
            }

            connect((dbo, db) => {
                dbo.collection(cols).find({auth}).toArray((err, res) => {
                    if (err) {
                        reject(err);
                        db.close();
                        return;
                    }
                    if (res && res.length) {
                        const time = parseInt(new Date().getTime(), 0);
                        const user = JSON.parse(JSON.stringify(res[0]));
                        const last = parseInt(user.lasttime, 0) + config.auth;
                        if (time < last) {
                            const tmp = md5(user.password + user.name + last);
                            if (tmp == auth) {
                                resolve(user);
                            } else {
                                reject();
                            }
                        } else {
                            reject();
                        }
                    } else {
                        reject();
                    }
                    db.close();
                });
            })
        });
    },

    /**
     * 生成Auth
     * @param {[number]} time     当前时间或者提交过来的时间
     * @param {[number]} last     最后登录的时间+1天
     * @param {[string]} password 密码
     * @param {[string]} name     用户名
     */
    getAuth (params) {
        const tnow = new Date().getTime();
        const opts = {
            time: params.time || tnow,
            last: params.last ? parseInt(params.last, 0) + config.auth : tnow + config.auth,
            password: params.password,
            name: params.name
        };

        if (opts.time < opts.last) return md5(opts.password + opts.name + opts.last);

        return '';
    },

    setReponse (type, res) {
        const obj = {
            data: res || '',
            time: new Date().getTime()
        };

        switch (type) {
            case '01':
                obj.code = 1;
                obj.message = 'success';
            break;

            case '02':
                obj.code = 2;
                obj.message = "用户名或密码错误";
            break;

            case '03':
                obj.code = 3;
                obj.message = "缺少必要参数";
            break;

            case '04':
                obj.code = 4;
                obj.message = "输入有误";
            break;
        }

        return obj;
    }
};
