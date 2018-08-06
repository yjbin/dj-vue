<template>
    <div class="zdxmModal">
        <el-dialog :title="text_Text" :visible.sync="zdxmToggle" :before-close="userClose" width="68%" top="10vh" :close-on-click-modal="false">
            <div class="dict-content">
                <el-form :inline="true" :model="editObj" class="demo-form-inline" label-width="160px">
                    <el-row>
                        <el-col :span="11">
                            <el-form-item label="项目名称">
                                <el-input v-model.trim="editObj.xmmc" placeholder="项目名称"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="11" :offset="1">
                            <el-form-item label="项目负责人">
                                <el-input v-model.trim="editObj.fzr" placeholder="项目负责人"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="11">
                            <el-form-item label="联系方式">
                                <el-input v-model.trim="editObj.lxfs" placeholder="联系方式"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="11" :offset="1">
                            <el-form-item label="建设单位">
                                <el-input v-model.trim="editObj.jsdw" placeholder="建设单位"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="11">
                            <el-form-item label="责任分工及主要责任">
                                <el-input v-model.trim="editObj.zrfgZyzz" placeholder="责任分工及主要责任"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="11" :offset="1">
                            <el-form-item label="整体推进计划及时限">
                                <el-input v-model.trim="editObj.jhSx" placeholder="整体推进计划及时限"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="11">
                            <el-form-item label="项目总额">
                                <el-input v-model.trim="editObj.xmze" placeholder="项目总额"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="11" :offset="1">
                            <el-form-item label="年度">
                                <el-select v-model="editObj.year" placeholder="请选择" style="width:100%">
                                    <el-option v-for="(item,index) in ndoptions" :key="index" :label="item.label" :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="11">
                            <el-form-item label="行政区划">
                                <el-select v-model="editObj.xzqh" placeholder="请选择" style="width:100%" :disabled="true">
                                    <el-option v-for="(item,index) in xzqhoptions" :key="index" :label="item.label" :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="11" :offset="1">
                            <el-form-item label="部门科室">
                                <el-select v-model="editObj.bm" placeholder="请选择" style="width:100%" :disabled="true">
                                    <el-option v-for="(item,index) in bmbmoptions" :key="index" :label="item.label" :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="11">
                            <el-form-item label="录入人">
                                <el-input v-model="editObj.lrr" placeholder="录入人" :disabled="true"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="11" :offset="1">
                            <el-form-item label="录入时间">
                                <el-date-picker v-model="editObj.lrsj" type="datetime" value-format="timestamp" placeholder="录入时间" :disabled="true"></el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
            <div class="footerBox">
                <span slot="footer" class="dialog-footer">
                    <!-- <button @click="userClose" size="small" class="cancel">取 消</button> -->
                    <el-button size="mini" type="primary" @click="userClose">取 消</el-button>
                </span>
            </div>
        </el-dialog>

    </div>
</template>
<script>
import { doCreate, getDicTab, moreMenu } from "@/utils/config";
export default {
    data() {
        return {
            zdxmToggle: false,
            text_Text: "查看",
            dialogVisible: false,
            editObj: {},
            bmbmoptions:[],
            xzqhoptions:[],
            ndoptions:[],

        };
    },
    props: {
        editObj: Object,
        newModal: Boolean
    },
    watch: {
        newModal(val) {
            this.zdxmToggle = val;
        }
    },
    methods: {
        userClose() {
            this.zdxmToggle = false;
            this.$emit("colseTog", this.zdxmToggle);
        }
    },
    mounted() {
        this.xzqhoptions = doCreate("xzqh");
        this.bmbmoptions = doCreate("bmbm");
        this.ndoptions = doCreate("nd");
    }
};
</script>
<style lang="scss">
.zdxmModal {
    .el-dialog__header {
        // height: 60px;
        border-bottom: 1px solid #ccc;
        background-color: #FFC740;
    }
    .footerBox{
        text-align: center;
    }
    .el-form-item__label{
        color:#606266;
    }
    
}
</style>

