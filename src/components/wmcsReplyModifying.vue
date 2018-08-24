<template>
    <div class="rrhs">
        <div v-show="applyXg">
            <div class="capit-tit">
                <el-row>
                    <el-col :span="24">
                        <div class="user-left">
                            <span class="capit-content">回复列表</span>
                            <el-button size="small" type="warning" style="float:right;margin:3px 20px 0 0;" @click="backBtn">返回</el-button>
                        </div>
                    </el-col>
                </el-row>
            </div>
            <div class="capit-list">
                <el-table :data="dateList" stripe border style="width: 100%">
                    <el-table-column type="index" :index="indexMethod" label="序号" width="80"></el-table-column>
                    <el-table-column prop="zgr" label="整改人" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="zgsj" label="整改时间" :formatter="sjDic" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="zgqk" label="整改情况" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="wtms" label="问题描述" show-overflow-tooltip></el-table-column>
                    <el-table-column label="操作" width="250">
                        <template slot-scope="scope">
                            <el-button size="mini" type="primary" @click="fileEdit(scope.row)">{{((scope.row.sqzt=='3' && sfdqyh(scope.row))?'编辑':'查看')}}</el-button>
                            <el-button v-if="scope.row.sqzt=='1'" size="mini" type="primary" @click="applyClick(scope.row)">申请</el-button>
                            <el-button v-if="scope.row.sqzt=='2'" size="mini" type="primary" @click="applyClick(scope.row)">申请中</el-button>
                            <el-button v-if="scope.row.sqzt=='3'" size="mini" type="primary" @click="applyClick(scope.row)">通过</el-button>
                            <el-button v-if="scope.row.sqzt=='-1'" size="mini" type="primary" @click="applyClick(scope.row)">驳回</el-button>
                            <el-button size="mini" v-show="remarkHq()=='admin'" type="danger" @click="listDel(scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="user-page fr">
                    <el-pagination @current-change="handleCurrentChange" :current-page.sync="pageNo" :page-size="pageSize" layout="total, prev, pager, next" :total="totalCount">
                    </el-pagination>
                </div>
            </div>
        </div>
        <transition enter-active-class="animated zoomIn">
            <div v-show="!applyXg">
                <applyr-Modifying3 :applyCode="applyCode" @btnBack3="btnBack3"></applyr-Modifying3>
            </div>
        </transition>
        <reply-moudel :replyObj="replyObj" :newReplyModal="newReplyModal" @replynewToggle="replynewToggle"></reply-moudel>
    </div>

</template>
<script>
import applyrModifying3 from "./applyrModifying3";
import replyMoudel from "@/views/zhzjs/gcsjjcbsqk/wmcscj/replyMoudel";
import { doCreate, getDicTab, moreMenu, remark } from "@/utils/config";
import { formatDate } from "@/utils/data";
import { dateQuery } from "@/api/zhzjs/wmcsreply";
export default {
    components: {
        replyMoudel,
        applyrModifying3
    },
    data() {
        return {
            dateList: [],
            applyCode:{},
            applyXg: true,
            newModal: false,
            newReplyModal: false,
            pageSize: 3,
            pageNo: 1,
            totalCount: 0,
            userXzqh: this.$store.state.user.user.uUser.xzqh,
            userBmbm: this.$store.state.user.user.uUser.bmbm,
            wmcswtId: "",
            userXzqh: this.$store.state.user.user.uUser.xzqh,
            userBmbm: this.$store.state.user.user.uUser.bmbm,
            replyObj:{}
        };
    },
    props: {
        replyObj2: Object
    },
    watch: {
        replyObj2: {
            handler: function(val) {
                if (val) {
                    this.wmcswtId = val.wmcswtId;
                    this.ListQuery();
                }
            },
            deep: true
        }
    },
    methods: {
        remarkHq() {
            return remark(this);
        },
        sfdqyh(row) {
            if (this.userXzqh == row.xzqh && this.userBmbm == row.bm) {
                return true;
            } else {
                return false;
            }
        },
        applyClick(row) {
            this.applyXg = false;
            let obj = Object.assign({}, row);
            this.applyCode = obj;
        },
        sjDic(row) {
            return formatDate(row.zgsj, "yyyy-MM-dd");
        },
        indexMethod(index) {
            let start = (this.pageNo - 1) * this.pageSize;
            return start + index + 1;
        },

        backBtn() {
            this.newModal = true;
            this.$emit("btnBack", this.newModal);
        },
        btnBack3(val) {
            this.applyXg =val;
            this.ListQuery();
        },
        fileEdit(row) {
            this.newReplyModal = true;
            this.replyObj = Object.assign({},row);
            if (row.sqzt == "3" && this.sfdqyh(row)) {
                this.textTit = "编辑";
                this.activeShow = true;
            } else {
                this.textTit = "查看";
                this.activeShow = false;
            }
        },
        replynewToggle(val) {
            this.newReplyModal = val;
            this.ListQuery();
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
                    dateDel(obj).then(res => {
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
                wmcswtId: this.wmcswtId,
                remark: this.$store.state.user.user.uRole.remark
            };
            dateQuery(obj).then(res => {
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
        }
    },
    mounted() {}
};
</script>

