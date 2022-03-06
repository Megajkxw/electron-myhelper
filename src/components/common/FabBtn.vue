<template>
    <el-button :class="getClass" circle :type="getType">
        <i v-show="getIconShow" :class="getIcon"></i>
        {{txt}}
    </el-button>

</template>

<script>
    export default {
        name: "FabBtn",
        props:{
            level:{
                default:1
            },
            txt:{
                default:'创建'
            },
            icon:{
                default:'fa-plus'
            },
            type:{
                default:'success'
            }
        },
        computed:{
            getClass(){
                if (this.level===2||this.level==='2')
                    return 'fab-btn second-btn'
                if (this.level===3||this.level==='3')
                    return 'fab-btn three-btn'
                return 'fab-btn'
            },
            getIcon(){
                return 'fa '+this.icon
            },
            getIconShow(){
                if (this.icon==='')
                    return false
                else
                    return true
            },
            getType(){
                return this.type
            }
        }
    }
</script>

<style scoped>
    .fab-btn{
        position: fixed;
        width: 60px;
        height: 60px;
        bottom: 40px;
        right: 40px;
        z-index: 2000;

    }
    .second-btn{
        bottom: 120px;
    }
    .three-btn{
        bottom:200px;
    }
</style>
