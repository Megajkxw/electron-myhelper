<template>
    <div class="base">
        {{taskList}}
        <task-card  v-for="item in taskList" :task="item" :key="item" ></task-card>
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
            }
        },
        mounted() {
            this.loadData()
        },
        methods:{
           async loadData(){
                this.taskList=await taskTable.list()
            }
        },
    }
</script>

<style scoped>
    .base{
        padding: 10px;
    }
</style>
