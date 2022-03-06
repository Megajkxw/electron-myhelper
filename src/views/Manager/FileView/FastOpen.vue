<template>
<!--    <div id="drag_test" class="accept-file"-->
<!--         @drop.prevent="onDrop"-->
<!--         @dragover.prevent="dragover = true"-->
<!--         @dragleave.prevent="dragover = false">-->

<!--    </div>-->

<!--    <el-button type="primary" @click="openWin">打开新窗口</el-button>-->
<!--    <br>-->
<!--    <br>-->
<!--    <br>-->
<div>
    <el-dialog v-model="dialogTableVisible"  @close="clearDialogContent"  title="新建分类">
        <div>
            <el-input v-model="categoryName_new" placeholder="分类名" />
        </div>
        <template #footer>
          <span class="dialog-footer">
              <el-button type="primary" @click="createCategory">创建</el-button>
            <el-button @click="()=>{dialogTableVisible = false;clearDialogContent}">取消</el-button>
          </span>
        </template>
    </el-dialog>


    <div  class="fastfile-container accept-file"
          @drop.prevent="onDrop"
          @dragover.prevent="dragover = true"
          @dragleave.prevent="dragover = false">
        <!--        数据存储路径： {{dataStorePath}}-->
        是否删除文件： <el-switch v-model="isDeleted"></el-switch>
        <br>
        <br>
        <!--        <div v-for="(value,key) in fileCategory" :key="key" >-->
        <!--            文字：   {{value}}-->
        <!--            &lt;!&ndash;            分类id：{{value.id}}&ndash;&gt;-->
        <!--            &lt;!&ndash;            分类名：{{value.name}}&ndash;&gt;-->
        <!--        </div>-->
        <div>
            <el-radio-group v-model="selectedFileCategory.name">
                <div class="category-btn-container">
                    <el-radio-button  v-for="(value,key) in fileCategory" :key="key"  :label="value.name" @click="switchBlock(value.id)"></el-radio-button>
                    <!--                <el-radio-button label="默认" @click="switchBlock(value.id)"></el-radio-button>-->
                    <el-button type="success"  @click="dialogTableVisible = true">+</el-button>
                </div>
            </el-radio-group>
        </div>
        <br>
        <!--        <el-button type="primary" @click="isOpenMode=!isOpenMode">是否打开文件：{{isOpenMode}}</el-button>-->
        <!--        <el-button type="primary" @click="openApp('',dataStorePath)" >打开路径</el-button>-->
        <!--        <el-button type="primary" @click="openApp('',dataStorePath+'/config.json')">打开文件</el-button>-->
        <div id="drag_test" >
            <button class="file-item" v-for="(value,key) in fastfile" :key="key" type="primary" @click="openApp(value.file_name,value.path,value.id)">
                {{value.file_name}}
            </button>
        </div>

        <div v-if="test">
            fastfile对象： {{fastfile}}
            <br>
            分类：{{fileCategory}}
        </div>

    </div>
</div>

</template>

