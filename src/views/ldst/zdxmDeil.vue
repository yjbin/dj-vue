<template>
    <div class="zdxmDeil">

        <div class="wdjsDeilheard">
            <p @click="backCdlist" v-show="xmAndjdShow">&lt;返回首页</p><img src="../../assets/images/ldst/backPic.png" alt="" @click="backSyb" v-show="!xmAndjdShow">{{title}}</div>
        <div v-show="xmAndjdShow">
            <div class="wdjsDeilCon">
                <el-form :inline="true" class="demo-form-inline">
                    <el-form-item label="项目名称">
                        <el-input placeholder="项目名称" prefix-icon="el-icon-search" v-model.trim="seatch_xmmc"></el-input>
                    </el-form-item>
                    <el-form-item label="项目负责人">
                        <el-input placeholder="项目负责人" prefix-icon="el-icon-search" v-model.trim="seatch_fzr"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button size="mini" type="primary" @click="tableList">搜索</el-button>
                    </el-form-item>
                </el-form>
                <el-scrollbar class="page-component__scroll" style="height:100%">
                    <table style="width:100%">
                        <thead>
                            <tr>
                                <th width="5%">序号</th>
                                <th width="10%">行政区划</th>
                                <th width="10%">部门处室 </th>
                                <th width="10%">项目名称</th>
                                <th width="10%">项目负责人</th>
                                <th width="10%">建设单位</th>
                                <th width="10%">项目进度(%)</th>
                                <th width="10%">项目总额(万元)</th>
                                <th width="15%">操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item,index) in tabList" :key="index">
                                <td>{{indexMethod(index)}}</td>
                                <td>{{xzqhDic(item)}}</td>
                                <td>{{bmbmDic(item)}}</td>
                                <td>{{item.xmmc}}</td>
                                <td>{{item.fzr}}</td>
                                <td>{{item.jsdw}}</td>
                                <td>{{item.xmjd}}</td>
                                <td>{{item.xmze}}</td>
                                <td>
                                    <el-button size="mini" type="primary" @click="fileEdit(item)">查看</el-button>
                                    <el-button size="mini" type="primary" @click="planInt(item)">进度</el-button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="user-page" style="float: right;margin-top:20px;">
                        <el-pagination @current-change="handleCurrentChange" :current-page.sync="pageNo" :page-size="pageSize" layout="total, prev, pager, next" :total="totalCount">
                        </el-pagination>
                    </div>
                </el-scrollbar>
            </div>

        </div>
        <div v-show="!xmAndjdShow">
            <div class="wdjsDeilCon">
                <el-scrollbar class="page-component__scroll" style="height:100%">
                    <table style="width:100%">
                        <thead>
                            <tr>
                                <th width="5%">序号</th>
                                <th width="10%">行政区划</th>
                                <th width="10%">部门处室 </th>
                                <th width="10%">项目名称</th>
                                <th width="10%">进度负责人</th>
                                <th width="10%">开始时间</th>
                                <th width="10%">结束时间</th>
                                <th width="10%">项目进度(%)</th>
                                <th width="10%">录入人</th>
                                <th width="10%">录入时间</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item,index) in tabListJd" :key="index">
                                <td>{{indexMethodJd(index)}}</td>
                                <td>{{xzqhDic(item)}}</td>
                                <td>{{bmbmDic(item)}}</td>
                                <td>{{item.xmmc}}</td>
                                <td>{{item.jdfzr}}</td>
                                <td>{{sjDic(item.kssj)}}</td>
                                <td>{{sjDic(item.jssj)}}</td>
                                <td>{{item.xmjd}}</td>
                                <td>{{item.lrr}}</td>
                                <td>{{sjDic(item.lrsj)}}</td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="user-page" style="float: right;margin-top:20px;">
                        <el-pagination @current-change="handleCurrentChangeJd" :current-page.sync="pageNoJd" :page-size="pageSizeJd" layout="total, prev, pager, next" :total="totalCountJd">
                        </el-pagination>
                    </div>
                </el-scrollbar>
            </div>
        </div>
        <zdxm-ck-model :newModal="zdxmModalInt" :editObj="editObj" @colseTog="colseTog"></zdxm-ck-model>
    </div>
