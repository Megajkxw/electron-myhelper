<template>
    <div>
        <fab-btn @click="addCategoryDialog=true" txt="分类"   ></fab-btn>
        <fab-btn @click="addItemDialog=true" level="2"  txt="项"></fab-btn>
        <fab-btn @click="addItemDialog=true" level="3"  :txt="itemList"></fab-btn>
<!--        <fab-btn level="3"></fab-btn>-->

        <el-dialog v-model="addCategoryDialog" title="新建分类">
            <el-form ref="formRef" :model="currentCategory" label-width="120px">
                <el-form-item label="标题：    ">
                    <el-input v-model="currentCategory.title"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary"  @click="addCategory">创建</el-button>
                    <el-button  @click="cancelCreateCategory">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <el-dialog v-model="addItemDialog" title="新建网站项">
            <el-form ref="formRef" :model="currentWebnav" label-width="120px">
                <el-form-item label="标题：    ">
                    <el-input v-model="currentWebnav.title"></el-input>
                </el-form-item>
                <el-form-item label="链接：    ">
                    <el-input v-model="currentWebnav.url"></el-input>
                </el-form-item>
                <el-form-item label="图标：    ">
                    <el-input v-model="currentWebnav.icon"></el-input>
                </el-form-item>
                <el-form-item label="重要性：    ">
                    <el-input v-model="currentWebnav.importance"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary"  @click="addWebnav">创建</el-button>
                    <el-button  @click="cancelCreateWebNav">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
<!--        <i class="fa fa-home fa-lg"></i>-->
        <el-tabs type="border-card" v-model="activeName"  @tab-click="handleClick">
            <el-tab-pane v-for="tab in tabList" :key="tab.id" :name="tab" :label="tab.title">
                <div class="panel">
                    <!--                    <web-nav-item></web-nav-item>-->
                    <!--                    <web-nav-item></web-nav-item>-->
                    <div class="webnav-row">
<!--                        <web-nav-item></web-nav-item>-->
<!--                        <web-nav-item></web-nav-item>-->
                        <br>
<!--                        {{itemList}}-->
                        <web-nav-item v-for="item in itemList" :key="item"></web-nav-item>
                    </div>
                </div>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import WebNavItem from "../../../components/manager/webnav/WebNavItem";
    import FabBtn from "../../../components/common/FabBtn";
    import {webCategoryTable} from "../../../utils/DexieUtils";
    import {webnavTable} from "../../../utils/DexieUtils";
    import {webItemAndCategoryTable} from "../../../utils/DexieUtils";

    export default {
        name: "WebNav",
        components: {FabBtn, WebNavItem},
        data(){
            return{
                tabList:undefined,
                addCategoryDialog:false,
                addItemDialog:false,
                currentCategory:{
                    id:undefined, title:undefined,index:undefined,
                },
                currentWebnav:{
                    id:undefined, title:undefined,url:undefined,icon:undefined,like:undefined,importance:undefined,index:undefined,
                },
                activeName:undefined,
                itemList:'undefined',
            }
        },
        async mounted(){
            this.tabList=await webCategoryTable.list()
            this.activeName=this.tabList[0]
            this.itemList=await webnavTable.listByCategory(this.activeName.id)

            console.log('tabList数据：')
            console.log(this.tabList)
            console.log('itemList数据：')
            console.log(this.itemList)
        },
        methods:{
            async loadCategoryData(){
                this.tabList=await webCategoryTable.list()
                this.itemList=await webnavTable.listByCategory(this.activeName.id)
                console.log('重新加载的tablist数据：')
                console.log(this.tabList)
            },
            async cancelCreateCategory(){
                this.addCategoryDialog=false
            },
            async addCategory(){
                await webCategoryTable.add(this.currentCategory.title)
                this.loadCategoryData()
                this.addCategoryDialog=false
                this.activeName=this.tabList[this.tabList.length-1]
            },
            selectCurrentCategory(tab){
                this.currentCategory=tab
                console.log('选择tab的数据：')
                console.log(tab)
            },
            async handleClick() {
                console.log('选中的tab：')
                console.log(this.activeName)


                this.itemList=await webnavTable.listByCategory(this.activeName.id)

                console.log('加载当前选项卡对应的网站项数据：')
                console.log(this.itemList)
                console.log('itemList数组长度：')
                console.log(this.itemList.length)
                // console.log(this.itemList.toArray())
                console.log([1,2])
            },
            cancelCreateWebNav(){
                this.addItemDialog=false
            },
            async addWebnav(){
                let webnavId= await webnavTable.add(this.currentWebnav)
                await webItemAndCategoryTable.add(webnavId,this.activeName.id)
                this.itemList=await webnavTable.listByCategory(this.activeName.id)
                this.addItemDialog=false
            }
        }

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
