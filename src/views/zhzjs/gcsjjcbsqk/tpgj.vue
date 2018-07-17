
<template>
    <div class="rrhs">
        <el-form :inline="true" class="demo-form-inline">
            <el-form-item label="年度">
                <el-select suffix-icon="el-icon-date" v-model="seatch_nd" clearable>
                    <el-option v-for="(item,index) in ndoptions" :key="index" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <!-- <el-form-item label="软弱涣散党组织名称">
                <el-input placeholder="软弱涣散党组织名称" prefix-icon="el-icon-search" v-model.trim="seatch_name"></el-input>
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
                        <span class="capit-content">脱贫攻坚</span>
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
                <el-table-column prop="nr" label="内容" show-overflow-tooltip></el-table-column>
                <el-table-column prop="address" label="操作" width="260">
                    <template slot-scope="scope">
                        <el-button size="mini" type="primary" @click="fileEdit(scope.row)">编辑</el-button>
                        <el-button size="mini" type="danger" @click="listDel(scope.row)" :disabled="(scope.row.by3=='1'?true:false)">删除</el-button>
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
                                        <el-option v-for="(item,index) in ndoptions2" :key="index" :label="item.label" :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="23">
                                <el-form-item label="活动内容" prop="nr">
                                    <el-input type="textarea" v-model.trim="editObj.nr" :autosize="{ minRows: 4}"></el-input>
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
    </div>
</template>
<script>
import accessoryModel from "@/components/accessoryModel";
import { doCreate, getDicTab, moreMenu } from "@/utils/config";
import { formatDate } from "@/utils/data";
import { dateQuery, dateAdd, dateUpdate, dateDel } from "@/api/zhzjs/bsqk";
export default {
    components: {
        accessoryModel
    },
    data() {
        return {
            seatch_nd: "",
            seatch_name: "",
            textTit: "",
            pageTit: "",
            newModal: false,
            activeShow: true,
            pageSize: 10,
            pageNo: 1,
            totalCount: 0,
            ndoptions: [],
            ndoptions2: [],
            wtlxoptions: [],
            bmbmoptions: [],
            xzqhoptions: [],
            editObj: {
                year: "",
                nr: ""
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
                nr: [{ required: true, message: "不能为空" }]
            }
        };
    },
    methods: {
        xzqhDic(row) {
            return getDicTab("xzqh", row.xzqh);
        },
        bmbmDic(row) {
            return getDicTab("bmbm", row.bm);
        },
        btn_cancel() {
            this.newModal = false;
        },
        indexMethod(index) {
            let start = (this.pageNo - 1) * this.pageSize;
            return start + index + 1;
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
            this.editObj = Object.assign({}, row);
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
                lx: "3",
                bm: this.$store.state.user.user.uUser.bmbm,
                xzqh: this.$store.state.user.user.uUser.xzqh
            };
            this.seatch_nd ? obj.year = this.seatch_nd : "";
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
                    obj.lx = "3";
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
        this.ndoptions = doCreate("ndTit");
        this.ndoptions2 = doCreate("nd");
        this.xzqhoptions = doCreate("xzqh");
        this.bmbmoptions = doCreate("bmbm");
    }
};
</script>

