<template>
    <div class="base">
<!--        {{taskList}}-->
        <task-card style="display: inline-block" @reloadData="loadData" v-for="item in taskList" :task="item" :key="item" ></task-card>

        <el-button class="fab-btn" circle type="success"  @click="addTask" >+</el-button>
        <el-dialog v-model="addTaskDialog" title="创建任务">
            <el-form ref="formRef" :model="currentTask" label-width="120px">
                <el-form-item label="标题：    ">
                    <el-input v-model="currentTask.title"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary"  @click="toAddNoteContent">创建</el-button>
                    <el-button  @click="cancelCreateNote">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
    import TaskCard from "../../../components/manager/task/TaskCard";
    import {taskTable} from "../../../utils/DexieUtils";

    export default {
        name: "Task",
        components:{
            TaskCard
        },
        data(){
            return{
                isEditing:false,
                txt:'',
                taskList:undefined,
                addTaskDialog:false,
                currentTask:{
                    id:undefined,
                    title:undefined,
                    content:undefined,
                    createTime:undefined,
                    updateTime:undefined
                },
            }
        },
        mounted() {
            this.loadData()
        },
        methods:{
           async loadData(){
                this.taskList=await taskTable.list()
            },
            addTask(){
                // this.addTaskDialog=true
                let datetime = new Date()
                datetime=datetime.getMonth()+"月"+datetime.getDate()+"日"+datetime.getHours()+"时"+datetime.getMinutes()+"分"
                taskTable.add(datetime,'')
                this.loadData()
            },
        },
    }
</script>

<style scoped>
    .base{
        padding: 10px;
        overflow: auto;
    }
    .fab-btn{
        position: fixed;
        width: 60px;
        height: 60px;
        bottom: 40px;
        right: 40px;
        z-index: 2000;

    }
</style>
