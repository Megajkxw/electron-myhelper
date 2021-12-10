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
db.version(1).stores({fastFile:'++id, file_name, path,txt,order,isTop,improtance,category_id,update_date,create_datetime',} );
db.version(1).stores({fileCategory:'++id, name,order'} );
db.open();



let  fileCategoryTable={
    async add(category_name) {
        //增加数据
        await db.fileCategory.put({name: category_name});
    },
    //查询数据
    async queryById(category_id){
        return  await db.fileCategory.filter(fileCategory=>fileCategory.id === category_id);
    },
    //修改数据
    async update(category_name,category_order){
        if (category_order===null||category_order===undefined)
        await db.fileCategory.put({name:category_name});
        else
            await db.fileCategory.put({name:category_name,order:category_order});
    },
    //删除数据
    async delete(id){
        await db.fileCategory .delete(id);
    },
    async list(){
        return  await db.fileCategory.toArray()
    }
    //排序数据
    // async sort(){
    //     await db.fastFile.orderBy('title');
    // }
}


let  fastFileTable={
     async add(fileName,filePath,categoryId) {
        //增加数据
        await db.fastFile.put({file_name: fileName, path: filePath,category_id:categoryId});
    },
    //查询数据
    async queryById(id){
       return  await db.fastFile.filter(fastFile=>fastFile.id === id);
    },
    //查询数据
    async queryByCategory(categoryId){
        // return  await db.fastFile.filter(fastFile=>fastFile.category_id === categoryId);
        return  await db.fastFile.where('category_id').equals(categoryId).toArray ();
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
    },
    //排序数据
    // async sort(){
    //     await db.fastFile.orderBy('title');
    // }
}


async function init(){
    let res =await fileCategoryTable.queryById(0)
    console.log("默认分类")
    console.log(res)
    db.fileCategory.put({name: "默认",id:0})
    console.log("没有经过设置默认分类")
}

init()

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
    fileCategoryTable,
}
