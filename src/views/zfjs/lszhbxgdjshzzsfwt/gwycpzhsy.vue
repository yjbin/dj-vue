<template>
    <div class="gwyc">
        <div v-show="applyXg">
            <el-form :inline="true" class="demo-form-inline">
                <el-form-item label="车牌">
                    <el-input placeholder="车牌" prefix-icon="el-icon-search" v-model.trim="seatch_cp"></el-input>
                </el-form-item>
                <el-form-item label="驾驶人">
                    <el-input placeholder="驾驶人" prefix-icon="el-icon-search" v-model.trim="seatch_jsr"></el-input>
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
                            <span class="capit-content">公务用车配置和使用</span>
                        </div>
                    </el-col>
                </el-row>
            </div>
            <div class="capit-list">
                <el-table :data="gwycList" stripe border style="width: 100%">
                    <!-- <el-table-column type="selection"></el-table-column> -->
                    <el-table-column type="index" :index="indexMethod" label="序号" width="80"></el-table-column>
                    <el-table-column prop="xzqh" :formatter="getXzqh" label="行政区划" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="bm" :formatter="getBmbm" label="部门科室" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="year" label="年度" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="cp" label="车牌" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="cx" label="车型" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="jsr" label="驾驶人" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="bbr" label="报备人" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="bbsj" :formatter="formatterDatebbsj" label="报备时间" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="bbsy" label="报备事由" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="xslx" label="行驶路线" show-overflow-tooltip></el-table-column>
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
                    <el-form :inline="true" :model="gwycForm" ref="gwycForms" class="demo-form-inline" label-width="120px" :rules="zgflrules">
                        <el-row>
                            <el-col :span="11">
                                <el-form-item label="年度" prop="year">
                                    <el-select v-model="gwycForm.year" placeholder="请选择" style="width:100%">
                                        <el-option v-for="(item,index) in ndoptions2" :key="index" :label="item.label" :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="11" :offset="1">
                                <el-form-item label="车牌" prop="cp">
                                    <el-input v-model.trim="gwycForm.cp" placeholder="车牌"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="11">
                                <el-form-item label="车型" prop="cx">
                                    <el-input v-model.trim="gwycForm.cx" placeholder="车型"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="11" :offset="1">
                                <el-form-item label="驾驶人" prop="jsr">
                                    <el-input v-model.trim="gwycForm.jsr" placeholder="驾驶人"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="11">
                                <el-form-item label="报备人" prop="bbr">
                                    <el-input v-model.trim="gwycForm.bbr" placeholder="报备人"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="11" :offset="1">
                                <el-form-item label="报备时间" prop="bbsj">
                                    <el-date-picker v-model="gwycForm.bbsj" type="date" value-format="timestamp" placeholder="报备时间"></el-date-picker>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="11">
                                <el-form-item label="报备事由" prop="bbsy">
                                    <el-input v-model.trim="gwycForm.bbsy" placeholder="报备事由"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="11" :offset="1">
                                <el-form-item label="行驶路线" prop="xslx">
                                    <el-input v-model.trim="gwycForm.xslx" placeholder="行驶路线"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="11">
                                <el-form-item label="行政区划" prop="xzqh">
                                    <el-select v-model="gwycForm.xzqh" placeholder="请选择" style="width:100%" disabled>
                                        <el-option v-for="(item,index) in xzqhoptions" :key="index" :label="item.label" :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="11" :offset="1">
                                <el-form-item label="部门科室" prop="bm">
                                    <el-select v-model="gwycForm.bm" placeholder="请选择" style="width:100%" disabled>
                                        <el-option v-for="(item,index) in bmoptions" :key="index" :label="item.label" :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="11">
                                <el-form-item label="录入人" prop="lrr">
                                    <el-input v-model="gwycForm.lrr" placeholder="录入人" :disabled="true"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="11" :offset="1">
                                <el-form-item label="录入时间" prop="lrsj">
                                    <el-date-picker v-model="gwycForm.lrsj" type="datetime" value-format="timestamp" placeholder="录入时间" :disabled="true"></el-date-picker>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="20" :offset="3">
                                <el-button size="small" type="success" @click="fileClick('xsz')">行驶证附件</el-button>
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
    gwycSearch,
    gwycSave,
    gwycDel
} from "@/api/zfjs/lszhbxgdjshzzsfwt/gwyc";
export default {
    components: {
        accessoryModel,
        applyrModifying
    },
    data() {
        return {
            applyXg: true,
            applyCode: {},
            seatch_cp: "",
            seatch_jsr: "",
            textTit: "",
            newModal: false,
            pageModal: false,
            activeShow: true,
            pageNo: 1,
            pageSize: 10,
            totalCount: 0,
            gwycList: [],
            gwycForm: {},
            ndoptions: [],
            ndoptions2: [],
            month: [],
            editObj: {
                year: "",
                bm: "",
                lrr: "",
                lrsj: "",
                nr: ""
            },
            xzqhoptions: [],
            bmoptions: [],
            xmoptions: [],
            zgflrules: {
                year: [{ required: true, message: "不能为空" }],
                cp: [{ required: true, message: "不能为空" }],
                cx: [{ required: true, message: "不能为空" }],
                jsr: [{ required: true, message: "不能为空" }],
                bbr: [{ required: true, message: "不能为空" }],
                bbsj: [{ required: true, message: "不能为空" }],
                bbsy: [{ required: true, message: "不能为空" }],
                xslx: [{ required: true, message: "不能为空" }]
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
        btn_cancel() {
            this.newModal = false;
        },
        indexMethod(index) {
            let start = (this.pageNo - 1) * this.pageSize;
            return start + index + 1;
        },
        getXzqh(row) {
            return getDicTab("xzqh", row.xzqh);
        },
        getBmbm(row) {
            return getDicTab("bmbm", row.bm);
        },
        formatterDatebbsj(row) {
            return formatDate(row.bbsj, "yyyy-MM-dd");
        },
        formatterDatelrsj(row) {
            return formatDate(row.lrsj, "yyyy-MM-dd");
        },
        formInit() {
            let nowDate = new Date().getTime();
            this.gwycForm.lrsj = nowDate;
            this.gwycForm.bm = this.$store.state.user.user.uUser.bmbm;
            this.gwycForm.xzqh = this.$store.state.user.user.uUser.xzqh;
            this.gwycForm.lrr = this.$store.state.user.user.uUser.nickname;
        },
        CurrentChange(val) {
            this.pageNo = val;
            this.search_query();
        },
        newAdd() {
            this.newModal = true;
            this.activeShow = true;
            this.textTit = "添加记录";
            this.gwycForm = {};
            if (this.$refs.gwycForms) {
                this.$refs.gwycForms.resetFields();
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
            this.seatch_cp ? (obj.cp = this.seatch_cp) : "";
            this.seatch_jsr ? (obj.jsr = this.seatch_jsr) : "";
            gwycSearch(obj).then(res => {
                let data = res.data;
                if (data.success) {
                    this.gwycList = data.data.data;
                    this.totalCount = data.data.totalCount;
                } else {
                    this.gwycList = [];
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
            if (this.$refs.gwycForms) {
                this.$refs.gwycForms.resetFields();
            }
            this.gwycForm = Object.assign({}, row);
        },
        btnBack(val) {
            this.applyXg = val;
            this.search_query();
        },
        applyClick(row) {
            this.applyXg = false;
            this.applyCode = Object.assign({}, row);
        },
        btn_save() {
            let _this = this;
            this.$refs.gwycForms.validate(valid => {
                if (valid) {
                    let obj = Object.assign({}, _this.gwycForm);
                    obj.lrrId = this.$store.state.user.user.uUser.id;
                    let url = "";
                    obj.sqzt = "1";
                    if (!obj.id) {
                        url = "add";
                        gwycSave(url, obj).then(res => {
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
                        gwycSave(url, obj).then(res => {
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
                    gwycDel(obj).then(res => {
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
            this.gwycForm[zd] = val.newSrcstr;
        },
        fileClick(val) {
            this.accessoryModalInt = true;
            this.textTitFile = "附件";
            this.fileSrc = {
                num: Math.random(),
                fileStr: this.gwycForm[val],
                zdName: val
            };
        }
    },
    mounted() {
        this.ndoptions = doCreate("ndTit");
        this.ndoptions2 = doCreate("nd");
        this.bmoptions = doCreate("bmbm");
        this.xzqhoptions = doCreate("xzqh");
        this.month = doCreate("month");
        this.search_query();
    }
};
</script>