<script>

    // File对象 实例
    // const fs = require('fs');
    // const fs = require('fs')`
    let { ipcRenderer } = window.require("electron")
    // import {fastFileTable} from '@/utils/DexieUtils.js'
    import {fastFileTable,fileCategoryTable} from '../../../utils/DexieUtils.js'
    export default {
        name: "FastOpen",
        data(){
            return{
                test:false,
                content:'空',
                dragover : false,
                // list:
                fastfile:undefined,
                fileName:'',
                filePath:'',
                showData:'...',
                dataStorePath:'',
                isOpenMode:true,
                isDeleted:false,
                fileCategory:undefined,
                selectedFileCategory:{
                    name:'',
                    id:''
                },
                dialogTableVisible: false,
                categoryName_new:'',
            }
        },
        mounted() {
            // console.log('数据库数据：')
            this.loadFastFile()
            // this.fastfile=ipcRenderer.sendSync('FastFile',{operate:'getData'})
            console.log('数据库数据：')
            console.log(this.fastfile)
            // this.dataStorePath=ipcRenderer.sendSync('getDataStorePath')
        },
        methods:{
            async loadFastFile(){
                console.log('FastOpen.vue  loadFastFile() 开始')
                // await fileCategoryTable.add("java")
                // await fileCategoryTable.add("java")
                this.fileCategory = await fileCategoryTable.list()
                console.log('FastOpen.vue  loadFastFile()  加载分类完成')
                // if (this.fileCategory[0]!=null){
                //     this.selectedFileCategory.name=this.fileCategory[0].name
                //     this.selectedFileCategory.id=this.fileCategory[0].id
                // }
                // else {
                //     this.selectedFileCategory.name='默认'
                //     this.selectedFileCategory.id=0
                // }
                this.selectedFileCategory.name=this.fileCategory[0].name
                this.selectedFileCategory.id=this.fileCategory[0].id

                // if (this.fileCategory!=null){
                //     this.fastfile= await fastFileTable.queryByCategory(this.fileCategory[0].id)
                // }
                this.fastfile= await fastFileTable.queryByCategory(this.fileCategory[0].id)
                console.log('FastOpen.vue  loadFastFile()  加载默认分类下的 快速文件 完成')
                console.log('FastOpen.vue  loadFastFile() 结束')
            },
            async switchBlock(categoryId){
                console.log('FastOpen.vue  switchBlock() 开始')
                console.log('categoryId',categoryId)
                this.selectedFileCategory.id=categoryId
                this.fastfile= await fastFileTable.queryByCategory(this.selectedFileCategory.id)
                // this.fastfile= await fastFileTable.queryByCategory(JSON.parse(JSON.stringify(categoryId)))
                console.log('FastOpen.vue  switchBlock() 结束')
            },
            openWin(){
                ipcRenderer.send('openSuspensionBar')
            },
            splitFileName(text) {
                var pattern = /\.{1}[a-z]{1,}$/;
                if (pattern.exec(text) !== null) {
                    return (text.slice(0, pattern.exec(text).index));
                } else {
                    return text;
                }
            },
            clearDialogContent(){
                this.categoryName_new=''
            },
            async createCategory(){
                fileCategoryTable.add(this.categoryName_new)
                this.clearDialogContent()
                this.dialogTableVisible=false
                this.fileCategory = await fileCategoryTable.list()
            },
            async onDrop (e) {
                console.log('FastOpen.vue  onDrop() 开始')
                // this.content=e
                //  let files=e.dataTransfer.files
                // console.log(files)
                // ipcRenderer.send('FastFile',{operate:'addItem',name:this.splitFileName(files[0].name),path:files[0].path})
                // console.log('文件名为：'+files[0].name)
                // this.fastfile=ipcRenderer.sendSync('FastFile',{operate:'getData'})

                this.content=e
                let files=e.dataTransfer.files
                // for (let file in files){
                //
                // }
                //保存数据
                for (let i=0;i<files.length;i++){
                    // ipcRenderer.send('FastFile',{operate:'addItem',name:this.splitFileName(files[i].name),path:files[i].path})
                    fastFileTable.add(this.splitFileName(files[i].name),files[i].path,this.selectedFileCategory.id)
                }
                //保存数据
                // files.forEach((file)=>{ipcRenderer.send('FastFile',{operate:'addItem',name:this.splitFileName(file.name),path:file.path})})
                //保存数据
                // files.forEach((file)=>{ fastFileTable.add(this.splitFileName(file.name),file.path)})
                console.log(files)

                console.log('文件名为：'+files[0].name)
                //从新加载数据
                // this.fastfile=ipcRenderer.sendSync('FastFile',{operate:'getData'})
                // this.loadFastFile()
                this.fastfile= await fastFileTable.queryByCategory(this.selectedFileCategory.id)
                console.log('fastfile：---------')
                console.log(this.fastfile)

                console.log('FastOpen.vue  onDrop() 结束')
            },
            addItem(){
                ipcRenderer.send('FastFile',{operate:'addItem',name:this.fileName,path:this.filePath})

                this.fastfile=ipcRenderer.sendSync('FastFile',{operate:'getData'})
                console.log('数据库中的数据：'+ this.fastfile)
            },
            async openApp(fileName,path,id){
                if (this.isDeleted){
                    fastFileTable.delete(id)
                    this.fastfile= await fastFileTable.queryByCategory(this.selectedFileCategory.id)
                    return;
                }
                let error=ipcRenderer.send('openApp',path)
                this.showData=error
                if (error!=null){
                    this.$message.error('打开应用失败：'+error)
                }
                // if (this.isOpenMode){
                //     console.log('开始打开'+path)
                //     let error=ipcRenderer.send('openApp',path)
                //     this.showData=error
                //     if (error!=null){
                //         this.$message.error('打开应用失败：'+error)
                //     }
                //     console.log('打开完成')
                // }
                // else {
                //     console.log("jjjjjjjjjj")
                //     console.log(this.fastfile)
                //     let aa=ipcRenderer.send('FastFile',{operate:'deleteItem',name:fileName})
                //
                //     console.log("删除错误信息：")
                //     console.log(aa)
                //     console.log("--------")
                //     delete this.fastfile[fileName]
                // }
            },


        }
    }



</script>

<style scoped>
    .accept-file{
        /*width: 100px;*/
        /*height: 100px;*/
        /*background: #42b983;*/
    }
    .file-item{
        width: 80px;
        height: 80px;
        overflow: hidden;
        background: #42b983;
        border-radius: 10px;
        border-color: transparent;
        margin: 5px;
        color: #FFFFFF;
        font-weight: 500;
    }
    .file-item span{
        width: 80px;
        height: 80px;
    }
    .fastfile-container{
        /*width: 100%;*/
        /*height: 100%;*/
        height: 86vh;
        /*display: flex;*/
        margin: 10px;
        /*flex-wrap: wrap;*/
        /*align-items: flex-start;*/
        /*background: red;*/
        /*background: rosybrown;*/
    }
    #drag_test{
        display: flex;
        flex-wrap: wrap;
    }
    .category-btn-container{
        display: flex;
    }
</style>
