<template>
    <div class="zlmedia">
        <div v-show="applyXg">
            <el-form :inline="true" class="demo-form-inline">
                <el-form-item label="年度">
                    <el-select suffix-icon="el-icon-date" v-model="seatch_nd" clearable>
                        <el-option v-for="(item,index) in ndoptions" :key="index" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="媒体级别">
                    <el-select suffix-icon="el-icon-date" v-model="seatch_mtjb" clearable>
                        <el-option v-for="(item,index) in mtjb" :key="index" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="媒体名称">
                    <el-input placeholder="请输入..." prefix-icon="el-icon-search" v-model.trim="seatch_name"></el-input>
                </el-form-item>
                <el-form-item>
                    <button class="topQuery" @click="search_query">搜索</button>
                    <button v-show="remarkHq()=='czy'" class="topQuery" @click="newAdd">添加记录</button>
                </el-form-item>
            </el-form>
            <div class="capit-tit">
                <el-row>
                    <el-col :span="12">
                        <div class="user-left">
                            <span class="capit-content">中央省市级主流媒体</span>
                        </div>
                    </el-col>
                </el-row>
            </div>
            <div class="capit-list">
                <el-table :data="zlmedialList" stripe border style="width: 100%">
                    <!-- <el-table-column type="selection"></el-table-column> -->
                    <el-table-column type="index" :index="indexMethod" label="序号" width="80"></el-table-column>
                    <el-table-column prop="year" label="年度" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="mtjb" label="媒体级别" :formatter="getDicTabmtjb" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="mtlx" label="媒体类型" :formatter="getDicTabmtlx" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="mtmc" label="媒体名称" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="fgsj" :formatter="formatterDatefgsj" label="发稿时间" show-overflow-tooltip></el-table-column>
                    <el-table-column label="操作" width="250">
                        <template slot-scope="scope">
                            <el-button size="mini" type="primary" @click="Edit(scope.row)">{{((scope.row.sqzt=='3' && sfdqyh(scope.row))?'编辑':'查看')}}</el-button>
                            <el-button v-if="scope.row.sqzt=='1'" size="mini" type="primary" @click="applyClick(scope.row)">申请</el-button>
                            <el-button v-if="scope.row.sqzt=='2'" size="mini" type="primary" @click="applyClick(scope.row)">申请中</el-button>
                            <el-button v-if="scope.row.sqzt=='3'" size="mini" type="primary" @click="applyClick(scope.row)">通过</el-button>
                            <el-button v-if="scope.row.sqzt=='-1'" size="mini" type="primary" @click="applyClick(scope.row)">驳回</el-button>
                            <el-button size="mini" v-show="remarkHq()=='admin'" type="danger" @click="Del(scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="fr">
                    <el-pagination @current-change="CurrentChange" :current-page.sync="pageNo" :page-size="pageSize" layout="total, prev, pager, next" :total="totalCount">
                    </el-pagination>
                </div>
                <!-- 新建，编辑弹框 -->
                <el-dialog :title="textTit" :visible.sync="newModal" :before-close="btn_cancel">
                    <el-form :inline="true" :model="zlmedialForm" ref="zlmedialForms" class="demo-form-inline" label-width="120px" :rules="zlmediarules">
                        <el-row>
                            <el-col :span="11">
                                <el-form-item label="年度" prop="year">
                                    <el-select v-model="zlmedialForm.year" placeholder="请选择" style="width:100%">
                                        <el-option v-for="(item,index) in ndoptions" :key="index" :label="item.label" :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="11">
                                <el-form-item label="媒体级别" prop="mtjb">
                                    <el-select v-model="zlmedialForm.mtjb" placeholder="请选择" style="width:100%">
                                        <el-option v-for="(item,index) in mtjb" :key="index" :label="item.label" :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="11" :offset="1">
                                <el-form-item label="媒体类型" prop="mtlx">
                                    <el-select v-model="zlmedialForm.mtlx" placeholder="请选择" style="width:100%">
                                        <el-option v-for="(item,index) in mtlx" :key="index" :label="item.label" :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="11">
                                <el-form-item label="媒体名称" prop="mtmc">
                                    <el-input v-model.trim="zlmedialForm.mtmc" placeholder="媒体名称"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="11" :offset="1">
                                <el-form-item label="发稿时间" prop="fgsj">
                                    <el-date-picker v-model="zlmedialForm.fgsj" type="date" value-format="timestamp" placeholder="发稿时间"></el-date-picker>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="23">
                                <el-form-item label="发稿内容" prop="fgnr">
                                    <el-input type="textarea" v-model.trim="zlmedialForm.fgnr" :autosize="{ minRows: 5}" placeholder="发稿内容"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="11">
                                <el-form-item label="行政区划" prop="xzqh">
                                    <el-select v-model="zlmedialForm.xzqh" placeholder="请选择" style="width:100%" disabled>
                                        <el-option v-for="(item,index) in xzqhoptions" :key="index" :label="item.label" :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="11" :offset="1">
                                <el-form-item label="部门科室" prop="bm">
                                    <el-select v-model="zlmedialForm.bm" placeholder="请选择" style="width:100%" disabled>
                                        <el-option v-for="(item,index) in bmoptions" :key="index" :label="item.label" :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="11">
                                <el-form-item label="录入人" prop="lrr">
                                    <el-input v-model="zlmedialForm.lrr" placeholder="录入人" :disabled="true"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="11" :offset="1">
                                <el-form-item label="录入时间" prop="lrsj">
                                    <el-date-picker v-model="zlmedialForm.lrsj" type="datetime" value-format="timestamp" placeholder="录入时间" :disabled="true"></el-date-picker>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="20" :offset="3">
                                <el-button size="small" type="success" @click="fileClick('fgtp')">上传图片</el-button>
                            </el-col>
                        </el-row>
                    </el-form>
                    <div class="footerBox">
                        <span slot="footer" class="dialog-footer">
                            <button v-show="activeShow" class="save" @click="btn_save">保存</button>
                            <button @click="btn_cancel" class="cancel">取消</button>
                        </span>
                    </div>

                </el-dialog>
            </div>
            <accessory-Model :newModal="accessoryModalInt" @colseTog="colseTog" @chileFile="chileFile" :textTitFile="textTitFile" :fileSrc="fileSrc" :upShowhide="activeShow"></accessory-Model>
        </div>
        <transition enter-active-class="animated zoomIn">
            <div v-show="!applyXg">
                <applyr-Modifying :applyCode="applyCode" @btnBack="btnBack"></applyr-Modifying>
            </div>
        </transition>
    </div>
