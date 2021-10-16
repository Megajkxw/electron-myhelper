<template>
  <div id="nav" v-if="$route.path.startsWith('/manager')||$route.path=='/'">
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
  import WinBar from "./components/WinBar";
  // let { remote } = window.require("electron")
  export default {
    components: {WinBar},
    methods:{

    },
    computed:{
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
