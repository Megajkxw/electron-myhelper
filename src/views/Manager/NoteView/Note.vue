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
<!--        删除笔记对话框-->
        <el-dialog v-model="delNoteDialog" title="删除笔记">
            <span>是否删除这条笔记？</span>
            <template #footer>
                <span  class="dialog-footer">
                    <el-button @click="delNoteDialog = false">取 消</el-button>
                    <el-button type="primary" @click="deleteNote()">确 定</el-button>
                </span>
            </template>
        </el-dialog>
<!--        笔记列表-->
        <div class="note-list" v-show="pageIndex===0" style="height: 100%;width: 100%">
            <el-button class="fab-btn" circle type="success"  @click="addNote" >+</el-button>
            <br>
            <br>
            <el-timeline style="width: 300px">
<!--                <el-timeline-item v-for="item in noteList" :key="item" :timestamp="item.updateTime" placement="top">-->
                <el-timeline-item v-for="item in noteList" :key="item" :timestamp="item.updateTime" placement="top">
                    <el-card @click="toNoteDetail(item)"  >
<!--                    <el-card   @touchstart.prevent="goTouchstart()" @touchend.prevent="goTouchend(item)">-->
                            <h4 >
                                {{item.title}}
<!--                                删除笔记按钮-->
                                <el-button type="success" size="small" @click.stop="toDeleteNoteDialog(item)" style="position: absolute;top: 50px;right: 10px">x</el-button>
                            </h4>
<!--                        <p>{{item.updateTime}}</p>-->
                        <p>{{item.updateTime.getMonth()+1+"月"+item.updateTime.getDate()+"日"+item.updateTime.getHours()+"时"+item.updateTime.getMinutes()+"分"}}</p>
<!--                        <p>{{noteUpdateTime(item.updateTime)}}</p>-->
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

<!--        笔记详细页面-->
        <div v-show="pageIndex===2" style="height: 100%;width: 100%">
            <el-button class="fab-btn" circle type="primary" @click="pageIndex=0" >返回</el-button>
            <el-button class="fab-btn second-btn" circle type="success" @click="updateNote" >保存</el-button>
            <v-md-editor class="editor"  height="100%" v-model="currentNote.content" ></v-md-editor>
        </div>
<!--        笔记编辑器-->
        <div v-show="pageIndex==1" style="height: 100%">
            <el-button class="fab-btn" circle type="success"  @click="saveNote()">-</el-button>
            <v-md-editor class="editor"  height="100%" v-model="newNote.content" ></v-md-editor>
        </div>
    </div>
</template>

<script>
    import {noteTable} from '../../../utils/DexieUtils.js'
    export default {
        name: "Note",
        data() {
            return {

                timeOutEvent:0 ,//记录触摸时长
                text: '',
                pageIndex:0,
                noteList:undefined,
                addNoteDialog:false,
                delNoteDialog:false,
                newNote:{
                    title:undefined,
                    content:undefined
                },
                currentNote:{
                    id:undefined,
                    title:undefined,
                    content:undefined,
                    createTime:undefined,
                    updateTime:undefined
                },
            };
        },
        async created() {
            this.noteList = await noteTable.list()
            this.noteList=this.noteList.reverse()
        },
        computed:{
          noteUpdateTime(datetime){
              console.log('更新日志时间')
              console.log(datetime)
            return datetime.getMonth()+"月"+datetime.getDate()+"日"+datetime.getHours()+"时"
          }
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
            },
            async toNoteDetail(note){
                // console.log('查看笔记的id：')
                // console.log(id)
                // let note=await noteTable.queryById(id)
                // this.currentNote.id=note.id
                // this.currentNote.title=note.title
                // this.currentNote.content=note.content
                // this.currentNote.createTime=note.createTime
                // this.currentNote.updateTime=note.updateTime
                // console.log('查看的笔记的数据：')
                // console.log(note)
                // console.log(this.currentNote)
                this.currentNote=note
                this.pageIndex=2
            },
            async updateNote(){
                console.log('更新笔记开始')
                await noteTable.updateNote(this.currentNote.id,this.currentNote.title,this.currentNote.content)
                console.log('更新笔记结束')
            },
            toDeleteNoteDialog(item){
                this.delNoteDialog=true
                this.currentNote=item
            },
            async deleteNote(){
                this.delNoteDialog=false
                await noteTable.delete(this.currentNote.id)
                this.loadNoteList()
            },
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
    .second-btn{
        bottom: 120px;
    }
    .note-list{
        overflow:scroll
    }

</style>
