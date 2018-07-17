<template>
    <div class="wmcs-rjhj">
        <el-form :inline="true" class="demo-form-inline">
            <el-form-item label="年度">
                <el-select suffix-icon="el-icon-date" v-model="seatch_year" clearable>
                    <el-option v-for="(item,index) in ndoptions" :key="index" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <!-- <el-form-item label="问题接收部门">
                <el-input placeholder="问题接收部门" prefix-icon="el-icon-search" v-model.trim="seatch_js_bm"></el-input> 
            </el-form-item> -->
            <el-form-item>
                <button class="topQuery" @click="search_query">搜索</button>
                <button class="topQuery" @click="newAdd">添加记录</button>
            </el-form-item>
        </el-form>
        <div class="capit-tit">
            <el-row>
                <el-col :span="12">
                    <div class="user-left">
                        <span class="capit-content">创城人居环境</span>
                    </div>
                </el-col>
            </el-row>
        </div>
        <div class="capit-list">
            <el-table :data="rjhjList" stripe border style="width: 100%">
                <!-- <el-table-column type="selection"></el-table-column> -->
                <el-table-column type="index" :index="indexMethod" label="序号" width="80"></el-table-column>
                <el-table-column prop="year" label="年度" show-overflow-tooltip></el-table-column>
                <el-table-column prop="sj" :formatter="formatterDatesj" label="问卷调查时间" show-overflow-tooltip></el-table-column>       
                <el-table-column prop="jsBm" label="问题接收部门" show-overflow-tooltip></el-table-column>
                <el-table-column prop="hfsj" :formatter="formatterDatehfsj" label="回复时间" show-overflow-tooltip></el-table-column> 
                <el-table-column prop="xzqh" :formatter="getXzqh" label="行政区划" show-overflow-tooltip></el-table-column>
                <el-table-column prop="bm" :formatter="getBmbm" label="部门科室" show-overflow-tooltip></el-table-column>
                <el-table-column prop="lrr" label="录入人" show-overflow-tooltip></el-table-column>
                <el-table-column prop="lrsj" :formatter="formatterDatelrsj" label="录入时间" show-overflow-tooltip></el-table-column>
                <el-table-column label="操作" width="150">
                    <template slot-scope="scope">
                        <el-button size="mini" type="primary" @click="Edit(scope.row)">编辑</el-button>
                        <el-button size="mini" type="danger" @click="Del(scope.row)" >删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="fr">
                <el-pagination @current-change="CurrentChange" :current-page.sync="pageNo" :page-size="pageSize" layout="total, prev, pager, next" :total="totalCount">
                </el-pagination>
            </div>
            <!-- 新建，编辑弹框 -->
            <el-dialog :title="textTit" :visible.sync="newModal" :before-close="btn_cancel" >          
                <el-form :inline="true" :model="rjhjForm" ref="rjhjForms" class="demo-form-inline" label-width="120px" :rules="rjhjrules"> 
                    <el-row>
                        <el-col :span="11">
                            <el-form-item label="年度" prop="year">
                                <el-select v-model="rjhjForm.year" placeholder="请选择" style="width:100%">
                                    <el-option v-for="(item,index) in ndoptions2" :key="index" :label="item.label" :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="11" :offset="1">
                            <el-form-item label="问卷调查时间" prop="sj">
                                <el-date-picker v-model="rjhjForm.sj" type="date" value-format="timestamp" placeholder="问卷调查时间"></el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="11" >
                            <el-form-item label="接收行政区划" prop="jsXzqh">
                                <el-input v-model="rjhjForm.jsXzqh" placeholder="接收行政区划" @focus="modelStatus('xzqh')"></el-input>
                        </el-form-item>
                        </el-col>
                        <el-col :span="11" :offset="1">
                        <el-form-item label="问题接收部门" prop="jsBm">
                                <el-input v-model="rjhjForm.jsBm" placeholder="问题接收部门" @focus="modelStatus('bm')"></el-input>                        
                        </el-form-item>
                        </el-col>       
                    </el-row>
                    <el-row>
                        <el-col :span="11">
                            <el-form-item label="回复时间" prop="hfsj">
                                <el-date-picker v-model="rjhjForm.hfsj" type="date" value-format="timestamp" placeholder="回复时间"></el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="23">
                                <el-form-item label="主题描述" prop="ztms">  
                                    <el-input type="textarea" v-model.trim="rjhjForm.ztms" :autosize="{ minRows: 5}"></el-input>
                                </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="11">
                            <el-form-item label="行政区划" prop="xzqh">
                                <el-select v-model="rjhjForm.xzqh" placeholder="请选择" style="width:100%" disabled>
                                    <el-option v-for="(item,index) in xzqhoptions" :key="index" :label="item.label" :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="11" :offset="1">
                            <el-form-item label="部门科室" prop="bm">
                                <el-select v-model="rjhjForm.bm" placeholder="请选择" style="width:100%" disabled>
                                    <el-option v-for="(item,index) in bmoptions" :key="index" :label="item.label" :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="11">
                            <el-form-item label="录入人" prop="lrr">
                                <el-input v-model="rjhjForm.lrr" placeholder="录入人" :disabled="true"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="11" :offset="1">
                            <el-form-item label="录入时间" prop="lrsj">
                                <el-date-picker v-model="rjhjForm.lrsj" type="datetime" value-format="timestamp" placeholder="录入时间" :disabled="true"></el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="20" :offset="3">
                            <el-button size="small" type="success" @click="fileClick('fj')">附件</el-button>
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
        <!-- 行政证区划弹框 -->
        <el-dialog :title="model_Tit" :visible.sync="xzqh_model" width="50%" :before-close="xzqhClose">
            <el-tree :data="xzqh_data" @node-click="nodeClick" default-expand-all :expand-on-click-node="false" :highlight-current="true">
            </el-tree>
            <span slot="footer" class="dialog-footer">
                <!-- <el-button type="primary" @click="xzqh_save">保 存</el-button> -->
                <el-button @click="xzqhClose">取 消</el-button>
            </span>
        </el-dialog>
        <!-- 部门弹框 -->
        <el-dialog :title="model_Tit" :visible.sync="bm_model" width="50%" :before-close="xzqhClose">
            <el-tree :data="bm_data" @node-click="bmnodeClick" default-expand-all :expand-on-click-node="false" :highlight-current="true">
            </el-tree>
            <span slot="footer" class="dialog-footer">
                <!-- <el-button type="primary" @click="xzqh_save">保 存</el-button> -->
                <el-button @click="xzqhClose">取 消</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import accessoryModel from "@/components/accessoryModel";
