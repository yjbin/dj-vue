<template>
  <div class="bgyf">
    <div v-show="applyXg">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="姓名">
          <el-input placeholder="姓名" prefix-icon="el-icon-search" v-model.trim="seatch_xm"></el-input>
        </el-form-item>
        <el-form-item label="办公地点">
          <el-input placeholder="办公地点" prefix-icon="el-icon-search" v-model.trim="seatch_bgdd"></el-input>
        </el-form-item>
        <el-form-item>
          <button class="topQuery" @click="search_query">搜索</button>
          <button class="topQuery" @click="newAdd">添加记录</button>
        </el-form-item>
      </el-form>
      <div class="capit-tit">
        <el-row>
          <el-col :span="12">
            <div class="user-left">
              <span class="capit-content">办公用房</span>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="capit-list">
        <el-table :data="bgyfList" stripe border style="width: 100%">
          <!-- <el-table-column type="selection"></el-table-column> -->
          <el-table-column type="index" :index="indexMethod" label="序号" width="80"></el-table-column>
          <el-table-column prop="xzqh" :formatter="getXzqh" label="行政区划" show-overflow-tooltip></el-table-column>
          <el-table-column prop="bm" :formatter="getBmbm" label="部门科室" show-overflow-tooltip></el-table-column>
          <el-table-column prop="xm" label="姓名" show-overflow-tooltip></el-table-column>
          <el-table-column prop="bgdd" label="办公地点" show-overflow-tooltip></el-table-column>
          <el-table-column prop="bgmj" label="办公面积" show-overflow-tooltip></el-table-column>
          <el-table-column prop="bgbz" label="办公标准" show-overflow-tooltip></el-table-column>
          <el-table-column label="操作" width="250">
            <template slot-scope="scope">
              <el-button size="mini" type="primary" @click="Edit(scope.row)">{{(scope.row.sqzt=='3'?'编辑':'查看')}}</el-button>
              <el-button v-if="scope.row.sqzt=='1'" size="mini" type="primary" @click="applyClick(scope.row)">申请</el-button>
              <el-button v-if="scope.row.sqzt=='2'" size="mini" type="primary" @click="applyClick(scope.row)">申请中</el-button>
              <el-button v-if="scope.row.sqzt=='3'" size="mini" type="primary" @click="applyClick(scope.row)">通过</el-button>
              <el-button v-if="scope.row.sqzt=='0'" size="mini" type="primary" @click="applyClick(scope.row)">驳回</el-button>
              <el-button size="mini" type="danger" @click="Del(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="fr">
          <el-pagination @current-change="CurrentChange" :current-page.sync="pageNo" :page-size="pageSize" layout="total, prev, pager, next" :total="totalCount">
          </el-pagination>
        </div>
        <!-- 新建，编辑弹框 -->
        <el-dialog :title="textTit" :visible.sync="newModal" :before-close="btn_cancel">
          <el-form :inline="true" :model="bgyfForm" ref="bgyfForms" class="demo-form-inline" label-width="120px" :rules="bgyfrules">
            <el-row>
              <el-col :span="11">
                <el-form-item label="姓名" prop="xm">
                  <el-input v-model.trim="bgyfForm.xm" placeholder="姓名"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="11" :offset="1">
                <el-form-item label="办公地点" prop="bgdd">
                  <el-input v-model.trim="bgyfForm.bgdd" placeholder="办公地点"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="11">
                <el-form-item label="办公面积" prop="bgmj">
                  <el-input v-model.trim="bgyfForm.bgmj" placeholder="办公面积"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="11" :offset="1">
                <el-form-item label="办公标准" prop="bgbz">
                  <el-input v-model.trim="bgyfForm.bgbz" placeholder="办公标准"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="11">
                <el-form-item label="行政区划" prop="xzqh">
                  <el-select v-model="bgyfForm.xzqh" placeholder="请选择" style="width:100%" disabled>
                    <el-option v-for="(item,index) in xzqhoptions" :key="index" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="11" :offset="1">
                <el-form-item label="部门科室" prop="bm">
                  <el-select v-model="bgyfForm.bm" placeholder="请选择" style="width:100%" disabled>
                    <el-option v-for="(item,index) in bmoptions" :key="index" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="11">
                <el-form-item label="录入人" prop="lrr">
                  <el-input v-model="bgyfForm.lrr" placeholder="录入人" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="11" :offset="1">
                <el-form-item label="录入时间" prop="lrsj">
                  <el-date-picker v-model="bgyfForm.lrsj" type="datetime" value-format="timestamp" placeholder="录入时间" :disabled="true"></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <div class="footerBox">
            <span slot="footer" class="dialog-footer">
              <button v-show="activeShow" class="save" @click="btn_save">保存</button>
              <button @click="btn_cancel" class="cancel">取消</button>
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
import { doCreate, getDicTab } from "@/utils/config";
import { formatDate } from "@/utils/data";
import {
    bgyfSearch,
    bgyfSave,
    bgyfDel
} from "@/api/zfjs/lszhbxgdjshzzsfwt/bgyf";
export default {
    components: {
        accessoryModel,
        applyrModifying
    },
    data() {
        return {
            applyXg: true,
            applyCode: {},
            seatch_xm: "",
            seatch_bgdd: "",
            textTit: "",
            newModal: false,
            pageModal: false,
            activeShow: true,
            pageNo: 1,
            pageSize: 10,
            totalCount: 0,
            bgyfList: [],
            bgyfForm: {},
            ndoptions: [],
            ndoptions2: [],
            month: [],
            xzqhoptions: [],
            bmoptions: [],
            xmoptions: [],
            bgyfrules: {
                xm: [{ required: true, message: "不能为空" }],
                bgdd: [{ required: true, message: "不能为空" }],
                bgmj: [{ required: true, message: "不能为空" }],
                bgbz: [{ required: true, message: "不能为空" }]
            },
            accessoryModalInt: false,
            upShowhide: true,
            textTitFile: "",
            fileSrc: ""
        };
    },
    methods: {
        btn_cancel() {
            this.newModal = false;
        },
        indexMethod(index) {
            let start = (this.pageNo - 1) * this.pageSize;
            return start + index + 1;
        },
        getXzqh(row) {
            return getDicTab("xzqh", row.xzqh);
        },
        getBmbm(row) {
            return getDicTab("bmbm", row.bm);
        },
        formatterDatezcsj(row) {
            return formatDate(row.zcsj, "yyyy-MM-dd");
        },
        formatterDatelrsj(row) {
            return formatDate(row.lrsj, "yyyy-MM-dd");
        },
        formInit() {
            let nowDate = new Date().getTime();
            this.bgyfForm.lrsj = nowDate;
            this.bgyfForm.bm = this.$store.state.user.user.uUser.bmbm;
            this.bgyfForm.xzqh = this.$store.state.user.user.uUser.xzqh;
            this.bgyfForm.lrr = this.$store.state.user.user.uUser.nickname;
        },
        CurrentChange(val) {
            this.pageNo = val;
            this.search_query();
        },
        newAdd() {
            this.newModal = true;
            this.activeShow = true;
            this.textTit = "添加记录";
            this.bgyfForm = {};
            if (this.$refs.bgyfForms) {
                this.$refs.bgyfForms.resetFields();
            }
            this.formInit();
        },
        search_query() {
            let obj = {
                pageNo: this.pageNo,
                pageSize: this.pageSize,
                bm: this.$store.state.user.user.uUser.bmbm,
                xzqh: this.$store.state.user.user.uUser.xzqh
            };
            this.seatch_xm ? (obj.xm = this.seatch_xm) : "";
            this.seatch_bgdd ? (obj.bgdd = this.seatch_bgdd) : "";
            bgyfSearch(obj).then(res => {
                let data = res.data;
                if (data.success) {
                    this.bgyfList = data.data.data;
                    this.totalCount = data.data.totalCount;
                } else {
                    this.bgyfList = [];
                    this.totalCount = 0;
                    this.$message({
                        type: "warning",
                        message: data.msg
                    });
                }
            });
        },
        Edit(row) {
            this.newModal = true;
            if (row.sqzt == "3") {
                this.textTit = "编辑";
                this.activeShow = true;
            } else {
                this.textTit = "查看";
                this.activeShow = false;
            }
            if (this.$refs.bgyfForms) {
                this.$refs.bgyfForms.resetFields();
            }
            this.bgyfForm = Object.assign({}, row);
        },
        btnBack(val) {
            this.applyXg = val;
            this.search_query();
        },
        applyClick(row) {
            this.applyXg = false;
            this.applyCode = {
                num: Math.random(),
                code: row.code,
                sqzt: row.sqzt
            };
        },
        btn_save() {
            let _this = this;
            this.$refs.bgyfForms.validate(valid => {
                if (valid) {
                    let obj = Object.assign({}, _this.bgyfForm);
                    obj.lrrId = this.$store.state.user.user.uUser.id;
                    let url = "";
                    obj.sqzt = "1";
                    if (!obj.id) {
                        url = "add";
                        bgyfSave(url, obj).then(res => {
                            let data = res.data;
                            if (data.success) {
                                _this.$message({
                                    type: "success",
                                    message: data.msg
                                });
                                _this.search_query();
                            } else {
                                _this.$message({
                                    type: "danger",
                                    message: data.msg
                                });
                            }
                        });
                    } else {
                        url = "update";
                        bgyfSave(url, obj).then(res => {
                            let data = res.data;
                            if (data.success) {
                                _this.$message({
                                    type: "success",
                                    message: data.msg
                                });
                                _this.search_query();
                            } else {
                                _this.$message({
                                    type: "danger",
                                    message: data.msg
                                });
                            }
                        });
                    }
                    _this.btn_cancel();
                }
            });
        },
        Del(row) {
            this.$confirm("此操作将删除此条信息, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(() => {
                    let obj = {
                        id: row.id
                    };
                    bgyfDel(obj).then(res => {
                        let data = res.data;
                        if (data.success) {
                            this.$message({
                                message: data.msg,
                                type: "success"
                            });
                            this.search_query();
                        } else {
                            this.$message({
                                message: data.msg,
                                type: "warning"
                            });
                        }
                    });
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消删除"
                    });
                });
        },
        //上传
        colseTog(val) {
            this.accessoryModalInt = val;
        },
        chileFile(val) {
            let zd = val.zdName;
            this.bgyfForm[zd] = val.newSrcstr;
        },
        fileClick(val) {
            this.accessoryModalInt = true;
            this.textTitFile = "附件";
            this.fileSrc = {
                num: Math.random(),
                fileStr: this.bgyfForm[val],
                zdName: val
            };
        }
    },
    mounted() {
        this.ndoptions = doCreate("ndTit");
        this.ndoptions2 = doCreate("nd");
        this.bmoptions = doCreate("bmbm");
        this.xzqhoptions = doCreate("xzqh");
        this.month = doCreate("month");
        this.search_query();
    }
};
</script>



