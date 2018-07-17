<template>
  <div class="qjjy">
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="年度">
        <el-select suffix-icon="el-icon-date" v-model="seatch_nd" clearable>
          <el-option v-for="(item,index) in ndoptions" :key="index" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="月份">
        <el-select suffix-icon="el-icon-date" v-model="seatch_month" clearable>
          <el-option v-for="(item,index) in monthoptions" :key="index" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
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
            <span class="capit-content">厉行勤俭节约</span>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="capit-list">
      <el-table :data="qjjyList" stripe border style="width: 100%">
        <!-- <el-table-column type="selection"></el-table-column> -->
        <el-table-column type="index" :index="indexMethod" label="序号" width="80"></el-table-column>
        <el-table-column prop="xzqh" :formatter="getXzqh" label="行政区划" show-overflow-tooltip></el-table-column>
        <el-table-column prop="bm" :formatter="getBmbm" label="部门科室" show-overflow-tooltip></el-table-column>
        <el-table-column prop="year" label="年度" show-overflow-tooltip></el-table-column>
        <el-table-column prop="month" label="月份" show-overflow-tooltip></el-table-column>
        <el-table-column prop="ysje" label="预算金额" show-overflow-tooltip></el-table-column>
        <el-table-column prop="zcje" label="支出金额" show-overflow-tooltip></el-table-column>
        <el-table-column prop="zcr" label="支出人" show-overflow-tooltip></el-table-column>
        <el-table-column prop="zcsj" :formatter="formatterDatezcsj" label="支出时间" show-overflow-tooltip></el-table-column>
        <el-table-column prop="zcyy" label="支出事由" show-overflow-tooltip></el-table-column>
        <!-- <el-table-column prop="lrr" label="录入人" show-overflow-tooltip></el-table-column>
                <el-table-column prop="lrsj" :formatter="formatterDatelrsj" label="录入时间" show-overflow-tooltip></el-table-column> -->

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
        <el-form :inline="true" :model="qjjyForm" ref="qjjyForms" class="demo-form-inline" label-width="120px" :rules="qjjyrules">
          <el-row>
            <el-col :span="11">
              <el-form-item label="年度" prop="year">
                <el-select v-model="qjjyForm.year" placeholder="请选择" style="width:100%">
                  <el-option v-for="(item,index) in ndoptions" :key="index" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="11" :offset="1">
              <el-form-item label="月份" prop="month">
                <el-select v-model="qjjyForm.month" placeholder="请选择" style="width:100%">
                  <el-option v-for="(item,index) in month" :key="index" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="11">
              <el-form-item label="预算金额" prop="ysje">
                <el-input v-model.trim="qjjyForm.ysje" placeholder="预算金额"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11" :offset="1">
              <el-form-item label="支出金额" prop="zcje">
                <el-input v-model.trim="qjjyForm.zcje" placeholder="支出金额"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="11">
              <el-form-item label="支出人" prop="zcr">
                <el-input v-model.trim="qjjyForm.zcr" placeholder="支出人"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11" :offset="1">
              <el-form-item label="支出时间" prop="zcsj">
                <el-date-picker v-model="qjjyForm.zcsj" type="date" value-format="timestamp" placeholder="支出时间"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="23">
              <el-form-item label="支出事由" prop="zcyy">
                <el-input type="textarea" v-model.trim="qjjyForm.zcyy" :autosize="{ minRows: 5}" placeholder="支出事由"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="11">
              <el-form-item label="行政区划" prop="xzqh">
                <el-select v-model="qjjyForm.xzqh" placeholder="请选择" style="width:100%" disabled>
                  <el-option v-for="(item,index) in xzqhoptions" :key="index" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="11" :offset="1">
              <el-form-item label="部门科室" prop="bm">
                <el-select v-model="qjjyForm.bm" placeholder="请选择" style="width:100%" disabled>
                  <el-option v-for="(item,index) in bmoptions" :key="index" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="11">
              <el-form-item label="录入人" prop="lrr">
                <el-input v-model="qjjyForm.lrr" placeholder="录入人" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11" :offset="1">
              <el-form-item label="录入时间" prop="lrsj">
                <el-date-picker v-model="qjjyForm.lrsj" type="datetime" value-format="timestamp" placeholder="录入时间" :disabled="true"></el-date-picker>
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
</template>
<script>
import accessoryModel from "@/components/accessoryModel";
import { doCreate, getDicTab } from "@/utils/config";
import { formatDate } from "@/utils/data";
import { validMoney } from "@/utils/validate";
import {
    qjjySearch,
    qjjySave,
    qjjyDel
} from "@/api/zfjs/lszhbxgdjshzzsfwt/qjjy";
export default {
    components: {
        accessoryModel
    },
    data() {
        const validOfMoney = (rule, value, callback) => {
            if (!validMoney(value)) {
                callback(new Error("请输入正确的金额~"));
            } else {
                callback();
            }
        };
        return {
            seatch_nd: "",
            seatch_month: "",
            textTit: "",
            newModal: false,
            pageModal: false,
            activeShow: true,
            pageNo: 1,
            pageSize: 10,
            totalCount: 0,
            qjjyList: [],
            qjjyForm: {},
            ndoptions: [],
            monthoptions: [],
            month: [],
            xzqhoptions: [],
            bmoptions: [],
            xmoptions: [],
            qjjyrules: {
                year: [{ required: true, message: "不能为空" }],
                month: [{ required: true, message: "不能为空" }],
                ysje: [{ required: true, validator: validOfMoney }],
                zcsj: [{ required: true, message: "不能为空" }],
                zcr: [{ required: true, message: "不能为空" }],
                zcje: [{ required: true, validator: validOfMoney }],
                zcyy: [{ required: true, message: "不能为空" }]
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
            this.qjjyForm.lrsj = nowDate;
            this.qjjyForm.bm = this.$store.state.user.user.uUser.bmbm;
            this.qjjyForm.xzqh = this.$store.state.user.user.uUser.xzqh;
            this.qjjyForm.lrr = this.$store.state.user.user.uUser.nickname;
        },
        CurrentChange(val) {
            this.pageNo = val;
            this.search_query();
        },
        newAdd() {
            this.newModal = true;
            this.textTit = "添加记录";
            this.qjjyForm = {};
            if (this.$refs.qjjyForms) {
                this.$refs.qjjyForms.resetFields();
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
            this.seatch_month ? (obj.month = this.seatch_month) : "";
            qjjySearch(obj).then(res => {
                let data = res.data;
                if (data.success) {
                    this.qjjyList = data.data.data;
                    this.totalCount = data.data.totalCount;
                } else {
                    this.qjjyList = [];
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
            if (this.$refs.qjjyForms) {
                this.$refs.qjjyForms.resetFields();
            }
            this.qjjyForm = Object.assign({}, row);
        },
        btn_save() {
            let _this = this;
            this.$refs.qjjyForms.validate(valid => {
                if (valid) {
                    let obj = Object.assign({}, _this.qjjyForm);
                    obj.lrrId = this.$store.state.user.user.uUser.id;
                    let url = "";
                    if (!obj.id) {
                        url = "add";
                        qjjySave(url, obj).then(res => {
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
                        qjjySave(url, obj).then(res => {
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
                    qjjyDel(obj).then(res => {
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
            this.qjjyForm[zd] = val.newSrcstr;
        },
        fileClick(val) {
            this.accessoryModalInt = true;
            this.textTitFile = "附件";
            this.fileSrc = {
                num: Math.random(),
                fileStr: this.qjjyForm[val],
                zdName: val
            };
        }
    },
    mounted() {
        this.ndoptions = doCreate("nd");
        this.bmoptions = doCreate("bmbm");
        this.xzqhoptions = doCreate("xzqh");
        this.month = doCreate("month");
        this.monthoptions = doCreate("month");
        this.search_query();
    }
};
</script>



