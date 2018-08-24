<template>
    <div class="wmcs">
        <div v-show="applyXg1">
            <el-form :inline="true" class="demo-form-inline">
                <el-form-item label="年度">
                    <el-select suffix-icon="el-icon-date" v-model="seatch_year" clearable>
                        <el-option v-for="(item,index) in ndoptions" :key="index" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <!-- <el-form-item label="问题接收部门">
                    <el-input placeholder="问题接收部门" prefix-icon="el-icon-search" v-model.trim="seatch_js_bm"></el-input> 
                </el-form-item> -->
                <el-form-item>
                    <button class="topQuery" @click="search_query">搜索</button>
                    <button v-show="remarkHq()=='czy'" class="topQuery" @click="newAdd">添加记录</button>
                </el-form-item>
            </el-form>
            <div class="capit-tit">
                <el-row>
                    <el-col :span="12">
                        <div class="user-left">
                            <span class="capit-content">创城场所建设</span>
                        </div>
                    </el-col>
                </el-row>
            </div>
            <div class="capit-list">
                <el-table :data="wmcsList" stripe border style="width: 100%">
                    <!-- <el-table-column type="selection"></el-table-column> -->
                    <el-table-column type="index" :index="indexMethod" label="序号" width="80"></el-table-column>
                    <el-table-column prop="year" label="年度" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="sj" :formatter="formatterDatesj" label="问卷调查时间" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="jsBm" label="问题接收部门" :formatter="getBmbm2" show-overflow-tooltip></el-table-column>
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
                            <el-button size="mini" type="primary" @click="reply(scope.row)">回复</el-button>
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
                    <el-form :inline="true" :model="wmcsForm" ref="wmcsForms" class="demo-form-inline" label-width="120px" :rules="wmcsrules">
                        <el-row>
                            <el-col :span="11">
                                <el-form-item label="年度" prop="year">
                                    <el-select v-model="wmcsForm.year" placeholder="请选择" style="width:100%">
                                        <el-option v-for="(item,index) in ndoptions2" :key="index" :label="item.label" :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="11" :offset="1">
                                <el-form-item label="问卷调查时间" prop="sj">
                                    <el-date-picker v-model="wmcsForm.sj" type="date" value-format="timestamp" placeholder="问卷调查时间"></el-date-picker>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="11">
                                <el-form-item label="接收行政区划" prop="jsXzqh">
                                    <el-input v-model="wmcsForm.jsXzqh" placeholder="接收行政区划" @focus="modelStatus('xzqh')"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="11" :offset="1">
                                <el-form-item label="问题接收部门" prop="jsBm">
                                    <el-input v-model="wmcsForm.jsBm" placeholder="问题接收部门" @focus="modelStatus('bm')"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <!-- <el-row>
                            <el-col :span="11">
                                <el-form-item label="回复时间" prop="hfsj">
                                    <el-date-picker v-model="wmcsForm.hfsj" type="date" value-format="timestamp" placeholder="回复时间"></el-date-picker>
                                </el-form-item>
                            </el-col>
                        </el-row> -->
                        <el-row>
                            <el-col :span="23">
                                <el-form-item label="主题描述" prop="ztms">
                                    <el-input type="textarea" v-model.trim="wmcsForm.ztms" :autosize="{ minRows: 5}"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="11">
                                <el-form-item label="行政区划" prop="xzqh">
                                    <el-select v-model="wmcsForm.xzqh" placeholder="请选择" style="width:100%" disabled>
                                        <el-option v-for="(item,index) in xzqhoptions" :key="index" :label="item.label" :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="11" :offset="1">
                                <el-form-item label="部门科室" prop="bm">
                                    <el-select v-model="wmcsForm.bm" placeholder="请选择" style="width:100%" disabled>
                                        <el-option v-for="(item,index) in bmoptions" :key="index" :label="item.label" :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="11">
                                <el-form-item label="录入人" prop="lrr">
                                    <el-input v-model="wmcsForm.lrr" placeholder="录入人" :disabled="true"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="11" :offset="1">
                                <el-form-item label="录入时间" prop="lrsj">
                                    <el-date-picker v-model="wmcsForm.lrsj" type="datetime" value-format="timestamp" placeholder="录入时间" :disabled="true"></el-date-picker>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="20" :offset="3">
                                <el-button size="small" type="success" @click="fileClick('fj')">附件</el-button>
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
            <div v-show="applyXg2">
                <applyr-Modifying2 :applyCode="applyCode" @btnBack="btnBack"></applyr-Modifying2>
            </div>
        </transition>
        <div v-show="applyXg3">
            <wmcs-reply-modifying :replyObj2="replyObj2" @btnBack="btnBack"></wmcs-reply-modifying>
        </div>
        <!-- 行政证区划弹框 -->
        <el-dialog :title="model_Tit" :visible.sync="xzqh_model" width="50%" :before-close="xzqhClose">
            <el-tree :data="xzqh_data" @node-click="nodeClick" default-expand-all :expand-on-click-node="false" :highlight-current="true">
            </el-tree>
            <span slot="footer" class="dialog-footer">
                <!-- <el-button type="primary" @click="xzqh_save">保 存</el-button> -->
                <el-button @click="xzqhClose">取 消</el-button>
            </span>
        </el-dialog>
        <!-- 部门弹框 -->
        <el-dialog :title="model_Tit" :visible.sync="bm_model" width="50%" :before-close="xzqhClose">
            <el-tree :data="bm_data" @node-click="bmnodeClick" default-expand-all :expand-on-click-node="false" :highlight-current="true">
            </el-tree>
            <span slot="footer" class="dialog-footer">
                <!-- <el-button type="primary" @click="xzqh_save">保 存</el-button> -->
                <el-button @click="xzqhClose">取 消</el-button>
            </span>
        </el-dialog>
        <reply-moudel :replyObj="replyObj" :newReplyModal="newReplyModal" @replynewToggle="replynewToggle"></reply-moudel>
    </div>
