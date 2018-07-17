<template>
    <div class="rrhs">
        <div class="capit-tit">
            <el-row>
                <el-col :span="24">
                    <div class="user-left">
                        <span class="capit-content">进度列表</span>
                        <el-button size="small" type="warning" style="float:right;margin:3px 20px 0 0;" @click="backBtn">返回</el-button>
                        <el-button v-show="tjsqShow" size="small" type="warning" style="float:right;margin:3px 20px 0 0;" @click="addSq">添加进度</el-button>
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
                <el-table-column prop="xmmc" label="项目名称" show-overflow-tooltip></el-table-column>
                <el-table-column prop="jdfzr" label="进度负责人" show-overflow-tooltip></el-table-column>
                <el-table-column prop="kssj" label="开始时间" :formatter="sjDic" show-overflow-tooltip></el-table-column>
                <el-table-column prop="jssj" label="结束时间" :formatter="sjDic2" show-overflow-tooltip></el-table-column>
                <el-table-column prop="address" label="操作" width="300">
                    <template slot-scope="scope">
                        <el-button size="mini" type="primary" @click="fileEdit(scope.row)">编辑</el-button>
                        <el-button size="mini" type="danger" @click="listDel(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="user-page fr">
                <el-pagination @current-change="handleCurrentChange" :current-page.sync="pageNo" :page-size="pageSize" layout="total, prev, pager, next" :total="totalCount">
                </el-pagination>
            </div>
            <div class="dict-content">
                <div class="capit-tit" style="margin:60px 0 30px 0">
                    <el-row>
                        <el-col :span="24">
                            <div class="user-left">
                                <span class="capit-content">添加进度</span>
                            </div>
                        </el-col>

                    </el-row>
                </div>
                <el-form :inline="true" :model="editObj" ref="editObj" class="demo-form-inline" label-width="120px" :rules="rulesFile">
                    <el-row>
                        <el-col :span="11">
                            <el-form-item label="项目名称" prop="xmmc">
                                <el-input v-model.trim="editObj.xmmc" placeholder="项目名称" :disabled="true"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="11" :offset="1">
                            <el-form-item label="进度负责人" prop="jdfzr">
                                <el-input v-model.trim="editObj.jdfzr" placeholder="进度负责人"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="11">
                            <el-form-item label="开始时间" prop="kssj">
                                <el-date-picker v-model="editObj.kssj" type="date" value-format="timestamp" placeholder="开始时间" :picker-options="limitStartTime"></el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="11" :offset="1">
                            <el-form-item label="结束时间" prop="jssj">
                                <el-date-picker v-model="editObj.jssj" type="date" value-format="timestamp" placeholder="结束时间" :picker-options="limitEndTime"></el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="11">
                            <el-form-item label="项目进度(%)" prop="xmjd">
                                <el-input v-model.trim="editObj.xmjd" placeholder="项目进度(%)"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="23">
                            <el-form-item label="完工内容" prop="wgnr">
                                <el-input type="textarea" :autosize="{ minRows: 5 }" v-model.trim="editObj.wgnr" placeholder="完工内容"></el-input>
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
                <div class="footerBox">
                    <span slot="footer" class="dialog-footer">
                        <button size="small" class="save" @click="btn_fileSave">保 存</button>
                    </span>
                </div>
            </div>

        </div>
        <accessory-Model :newModal="accessoryModalInt" @colseTog="colseTog" @chileFile="chileFile" :textTitFile="textTitFile" :fileSrc="fileSrc" :upShowhide="activeShow"></accessory-Model>
    </div>

