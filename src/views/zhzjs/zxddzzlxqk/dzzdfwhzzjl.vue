<template>
    <div class="dzzdfwhzzjl">
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
                <!-- <el-form-item label="查询条件">
                <el-input placeholder="请输入..." prefix-icon="el-icon-search" v-model.trim="seatch_name"></el-input>
            </el-form-item> -->
                <el-form-item>
                    <button class="topQuery" @click="search_query">搜索</button>
                    <button class="topQuery" v-show="remarkHq()=='czy'" @click="newAdd">添加记录</button>
                </el-form-item>
            </el-form>

            <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
                <el-tab-pane label="会议" name="first">
                    <div class="capit-tit">
                        <el-row>
                            <el-col :span="12">
                                <div class="user-left">
                                    <span class="capit-content">党组织担负维护政治纪律，政治规矩责任的情况-会议</span>
                                </div>
                            </el-col>
                        </el-row>
                    </div>
                    <div v-if="lx == '0'">
                        <el-table :data="hyList" stripe border style="width: 100%">
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
                    </div>
                </el-tab-pane>
                <el-tab-pane label="活动" name="second">
                    <div class="capit-tit">
                        <el-row>
                            <el-col :span="12">
                                <div class="user-left">
                                    <span class="capit-content">党组织担负维护政治纪律，政治规矩责任的情况-活动</span>
                                </div>
                            </el-col>
                        </el-row>
                    </div>
                    <div v-if="lx == '1'">
                        <el-table :data="hdList" stripe border style="width: 100%">
                            <!-- <el-table-column type="selection"></el-table-column> -->
                            <el-table-column type="index" :index="indexMethod" label="序号" width="80"></el-table-column>
                            <el-table-column prop="year" label="年度" show-overflow-tooltip></el-table-column>
                            <el-table-column prop="month" label="月份" show-overflow-tooltip></el-table-column>
                            <el-table-column prop="hdsj" :formatter="formatterDatehdsj" label="活动时间" show-overflow-tooltip></el-table-column>
                            <el-table-column prop="hdzt" label="活动主题" show-overflow-tooltip></el-table-column>
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
                    </div>
                </el-tab-pane>
            </el-tabs>
            <!--会议 新建，编辑弹框 -->
            <el-dialog :title="textTit" :visible.sync="hyModal" :before-close="btn_cancel" width="60%" top="12vh">
                <el-form :inline="true" :model="hyForm" ref="hyForms" class="demo-form-inline" label-width="120px" :rules="hyrules">
                    <el-row>
                        <el-col :span="17">
                            <el-row>
                                <el-col :span="11">
                                    <el-form-item label="年度" prop="year">
                                        <el-select v-model="hyForm.year" placeholder="请选择" style="width:100%">
                                            <el-option v-for="(item,index) in ndoptions" :key="index" :label="item.label" :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="11" :offset="1">
                                    <el-form-item label="月份" prop="month">
                                        <el-select v-model="hyForm.month" placeholder="请选择" style="width:100%">
                                            <el-option v-for="(item,index) in month" :key="index" :label="item.label" :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="11">
                                    <el-form-item label="会议时间" prop="hysj">
                                        <el-date-picker v-model="hyForm.hysj" type="date" value-format="timestamp" placeholder="会议时间"></el-date-picker>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="11" :offset="1">
                                    <el-form-item label="主讲人" prop="zjr">
                                        <el-input v-model.trim="hyForm.zjr" placeholder="主讲人"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="23">
                                    <el-form-item label="会议内容" prop="hynr">
                                        <el-input type="textarea" v-model.trim="hyForm.hynr" :autosize="{ minRows: 5}"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="11">
                                    <el-form-item label="行政区划" prop="xzqh">
                                        <el-select v-model="hyForm.xzqh" placeholder="请选择" style="width:100%" disabled>
                                            <el-option v-for="(item,index) in xzqhoptions" :key="index" :label="item.label" :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="11" :offset="1">
                                    <el-form-item label="部门科室" prop="bm">
                                        <el-select v-model="hyForm.bm" placeholder="请选择" style="width:100%" disabled>
                                            <el-option v-for="(item,index) in bmoptions" :key="index" :label="item.label" :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="11">
                                    <el-form-item label="录入人" prop="lrr">
                                        <el-input v-model="hyForm.lrr" placeholder="录入人" :disabled="true"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="11" :offset="1">
                                    <el-form-item label="录入时间" prop="lrsj">
                                        <el-date-picker v-model="hyForm.lrsj" type="datetime" value-format="timestamp" placeholder="录入时间" :disabled="true"></el-date-picker>
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
                            <conferee-model v-if="!(lx*1)" @elseList="elseStr" @chooseList="choList" :chryList="chryoption" :qtryList="qtryoption"></conferee-model>
                        </el-col>
                    </el-row>
                </el-form>
                <div class="footerBox">
                    <span slot="footer" class="dialog-footer">
                        <button v-show="activeShow" class="save" @click="btn_save()">保存</button>
                        <button @click="btn_cancel" class="cancel">取消</button>
                    </span>
                </div>
            </el-dialog>
            <!-- 活动 新建，编辑弹框 -->
            <el-dialog :title="textTit" :visible.sync="hdModal" :before-close="btn_cancel" width="60%" top="12vh">
                <el-form :inline="true" :model="hdForm" ref="hdForms" class="demo-form-inline" label-width="120px" :rules="hdrules">
                    <el-row>
                        <el-col :span="17">
                            <el-row>
                                <el-col :span="11">
                                    <el-form-item label="年度" prop="year">
                                        <el-select v-model="hdForm.year" placeholder="请选择" style="width:100%">
                                            <el-option v-for="(item,index) in ndoptions" :key="index" :label="item.label" :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="11" :offset="1">
                                    <el-form-item label="月份" prop="month">
                                        <el-select v-model="hdForm.month" placeholder="请选择" style="width:100%">
                                            <el-option v-for="(item,index) in month" :key="index" :label="item.label" :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="11">
                                    <el-form-item label="活动时间" prop="hdsj">
                                        <el-date-picker v-model="hdForm.hdsj" type="date" value-format="timestamp" placeholder="活动时间"></el-date-picker>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="11" :offset="1">
                                    <el-form-item label="党组织名称" prop="bm">
                                        <el-select v-model="hdForm.bm" placeholder="请选择" style="width:100%" disabled>
                                            <el-option v-for="(item,index) in bmoptions" :key="index" :label="item.label" :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="11">
                                    <el-form-item label="活动主题" prop="hdzt">
                                        <el-input v-model.trim="hdForm.hdzt" placeholder="活动主题"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="11" :offset="1">
                                    <el-form-item label="活动地点" prop="hddd">
                                        <el-input v-model.trim="hdForm.hddd" placeholder="活动地点"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="23">
                                    <el-form-item label="活动内容" prop="hdnr">
                                        <el-input type="textarea" v-model.trim="hdForm.hdnr" :autosize="{ minRows: 3}"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>

                            <el-row>
                                <el-col :span="11">
                                    <el-form-item label="行政区划" prop="xzqh">
                                        <el-select v-model="hdForm.xzqh" placeholder="请选择" style="width:100%" disabled>
                                            <el-option v-for="(item,index) in xzqhoptions" :key="index" :label="item.label" :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="11" :offset="1">
                                    <el-form-item label="部门科室" prop="bm">
                                        <el-select v-model="hdForm.bm" placeholder="请选择" style="width:100%" disabled>
                                            <el-option v-for="(item,index) in bmoptions" :key="index" :label="item.label" :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="11">
                                    <el-form-item label="录入人" prop="lrr">
                                        <el-input v-model="hdForm.lrr" placeholder="录入人" :disabled="true"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="11" :offset="1">
                                    <el-form-item label="录入时间" prop="lrsj">
                                        <el-date-picker v-model="hdForm.lrsj" type="datetime" value-format="timestamp" placeholder="录入时间" :disabled="true"></el-date-picker>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="20" :offset="3">
                                    <el-button size="small" type="success" @click="fileClick('hdzp')">活动照片</el-button>
                                    <el-button size="small" type="success" @click="fileClick('hdfa')">活动方案</el-button>
                                </el-col>
                            </el-row>

                        </el-col>
                        <!-- 右側參會人員 -->
                        <el-col :span="7">
                            <conferee-model v-if="(lx*1)" @elseList="elseStr" @chooseList="choList" :chryList="chryoption" :qtryList="qtryoption"></conferee-model>
                        </el-col>
                    </el-row>
                </el-form>
                <div class="footerBox">
                    <span slot="footer" class="dialog-footer">
                        <button v-show="activeShow" class="save" @click="btn_save()">保存</button>
                        <button @click="btn_cancel" class="cancel">取消</button>
                    </span>
                </div>
            </el-dialog>
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
import { hybSearch, hybSave, hybDel } from "@/api/zhzjs/hyb";
import { hdbSearch, hdbSave, hdbDel } from "@/api/zhzjs/hdb";
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
            seatch_nd: "",
            seatch_month: "",
            lx: "0",
            activeName: "first",
            textTit: "",
            hyModal: false,
            hdModal: false,
            pageModal: false,
            activeShow: true,
            pageNo: 1,
            pageSize: 10,
            totalCount: 0,
            hyList: [],
            hdList: [],
            hyForm: {},
            hdForm: {},
            ndoptions: [],
            ndoptions2: [],
            month: [],
            xzqhoptions: [],
            bmoptions: [],
            lxOptions: [],
            hyrules: {
                year: [{ required: true, message: "不能为空" }],
                month: [{ required: true, message: "不能为空" }],
                hysj: [{ required: true, message: "不能为空" }],
                hynr: [{ required: true, message: "不能为空" }],
                zjr: [{ required: true, message: "不能为空" }]
            },
            hdrules: {
                year: [{ required: true, message: "不能为空" }],
                month: [{ required: true, message: "不能为空" }],
                hysj: [{ required: true, message: "不能为空" }],
                hynr: [{ required: true, message: "不能为空" }],
                hdzt: [{ required: true, message: "不能为空" }],
                hdnr: [{ required: true, message: "不能为空" }],
                hddd: [{ required: true, message: "不能为空" }],
                hdsj: [{ required: true, message: "不能为空" }]
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
        btnBack(val) {
            this.applyXg = val;
            this.search_query(this.lx);
        },
        applyClick(row) {
            this.applyXg = false;
            this.applyCode = Object.assign({}, row);
        },
        //切换活动会议类型
        handleClick(tab) {
            if (tab.name == "first") {
                this.lx = 0;
                this.search_query(0);
            } else if (tab.name == "second") {
                this.lx = 1;
                this.search_query(1);
            }
        },
        //接受参会人组件
        elseStr(val) {
            this.elseList = "";
            this.elseList = val;
        },
        choList(val) {
            this.chooseList = [];
            this.chooseList = val;
        },
        btn_cancel() {
            if (this.lx == 0) {
                this.hyModal = false;
            } else {
                this.hdModal = false;
            }
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
        formatterDatehdsj(row) {
            return formatDate(row.hdsj, "yyyy-MM-dd");
        },
        formatterDatehysj(row) {
            return formatDate(row.hysj, "yyyy-MM-dd");
        },
        formatterDatelrsj(row) {
            return formatDate(row.lrsj, "yyyy-MM-dd");
        },
        formInit_hy() {
            let nowDate = new Date().getTime();
            this.hyForm.lrsj = nowDate;
            this.hyForm.bm = this.$store.state.user.user.uUser.bmbm;
            this.hyForm.xzqh = this.$store.state.user.user.uUser.xzqh;
            this.hyForm.lrr = this.$store.state.user.user.uUser.nickname;
        },
        formInit_hd() {
            let nowDate = new Date().getTime();
            this.hdForm.lrsj = nowDate;
            this.hdForm.bm = this.$store.state.user.user.uUser.bmbm;
            this.hdForm.xzqh = this.$store.state.user.user.uUser.xzqh;
            this.hdForm.lrr = this.$store.state.user.user.uUser.nickname;
        },
        CurrentChange(val) {
            this.pageNo = val;
            switch (1 * this.lx) {
                case 0:
                    this.search_query(0);
                    break;
                case 1:
                    this.search_query(1);
                    break;
                default:
                    return false;
            }
        },
        newAdd() {
            this.activeShow = true;
            if (this.lx == 0) {
                this.hyModal = true;
                this.textTit = "添加会议记录";
                this.hyForm = {};
                if (this.$refs.hyForms) {
                    this.$refs.hyForms.resetFields();
                }
                this.formInit_hy();
            } else {
                this.hdModal = true;
                this.textTit = "添加活动记录";
                this.hdForm = {};
                if (this.$refs.hdForms) {
                    this.$refs.hdForms.resetFields();
                }
                this.formInit_hd();
            }
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
        //查询列表
        search_query(val) {
            let obj = {
                pageNo: this.pageNo,
                pageSize: this.pageSize,
                bm: this.$store.state.user.user.uUser.bmbm,
                xzqh: this.$store.state.user.user.uUser.xzqh,
                remark: this.$store.state.user.user.uRole.remark
            };
            Number(this.lx) ? (obj.hdlx = 1) : (obj.hylx = 1);
            this.seatch_nd ? (obj.year = this.seatch_nd) : "";
            this.seatch_month ? (obj.month = this.seatch_month) : "";
            if (!this.lx) {
                hybSearch(obj).then(res => {
                    let data = res.data;
                    if (data.success) {
                        this.hyList = data.data.data;
                        this.totalCount = data.data.totalCount;
                    } else {
                        this.hyList = [];
                        this.totalCount = 0;
                        this.$message({
                            type: "warning",
                            message: data.msg
                        });
                    }
                });
            } else {
                hdbSearch(obj).then(res => {
                    let data = res.data;
                    if (data.success) {
                        this.hdList = data.data.data;
                        this.totalCount = data.data.totalCount;
                    } else {
                        this.hdList = [];
                        this.totalCount = 0;
                        this.$message({
                            type: "warning",
                            message: data.msg
                        });
                    }
                });
            }
        },
        //编辑
        Edit(row) {
            if (row.sqzt == "3" && this.sfdqyh(row)) {
                this.textTit = "编辑";
                this.activeShow = true;
            } else {
                this.textTit = "查看";
                this.activeShow = false;
            }
            if (this.lx == 0) {
                this.hyModal = true;
                if (this.$refs.hyForms) {
                    this.$refs.hyForms.resetFields();
                }

                this.hyForm = Object.assign({}, row);
                this.chryoption = Object.assign({}, this.chryoption, {
                    num: Date.now(),
                    xzqh: row.xzqh,
                    bm: row.bm,
                    chryList: row.chryList
                });
                this.qtryoption = Object.assign({}, this.qtryoption, {
                    num: Date.now(),
                    qtryList: row.qtry
                });
            } else if (this.lx == 1) {
                this.hdModal = true;
                if (this.$refs.hdForms) {
                    this.$refs.hdForms.resetFields();
                }
                this.hdForm = Object.assign({}, row);
                this.chryoption = Object.assign({}, this.chryoption, {
                    num: Date.now(),
                    xzqh: row.xzqh,
                    bm: row.bm,
                    chryList: row.chryList
                });
                this.qtryoption = Object.assign({}, this.qtryoption, {
                    num: Date.now(),
                    qtryList: row.qtry
                });
            }
        },
        btn_save() {
            let _this = this;
            if (this.lx == 0) {
                this.$refs.hyForms.validate(valid => {
                    if (valid) {
                        let obj = Object.assign({}, _this.hyForm);
                        obj.lrrId = _this.$store.state.user.user.uUser.id;
                        obj.chryList = _this.chooseList;
                        obj.qtry = _this.elseList;
                        obj.hylx = 1;
                        obj.sqzt = "1";
                        let url = "";
                        if (!obj.id) {
                            url = "add";
                            hybSave(url, obj).then(res => {
                                let data = res.data;
                                if (data.success) {
                                    _this.$message({
                                        type: "success",
                                        message: data.msg
                                    });
                                    delete this.hyForm.id;
                                    _this.search_query(0);
                                } else {
                                    _this.$message({
                                        type: "danger",
                                        message: data.msg
                                    });
                                }
                            });
                        } else {
                            url = "update";
                            hybSave(url, obj).then(res => {
                                let data = res.data;
                                if (data.success) {
                                    _this.$message({
                                        type: "success",
                                        message: data.msg
                                    });
                                    _this.search_query(0);
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
            } else {
                this.$refs.hdForms.validate(valid => {
                    if (valid) {
                        let obj = Object.assign({}, _this.hdForm);
                        obj.chryList = _this.chooseList;
                        obj.qtry = _this.elseList;
                        obj.hdlx = 1;
                        obj.sqzt = "1";
                        let url = "";
                        if (!obj.id) {
                            url = "add";
                            hdbSave(url, obj).then(res => {
                                let data = res.data;
                                if (data.success) {
                                    _this.$message({
                                        type: "success",
                                        message: data.msg
                                    });
                                    delete this.hdForm.id;
                                    _this.search_query(1);
                                } else {
                                    _this.$message({
                                        type: "danger",
                                        message: data.msg
                                    });
                                }
                            });
                        } else {
                            url = "update";
                            hdbSave(url, obj).then(res => {
                                let data = res.data;
                                if (data.success) {
                                    _this.$message({
                                        type: "success",
                                        message: data.msg
                                    });
                                    _this.search_query(1);
                                } else {
                                    _this.$message({
                                        type: "danger",
                                        message: data.msg
                                    });
                                }
                            });
                        }
                    }
                    _this.btn_cancel();
                    _this.chooseList = [];
                    _this.elseList = "";
                });
            }
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
                    if (this.lx == 0) {
                        hybDel(obj).then(res => {
                            let data = res.data;
                            if (data.success) {
                                this.$message({
                                    message: data.msg,
                                    type: "success"
                                });
                                this.search_query(0);
                            } else {
                                this.$message({
                                    message: data.msg,
                                    type: "warning"
                                });
                            }
                        });
                    } else {
                        hdbDel(obj).then(res => {
                            let data = res.data;
                            if (data.success) {
                                this.$message({
                                    message: data.msg,
                                    type: "success"
                                });
                                this.search_query(1);
                            } else {
                                this.$message({
                                    message: data.msg,
                                    type: "warning"
                                });
                            }
                        });
                    }
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
            this.hyForm[zd] = val.newSrcstr;
        },
        fileClick(val) {
            this.accessoryModalInt = true;
            this.textTitFile = "附件";
            this.fileSrc = {
                num: Math.random(),
                fileStr: this.hyForm[val],
                zdName: val
            };
        }
    },
    mounted() {
        this.lxOptions = doCreate("zzlx");
        this.ndoptions = doCreate("nd");
        this.bmoptions = doCreate("bmbm");
        this.xzqhoptions = doCreate("xzqh");
        this.month = doCreate("month");
        this.lx = 0;
        this.search_query(0);
    }
};
</script>
<style lang="scss">
.dzzdfwhzzjl {
    .el-tabs {
        .el-tabs__header {
            padding: 0;
            position: relative;
            margin: 0;
            .el-tabs__item {
                text-align: center;
                min-width: 110px;
            }
        }
        .el-tabs__content {
            padding: 0;
            min-height: 600px;
        }
    }
}
</style>

