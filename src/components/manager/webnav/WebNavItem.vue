<template>
    <div class="base">
        <i class="fa fa-home fa-lg web-icon"></i>
        <span web-text>test</span>
    </div>
</template>

<script>
    export default {
        name: "WebNavItem"
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
    }
    .web-icon{
        margin-right: 10px;
        margin-left: 10px;
    }
    .web-text{

    }
</style>
