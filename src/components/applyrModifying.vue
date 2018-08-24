<template>
    <div class="rrhs">
        <div class="capit-tit">
            <el-row>
                <el-col :span="24">
                    <div class="user-left">
                        <span class="capit-content">申请修改列表</span>
                        <el-button size="small" type="warning" style="float:right;margin:3px 20px 0 0;" @click="backBtn">返回</el-button>
                        <el-button v-show="tjsqShow" size="small" type="warning" style="float:right;margin:3px 20px 0 0;" @click="addSq">添加申请</el-button>
                    </div>
                </el-col>
            </el-row>
        </div>
        <div class="capit-list">
            <el-table :data="dateList" stripe border style="width: 100%" @selection-change="checkboxChange">
                <el-table-column type="selection"></el-table-column>
                <el-table-column type="index" :index="indexMethod" label="序号" width="80"></el-table-column>
                <el-table-column prop="sqr" label="申请人" show-overflow-tooltip></el-table-column>
                <el-table-column prop="sqsj" label="申请时间" :formatter="sjDic" show-overflow-tooltip></el-table-column>
                <el-table-column prop="sqyy" label="申请原因" show-overflow-tooltip></el-table-column>
                <el-table-column prop="pfr" label="批复人" show-overflow-tooltip></el-table-column>
                <el-table-column prop="pfsj" label="批复时间" :formatter="sjDic2" show-overflow-tooltip></el-table-column>
                <el-table-column prop="pfjg" label="批复结果" :formatter="jgDic" show-overflow-tooltip></el-table-column>
                <el-table-column label="操作" width="200">
                    <template slot-scope="scope">
                        <el-button v-if="remarkHq()=='jdy'" size="mini" type="primary" @click="applyClick(scope.row)">{{(scope.row.pfjg=="0"||scope.row.pfjg=="1")?"查看":"批复"}}</el-button>
                        <el-button v-else size="mini" type="primary" @click="fileEdit(scope.row)">查看</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="user-page fr">
                <el-pagination @current-change="handleCurrentChange" :current-page.sync="pageNo" :page-size="pageSize" layout="total, prev, pager, next" :total="totalCount">
                </el-pagination>
            </div>
            <div v-show="addAppyl" class="dict-content">
                <div class="capit-tit" style="margin:60px 0 30px 0">
                    <el-row>
                        <el-col :span="24">
                            <div class="user-left">
                                <span class="capit-content">添加申请</span>
                            </div>
                        </el-col>

                    </el-row>
                </div>
                <el-form :inline="true" :model="editObj" ref="editObj" class="demo-form-inline" label-width="120px" :rules="rulesFile">
                    <el-row>
                        <el-col :span="11">
                            <el-form-item label="申请人" prop="sqr">
                                <el-input v-model.trim="editObj.sqr" placeholder="申请人"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="11" :offset="1">
                            <el-form-item label="申请时间" prop="sqsj">
                                <el-date-picker v-model="editObj.sqsj" type="date" value-format="timestamp" placeholder="申请时间"></el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="23">
                            <el-form-item label="申请原因" prop="sqyy">
                                <el-input type="textarea" v-model.trim="editObj.sqyy" placeholder="申请原因"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="11">
                            <el-form-item label="申请录入人" prop="sqLrr">
                                <el-input v-model.trim="editObj.sqLrr" placeholder="申请录入人" :disabled="true"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="11" :offset="1">
                            <el-form-item label="申请录入时间" prop="sqLrsj">
                                <el-date-picker v-model="editObj.sqLrsj" type="datetime" value-format="timestamp" placeholder="录入时间" :disabled="true"></el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
                <div v-show="footerShow" class="footerBox">
                    <span slot="footer" class="dialog-footer">
                        <button size="small" class="save" @click="btn_fileSave">保 存</button>
                    </span>
                </div>
            </div>
            <div v-show="addAppyl2" class="dict-content">
                <div class="capit-tit" style="margin:60px 0 30px 0">
                    <el-row>
                        <el-col :span="24">
                            <div class="user-left">
                                <span class="capit-content">查看</span>
                            </div>
                        </el-col>
                    </el-row>
                </div>
                <el-form :inline="true" :model="editObj2" ref="editObj2" class="demo-form-inline" label-width="120px" :rules="rulesFile2">
                    <el-row>
                        <el-col :span="11">
                            <el-form-item label="申请人" prop="sqr">
                                <el-input v-model="editObj2.sqr" placeholder="申请人"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="11" :offset="1">
                            <el-form-item label="申请时间" prop="sqsj">
                                <el-date-picker v-model="editObj2.sqsj" type="date" value-format="timestamp" placeholder="申请时间"></el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="23">
                            <el-form-item label="申请原因" prop="sqyy">
                                <el-input type="textarea" v-model="editObj2.sqyy" placeholder="申请原因"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="11">
                            <el-form-item label="批复录入人" prop="pfLrr">
                                <el-input v-model="editObj2.pfLrr" placeholder="批复录入人" :disabled="true"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="11" :offset="1">
                            <el-form-item label="批复录入时间" prop="pfLrsj">
                                <el-date-picker v-model="editObj2.pfLrsj" type="datetime" value-format="timestamp" placeholder="批复录入时间" :disabled="true"></el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="11">
                            <el-form-item label="批复人" prop="pfr">
                                <el-input v-model="editObj2.pfr" placeholder="批复人" :disabled="true"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="11" :offset="1">
                            <el-form-item label="批复时间" prop="pfsj">
                                <el-date-picker v-model="editObj2.pfsj" type="date" value-format="timestamp" placeholder="录入时间" :disabled="true"></el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="11">
                            <el-form-item label="批复结果" prop="pfjg">

                                <el-select v-model="editObj2.pfjg" placeholder="请选择" style="width:100%" :disabled="true">
                                    <el-option v-for="(item,index) in pfjgoptions" :key="index" :label="item.label" :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="23">
                            <el-form-item label="批复意见" prop="pfyj">
                                <el-input type="textarea" :autosize="{ minRows: 5 }" v-model="editObj2.pfyj" placeholder="批复意见" :disabled="true"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>

                <div v-show="footerShow2" class="footerBox">
                    <span slot="footer" class="dialog-footer">
                        <button size="small" class="save" v-show="tjsqShow" @click="btn_fileSave2">保 存</button>
                    </span>
                </div>
            </div>
            <div v-show="addAppyl3" class="dict-content">
                <div class="capit-tit" style="margin:60px 0 30px 0">
                    <el-row>
                        <el-col :span="24">
                            <div class="user-left">
                                <span class="capit-content">批复</span>
                            </div>
                        </el-col>

                    </el-row>
                </div>
                <el-form :inline="true" :model="editObj3" ref="editObj3" class="demo-form-inline" label-width="120px" :rules="rulesFile3">
                    <el-row>
                        <el-col :span="11">
                            <el-form-item label="申请人" prop="sqr">
                                <el-input v-model="editObj3.sqr" placeholder="申请人" :disabled="true"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="11" :offset="1">
                            <el-form-item label="申请时间" prop="sqsj">
                                <el-date-picker v-model="editObj3.sqsj" type="date" value-format="timestamp" placeholder="申请时间" :disabled="true"></el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="23">
                            <el-form-item label="申请原因" prop="sqyy">
                                <el-input type="textarea" v-model="editObj3.sqyy" placeholder="申请原因" :disabled="true"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="11">
                            <el-form-item label="批复录入人" prop="pfLrr">
                                <el-input v-model="editObj3.pfLrr" placeholder="批复录入人" :disabled="true"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="11" :offset="1">
                            <el-form-item label="批复录入时间" prop="pfLrsj">
                                <el-date-picker v-model="editObj3.pfLrsj" type="datetime" value-format="timestamp" placeholder="批复录入时间" :disabled="true"></el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="11">
                            <el-form-item label="批复人" prop="pfr">
                                <el-input v-model="editObj3.pfr" placeholder="批复人"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="11" :offset="1">
                            <el-form-item label="批复时间" prop="pfsj">
                                <el-date-picker v-model="editObj3.pfsj" type="date" value-format="timestamp" placeholder="录入时间"></el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="11">
                            <el-form-item label="批复结果" prop="pfjg">

                                <el-select v-model="editObj3.pfjg" placeholder="请选择" style="width:100%">
                                    <el-option v-for="(item,index) in pfjgoptions" :key="index" :label="item.label" :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="23">
                            <el-form-item label="批复意见" prop="pfyj">
                                <el-input type="textarea" :autosize="{ minRows: 5 }" v-model="editObj3.pfyj" placeholder="批复意见"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>

                <div class="footerBox" v-show="footerShow2">
                    <span slot="footer" class="dialog-footer">
                        <button size="small" class="save" @click="btn_fileSave3">保 存</button>
                    </span>
                </div>
            </div>
        </div>
    </div>

