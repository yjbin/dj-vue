<template>
    <div class="rrhs">
        <div v-show="applyXg">
            <el-form :inline="true" class="demo-form-inline">
                <el-form-item label="宣传形式">
                    <el-select suffix-icon="el-icon-date" clearable v-model="seatch_xcxs">
                        <el-option v-for="(item,index) in xcxsqhoptions" :key="index" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <!-- <el-form-item label="软弱涣散党组织名称">
                    <el-input placeholder="软弱涣散党组织名称" prefix-icon="el-icon-search" v-model.trim="seatch_name"></el-input>
                </el-form-item> -->
                <el-form-item>
                    <button @click="ListQuery" class="topQuery">搜索</button>
                    <button v-show="remarkHq()=='czy'" @click="fileAdd" class="topQuery">添加记录</button>
                </el-form-item>
            </el-form>
            <div class="capit-tit">
                <el-row>
                    <el-col :span="12">
                        <div class="user-left">
                            <span class="capit-content">网络安全学习宣传</span>
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
                    <el-table-column prop="xcsj" label="宣传时间" :formatter="sjDic" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="xcxs" label="宣传形式" :formatter="xcxsDic" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="xcdd" label="宣传地点" show-overflow-tooltip></el-table-column>
                    <el-table-column label="操作" width="250">
                        <template slot-scope="scope">
                            <el-button size="mini" type="primary" @click="fileEdit(scope.row)">{{((scope.row.sqzt=='3' && sfdqyh(scope.row))?'编辑':'查看')}}</el-button>
                            <el-button v-if="scope.row.sqzt=='1'" size="mini" type="primary" @click="applyClick(scope.row)">申请</el-button>
                            <el-button v-if="scope.row.sqzt=='2'" size="mini" type="primary" @click="applyClick(scope.row)">申请中</el-button>
                            <el-button v-if="scope.row.sqzt=='3'" size="mini" type="primary" @click="applyClick(scope.row)">通过</el-button>
                            <el-button v-if="scope.row.sqzt=='-1'" size="mini" type="primary" @click="applyClick(scope.row)">驳回</el-button>
                            <el-button size="mini" v-show="remarkHq()=='admin'" type="danger" @click="listDel(scope.row)">删除</el-button>
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
                                    <el-form-item label="宣传形式" prop="xcxs">
                                        <el-select v-model="editObj.xcxs" placeholder="请选择" style="width:100%">
                                            <el-option v-for="(item,index) in xcxsqhoptions" :key="index" :label="item.label" :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="11" :offset="1">
                                    <el-form-item label="宣传时间" prop="xcsj">
                                        <el-date-picker v-model="editObj.xcsj" type="date" value-format="timestamp" placeholder="宣传时间"></el-date-picker>
                                    </el-form-item>
                                </el-col>
                            </el-row>

                            <el-row>
                                <el-col :span="11">
                                    <el-form-item label="宣传地点" prop="xcdd">
                                        <el-input v-model.trim="editObj.xcdd" placeholder="宣传地点"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="11" :offset="1">
                                    <el-form-item label="参与人数" prop="cyrs">
                                        <el-input v-model.number="editObj.cyrs" placeholder="参与人数"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="23">
                                    <el-form-item label="参与人员" prop="cyry">
                                        <el-input type="textarea" v-model.trim="editObj.cyry" placeholder="成员"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="23">
                                    <el-form-item label="宣传内容" prop="xcnr">
                                        <el-input type="textarea" v-model.trim="editObj.xcnr" placeholder="宣传内容"></el-input>
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
                                    <el-button type="success" size="small" @click="fileClick('xctp')">宣传图片(附件)</el-button>
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
import { doCreate, getDicTab, moreMenu, remark } from "@/utils/config";
import { formatDate } from "@/utils/data";
import { dateQuery, dateAdd, dateUpdate, dateDel } from "@/api/sxjs/wlaqxxxc";
import { validPasInt } from "@/utils/validate";
export default {
    components: {
        accessoryModel,
        applyrModifying
    },
    data() {
        const validNum = (rule, value, callback) => {
            if (!validPasInt(value)) {
                callback(new Error("请输入正确的人数~^~^~"));
            } else {
                callback();
            }
        };
        return {
            applyXg: true,
            applyCode: {},
            seatch_xcxs: "",
            seatch_name: "",
            textTit: "",
            pageTit: "",
            newModal: false,
            activeShow: true,
            pageSize: 10,
            pageNo: 1,
            totalCount: 0,
            // ndoptions: [],
            bmbmoptions: [],
            xzqhoptions: [],
            xcxsqhoptions: [],
            editObj: {
                cyrs: ""
            },
            dateList: [],
            fwztoptions: [],
            multipleSelection: [],
            accessoryModalInt: false,
            upShowhide: true,
            textTitFile: "",
            fileSrc: "",
            rulesFile: {
                xcxs: [{ required: true, message: "不能为空" }],
                xcsj: [{ required: true, message: "不能为空" }],
                xcdd: [{ required: true, message: "不能为空" }],
                xcnr: [{ required: true, message: "不能为空" }],
                cyry: [{ required: true, message: "不能为空" }],
                cyrs: [{ required: true, validator: validNum }]
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
            this.ListQuery();
        },
        applyClick(row) {
            this.applyXg = false;
            this.applyCode = Object.assign({}, row);
        },
        xzqhDic(row) {
            return getDicTab("xzqh", row.xzqh);
        },
        bmbmDic(row) {
            return getDicTab("bmbm", row.bm);
        },
        xcxsDic(row) {
            return getDicTab("xcxs", row.xcxs);
        },
        sjDic(row) {
            return formatDate(row.xcsj, "yyyy-MM-dd");
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
            this.activeShow = true;
            this.FormInt();
            if (this.$refs.editObj) {
                this.$refs.editObj.resetFields();
            }
        },
        fileEdit(row) {
            this.newModal = true;
            if (row.sqzt == "3" && this.sfdqyh(row)) {
                this.textTit = "编辑";
                this.activeShow = true;
            } else {
                this.textTit = "查看";
                this.activeShow = false;
            }
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
                xclx: "1",
                bm: this.$store.state.user.user.uUser.bmbm,
                xzqh: this.$store.state.user.user.uUser.xzqh,
                remark:this.$store.state.user.user.uRole.remark
            };
            // this.seatch_nd ? (obj.seatch_nd = this.seatch_nd) : "";
            this.seatch_xcxs ? (obj.xcxs = this.seatch_xcxs) : "";
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
                    obj.xclx = "1";
                    obj.sqzt = "1";
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
        // this.ndoptions = doCreate("ndTit");
        this.xzqhoptions = doCreate("xzqh");
        this.bmbmoptions = doCreate("bmbm");
        this.xcxsqhoptions = doCreate("xcxs");
    }
};
</script>