</template>
<script>
import { dateQuery } from "@/api/zfjs/zdxm";
import { dateQuery2 } from "@/api/zfjs/xmjdListmoudel";
import { getDicTab } from "@/utils/config";
import { formatDate } from "@/utils/data";
import zdxmCkModel from "./zdxmCkModel";
export default {
    components: {
        zdxmCkModel
    },
    data() {
        return {
            title: "重点项目预警",
            seatch_xmmc: "",
            seatch_fzr: "",
            tabList: [],
            tabListJd: [],
            newModalToggle: true,
            xmAndjdShow: true,
            zdxmModalInt: false,
            pageNo: 1,
            pageSize: 10,
            totalCount: 0,
            pageNoJd: 1,
            pageSizeJd: 10,
            totalCountJd: 0,
            editObj: {}
        };
    },
    props: {},
    watch: {},
    methods: {
        sjDic(row) {
            return formatDate(row, "yyyy-MM-dd");
        },
        xzqhDic(row) {
            return getDicTab("xzqh", row.xzqh);
        },
        bmbmDic(row) {
            return getDicTab("bmbm", row.bm);
        },
        tableList() {
            let obj = {
                pageNo: this.pageNo,
                pageSize: this.pageSize,
                bm: this.$store.state.user.user.uUser.bmbm,
                xzqh: this.$store.state.user.user.uUser.xzqh
            };
            this.seatch_xmmc ? (obj.xmmc = this.seatch_xmmc) : "";
            this.seatch_fzr ? (obj.fzr = this.seatch_fzr) : "";
            dateQuery(obj).then(res => {
                let data = res.data;
                if (data.success) {
                    this.tabList = data.data.data;
                    this.totalCount = data.data.totalCount;
                } else {
                    this.tabList = [];
                    this.totalCount = 0;
                    this.$message({
                        message: data.msg,
                        type: "warning"
                    });
                }
            });
        },
        tableListJd(val) {
            let obj = {
                pageNo: this.pageNoJd,
                pageSize: this.pageSizeJd,
                xmid: val.id
            };
            this.seatch_xmmc ? (obj.xmmc = this.seatch_xmmc) : "";
            this.seatch_fzr ? (obj.fzr = this.seatch_fzr) : "";
            dateQuery2(obj).then(res => {
                let data = res.data;
                if (data.success) {
                    this.tabListJd = data.data.data;
                    this.totalCountJd = data.data.totalCount;
                } else {
                    this.tabListJd = [];
                    this.totalCountJd = 0;
                    this.$message({
                        message: data.msg,
                        type: "warning"
                    });
                }
            });
        },
        fileEdit(val) {
            this.zdxmModalInt = true;
            this.editObj = val;
        },
        planInt(val) {
            this.tableListJd(val);
            this.xmAndjdShow = false;
        },
        colseTog(val) {
            this.zdxmModalInt = val;
        },
        backCdlist() {
            this.$emit("newToggle2", this.newModalToggle);
        },
        indexMethod(index) {
            let start = (this.pageNo - 1) * this.pageSize;
            return start + index + 1;
        },

        handleCurrentChange(val) {
            this.pageNo = val;
            this.tableList();
        },
        indexMethodJd(index) {
            let start = (this.pageNoJd - 1) * this.pageSizeJd;
            return start + index + 1;
        },
        handleCurrentChangeJd(val) {
            this.pageNoJd = val;
            this.tableListJd();
        },
        backSyb() {
            this.xmAndjdShow = true;
        }
    },
    mounted() {
        this.tableList();
    }
};
</script>


<style lang="scss" scoped>
.zdxmDeil {
    width: 70%;
    height: 76%;
    margin: auto;
    margin-top: 6%;
    .wdjsDeilheard {
        color: #fff;
        font-size: 24px;
        text-align: center;
        height: 40px;
        img {
            float: right;
            cursor: pointer;
        }
        p {
            float: left;
            cursor: pointer;
            background: url("../../assets/images/ldst/backSyPic.png") no-repeat
                center;
            font-size: 14px;
            width: 100px;
            height: 30px;
            background-size: 100% 100%;
            margin: 0;
            color: #114071;
            text-align: center;
            line-height: 30px;
        }
    }
    .wdjsDeilCon {
        width: 96%;
        height: 65vh;
        background: url("../../assets/images/ldst/tablePic.png") no-repeat;
        background-size: 100% 100%;
        padding: 2%;
    }
    table {
        border-collapse: collapse;
        overflow: hidden;
        thead {
            tr {
                background-color: #114071;
                th {
                    height: 3vh;
                    line-height: 3vh;
                    text-align: center;
                    color: #fff;
                    font-size: 0.8vw;
                    font-weight: 900;
                    span {
                        display: inline-block;
                        margin-top: 1vh;
                    }
                }
            }
        }
        .hidden {
            display: none;
        }
        .pointerClass {
            cursor: pointer;
        }
    }
    table,
    table tr th,
    table tr td {
        border: 1px solid #07689b;
    }
    tbody {
        tr {
            td {
                height: 3.6vh;
                line-height: 2.6vh;
                font-size: 0.8vw;
                color: #fff;
                text-align: center;
            }
        }
    }
}
</style>
<style lang="scss">
.zdxmDeil {
    .page-component__scroll {
        height: 100%;
        .page-component__scroll .el-scrollbar__wrap {
            overflow: auto;
        }
        .el-scrollbar__wrap {
            overflow-x: hidden;
            margin-bottom: 0 !important;
        }
    }
    .el-pager li {
        background: #1162ef;
    }
    .el-pagination button {
        background: #1162ef;
    }
    .el-pagination__total {
        color: #1162ef;
    }
    .el-input__inner {
        height: 30px;
        background: none;
    }
    .el-form-item__label {
        color: #fff;
    }
}
</style>

