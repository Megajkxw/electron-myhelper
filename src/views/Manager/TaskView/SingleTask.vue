<template>
    <div>
        <easy-win-bar ></easy-win-bar>
        <win-bar v-show="false"></win-bar>
        <task-card :task="task" is-eable-show="false" is-data-from-store="true" ></task-card>
<!--        {{task}}-->
    </div>
</template>

<script>
    import TaskCard from "../../../components/manager/task/TaskCard";
    import EasyWinBar from "../../../components/window/EasyWinBar";
    import WinBar from "../../../components/WinBar";
    let { remote,ipcRenderer } = window.require("electron");
    // import { mapState } from 'vuex'
    export default {
        name: "SingleTask",
        components:{
            WinBar,
            EasyWinBar,
            TaskCard
        },
        beforeCreate() {
            remote.getCurrentWindow().webContents.openDevTools()
            // ipcRenderer.send('openTaskWin',{task:this.task})
            // this.task=ipcRenderer.sendSync('taskWin',{operation:'taskData'})
            // console.log('在独立窗口中取到的task数据为：')
            // console.log(this.task)
        },
        // computed: {
        //     // 经过解构后，自动就添加到了计算属性中，
        //     // 此时就可以直接像访问计算属性一样访问它
        //     ...mapState(['task']),
        // },
        data(){
            return{
                task:undefined
            }
        },
        created() {
            this.task=this.$store.state.task
            console.log('独立窗口task为：')
            console.log(this.task)
            this.task=ipcRenderer.sendSync('taskWin',{operation:'taskData'})
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
