<template>
    <div class="base">
        <task-card></task-card>
    </div>
</template>

<script>
    import TaskCard from "../../../components/manager/task/TaskCard";
    export default {
        name: "Task",
        components:{
            TaskCard
        },
        data(){
            return{
                isEditing:false,
                txt:''
            }
        }
    }
</script>

<style scoped>
    .base{
        padding: 10px;
    }
</style>
