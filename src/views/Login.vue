<template>
    <div class="main">
<!--        <WinBar></WinBar>-->
<!--        <Header/>-->
        <win-bar></win-bar>
        <el-button type="primary" @click="test" >通信</el-button>
        <div class="avatar">
            <el-avatar :size="60" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
        </div>
        <div class="item">
            <el-input placeholder="请输入账号" v-model="account" clearable prefix-icon="el-icon-user"></el-input>
        </div>
        <div class="item">
            <el-input placeholder="请输入密码" v-model="password" show-password prefix-icon="el-icon-lock"></el-input>
        </div>
        <div class="item">
            <el-button type="primary" round @click="login">登录</el-button>
        </div>


        <el-button type="primary" @click="$store.commit('toLoginWin')">toLoginWin</el-button>
        <br>
        <el-button type="primary" @click="createWin">toLoginWin</el-button>
    </div>
</template>
<script>
    // import WinBar from "../components/WinBar";
    // import Header from "../components/Header";
    import WinBar from "../components/WinBar";
    let { remote,ipcRenderer } = window.require("electron")


    export default {
        name: 'Login',
        components: {WinBar},
        // components: {WinBar},
        mounted() {
            this.$store.loginWin=remote.getCurrentWindow();
            this.$store.commit('toLoginWin')
            remote.getCurrentWindow().setSize(400,600)
        },
        data () {
            return {
                account: '',
                password: ''
            }
        },
        methods: {
            login () {
                this.$router.push('/fastopen')
                // if (this.account === 'admin' && this.password === '123456') {
                //
                //     this.$router.push('Home')
                // } else {
                //     this.$message.error('用户名或密码错误')
                // }
            },
            test(){
                ipcRenderer.send('maintest', 'ping')
            },
            createWin(){
                ipcRenderer.send('createWin')
            }
        }
    }
</script>
<style lang="scss" scoped>
    .main{
        width: 100%;
    }
    .avatar{
        margin-top: 40px;
        margin-bottom: 40px
    }
    button{
        width:100%
    }
    .item{
        margin-top:20px
    }
</style>
