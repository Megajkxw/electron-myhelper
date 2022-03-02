<template>
    <div class="base">
        <el-card class="box-card">
            <template #header>
                <div class="card-header">
                    <span class="title">卡片名</span>
                    <div>
                        <el-button v-show="isEditing!=true" class="button" type="text" @click="isEditing=true">编辑</el-button>
                        <el-button v-show="isEditing" class="button" type="text" @click="isEditing=false">保存</el-button>
                        <el-button class="button" type="text">显示</el-button>
                    </div>
                </div>
            </template>
            <div class="task-content">
                <div class="task-content-show" v-show="!isEditing">
<!--                    <div v-for="o in 4" :key="o" class="text item">{{'列表内容 ' + o }}</div>-->
<!--                    {{txt}}-->
                    <v-md-preview :text="txt" ></v-md-preview>
                </div>
                <div v-show="isEditing" class="text">
                    <el-input
                            v-model="txt"
                            rows="13"
                            type="textarea"
                            placeholder="Please input"
                    />
                </div>
            </div>
        </el-card>
    </div>
</template>

<script>
    export default {
        name: "Task",
        data(){
            return{
                isEditing:false,
                txt:''
            }
        }
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
        font-size: 20px!important;
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
    .task-content-show{
        overflow: auto;
        text-align: left;
        /*font-size: 18px;*/
        font-size: 18px!important;
        line-height: 35px;
    }
</style>
