<template>
    <div class="gwjd">
        <div v-show="applyXg">
            <el-form :inline="true" class="demo-form-inline">
                <el-form-item label="年度">
                    <el-select suffix-icon="el-icon-date" v-model="seatch_nd" clearable>
                        <el-option v-for="(item,index) in ndoptions" :key="index" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="月份">
                    <el-select suffix-icon="el-icon-date" v-model="seatch_month" clearable>
                        <el-option v-for="(item,index) in month" :key="index" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="接待对象">
                    <el-input placeholder="接待对象" prefix-icon="el-icon-search" v-model.trim="seatch_jddx"></el-input>
                </el-form-item>
                <el-form-item label="接待事由">
                    <el-input placeholder="接待事由" prefix-icon="el-icon-search" v-model.trim="seatch_jdsy"></el-input>
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
                            <span class="capit-content">公务接待</span>
                        </div>
                    </el-col>
                </el-row>
            </div>
            <div class="capit-list">
                <el-table :data="gwjdlList" stripe border style="width: 100%">
                    <!-- <el-table-column type="selection"></el-table-column> -->
                    <el-table-column type="index" :index="indexMethod" label="序号" width="80"></el-table-column>
                    <el-table-column prop="xzqh" :formatter="getXzqh" label="行政区划" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="bm" :formatter="getBmbm" label="部门科室" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="year" label="年度" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="month" label="月份" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="jdsj" :formatter="formatterDatejdsj" label="接待时间" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="jddd" label="地点" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="jddx" label="接待对象" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="jdsy" label="接待事由" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="ptry" label="陪同人员" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="fymx" label="费用明细" show-overflow-tooltip></el-table-column>
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
                    <el-form :inline="true" :model="gwjdlForm" ref="gwjdlForms" class="demo-form-inline" label-width="120px" :rules="zgflrules">
                        <el-row>
                            <el-col :span="11">
                                <el-form-item label="年度" prop="year">
                                    <el-select v-model="gwjdlForm.year" placeholder="请选择" style="width:100%">
                                        <el-option v-for="(item,index) in ndoptions" :key="index" :label="item.label" :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="11" :offset="1">
                                <el-form-item label="月份" prop="month">
                                    <el-select v-model="gwjdlForm.month" placeholder="请选择" style="width:100%">
                                        <el-option v-for="(item,index) in month" :key="index" :label="item.label" :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="11">
                                <el-form-item label="接待时间" prop="jdsj">
                                    <el-date-picker v-model="gwjdlForm.jdsj" type="date" value-format="timestamp" placeholder="接待时间"></el-date-picker>
                                </el-form-item>
                            </el-col>
                            <el-col :span="11" :offset="1">
                                <el-form-item label="接待地点" prop="jddd">
                                    <el-input v-model.trim="gwjdlForm.jddd" placeholder="地点"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="11">
                                <el-form-item label="接待对象" prop="jddx">
                                    <el-input v-model.trim="gwjdlForm.jddx" placeholder="接待对象"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="11" :offset="1">
                                <el-form-item label="接待事由" prop="jdsy">
                                    <el-input v-model.trim="gwjdlForm.jdsy" placeholder="接待事由"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="11">
                                <el-form-item label="陪同人员" prop="ptry">
                                    <el-input v-model.trim="gwjdlForm.ptry" placeholder="陪同人员"></el-input>
                                </el-form-item>
                            </el-col>

                        </el-row>
                        <el-row>
                            <el-col :span="23">
                                <el-form-item label="费用明细" prop="fymx">
                                    <el-input type="textarea" v-model="gwjdlForm.fymx" placeholder="费用明细"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="11">
                                <el-form-item label="行政区划" prop="xzqh">
                                    <el-select v-model="gwjdlForm.xzqh" placeholder="请选择" style="width:100%" disabled>
                                        <el-option v-for="(item,index) in xzqhoptions" :key="index" :label="item.label" :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="11" :offset="1">
                                <el-form-item label="部门科室" prop="bm">
                                    <el-select v-model="gwjdlForm.bm" placeholder="请选择" style="width:100%" disabled>
                                        <el-option v-for="(item,index) in bmoptions" :key="index" :label="item.label" :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="11">
                                <el-form-item label="录入人" prop="lrr">
                                    <el-input v-model="gwjdlForm.lrr" placeholder="录入人" :disabled="true"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="11" :offset="1">
                                <el-form-item label="录入时间" prop="lrsj">
                                    <el-date-picker v-model="gwjdlForm.lrsj" type="datetime" value-format="timestamp" placeholder="录入时间" :disabled="true"></el-date-picker>
                                </el-form-item>
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
    gwjdSearch,
    gwjdSave,
    gwjdDel
} from "@/api/zfjs/lszhbxgdjshzzsfwt/gwjd";
export default {
    components: {
        accessoryModel,
        applyrModifying
    },
    data() {
        return {
            applyXg: true,
            applyCode: {},
            seatch_jddx: "",
            seatch_jdsy: "",
            seatch_nd: "",
            seatch_month: "",
            textTit: "",
            newModal: false,
            pageModal: false,
            activeShow: true,
            pageNo: 1,
            pageSize: 10,
            totalCount: 0,
            gwjdlList: [],
            gwjdlForm: {},
            ndoptions: [],
            monthoptions: [],
            month: [],
            xzqhoptions: [],
            bmoptions: [],
            xmoptions: [],
            zgflrules: {
                year: [{ required: true, message: "不能为空" }],
                month: [{ required: true, message: "不能为空" }],
                jdsj: [{ required: true, message: "不能为空" }],
                jddd: [{ required: true, message: "不能为空" }],
                jddx: [{ required: true, message: "不能为空" }],
                jdsy: [{ required: true, message: "不能为空" }],
                ptry: [{ required: true, message: "不能为空" }],
                fymx: [{ required: true, message: "不能为空" }]
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
        formatterDatejdsj(row) {
            return formatDate(row.jdsj, "yyyy-MM-dd");
        },
        formatterDatelrsj(row) {
            return formatDate(row.lrsj, "yyyy-MM-dd");
        },
        formInit() {
            let nowDate = new Date().getTime();
            this.gwjdlForm.lrsj = nowDate;
            this.gwjdlForm.bm = this.$store.state.user.user.uUser.bmbm;
            this.gwjdlForm.xzqh = this.$store.state.user.user.uUser.xzqh;
            this.gwjdlForm.lrr = this.$store.state.user.user.uUser.nickname;
        },
        CurrentChange(val) {
            this.pageNo = val;
            this.search_query();
        },
        newAdd() {
            this.newModal = true;
            this.activeShow = true;
            this.textTit = "添加记录";
            this.gwjdlForm = {};
            if (this.$refs.gwjdlForms) {
                this.$refs.gwjdlForms.resetFields();
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
            this.seatch_jddx ? (obj.jddx = this.seatch_jddx) : "";
            this.seatch_jdsy ? (obj.jdsy = this.seatch_jdsy) : "";
            this.seatch_nd ? (obj.year = this.seatch_nd) : "";
            this.seatch_month ? (obj.month = this.seatch_month) : "";
            gwjdSearch(obj).then(res => {
                let data = res.data;
                if (data.success) {
                    this.gwjdlList = data.data.data;
                    this.totalCount = data.data.totalCount;
                } else {
                    this.gwjdlList = [];
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
            if (this.$refs.gwjdlForms) {
                this.$refs.gwjdlForms.resetFields();
            }
            this.gwjdlForm = Object.assign({}, row);
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
            this.$refs.gwjdlForms.validate(valid => {
                if (valid) {
                    let obj = Object.assign({}, _this.gwjdlForm);
                    obj.lrrId = this.$store.state.user.user.uUser.id;
                    let url = "";
                    obj.sqzt = "1";
                    if (!obj.id) {
                        url = "add";
                        gwjdSave(url, obj).then(res => {
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
                        gwjdSave(url, obj).then(res => {
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
                    gwjdDel(obj).then(res => {
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
            this.gwjdlForm[zd] = val.newSrcstr;
        },
        fileClick(val) {
            this.accessoryModalInt = true;
            this.textTitFile = "附件";
            this.fileSrc = {
                num: Math.random(),
                fileStr: this.gwjdlForm[val],
                zdName: val
            };
        }
    },
    mounted() {
        this.ndoptions = doCreate("nd");
        this.bmoptions = doCreate("bmbm");
        this.xzqhoptions = doCreate("xzqh");
        this.month = doCreate("month");
        this.search_query();
    }
};
</script>



