const connect = require('../db').connect;

module.exports = {
    // 删除
    remove (collection, opts) {
        return new Promise((resolve, reject) => {
            connect((dbo, db) => {
                dbo.collection(collection).remove(opts, (err, res) => {
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
                dbo.collection(collection).find(selector).sort([['_id',-1]]).toArray((err, res) => {
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
                dbo.collection(collection).updateMany(selector, {$set: set}, (err, res) => {
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
