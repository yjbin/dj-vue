<template>
    <div class="zfxx">
      <div v-show="applyXg">
          <el-form :inline="true" class="demo-form-inline">
              <!-- <el-form-item label="年度">
                  <el-select suffix-icon="el-icon-date" v-model="seatch_nd">
                      <el-option v-for="(item,index) in ndoptions" :key="index" :label="item.label" :value="item.value">
                      </el-option>
                  </el-select>
              </el-form-item> -->
              <el-form-item label="转发标题">
                  <el-input placeholder="请输入..." prefix-icon="el-icon-search" v-model.trim="seatch_name"></el-input>
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
                          <span class="capit-content">工作群,朋友圈转发信息</span>
                      </div>
                  </el-col>
              </el-row>
          </div>
          <div class="capit-list">
              <el-table :data="zfxxList" stripe border style="width: 100%">
                  <!-- <el-table-column type="selection"></el-table-column> -->
                  <el-table-column type="index" :index="indexMethod" label="序号" width="80"></el-table-column>
                  <el-table-column prop="zfsj" label="转发时间" :formatter="formatterDatezfsj" show-overflow-tooltip></el-table-column>
                  <el-table-column prop="zfsl" label="转发数量" show-overflow-tooltip></el-table-column>      
                  <el-table-column prop="zfbt"  label="转发标题" show-overflow-tooltip></el-table-column>     
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
              <el-dialog :title="textTit" :visible.sync="newModal" :before-close="btn_cancel" >          
                  <el-form :inline="true" :model="zfxxForm" ref="zfxxForms" class="demo-form-inline" label-width="120px" :rules="zfxxrules">
                      <el-row>
                          <el-col :span="11">
                              <el-form-item label="转发时间" prop="zfsj">
                                <el-date-picker ref="tgDate" v-model="zfxxForm.zfsj" type="date" value-format="timestamp" placeholder="转发时间" ></el-date-picker>
                              </el-form-item>
                          </el-col>
                          <el-col :span="11" :offset="1">
                              <el-form-item label="转发数量" prop="zfsl">
                                  <el-input v-model.trim="zfxxForm.zfsl" placeholder="转发数量"></el-input>
                              </el-form-item>
                          </el-col>
                      </el-row>
                      <el-row>
                          <el-col :span="11">
                              <el-form-item label="转发标题" prop="zfbt">
                                <el-input  v-model.trim="zfxxForm.zfbt" placeholder="转发标题"></el-input>
                              </el-form-item>
                          </el-col>
                      </el-row>
                      <el-row>
                          <el-col :span="23">
                              <el-form-item label="转发内容" prop="zfnr">
                                  <el-input type="textarea" v-model.trim="zfxxForm.zfnr"  :autosize="{ minRows: 5 }" placeholder="转发内容"></el-input>
                              </el-form-item>
                          </el-col>
                      </el-row>
                      <el-row>
                          <el-col :span="11">
                              <el-form-item label="行政区划" prop="xzqh">
                                  <el-select v-model="zfxxForm.xzqh" placeholder="请选择" style="width:100%" disabled>
                                      <el-option v-for="(item,index) in xzqhoptions" :key="index" :label="item.label" :value="item.value">
                                      </el-option>
                                  </el-select>
                              </el-form-item>
                          </el-col>
                          <el-col :span="11" :offset="1">
                              <el-form-item label="部门科室" prop="bm">
                                  <el-select v-model="zfxxForm.bm" placeholder="请选择" style="width:100%" disabled>
                                      <el-option v-for="(item,index) in bmoptions" :key="index" :label="item.label" :value="item.value">
                                      </el-option>
                                  </el-select>
                              </el-form-item>
                          </el-col>
                      </el-row>
                      <el-row>
                          <el-col :span="11">
                              <el-form-item label="录入人" prop="lrr">
                                  <el-input v-model="zfxxForm.lrr" placeholder="录入人" :disabled="true"></el-input>
                              </el-form-item>
                          </el-col>
                          <el-col :span="11" :offset="1">
                              <el-form-item label="录入时间" prop="lrsj">
                                  <el-date-picker v-model="zfxxForm.lrsj" type="datetime" value-format="timestamp" placeholder="录入时间" :disabled="true"></el-date-picker>
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
import { validPasInt } from "@/utils/validate";
import { zfxxSearch, zfxxSave, zfxxDel } from "@/api/sxjs/xmtxc/zfxx";
export default {
  components: {
    accessoryModel,
    applyrModifying
  },
  data() {
    const isNumber = (rule, value, callback) => {
        if (!validPasInt(value)) {
            callback(new Error("请输入合法的数字~"));
        } else {
            callback();
        }
    };
    return {
      applyXg:true,
      applyCode:{},
      seatch_nd: "",
      seatch_name: "",
      textTit: "",
      newModal: false,
      pageModal: false,
      activeShow: true,
      pageNo: 1,
      pageSize: 10,
      totalCount: 0,
      zfxxList: [],
      zfxxForm: {},
      ndoptions:[],
      xzqhoptions:[],
      bmoptions:[],
      zfxxrules: {
        zfsj: [{ required: true, message: "不能为空" }],
        zfsl: [{ required: true, validator:isNumber }],
        zfbt: [{ required: true, message: "不能为空" }],
        zfnr: [{ required: true, message: "不能为空" }]
      },
    };
  },
  methods: {
     btnBack(val) {
        this.applyXg = val;
        this.search_query();
    },
    applyClick(row) {
        this.applyXg = false;
        this.applyCode = Object.assign({},{
            num: Math.random(),
            code: row.code,
            sqzt: row.sqzt
        });
    },
    btn_cancel() {
      this.newModal = false;
    },
    formInit() {
      let nowDate = new Date().getTime();
      this.zfxxForm.lrsj = nowDate;
      this.zfxxForm.bm = this.$store.state.user.user.uUser.bmbm;
      this.zfxxForm.xzqh = this.$store.state.user.user.uUser.xzqh;
      this.zfxxForm.lrr = this.$store.state.user.user.uUser.nickname;
    },
    indexMethod(index) {
      let start = (this.pageNo - 1) * this.pageSize;
      return start + index + 1;
    },
    formatterDatezfsj(row) {
      return formatDate(row.zfsj, "yyyy-MM-dd");
    },
    CurrentChange(val) {
      this.pageNo = val;
      this.search_query();
    },
    newAdd() {
      this.newModal = true;
      this.textTit = "添加记录";
      this.activeShow = true;
      this.zfxxForm = {};
      if (this.$refs.zfxxForms) {
        this.$refs.zfxxForms.resetFields();
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
      // this.seatch_nd ? (obj.seatch_nd = this.seatch_nd) : "";
      this.seatch_name ? (obj.zfbt = this.seatch_name) : "";
      zfxxSearch(obj).then(res => {
        let data = res.data;
        if (data.success) {
          this.zfxxList = data.data.data;
          this.totalCount = data.data.totalCount;
        } else {
          this.zfxxList = [];
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
      if (this.$refs.zfxxForms) {
        this.$refs.zfxxForms.resetFields();
      }
      this.zfxxForm = Object.assign({}, row);
    },
    btn_save() {
      let _this = this;
      this.$refs.zfxxForms.validate(valid => {
        if (valid) {
          let obj = Object.assign({}, _this.zfxxForm);
          obj.lrrId = _this.$store.state.user.user.uUser.id;
          obj.sqzt = "1";
          let url = "";
          if (!obj.id) {
            url = "add";
            zfxxSave(url, obj).then(res => {
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
            zfxxSave(url, obj).then(res => {
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
          zfxxDel(obj).then(res => {
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
  },
  mounted() {
    this.ndoptions = doCreate("ndTit");
    this.bmoptions = doCreate("bmbm");
    this.xzqhoptions = doCreate("xzqh");
    this.search_query();
  }
};
</script>



