// const mongoose = require('mongoose');
// const db = mongoose.connect('mongodb://127.0.0.1:27017/fm');//；连接数据库
// const Schema = mongoose.Schema;   //  创建模型
// const userScheMa = new Schema({
// 	name: String,
// 	password: String
// }); //  定义了一个新的模型，但是此模式还未和users集合有关联
// exports.user = db.model('pm', userScheMa); //  与users集合关联


const MongoClient = require('mongodb').MongoClient;
const DB_CONN_STR = 'mongodb://127.0.0.1:27017/fm';

MongoClient.connect(DB_CONN_STR, function (err, db) {
    console.log("连接成功！");
    const dbo = db.db('fm');

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
    // dbo.collection('pm').insertMany(arrs, (err, res) => {
    //     if (err) throw err;
    //     console.log("插入的文档数量为: " + res.insertedCount);
    //     db.close();
    // })
    dbo.collection('pm').find({}).toArray((err, res) => {
        if (err) {
            console.log('Error:'+ err);
            return;
        }
        console.log(res);
        db.close();
    });
});
