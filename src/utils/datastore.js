const Store = require('electron-store');

const store = new Store();

if (!store.has('FastFile'))
    store.set("FastFile",'{}')



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
            store.delete(store.get('FastFile')[name])
            //  for (let item in store.get('FastFile')){
            //      if (item.name===name){
            //          store.delete(item)
            //      }
            //  }
            // store.delete('FastFile')
            // store.set('FastFile','{}')
            // for (let i=0;i<fastFile.length;i++){
            //     this.addItem(fastFile[i].name,fastFile[i].path())
            // }
        },

    }
}