</template>
<script>
import { doCreate, getDicTab, moreMenu, remark } from "@/utils/config";
import { formatDate } from "@/utils/data";
import { dateQuery, dateAdd, dateUpdate } from "@/api/applyrModifying";
export default {
    data() {
        return {
            seatch_nd: "",
            seatch_name: "",
            textTit: "",
            pageTit: "",
            newModal: false,
            activeShow: true,
            pfclick: false,
            seeClick: false,
            footerShow2: true,
            footerShow: true,
            addAppyl: false,
            addAppyl2: false,
            addAppyl3: false,
            tjsqShow: false,
            pageSize: 3,
            pageNo: 1,
            totalCount: 0,
            ndoptions: [],
            ndoptions2: [],
            monthoptions: [],
            pfjgoptions: [],
            code: "",

            userXzqh: this.$store.state.user.user.uUser.xzqh,
            userBmbm: this.$store.state.user.user.uUser.bmbm,
            applyTit: "批复",
            editObj: {},
            editObj2: {},
            editObj3: {},
            dateList: [],
            rulesFile: {
                sqr: [{ required: true, message: "不能为空" }],
                sqsj: [{ required: true, message: "不能为空" }],
                sqyy: [{ required: true, message: "不能为空" }]
            },
            rulesFile2: {
                sqr: [{ required: true, message: "不能为空" }],
                sqsj: [{ required: true, message: "不能为空" }],
                sqyy: [{ required: true, message: "不能为空" }]
            },
            rulesFile3: {
                pfr: [{ required: true, message: "不能为空" }],
                pfsj: [{ required: true, message: "不能为空" }],
                pfjg: [{ required: true, message: "不能为空" }]
            }
        };
    },
    props: {
        applyCode: Object
    },
    watch: {
        applyCode: {
            handler: function(val) {
                if (val) {
                    this.code = val.code;
                    this.ListQuery();
                    this.addAppyl = false;
                    this.addAppyl2 = false;
                    this.addAppyl3 = false;
                    if (
                        val.sqzt == "2" ||
                        this.userXzqh != val.xzqh ||
                        this.userBmbm != val.bm || this.remarkHq()!="czy"
                    ) {
                        this.tjsqShow = false;
                    } else {
                        this.tjsqShow = true;
                    }
                }
            },
            deep: true
        },
        gpsTit(val) {
            this.text_Text = val;
        }
    },
    methods: {
        remarkHq() {
            return remark(this);
        },
        sjDic(row) {
            return formatDate(row.sqsj, "yyyy-MM-dd");
        },
        sjDic2(row) {
            return formatDate(row.pfsj, "yyyy-MM-dd");
        },
        jgDic(row) {
            return getDicTab("ysyj", row.pfjg);
        },

        indexMethod(index) {
            let start = (this.pageNo - 1) * this.pageSize;
            return start + index + 1;
        },
        addSq() {
            this.addAppyl = true;
            this.addAppyl2 = false;
            this.addAppyl3 = false;
            if (this.$refs.editObj) {
                this.$refs.editObj.resetFields();
            }
            this.FormInt();
        },
        backBtn() {
            this.newModal = true;
            this.$emit("btnBack", this.newModal);
        },
        fileEdit(row) {
            if (this.$refs.editObj2) {
                this.$refs.editObj2.resetFields();
            }
            this.addAppyl = false;
            this.addAppyl3 = false;
            this.addAppyl2 = true;
            if (row.pfjg == "1" || row.pfjg == "0") {
                this.pfclick = true;
                this.seeClick = true;
                this.footerShow2 = false;
            } else {
                this.pfclick = true;
                this.seeClick = false;
                this.footerShow2 = true;
            }
            this.editObj2 = Object.assign({}, row);
        },
        applyClick(row) {
            this.addAppyl = false;
            this.addAppyl2 = false;
            this.addAppyl3 = true;
            if (row.pfjg == "1" || row.pfjg == "0") {
                this.footerShow2 = false;
            } else {
                this.pfclick = false;
                this.seeClick = true;
                this.footerShow2 = true;
            }
            if (this.$refs.editObj3) {
                this.$refs.editObj3.resetFields();
            }
            this.editObj3 = Object.assign({}, row);
            this.FormInt2();
        },
        handleCurrentChange(val) {
            this.pageNo = val;
            this.ListQuery();
        },
        ListQuery() {
            let obj = {
                pageNo: this.pageNo,
                pageSize: this.pageSize,
                dataId: this.code
            };
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
                    //  obj.sqLrrId = this.$store.state.user.user.uUser.id;
                    obj.dataId = this.code;
                    if (this.editObj.id) {
                        dateUpdate(obj).then(res => {
                            let data = res.data;
                            if (data.success) {
                                this.addAppyl = false;
                                this.addAppyl2 = false;
                                this.addAppyl3 = false;
                                _this.$message({
                                    message: data.msg,
                                    type: "success"
                                });
                                _this.backBtn();
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
                                this.addAppyl = false;
                                this.addAppyl2 = false;
                                this.addAppyl3 = false;
                                this.$message({
                                    message: data.msg,
                                    type: "success"
                                });
                                _this.backBtn();
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
        btn_fileSave2() {
            this.$refs.editObj2.validate(valid => {
                if (valid) {
                    let _this = this;
                    let obj = Object.assign({}, this.editObj2);
                    // obj.lrrId = this.$store.state.user.user.uUser.id;
                    obj.dataId = this.code;
                    if (this.editObj2.id) {
                        dateUpdate(obj).then(res => {
                            let data = res.data;
                            if (data.success) {
                                this.addAppyl = false;
                                this.addAppyl2 = false;
                                this.addAppyl3 = false;
                                _this.$message({
                                    message: data.msg,
                                    type: "success"
                                });
                                _this.backBtn();
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
                                this.$message({
                                    message: data.msg,
                                    type: "success"
                                });
                                _this.backBtn();
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
        btn_fileSave3() {
            this.$refs.editObj3.validate(valid => {
                if (valid) {
                    let _this = this;
                    let obj = Object.assign({}, this.editObj3);
                    // obj.lrrId = this.$store.state.user.user.uUser.id;
                    obj.dataId = this.code;
                    if (this.editObj3.id) {
                        dateUpdate(obj).then(res => {
                            let data = res.data;
                            if (data.success) {
                                this.addAppyl = false;
                                this.addAppyl2 = false;
                                this.addAppyl3 = false;
                                _this.$message({
                                    message: data.msg,
                                    type: "success"
                                });
                                _this.backBtn();
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
                                this.$message({
                                    message: data.msg,
                                    type: "success"
                                });
                                _this.backBtn();
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
            this.editObj.sqLrr = this.$store.state.user.user.uUser.nickname;
            this.editObj.sqLrsj = nowDate;
        },
        FormInt2() {
            this.editObj = {};
            let nowDate = new Date().getTime();
            this.editObj3.pfLrr = this.$store.state.user.user.uUser.nickname;
            this.editObj3.pfLrsj = nowDate;
        }
    },
    mounted() {
        this.pfjgoptions = doCreate("ysyj");
    }
};
</script>

