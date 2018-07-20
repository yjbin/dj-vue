<template>
    <div class="ygcc">
        <div v-show="applyXg">
            <el-form :inline="true" class="demo-form-inline">
                <el-form-item label="文件号">
                    <el-input placeholder="文件号" prefix-icon="el-icon-search" v-model.trim="seatch_wh"></el-input>
                </el-form-item>
                <el-form-item label="标题">
                    <el-input placeholder="标题" prefix-icon="el-icon-search" v-model.trim="seatch_bt"></el-input>
                </el-form-item>
                <el-form-item>
                    <button type="primary" @click="ListQuery" class="topQuery">搜索</button>
                    <button type="success" @click="fileAdd" class="topQuery">添加记录</button>
                </el-form-item>
            </el-form>
            <div class="capit-tit">
                <el-row>
                    <el-col :span="12">
                        <div class="user-left">
                            <span>文风会风</span>
                        </div>
                    </el-col>
                </el-row>
            </div>

            <div class="capit-list">
                <el-table :data="dateList" stripe border style="width: 100%" @selection-change="checkboxChange">
                    <!-- <el-table-column type="selection"></el-table-column> -->
                    <el-table-column type="index" :index="indexMethod" label="序号" width="80"></el-table-column>
                    <el-table-column prop="xzqh" :formatter="getXzqh" label="行政区划" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="bm" label="部门" :formatter="bmbmDic" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="jccs" label="精简次数" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="wh" label="文件号" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="bt" label="标题" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="xffw" label="下发范围" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="jbsl" label="简报数量" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="sfsp" label="领导是否审批" :formatter="sfspDicToWord" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="whzxqk" label="无会日执行情况" show-overflow-tooltip></el-table-column>

                    <el-table-column label="操作" width="250">
                        <template slot-scope="scope">
                            <el-button size="mini" type="primary" @click="fileEdit(scope.row)">{{(scope.row.sqzt=='3'?'编辑':'查看')}}</el-button>
                            <el-button v-if="scope.row.sqzt=='1'" size="mini" type="primary" @click="applyClick(scope.row)">申请</el-button>
                            <el-button v-if="scope.row.sqzt=='2'" size="mini" type="primary" @click="applyClick(scope.row)">申请中</el-button>
                            <el-button v-if="scope.row.sqzt=='3'" size="mini" type="primary" @click="applyClick(scope.row)">通过</el-button>
                            <el-button v-if="scope.row.sqzt=='0'" size="mini" type="primary" @click="applyClick(scope.row)">驳回</el-button>
                            <el-button size="mini" type="danger" @click="listDel(scope.row)">删除</el-button>
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
                                    <el-form-item label="精简次数" prop="jccs">
                                        <el-input v-model.number="editObj.jccs" placeholder="精简次数（数字）"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="11" :offset="1">
                                    <el-form-item label="文件号" prop="wh">
                                        <el-input v-model.trim="editObj.wh" placeholder="文件号"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>

                            <el-row>
                                <el-col :span="11">
                                    <el-form-item label="标题" prop="bt">
                                        <el-input v-model.trim="editObj.bt" placeholder="标题"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="11" :offset="1">
                                    <el-form-item label="下发范围" prop="xffw">
                                        <el-input v-model.trim="editObj.xffw" placeholder="下发范围"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>

                            <el-row>
                                <el-col :span="11">
                                    <el-form-item label="简报数量" prop="jbsl">
                                        <el-input v-model.number="editObj.jbsl" placeholder="简报数量（数字）"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="11" :offset="1">
                                    <el-form-item label="领导是否审批" prop="sfsp">
                                        <el-select suffix-icon="el-icon-date" v-model="editObj.sfsp" style="width:100%">
                                            <el-option v-for="(item,index) in sfspOptions" :key="index" :label="item.label" :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="23">
                                    <el-form-item label="无会日执行情况" prop="whzxqk" label-width="121px">
                                        <el-input type="textarea" v-model.trim="editObj.whzxqk" placeholder="无会日执行情况"></el-input>
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
import { doCreate, getDicTab, moreMenu } from "@/utils/config";
import { formatDate } from "@/utils/data";
import {
    khpyQuery,
    khpyAdd,
    khpyUpdate,
    khpyDel
} from "@/api/zfjs/lszhbxgdjshzzsfwt/wfhf";
export default {
    components: {
        applyrModifying
    },
    data() {
        return {
            applyXg: true,
            applyCode: {},
            seatch_wh: "",
            seatch_bt: "",
            textTit: "",
            pageTit: "",
            newModal: false,
            activeShow: true,
            pageSize: 10,
            pageNo: 1,
            totalCount: 0,
            ndoptions: [],
            ndoptions2: [],
            bmbmoptions: [],
            xzqhoptions: [],
            month: [],
            editObj: {
                year: "",
                month: "",
                bm: "",
                lrr: "",
                lrsj: "",
                jccs: "",
                wh: "",
                bt: "",
                xffw: "",
                jbsl: "",
                sfsp: "",
                whzxqk: ""
            },
            dateList: [],
            fwztoptions: [],
            multipleSelection: [],
            accessoryModalInt: false,
            upShowhide: true,
            textTitFile: "",
            rulesFile: {
                year: [{ required: true, message: "不能为空" }],
                month: [{ required: true, message: "不能为空" }],
                jccs: [
                    { required: true, message: "不能为空" },
                    { type: "number", message: "必须为数字值" }
                ],
                wh: [{ required: true, message: "不能为空" }],
                bt: [{ required: true, message: "不能为空" }],
                xffw: [{ required: true, message: "不能为空" }],
                jbsl: [
                    { required: true, message: "不能为空" },
                    { type: "number", message: "必须为数字值" }
                ],
                sfsp: [{ required: true, message: "不能为空" }],
                whzxqk: [{ required: true, message: "不能为空" }]
            },
            sfspOptions: [],
            value: ""
        };
    },
    methods: {
        sfspDicToWord(row) {
            if (row.sfsp == "1") {
                return "已审批";
            } else {
                return "未审批";
            }
        },
        lrsjDic(row) {
            return formatDate(row.lrsj, "yyyy-MM-dd");
        },
        getXzqh(row) {
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
            this.activeShow = true;
            this.editObj = {};
            if (this.$refs.editObj) {
                this.$refs.editObj.resetFields();
            }
            this.FormInt();
        },
        fileEdit(row) {
            this.newModal = true;
            this.textTit = "编辑";
            if (this.$refs.editObj) {
                this.$refs.editObj.resetFields();
            }
            this.editObj = Object.assign({}, row);
            if (row.sqzt == "3") {
                this.textTit = "编辑";
                this.activeShow = true;
            } else {
                this.textTit = "查看";
                this.activeShow = false;
            }
            if (this.editObj.sfsp == "1") {
                this.editObj.sfsp = "已审批";
            } else {
                this.editObj.sfsp = "未审批";
            }
        },
        btnBack(val) {
            this.applyXg = val;
            this.ListQuery();
        },
        applyClick(row) {
            this.applyXg = false;
            this.applyCode = {
                num: Math.random(),
                code: row.code,
                sqzt: row.sqzt
            };
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
                    khpyDel(obj).then(res => {
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
            this.seatch_wh ? (obj.wh = this.seatch_wh) : "";
            this.seatch_bt ? (obj.bt = this.seatch_bt) : "";
            khpyQuery(obj).then(res => {
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
                    obj.code = this.$store.state.user.user.uUser.id;
                    obj.sqzt = "1";
                    if (this.editObj.id) {
                        khpyUpdate(obj).then(res => {
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
                        khpyAdd(obj).then(res => {
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
        this.sfspOptions = doCreate("sf-1");
        this.ndoptions2 = doCreate("nd");
        this.fwztoptions = doCreate("fwzt");
        this.xzqhoptions = doCreate("xzqh");
        this.bmbmoptions = doCreate("bmbm");
    }
};
</script>
<style lang="scss" scoped>
.ygcc {
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

