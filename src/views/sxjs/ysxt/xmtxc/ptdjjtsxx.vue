<template>
    <div class="ptdj">
        <div v-show="applyXg">
            <el-form :inline="true" class="demo-form-inline">
                <el-form-item label="平台类型">
                    <el-select suffix-icon="el-icon-date" clearable v-model="seatch_ptlx">
                        <el-option v-for="(item,index) in ptlxoptions" :key="index" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="平台名称">
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
                            <span class="capit-content">平台搭建及推送信息</span>
                        </div>
                    </el-col>
                </el-row>
            </div>
            <div class="capit-list">
                <el-table :data="ptdjList" stripe border style="width: 100%">
                    <!-- <el-table-column type="selection"></el-table-column> -->
                    <el-table-column type="index" :index="indexMethod" label="序号" width="80"></el-table-column>
                    <el-table-column prop="ptlx" :formatter="ptlxDic" label="平台类型" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="ptmc" label="平台名称" show-overflow-tooltip></el-table-column>     
                    <el-table-column prop="sfdj" :formatter="sfDic" label="是否搭建" show-overflow-tooltip></el-table-column> 
                    <el-table-column prop="djsj" label="搭建时间" :formatter="formatterDatedjsj" show-overflow-tooltip></el-table-column>  
                    <el-table-column prop="fgld"  label="分管领导" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="gzry" label="工作人员" show-overflow-tooltip></el-table-column>  
                    <el-table-column prop="shzd"  label="信息发布审核制度" show-overflow-tooltip></el-table-column>  
                    <el-table-column prop="tssj"  label="推送时间" :formatter="formatterDatetssj" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="nrbt"  label="内容标题" show-overflow-tooltip></el-table-column>       
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
                <el-dialog :title="textTit" :visible.sync="newModal" :before-close="btn_cancel" top="9vh">          
                    <el-form :inline="true" :model="ptdjForm" ref="ptdjForms" class="demo-form-inline" label-width="150px" :rules="ptdjrules">
                        <el-row>
                            <el-col :span="11">
                                <el-form-item label="平台类型" prop="ptlx">
                                    <el-select v-model="ptdjForm.ptlx" placeholder="请选择" style="width:100%">
                                        <el-option v-for="(item,index) in ptlxoptions" :key="index" :label="item.label" :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="11" :offset="1">
                                <el-form-item label="平台名称" prop="ptmc">
                                    <el-input v-model="ptdjForm.ptmc" placeholder="平台名称"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="11">
                                <el-form-item label="是否搭建" prop="sfdj">
                                <el-select v-model="ptdjForm.sfdj" placeholder="请选择" style="width:100%">
                                        <el-option v-for="(item,index) in sfoptions" :key="index" :label="item.label" :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="11" :offset="1">
                                <el-form-item label="搭建时间" prop="djsj">
                                    <el-date-picker v-model="ptdjForm.djsj" type="date" value-format="timestamp" placeholder="搭建时间"></el-date-picker>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                        <el-col :span="11" >
                                <el-form-item label="推送时间" prop="tssj">
                                    <el-date-picker v-model="ptdjForm.tssj" type="date" value-format="timestamp" placeholder="推送时间"></el-date-picker>
                                </el-form-item>
                            </el-col>
                            <el-col :span="11" :offset="1">
                                <el-form-item label="推送数量" prop="tssl">
                                <el-input  v-model.trim="ptdjForm.tssl" placeholder="推送数量"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="11">
                                <el-form-item label="内容标题" prop="nrbt">
                                <el-input  v-model.trim="ptdjForm.nrbt" placeholder="内容标题"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="23">
                                <el-form-item label="分管领导" prop="fgld">
                                    <el-input type="textarea" v-model.trim="ptdjForm.fgld"  :autosize="{ minRows: 3 }" placeholder="分管领导"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="23">
                                <el-form-item label="工作人员" prop="gzry">
                                    <el-input type="textarea" v-model.trim="ptdjForm.gzry"  :autosize="{ minRows: 3 }" placeholder="工作人员"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    
                        <el-row>
                            <el-col :span="23">
                                <el-form-item label="信息发布审核制度" prop="shzd">
                                <el-input type="textarea" v-model.trim="ptdjForm.shzd" :autosize="{ minRows: 3 }" placeholder="信息发布审核制度"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="11">
                                <el-form-item label="行政区划" prop="xzqh">
                                    <el-select v-model="ptdjForm.xzqh" placeholder="请选择" style="width:100%" disabled>
                                        <el-option v-for="(item,index) in xzqhoptions" :key="index" :label="item.label" :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="11" :offset="1">
                                <el-form-item label="部门科室" prop="bm">
                                    <el-select v-model="ptdjForm.bm" placeholder="请选择" style="width:100%" disabled>
                                        <el-option v-for="(item,index) in bmoptions" :key="index" :label="item.label" :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="11">
                                <el-form-item label="录入人" prop="lrr">
                                    <el-input v-model="ptdjForm.lrr" placeholder="录入人" :disabled="true"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="11" :offset="1">
                                <el-form-item label="录入时间" prop="lrsj">
                                    <el-date-picker v-model="ptdjForm.lrsj" type="datetime" value-format="timestamp" placeholder="录入时间" :disabled="true"></el-date-picker>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                        <el-col :span="20" :offset="3">
                                <el-button size="small" type="success" @click="fileClick('pttp')">上传图片</el-button>
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
import { validPasInt } from "@/utils/validate";
import { ptdjSearch, ptdjSave, ptdjDel } from "@/api/sxjs/xmtxc/ptdj";
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
      seatch_ptlx: "",
      seatch_name: "",
      textTit: "",
      newModal: false,
      pageModal: false,
      activeShow: true,
      pageNo: 1,
      pageSize: 10,
      totalCount: 0,
      ptdjList: [],
      ptdjForm: {},
      ndoptions:[],
      xzqhoptions:[],
      bmoptions:[],
      ptlxoptions:[],
      sfoptions:[],
      ptdjrules: {
        ptlx: [{ required: true, message: "不能为空" }],
        ptmc: [{ required: true, message: "不能为空" }],
        tssl: [{ required: true, validator:isNumber }],
        ptmc: [{ required: true, message: "不能为空" }],
        nrbt: [{ required: true, message: "不能为空" }],
        djsj: [{ required: true, message: "不能为空" }],
        tssj: [{ required: true, message: "不能为空" }],
        fgld: [{ required: true, message: "必填项" }],
        gzry: [{ required: true, message: "必填项" }],
        sfdj :[{ required: true, message: "不能为空" }],
        shzd: [{ required: true, message: "不能为空" }],
      },
      accessoryModalInt: false,
      upShowhide: true,
      textTitFile: "",
      fileSrc: ""
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
      this.ptdjForm.lrsj = nowDate;
      this.ptdjForm.bm = this.$store.state.user.user.uUser.bmbm;
      this.ptdjForm.xzqh = this.$store.state.user.user.uUser.xzqh;
      this.ptdjForm.lrr = this.$store.state.user.user.uUser.nickname;
    },
    indexMethod(index) {
      let start = (this.pageNo - 1) * this.pageSize;
      return start + index + 1;
    },
    ptlxDic(row) {
      return getDicTab("ptlx",row.ptlx);
    },
    sfDic(row) {
      return getDicTab("sf-1",row.sfdj);
    },
    formatterDatedjsj(row) {
      return formatDate(row.djsj, "yyyy-MM-dd");
    },
    formatterDatetssj(row) {
      return formatDate(row.tssj, "yyyy-MM-dd");
    },
    CurrentChange(val) {
      this.pageNo = val;
      this.search_query();
    },
    newAdd() {
      this.newModal = true;
      this.textTit = "添加记录";
      this.activeShow = true;
      this.ptdjForm = {};
      if (this.$refs.ptdjForms) {
        this.$refs.ptdjForms.resetFields();
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
      this.seatch_ptlx ? (obj.ptlx = this.seatch_ptlx) : "";
      this.seatch_name ? (obj.ptmc = this.seatch_name) : "";
      ptdjSearch(obj).then(res => {
        let data = res.data;
        if (data.success) {
          this.ptdjList = data.data.data;
          this.totalCount = data.data.totalCount;
        } else {
          this.ptdjList = [];
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
      if (this.$refs.ptdjForms) {
        this.$refs.ptdjForms.resetFields();
      }
      this.ptdjForm = Object.assign({}, row);
    },
    btn_save() {
      let _this = this;
      this.$refs.ptdjForms.validate(valid => {
        if (valid) {
          let obj = Object.assign({}, _this.ptdjForm);
          obj.lrrId = _this.$store.state.user.user.uUser.id;
          obj.sqzt = "1";
          let url = "";
          if (!obj.id) {
            url = "add";
            ptdjSave(url, obj).then(res => {
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
            ptdjSave(url, obj).then(res => {
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
          ptdjDel(obj).then(res => {
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
        this.ptdjForm[zd] = val.newSrcstr;
    },
    fileClick(val) {
        this.accessoryModalInt = true;
        this.textTitFile = "附件";
        this.fileSrc = {
            num: Math.random(),
            fileStr: this.ptdjForm[val],
            zdName:val
        };
    },
  },
  mounted() {
    // this.ndoptions = doCreate("ndTit");
    this.bmoptions = doCreate("bmbm");
    this.xzqhoptions = doCreate("xzqh");
    this.ptlxoptions = doCreate('ptlx');
    this.sfoptions = doCreate('sf-1')
    this.search_query();
  }
};
</script>



