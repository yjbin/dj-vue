<template>
    <div class="dfsj">
        <div v-show="applyXg">
            <el-form :inline="true" class="demo-form-inline">
                <el-form-item label="年度">
                    <el-select suffix-icon="el-icon-date" v-model="seatch_year" clearable>
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
                <el-form-item label="参会人员">
                    <el-input placeholder="请输入..." prefix-icon="el-icon-search" v-model.trim="seatch_chry"></el-input>
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
                            <span class="capit-content">支部委员会</span>
                        </div>
                    </el-col>
                </el-row>
            </div>
            <div class="capit-list">
                <el-table :data="shykList" stripe border style="width: 100%">
                    <!-- <el-table-column type="selection"></el-table-column> -->
                    <el-table-column type="index" :index="indexMethod" label="序号" width="80"></el-table-column>
                    <el-table-column prop="year" label="年度" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="month" label="月份" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="hysj" :formatter="formatterDatehysj" label="会议时间" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="zjr" label="主讲人" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="xzqh" :formatter="getXzqh" label="行政区划" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="bm" :formatter="getBmbm" label="部门科室" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="lrr" label="录入人" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="lrsj" :formatter="formatterDatelrsj" label="录入时间" show-overflow-tooltip></el-table-column>
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
                <el-dialog :title="textTit" :visible.sync="newModal" :before-close="btn_cancel" width="60%" top="12vh">
                    <el-form :inline="true" :model="shykForm" ref="shykForms" class="demo-form-inline" label-width="120px" :rules="dfsjrules">
                        <el-row>
                            <el-col :span="17">
                                <el-row>
                                    <el-col :span="11">
                                        <el-form-item label="年度" prop="year">
                                            <el-select v-model="shykForm.year" placeholder="请选择" style="width:100%">
                                                <el-option v-for="(item,index) in ndoptions2" :key="index" :label="item.label" :value="item.value">
                                                </el-option>
                                            </el-select>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="11" :offset="1">
                                        <el-form-item label="月份" prop="month">
                                            <el-select v-model="shykForm.month" placeholder="请选择" style="width:100%">
                                                <el-option v-for="(item,index) in month" :key="index" :label="item.label" :value="item.value">
                                                </el-option>
                                            </el-select>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="11">
                                        <el-form-item label="会议时间" prop="hysj">
                                            <el-date-picker v-model="shykForm.hysj" type="date" value-format="timestamp" placeholder="会议时间" :editable="false"></el-date-picker>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="11" :offset="1">
                                        <el-form-item label="主讲人" prop="zjr">
                                            <el-input v-model.trim="shykForm.zjr" placeholder="主讲人"></el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="23">
                                        <el-form-item label="会议内容" prop="hynr">
                                            <el-input type="textarea" v-model.trim="shykForm.hynr" :autosize="{ minRows: 5}"></el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="11">
                                        <el-form-item label="行政区划" prop="xzqh">
                                            <el-select v-model="shykForm.xzqh" placeholder="请选择" style="width:100%" disabled>
                                                <el-option v-for="(item,index) in xzqhoptions" :key="index" :label="item.label" :value="item.value">
                                                </el-option>
                                            </el-select>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="11" :offset="1">
                                        <el-form-item label="部门科室" prop="bm">
                                            <el-select v-model="shykForm.bm" placeholder="请选择" style="width:100%" disabled>
                                                <el-option v-for="(item,index) in bmoptions" :key="index" :label="item.label" :value="item.value">
                                                </el-option>
                                            </el-select>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="11">
                                        <el-form-item label="录入人" prop="lrr">
                                            <el-input v-model="shykForm.lrr" placeholder="录入人" :disabled="true"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="11" :offset="1">
                                        <el-form-item label="录入时间" prop="lrsj">
                                            <el-date-picker v-model="shykForm.lrsj" type="datetime" value-format="timestamp" placeholder="录入时间" :disabled="true"></el-date-picker>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="20" :offset="3">
                                        <el-button size="small" type="success" @click="fileClick('hyfa')">会议方案</el-button>
                                        <el-button size="small" type="success" @click="fileClick('xxbj')">学习笔记</el-button>
                                        <el-button size="small" type="success" @click="fileClick('hyjl')">会议记录</el-button>
                                        <el-button size="small" type="success" @click="fileClick('hyzp')">学习照片</el-button>
                                    </el-col>
                                </el-row>
                            </el-col>
                            <!-- 右側參會人員 -->
                            <el-col :span="7">
                                <conferee-model @elseList="elseStr" @chooseList="choList" :chryList="chryoption" :qtryList="qtryoption"></conferee-model>
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
import confereeModel from "@/components/confereeModel";
import accessoryModel from "@/components/accessoryModel";
import { doCreate, getDicTab, remark } from "@/utils/config";
import { formatDate } from "@/utils/data";
import { shykSearch, shykSave, shykDel } from "@/api/zzjs/zzshzdls/shyk";
export default {
    components: {
        accessoryModel,
        confereeModel,
        applyrModifying
    },
    data() {
        return {
            applyXg: true,
            applyCode: {},
            seatch_year: "",
            seatch_month: "",
            seatch_chry: "",
            textTit: "",
            newModal: false,
            pageModal: false,
            activeShow: true,
            pageNo: 1,
            pageSize: 10,
            totalCount: 0,
            shykList: [],
            shykForm: {},
            ndoptions: [],
            ndoptions2: [],
            month: [],
            xzqhoptions: [],
            bmoptions: [],
            dfsjrules: {
                year: [{ required: true, message: "不能为空" }],
                month: [{ required: true, message: "不能为空" }],
                hysj: [{ required: true, message: "不能为空" }],
                hynr: [{ required: true, message: "不能为空" }],
                zjr: [{ required: true, message: "不能为空" }]
            },
            accessoryModalInt: false,
            upShowhide: true,
            textTitFile: "",
            fileSrc: "",
            chooseList: [],
            elseList: "",
            chryoption: {
                num: Math.random(),
                chryList: []
            },
            qtryoption: {
                num: Math.random(),
                qtryList: ""
            },
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
        elseStr(val) {
            this.elseList = "";
            this.elseList = val;
        },
        choList(val) {
            this.chooseList = [];
            this.chooseList = val;
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
        formatterDatehysj(row) {
            return formatDate(row.hysj, "yyyy-MM-dd");
        },
        formatterDatelrsj(row) {
            return formatDate(row.lrsj, "yyyy-MM-dd");
        },
        formInit() {
            let nowDate = new Date().getTime();
            this.shykForm.lrsj = nowDate;
            this.shykForm.bm = this.$store.state.user.user.uUser.bmbm;
            this.shykForm.xzqh = this.$store.state.user.user.uUser.xzqh;
            this.shykForm.lrr = this.$store.state.user.user.uUser.nickname;
        },
        CurrentChange(val) {
            this.pageNo = val;
            this.search_query();
        },
        newAdd() {
            this.newModal = true;
            this.textTit = "添加记录";
            this.activeShow = true;
            this.shykForm = {};
            if (this.$refs.shykForms) {
                this.$refs.shykForms.resetFields();
            }
            this.formInit();
            this.chryoption = {
                num: Date.now(),
                bm: this.$store.state.user.user.uUser.bmbm,
                xzqh: this.$store.state.user.user.uUser.xzqh,
                chryList: []
            };
            this.qtryoption = {
                num: Date.now(),
                qtryList: ""
            };
        },
        search_query() {
            let obj = {
                pageNo: this.pageNo,
                pageSize: this.pageSize,
                hylx: 1,
                bm: this.$store.state.user.user.uUser.bmbm,
                xzqh: this.$store.state.user.user.uUser.xzqh,
                remark: this.$store.state.user.user.uRole.remark
            };
            this.seatch_year ? (obj.year = this.seatch_year) : "";
            this.seatch_month ? (obj.month = this.seatch_month) : "";
            this.seatch_chry ? (obj.chry = this.seatch_chry) : "";
            shykSearch(obj).then(res => {
                let data = res.data;
                if (data.success) {
                    this.shykList = data.data.data;
                    this.totalCount = data.data.totalCount;
                } else {
                    this.shykList = [];
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
            if (this.$refs.shykForms) {
                this.$refs.shykForms.resetFields();
            }
            this.shykForm = Object.assign({}, row);
            this.chryoption = Object.assign({}, this.chryoption, {
                num: Date.now(),
                xzqh:row.xzqh,
                bm:row.bm,
                chryList: row.chryList
            });
            this.qtryoption = Object.assign({}, this.qtryoption, {
                num: Date.now(),
                qtryList: row.qtry
            });
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
            this.$refs.shykForms.validate(valid => {
                if (valid) {
                    let obj = Object.assign({}, _this.shykForm);
                    obj.lrrId = _this.$store.state.user.user.uUser.id;
                    obj.chryList = _this.chooseList;
                    obj.qtry = _this.elseList;
                    obj.hylx = 1;
                    let url = "";
                    obj.sqzt = "1";
                    if (!obj.id) {
                        url = "add";
                        shykSave(url, obj).then(res => {
                            let data = res.data;
                            if (data.success) {
                                _this.$message({
                                    type: "success",
                                    message: data.msg
                                });
                                delete this.shykForm.id;
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
                        shykSave(url, obj).then(res => {
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
                    _this.chooseList = [];
                    _this.elseList = "";
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
                    shykDel(obj).then(res => {
                        let data = res.data;
                        if (data.success) {
                            this.$message({
                                message: data.msg,
                                type: "success"
                            });
                        } else {
                            this.$message({
                                message: data.msg,
                                type: "warning"
                            });
                        }
                        this.search_query();
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
            this.shykForm[zd] = val.newSrcstr;
        },
        fileClick(val) {
            this.accessoryModalInt = true;
            this.textTitFile = "附件";
            this.fileSrc = {
                num: Math.random(),
                fileStr: this.shykForm[val],
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


