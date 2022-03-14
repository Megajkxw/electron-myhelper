<template>
    <div class="base">
        <el-dialog v-model="updateTitleDialog" title="修改任务标题">
            <el-form ref="formRef" :model="taskData" label-width="120px">
                <el-form-item label="标题：    ">
                    <el-input v-model="taskData.title"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary"  @click="updateTitle">创建</el-button>
                    <el-button  @click="this.updateTitleDialog=false">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>

        <el-card class="box-card">
            <template #header>
                <div class="card-header">
                    <span class="title">{{task.title}}</span>
                    <div >
                        <el-button v-show="isEditing!=true" class="button" type="text" @click="isEditing=true">编辑</el-button>
                        <el-button v-show="isEditing" class="button" type="text"  @click="saveTask">保存</el-button>
                        <el-button v-show="isEableShow" class="button" type="text" @click="openWin()">显示</el-button>
                        <el-button class="button" type="text"  @click="remove">删除</el-button>
                        <el-button class="button" type="text"  @click="toUpdateTitle">修改标题</el-button>
                    </div>
                </div>
            </template>
            <div class="task-content">
                <div class="task-content-show" v-show="!isEditing">
                    <!--                    <div v-for="o in 4" :key="o" class="text item">{{'列表内容 ' + o }}</div>-->
                    <!--                    {{txt}}-->
                    <v-md-preview :text="task.content" ></v-md-preview>
                </div>
                <div v-show="isEditing" class="text">
                    <el-input
                            v-model="taskData.content"
                            rows="13"
                            type="textarea"
                            placeholder="Please input"
                    />
                </div>
            </div>
        </el-card>
    </div>
</template>

<script>
    import {taskTable} from "../../../utils/DexieUtils";

    let { ipcRenderer } = window.require("electron");
    export default {
        name: "TaskCard",
        data(){
            return{
                isEditing:false,
                txt:'',
                taskData:{
                    title:'',
                    content:''
                },
                updateTitleDialog:false,
            }
        },
        props:{
            isEableShow:{
                default:true,
            },
            task:{
                title:'',
                content:''
            },
            isDataFromStore:{
                default: false
            }
        },
        created() {
            this.taskData=this.task
        },
        mounted() {

        },
        methods:{
            openWin(){
                // ipcRenderer.send('openLoginWin')
                console.log('open')
                // ipcRenderer.send('openTaskWin',null)
                this.$store.commit('setCurrentTask',this.task)
                console.log('vuex中保存的task：')
                console.log(this.$store.state.task)
                let temp=JSON.stringify(this.task)
                ipcRenderer.send('openTaskWin',{task:temp})
                console.log('finish')
            },
            updateTitle(){
                taskTable.update(this.taskData)
                // taskTable.updateTitle(this.taskData.id,this.taskData.title)
                this.$emit('reloadData')
                this.updateTitleDialog=false
            },
            toUpdateTitle(){
                this.updateTitleDialog=true
            },
            remove(){
                taskTable.delete(this.taskData.id)
                this.$emit('reloadData')
            },
            saveTask(){
                taskTable.update(this.taskData)
                // taskTable.updateContent(this.taskData.id,this.taskData.content)
                this.isEditing=false
            }
        }
    }
</script>

<style scoped>
    .base{
        /*margin: 20px;*/
        overflow: auto;
        /*height: 600px;*/
        /*background: red;*/
        /*display: flex;*/
        /*align-items: flex-start;*/
    }
    .card-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .title{
        font-size: 20px;
    }
    .text {
        font-size: 20px!important;

    }

    .item {
        margin-bottom: 18px;
        /*width: 150px;*/
    }

    .box-card {
        width: 480px;
        width: 350px;
        height: 400px;
    }

    .task-content{
        overflow: auto;
        height: 300px;
    }
    .task-content-show{
        overflow: auto;
        text-align: left;
        /*font-size: 18px;*/
        font-size: 18px!important;
        line-height: 35px;
        /*background: red;*/

    }
</style>
