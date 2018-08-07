<template>
    <div class="WarningToedit">
        <el-form :inline="true" class="demo-form-inline">
            <el-form-item label="行政区划">
                <el-input v-model="seatch_xzqh" placeholder="行政区划" @focus="modelStatus('xzqh')"></el-input>
            </el-form-item>
            <el-form-item label="部门">
                <el-input v-model="seatch_bm" placeholder="部门" @focus="modelStatus('bm')"></el-input>
            </el-form-item>
            <el-form-item label="年度">
                <el-select suffix-icon="el-icon-date" v-model="seatch_year" clearable>
                    <el-option v-for="(item,index) in ndoptions" :key="index" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <button type="primary" @click="tableList" class="topQuery">搜索</button>
            </el-form-item>
        </el-form>

        <div class="wdjsDeil" v-show="xmyj">
            <div class="capit-tit">
                <el-row>
                    <el-col :span="24">
                        <div class="user-left">
                            <span class="capit-content">预警状态编辑</span>
                            <el-button v-show="ctIndex>0" size="mini" type="warning" style="float:right;margin:5px 20px 0 0;" @click="backSyb">返回</el-button>
                        </div>
                    </el-col>
                </el-row>
            </div>
            <table style="width:100%">
                <thead>
                    <tr>
                        <th width="20%">五大建设</th>
                        <th width="20%">预警项目</th>
                        <th width="10%">
                            <span class="yjGreen">绿色</span>
                        </th>
                        <th width="10%">
                            <span class="yjBlue">黄色</span>
                        </th>
                        <th width="10%">
                            <span class="yjYellow">橙色</span>
                        </th>
                        <th width="10%">
                            <span class="yjRed">红色</span>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item,index) in tabList" :key="index">
                        <td :rowspan="item.pIdspan" :class="{hidden: item.pIddis}">{{CdDic(item.pId)}}</td>
                        <td :rowspan="item.cdmcspan" :class="{hidden: item.cdmcmdis,pointerClass:true}" @click="ctClick(item)">{{item.cdmc}}</td>
                        <td>{{item.green}}</td>
                        <td>{{item.blue}}</td>
                        <td>{{item.yellow}}</td>
                        <td>{{item.red}}</td>

                    </tr>
                </tbody>
            </table>
        </div>
        <div v-show="ndyj">
            <div class="capit-tit">
                <el-row>
                    <el-col :span="24">
                        <div class="user-left">
                            <span class="capit-content">预警状态编辑</span>
                            <el-button v-show="ctIndex>0" size="mini" type="warning" style="float:right;margin:5px 20px 0 0;" @click="backSyb2">返回</el-button>
                        </div>
                    </el-col>
                </el-row>
            </div>
            <el-table :data="nddateList" stripe border style="width: 100%">
                <el-table-column prop="cdmc" label="预警项目" show-overflow-tooltip></el-table-column>
                <el-table-column prop="yjpl" label="预警频率" :formatter="yjplDic" show-overflow-tooltip></el-table-column>
                <el-table-column prop="nd" label="预警状态" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <el-select suffix-icon="el-icon-date" v-model="scope.row.nd">
                            <el-option v-for="(item,index) in yjztoptions" :key="index" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </template>
                </el-table-column>
                <el-table-column prop="address" label="操作" width="200">
                    <template slot-scope="scope">
                        <el-button size="mini" type="primary" @click="yjEdit(scope.row)">编辑</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div v-show="bnyj">
            <div class="capit-tit">
                <el-row>
                    <el-col :span="24">
                        <div class="user-left">
                            <span class="capit-content">预警状态编辑</span>
                            <el-button v-show="ctIndex>0" size="mini" type="warning" style="float:right;margin:5px 20px 0 0;" @click="backSyb2">返回</el-button>
                        </div>
                    </el-col>
                </el-row>
            </div>
            <el-table :data="bndateList" stripe border style="width: 100%">
                <el-table-column prop="cdmc" label="预警项目" show-overflow-tooltip></el-table-column>
                <el-table-column prop="yjpl" label="预警频率" :formatter="yjplDic" show-overflow-tooltip></el-table-column>
                <el-table-column prop="bn1" label="前半年" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <el-select suffix-icon="el-icon-date" v-model="scope.row.bn1" :disabled="!scope.row.bn1">
                            <el-option v-for="(item,index) in yjztoptions" :key="index" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </template>
                </el-table-column>
                <el-table-column prop="bn2" label="后半年" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <el-select suffix-icon="el-icon-date" v-model="scope.row.bn2" :disabled="!scope.row.bn2">
                            <el-option v-for="(item,index) in yjztoptions" :key="index" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </template>
                </el-table-column>
                <el-table-column prop="address" label="操作" width="200">
                    <template slot-scope="scope">
                        <el-button size="mini" type="primary" @click="yjEdit(scope.row)">编辑</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div v-show="jdyj">
            <div class="capit-tit">
                <el-row>
                    <el-col :span="24">
                        <div class="user-left">
                            <span class="capit-content">预警状态编辑</span>
                            <el-button v-show="ctIndex>0" size="mini" type="warning" style="float:right;margin:5px 20px 0 0;" @click="backSyb2">返回</el-button>
                        </div>
                    </el-col>
                </el-row>
            </div>
            <el-table :data="jddateList" stripe border style="width: 100%">
                <el-table-column prop="cdmc" label="预警项目" show-overflow-tooltip></el-table-column>
                <el-table-column prop="yjpl" label="预警频率" :formatter="yjplDic" show-overflow-tooltip></el-table-column>
                <el-table-column prop="jd1" label="第一季度" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <el-select suffix-icon="el-icon-date" v-model="scope.row.j1" :disabled="!scope.row.j1">
                            <el-option v-for="(item,index) in yjztoptions" :key="index" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </template>
                </el-table-column>
                <el-table-column prop="jd2" label="第二季度" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <el-select suffix-icon="el-icon-date" v-model="scope.row.j2" :disabled="!scope.row.j2">
                            <el-option v-for="(item,index) in yjztoptions" :key="index" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </template>
                </el-table-column>
                <el-table-column prop="jd3" label="第三季度" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <el-select suffix-icon="el-icon-date" v-model="scope.row.j3" :disabled="!scope.row.j3">
                            <el-option v-for="(item,index) in yjztoptions" :key="index" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </template>
                </el-table-column>
                <el-table-column prop="jd4" label="第四季度" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <el-select suffix-icon="el-icon-date" v-model="scope.row.j4" :disabled="!scope.row.j4">
                            <el-option v-for="(item,index) in yjztoptions" :key="index" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </template>
                </el-table-column>
                <el-table-column prop="address" label="操作" width="200">
                    <template slot-scope="scope">
                        <el-button size="mini" type="primary" @click="yjEdit(scope.row)">编辑</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div v-show="ydyj">
            <div class="capit-tit">
                <el-row>
                    <el-col :span="24">
                        <div class="user-left">
                            <span class="capit-content">预警状态编辑</span>
                            <el-button v-show="ctIndex>0" size="mini" type="warning" style="float:right;margin:5px 20px 0 0;" @click="backSyb2">返回</el-button>
                        </div>
                    </el-col>
                </el-row>
            </div>
            <el-table :data="yddateList" stripe border style="width: 100%">
                <el-table-column prop="cdmc" label="预警项目" show-overflow-tooltip></el-table-column>
                <el-table-column prop="yjpl" label="预警频率" :formatter="yjplDic" show-overflow-tooltip></el-table-column>
                <el-table-column prop="m1" label="一月" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <el-select suffix-icon="el-icon-date" v-model="scope.row.m1" :disabled="!scope.row.m1">
                            <el-option v-for="(item,index) in yjztoptions" :key="index" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </template>
                </el-table-column>
                <el-table-column prop="m2" label="二月" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <el-select suffix-icon="el-icon-date" v-model="scope.row.m2" :disabled="!scope.row.m2">
                            <el-option v-for="(item,index) in yjztoptions" :key="index" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </template>
                </el-table-column>
                <el-table-column prop="m3" label="三月" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <el-select suffix-icon="el-icon-date" v-model="scope.row.m3" :disabled="!scope.row.m3">
                            <el-option v-for="(item,index) in yjztoptions" :key="index" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </template>
                </el-table-column>
                <el-table-column prop="m4" label="四月" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <el-select suffix-icon="el-icon-date" v-model="scope.row.m4" :disabled="!scope.row.m4">
                            <el-option v-for="(item,index) in yjztoptions" :key="index" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </template>
                </el-table-column>
                <el-table-column prop="m5" label="五月" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <el-select suffix-icon="el-icon-date" v-model="scope.row.m5" :disabled="!scope.row.m5">
                            <el-option v-for="(item,index) in yjztoptions" :key="index" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </template>
                </el-table-column>
                <el-table-column prop="m6" label="六月" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <el-select suffix-icon="el-icon-date" v-model="scope.row.m6" :disabled="!scope.row.m6">
                            <el-option v-for="(item,index) in yjztoptions" :key="index" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </template>
                </el-table-column>
                <el-table-column prop="m7" label="七月" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <el-select suffix-icon="el-icon-date" v-model="scope.row.m7" :disabled="!scope.row.m7">
                            <el-option v-for="(item,index) in yjztoptions" :key="index" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </template>
                </el-table-column>
                <el-table-column prop="m8" label="八月" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <el-select suffix-icon="el-icon-date" v-model="scope.row.m8" :disabled="!scope.row.m8">
                            <el-option v-for="(item,index) in yjztoptions" :key="index" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </template>
                </el-table-column>
                <el-table-column prop="m9" label="九月" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <el-select suffix-icon="el-icon-date" v-model="scope.row.m9" :disabled="!scope.row.m9">
                            <el-option v-for="(item,index) in yjztoptions" :key="index" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </template>
                </el-table-column>
                <el-table-column prop="m10" label="十月" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <el-select suffix-icon="el-icon-date" v-model="scope.row.m10" :disabled="!scope.row.m10">
                            <el-option v-for="(item,index) in yjztoptions" :key="index" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </template>
                </el-table-column>
                <el-table-column prop="m11" label="十一" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <el-select suffix-icon="el-icon-date" v-model="scope.row.m11" :disabled="!scope.row.m11">
                            <el-option v-for="(item,index) in yjztoptions" :key="index" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </template>
                </el-table-column>
                <el-table-column prop="m12" label="十二" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <el-select suffix-icon="el-icon-date" v-model="scope.row.m12" :disabled="!scope.row.m12">
                            <el-option v-for="(item,index) in yjztoptions" :key="index" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </template>
                </el-table-column>
                <el-table-column prop="address" label="操作" width="200">
                    <template slot-scope="scope">
                        <el-button size="mini" type="primary" @click="yjEdit(scope.row)">编辑</el-button>
                        <el-button size="mini" type="primary" @click="xgjlClick(scope.row)">修改记录</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="wdjsDeil" v-show="xgjlTable" style="margin-top:40px;">
            <div class="capit-tit">
                <el-row>
                    <el-col :span="24">
                        <div class="user-left">
                            <span class="capit-content">修改记录</span>
                            <!-- <el-button v-show="ctIndex>0" size="mini" type="warning" style="float:right;margin:5px 20px 0 0;" @click="backSyb2">返回</el-button> -->
                        </div>
                    </el-col>
                </el-row>
            </div>
            <el-table :data="xgjldateList" stripe border style="width: 100%">
                <el-table-column prop="lrr" label="修改人" show-overflow-tooltip></el-table-column>
                <el-table-column prop="lrsj" label="修改时间" :formatter="sjDic" show-overflow-tooltip></el-table-column>
                <el-table-column prop="xgyy" label="修改原因" show-overflow-tooltip></el-table-column>

            </el-table>
        </div>
        <el-dialog :title="textTit2" :visible.sync="newModal" :before-close="btn_cancel">
            <div class="dict-content">
                <el-form :inline="true" :model="editObj" class="demo-form-inline" label-width="120px">
                    <el-row>
                        <el-col :span="23">
                            <el-form-item label="修改原因">
                                <el-input type="textarea" v-model.trim="editObj.bz" :rows="5" placeholder="修改原因"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
            <div class="footerBox">
                <span slot="footer" class="dialog-footer">
                    <button size="small" class="save" @click="btn_bjSave">保 存</button>
                    <button @click="btn_cancel" size="small" class="cancel">取 消</button>
                </span>
            </div>
        </el-dialog>
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
    </div>
