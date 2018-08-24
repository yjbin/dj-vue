<template>
    <div class="xxxjpzsjzylsqk">
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
                        <el-option v-for="(item,index) in monthoptions" :key="index" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="主讲人">
                    <el-input placeholder="主讲人" prefix-icon="el-icon-search" v-model.trim="seatch_zjr"></el-input>
                </el-form-item>
                <el-form-item label="学习主题">
                    <el-input placeholder="学习主题" prefix-icon="el-icon-search" v-model.trim="seatch_xxzt"></el-input>
                </el-form-item>
                <el-form-item>
                    <button type="primary" @click="ListQuery" class="topQuery">搜索</button>
                    <button v-show="remarkHq()=='czy'" type="success" @click="fileAdd" class="topQuery">添加记录</button>
                </el-form-item>
            </el-form>
            <div class="capit-tit">
                <el-row>
                    <el-col :span="12">
                        <div class="user-left">
                            <span>落实情况</span>
                        </div>
                    </el-col>
                </el-row>
            </div>
            <div class="capit-list">
                <el-table :data="dateList" stripe border style="width: 100%" @selection-change="checkboxChange">
                    <!-- <el-table-column type="selection"></el-table-column> -->
                    <el-table-column type="index" :index="indexMethod" label="序号" width="80"></el-table-column>
                    <el-table-column prop="xzqh" label="行政区划" :formatter="xzqhDic" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="bm" label="部门" :formatter="bmbmDic" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="year" label="年度" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="month" label="月份" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="xxzt" label="学习主题" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="xxsj" label="学习时间" :formatter="xxsjDic" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="xxdd" label="地点" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="jlr" label="记录人" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="zjr" label="主讲人" show-overflow-tooltip></el-table-column>
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
                                    <el-form-item label="年度" prop="year">
                                        <el-select v-model="editObj.year" placeholder="请选择" style="width:100%">
                                            <el-option v-for="(item,index) in ndoptions" :key="index" :label="item.label" :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="11" :offset="1">
                                    <el-form-item label="月份" prop="month">
                                        <el-select v-model="editObj.month" placeholder="请选择" style="width:100%">
                                            <el-option v-for="(item,index) in monthoptions" :key="index" :label="item.label" :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="11">
                                    <el-form-item label="时间" prop="xxsj">
                                        <el-date-picker v-model="editObj.xxsj" type="date" value-format="timestamp" placeholder="学习时间"></el-date-picker>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="11" :offset="1">
                                    <el-form-item label="地点" prop="xxdd">
                                        <el-input v-model.trim="editObj.xxdd" placeholder="学习地点"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="11">
                                    <el-form-item label="主讲人" prop="zjr">
                                        <el-input v-model.trim="editObj.zjr" placeholder="主讲人"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="11" :offset="1">
                                    <el-form-item label="参加人员" prop="cyry">
                                        <el-input v-model.trim="editObj.cyry" placeholder="参加人员"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="11">
                                    <el-form-item label="应到人数" label-width="121px" prop="ydrs">
                                        <el-input v-model.trim="editObj.ydrs" placeholder="应到人数"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="11" :offset="1">
                                    <el-form-item label="实到人数" prop="sdrs">
                                        <el-input v-model.trim="editObj.sdrs" placeholder="实到人数"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="11">
                                    <el-form-item label="缺席人" prop="qxr">
                                        <el-input v-model.trim="editObj.qxr" placeholder="缺席人（无缺席人员可不填）"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="11" :offset="1">
                                    <el-form-item label="缺席原因" prop="qxyy">
                                        <el-input v-model.trim="editObj.qxyy" placeholder="缺席原因（无缺席人员可不填）"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="11">
                                    <el-form-item label="学习主题" prop="xxzt">
                                        <el-input v-model.trim="editObj.xxzt" placeholder="学习主题"></el-input>
                                    </el-form-item>
                                </el-col>
                                <!-- <el-col :span="11" :offset="1">
                                    <el-form-item label="学习内容" prop="xxnr">
                                        <el-input v-model="editObj.xxnr" placeholder="学习内容"></el-input>
                                    </el-form-item>
                                </el-col> -->
                            </el-row>
                            <el-row>
                                <el-col :span="11">
                                    <el-form-item label="记录人" prop="jlr">
                                        <el-input v-model.trim="editObj.jlr" placeholder="记录人"></el-input>
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
                                    <el-form-item label="部门" prop="bm">
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
                                    <el-button type="success" size="small" @click="fileClick('xxnr')">学习内容（附件）</el-button>
                                </el-col>
                            </el-row>
                        </el-form>
                    </div>
                    <div class="footerBox">
                        <span slot="footer" class="dialog-footer">
                            <button v-show="activeShow" class="save" @click="btn_fileSave">保 存</button>
                            <button @click="btn_cancel" class="cancel">取 消</button>
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
import { validPasInt, validName } from "@/utils/validate";
import { dateQuery, dateAdd, dateUpdate, dateDel } from "@/api/sxjs/xxb";
export default {
    components: {
        accessoryModel,
        applyrModifying
    },
    data() {
        const validNames = (rule, value, callback) => {
            if (!validName(value)) {
                callback(new Error("请输入正确的姓名~^~^~"));
            } else {
                callback();
            }
        };
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
            hasFileShow: "",
            hasFile: false,
            seatch_zjr: "",
            seatch_xxzt: "",
            seatch_month: "",
            seatch_nd: "",
            textTit: "",
            pageTit: "",
            newModal: false,
            activeShow: true,
            pageSize: 10,
            pageNo: 1,
            totalCount: 0,
            ndoptions: [],
            monthoptions: [],
            bmbmoptions: [],
            xzqhoptions: [],
            editObj: {
                xxsj: "",
                xxdd: "",
                cyry: "",
                ydrs: "",
                sdrs: "",
                jlr: "",
                zjr: "",
                xxzt: "",
                xxfa: "",
                xxnr: ""
            },
            dateList: [],
            fwztoptions: [],
            multipleSelection: [],
            accessoryModalInt: false,
            upShowhide: true,
            textTitFile: "",
            fileSrc: "",
            rulesFile: {
                xxsj: [{ required: true, message: "不能为空" }],
                xxdd: [{ required: true, message: "不能为空" }],
                cyry: [{ required: true, message: "不能为空" }],
                ydrs: [{ required: true, validator: validNum }],
                sdrs: [{ required: true, validator: validNum }],
                jlr: [{ required: true, validator: validNames }],
                zjr: [{ required: true, validator: validNames }],
                xxzt: [{ required: true, message: "不能为空" }],
                year: [{ required: true, message: "不能为空" }],
                month: [{ required: true, message: "不能为空" }],
                xxnr: [{ required: true, message: "不能为空" }]
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
        xxsjDic(row) {
            return formatDate(row.xxsj, "yyyy-MM-dd");
        },
        xzqhDic(row) {
            return getDicTab("xzqh", row.xzqh);
        },
        bmbmDic(row) {
            return getDicTab("bmbm", row.bm);
        },
        btn_cancel() {
            this.newModal = false;
            this.$refs.editObj.resetFields();
        },
        indexMethod(index) {
            let start = (this.pageNo - 1) * this.pageSize;
            return start + index + 1;
        },

        fileAdd() {
            this.newModal = true;
            this.textTit = "新增";
            this.activeShow = true;
            this.editObj = {};
            if (this.$refs.editObj) {
                this.$refs.editObj.resetFields();
            }
            this.FormInt();
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
                bm: this.$store.state.user.user.uUser.bmbm,
                xzqh: this.$store.state.user.user.uUser.xzqh,
                xxlx: "2",
                remark:this.$store.state.user.user.uRole.remark
            };
            this.seatch_zjr ? (obj.zjr = this.seatch_zjr) : "";
            this.seatch_xxzt ? (obj.xxzt = this.seatch_xxzt) : "";
            this.seatch_nd ? (obj.year = this.seatch_nd) : "";
            this.seatch_month ? (obj.month = this.seatch_month) : "";
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
                    if (this.editObj.ydrs >= this.editObj.sdrs) {
                        let _this = this;
                        let obj = Object.assign({}, this.editObj);
                        obj.lrrId = this.$store.state.user.user.uUser.id;
                        obj.xxlx = "2";
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
                    } else {
                        this.$message({
                            message: "应到人数应大于实际人数",
                            type: "warning"
                        });
                        return false;
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
            let nowDate = new Date().getTime();
            this.editObj.bm = this.$store.state.user.user.uUser.bmbm;
            this.editObj.xzqh = this.$store.state.user.user.uUser.xzqh;
            this.editObj.lrr = this.$store.state.user.user.uUser.nickname;
            this.editObj.lrsj = nowDate;
        }
    },
    mounted() {
        this.ListQuery();
        this.monthoptions = doCreate("month");
        this.ndoptions = doCreate("nd");
        this.fwztoptions = doCreate("fwzt");
        this.xzqhoptions = doCreate("xzqh");
        this.bmbmoptions = doCreate("bmbm");
    }
};
</script>
<style lang="scss" scoped>
.xxxjpzsjzylsqk {
    .capit-tit {
        .user-left {
            span {
                color: #fff;
                display: inline-block;
                text-align: center;
                cursor: pointer;
                margin: 10px 20px;
            }
        }
    }
}
</style>

