const MongoClient = require('mongodb').MongoClient;
const DB_CONN_STR = 'mongodb://127.0.0.1:27017/fm';

exports.connect = (cb) => {
    MongoClient.connect(DB_CONN_STR, function (err, db) {
        // console.log("连接成功！");
        const dbo = db.db('fm');
        cb(dbo, db);

        // const arrs = [
        //     {
        //         name: 'admin',
        //         password: 1111
        //     },
        //     {
        //         name: 'bear',
        //         password: 1111
        //     }
        // ];
        // dbo.collection('admin').insertMany(arrs, (err, res) => {
        //     if (err) throw err;
        //     console.log("插入的文档数量为: " + res.insertedCount);
        //     db.close();
        // })
        // dbo.collection('pm').find({}).toArray((err, res) => {
        //     if (err) {
        //         console.log('Error:'+ err);
        //         return;
        //     }
        //     console.log(res);
        //     db.close();
        // });
    });
}
