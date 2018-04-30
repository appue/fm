### 开发
	npm run dev


### mongo

mongo
https://www.cnblogs.com/best/p/6212807.html

db.admin.find().pretty()
db.createCollection("admin")

查看全部数据库
show dbs
显示当前数据库中的集合（类似关系数据库中的表）
show collections
查看当前数据库的用户信息
show users
切换数据库跟mysql一样
use <db name>
查看当前所在数据库
db

##### Collection聚集集合
1、创建一个聚集集合（table）
db.createCollection(“collName”, {size: 20, capped: 5, max: 100});  
//创建成功会显示{“ok”:1}
//判断集合是否为定容量db.collName.isCapped();

2、得到指定名称的聚集集合（table）
db.getCollection("account");  

3、得到当前db的所有聚集集合
db.getCollectionNames();  

4、显示当前db所有聚集索引的状态
db.printCollectionStats();  

5、查询文档
db.collection_name.find().pretty()

##### 用户相关
1、添加一个用户
db.addUser("name");  
db.addUser("userName", "pwd123", true);   
添加用户、设置密码、是否只读

2、数据库认证、安全模式
db.auth("userName", "123123");  

3、显示当前所有用户
show users;  

4、删除用户
db.removeUser("userName");

#### 聚集集合查询
1、查询所有记录
db.userInfo.find();  
相当于：select * from userInfo;

默认每页显示20条记录，当显示不下的情况下，可以用it迭代命令查询下一页数据。注意：键入it命令不能带“；”
但是你可以设置每页显示数据的大小，用DBQuery.shellBatchSize= 50;这样每页就显示50条记录了。

2、查询去掉后的当前聚集集合中的某列的重复数据
db.userInfo.distinct("name");  
会过滤掉name中的相同数据
相当于：select distict name from userInfo;

3、查询age = 22的记录
db.userInfo.find({"age": 22});  
相当于： select * from userInfo where age = 22;

4、查询age > 22的记录
db.userInfo.find({age: {$gt: 22}});  
相当于：select * from userInfo where age >22;

5、查询age < 22的记录
db.userInfo.find({age: {$lt: 22}});  
相当于：select * from userInfo where age <22;

6、查询age >= 25的记录
db.userInfo.find({age: {$gte: 25}});  
相当于：select * from userInfo where age >= 25;

7、查询age <= 25的记录
db.userInfo.find({age: {$lte: 25}});  

8、查询age >= 23 并且 age <= 26
db.userInfo.find({age: {$gte: 23, $lte: 26}});  

9、查询name中包含 mongo的数据
db.userInfo.find({name: /mongo/});  
//相当于%%
select * from userInfo where name like ‘%mongo%';

10、查询name中以mongo开头的
db.userInfo.find({name: /^mongo/});  
相当于：select * from userInfo where name like ‘mongo%';

11、查询指定列name、age数据
db.userInfo.find({}, {name: 1, age: 1});  
相当于：select name, age from userInfo;
当然name也可以用true或false,当用ture的情况下河name:1效果一样，如果用false就是排除name，显示name以外的列信息。

12、查询指定列name、age数据, age > 25
db.userInfo.find({age: {$gt: 25}}, {name: 1, age: 1});  
相当于：select name, age from userInfo where age >25;

13、按照年龄排序
升序：db.userInfo.find().sort({age: 1});  
降序：db.userInfo.find().sort({age: -1});  

14、查询name = zhangsan, age = 22的数据
db.userInfo.find({name: 'zhangsan', age: 22});  
相当于：select * from userInfo where name = ‘zhangsan' and age = ‘22';

15、查询前5条数据
db.userInfo.find().limit(5);  
相当于：selecttop 5 * from userInfo;

16、查询10条以后的数据
db.userInfo.find().skip(10);  
相当于：select * from userInfo where id not in (
selecttop 10 * from userInfo
);

17、查询在5-10之间的数据
db.userInfo.find().limit(10).skip(5);  
可用于分页，limit是pageSize，skip是第几页*pageSize

18、or与查询
db.userInfo.find({$or: [{age: 22}, {age: 25}]});  
相当于：select * from userInfo where age = 22 or age = 25;

19、查询第一条数据
db.userInfo.findOne();  
相当于：selecttop 1 * from userInfo;
db.userInfo.find().limit(1);

20、查询某个结果集的记录条数
db.userInfo.find({age: {$gte: 25}}).count();  
相当于：select count(*) from userInfo where age >= 20;

21、按照某列进行排序
db.userInfo.find({sex: {$exists: true}}).count();  
相当于：select count(sex) from userInfo;

#### 索引
1、创建索引
db.userInfo.ensureIndex({name: 1});  
db.userInfo.ensureIndex({name: 1, ts: -1});  

2、查询当前聚集集合所有索引
db.userInfo.getIndexes();  

3、查看总索引记录大小
db.userInfo.totalIndexSize();  

4、读取当前集合的所有index信息
db.users.reIndex();  

5、删除指定索引
db.users.dropIndex("name_1");

6、删除所有索引索引
db.users.dropIndexes();  

#### 修改、添加、删除集合数据
1、添加
db.users.save({name: ‘zhangsan', age: 25, sex: true});  
添加的数据的数据列，没有固定，根据添加的数据为准

2、修改
db.users.update({age: 25}, {$set: {name: 'changeName'}}, false, true);  
相当于：update users set name = ‘changeName' where age = 25;  
db.users.update({name: 'Lisi'}, {$inc: {age: 50}}, false, true);  
相当于：update users set age = age + 50 where name = ‘Lisi';  
db.users.update({name: 'Lisi'}, {$inc: {age: 50}, $set: {name: 'hoho'}}, false, true);  
相当于：update users set age = age + 50, name = ‘hoho' where name = ‘Lisi';  

3、删除
db.users.remove({age: 132});  

4、查询修改删除
db.users.findAndModify({  
    query: {age: {$gte: 25}},   
    sort: {age: -1},   
    update: {$set: {name: 'a2'}, $inc: {age: 2}},  
    remove: true  
});  
db.runCommand({ findandmodify : "users",   
    query: {age: {$gte: 25}},   
    sort: {age: -1},   
    update: {$set: {name: 'a2'}, $inc: {age: 2}},  
    remove: true  
});  

update 或 remove 其中一个是必须的参数; 其他参数可选。
参数    详解     默认值
query    查询过滤条件    {}
sort    如果多个文档符合查询过滤条件，将以该参数指定的排列方式选择出排在首位的对象，该对象将被操作    {}
remove    若为true，被选中对象将在返回前被删除 N/A
update    一个修改器对象 N/A
new    若为true，将返回修改后的对象而不是原始对象。在删除操作中，该参数被忽略。  false
fields    参见Retrieving a Subset of Fields (1.5.0+)
All fields
upsert    创建新对象若查询结果为空。 示例 (1.5.4+) false