import { doCreate, getDicTab } from "@/utils/config";
import { formatDate } from "@/utils/data";
import { wmcsSearch, wmcsSave, wmcsDel } from "@/api/zhzjs/yszzjl/wmcs/wmcswt";
import { treeQuery } from "@/api/administrative";
import { treeQueryBm } from "@/api/department";
export default {
  components: {
    accessoryModel,
  },
  data() {
    return {
      seatch_year: "",
      seatch_js_bm: "",
      textTit: "",
      newModal: false,
      pageModal: false,
      activeShow: true,
      pageNo: 1,
      pageSize: 10,
      totalCount: 0,
      rjhjList: [],
      rjhjForm: {},
      ndoptions: [],
      ndoptions2: [],
      xzqhoptions: [],
      bmoptions: [],
      rjhjrules: {
        year: [{ required: true, message: "不能为空" }],
        sj: [{ required: true, message: "不能为空" }],
        jsBm: [{ required: true, message: "不能为空" }],
        jsXzqh: [{ required: true, message: "不能为空" }],
        ztms: [{ required: true, message: "不能为空" }],
        hfsj: [{ required: true, message: "不能为空" }],
      },
      accessoryModalInt: false,
      upShowhide: true,
      textTitFile: "",
      fileSrc: "",
      model_Tit: "",
      xzqh_data: [],
      bm_data: [],
      xzqh_model: false,
      bm_model: false,
      xzqh:"",
      bmbm:"",
      userXzqh:""
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
    formatterDatesj(row) {
      return formatDate(row.sj, "yyyy-MM-dd");
    },
    formatterDatehfsj(row) {
      return formatDate(row.hfsj, "yyyy-MM-dd");
    },
    formatterDatelrsj(row) {
      return formatDate(Number(row.lrsj), "yyyy-MM-dd");
    },
    formInit() {
      let nowDate = new Date().getTime();
      this.rjhjForm.lrsj = nowDate;
      this.rjhjForm.bm = this.$store.state.user.user.uUser.bmbm;
      this.rjhjForm.xzqh = this.$store.state.user.user.uUser.xzqh;
      this.rjhjForm.lrr = this.$store.state.user.user.uUser.nickname;
    },
    CurrentChange(val) {
      this.pageNo = val;
      this.search_query();
    },
    xzqhClose() {
        this.xzqh_model = false;
        this.bm_model = false;
    },
    bmnodeClick(data) {
        this.bmbm = data.bm;
        this.rjhjForm.jsBm = data.name;
        this.xzqh_model = false;
        this.bm_model = false;
    },
    nodeClick(data) {
        this.xzqh = data.bm;
        this.rjhjForm.jsXzqh = data.name;
        this.rjhjForm.jsBm = "";
        this.xzqh_model = false;
        this.bm_model = false;
    },
    modelStatus(data) {
        let _this = this;
        if (data) {
            if (data == "xzqh") {
                this.xzqh_model = true;
                this.model_Tit = "行政区划";
                treeQuery({ bm: this.userXzqh }).then(res => {
                    let data = res.data;
                    if (data.success) {
                        _this.xzqh_data = data.data;
                        // _this.$refs.multipleTable.toggleRowSelection(_this.xzqh,true);
                    }
                });
            } else if (data == "bm") {
                if (this.rjhjForm.jsXzqh) {
                    this.bm_model = true;
                    this.model_Tit = "部门编码";
                    this.bmData();
                } else {
                    this.$message({
                        type: "warning",
                        message: "请返回选择行政区划"
                    });
                    return false;
                }
            }
        }
    },
    //查询部门树
    bmData() {
        treeQueryBm({ xzqh: this.xzqh }).then(res => {
            let data = res.data;
            if (data.success) {
                this.bm_data = data.data;
            }
        });
    },
    newAdd() {
      this.newModal = true;
      this.textTit = "添加记录";
      this.rjhjForm = {};
      if (this.$refs.rjhjForms) {
        this.$refs.rjhjForms.resetFields();
      }
      this.formInit();
    },
    search_query() {
      let obj = {
        pageNo: this.pageNo,
        pageSize: this.pageSize,
        lx: 3,
        bm: this.$store.state.user.user.uUser.bmbm,
        xzqh: this.$store.state.user.user.uUser.xzqh
      };
      this.seatch_year ? (obj.year = this.seatch_year) : "";
      this.seatch_js_bm ? (obj.jsBm = this.seatch_js_bm) : "";
      wmcsSearch(obj).then(res => {
        let data = res.data;
        if (data.success) {
          this.rjhjList = data.data.data;
          this.totalCount = data.data.totalCount;
        } else {
          this.rjhjList = [];
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
      this.textTit = "编辑";
      if (this.$refs.rjhjForms) {
        this.$refs.rjhjForms.resetFields();
      }
      this.rjhjForm = Object.assign({}, row);
    },
    btn_save() {
      let _this = this;
      this.$refs.rjhjForms.validate(valid => {
        if (valid) {
          let obj = Object.assign({}, _this.rjhjForm);
          obj.lrrId = this.$store.state.user.user.uUser.id;
          obj.lx = 3;
          let url = "";
          if (!obj.id) {
            url = "add";
            wmcsSave(url, obj).then(res => {
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
            wmcsSave(url, obj).then(res => {
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
          wmcsDel(obj).then(res => {
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
      this.rjhjForm[zd] = val.newSrcstr;
    },
    fileClick(val) {
      this.accessoryModalInt = true;
      this.textTitFile = "附件";
      this.fileSrc = {
        num: Math.random(),
        fileStr: this.rjhjForm[val],
        zdName: val
      };
    }
  },
  mounted() {
    this.ndoptions = doCreate("ndTit");
    this.ndoptions2 = doCreate("nd");
    this.bmoptions = doCreate("bmbm");
    this.xzqhoptions = doCreate("xzqh");
    this.search_query();
  }
};
</script>


