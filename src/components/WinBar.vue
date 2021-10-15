<template>
    <div class="win-bar">
        <el-button type="primary" @click="minimize" icon="el-icon-minus" size="small">
        </el-button>
        <el-button type="success" @click="close" icon="el-icon-close" size="small">
        </el-button>
        <el-button type="success" @click="onTop" icon="el-icon-caret-top" size="small">
        </el-button>
        <el-button type="success" @click="maximize" icon="el-icon-full-screen" size="small">
        </el-button>
        <el-button type="success" @click="this.$router.back()" icon="el-icon-full-screen" size="small">
            back
        </el-button>
        <el-button type="success" @click="this.$router.push('/fastopen')" icon="el-icon-full-screen" size="small">
            home
        </el-button>
        <el-button type="success" @click="openDevtool" icon="el-icon-full-screen" size="small">
            dev
        </el-button>
    </div>
</template>

<script>
    // const { ipcRenderer } = require('electron')
    // const { ipcRenderer } = require('electron')
    let { remote } = window.require("electron");
    export default {
        name: "WinBar",
        // methods:{
        //     test(){
        //
        //     }
        // }
        methods:{
            // 点击最小化按钮调用的方法
            minimize() {
                remote.getCurrentWindow().minimize(); // 窗口最小化
            },

            // 点击关闭按钮调用的方法
            close () {
                // this.$electron.ipcRenderer.send('close')
                remote.getCurrentWindow().hide(); // 窗口最小化
            },
            onTop(){
                remote.getCurrentWindow().setAlwaysOnTop(true)
            },
            maximize(){
                remote.getCurrentWindow().maximize()
            },
            openDevtool(){
                remote.getCurrentWindow().webContents.openDevTools()
            }
        }
    }

</script>

<style scoped>
    .win-bar{
        display: flex;
        justify-content: flex-end;
        align-items:center;
        width: 100%;
        height: 55px;
        -webkit-app-region: drag;
        background: #F5F8FB;

    }
    button{
        -webkit-app-region: no-drag ;
        height: 45px;
    }
</style>