</template>
<script>
import applyrModifying2 from "@/components/applyrModifying2";
import wmcsReplyModifying from "@/components/wmcsReplyModifying";
import accessoryModel from "@/components/accessoryModel";
import replyMoudel from "./replyMoudel";
import { doCreate, getDicTab, remark } from "@/utils/config";
import { formatDate } from "@/utils/data";
import { wmcsSearch, wmcsSave, wmcsDel } from "@/api/zhzjs/yszzjl/wmcs/wmcswt";
import { treeQuery } from "@/api/administrative";
import { treeQueryBm } from "@/api/department";
export default {
    components: {
        accessoryModel,
        applyrModifying2,
        replyMoudel,
        wmcsReplyModifying
    },
    data() {
        return {
            applyXg1: true,
            applyXg2: false,
            applyXg3: false,
            applyCode: {},
            seatch_year: "",
            seatch_js_bm: "",
            textTit: "",
            replyObj2: {},
            replyObj: {},
            newModal: false,
            pageModal: false,
            activeShow: true,
            pageNo: 1,
            pageSize: 10,
            totalCount: 0,
            wmcsList: [],
            wmcsForm: {},
            ndoptions: [],
            ndoptions2: [],
            xzqhoptions: [],
            bmoptions: [],
            wmcsrules: {
                year: [{ required: true, message: "不能为空" }],
                sj: [{ required: true, message: "不能为空" }],
                jsBm: [{ required: true, message: "不能为空" }],
                jsXzqh: [{ required: true, message: "不能为空" }],
                ztms: [{ required: true, message: "不能为空" }],
                hfsj: [{ required: true, message: "不能为空" }]
            },
            accessoryModalInt: false,
            newReplyModal: false,
            upShowhide: true,
            textTitFile: "",
            fileSrc: "",
            model_Tit: "",
            xzqh_data: [],
            bm_data: [],
            xzqh_model: false,
            bm_model: false,
            xzqh: "",
            bmbm: "",
            userXzqh: "",
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
        getBmbm2(row) {
            return getDicTab("bmbm", row.jsBm);
        },
        formatterDatesj(row) {
            return formatDate(row.sj, "yyyy-MM-dd");
        },
        formatterDatelrsj(row) {
            return formatDate(Number(row.lrsj), "yyyy-MM-dd");
        },
        formInit() {
            let nowDate = new Date().getTime();
            this.wmcsForm.lrsj = nowDate;
            this.wmcsForm.bm = this.$store.state.user.user.uUser.bmbm;
            this.wmcsForm.xzqh = this.$store.state.user.user.uUser.xzqh;
            this.wmcsForm.lrr = this.$store.state.user.user.uUser.nickname;
        },
        CurrentChange(val) {
            this.pageNo = val;
            this.search_query();
        },
        xzqhClose() {
            this.xzqh_model = false;
            this.bm_model = false;
        },
        bmnodeClick(data) {
            this.bmbm = data.xzqhBm;
            this.wmcsForm.jsBm = data.name;
            this.xzqh_model = false;
            this.bm_model = false;
        },
        nodeClick(data) {
            this.xzqh = data.bm;
            this.wmcsForm.jsXzqh = data.name;
            this.wmcsForm.jsBm = "";
            this.xzqh_model = false;
            this.bm_model = false;
        },
        modelStatus(data) {
            let _this = this;
            if (data) {
                if (data == "xzqh") {
                    this.model_Tit = "行政区划";
                    treeQuery({ bm: this.userXzqh }).then(res => {
                        let data = res.data;
                        if (data.success) {
                            this.xzqh_model = true;
                            _this.xzqh_data = data.data;
                            // _this.$refs.multipleTable.toggleRowSelection(_this.xzqh,true);
                        }
                    });
                } else if (data == "bm") {
                    if (this.wmcsForm.jsXzqh) {
                        this.model_Tit = "部门编码";
                        this.bmData();
                    } else {
                        this.$message({
                            type: "warning",
                            message: "请返回选择行政区划"
                        });
                        return false;
                    }
                }
            }
        },
        //查询部门树
        bmData() {
            treeQueryBm({ xzqh: this.xzqh }).then(res => {
                let data = res.data;
                if (data.success) {
                    this.bm_model = true;
                    this.bm_data = data.data;
                }
            });
        },
        newAdd() {
            this.newModal = true;
            this.activeShow = true;
            this.textTit = "添加记录";
            this.wmcsForm = {};
            if (this.$refs.wmcsForms) {
                this.$refs.wmcsForms.resetFields();
            }
            this.formInit();
        },
        search_query() {
            let obj = {
                pageNo: this.pageNo,
                pageSize: this.pageSize,
                lx: 2,
                bm: this.$store.state.user.user.uUser.bmbm,
                xzqh: this.$store.state.user.user.uUser.xzqh,
                remark: this.$store.state.user.user.uRole.remark
            };
            this.seatch_year ? (obj.year = this.seatch_year) : "";
            this.seatch_js_bm ? (obj.jsBm = this.seatch_js_bm) : "";
            wmcsSearch(obj).then(res => {
                let data = res.data;
                if (data.success) {
                    this.wmcsList = data.data.data;
                    this.totalCount = data.data.totalCount;
                } else {
                    this.wmcsList = [];
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
            if (row.sqzt == "3" && this.sfdqyh(row) && row.zt != "2") {
                this.textTit = "编辑";
                this.activeShow = true;
            } else {
                this.textTit = "查看";
                this.activeShow = false;
            }
            if (this.$refs.wmcsForms) {
                this.$refs.wmcsForms.resetFields();
            }
            this.xzqh = row.jsXzqh;
            this.bmbm = row.jsBm;
            this.wmcsForm = Object.assign({}, row);
            this.wmcsForm.jsXzqh = getDicTab("xzqh", this.wmcsForm.jsXzqh);
            this.wmcsForm.jsBm = getDicTab("bmbm", this.wmcsForm.jsBm);
        },
        reply(row) {
            if (row.jsXzqh == this.userXzqh && row.jsBm == this.userBmbm) {
                if (!row.hfsj) {
                    this.newReplyModal = true;
                    let obj = {};
                    obj.wmcswtId = row.id;
                    obj.wtms = row.ztms;
                    let nowDate = new Date().getTime();
                    obj.lrsj = nowDate;
                    obj.lrr = this.$store.state.user.user.uUser.nickname;
                    obj.num = Math.random() + 1;
                    this.replyObj = obj;
                } else {
                    this.applyXg1 = false;
                    this.applyXg2 = false;
                    this.applyXg3 = true;
                    let obj = {};
                    obj.wmcswtId = row.id;
                    this.replyObj2 = obj;
                }
            } else {
                this.applyXg1 = false;
                this.applyXg2 = false;
                this.applyXg3 = true;
                let obj = {};
                obj.wmcswtId = row.id;
                this.replyObj2 = obj;
            }
        },
        replynewToggle(val) {
            this.newReplyModal = val;
            this.search_query();
        },
        btnBack(val) {
            this.applyXg1 = true;
            this.applyXg2 = false;
            this.applyXg3 = false;
            this.search_query();
        },
        applyClick(row) {
            this.applyXg1 = false;
            this.applyXg2 = true;
            this.applyXg3 = false;
            this.applyCode = Object.assign({}, row);
        },
        btn_save() {
            let _this = this;
            this.$refs.wmcsForms.validate(valid => {
                if (valid) {
                    let obj = Object.assign({}, _this.wmcsForm);
                    obj.lrrId = this.$store.state.user.user.uUser.id;
                    obj.jsXzqh = this.xzqh;
                    obj.jsBm = this.bmbm;
                    obj.lx = 2;
                    obj.sqzt = "1";
                    let url = "";
                    if (!obj.id) {
                        url = "add";
                        wmcsSave(url, obj).then(res => {
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
                        wmcsSave(url, obj).then(res => {
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
                    wmcsDel(obj).then(res => {
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
            this.wmcsForm[zd] = val.newSrcstr;
        },
        fileClick(val) {
            this.accessoryModalInt = true;
            this.textTitFile = "附件";
            this.fileSrc = {
                num: Math.random(),
                fileStr: this.wmcsForm[val],
                zdName: val
            };
        }
    },
    mounted() {
        this.ndoptions = doCreate("ndTit");
        this.ndoptions2 = doCreate("nd");
        this.bmoptions = doCreate("bmbm");
        this.xzqhoptions = doCreate("xzqh");
        this.search_query();
    }
};
</script>


