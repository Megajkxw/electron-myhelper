<template>
    <div class="header">
<!--        <img class="logo" src="~@/assets/imgs/icon.png" alt="">-->
        <div class="right">
            <span class="icon iconfont icon-zuixiaohua3" title="最小化" @click="minimizeWin"></span>
            <span class="icon iconfont icon-zuidahua1" title="最大化"  @click="maximizeWin"></span>
            <span class="icon iconfont icon-guanbi" title="关闭" @click="closeWin"></span>
        </div>

    </div>
</template>

<script>
    import { remote } from 'electron';
    export default {
        name: "Header",
        methods: {
            minimizeWin(){
                remote.getCurrentWindow().minimize(); // 窗口最小化
            },
            maximizeWin(){
                const win=remote.getCurrentWindow();
                if(win.isMaximized()){ // 判断 窗口是否已最大化
                    win.restore();// 恢复原窗口大小
                }else{
                    win.maximize();  //最大化窗口
                }
            },
            closeWin(){
                // ipcRenderer.send('close');
                remote.getCurrentWindow().close(); // 关闭窗口，也结束了所有进程
            }
        }
    }
</script>

<style scoped>
    .right{
        float: right;
        /*自定义元素上添加此样式否自无法操作*/
        -webkit-app-region: no-drag;

    }
    .right .icon{
        display: inline-block;
        line-height: 30px;
        height: 30px;
        width: 30px;
        text-align: center;
        cursor: pointer;
        color: #d3dae3;
    }
    .right .icon:hover{
        color: #ffffff;
        background-color: #b4b6ba;
    }
    .right .icon-guanbi:hover{
        background-color: #b10202;
    }
    .header{
        height:30px;
        background-color: #6c6b6b;
        /*添加此样式*/
        -webkit-app-region: drag;
    }
    .logo{
        width: 30px;
    }
</style>
