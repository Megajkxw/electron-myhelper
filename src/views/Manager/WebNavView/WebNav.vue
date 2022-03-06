<template>
    <div>
<!--        <i class="fa fa-home fa-lg"></i>-->
        <el-tabs type="border-card">
            <el-tab-pane label="用户管理">
                <div class="panel">
<!--                    <web-nav-item></web-nav-item>-->
<!--                    <web-nav-item></web-nav-item>-->
                    <div class="webnav-row">
                        <web-nav-item></web-nav-item>
                        <web-nav-item></web-nav-item>
                        <web-nav-item></web-nav-item>
                        <web-nav-item></web-nav-item>
                        <web-nav-item></web-nav-item>
                        <web-nav-item></web-nav-item>
                        <web-nav-item></web-nav-item>
                        <web-nav-item></web-nav-item>
                        <web-nav-item></web-nav-item>
                        <web-nav-item></web-nav-item>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="配置管理">
                <div class="panel">

                </div>
            </el-tab-pane>
            <el-tab-pane label="角色管理">
                <div class="panel">

                </div>
            </el-tab-pane>
            <el-tab-pane label="定时任务补偿">
                <div class="panel">

                </div>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import WebNavItem from "../../../components/manager/webnav/WebNavItem";
    export default {
        name: "WebNav",
        components: {WebNavItem}
    }
</script>

<style scoped>
    .panel{
        height: 78.6vh;
        display: flex;
        flex-wrap: wrap;
    }
    .webnav-row{
        height: 50px;
        /*background: red;*/
        display: flex;
        flex-wrap: wrap;
    }
</style>
