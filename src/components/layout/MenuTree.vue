
<template>
    <div class="menutree">
        <label v-for="menu in data" :key="menu.path">
            <el-sub-menu :index="menu.path" v-if="menu.children&&menu.children.length!=0">
                <template #title>
                    <i class="fa fa-address-book"></i>
                    <span>{{menu.name}}</span>
                </template>
                <label>
                    <menutree :data="menu.children"></menutree>
                </label>
            </el-sub-menu>
            <el-menu-item v-else :index="menu.path">
                <template  #title>
                    <i class="fa fa-address-book"></i>
                    <span>{{menu.name}}</span>
                </template>
            </el-menu-item>
        </label>
    </div>

</template>
<script>
    import menutree from "./MenuTree";
    export default {
        name: "MenuTree",
        data() {
            return {
            };
        },
        components: {
            menutree: menutree
        },
        props: ["data"]
    };
</script>
<style scoped>
    .icon-user{
        font-size: 16px;
        color: #e4e4e4;
    }
    span{
        font-size: 16px;
    }
    i{
        margin-right: 10px;
    }
</style>

