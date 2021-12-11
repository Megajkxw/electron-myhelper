<template>
  <div id="nav" @contextmenu.prevent="onContextmenu" v-if="$route.path.startsWith('/manager')||$route.path=='/'">
    <div class="management-layout">
      <header><win-bar></win-bar></header>
      <div class="content">
        <aside>
          <el-menu  default-active="/manager/fastopen"  router>
            <el-sub-menu index="1">
              <template #title> 文件</template>
              <el-menu-item index="/manager/fastopen" >常用应用</el-menu-item>
              <el-menu-item index="/manager/about">打开文件</el-menu-item>
            </el-sub-menu>
            <el-sub-menu index="2">

            </el-sub-menu>
            <el-sub-menu index="3">

            </el-sub-menu>
          </el-menu>
        </aside>
        <article>
          <router-view>
          </router-view>
          <!--      <router-view></router-view>-->
        </article>
      </div>
    </div>
  </div>
  <div>
<!--    数据展示面板：-->
<!--    isLoginWin：{{$store.state.isLoginWin}}-->
<!--    <br>-->
<!--    当前路由：{{$route.path}}-->
<!--    结果：{{!($route.path.startsWith('/manager') )}}-->
  </div>

  <router-view v-if="!($route.path.startsWith('/manager') )">
  </router-view>

</template>

<script>
  // import Contextmenu from "vue-contextmenujs"
  import WinBar from "./components/WinBar";
  // import localStorageHelper from "./utils/LocalStorageHelper";
  // import router from "./router";
  // let { ipcRenderer } = window.require("electron")
  // import {onMounted} from 'vue'
  export default {
    components: {WinBar},
    beforeCreate() {
      // TODO
      // if (!localStorageHelper.isTokenExist()){
      //
      //   // if (localStorageHelper.isRemember_me()){
      //   //
      //   // }
      //   // this.$router.push('/login')
      //   // ipcRenderer.send('WinSizeChange','toLoginWin')
      // }

      // else {
      //   this.$router.push('Login')
      //   ipcRenderer.send('WinSizeChange','toManagementWin')
      // }
    },
    mounted() {
      // console.log(this.router)


    },
    methods:{
      // onContextmenu(event) {
      //   this.$contextmenu({
      //     items: [
      //       {
      //         label: "返回(B)",
      //         onClick: () => {
      //           this.message = "返回(B)";
      //           console.log("返回(B)");
      //         }
      //       },
      //       {label: "前进(F)", disabled: true},
      //       {label: "重新加载(R)", divided: true, icon: "el-icon-refresh"},
      //       {label: "另存为(A)..."},
      //       {label: "打印(P)...", icon: "el-icon-printer"},
      //       {label: "投射(C)...", divided: true},
      //       {
      //         label: "使用网页翻译(T)",
      //         divided: true,
      //         minWidth: 0,
      //         children: [{label: "翻译成简体中文"}, {label: "翻译成繁体中文"}]
      //       },
      //       {
      //         label: "截取网页(R)",
      //         minWidth: 0,
      //         children: [
      //           {
      //             label: "截取可视化区域",
      //             onClick: () => {
      //               this.message = "截取可视化区域";
      //               console.log("截取可视化区域");
      //             }
      //           },
      //           {label: "截取全屏"}
      //         ]
      //       },
      //       {label: "查看网页源代码(V)", icon: "el-icon-view"},
      //       {label: "检查(N)"}
      //     ],
      //     event, // 鼠标事件信息
      //     customClass: "custom-class", // 自定义菜单 class
      //     zIndex: 3, // 菜单样式 z-index
      //     minWidth: 230 // 主菜单最小宽度
      //   })
      // }
    }
  }
</script>


<style lang="scss">
  html,#nav,.content,.management-layout{
    width: 100%;
    height: 100%;
  }

  #nav {
  }

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}



  .management-layout{
    width: 100%;
    height: 100%;
  }

.home {
  min-height: 97.7vh;
  display: flex;
  flex-direction: column;
  overflow: hidden
}


.content {
  flex: auto;
  display: flex;
  width: 100%;
  height: 88.9vh;
}
.content article {
  /*flex: auto;*/
  width: 100%;
  height: 100%;
}

header{
  background: #FFFFFF;
}

aside{
  background: #FEFEFF;
  width: 200px;
  min-width: 200px;
  overflow-y: hidden;
  overflow: hidden;
}

article{
  background: #F3F2FF;
  overflow: hidden;
  height: 100%;
  margin: 10px;
}
  .management-layout{
    width: 100%;
    height: 100%;
  }

</style>
