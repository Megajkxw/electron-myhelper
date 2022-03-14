<template>
<!--    <div  @mouseover="mouseOver" @mouseleave="mouseLeave">-->
    <div class="base" >
<!--        <easy-win-bar  @mouseover="mouseOver" @mouseleave="mouseLeave"></easy-win-bar>-->
        <easy-win-bar @isOpenHoverHide="dodge" :isOpenHoverHide="isOpenHoverHide" @dodge="dodge"></easy-win-bar>
        <win-bar  v-show="false"></win-bar>
<!--        {{isOpenHoverHide}}-->
        <task-card  @mouseover="mouseOver" @mouseleave="mouseLeave" :task="task" is-eable-show="false" is-data-from-store="true" ></task-card>
<!--        {{task}}-->
    </div>
</template>

<script>
    import TaskCard from "../../../components/manager/task/TaskCard";
    import EasyWinBar from "../../../components/window/EasyWinBar";
    import WinBar from "../../../components/WinBar";
    // let { remote,ipcRenderer } = window.require("electron");
    let { ipcRenderer } = window.require("electron");
    let { remote  } = window.require("electron");
    // import { mapState } from 'vuex'
    export default {
        name: "SingleTask",
        components:{
            WinBar,
            EasyWinBar,
            TaskCard
        },
        beforeCreate() {
            // remote.getCurrentWindow().webContents.openDevTools()


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
                task:undefined,
                isHoverHide:false,
                isAllowAgainHover:true,
                isOpenHoverHide:true,
            }
        },
        created() {
            this.task=this.$store.state.task
            console.log('独立窗口task为：')
            console.log(this.task)
            this.task=ipcRenderer.sendSync('taskWin',{operation:'taskData'})
        },
        methods:{
            mouseOver(){
                console.log('经过mouseOver')
                if (!this.isAllowAgainHover){
                    console.log('经过mouseOver---阻断--isAllowAgainHover')
                    return
                }
                if (!this.isOpenHoverHide){
                    console.log('经过mouseOver---阻断--isOpenHoverHide')
                    return
                }
                // this.isHoverHide=true
                let win=remote.getCurrentWindow()

                let x=remote.screen.getPrimaryDisplay().workAreaSize.width
                let pos=win.getPosition()
                let pos_right_x=x-win.getSize()[0]
                if (pos[0]==0 ){
                    win.setPosition(pos_right_x,pos[1])
                    this.isAllowAgainHover=false
                }
                if (pos[0]==pos_right_x){
                    win.setPosition(0,pos[1])
                    this.isAllowAgainHover=false
                }
                // console.log('x:'+win.getPosition().x,'  y:'+win.getPosition()[1])
                // win.setPosition(1000,100)
            },
            mouseLeave(){
                // let win=remote.getCurrentWindow()
                // this.isHoverHide=false
                // win.setPosition(0,0)
                setTimeout(()=>{
                    this.isAllowAgainHover=true
                },500)
            },
            dodge(){
                this.isOpenHoverHide=!this.isOpenHoverHide
                console.log('经历过 dodge')
            }
        }
    }
</script>

<style scoped>
    .base{
        /*margin: 20px;*/
        /*-webkit-app-region: drag;*/
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
    .hide{
        background: transparent;
    }
</style>
