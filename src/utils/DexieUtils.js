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



let  fileCategoryTable={
    async add(category_name) {
        //增加数据
        db.open();
        await db.fileCategory.put({name: category_name});
        db.close();
    },
    //查询数据
    async queryById(category_id){
        db.open();
        let res=   await db.fileCategory.filter(fileCategory=>fileCategory.id === category_id);
        db.close();
        return res
    },
    //修改数据
    async update(category_name,category_order){
        db.open();
        if (category_order===null||category_order===undefined)
            await db.fileCategory.put({name:category_name});
        else
            await db.fileCategory.put({name:category_name,order:category_order});
        db.close();
    },
    //删除数据
    async delete(id){
        db.open();
        await db.fileCategory .delete(id);
        db.close();
    },
    async list(){
        db.open();
        let res=  await db.fileCategory.toArray()
        if (res.length==0){
            await init()
            res=  await db.fileCategory.toArray()
        }
        console.log("加载的分类数据：")
        console.log(res)
        db.close();
        return res
    }
    //排序数据
    // async sort(){
    //     await db.fastFile.orderBy('title');
    // }
}


let  fastFileTable={
     async add(fileName,filePath,categoryId) {
        //增加数据
         db.open();
        await db.fastFile.put({file_name: fileName, path: filePath,category_id:categoryId});
         db.close()
    },
    //查询数据
    async queryById(id){
        db.open();
       let res=  await db.fastFile.filter(fastFile=>fastFile.id === id);
        db.close()
        return res
    },
    //查询数据
    async queryByCategory(categoryId){
        db.open();
        // return  await db.fastFile.filter(fastFile=>fastFile.category_id === categoryId);
        let res=  await db.fastFile.where('category_id').equals(categoryId).toArray ();
        db.close()
        return res
    },
    //修改数据
    async update(fileName,filePath){
        db.open();
        await db.fastFile.put({file_name: fileName, path: filePath});
        db.close()
    },
    //删除数据
    async delete(id){
        db.open();
        await db.fastFile .delete(id);
        db.close()
    },
    async list(){
        db.open();
        let res=  await db.fastFile.toArray()

        db.close()
        return res
    },
    //排序数据
    // async sort(){
    //     await db.fastFile.orderBy('title');
    // }
}


async function init(){
    db.open();
    // let res =await fileCategoryTable.queryById(0)
    // console.log("默认分类：")
    // console.log(res)
    db.fileCategory.put({name: "默认",id:0})
    console.log("设置了默认分类")
    db.close()
}



console.log("db为")
console.log(db)

// fastFileTable.add('test','test')
// async  function test() {
//     console.log("fastfile表数据为")
//     console.log( await  fastFileTable.list())
// }
// test()



export  {
    fastFileTable,
    fileCategoryTable,
    init
}
