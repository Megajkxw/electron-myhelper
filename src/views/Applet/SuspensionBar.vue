<template>
    <el-button type="primary" @click="move">移动</el-button>
    <win-bar></win-bar>
    aaaaaaaaaaaaaa
    {{timer1}}
    <br>
    {{timer2}}
    <br>
    {{win}}
</template>

<script>
    import WinBar from "../../components/WinBar";
    // let { ipcRenderer } = window.require("electron")
    let { remote } = window.require("electron")
    export default {
        name: "SuspensionBar",
        components: {WinBar},
        data(){
            return{
                timer1:'timer1',
                timer2:'timer2',
                win:{name:"空"}
            }
        },
        mounted(){
            // let OnlyID
            // this.timer1="----kkk"
            // ipcRenderer.sendSync("hideSuspensionBar")
            // this.win=remote.getCurrentWindow()
            //
            // console.log(OnlyID)
            // this.timer2="----jjj"
        },
        methods:{
            move(){
                remote.getCurrentWindow().setBounds({ x: 440, y: 225, width: 800, height: 600 })
            }
        }
    }
</script>

<style scoped>

</style>