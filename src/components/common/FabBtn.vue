<template>
    <el-button class="fab-btn" circle type="success">+</el-button>
</template>

<script>
    export default {
        name: "FabBtn"
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
</style>
