<template>
    <div class="base">
        {{error }}
        <el-button type="primary" @click="minimize" icon="el-icon-minus" size="small">
        </el-button>
        <el-button type="success" @click="close" icon="el-icon-close" size="small">
        </el-button>
        <el-button type="success" @click="openDevtool" icon="el-icon-full-screen" size="small">
            dev
        </el-button>
    </div>
</template>

<script>
    let { remote } = window.require("electron");
    export default {
        name: "EasyWinBar",
        data(){
            return{
                error:'undefined'
            }
        },
        methods:{
            close () {
                // this.$electron.ipcRenderer.send('close')
                try {
                    remote.getCurrentWindow().hide(); // 窗口最小化
                }
                catch (e) {
                    console.log('出现错误：')
                    console.log(e)
                    this.error=e
                }
            },
            minimize() {
                remote.getCurrentWindow().minimize(); // 窗口最小化
            },
            openDevtool(){
                remote.getCurrentWindow().webContents.openDevTools()
            },
        }
    }
</script>

<style scoped>
    .base{
        height: 40px;
        background: red;
        -webkit-app-region: drag;

        display: flex;
        justify-content: flex-end;
        align-items:center;
        width: 100%;
        -webkit-app-region: drag;
        background: #F5F8FB;
    }
    button{
        -webkit-app-region: no-drag ;
    }
</style>