</template>
<script>
import applyrModifying from "@/components/applyrModifying";
import accessoryModel from "@/components/accessoryModel";
import { doCreate, getDicTab, remark } from "@/utils/config";
import { formatDate } from "@/utils/data";
import {
    zlmediaSearch,
    zlmediaSave,
    zlmediaDel
} from "@/api/sxjs/mtxc/zlmedia";
export default {
    components: {
        accessoryModel,
        applyrModifying
    },
    data() {
        return {
            applyXg: true,
            applyCode: {},
            seatch_mtjb: "",
            seatch_name: "",
            seatch_nd: "",
            textTit: "",
            newModal: false,
            pageModal: false,
            activeShow: true,
            pageNo: 1,
            pageSize: 10,
            totalCount: 0,
            zlmedialList: [],
            zlmedialForm: {},
            mtjb: [],
            mtlx: [],
            ndoptions: [],
            xzqhoptions: [],
            bmoptions: [],
            zlmediarules: {
                mtjb: [{ required: true, message: "不能为空" }],
                mtlx: [{ required: true, message: "不能为空" }],
                mtmc: [{ required: true, message: "不能为空" }],
                fgsj: [{ required: true, message: "不能为空" }],
                fgnr: [{ required: true, message: "不能为空" }],
                year: [{ required: true, message: "不能为空" }],
            },
            accessoryModalInt: false,
            upShowhide: true,
            textTitFile: "",
            fileSrc: "",
            userXzqh: this.$store.state.user.user.uUser.xzqh,
            userBmbm: this.$store.state.user.user.uUser.bmbm
        };
    },
    methods: {
        remarkHq() {
            return remark(this);
        },
        sfdqyh(row) {
            if (this.userXzqh == row.xzqh && this.userBmbm == row.bm) {
                return true;
            } else {
                return false;
            }
        },
        btnBack(val) {
            this.applyXg = val;
            this.search_query();
        },
        applyClick(row) {
            this.applyXg = false;
            this.applyCode = Object.assign({}, row);
        },
        btn_cancel() {
            this.newModal = false;
        },
        formInit() {
            let nowDate = new Date().getTime();
            this.zlmedialForm.lrsj = nowDate;
            this.zlmedialForm.bm = this.$store.state.user.user.uUser.bmbm;
            this.zlmedialForm.xzqh = this.$store.state.user.user.uUser.xzqh;
            this.zlmedialForm.lrr = this.$store.state.user.user.uUser.nickname;
        },
        indexMethod(index) {
            let start = (this.pageNo - 1) * this.pageSize;
            return start + index + 1;
        },
        getDicTabmtjb(row) {
            return getDicTab("mtjb", row.mtjb);
        },
        getDicTabmtlx(row) {
            return getDicTab("mtlx", row.mtlx);
        },
        formatterDatefgsj(row) {
            return formatDate(row.fgsj, "yyyy-MM-dd");
        },
        CurrentChange(val) {
            this.pageNo = val;
            this.search_query();
        },
        newAdd() {
            this.newModal = true;
            this.textTit = "添加记录";
            this.activeShow = true;
            this.zlmedialForm = {};
            if (this.$refs.zlmedialForms) {
                this.$refs.zlmedialForms.resetFields();
            }
            this.formInit();
        },
        search_query() {
            let obj = {
                pageNo: this.pageNo,
                pageSize: this.pageSize,
                bm: this.$store.state.user.user.uUser.bmbm,
                xzqh: this.$store.state.user.user.uUser.xzqh,
                remark: this.$store.state.user.user.uRole.remark
            };
            this.seatch_mtjb ? (obj.mtjb = this.seatch_mtjb) : "";
            this.seatch_name ? (obj.mtmc = this.seatch_name) : "";
            this.seatch_nd ? (obj.year = this.seatch_nd) : "";
            zlmediaSearch(obj).then(res => {
                let data = res.data;
                if (data.success) {
                    this.zlmedialList = data.data.data;
                    this.totalCount = data.data.totalCount;
                } else {
                    this.zlmedialList = [];
                    this.totalCount = 0;
                    this.$message({
                        type: "warning",
                        message: data.msg
                    });
                }
            });
        },
        Edit(row) {
            this.newModal = true;
            if (row.sqzt == "3" && this.sfdqyh(row)) {
                this.textTit = "编辑";
                this.activeShow = true;
            } else {
                this.textTit = "查看";
                this.activeShow = false;
            }
            if (this.$refs.zlmedialForms) {
                this.$refs.zlmedialForms.resetFields();
            }
            this.zlmedialForm = Object.assign({}, row);
        },
        btn_save() {
            let _this = this;
            this.$refs.zlmedialForms.validate(valid => {
                if (valid) {
                    let obj = Object.assign({}, _this.zlmedialForm);
                    obj.lrrId = _this.$store.state.user.user.uUser.id;
                    obj.sqzt = "1";
                    let url = "";
                    if (!obj.id) {
                        url = "add";
                        zlmediaSave(url, obj).then(res => {
                            let data = res.data;
                            if (data.success) {
                                _this.$message({
                                    type: "success",
                                    message: data.msg
                                });
                                _this.search_query();
                            } else {
                                _this.$message({
                                    type: "danger",
                                    message: data.msg
                                });
                            }
                        });
                    } else {
                        url = "update";
                        zlmediaSave(url, obj).then(res => {
                            let data = res.data;
                            if (data.success) {
                                _this.$message({
                                    type: "success",
                                    message: data.msg
                                });
                                _this.search_query();
                            } else {
                                _this.$message({
                                    type: "danger",
                                    message: data.msg
                                });
                            }
                        });
                    }
                    _this.btn_cancel();
                }
            });
        },
        Del(row) {
            this.$confirm("此操作将删除此条信息, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(() => {
                    let obj = {
                        id: row.id
                    };
                    zlmediaDel(obj).then(res => {
                        let data = res.data;
                        if (data.success) {
                            this.$message({
                                message: data.msg,
                                type: "success"
                            });
                            this.search_query();
                        } else {
                            this.$message({
                                message: data.msg,
                                type: "warning"
                            });
                        }
                    });
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消删除"
                    });
                });
        },
        //上传
        colseTog(val) {
            this.accessoryModalInt = val;
        },
        chileFile(val) {
            let zd = val.zdName;
            this.zlmedialForm[zd] = val.newSrcstr;
        },
        fileClick(val) {
            this.accessoryModalInt = true;
            this.textTitFile = "附件";
            this.fileSrc = {
                num: Math.random(),
                fileStr: this.zlmedialForm[val],
                zdName: val
            };
        }
    },
    mounted() {
        this.mtjb = doCreate("mtjb");
        this.mtlx = doCreate("mtlx");
        this.ndoptions = doCreate("nd");
        this.bmoptions = doCreate("bmbm");
        this.xzqhoptions = doCreate("xzqh");
        this.search_query();
    }
};
</script>



