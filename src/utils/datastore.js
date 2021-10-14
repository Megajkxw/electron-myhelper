const Store = require('electron-store');

const store = new Store();

if (!store.has('FastFile'))
    store.set("FastFile",'[]')

export default {
    store,
    fastfile:{
        getData(){
          return  store.get('FastFile')
        },
         addItem (name,path) {
            store.get('FastFile').set(name,path)
        },
        deleteItem(name){
             for (let item in store.get('FastFile')){
                 if (item.name===name){
                     store.delete(item)
                 }
             }
        }
    }
}


