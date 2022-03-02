<template>
    <div class="base">
        <el-card class="box-card">
            <template #header>
                <div class="card-header">
                    <span class="title">卡片名</span>
                    <el-button class="button" type="text">操作按钮</el-button>
                </div>
            </template>
            <div class="task-content">
                <div v-for="o in 4" :key="o" class="text item">{{'列表内容 ' + o }}</div>
            </div>
        </el-card>
    </div>
</template>

<script>
    export default {
        name: "TaskCard"
    }
</script>

<style scoped>
    .base{
        margin: 20px;
    }
    .card-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .title{
        font-size: 20px;
    }
    .text {
        font-size: 18px;
    }

    .item {
        margin-bottom: 18px;
        /*width: 150px;*/
    }

    .box-card {
        width: 480px;
        width: 350px;
        height: 400px;
    }

    .task-content{

    }
</style>
