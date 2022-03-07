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
db.version(1).stores({webnav:'++id, title,url,icon,like,importance,index'} );
db.version(1).stores({webCategory:'++id, title,index'} );
db.version(1).stores({webItemAndCategory:'++id, itemId,categoryId'} );
// db.version(1).stores({note:'++id, title,content,createTime,updateTime'} );



let  fileCategoryTable={
    async add(category_name) {
        //增加数据
        db.open();

        let res={
            code:0,
            id:undefined,
            error:undefined
        }
        await db.fileCategory.put({name: category_name})
            .then((id)=>{
                 res.id=id
            })
            .catch((e)=>{
                res.error=e
                res.code=-1
            });
        db.close();
        return res
    },
    //查询数据
    async queryById(category_id){
        db.open();
        let res={
            code:0,
            data:undefined,
            error:undefined
        }
        res.data=   await db.fileCategory.filter(fileCategory=>fileCategory.id === category_id)
            .catch((e)=>{
                res.error=e
                res.code=-1
            })
        db.close();
        return res
    },
    //修改数据
    async update(category_name,category_order){
        db.open();
        let res={
            code:0,
            id:undefined,
            error:undefined
        }
        if (category_order===null||category_order===undefined)
            await db.fileCategory.put({name:category_name})
                .catch((e)=>{
                    res.error=e
                    res.code=-1
                })
        else
            await db.fileCategory.put({name:category_name,order:category_order})
                .catch((e)=>{
                    res.error=e
                    res.code=-1
                })
        db.close();
        return res
    },
    //删除数据
    async delete(id){
        db.open();
        let res={
            code:0,
            id:undefined,
            error:undefined
        }
        await db.fileCategory .delete(id)
            .catch((e)=>{
                res.error=e
                res.code=-1
            })
        db.close();
    },
    async list(){
        db.open();
        let res={
            code:0,
            id:undefined,
            error:undefined,
            data:undefined
        }
        res.data=  await db.fileCategory.toArray()
            .catch((e)=>{
                res.error=e
                res.code=-1
            })
        if (res.data.length==0){
            await init()
            res.data=  await db.fileCategory.toArray()
                .catch((e)=>{
                    res.error=e
                    res.code=-1
                })
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
    // await db.fastFile.put({file_name: fileName, path: filePath,category_id:categoryId});
     async add(fileName,filePath,categoryId) {
        //增加数据
         db.open();
        await db.fastFile.put({file_name: fileName, path: filePath,category_id:categoryId})
                .catch((e)=>{
                    console.log('添加快速文件项失败，异常信息为：')
                    console.log(e)
                }).then((result)=>{
                    console.log('添加快速文件项结果：')
                    console.log(result)
                });
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
    async update(newTask){
        console.log('修改task数据：')
        console.log(newTask)
        db.open()
        // await db.note.put({id,title,content,updateTime:new Date()});
        await db.task.put({id:newTask.id,title:newTask.title,content:newTask.content,updateTime:new Date(),createTime:newTask.createTime})
        db.close();
    },
    async updateTitle(id,title){
        console.log('修改task标题：')
        console.log(id)
        console.log(title)
        db.open()
        // await db.note.put({id,title,content,updateTime:new Date()});
        await db.task.put({id,title,updateTime:new Date()})
        db.close();
    },
    async updateContent(id,content){
        console.log('修改task内容：')
        console.log(id)
        console.log(content)
        db.open()
        // await db.note.put({id,title,content,updateTime:new Date()});
        await db.task.put({id,content,updateTime:new Date()})
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

let  webCategoryTable={
    async add(title) {
        //增加数据
        db.open();
        let temp =await db.webCategory.toArray()
        let index = temp.length
        console.log('添加网页分类的index：')
        console.log(index)
        await db.webCategory.add({title,index});
        db.close();
    },
    // 修改数据
    async update(webCategory){
        db.open()
        // await db.note.put({id,title,content,updateTime:new Date()});
        await db.webCategory.put({id:webCategory.id,title:webCategory.title,index:webCategory.index})
        db.close();
    },
    //删除数据
    async delete(id){
        db.open();
        await db.webCategory.delete(id);
        db.close();
    },
    async list(){
        db.open();
        let res=  await db.webCategory.toArray()
        console.log("加载的webCategory数据：")
        console.log(res)
        db.close();
        return res
    }
    //排序数据
    // async sort(){
    //     await db.fastFile.orderBy('title');
    // }
}
let  webnavTable={
    async add(webnav) {
        //增加数据
        db.open();
        let index = await db.webnav.toArray().length
        let webnavId;
        await db.webnav.add({title:webnav.title,url:webnav.url,icon:webnav.icon,like:webnav.like,importance:webnav.importance,index})
            .then((id)=>{
                webnavId=id
            })
        db.close();
        return webnavId
    },
    // async getIndex() {
    //     //获取序号
    //     db.open();
    //     let res=  await db.webnav.toArray().length()
    //     db.close();
    //     return res
    // },
    //查询数据
    async queryByTitle(task_title){
        db.open();
        let res=   await db.webnav.filter(task=>task.title === task_title)
        db.close();
        return res
    },
    // 修改数据
    async update(webnav){
        console.log('修改webnav数据：')
        console.log(webnav)
        db.open()
        // await db.note.put({id,title,content,updateTime:new Date()});
        await db.webnav.put({id:webnav.id,title:webnav.title,url:webnav.url,icon:webnav.icon,like:webnav.like,importance:webnav.importance,index:webnav.index})
        db.close();
    },
    //删除数据
    async delete(id){
        db.open();
        await db.webnav .delete(id);
        db.close();
    },
    async list(){
        db.open();
        let res=  await db.webnav.toArray()
        console.log("加载的task数据：")
        console.log(res)
        db.close();
        return res
    },
    //查询数据
    async queryById(id){
        db.open();
        let res=   await db.webnav.filter(webnav=>webnav.id === id).toArray();
        db.close();
        return res
    },
    async listByCategory(categoryId){
        db.open();
        // let itemIdList=  await db.webnav.where('categoryId').equals(categoryId).toArray()
        let webItemAndCategoryList= await db.webItemAndCategory.filter(row=>row.categoryId === categoryId).toArray()
        // let itemList = await db.webnav.where('id').equals()
        console.log('webItemAndCategoryList：')
        console.log(webItemAndCategoryList)
        let itemList=[]
        // let _this=this
        // await  itemIdList.forEach(async row=>{
        //     let item=  await db.webnav.filter(webnav=>webnav.id === row.id).toArray();
        //     console.log('查到了该分类下的一个网站项,id为'+row.itemId)
        //     console.log(item)
        //     itemList.push(item)
        // })
        for (let i=0;i<webItemAndCategoryList.length;i++){
            let item=  await db.webnav.filter(webnav=>webnav.id === webItemAndCategoryList[i].itemId).toArray()
            itemList.push(item)
        }
        db.close();
        console.log('某个分类下的所有网站项数据：')
        console.log(itemList)
        return itemList
    }
    //排序数据
    // async sort(){
    //     await db.fastFile.orderBy('title');
    // }
}

let webItemAndCategoryTable={
    async add(webnavId,categoryId) {
        //增加数据
        db.open();
        await db.webItemAndCategory.add({itemId:webnavId,categoryId:categoryId})
        db.close();
        return webnavId
    },
}


async function init(){
    db.open();
    // let res =await fileCategoryTable.queryById(0)
    // console.log("默认分类：")
    // console.log(res)
    await db.fileCategory.put({name: "默认",id:0})
    console.log("设置了默认分类")
    await  db.note.put({title:'测试',content:"第一篇笔记",createTime:new Date(),updateTime:new Date()})
    await db.task.put({title:'今日任务',content:"- 学习",createTime:new Date(),updateTime:new Date()})
    let webCategoryId
    await db.webCategory.put({title:'默认',index:0}).then((id)=>{
        webCategoryId=id
        console.log('默认分类id：')
        console.log(id)
    })
    let itemId
    await db.webnav.put({title:'Font Awesome',url:'https://fontawesome.dashgame.com',icon:'fa-fonticons',like:0,importance:0,index:0}).then((id)=>{
        itemId=id
        console.log('font awesome 项id为：')
        console.log(id)
    })
    console.log('webCategoryId：'+webCategoryId+',itemId：'+itemId)
    await db.webItemAndCategory.put({itemId:itemId,categoryId:webCategoryId})

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
    webCategoryTable,
    webnavTable,
    webItemAndCategoryTable,
    init
}
