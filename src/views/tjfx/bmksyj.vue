<template>
    <div class="dcyj">
        <el-form :inline="true" class="demo-form-inline">
            <el-form-item label="年度">
                <el-select suffix-icon="el-icon-date" v-model="seatch_year">
                    <el-option v-for="(item,index) in ndoptions" :key="index" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <button type="primary" @click="ListQuery" class="topQuery">搜索</button>
            </el-form-item>
        </el-form>
        <div class="capit-tit">
            <el-row>
                <el-col :span="24">
                    <div class="user-left">
                        <span class="capit-content">部门科室预警</span>
                        <el-button v-show="ctIndex>0" size="mini" type="warning" style="float:right;margin:5px 20px 0 0;" @click="backBtn">返回</el-button>
                        <el-button class="export" size="mini" type="success" @click.prevent="exportModel('bmks')">导出</el-button>
                        <el-button class="export1" size="mini" type="warning" @click.prevent="printModel('printBox')">打印</el-button>
                    </div>
                </el-col>
            </el-row>
        </div>
        <div class="capit-list" id="printBox">
            <el-scrollbar style="height:100%">
                <el-table :data="dateList" id="bmks" stripe border style="width: 100%" empty-text="0">
                    <el-table-column label="部门科室" show-overflow-tooltip>
                        <template slot-scope="scope">
                            <span class="ctSpan" @click="ctQuery(scope.row)">{{bmbmDic(scope.row)}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="绿灯" show-overflow-tooltip>
                        <template slot-scope="scope">
                            <span v-html="scope.row.green?scope.row.green:0"></span>
                        </template>
                    </el-table-column>
                    <el-table-column label="蓝灯" show-overflow-tooltip>
                        <template slot-scope="scope">
                            <span v-html="scope.row.blue?scope.row.blue:0"></span>
                        </template>
                    </el-table-column>
                    <el-table-column label="黄灯" show-overflow-tooltip>
                        <template slot-scope="scope">
                            <span v-html="scope.row.yellow?scope.row.yellow:0"></span>
                        </template>
                    </el-table-column>
                    <el-table-column label="红灯" show-overflow-tooltip>
                        <template slot-scope="scope">
                            <span v-html="scope.row.red?scope.row.red:0"></span>
                        </template>
                    </el-table-column>
                </el-table>
            </el-scrollbar>
            <!-- <div class="user-page fr">
                    <el-pagination @current-change="handleCurrentChange" :current-page.sync="pageNo" :page-size="pageSize" layout="total, prev, pager, next" :total="totalCount">
                    </el-pagination>
                </div> -->
        </div>
        <div class="tjtDiv" v-show="tjtModel">
            <div class="tjtImg" id="chart_two">1111111111</div>
            <div class="tjtImg" id="chart_one">2222222</div>
            <div class="tjtImg" id="chart_four">333333333333333</div>
        </div>
    </div>
</template>
<script>
import { doCreate, getDicTab, moreMenu,exportExcel,printExcel } from "@/utils/config";
import { formatDate } from "@/utils/data";
import { bmyjQuery, wdjsytjt, createCharts, chartsJsonOne, chartsJsonTwo, chartsJsonFour  } from "@/api/yjfx/yjfx_bm";
export default {
    data() {
        return {
            seatch_year: "",
            textTit: "",
            pageTit: "",
            xzqh: "",
            newModal: false,
            pageSize: 10,
            pageNo: 1,
            totalCount: 0,
            ndoptions: [],
            dateList: [],
            detailList:[],
            ctIndex: 0,
            ctArr: {
                0: ""
            },
            tjtModel:true
        };
    },
    methods: {
        bmbmDic(row) {
            return getDicTab("bmbm", row.bm);
        },
        backBtn() {
            this.tjtModel = true;
            delete this.ctArr[this.ctIndex];
            this.ctIndex--;
            this.ListQuery();
        },
        ctQuery(row) {
            this.xzqh = row.bm;
            this.ctIndex++;
            this.ctArr[this.ctIndex] = row.bm;
            this.ListQuery();
        },
        ListQuery() {
            let _this = this;
            let obj = {
                xzqh: this.$store.state.user.user.uUser.xzqh,
                // bm: this.ctIndex==0?this.$store.state.user.user.uUser.bmbm:this.ctArr[this.ctIndex],
                flag:this.ctIndex==0?"":"CT"
            };
            this.seatch_year ? (obj.year = this.seatch_year) : "";
            if(this.ctIndex==0){
                if(_this.$store.state.user.user.uRole.remark.indexOf("czy")!="-1" || _this.$store.state.user.user.uRole.remark.indexOf("ld_bm")!="-1"){
                    obj.bm = _this.$store.state.user.user.uUser.bmbm;
                }
            }else{
                obj.bm = this.ctArr[this.ctIndex]
            }
            
            bmyjQuery(obj).then(res => {
                let data = res.data;
                if (data.success) {
                    if(data.data.data.length =="0"){
                        this.tjtModel = false;
                    };
                    this.dateList = data.data.data;
                    chartsJsonTwo(data.data.data);
                    document
                        .getElementsByClassName("cell")[1]
                        .classList.add("yjGreen");
                    document
                        .getElementsByClassName("cell")[2]
                        .classList.add("yjBlue");
                    document
                        .getElementsByClassName("cell")[3]
                        .classList.add("yjYellow");
                    document
                        .getElementsByClassName("cell")[4]
                        .classList.add("yjRed");
                } else {
                    this.$message({
                        message: data.msg,
                        type: "warning"
                    });
                }
            });
            wdjsytjt(obj).then(res => {
                let data = res.data;
                if (data.success) {
                    if(data.data.data.length =="0"){
                        this.tjtModel = false;
                    };
                    this.detailList = data.data.data;
                    chartsJsonOne(data.data.data)
                    chartsJsonFour(data.data.data)
                } else {
                    this.$message({
                        message: data.msg,
                        type: "warning"
                    });
                }
            });
        },
         //导出
        exportModel(option){
              exportExcel(option);
        },
        //打印
        printModel(id){
            printExcel(id);
        }
    },
    mounted() {
        this.ndoptions = doCreate("nd");
        this.seatch_year = new Date().getFullYear();
        this.$nextTick(function(){
            createCharts();
        });
        this.ListQuery();
    }
};
</script>
<style lang="scss" scoped>
.dcyj {
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
    .ctSpan {
        cursor: pointer;
    }
    .capit-list{
        height: 33vh;
        overflow: auto;
    }
    .tjtDiv{
        margin-top: 20px;
        display: flex;
        height: 35vh;
        .tjtImg{
            flex: 1;
        }
    }
}
</style>
<style lang="scss">
.dcyj {
    .yjGreen {
        color: transparent;
        background: #0e841f;
        width: 20px !important;
        height: 20px !important;
        border-radius: 10px;
        box-shadow: 0px 0px 10px #0e841f;
        font-size: 0;
    }
    .yjBlue {
        color: transparent;
        background: #d7b515;
        width: 20px !important;
        height: 20px !important;
        border-radius: 10px;
        box-shadow: 0px 0px 10px #d7b515;
        font-size: 0;
    }
    .yjYellow {
        color: transparent;
        background: #df5307;
        width: 20px !important;
        height: 20px !important;
        border-radius: 10px;
        box-shadow: 0px 0px 10px #df5307;
        font-size: 0;
    }
    .yjRed {
        color: transparent;
        background: #d70000;
        width: 20px !important;
        height: 20px !important;
        border-radius: 10px;
        box-shadow: 0px 0px 10px #d70000;
        font-size: 0;
    }
    .el-scrollbar__wrap {
        overflow-x: hidden;
    }
}
</style>