</template>
<script>
import { doCreate, getDicTab, moreMenu } from "@/utils/config";
import { formatDate } from "@/utils/data";
import { validateNumber } from "@/utils/validate";
import accessoryModel from "@/components/accessoryModel";
import {
    dateQuery,
    dateAdd,
    dateUpdate,
    dateDel
} from "@/api/zfjs/xmjdListmoudel";
export default {
    components: {
        accessoryModel
    },
    data() {
        const validOfNumber = (rule, value, callback) => {
            if (!validateNumber(value)) {
                callback(new Error("请输入0~100数字~"));
            } else {
                callback();
            }
        };
        
        return {
            seatch_nd: "",
            seatch_name: "",
            textTit: "",
            pageTit: "",
            newModal: false,
            activeShow: true,
            pfclick: false,
            seeClick: false,
            addAppyl: false,
            tjsqShow: true,
            pageSize: 3,
            pageNo: 1,
            totalCount: 0,
            ndoptions: [],
            ndoptions2: [],
            monthoptions: [],
            xmid: "",
            xmmc: "",
            userId: this.$store.state.user.user.uUser.rId,
            applyTit: "批复",
            editObj: {},
            bmbmoptions: [],
            xzqhoptions: [],
            dateList: [],
            accessoryModalInt: false,
            upShowhide: true,
            textTitFile: "",
            fileSrc: "",
            rulesFile: {
                jdfzr: [{ required: true, message: "不能为空" }],
                kssj: [{ required: true, message: "不能为空" }],
                jssj: [{ required: true, message: "不能为空" }],
                xmjd: [{ required: true, validator: validOfNumber }],
                wgnr: [{ required: true, message: "不能为空" }]
            },
            limitStartTime: {
                disabledDate: time => {
                    var end_time = this.editObj.jssj;
                    let endDateVal = new Date(end_time).getTime();
                    if (endDateVal) {
                        return time.getTime() > endDateVal;
                    }
                }
            },
            limitEndTime: {
                disabledDate: time => {
                    var start_time = this.editObj.kssj;
                    let startDateVal = new Date(start_time).getTime();
                    if (startDateVal) {
                        return time.getTime() < startDateVal;
                    }
                }
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
                    this.xmid = val.code;
                    this.xmmc = val.xmmc;
                    this.ListQuery();
                   
                    this.FormInt();
                }
            },
            deep: true
        },
        gpsTit(val) {
            this.text_Text = val;
        }
    },
    methods: {
        xzqhDic(row) {
            return getDicTab("xzqh", row.xzqh);
        },
        bmbmDic(row) {
            return getDicTab("bmbm", row.bm);
        },
        sjDic(row) {
            return formatDate(row.kssj, "yyyy-MM-dd");
        },
        sjDic2(row) {
            return formatDate(row.jssj, "yyyy-MM-dd");
        },
        indexMethod(index) {
            let start = (this.pageNo - 1) * this.pageSize;
            return start + index + 1;
        },
        addSq() {
            
            this.FormInt();
        },
        backBtn() {
            this.newModal = true;
            this.$emit("btnBack", this.newModal);
        },
        fileEdit(row) {
            this.editObj = Object.assign({}, row);
        },

        handleCurrentChange(val) {
            this.pageNo = val;
            this.ListQuery();
        },
        ListQuery() {
            let obj = {
                pageNo: this.pageNo,
                pageSize: this.pageSize,
                xmid: this.xmid
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
                    obj.xmid = this.xmid;
                    if (this.editObj.id) {
                        dateUpdate(obj).then(res => {
                            let data = res.data;
                            if (data.success) {
                                _this.$message({
                                    message: data.msg,
                                    type: "success"
                                });
                                _this.ListQuery();
                                this.FormInt();
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
                                _this.ListQuery();
                                this.FormInt();
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
                            this.FormInt();
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
            if (this.$refs.editObj) {
                this.$refs.editObj.resetFields();
            }
            let nowDate = new Date().getTime();
            this.editObj.xzqh = this.$store.state.user.user.uUser.xzqh;
            this.editObj.bm = this.$store.state.user.user.uUser.bmbm;
            this.editObj.lrr = this.$store.state.user.user.uUser.nickname;
            this.editObj.lrsj = nowDate;
            this.editObj.xmmc = this.xmmc;
        }
    },
    mounted() {
        this.xzqhoptions = doCreate("xzqh");
        this.bmbmoptions = doCreate("bmbm");
    }
};
</script>