</template>
<script>
import { wdjsDetillQuery, yjbjUpdate, xgjlQuery } from "@/api/ldst";
import { getDicTab } from "@/utils/config";
import { formatDate } from "@/utils/data";
import { doCreate, moreMenu } from "@/utils/config";
import { treeQuery } from "@/api/administrative";
import { treeQueryBm } from "@/api/department";
export default {
    data() {
        return {
            title: "预警状态编辑",
            textTit2: "编辑",
            seatch_xzqh: "",
            seatch_bm: "",
            seatch_year: "",
            tabList: [],
            dateList: [],
            yddateList: [],
            jddateList: [],
            bndateList: [],
            nddateList: [],
            xgjldateList: [],
            ctIndex: 0,
            newModalToggle: true,
            newModal: false,
            xgjlTable: false,
            editObj: {},
            ctLevel: {
                0: "2"
            },
            ctCode: {
                0: ""
            },
            xzqh_model: false,
            bm_model: false,
            bmbm: "",
            xzqh: "",
            xzqh_data: [],
            bm_data: [],
            ndoptions: [],
            model_Tit: "",
            userXzqh: "",
            xmyj: true,
            ndyj: false,
            bnyj: false,
            jdyj: false,
            ydyj: false
        };
    },
    props: {},
    watch: {},
    methods: {
        yjplDic(row) {
            return getDicTab("yjpl", row.yjpl);
        },
        sjDic(row) {
            return formatDate(row.lrsj, "yyyy-MM-dd");
        },
        nodeClick(data) {
            this.xzqh = data.bm;
            this.seatch_xzqh = data.name;
            this.seatch_bm = "";
            this.xzqh_model = false;
            this.bm_model = false;
        },
        bmnodeClick(data) {
            this.bmbm = data.xzqhBm;
            this.seatch_bm = data.name;
            this.xzqh_model = false;
            this.bm_model = false;
        },
        xzqhClose() {
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
                        this.xzqh_model = true;
                        if (data.success) {
                            _this.xzqh_data = data.data;
                            // _this.$refs.multipleTable.toggleRowSelection(_this.xzqh,true);
                        }
                    });
                } else if (data == "bm") {
                    if (this.seatch_xzqh) {
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
                this.bm_model = true;
                if (data.success) {
                    this.bm_data = data.data;
                }
            });
        },
        CdDic(val) {
            return getDicTab("cd", val);
        },
        tableList() {
            if (this.xzqh == "" || this.bmbm == "") {
                this.$message({
                    type: "warning",
                    message: "请选择行政区划和部门编码"
                });
                return;
            }
            let obj = {
                year: this.seatch_year,
                code: this.ctCode[this.ctIndex],
                level: this.ctLevel[this.ctIndex],
                xzqh: this.xzqh,
                bm: this.bmbm,
                edit: "edit"
            };
            wdjsDetillQuery(obj).then(res => {
                let data = res.data;
                let arr = [];
                if (data.success) {
                    if (data.data.data.length) {
                        arr = data.data.data.map(i => {
                            i.pId = i.cdbm.substring(0, 2);
                            return i;
                        });
                        this.tabList = arr;
                        this.combineCell(this.tabList);
                    } else {
                        this.ctIndex--;
                    }
                }
            });
        },
        tableListyjbj() {
            if (this.xzqh == "" || this.bmbm == "") {
                this.$message({
                    type: "warning",
                    message: "请选择行政区划和部门编码"
                });
                return;
            }
            let obj = {
                year: this.seatch_year,
                code: this.ctCode[this.ctIndex],
                level: this.ctLevel[this.ctIndex],
                xzqh: this.xzqh,
                bm: this.bmbm,
                edit: "edit"
            };
            wdjsDetillQuery(obj).then(res => {
                let data = res.data;
                let arr = [];
                if (data.success) {
                    if (data.data.data.length) {
                        if (data.data.data[0].yjpl == "1") {
                            this.yddateList = data.data.data;
                        } else if (data.data.data[0].yjpl == "2") {
                            this.jddateList = data.data.data;
                        } else if (data.data.data[0].yjpl == "3") {
                            this.bndateList = data.data.data;
                        } else if (data.data.data[0].yjpl == "4") {
                            this.nddateList = data.data.data;
                        }
                    } else {
                        this.ctIndex--;
                    }
                }
            });
        },
        combineCell(list) {
            for (let field in list[0]) {
                let k = 0;
                while (k < list.length) {
                    list[k][field + "span"] = 1;
                    list[k][field + "dis"] = false;
                    for (var i = k + 1; i <= list.length - 1; i++) {
                        if (
                            list[k][field] == list[i][field] &&
                            list[k][field] != ""
                        ) {
                            list[k][field + "span"]++;
                            list[k][field + "dis"] = false;
                            list[i][field + "span"] = 1;
                            list[i][field + "dis"] = true;
                        } else {
                            break;
                        }
                    }
                    k = i;
                }
            }
            return list;
        },
        xgjlTableList(row) {
            let obj = {
                yjxxId: row.id
            };
            xgjlQuery(obj).then(res => {
                let data = res.data;
                if (data.success) {
                    this.xgjldateList = data.data.data;
                }
            });
        },
        yjEdit(row) {
            this.newModal = true;
            this.editObj = Object.assign({}, row);
            this.editObj.bz = "";
        },
        xgjlClick(row) {
            this.xgjlTable = true;
            this.xgjlTableList(row);
        },
        backSyb() {
            delete this.ctLevel[this.ctIndex];
            delete this.ctCode[this.ctIndex];
            this.ctIndex--;
            this.tableList();
        },
        backSyb2() {
            this.ydyj = false;
            this.jdyj = false;
            this.bnyj = false;
            this.ndyj = false;
            this.xmyj = true;
            this.tableList();
            this.xgjlTable = false;
        },
        ctClick(val) {
            if (val.yjpl) {
                if (val.yjpl == "1") {
                    this.ydyj = true;
                    this.xmyj = false;
                } else if (val.yjpl == "2") {
                    this.jdyj = true;
                    this.xmyj = false;
                } else if (val.yjpl == "3") {
                    this.bnyj = true;
                    this.xmyj = false;
                } else if (val.yjpl == "4") {
                    this.ndyj = true;
                    this.xmyj = false;
                }
                this.tableListyjbj();
            } else {
                this.ctIndex++;
                this.ctLevel[this.ctIndex] = val.cdbm.length / 2 + 1;
                this.ctCode[this.ctIndex] = val.cdbm;
                this.tableList();
            }
        },
        btn_cancel() {
            this.newModal = false;
        },
        btn_bjSave() {
            let obj = this.editObj;
            yjbjUpdate(obj).then(res => {
                let data = res.data;
                if (data.success) {
                    this.$message({
                        message: data.msg,
                        type: "success"
                    });
                    this.tableListyjbj();
                    this.btn_cancel();
                    this.xgjlTable = false;
                }
            });
        }
    },
    mounted() {
        // this.tableList();
        this.ndoptions = doCreate("nd");
        this.yjztoptions = doCreate("yjzt");
        this.seatch_year = new Date().getFullYear();
    }
};
</script>
<style lang="scss" scoped>
.WarningToedit {
    table {
        border-collapse: collapse;
        overflow: hidden;
        thead {
            tr {
                background-color: #fff;
                th {
                    height: 5vh;
                    line-height: 5vh;
                    text-align: center;
                    color: #606266;
                    font-size: 0.8vw;
                    font-weight: 900;
                    span {
                        display: inline-block;
                        margin-top: 1vh;
                    }
                }
            }
        }
        .hidden {
            display: none;
        }
        .pointerClass {
            cursor: pointer;
        }
    }
    table,
    table tr th,
    table tr td {
        border: 1px solid #ebeef5;
    }
    tbody {
        tr {
            td {
                height: 6vh;
                line-height: 6vh;
                font-size: 0.8vw;
                color: #606266;
                text-align: center;
            }
        }
    }
    .yjGreen {
        color: transparent;
        background: #0e841f;
        width: 20px !important;
        height: 20px !important;
        border-radius: 10px;
        box-shadow: 0px 0px 10px #0e841f;
        font-size: 0;
    }
    .yjBlue {
        color: transparent;
        background: #d7b515;
        width: 20px !important;
        height: 20px !important;
        border-radius: 10px;
        box-shadow: 0px 0px 10px #d7b515;
        font-size: 0;
    }
    .yjYellow {
        color: transparent;
        background: #df5307;
        width: 20px !important;
        height: 20px !important;
        border-radius: 10px;
        box-shadow: 0px 0px 10px #df5307;
        font-size: 0;
    }
    .yjRed {
        color: transparent;
        background: #d70000;
        width: 20px !important;
        height: 20px !important;
        border-radius: 10px;
        box-shadow: 0px 0px 10px #d70000;
        font-size: 0;
    }
}
</style>
<style lang="scss">
</style>

