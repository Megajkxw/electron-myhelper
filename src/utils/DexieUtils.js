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
db.version(1).stores({note:'++id, title,content,createTime,updateTime'} );
db.version(1).stores({task:'++id, title,content,createTime,updateTime'} );
// db.version(1).stores({note:'++id, title,content,createTime,updateTime'} );



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


let  noteTable={
    async add(title,content) {
        //增加数据
        db.open();
        await db.note.add({title,content,createTime:new Date(),updateTime:new Date()});
        db.close();
    },
    //查询数据
    async queryById(note_id){
        db.open();
        let res=   await db.note.filter(note=>note.id === note_id).toArray();
        db.close();
        return res
    },
    //查询数据
    async queryByTitle(note_title){
        db.open();
        let res=   await db.note.filter(note=>note.title === note_title);
        db.close();
        return res
    },
    // 修改数据
        async updateNote(id,title,content){
            console.log('修改笔记数据：')
            console.log(id)
            console.log(title)
            console.log(content)
            db.open()
            // await db.note.put({id,title,content,updateTime:new Date()});
            await db.note.put({id,title,content,updateTime:new Date()})
            db.close();
        },
        //删除数据
    async delete(id){
        db.open();
        await db.note .delete(id);
        db.close();
    },
    async list(){
        db.open();
        let res=  await db.note.toArray()
        console.log("加载的笔记数据：")
        console.log(res)
        db.close();
        return res
    }
    //排序数据
    // async sort(){
    //     await db.fastFile.orderBy('title');
    // }
}

let  taskTable={
    async add(title,content) {
        //增加数据
        db.open();
        await db.task.add({title,content,createTime:new Date(),updateTime:new Date()});
        db.close();
    },
    //查询数据
    async queryById(task_id){
        db.open();
        let res=   await db.task.filter(task=>task.id === task_id).toArray();
        db.close();
        return res
    },
    //查询数据
    async queryByTitle(task_title){
        db.open();
        let res=   await db.task.filter(task=>task.title === task_title);
        db.close();
        return res
    },
    // 修改数据
    async updateNote(id,title,content){
        console.log('修改task数据：')
        console.log(id)
        console.log(title)
        console.log(content)
        db.open()
        // await db.note.put({id,title,content,updateTime:new Date()});
        await db.task.put({id,title,content,updateTime:new Date()})
        db.close();
    },
    //删除数据
    async delete(id){
        db.open();
        await db.task .delete(id);
        db.close();
    },
    async list(){
        db.open();
        let res=  await db.task.toArray()
        console.log("加载的task数据：")
        console.log(res)
        db.close();
        return res
    }
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
    db.note.put({title:'测试',content:"第一篇笔记",createTime:new Date(),updateTime:new Date()})
    db.task.put({title:'今日任务',content:"- 学习",createTime:new Date(),updateTime:new Date()})
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
    noteTable,
    taskTable,
    init
}
