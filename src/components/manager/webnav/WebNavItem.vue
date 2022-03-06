<template>
    <div class="base" @click="openUrl">
        <i :class="getIconClass"></i>
        <span class="web-text">{{webnav.title}}</span>
<!--        <slot></slot>-->
        {{}}
    </div>
</template>

<script>
    let { shell } = window.require("electron")
    export default {
        name: "WebNavItem",
        props:{
            webnav:{
                id:undefined,
                title:undefined,
                url:undefined,
                icon:undefined,
                like:undefined,
                importance:undefined,
                index:undefined,
            }
        },
        computed:{
            getIconClass(){
                if (this.webnav.icon===undefined||this.webnav.icon==='')
                    return  'fa fa-home fa-lg web-icon'
                return 'fa fa-lg web-icon '+this.webnav.icon
            }
        },
        mounted() {
            console.log('传递到组件里的webnav：')
            console.log(this.webnav)
        },
        methods:{
            openUrl(){
                shell.openExternal(this.webnav.url)
            }
        }
    }
</script>

<style scoped>
    .base{
        background: #42b983;
        width: 200px;
        height: 40px;
        display:flex;
        /*justify-content:center;*/
        align-items:center;
        border-radius: 6px;
        cursor:pointer;
        margin:10px;
        color: white;
    }
    .web-icon{
        margin-right: 10px;
        margin-left: 10px;

    }
    .web-text{

    }
</style>
