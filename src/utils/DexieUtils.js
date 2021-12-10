import Dexie from 'dexie';

let db;
// if (Dexie.exists('myhelper')){
//     db = new Dexie('myhelper');
//     db.version(1).stores({fastFile:'++id, file_name, path',} );
// }
// else {
//     db.open()
// }

db = new Dexie('myhelper');
db.version(1).stores({fastFile:'++id, file_name, path',} );
db.open();

let  fastFileTable={
     async add(fileName,filePath) {
        //增加数据
        await db.fastFile.put({file_name: fileName, path: filePath});
    },
    //查询数据
    async query(){
       return  await db.fastFile.filter(fastFile=>fastFile.title === "test");
    },
    //修改数据
    async update(fileName,filePath){
        await db.fastFile.put({file_name: fileName, path: filePath});
    },
    //删除数据
    async delete(id){
        await db.fastFile .delete(id);
    },
    async list(){
        return  await db.fastFile.toArray()
    }
    //排序数据
    // async sort(){
    //     await db.fastFile.orderBy('title');
    // }
}



console.log("db为")
console.log(db)

// fastFileTable.add('test','test')
async  function test() {
    console.log("fastfile表数据为")
    console.log( await  fastFileTable.list())
}
test()



export  {
    fastFileTable,
}
