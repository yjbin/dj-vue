
<template>
  <div class="ygcc">
    <div v-show="applyXg">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="年度">
          <el-select suffix-icon="el-icon-date" v-model="seatch_year" clearable>
            <el-option v-for="(item,index) in ndoptions" :key="index" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="报备类型">
          <el-select suffix-icon="el-icon-date" v-model="seatch_by1" clearable>
            <el-option v-for="(item,index) in bblxoptions" :key="index" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="报备人">
          <el-input placeholder="报备人" prefix-icon="el-icon-search" v-model.trim="seatch_bbr"></el-input>
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
              <span>婚丧嫁娶、港澳通行证报备情况</span>
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
          <el-table-column prop="year" label="年度" show-overflow-tooltip></el-table-column>
          <el-table-column prop="by1" label="报备类型" :formatter="bblxDic" show-overflow-tooltip></el-table-column>
          <el-table-column prop="bbr" label="报备人" show-overflow-tooltip></el-table-column>
          <el-table-column prop="bbsj" label="报备时间" :formatter="bbsjDic" show-overflow-tooltip></el-table-column>
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
                  <el-form-item label="报备类型" prop="by1">
                    <el-select v-model="editObj.by1" placeholder="请选择" style="width:100%" @change="bblxChange" :disabled="bblxDisabled">
                      <el-option v-for="(item,index) in bblxoptions" :key="index" :label="item.label" :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="11" :offset="1">
                  <el-form-item label="年度" prop="year" :offset="1">
                    <el-select v-model="editObj.year" placeholder="请选择" style="width:100%">
                      <el-option v-for="(item,index) in ndoptions" :key="index" :label="item.label" :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="11">
                  <el-form-item label="报备人" prop="bbr">
                    <el-input v-model.trim="editObj.bbr" placeholder="报备人"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="11" :offset="1">
                  <el-form-item label="报备时间" prop="bbsj">
                    <el-date-picker v-model="editObj.bbsj" type="date" value-format="timestamp" placeholder="报备时间" :editable="false"></el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="23">
                  <el-form-item label="报备内容" prop="bbnr">
                    <el-input type="textarea" v-model.trim="editObj.bbnr" placeholder="报备内容"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <div v-if="bblxtrue">
                <el-row>
                  <el-col :span="11">
                    <el-form-item label="检查人" prop="jcr">
                      <el-input v-model.trim="editObj.jcr" placeholder="检查人"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="11" :offset="1">
                    <el-form-item label="检查时间" prop="jcsj">
                      <el-date-picker v-model="editObj.jcsj" type="date" value-format="timestamp" placeholder="检查时间" :editable="false"></el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="11">
                    <el-form-item label="检查地点" prop="jcdd">
                      <el-input v-model.trim="editObj.jcdd" placeholder="检查地点"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="11" :offset="1">
                    <el-form-item label="监测结果" prop="jcjg">
                      <el-input v-model.trim="editObj.jcjg" placeholder="监测结果"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="23">
                    <el-form-item label="检查情况" prop="jcqk">
                      <el-input type="textarea" v-model.trim="editObj.jcqk" placeholder="检查情况"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="11">
                    <el-form-item label="汇报人" prop="hbr">
                      <el-input v-model.trim="editObj.hbr" placeholder="汇报人"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="11" :offset="1">
                    <el-form-item label="汇报时间" prop="hbsj">
                      <el-date-picker v-model="editObj.hbsj" type="date" value-format="timestamp" placeholder="汇报时间"></el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="23">
                    <el-form-item label="报告对象" prop="bgdx">
                      <el-input type="textarea" v-model.trim="editObj.bgdx" placeholder="报告对象"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="23">
                    <el-form-item label="汇报内容" prop="hbnr">
                      <el-input type="textarea" v-model.trim="editObj.hbnr" placeholder="汇报内容"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </div>
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
                  <el-button size="small" type="success" @click="fileClick('sqbgb')">事前报告表</el-button>
                  <el-button size="small" type="success" @click="fileClick('shbgb')">事后报告表</el-button>
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
import { doCreate, getDicTab, moreMenu } from "@/utils/config";
import applyrModifying from "@/components/applyrModifying";
import { formatDate } from "@/utils/data";
import accessoryModel from "@/components/accessoryModel";
import {
    khpyQuery,
    khpyAdd,
    khpyUpdate,
    khpyDel
} from "@/api/zfjs/lszhbxgdjshzzsfwt/bbqk";
export default {
    components: {
        accessoryModel,
        applyrModifying
    },
    data() {
        return {
            applyXg: true,
            applyCode: {},
            seatch_year: "",
            seatch_by1: "",
            seatch_bbr: "",
            textTit: "",
            pageTit: "",
            bblxtrue: false,
            newModal: false,
            activeShow: true,
            bblxDisabled: true,
            pageSize: 10,
            pageNo: 1,
            totalCount: 0,
            ndoptions: [],
            bblxoptions: [],
            bmbmoptions: [],
            xzqhoptions: [],
            month: [],
            editObj: {
                year: "",
                by1: ""
            },
            dateList: [],
            fwztoptions: [],
            multipleSelection: [],
            accessoryModalInt: false,
            upShowhide: true,
            textTitFile: "",
            fileSrc: "",
            rulesFile: {
                by1: [{ required: true, message: "不能为空" }],
                year: [{ required: true, message: "不能为空" }],
                bbr: [{ required: true, message: "不能为空" }],
                bbsj: [{ required: true, message: "不能为空" }],
                bbnr: [{ required: true, message: "不能为空" }],
                jcr: [{ required: true, message: "不能为空" }],
                jcsj: [{ required: true, message: "不能为空" }],
                jcdd: [{ required: true, message: "不能为空" }],
                jcqk: [{ required: true, message: "不能为空" }],
                jcjg: [{ required: true, message: "不能为空" }],
                hbr: [{ required: true, message: "不能为空" }],
                hbsj: [{ required: true, message: "不能为空" }],
                bgdx: [{ required: true, message: "不能为空" }],
                hbnr: [{ required: true, message: "不能为空" }]
            },
            sfspOptions: [],
            value: ""
        };
    },
    methods: {
        bbsjDic(row) {
            return formatDate(row.bbsj, "yyyy-MM-dd");
        },
        getXzqh(row) {
            return getDicTab("xzqh", row.xzqh);
        },
        bblxDic(row) {
            return getDicTab("bblx", row.by1);
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
        bblxChange(val) {
            // console.log(val)
            this.editObj = {};
            this.FormInt();
            if (val == "1") {
                this.bblxtrue = true;
                this.editObj.by1 = "1";
            } else if (val == "2") {
                this.bblxtrue = false;
                this.editObj.by1 = "2";
            }
            if (this.$refs.editObj) {
                this.$refs.editObj.resetFields();
            }
        },
        fileAdd() {
            this.newModal = true;
            this.bblxtrue = false;
            this.bblxDisabled = false;
            this.activeShow = true;
            this.textTit = "新增";
            this.editObj = {};
            if (this.$refs.editObj) {
                this.$refs.editObj.resetFields();
            }
            this.FormInt();
        },
        fileEdit(row) {
            this.newModal = true;
            this.bblxDisabled = true;
            if (row.sqzt == "3") {
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
            if (this.editObj.by1 == "1") {
                this.bblxtrue = true;
            } else {
                this.bblxtrue = false;
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
            this.seatch_year ? (obj.year = this.seatch_year) : "";
            this.seatch_by1 ? (obj.by1 = this.seatch_by1) : "";
            this.seatch_bbr ? (obj.bbr = this.seatch_bbr) : "";
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
                    // obj.code = this.$store.state.user.user.uUser.id;
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
        //上传
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
            this.editObj.by1 = "2";
        }
    },
    mounted() {
        this.ListQuery();
        this.sfspOptions = doCreate("sf-1");
        this.ndoptions = doCreate("nd");
        this.bblxoptions = doCreate("bblx");
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

