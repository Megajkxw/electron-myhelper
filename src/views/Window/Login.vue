<template>
    <win-bar></win-bar>
    <h1>登录</h1>
    <el-input v-model="username"  placeholder="用户名" />
    <br>
    <br>
    <br>
    <el-input v-model="password"  placeholder="密码" />
    <br>
    <br>
    <br>
    <el-button type="primary" @click="login">登录</el-button>
    <br>
    <br>
    结果集为：
    {{result}}
</template>

<script>
    // import {ref} from 'vue'
    import WinBar from "../../components/WinBar";
    // import {ipcRenderer} from 'electron'
    // import {loginApi} from '../../service/service.js'
    import axios from 'axios'
    export default {
        name: "Login",
        components: {WinBar},
        data(){
            return{
                username:'',
                password: '',
                result:'空'
            }
        },
        methods:{
            login(){
                // ipcRenderer.send('WinSizeChange','toLoginWin')
                // this.$router.push('/manager')
                // console.log(loginApi({username: this.username,password: this.password}))

                axios
                    .post('apis/login', JSON.stringify({username:this.username,password: this.password}))
                    .then(res => {
                        console.log(res)//成功回调函数
                        this.result=res
                    })
                    .catch(err=> {
                        console.log(err)//失败回调函数
                        this.result=err
                    })
                // this.result=axios({
                //     method: 'get',
                //     url: 'apis/user/hello',
                // });

            }
        }
    }
</script>

<style scoped>

</style>