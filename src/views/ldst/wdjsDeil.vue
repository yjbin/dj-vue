<template>
    <div class="wdjsDeil">
        <div class="wdjsDeilheard">
            <p @click="backCdlist">&lt;返回首页</p><img src="../../assets/images/ldst/backPic.png" alt="" @click="backSyb" v-show="ctIndex>0">{{title}}</div>
        <div class="wdjsDeilCon">
            <el-scrollbar class="page-component__scroll" style="height:100%">
                <table style="width:100%">

                    <thead>
                        <tr>
                            <th width="20%">五大建设</th>
                            <th width="20%">预警项目</th>
                            <th width="10%">
                                <span class="yjGreen"></span>
                            </th>
                            <th width="10%">
                                <span class="yjBlue"> </span>
                            </th>
                            <th width="10%">
                                <span class="yjYellow"> </span>
                            </th>
                            <th width="10%">
                                <span class="yjRed"> </span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item,index) in tabList" :key="index">
                            <td :rowspan="item.pIdspan" :class="{hidden: item.pIddis}">{{CdDic(item.pId)}}</td>
                            <td :rowspan="item.cdmcspan" :class="{hidden: item.cdmcmdis,pointerClass:true}" @click="ctClick(item.cdbm)">{{item.cdmc}}</td>
                            <td>{{item.green}}</td>
                            <td>{{item.blue}}</td>
                            <td>{{item.yellow}}</td>
                            <td>{{item.red}}</td>
                        </tr>
                    </tbody>
                </table>
            </el-scrollbar>
        </div>
    </div>
</template>
<script>
import { wdjsDetillQuery } from "@/api/ldst";
import { getDicTab } from "@/utils/config";
export default {
    data() {
        return {
            title: "五大建设预警",
            // items: [],
            tabList: [],
            ctIndex: 0,
            newModalToggle: true,
            ctLevel: {
                0: "2"
            },
            ctCode: {
                0: ""
            }
        };
    },
    props: {},
    watch: {},
    methods: {
        CdDic(val) {
            return getDicTab("cd", val);
        },
        tableList() {
            let obj = {
                year: new Date().getFullYear(),
                code: this.ctCode[this.ctIndex],
                level: this.ctLevel[this.ctIndex]
            };
            wdjsDetillQuery(obj).then(res => {
                let data = res.data;
                let arr = [];
                if (data.success) {
                    if (data.data.data.length) {
                        arr = data.data.data.map(i => {
                            i.pId = i.cdbm.substring(0, 2);
                            return i;
                        });
                        this.tabList = arr;
                        this.combineCell(this.tabList);
                    } else {
                        this.ctIndex--;
                    }
                }
            });
        },
        combineCell(list) {
            for (let field in list[0]) {
                let k = 0;
                while (k < list.length) {
                    list[k][field + "span"] = 1;
                    list[k][field + "dis"] = false;
                    for (var i = k + 1; i <= list.length - 1; i++) {
                        if (
                            list[k][field] == list[i][field] &&
                            list[k][field] != ""
                        ) {
                            list[k][field + "span"]++;
                            list[k][field + "dis"] = false;
                            list[i][field + "span"] = 1;
                            list[i][field + "dis"] = true;
                        } else {
                            break;
                        }
                    }
                    k = i;
                }
            }
            return list;
        },
        ctClick(val) {
            this.ctIndex++;
            this.ctLevel[this.ctIndex] = val.length / 2 + 1;
            this.ctCode[this.ctIndex] = val;
            this.tableList();
        },
        backSyb() {
            delete this.ctLevel[this.ctIndex];
            delete this.ctCode[this.ctIndex];
            this.ctIndex--;
            this.tableList();
        },
        backCdlist() {
            this.$emit("newToggle", this.newModalToggle);
        }
    },
    mounted() {
        this.tableList();
    }
};
</script>


<style lang="scss" scoped>
.wdjsDeil {
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
        height: 86%;
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
.wdjsDeil {
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
}
</style>

