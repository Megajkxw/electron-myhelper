<template>
  <div id="nav">
    <div class="management-layout">
      <header><win-bar></win-bar></header>
      <div class="content">
        <aside>
          <el-menu  default-active="/fastopen"  router>
            <el-sub-menu index="1">
              <template #title> 文件</template>
              <el-menu-item index="/fastopen" >常用应用</el-menu-item>
              <el-menu-item index="/about">打开文件</el-menu-item>
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
    数据展示面板：
    isLoginWin：{{$store.state.isLoginWin}}
    <br>
    当前路由：{{$route.path}}
  </div>
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
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {


  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
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

}
.content article {
  flex: auto;
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
}

</style>
