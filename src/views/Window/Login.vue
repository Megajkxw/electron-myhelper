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
    {{result.data}}
    <br>
    token:
    {{localStore}}
</template>

<script>
    // import {ref} from 'vue'
    import WinBar from "../../components/WinBar";
    import localStorageHelper from '../../utils/LocalStorageHelper'
    // import {ipcRenderer} from 'electron'
    let { ipcRenderer } = window.require("electron")
    // import {loginApi} from '../../service/service.js'
    import axios from 'axios'
    export default {
        name: "Login",
        components: {WinBar},
        data(){
            return{
                username:'',
                password: '',
                result:'空',
                localStore:'空',
            }
        },

        beforeCreate() {

        },
        methods:{
            login(){
                // ipcRenderer.send('WinSizeChange','toLoginWin')
                // this.$router.push('/manager')
                // console.log(loginApi({username: this.username,password: this.password}))
                console.log('----------开始-------------------')
                console.log(localStorageHelper.getToken())
                console.log('-----------错误------------------')

                // this.localStore=localStorageHelper.getToken()
                axios
                    .post('apis/login', JSON.stringify({username:this.username,password: this.password}))
                    .then(res => {
                        console.log(res)//成功回调函数
                        this.result=res
                        if (res.data.code==0){  //登录成功
                            localStorageHelper.saveToken(this.result.data.data)
                            this.$router.push('/manager/fastopen')
                            ipcRenderer.send('WinSizeChange','toManagementWin')
                        }
                        else { //登录失败
                            this.$message.error('用户名或密码错误')
                        }

                        console.log(localStorageHelper.getToken())
                    })
                    .catch(err=> {
                        console.log(err)//失败回调函数
                        this.result=err
                    })

                // this.result=axios({
                //     method: 'get',
                //     url: 'apis/user/hello',
                // });
                // this.localStore=localStorageHelper.getToken()
            }
        }
    }
</script>

<style scoped>

</style>