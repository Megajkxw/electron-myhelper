<template>
    <div style="height: 100%">
<!--        新建笔记对话框-->
        <el-dialog v-model="addNoteDialog" title="更新笔记">
            <el-form ref="formRef" :model="newNote" label-width="120px">
                <el-form-item label="标题：    ">
                    <el-input v-model="newNote.title"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary"  @click="toAddNoteContent">创建</el-button>
                    <el-button  @click="cancelCreateNote">取消</el-button>
                </el-form-item>
            </el-form>

        </el-dialog>
<!--        笔记列表-->
        <div class="note-list" v-show="pageIndex===0" style="height: 100%;width: 100%">
            <el-button class="fab-btn" circle type="success"  @click="addNote" >+</el-button>
            <br>
            <br>
            <el-timeline style="width: 300px">
                <el-timeline-item v-for="item in noteList" :key="item" :timestamp="item.updateTime" placement="top">
                    <el-card>
                        <h4>{{item.title}}</h4>
                        <p>{{item.updateTime}}</p>
                    </el-card>
                </el-timeline-item>
<!--                <el-timeline-item timestamp="2018/4/3" placement="top">-->
<!--                    <el-card>-->
<!--                        <h4>Update Github template</h4>-->
<!--                        <p>Tom committed 2018/4/3 20:46</p>-->
<!--                    </el-card>-->
<!--                </el-timeline-item>-->
<!--                <el-timeline-item timestamp="2018/4/2" placement="top">-->
<!--                    <el-card>-->
<!--                        <h4>Update Github template</h4>-->
<!--                        <p>Tom committed 2018/4/2 20:46</p>-->
<!--                    </el-card>-->
<!--                </el-timeline-item>-->
            </el-timeline>
        </div>
<!--        笔记编辑器-->
        <div v-show="pageIndex==1" style="height: 100%">
            <el-button class="fab-btn" circle type="success"  @click="saveNote()">-</el-button>
            <v-md-editor class="editor"  height="100%" v-model="text" ></v-md-editor>
        </div>
    </div>
</template>

<script>
    import {noteTable} from '../../../utils/DexieUtils.js'
    export default {
        name: "Note",
        data() {
            return {
                text: '',
                pageIndex:0,
                noteList:undefined,
                addNoteDialog:false,
                newNote:{
                    title:undefined,
                    content:undefined
                },
            };
        },
        async created() {
            this.noteList = await noteTable.list()
            this.noteList=this.noteList.reverse()
        },
        methods:{
            async loadNoteList(){
                this.noteList = await noteTable.list()
                this.noteList=this.noteList.reverse()
            },
            async saveNote(){
                this.pageIndex=0
                await noteTable.add(this.newNote.title,this.newNote.content)
                this.loadNoteList()
            },
            addNote(){
                this.addNoteDialog=true
                this.newNote.content=""
                this.newNote.title=""
            },
            cancelCreateNote(){
                this.addNoteDialog=false
            },
            toAddNoteContent(){
                this.addNoteDialog=false
                this.pageIndex=1
            }
        }
    }
</script>

<style scoped>
.editor{
    margin: 10px;
}
    .fab-btn{
        position: fixed;
        width: 60px;
        height: 60px;
        bottom: 40px;
        right: 40px;
        z-index: 2000;
    }
    .note-list{
        overflow:scroll
    }
</style>
