<template>
    <div class="rrhs">
        <el-form :inline="true" class="demo-form-inline">
            <el-form-item label="年度">
                <el-select suffix-icon="el-icon-date" v-model="seatch_year" clearable>
                    <el-option v-for="(item,index) in ndoptions" :key="index" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <!-- <el-form-item label="党组织负责人">
                <el-input placeholder="党组织负责人" prefix-icon="el-icon-search" v-model.trim="seatch_fzr"></el-input>
            </el-form-item>
            <el-form-item label="包联领导人">
                <el-input placeholder="包联领导人" prefix-icon="el-icon-search" v-model.trim="seatch_blld"></el-input>
            </el-form-item> -->
            <el-form-item>
                <button @click="ListQuery" class="topQuery">搜索</button>
                <button @click="fileAdd" class="topQuery">添加记录</button>
            </el-form-item>
        </el-form>
        <div class="capit-tit">
            <el-row>
                <el-col :span="12">
                    <div class="user-left">
                        <span class="capit-content">问题清单</span>
                    </div>
                </el-col>
            </el-row>
        </div>
        <div class="capit-list">
            <el-table :data="dateList" stripe border style="width: 100%" @selection-change="checkboxChange">
                <!-- <el-table-column type="selection"></el-table-column> -->
                <el-table-column type="index" :index="indexMethod" label="序号" width="80"></el-table-column>
                <el-table-column prop="xzqh" label="行政区划" :formatter="xzqhDic" show-overflow-tooltip></el-table-column>
                <el-table-column prop="bm" label="部门处室" :formatter="bmbmDic" show-overflow-tooltip></el-table-column>
                <el-table-column prop="year" label="年度" show-overflow-tooltip></el-table-column>
                <el-table-column prop="wtqd" label="问题清单" show-overflow-tooltip></el-table-column>
                <el-table-column prop="xsly" label="线索来源" :formatter="xslyDic" show-overflow-tooltip></el-table-column>
                <el-table-column prop="jsXzqh" label="接收行政区划" :formatter="xzqhDic2" show-overflow-tooltip></el-table-column>
                <el-table-column prop="jsBm" label="接收部门" :formatter="bmbmDic2" show-overflow-tooltip></el-table-column>
                <el-table-column prop="address" label="操作" width="200">
                    <template slot-scope="scope">
                        <el-button size="mini" type="primary" @click="fileEdit(scope.row)">编辑</el-button>
                        <el-button size="mini" type="danger" @click="listDel(scope.row)" :disabled="(scope.row.zt=='1'?false:true)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="user-page fr">
                <el-pagination @current-change="handleCurrentChange" :current-page.sync="pageNo" :page-size="pageSize" layout="total, prev, pager, next" :total="totalCount">
                </el-pagination>
            </div>
            <el-dialog :title="textTit" :visible.sync="newModal" :before-close="btn_cancel">
                <div class="dict-content">
                    <el-form :inline="true" :model="editObj" ref="editObj" class="demo-form-inline" label-width="120px" :rules="rulesFile">
                        <el-row>

                            <el-col :span="11">
                                <el-form-item label="年度" prop="year">
                                    <el-select v-model="editObj.year" placeholder="请选择" style="width:100%">
                                        <el-option v-for="(item,index) in ndoptions" :key="index" :label="item.label" :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="11" :offset="1">
                                <el-form-item label="线索来源" prop="xsly">
                                    <el-select v-model="editObj.xsly" placeholder="请选择" style="width:100%">
                                        <el-option v-for="(item,index) in xslyoptions" :key="index" :label="item.label" :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="11">
                                <el-form-item label="接收行政区划" prop="jsXzqh">
                                    <el-input v-model="editObj.jsXzqh" placeholder="接收行政区划" @focus="modelStatus('xzqh')"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="11" :offset="1">
                                <el-form-item label="接收部门" prop="jsBm">
                                    <el-input v-model="editObj.jsBm" placeholder="接收部门" @focus="modelStatus('bm')"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="23">
                                <el-form-item label="问题清单" prop="wtqd">
                                    <el-input type="textarea" :autosize="{ minRows: 4 }" v-model.trim="editObj.wtqd" placeholder="问题清单"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="11">
                                <el-form-item label="行政区划" prop="xzqh">
                                    <el-select v-model="editObj.xzqh" placeholder="请选择" style="width:100%" :disabled="true">
                                        <el-option v-for="(item,index) in xzqhoptions" :key="index" :label="item.label" :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="11" :offset="1">
                                <el-form-item label="部门科室" prop="bm">
                                    <el-select v-model="editObj.bm" placeholder="请选择" style="width:100%" :disabled="true">
                                        <el-option v-for="(item,index) in bmbmoptions" :key="index" :label="item.label" :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="11">
                                <el-form-item label="录入人" prop="lrr">
                                    <el-input v-model="editObj.lrr" placeholder="录入人" :disabled="true"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="11" :offset="1">
                                <el-form-item label="录入时间" prop="lrsj">
                                    <el-date-picker v-model="editObj.lrsj" type="datetime" value-format="timestamp" placeholder="录入时间" :disabled="true"></el-date-picker>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="20" :offset="3">
                                <el-button type="success" size="small" @click="fileClick('fj')">附件</el-button>

                            </el-col>
                        </el-row>
                    </el-form>
                </div>
                <div class="footerBox">
                    <span slot="footer" class="dialog-footer">
                        <button v-show="activeShow" size="small" class="save" @click="btn_fileSave">保 存</button>
                        <button @click="btn_cancel" size="small" class="cancel">取 消</button>
                    </span>
                </div>
            </el-dialog>
        </div>
        <accessory-Model :newModal="accessoryModalInt" @colseTog="colseTog" @chileFile="chileFile" :textTitFile="textTitFile" :fileSrc="fileSrc" :upShowhide="activeShow"></accessory-Model>

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
import accessoryModel from "@/components/accessoryModel";
import { doCreate, getDicTab, moreMenu } from "@/utils/config";
import { formatDate } from "@/utils/data";
import { treeQuery } from "@/api/administrative";
import { treeQueryBm } from "@/api/department";
import { dateQuery, dateAdd, dateUpdate, dateDel } from "@/api/jljs/wtqk";
export default {
    components: {
        accessoryModel
    },
    data() {
       
        return {
            seatch_year: "",
            seatch_fzr: "",
            seatch_blld: "",
            textTit: "",
            pageTit: "",
            newModal: false,
            activeShow: true,
            userXzqh: "",
            xzqh_model: false,
            bm_model: false,
            bmbm: "",
            xzqh: "",
            xzqh_data: [],
            bm_data: [],
            model_Tit: "",
            pageSize: 10,
            pageNo: 1,
            totalCount: 0,
            ndoptions: [],
            xslyoptions: [],
            wtlxoptions: [],
            bmbmoptions: [],
            xzqhoptions: [],
            editObj: {
                year: "",
                szr: "",
                szsj: ""
            },
            dateList: [],
            fwztoptions: [],
            multipleSelection: [],
            accessoryModalInt: false,
            upShowhide: true,
            textTitFile: "",
            fileSrc: "",
            rulesFile: {
                year: [{ required: true, message: "不能为空" }],
                xsly: [{ required: true, message: "不能为空" }],
                jsXzqh: [{ required: true, message: "不能为空" }],
                jsBm: [{ required: true, message: "不能为空" }],
                wtqd: [{ required: true, message: "不能为空" }]
            }
        };
    },
    methods: {
        xslyDic(row) {
            return getDicTab("xsly", row.xsly);
        },
        xzqhDic(row) {
            return getDicTab("xzqh", row.xzqh);
        },
        bmbmDic(row) {
            return getDicTab("bmbm", row.bm);
        },
        xzqhDic2(row) {
            return getDicTab("xzqh", row.jsXzqh);
        },
        bmbmDic2(row) {
            return getDicTab("bmbm", row.jsBm);
        },
        btn_cancel() {
            this.newModal = false;
        },
        indexMethod(index) {
            let start = (this.pageNo - 1) * this.pageSize;
            return start + index + 1;
        },
        nodeClick(data) {
            this.xzqh = data.bm;
            this.editObj.jsXzqh = data.name;
            this.editObj.jsBm = "";
            this.xzqh_model = false;
            this.bm_model = false;
        },
        bmnodeClick(data) {
            this.bmbm = data.xzqhBm;
            this.editObj.jsBm = data.name;
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
                    if (this.editObj.jsXzqh) {
                        
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
        fileAdd() {
            this.newModal = true;
            this.textTit = "新增";

            this.FormInt();
            if (this.$refs.editObj) {
                this.$refs.editObj.resetFields();
            }
        },
        fileEdit(row) {
            this.newModal = true;
            this.textTit = "编辑";
            if (this.$refs.editObj) {
                this.$refs.editObj.resetFields();
            }
            if (row.zt == "1") {
                this.activeShow = true;
            } else {
                this.activeShow = false;
            }
            this.xzqh = row.jsXzqh;
            this.bmbm = row.jsBm;
            this.editObj = Object.assign({}, row);
            this.editObj.jsXzqh = getDicTab("xzqh", this.editObj.jsXzqh);
            this.editObj.jsBm = getDicTab("bmbm", this.editObj.jsBm);

        },
        listDel(row) {
            this.$confirm("此操作将删除该数据, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(() => {
                    let obj = {
                        id: row.id
                    };
                    dateDel(obj).then(res => {
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
                        this.ListQuery();
                    });
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消删除"
                    });
                });
        },
        handleCurrentChange(val) {
            this.pageNo = val;
            this.ListQuery();
        },
        ListQuery() {
            let obj = {
                pageNo: this.pageNo,
                pageSize: this.pageSize,
                bm: this.$store.state.user.user.uUser.bmbm,
                xzqh: this.$store.state.user.user.uUser.xzqh
            };
            this.seatch_year ? (obj.year = this.seatch_year) : "";
            dateQuery(obj).then(res => {
                let data = res.data;
                if (data.success) {
                    this.dateList = data.data.data;
                    this.totalCount = data.data.totalCount;
                } else {
                    this.dateList = [];
                    this.totalCount = 0;
                    this.$message({
                        message: data.msg,
                        type: "warning"
                    });
                }
            });
        },
        btn_fileSave() {
            this.$refs.editObj.validate(valid => {
                if (valid) {
                    let _this = this;
                    let obj = Object.assign({}, this.editObj);
                    obj.lrrId = this.$store.state.user.user.uUser.id;
                    obj.jsXzqh = this.xzqh;
                    obj.jsBm = this.bmbm;
                    if (this.editObj.id) {
                        dateUpdate(obj).then(res => {
                            let data = res.data;
                            if (data.success) {
                                _this.btn_cancel();
                                _this.$message({
                                    message: data.msg,
                                    type: "success"
                                });
                                _this.ListQuery();
                            } else {
                                this.$message({
                                    message: data.msg,
                                    type: "warning"
                                });
                            }
                        });
                    } else {
                        dateAdd(obj).then(res => {
                            let data = res.data;
                            if (data.success) {
                                _this.btn_cancel();
                                this.$message({
                                    message: data.msg,
                                    type: "success"
                                });
                                _this.ListQuery();
                            } else {
                                this.$message({
                                    message: data.msg,
                                    type: "warning"
                                });
                            }
                        });
                    }
                }
            });
        },
        checkboxChange(val) {
            this.multipleSelection = val;
        },
        colseTog(val) {
            this.accessoryModalInt = val;
        },
        chileFile(val) {
            let zd = val.zdName;
            this.editObj[zd] = val.newSrcstr;
        },
        fileClick(val) {
            this.accessoryModalInt = true;
            this.textTitFile = "附件";
            this.fileSrc = {
                num: Math.random(),
                fileStr: this.editObj[val],
                zdName: val
            };
        },
        FormInt() {
            this.editObj = {};
            let nowDate = new Date().getTime();
            this.editObj.bm = this.$store.state.user.user.uUser.bmbm;
            this.editObj.xzqh = this.$store.state.user.user.uUser.xzqh;
            this.editObj.lrr = this.$store.state.user.user.uUser.nickname;
            this.editObj.lrsj = nowDate;
        }
    },
    mounted() {
        this.ListQuery();
        this.ndoptions = doCreate("nd");
        this.xslyoptions = doCreate("xsly");
        this.wtlxoptions = doCreate("wtlx");
        this.fwztoptions = doCreate("fwzt");
        this.xzqhoptions = doCreate("xzqh");
        this.bmbmoptions = doCreate("bmbm");
    }
};
</script>

