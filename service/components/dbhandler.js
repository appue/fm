const connect = require('../db').connect;

module.exports = {
    // 创建
    insert (collection, opts) {
        return new Promise((resolve, reject) => {
            connect((dbo, db) => {
                dbo.collection(collection).insert(opts, (err, res) => {
                    if (err) {
                        console.log('Error:'+ err);
                        reject(err);
                        db.close();
                        return;
                    }
                    resolve(res);
                    db.close();
                });
            })
        });
    },

    // 查询
    find (collection, selector) {
        return new Promise((resolve, reject) => {
            connect((dbo, db) => {
                dbo.collection(collection).find(selector).toArray((err, res) => {
                    if (err) {
                        console.log('Error:'+ err);
                        reject(err);
                        db.close();
                        return;
                    }
                    resolve(res);
                    db.close();
                });
            })
        });
    },

    // 更新
    updates (collection, selector, set) {
        return new Promise((resolve, reject) => {
            connect((dbo, db) => {
                dbo.collection('program').updateMany(selector, {$set: set}, (err, res) => {
                    if (err) {
                        console.log('Error:'+ err);
                        reject(err);
                        db.close();
                        return;
                    }
                    resolve(res);
                    db.close();
                });
            });
        });
    }
}
