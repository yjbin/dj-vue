<template>
    <div class="zgfl">
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
                <el-form-item>
                    <button class="topQuery" @click="search_query">搜索</button>
                    <button v-show="remarkHq()=='czy'" class="topQuery" @click="newAdd">添加记录</button>
                </el-form-item>
            </el-form>
            <div class="capit-tit">
                <el-row>
                    <el-col :span="12">
                        <div class="user-left">
                            <span class="capit-content">职工福利及津补贴发放情况</span>
                        </div>
                    </el-col>
                </el-row>
            </div>
            <div class="capit-list">
                <el-table :data="zgflList" stripe border style="width: 100%">
                    <!-- <el-table-column type="selection"></el-table-column> -->
                    <el-table-column type="index" :index="indexMethod" label="序号" width="80"></el-table-column>
                    <el-table-column prop="xzqh" :formatter="getXzqh" label="行政区划" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="bm" :formatter="getBmbm" label="部门科室" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="year" label="年度" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="month" label="月份" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="zcsj" :formatter="formatterDatezcsj" label="支出时间" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="zcxm" label="支出项目" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="zcje" label="支出金额(万元)" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="zcyy" label="支出原因" show-overflow-tooltip></el-table-column>
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
                    <el-form :inline="true" :model="zgflForm" ref="zgflForms" class="demo-form-inline" label-width="120px" :rules="zgflrules">
                        <el-row>
                            <el-col :span="11">
                                <el-form-item label="年度" prop="year">
                                    <el-select v-model="zgflForm.year" placeholder="请选择" style="width:100%">
                                        <el-option v-for="(item,index) in ndoptions" :key="index" :label="item.label" :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="11" :offset="1">
                                <el-form-item label="月份" prop="month">
                                    <el-select v-model="zgflForm.month" placeholder="请选择" style="width:100%">
                                        <el-option v-for="(item,index) in month" :key="index" :label="item.label" :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="11">
                                <el-form-item label="支出时间" prop="zcsj">
                                    <el-date-picker v-model="zgflForm.zcsj" type="date" value-format="timestamp" placeholder="支出时间"></el-date-picker>
                                </el-form-item>
                            </el-col>
                            <el-col :span="11" :offset="1">
                                <el-form-item label="支出项目" prop="zcxm">
                                    <el-input v-model.trim="zgflForm.zcxm" placeholder="支出项目"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <!-- <el-row>
                        <el-col :span="11">
                            <el-form-item label="预警级别" prop="yjjb">
                                <el-radio-group v-model="zgflForm.yjjb">
                                  <el-radio :label="1"><b class="greenlamp"></b></el-radio>
                                  <el-radio :label="2"><b class="bluelamp"></b></el-radio>
                                  <el-radio :label="3"><b class="yelowlamp"></b></el-radio>
                                  <el-radio :label="4"><b class="redlamp"></b></el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </el-col>
                        <el-col :span="11" :offset="1">
                            <el-form-item label="状态" prop="sqzt">
                                <el-input v-model="zgflForm.sqzt" placeholder="状态"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row> -->
                        <el-row>
                            <el-col :span="11">
                                <el-form-item label="支出金额(万元)" prop="zcje">
                                    <el-input v-model.number="zgflForm.zcje" placeholder="支出金额(万元)"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="23">
                                <el-form-item label="支出原因" prop="zcyy">
                                    <el-input type="textarea" v-model.trim="zgflForm.zcyy" :autosize="{ minRows: 5}"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="11">
                                <el-form-item label="行政区划" prop="xzqh">
                                    <el-select v-model="zgflForm.xzqh" placeholder="请选择" style="width:100%" disabled>
                                        <el-option v-for="(item,index) in xzqhoptions" :key="index" :label="item.label" :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="11" :offset="1">
                                <el-form-item label="部门科室" prop="bm">
                                    <el-select v-model="zgflForm.bm" placeholder="请选择" style="width:100%" disabled>
                                        <el-option v-for="(item,index) in bmoptions" :key="index" :label="item.label" :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="11">
                                <el-form-item label="录入人" prop="lrr">
                                    <el-input v-model="zgflForm.lrr" placeholder="录入人" :disabled="true"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="11" :offset="1">
                                <el-form-item label="录入时间" prop="lrsj">
                                    <el-date-picker v-model="zgflForm.lrsj" type="datetime" value-format="timestamp" placeholder="录入时间" :disabled="true"></el-date-picker>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="20" :offset="3">
                                <el-button size="small" type="success" @click="fileClick('ldps')">领导批示</el-button>
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
import accessoryModel from "@/components/accessoryModel";
import applyrModifying from "@/components/applyrModifying";
import { doCreate, getDicTab, remark } from "@/utils/config";
import { formatDate } from "@/utils/data";
import { validMoney } from "@/utils/validate";
import {
    zgflSearch,
    zgflSave,
    zgflDel
} from "@/api/zfjs/lszhbxgdjshzzsfwt/zgfl";
export default {
    components: {
        accessoryModel,
        applyrModifying
    },
    data() {
        const validOfMoney = (rule, value, callback) => {
            if (!validMoney(value)) {
                callback(new Error("请输入正确的金额~"));
            } else {
                callback();
            }
        };
        return {
            applyXg: true,
            applyCode: {},
            seatch_nd: "",
            seatch_month: "",
            textTit: "",
            newModal: false,
            pageModal: false,
            activeShow: true,
            pageNo: 1,
            pageSize: 10,
            totalCount: 0,
            zgflList: [],
            zgflForm: {},
            ndoptions: [],
            monthoptions: [],
            month: [],
            xzqhoptions: [],
            bmoptions: [],
            xmoptions: [],
            zgflrules: {
                year: [{ required: true, message: "不能为空" }],
                month: [{ required: true, message: "不能为空" }],
                zcsj: [{ required: true, message: "不能为空" }],
                zcxm: [{ required: true, message: "不能为空" }],
                zcje: [{ required: true, validator: validOfMoney }]
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
        formatterDatezcsj(row) {
            return formatDate(row.zcsj, "yyyy-MM-dd");
        },
        formatterDatelrsj(row) {
            return formatDate(row.lrsj, "yyyy-MM-dd");
        },
        formInit() {
            let nowDate = new Date().getTime();
            this.zgflForm.lrsj = nowDate;
            this.zgflForm.bm = this.$store.state.user.user.uUser.bmbm;
            this.zgflForm.xzqh = this.$store.state.user.user.uUser.xzqh;
            this.zgflForm.lrr = this.$store.state.user.user.uUser.nickname;
        },
        CurrentChange(val) {
            this.pageNo = val;
            this.search_query();
        },
        newAdd() {
            this.newModal = true;
            this.textTit = "添加记录";
            this.zgflForm = {};
            if (this.$refs.zgflForms) {
                this.$refs.zgflForms.resetFields();
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
            this.seatch_nd ? (obj.year = this.seatch_nd) : "";
            this.seatch_month ? (obj.month = this.seatch_month) : "";
            zgflSearch(obj).then(res => {
                let data = res.data;
                if (data.success) {
                    this.zgflList = data.data.data;
                    this.totalCount = data.data.totalCount;
                } else {
                    this.zgflList = [];
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
            if (this.$refs.zgflForms) {
                this.$refs.zgflForms.resetFields();
            }
            this.zgflForm = Object.assign({}, row);
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
            this.$refs.zgflForms.validate(valid => {
                if (valid) {
                    let obj = Object.assign({}, _this.zgflForm);
                    obj.lrrId = this.$store.state.user.user.uUser.id;
                    let url = "";
                    obj.sqzt = "1";
                    if (!obj.id) {
                        url = "add";
                        zgflSave(url, obj).then(res => {
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
                        zgflSave(url, obj).then(res => {
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
                    zgflDel(obj).then(res => {
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
            this.zgflForm[zd] = val.newSrcstr;
        },
        fileClick(val) {
            this.accessoryModalInt = true;
            this.textTitFile = "附件";
            this.fileSrc = {
                num: Math.random(),
                fileStr: this.zgflForm[val],
                zdName: val
            };
        }
    },
    mounted() {
        this.ndoptions = doCreate("nd");
        this.bmoptions = doCreate("bmbm");
        this.xzqhoptions = doCreate("xzqh");
        this.month = doCreate("month");
        this.monthoptions = doCreate("month");
        this.search_query();
    }
};
</script>



