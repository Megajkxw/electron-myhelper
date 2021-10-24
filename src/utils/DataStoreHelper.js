// import { LowSync, JSONFileSync } from 'lowdb'
//
// const title = "This is a test"
// const adapter = new JSONFileSync('file.json')
// const db = new LowSync(adapter)
//
// db.read()  //将文件内容加载到内存中
// db.data = { posts: [] } //默认值
//
// db.data.posts.push({ title }) //将数据添加到“集合”中
//
// db.write() //通过将数据保存到JSON文件来持久化数据
//
// //任何类似于查找的操作都由用户自己来完成
//
// let record = db.data.posts.find( p => p.title == "Hello world")
//
// if(!record) {
//     console.log("No data found!")
// } else {
//     console.log("== Record found ==")
//     console.log(record)
// }
//
// export default db
//


// 加载模块
const nedb = require('nedb');

// 实例化连接对象（不带参数默认为内存数据库）
const db = new nedb({
    filename: '/data/save.db',
    autoload: true
});



// 初始化数据库
db.count({}, function (err, count) {

    console.log("count错误"+err)
    console.log("数量"+count)
    if (count===0){
        let doc =
            [
                {
                    id:'FastFile',
                    items:[]
                }
            ]
        db.insert(doc, function (err, newDoc) {
            console.log("---初始化")
            console.log(newDoc)
        })
    }
});
console.log("---init 完")

function saveState() {
    // 删除所有记录
    db.remove({}, { multi: true }, function (err, numRemoved) {
    });
    db.insert()
}




export default {
    db,

    fastOpenHelper:{
        addItem(item) {
            db.update({id: 'FastFile'}, { $push: { items: item } }, {}, function () {
                // Now the fruits array is ['apple', 'orange', 'pear', 'banana']
            });
        },


        addItems(_items) {
            db.update({id: 'FastFile'}, { $push: { items: _items } }, {}, function () {
                // Now the fruits array is ['apple', 'orange', 'pear', 'banana']
            });
        },

        deleteItem(_name) {
            db.remove({name: _name}, {}, function () {
                // Now the fruits array is ['apple', 'orange', 'pear', 'banana']
            });
        },
        getAllItem(){
           return   db.find({ id: 'FastFile' }, function (err, docs) {
                // docs is an array containing documents Mars, Earth, Jupiter
                // If no document is found, docs is equal to []
            });
        }
    }

};