<template>
  <div class="jrfd">
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="年度">
        <el-select suffix-icon="el-icon-date" v-model="seatch_nd" clearable>
          <el-option v-for="(item,index) in ndoptions" :key="index" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <!-- <el-form-item label="查询条件">
                <el-input placeholder="请输入..." prefix-icon="el-icon-search" v-model.trim="seatch_name"></el-input>
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
            <span class="capit-content">今日汾东</span>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="capit-list">
      <el-table :data="jrfdList" stripe border style="width: 100%">
        <!-- <el-table-column type="selection"></el-table-column> -->
        <el-table-column type="index" :index="indexMethod" label="序号" width="80"></el-table-column>
        <el-table-column prop="year" label="年度" show-overflow-tooltip></el-table-column>
        <el-table-column prop="tgsj" label="投稿时间" :formatter="formatterDatetgsj" show-overflow-tooltip></el-table-column>
        <el-table-column prop="tgr" label="投稿人" show-overflow-tooltip></el-table-column>
        <el-table-column prop="fgsj" :formatter="formatterDatefgsj" label="发稿时间" show-overflow-tooltip></el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="Edit(scope.row)">编辑</el-button>
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
        <el-form :inline="true" :model="jrfdForm" ref="jrfdForms" class="demo-form-inline" label-width="120px" :rules="jrfdrules">
          <el-row>
            <el-col :span="11">
              <el-form-item label="投稿时间" prop="tgsj">
                <el-date-picker ref="tgDate" v-model="jrfdForm.tgsj" type="date" value-format="timestamp" placeholder="投稿时间" :picker-options="limitStartTime"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="11" :offset="1">
              <el-form-item label="投稿人" prop="tgr">
                <el-input v-model.trim="jrfdForm.tgr" placeholder="投稿人"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="11">
              <el-form-item label="发稿时间" prop="fgsj">
                <el-date-picker ref="fgDate" v-model="jrfdForm.fgsj" type="date" value-format="timestamp" placeholder="发稿时间" :picker-options="limitEndTime"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="11" :offset="1">
              <el-form-item label="年度" prop="year" >
                <el-select v-model="jrfdForm.year" style="width:100%">
                  <el-option v-for="(item,index) in ndoptions2" :key="index" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="23">
              <el-form-item label="投稿内容" prop="tgnr">
                <el-input type="textarea" v-model.trim="jrfdForm.tgnr" :autosize="{ minRows: 5}" placeholder="投稿内容"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="23">
              <el-form-item label="发稿内容" prop="fgnr">
                <el-input type="textarea" v-model.trim="jrfdForm.fgnr" :autosize="{ minRows: 5}" placeholder="发稿内容"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="11">
              <el-form-item label="行政区划" prop="xzqh">
                <el-select v-model="jrfdForm.xzqh" placeholder="请选择" style="width:100%" disabled>
                  <el-option v-for="(item,index) in xzqhoptions" :key="index" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="11" :offset="1">
              <el-form-item label="部门科室" prop="bm">
                <el-select v-model="jrfdForm.bm" placeholder="请选择" style="width:100%" disabled>
                  <el-option v-for="(item,index) in bmoptions" :key="index" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="11">
              <el-form-item label="录入人" prop="lrr">
                <el-input v-model="jrfdForm.lrr" placeholder="录入人" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11" :offset="1">
              <el-form-item label="录入时间" prop="lrsj">
                <el-date-picker v-model="jrfdForm.lrsj" type="datetime" value-format="timestamp" placeholder="录入时间" :disabled="true"></el-date-picker>
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
</template>
<script>
import accessoryModel from "@/components/accessoryModel";
import { doCreate, getDicTab } from "@/utils/config";
import { formatDate } from "@/utils/data";
import { jrfdSearch, jrfdSave, jrfdDel } from "@/api/sxjs/mtxc/jrfd";
export default {
    components: {
        accessoryModel
    },
    data() {
        return {
            seatch_nd: "",
            seatch_name: "",
            textTit: "",
            newModal: false,
            pageModal: false,
            activeShow: true,
            pageNo: 1,
            pageSize: 10,
            totalCount: 0,
            jrfdList: [],
            jrfdForm: {},
            ndoptions: [],
            ndoptions2: [],
            xzqhoptions: [],
            bmoptions: [],
            jrfdrules: {
                tgsj: [{ required: true, message: "不能为空" }],
                tgnr: [{ required: true, message: "不能为空" }],
                tgn: [{ required: true, message: "不能为空" }],
                fgsj: [{ required: true, message: "不能为空" }],
                fgnr: [{ required: true, message: "不能为空" }]
            },
            limitStartTime: {
                disabledDate: time => {
                    var end_time = this.jrfdForm.fgsj;
                    if (end_time) {
                        return time.getTime() > end_time;
                    }
                }
            },
            limitEndTime: {
                disabledDate: time => {
                    var start_time = this.jrfdForm.tgsj;
                    if (start_time) {
                        return time.getTime() < start_time;
                    }
                }
            }
        };
    },
    methods: {
        btn_cancel() {
            this.newModal = false;
        },
        formInit() {
            let nowDate = new Date().getTime();
            this.jrfdForm.lrsj = nowDate;
            this.jrfdForm.bm = this.$store.state.user.user.uUser.bmbm;
            this.jrfdForm.xzqh = this.$store.state.user.user.uUser.xzqh;
            this.jrfdForm.lrr = this.$store.state.user.user.uUser.nickname;
        },
        indexMethod(index) {
            let start = (this.pageNo - 1) * this.pageSize;
            return start + index + 1;
        },
        formatterDatetgsj(row) {
            return formatDate(row.tgsj, "yyyy-MM-dd");
        },
        formatterDatefgsj(row) {
            return formatDate(row.fgsj, "yyyy-MM-dd");
        },
        CurrentChange(val) {
            this.pageNo = val;
            this.search_query();
        },
        newAdd() {
            this.newModal = true;
            this.textTit = "添加记录";
            this.jrfdForm = {};
            if (this.$refs.jrfdForms) {
                this.$refs.jrfdForms.resetFields();
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
            this.seatch_nd ? (obj.year = this.seatch_nd) : "";
            // this.seatch_name ? (obj.seatch_name = this.seatch_name) : "";
            jrfdSearch(obj).then(res => {
                let data = res.data;
                if (data.success) {
                    this.jrfdList = data.data.data;
                    this.totalCount = data.data.totalCount;
                } else {
                    this.jrfdList = [];
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
            if (this.$refs.jrfdForms) {
                this.$refs.jrfdForms.resetFields();
            }
            this.jrfdForm = Object.assign({}, row);
        },
        btn_save() {
            let _this = this;
            this.$refs.jrfdForms.validate(valid => {
                if (valid) {
                    let obj = Object.assign({}, _this.jrfdForm);
                    obj.lrrId = _this.$store.state.user.user.uUser.id;
                    let url = "";
                    if (!obj.id) {
                        url = "add";
                        jrfdSave(url, obj).then(res => {
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
                        jrfdSave(url, obj).then(res => {
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
                    jrfdDel(obj).then(res => {
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



