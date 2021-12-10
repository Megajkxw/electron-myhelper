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

    <div  class="fastfile-container accept-file"
         @drop.prevent="onDrop"
         @dragover.prevent="dragover = true"
         @dragleave.prevent="dragover = false">
        数据存储路径： {{dataStorePath}}
        <br>
        <br>
        <el-button type="primary" @click="isOpenMode=!isOpenMode">是否打开文件：{{isOpenMode}}</el-button>
        <el-button type="primary" @click="openApp('',dataStorePath)" >打开路径</el-button>
        <el-button type="primary" @click="openApp('',dataStorePath+'/config.json')">打开文件</el-button>
        <div id="drag_test" >
            <button class="file-item" v-for="(value,key) in fastfile" :key="key" type="primary" @click="openApp(key,value)">
                {{key}}
            </button>
        </div>
    </div>
<!--    接收的文件数据：-->
<!--    {{content}}-->
<!--    <br>-->


<!--    <br>-->
<!--&lt;!&ndash;    数据库中保存的信息：&ndash;&gt;-->
<!--&lt;!&ndash;    {{fastfile}}&ndash;&gt;-->
<!--    <br>-->
<!--    <br>-->
<!--    <el-input v-model="fileName" placeholder="Please input" />-->
<!--    <el-input v-model="filePath" placeholder="Please input" />-->
<!--    <el-button type="primary" @click="addItem">添加</el-button>-->
<!--    <br>-->
<!--    <br>-->
<!--    显示的数据：-->
<!--    '{{showData}}'-->
<!--    <br>-->
<!--    <br>-->


</template>

<script>

    // File对象 实例
    // const fs = require('fs');
    // const fs = require('fs')
    let { ipcRenderer } = window.require("electron")
    export default {
        name: "FastOpen",
        data(){
            return{
                content:'空',
                dragover : false,
                // list:
                fastfile:'空',
                fileName:'',
                filePath:'',
                showData:'...',
                dataStorePath:'',
                isOpenMode:true
            }
        },
        mounted() {
            this.fastfile=ipcRenderer.sendSync('FastFile',{operate:'getData'})
            console.log('数据库数据：')
            console.log(this.fastfile)
            this.dataStorePath=ipcRenderer.sendSync('getDataStorePath')
        },
        methods:{
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
            onDrop (e) {
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
                for (let i=0;i<files.length;i++){
                    ipcRenderer.send('FastFile',{operate:'addItem',name:this.splitFileName(files[i].name),path:files[i].path})
                }
                // files.forEach((file)=>{ipcRenderer.send('FastFile',{operate:'addItem',name:this.splitFileName(file.name),path:file.path})})
                console.log(files)

                console.log('文件名为：'+files[0].name)
                this.fastfile=ipcRenderer.sendSync('FastFile',{operate:'getData'})
                console.log('fastfile：---------')
                console.log(this.fastfile)
            },
            addItem(){
                ipcRenderer.send('FastFile',{operate:'addItem',name:this.fileName,path:this.filePath})

                this.fastfile=ipcRenderer.sendSync('FastFile',{operate:'getData'})
                console.log('数据库中的数据：'+ this.fastfile)
            },
            openApp(fileName,path){
                if (this.isOpenMode){
                    console.log('开始打开'+path)
                    let error=ipcRenderer.send('openApp',path)
                    this.showData=error
                    if (error!=null){
                        this.$message.error('打开应用失败：'+error)
                    }
                    console.log('打开完成')
                }
                else {
                    console.log("jjjjjjjjjj")
                    console.log(this.fastfile)
                    let aa=ipcRenderer.send('FastFile',{operate:'deleteItem',name:fileName})

                    console.log("删除错误信息：")
                    console.log(aa)
                    console.log("--------")
                    delete this.fastfile[fileName]
                }
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
    }
    .file-item span{
        width: 80px;
        height: 80px;
    }
    .fastfile-container{
        width: 100%;
        height: 90vh;
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
</style>
