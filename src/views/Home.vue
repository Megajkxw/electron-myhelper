<template>
  <div class="home">

  </div>
</template>

<script>
// @ is an alias to /src
// import WinBar from "../components/WinBar";
let { remote } = window.require("electron")
export default {
  name: 'Home',
  // components: {WinBar},
  beforeCreate() {
    if (this.$store.userName===''){
      if (this.$store.loginWin!=null){
        this.$store.loginWin.show()
        this.$store.commit('toLoginWin')
      }else {
        let loginWin = new  remote.BrowserWindow({
          width: 400,
          height: 550,
          frame:false,
          webPreferences: {

            // Use pluginOptions.nodeIntegration, leave this alone
            // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true
            // contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION
          }
        })
        remote.getCurrentWindow().close()
        this.$store.commit('toLoginWin')
        loginWin.show()
      }
    }
  },
  mounted() {
    this.$store.commit('toMainWin')
    remote.getCurrentWindow().setSize(1250,700)
  },
  methods:{
    relogin(){
      this.$router.back()
    }
  }
}
</script>

<style lang="scss" scoped>



</style>