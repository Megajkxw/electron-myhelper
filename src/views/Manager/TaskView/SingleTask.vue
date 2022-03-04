<template>
    <div>
        <easy-win-bar v-show="false"></easy-win-bar>
        <win-bar></win-bar>
        <task-card></task-card>
    </div>
</template>

<script>
    import TaskCard from "../../../components/manager/task/TaskCard";
    import EasyWinBar from "../../../components/window/EasyWinBar";
    import WinBar from "../../../components/WinBar";
    export default {
        name: "SingleTask",
        components:{
            WinBar,
            EasyWinBar,
            TaskCard
        }
    }
</script>

<style scoped>
    .base{
        /*margin: 20px;*/
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

    }
    .task-content-show{
        overflow: auto;
        text-align: left;
        /*font-size: 18px;*/
        font-size: 18px!important;
        line-height: 35px;
    }
</style>
