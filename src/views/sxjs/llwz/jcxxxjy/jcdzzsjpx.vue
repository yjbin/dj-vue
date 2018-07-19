<template>
    <div class="xxxjpzsjzylsqk">
        <div v-show="applyXg">
            <el-form :inline="true" class="demo-form-inline">
                <!-- <el-form-item label="年度">
                    <el-select suffix-icon="el-icon-date" v-model="seatch_nd">
                        <el-option v-for="(item,index) in ndoptions" :key="index" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item> -->
                <el-form-item label="培训主题">
                    <el-input placeholder="培训主题" prefix-icon="el-icon-search" v-model.trim="seatch_pxzt"></el-input>
                </el-form-item>
                <el-form-item label="授课人">
                    <el-input placeholder="授课人" prefix-icon="el-icon-search" v-model.trim="seatch_skr"></el-input>
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
                            <span>基层党组织书记培训</span>
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
                    <el-table-column prop="pxzt" label="培训主题" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="pxsj" label="培训时间" :formatter="pxsjDic" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="skr" label="授课人" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="pxdd" label="培训地点" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="zzdw" label="组织单位" show-overflow-tooltip></el-table-column>
                    
                    <el-table-column prop="sfbb" label="是否报备" :formatter="sfbbDicToWord" show-overflow-tooltip></el-table-column>
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
                <el-dialog :title="textTit" :visible.sync="newModal" :before-close="btn_cancel" top="5vh">
                    <div class="dict-content">
                        <el-form :inline="true" :model="editObj" ref="editObj" class="demo-form-inline" label-width="120px" :rules="rulesFile">
                            <el-row>
                                <el-col :span="11">
                                    <el-form-item label="主题" prop="pxzt">
                                        <el-input v-model.trim="editObj.pxzt" placeholder="培训主题"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="11" :offset="1">
                                    <el-form-item label="时间" prop="pxsj">
                                        <el-date-picker v-model="editObj.pxsj" type="date" value-format="timestamp" placeholder="培训时间"></el-date-picker>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="11">
                                    <el-form-item label="地点" prop="pxdd">
                                        <el-input v-model.trim="editObj.pxdd" placeholder="培训地点"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="11" :offset="1">
                                    <el-form-item label="培训人数" label-width="121px" prop="pxrs">
                                        <el-input v-model.trim="editObj.pxrs" placeholder="应到人数"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="23">
                                    <el-form-item label="培训对象" prop="pxdx">
                                    <el-input type="textarea" v-model.trim="editObj.pxdx" placeholder="培训对象"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="23">
                                    <el-form-item label="培训内容" prop="pxnr">
                                        <el-input type="textarea" v-model.trim="editObj.pxnr" placeholder="培训内容"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="11">
                                    <el-form-item label="组织单位" prop="zzdw">
                                        <el-input v-model.trim="editObj.zzdw" placeholder="组织单位"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="11" :offset="1">
                                    <el-form-item label="授课人" prop="skr">
                                        <el-input v-model.trim="editObj.skr" placeholder="授课人"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="23">
                                    <el-form-item label="授课人信息" prop="skrxx">
                                        <el-input type="textarea"  placeholder="请输入授课人单位、职务/职级" v-model.trim="editObj.skrxx"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="23">
                                    <el-form-item label="授课内容" prop="sknr">
                                        <el-input type="textarea" v-model.trim="editObj.sknr" placeholder="授课内容"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="11">
                                    <el-form-item label="是否报备" prop="sfbb">
                                        <el-select suffix-icon="el-icon-date" v-model="editObj.sfbb" style="width:100%">
                                            <el-option v-for="(item,index) in sfbbOptions" :key="index" :label="item.label" :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="11" :offset="1">
                                    <el-form-item label="费用(元)" prop="pxfy">
                                        <el-input v-model.trim="editObj.pxfy" placeholder="费用(元)"></el-input>
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
                                    <el-button type="success" size="small" @click="fileClick('pxfa')">培训方案（附件）</el-button>
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
            <accessory-Model :newModal="accessoryModalInt"  @colseTog="colseTog" @chileFile="chileFile" :textTitFile="textTitFile" :fileSrc="fileSrc" :upShowhide="activeShow"></accessory-Model>
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
import { doCreate, getDicTab, moreMenu } from "@/utils/config";
import { formatDate } from "@/utils/data";
import { validPasInt,validMoney,validName } from "@/utils/validate";
import {
    khpyQuery,
    khpyAdd,
    khpyUpdate,
    khpyDel
} from "@/api/sxjs/jcdzzsjpx";
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
        const validMoneys = (rule, value, callback) => {
            if (!validMoney(value)) {
                callback(new Error("请输入正确的金额~^~^~"));
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
            applyXg:true,
            applyCode:{},
            hasFile: false,
            seatch_pxzt: "",
            seatch_skr: "",
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
            editObj: {
                pxzt: "",
                pxsj: "",
                pxdd: "",
                pxdx: "",
                pxrs: "",
                pxnr: "",
                zzdw: "",
                skr: "",
                skrxx: "",
                sknr: "",
                sfbb: "",
                bbsj: "",
                pxfy: "",
                pxlx: ""
            },
            dateList: [],
            fwztoptions: [],
            multipleSelection: [],
            accessoryModalInt: false,
            upShowhide: true,
            textTitFile: "",
            fileSrc: "",
            rulesFile: {
                pxzt:  [{ required: true, message: "不能为空" }],
                pxsj:  [{ required: true, message: "不能为空" }],
                pxdd:  [{ required: true, message: "不能为空" }],
                pxdx:  [{ required: true, message: "不能为空" }],
                pxrs:  [{ required: true, validator:validNum }],
                pxnr:  [{ required: true, message: "不能为空" }],
                zzdw:  [{ required: true, message: "不能为空" }],
                skr:   [{ required: true, validator:validNames }],
                skrxx: [{ required: true, message: "不能为空" }],
                sknr:  [{ required: true, message: "不能为空" }],
                sfbb:  [{ required: true, message: "不能为空" }],
                bbsj:  [{ required: true, message: "不能为空" }],
                pxfy:  [{ required: true, validator:validMoneys }]
            },
            sfbbOptions: [],
            value: '',
        };
    },
    methods: {
        btnBack(val) {
            this.applyXg = val;
            this.ListQuery();
        },
        applyClick(row) {
            this.applyXg = false;
            this.applyCode = Object.assign({},{
                num: Math.random(),
                code: row.code,
                sqzt: row.sqzt
            });
        },
        sfbbDicToWord(row) {
            return getDicTab("sf-1", row.sfbb)
        },
        lrsjDic(row) {
            return formatDate(row.lrsj, "yyyy-MM-dd");
        },
        pxsjDic(row) {
            return formatDate(row.pxsj, "yyyy-MM-dd");
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
            if (row.sqzt == "3") {
                this.textTit = "编辑";
                this.activeShow = true;
            } else {
                this.textTit = "查看";
                this.activeShow = false;
            }
            this.editObj = Object.assign({}, row);
            if (this.$refs.editObj) {
                this.$refs.editObj.resetFields();
            }
            
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
                pxlx: "1",
                bm: this.$store.state.user.user.uUser.bmbm,
                xzqh: this.$store.state.user.user.uUser.xzqh,
            };
            this.seatch_skr ? obj.skr = this.seatch_skr : "";
            this.seatch_pxzt ? obj.pxzt = this.seatch_pxzt : "";
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
                    obj.pxlx = "1";
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
        chileFile(val) {
            let zd = val.zdName;
            this.editObj[zd] = val.newSrcstr;
        },
        fileClick(val) {
            this.accessoryModalInt = true;
            this.textTitFile = "附件";
            // this.editObj.dybg = 1;
            // console.log(this.editObj.dybg)
            this.fileSrc = {
                num: Math.random(),
                fileStr: this.editObj[val],
                zdName: val
            };
        },
        checkFile() {
          if( this.editObj.dybg == 0 ) {
              this.hasFile = false;
          }else{
            this.hasFile = true;
          }
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
        this.ndoptions = doCreate("ndTit");
        this.ndoptions2 = doCreate("nd");
        this.sfbbOptions = doCreate("sf-1");
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

