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
                        <span class="capit-content">五大建设预警</span>
                        <el-button v-show="ctIndex>0" size="small" type="warning" style="float:right;margin:3px 20px 0 0;" @click="backBtn">返回</el-button>
                    </div>
                </el-col>
            </el-row>
        </div>
        <div class="capit-list">
            <el-table :data="dateList" stripe border style="width: 100%">
                <el-table-column prop="xzqh" label="行政区划" :formatter="xzqhDic" show-overflow-tooltip></el-table-column>
                <el-table-column label="五大建设" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <span class="ctSpan" @click="ctQuery(scope.row)">{{scope.row.cdmc}}</span>
                    </template>
                </el-table-column>
                <el-table-column label=" " show-overflow-tooltip>
                    <template slot-scope="scope">
                        <span v-html="scope.row.green?scope.row.green:0"></span>
                    </template>
                </el-table-column>
                <el-table-column label=" " show-overflow-tooltip>
                    <template slot-scope="scope">
                        <span v-html="scope.row.blue?scope.row.blue:0"></span>
                    </template>
                </el-table-column>
                <el-table-column label=" " show-overflow-tooltip>
                    <template slot-scope="scope">
                        <span v-html="scope.row.yellow?scope.row.yellow:0"></span>
                    </template>
                </el-table-column>
                <el-table-column label=" " show-overflow-tooltip>
                    <template slot-scope="scope">
                        <span v-html="scope.row.red?scope.row.red:0"></span>
                    </template>
                </el-table-column>
            </el-table>
            <!-- <div class="user-page fr">
                    <el-pagination @current-change="handleCurrentChange" :current-page.sync="pageNo" :page-size="pageSize" layout="total, prev, pager, next" :total="totalCount">
                    </el-pagination>
                </div> -->
        </div>
    </div>
</template>
<script>
import { doCreate, getDicTab, moreMenu } from "@/utils/config";
import { formatDate } from "@/utils/data";
import { wdjsyjQuery } from "@/api/yjfx/yjfx";
export default {
    data() {
        return {
            seatch_year: "",
            textTit: "",
            pageTit: "",
            cdbm: "",
            newModal: false,
            pageSize: 10,
            pageNo: 1,
            totalCount: 0,
            ndoptions: [],
            dateList: [],
            ctIndex: 0,
            ctArr: {
                0: ""
            }
        };
    },
    methods: {
        xzqhDic(row) {
            return getDicTab("xzqh", row.xzqh);
        },
        backBtn() {
            delete this.ctArr[this.ctIndex];
            this.ctIndex--;
            this.ListQuery();
        },
        ctQuery(row) {
            this.cdbm = row.cdbm;
            this.ctIndex++;
            this.ctArr[this.ctIndex] = row.cdbm;
            this.ListQuery();
        },
        ListQuery() {
            let obj = {
                xzqh: this.$store.state.user.user.uUser.xzqh,
                cdbm: this.ctArr[this.ctIndex],
                flag:this.ctIndex==0?"":"CT"
            };
            this.seatch_year ? (obj.year = this.seatch_year) : "";
            wdjsyjQuery(obj).then(res => {
                let data = res.data;
                if (data.success) {
                    this.dateList = data.data.data;
                    document
                        .getElementsByClassName("cell")[2]
                        .classList.add("yjGreen");
                    document
                        .getElementsByClassName("cell")[3]
                        .classList.add("yjBlue");
                    document
                        .getElementsByClassName("cell")[4]
                        .classList.add("yjYellow");
                    document
                        .getElementsByClassName("cell")[5]
                        .classList.add("yjRed");
                } else {
                    this.$message({
                        message: data.msg,
                        type: "warning"
                    });
                }
            });
        }
    },
    mounted() {
        this.ndoptions = doCreate("nd");
        this.seatch_year = new Date().getFullYear();
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
}
</style>
<style lang="scss">
.dcyj {
    .yjGreen {
        background: green;
        width: 20px !important;
        height: 20px !important;
        border-radius: 10px;
        box-shadow: 0px 0px 10px green;
    }
    .yjBlue {
        background: blue;
        width: 20px !important;
        height: 20px !important;
        border-radius: 10px;
        box-shadow: 0px 0px 10px blue;
    }
    .yjYellow {
        background: yellow;
        width: 20px !important;
        height: 20px !important;
        border-radius: 10px;
        box-shadow: 0px 0px 10px yellow;
    }
    .yjRed {
        background: red;
        width: 20px !important;
        height: 20px !important;
        border-radius: 10px;
        box-shadow: 0px 0px 10px red;
    }
}
</style>

