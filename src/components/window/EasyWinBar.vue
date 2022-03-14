<template>
    <div :class="isHoverHide?'base':'base base-hide'" >
<!--        值：{{isOpenHoverHide}}-->
        <el-button  type="primary" @click="opsHoverHide"  :icon="isOpenHoverHide?'fa fa-check':'fa fa-close'" size="small">
        </el-button>
        <el-button  type="primary" @click="toLeft"  icon=" fa fa-angle-double-left" size="small">
        </el-button>
        <el-button type="primary" @click="minimize" icon="el-icon-minus" size="small">
        </el-button>
        <el-button type="success" @click="close" icon="el-icon-close" size="small">
        </el-button>
        <el-button type="success" @click="onTop" :icon="isTop?'fa fa-angle-up':'fa fa-angle-down'" size="small">
        </el-button>
        <el-button type="success" @click="openDevtool" icon="el-icon-full-screen" size="small">
            dev
        </el-button>
    </div>
</template>

<script>
    // let { remote,ipcRenderer } = window.require("electron");
    let { remote } = window.require("electron");
    export default {
        name: "EasyWinBar",
        data(){
            return{
                error:'undefined',
                isTop:false,
                isHoverHide:false,
            }
        },
        props:{
            isOpenHoverHide:undefined,
        },
        mounted() {
            remote.getCurrentWindow().setAlwaysOnTop(true)
            this.isTop=remote.getCurrentWindow().isAlwaysOnTop()
        },
        // computed:{
        //     isTop(){
        //         return remote.getCurrentWindow()
        //     }
        // },
        methods:{
            opsHoverHide(){
                console.log('-----hhhhh')
                this.$emit('isOpenHoverHide',!this.isHoverHide)
                console.log('-----hhhhh2')
            },
            toLeft(){
                let win=remote.getCurrentWindow()
                win.setPosition(0,0)
            },
            close () {
                    remote.getCurrentWindow().hide(); // 窗口最小化
            },
            minimize() {
                remote.getCurrentWindow().minimize(); // 窗口最小化
            },
            openDevtool(){
                remote.getCurrentWindow().webContents.openDevTools()
            },
            onTop(){
                let win= remote.getCurrentWindow()
                remote.getCurrentWindow().setAlwaysOnTop(!win.isAlwaysOnTop())
                this.isTop=win.isAlwaysOnTop()
            },
            mouseOver(){
                this.isHoverHide=true
            },
            mouseLeave(){
                this.isHoverHide=false
            }
        }
    }
</script>

<style scoped>
    .base{
        height: 40px;
        /*height: 340px;*/
        /*background: red;*/
        -webkit-app-region: drag;

        display: flex;
        justify-content: flex-end;
        align-items:center;
        width: 100%;
        -webkit-app-region: drag;
        background: #F5F8FB;
    }
    .base-hide{
        background: transparent;
    }

    button{
        -webkit-app-region: no-drag ;
    }

</style>
