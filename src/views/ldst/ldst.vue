<template>
    <div class="ldst">

        <img class="centerlgo" src="../../assets/images/ldst/ldstLogo.png" alt="">
        <div v-show="detailShow1">

            <img class="centerDt" src="../../assets/images/ldst/centerDt.png" alt="">
            <div class="ldstLeft">
                <div class="leftTop">
                    <h3 class="ldstH3">党建信息统计</h3>
                    <div class="djxxtjtype" v-for="(item) in 3" :key="'tyoe'+item">
                        <img :src="'../../../static/ldst/type'+(item)+'.png'" alt="">
                        <p>{{getDic(item)}}</p>
                        <p>
                            <span class="spanColor">{{typeData[item]}}</span>个</p>
                    </div>
                    <div class="djxxtjtype" v-for="(item2) in 3" :key="'zzmm'+item2">
                        <img :src="'../../../static/ldst/zzmm'+(item2)+'.png'" alt="">
                        <p>{{getDic2(item2)}}</p>
                        <p>
                            <span class="spanColor">{{zzmmData[item2]}}</span>个</p>
                    </div>

                </div>
                <div class="leftBottom">
                    <h3 class="ldstH3">预警信息统计
                        <span @click="yjDetails">更多>></span>
                    </h3>
                    <div class="leftBottomTop">
                        <div>
                            <p>
                                <span></span>正常预警</p>
                            <p>{{greenNum}}</p>
                        </div>
                        <div>
                            <p>
                                <span></span>普通预警</p>
                            <p>{{blueNum}}</p>
                        </div>
                        <div>
                            <p>
                                <span></span>中度预警</p>
                            <p>{{yellowNum}}</p>
                        </div>
                        <div>
                            <p>
                                <span></span>严重预警</p>
                            <p>{{redNum}}</p>
                        </div>

                    </div>
                    <el-tabs type="border-card" @tab-click="handleClick" v-model="firstName">
                        <el-tab-pane label="五大建设" name="wdjs">
                            <el-scrollbar class="page-component__scroll" style="height:100%">
                                <div class="listClass">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>五大建设</th>
                                                <th>
                                                    <span class="yjGreen"></span>
                                                </th>
                                                <th>
                                                    <span class="yjBlue"> </span>
                                                </th>
                                                <th>
                                                    <span class="yjYellow"> </span>
                                                </th>
                                                <th>
                                                    <span class="yjRed"> </span>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="(item,index) in wdjsList" :key="index">
                                                <td>{{item.cdmc}}</td>
                                                <td>{{item.green?item.green:0}}</td>
                                                <td>{{item.blue?item.blue:0}}</td>
                                                <td>{{item.yellow?item.yellow:0}}</td>
                                                <td>{{item.red?item.red:0}}</td>
                                            </tr>
                                        </tbody>
                                    </table>

                                </div>

                            </el-scrollbar>
                        </el-tab-pane>

                        <el-tab-pane label="行政区划" name="xzqh">
                            <el-scrollbar class="page-component__scroll" style="height:100%">
                                <div class="listClass">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>行政区划</th>
                                                <th>
                                                    <span class="yjGreen"></span>
                                                </th>
                                                <th>
                                                    <span class="yjBlue"> </span>
                                                </th>
                                                <th>
                                                    <span class="yjYellow"> </span>
                                                </th>
                                                <th>
                                                    <span class="yjRed"> </span>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="(item,index) in xzqhList" :key="index">
                                                <td>{{xzqhDic(item)}}</td>
                                                <td>{{item.green?item.green:0}}</td>
                                                <td>{{item.blue?item.blue:0}}</td>
                                                <td>{{item.yellow?item.yellow:0}}</td>
                                                <td>{{item.red?item.red:0}}</td>
                                            </tr>
                                        </tbody>
                                    </table>

                                </div>
                            </el-scrollbar>
                        </el-tab-pane>
                        <el-tab-pane label="部门预警" name="bmks">
                            <el-scrollbar class="page-component__scroll" style="height:100%">
                                <div class="listClass">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>部门科室</th>
                                                <th>
                                                    <span class="yjGreen"></span>
                                                </th>
                                                <th>
                                                    <span class="yjBlue"> </span>
                                                </th>
                                                <th>
                                                    <span class="yjYellow"> </span>
                                                </th>
                                                <th>
                                                    <span class="yjRed"> </span>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="(item,index) in bmksList" :key="index">
                                                <td>{{bmbmDic(item)}}</td>
                                                <td>{{item.green?item.green:0}}</td>
                                                <td>{{item.blue?item.blue:0}}</td>
                                                <td>{{item.yellow?item.yellow:0}}</td>
                                                <td>{{item.red?item.red:0}}</td>
                                            </tr>
                                        </tbody>
                                    </table>

                                </div>
                            </el-scrollbar>
                        </el-tab-pane>
                    </el-tabs>
                </div>
            </div>
            <div class="ldstRight">
                <div class="rightTop">
                    <h3 class="ldstH3">区直党（工）委</h3>
                    <div class="qzdgw">
                        <el-scrollbar class="page-component__scroll" style="height:100%">
                            <div>
                                <p v-for="(item,index) in qzdgwdate" :key="index" v-html="item.name">

                                </p>
                            </div>

                        </el-scrollbar>
                    </div>

                </div>
                <div class="rightBottom">
                    <h3 class="ldstH3">本区重点项目推进落实情况
                        <span @click="zdxmDetails">更多>></span>
                    </h3>
                    <div class="lsqkList">
                        <el-scrollbar class="page-component__scroll" style="height:100%">
                            <div>
                                <p v-for="(item,index) in lsqkdate" :key="index" @click="fileEdit(item)">
                                    <span>·</span>{{item.xmmc}}</p>
                            </div>

                        </el-scrollbar>
                    </div>
                </div>
            </div>
        </div>
        <wdjs-deil v-show="detailShow2" @newToggle="newToggle"></wdjs-deil>
        <zdxm-deil v-show="detailShow3" @newToggle2="newToggle2"></zdxm-deil>
        <zdxm-ck-model :newModal="zdxmModalInt" :editObj="editObj" @colseTog="colseTog"></zdxm-ck-model>
    </div>
</template>
<script>
import { dictSelect } from "@/api/dict";
import { zzandcyQuery, zdxmQuery, qzdgwQuery } from "@/api/ldst";
import { doCreate, getDicTab } from "@/utils/config";
import { wdjsyjQuery, xzqhyjQuery, bmyjQuery } from "@/api/yjfx/yjfx";
import wdjsDeil from "./wdjsDeil";
import zdxmDeil from "./zdxmDeil";
import zdxmCkModel from "./zdxmCkModel";
export default {
    components: {
        wdjsDeil,
        zdxmDeil,
        zdxmCkModel
    },
    data() {
        return {
            typeData: "",
            zzmmData: "",
            activeName2: "first",
            wdjsList: [],
            xzqhList: [],
            bmksList: [],
            firstName: "wdjs",
            greenNum: 0,
            blueNum: 0,
            yellowNum: 0,
            redNum: 0,
            qzdgwdate: [],
            lsqkdate: [],
            detailShow1: true,
            detailShow2: false,
            detailShow3: false,
            zdxmModalInt: false,
            editObj: {}
        };
    },

    methods: {
        getDic(val) {
            return getDicTab("type", val);
        },
        getDic2(val) {
            return getDicTab("zzmm", val);
        },
        xzqhDic(row) {
            return getDicTab("xzqh", row.xzqh);
        },
        bmbmDic(row) {
            return getDicTab("bmbm", row.bm);
        },
        dictList() {
            let obj = {
                xzqh: this.$store.state.user.user.uUser.xzqh
            };
            zzandcyQuery(obj).then(res => {
                let data = res.data;
                if (data.success) {
                    this.typeData = data.data.data.type;
                    this.zzmmData = data.data.data.zzmm;
                } else {
                    this.typeData = "";
                    this.$message({
                        message: "暂无此字典项",
                        type: "error"
                    });
                }
            });
        },
        wdjsListQuery() {
            let obj = {
                xzqh: this.$store.state.user.user.uUser.xzqh,
                year: new Date().getFullYear(),
                flag: "CT"
            };
            wdjsyjQuery(obj).then(res => {
                let data = res.data;
                this.greenNum = 0;
                this.blueNum = 0;
                this.yellowNum = 0;
                this.redNum = 0;
                if (data.success) {
                    this.wdjsList = data.data.data;
                    data.data.data.forEach(element => {
                        this.greenNum += Number(element.green);
                        this.blueNum += Number(element.blue);
                        this.yellowNum += Number(element.yellow);
                        this.redNum += Number(element.red);
                    });
                } else {
                    this.$message({
                        message: data.msg,
                        type: "warning"
                    });
                }
            });
        },
        xzqhListQuery() {
            let obj = {
                xzqh: this.$store.state.user.user.uUser.xzqh,
                flag: "CT",
                year: new Date().getFullYear()
            };
            xzqhyjQuery(obj).then(res => {
                let data = res.data;
                this.greenNum = 0;
                this.blueNum = 0;
                this.yellowNum = 0;
                this.redNum = 0;
                if (data.success) {
                    this.xzqhList = data.data.data;
                    data.data.data.forEach(element => {
                        this.greenNum += Number(element.green);
                        this.blueNum += Number(element.blue);
                        this.yellowNum += Number(element.yellow);
                        this.redNum += Number(element.red);
                    });
                } else {
                    this.$message({
                        message: data.msg,
                        type: "warning"
                    });
                }
            });
        },

        bmksListQuery() {
            let obj = {
                xzqh: this.$store.state.user.user.uUser.xzqh,
                // bm: this.$store.state.user.user.uUser.bmbm,
                bm: "",
                flag: "CT",
                year: new Date().getFullYear()
            };

            bmyjQuery(obj).then(res => {
                let data = res.data;
                this.greenNum = 0;
                this.blueNum = 0;
                this.yellowNum = 0;
                this.redNum = 0;
                if (data.success) {
                    this.bmksList = data.data.data;
                    data.data.data.forEach(element => {
                        this.greenNum += Number(element.green);
                        this.blueNum += Number(element.blue);
                        this.yellowNum += Number(element.yellow);
                        this.redNum += Number(element.red);
                    });
                } else {
                    this.$message({
                        message: data.msg,
                        type: "warning"
                    });
                }
            });
        },

        handleClick(val) {
            if (val.name == "xzqh") {
                this.xzqhListQuery();
            } else if (val.name == "bmks") {
                this.bmksListQuery();
            } else if (val.name == "wdjs") {
                this.wdjsListQuery();
            }
        },
        qzdgwListQuery() {
            let obj = {
                xzqh: this.$store.state.user.user.uUser.xzqh,
                type: "1"
            };
            qzdgwQuery(obj).then(res => {
                let data = res.data;
                if (data.success) {
                    this.qzdgwdate = data.data.data;
                    console.log(this.qzdgwdate);
                } else {
                    this.qzdgwdate = [];
                }
            });
        },
        zdxmListQuery() {
            let obj = {
                xzqh: this.$store.state.user.user.uUser.xzqh,
                bm: "",
                year: new Date().getFullYear(),
                remark: this.$store.state.user.user.uRole.remark
            };
            zdxmQuery(obj).then(res => {
                let data = res.data;
                if (data.success) {
                    this.lsqkdate = data.data.data;
                } else {
                    this.qzdgwdate = [];
                }
            });
        },
        yjDetails() {
            this.detailShow1 = false;
            this.detailShow2 = true;
        },
        zdxmDetails() {
            this.detailShow1 = false;
            this.detailShow3 = true;
        },
        newToggle(val) {
            // this.detailShow = val;
            this.detailShow1 = val;
            this.detailShow2 = false;
        },
        newToggle2(val) {
            // this.detailShow = val;
            this.detailShow1 = val;
            this.detailShow3 = false;
        },
        fileEdit(val) {
            this.zdxmModalInt = true;
            this.editObj = val;
        },
        colseTog(val) {
            this.zdxmModalInt = val;
        }
    },
    mounted() {
        this.dictList();
        this.wdjsListQuery();
        this.qzdgwListQuery();
        this.zdxmListQuery();
    }
};
</script>
<style lang="scss" scoped>
.ldst {
    height: 100vh;
    width: 100%;
    overflow: hidden;
    background: url("../../assets/images/ldst/bj.png") no-repeat center;
    position: relative;
    // display: flex;
    // justify-content: space-between;
    .centerDt {
        display: block;
        position: absolute;
        width: 30vw;
        left: 35vw;
        top: 120px;
    }
    .ldstH3 {
        color: #fff;
        margin: 0;
        font-weight: 100;
        font-size: 1.1vw;
        span {
            font-size: 14px;
            float: right;
            cursor: pointer;
        }
        :hover {
            color: #409eff;
        }
    }
    .centerlgo {
        display: block;
        position: absolute;
        // width: 28.8vw;
        top: 4vh;
        left: 38vw;
    }
    .ldstLeft {
        // float: left;
        width: 28.9vw;
        // margin-left: 1vw;
        height: 100vh;
        position: absolute;
        top: 0;
        left: 1vw;
        // overflow: hidden;
        .leftTop {
            min-height: 25.24vh;
            background: url("../../assets/images/ldst/topPic.png") no-repeat
                center;
            background-size: 100% 100%;
            margin-top: 4vh;
            padding: 5vh 2vw;
            overflow: hidden;
            .djxxtjtype {
                width: 7.9vw;
                float: left;
                img {
                    display: block;
                    margin: auto;
                }
                p {
                    color: #fff;
                    font-size: 0.8vw;
                    line-height: 1.6vw;
                    margin: 0;
                    text-align: center;
                    span {
                        font-size: 1.2vw;
                    }
                }
            }
            .djxxtjtype:nth-child(2) .spanColor {
                color: #52aee4;
            }
            .djxxtjtype:nth-child(3) .spanColor {
                color: #3bc292;
            }
            .djxxtjtype:nth-child(4) .spanColor {
                color: #76c133;
            }
            .djxxtjtype:nth-child(5) .spanColor {
                color: #e60012;
            }
            .djxxtjtype:nth-child(6) .spanColor {
                color: #fdcf10;
            }
            .djxxtjtype:nth-child(7) .spanColor {
                color: #ff7e0e;
            }
        }
        .leftBottom {
            min-height: 44.8vh;
            background: url("../../assets/images/ldst/bottomPic.png") no-repeat
                center;
            background-size: 100% 100%;
            margin-top: 2vh;
            padding: 5vh 2vw 2vh 2vw;
            overflow: hidden;
            .leftBottomTop {
                height: 8vh;
                display: flex;
                justify-content: space-between;
                padding: 1vh 0;
                div {
                    height: 5.2vh;
                    width: 20%;
                    border-radius: 0.4vw;
                    padding: 0.4vh 0 0.4vh 0.4vw;
                    p {
                        color: #fff;
                        margin: 0;
                        text-align: left;
                        font-size: 0.8vw;
                        line-height: 1.2vw;
                        // overflow: hidden;
                        span {
                            width: 1vw;
                            height: 1vw;
                            border-radius: 1vw;
                            background-color: #0e841f;
                            float: left;
                        }
                    }
                    p:nth-child(2) {
                        font-size: 1.2vw;
                        text-align: center;
                    }
                }
                div:nth-child(1) {
                    background-color: rgba($color: #0e841f, $alpha: 0.16);
                    border: 1px solid #0e841f;
                    p:nth-child(2) {
                        color: #0e841f;
                    }
                }
                div:nth-child(2) {
                    background-color: rgba($color: #d7b515, $alpha: 0.16);
                    border: 1px solid #d7b515;

                    p {
                        span {
                            background-color: #d7b515;
                        }
                    }
                    p:nth-child(2) {
                        color: #d7b515;
                    }
                }
                div:nth-child(3) {
                    background-color: rgba($color: #df5307, $alpha: 0.16);
                    border: 1px solid #df5307;
                    p {
                        span {
                            background-color: #df5307;
                        }
                    }
                    p:nth-child(2) {
                        color: #df5307;
                    }
                }
                div:nth-child(4) {
                    background-color: rgba($color: #d70000, $alpha: 0.16);
                    border: 1px solid #d70000;
                    p {
                        span {
                            background-color: #d70000;
                        }
                    }
                    p:nth-child(2) {
                        color: #d70000;
                    }
                }
            }
            .listClass {
                height: 25vh;
                table {
                    border-collapse: collapse;
                    overflow: hidden;
                    thead {
                        tr {
                            background-color: #114071;
                            th {
                                width: 5vw;
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
                }
                table,
                table tr th,
                table tr td {
                    border: 1px solid #07689b;
                }
                tbody {
                    tr {
                        td {
                            width: 5vw;
                            height: 3.6vh;
                            line-height: 2.6vh;
                            font-size: 0.8vw;
                            color: #fff;
                            text-align: center;
                        }
                    }
                }
            }
        }
    }
    .ldstRight {
        // float: right;
        width: 28.9vw;
        // margin-right: 1vw;
        height: 100vh;
        position: absolute;
        top: 0;
        right: 1vw;
        // display: flex;
        // flex-direction: column;
        // justify-content: space-between;
        .rightTop {
            min-height: 25.24vh;
            background: url("../../assets/images/ldst/topPic.png") no-repeat
                center;
            background-size: 100% 100%;
            margin-top: 4vh;
            padding: 5vh 2vw;
            overflow: hidden;
            .qzdgw {
                width: 100%;
                height: 23.6vh;
                // overflow: hidden;
                p {
                    color: #fff;
                    float: left;
                    background: #0077e5;
                    width: 10.8vw;
                    height: 4vh;
                    margin: 1vh 1vw 0 0;
                    text-align: center;
                    line-height: 4vh;
                    font-size: 1vw;
                    border-radius: 0.4vw;
                }
            }
        }
        .rightBottom {
            min-height: 42.8vh;
            background: url("../../assets/images/ldst/bottomPic.png") no-repeat
                center;
            background-size: 100% 100%;
            margin-top: 2vh;
            padding: 5vh 2vw;
            overflow: hidden;
            .lsqkList {
                width: 100%;
                height: 39vh;
                // overflow: hidden;
                p {
                    color: #fff;
                    font-size: 0.8vw;
                    cursor: pointer;
                    padding: 0;
                    margin: 14px 0;
                }
                :hover {
                    color: #409eff;
                }
            }
        }
    }
}
</style>
<style lang="scss">
.ldst {
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
    .el-tabs--border-card {
        background: none;
        border: none;
    }

    .el-tabs--border-card > .el-tabs__header {
        background: none;
        border-color: #13aeff;

        .el-tabs__item {
            color: #fff;
        }
    }

    .el-tabs--border-card > .el-tabs__header .el-tabs__item {
        margin: 0;
    }
    .el-tabs--border-card > .el-tabs__header .el-tabs__item.is-active {
        background-color: rgba($color: #13aeff, $alpha: 0.28);
        border: 1px solid #13aeff;
        border-top-right-radius: 0.4vw;
        border-top-left-radius: 0.4vw;
    }
    .el-tabs--border-card > .el-tabs__content {
        padding: 6px 0 0 0;
    }
    .yjGreen {
        color: transparent;
        background: #0e841f;
        width: 20px !important;
        height: 20px !important;
        border-radius: 10px;
        box-shadow: 0px 0px 10px #0e841f;
    }
    .yjBlue {
        color: transparent;
        background: #d7b515;
        width: 20px !important;
        height: 20px !important;
        border-radius: 10px;
        box-shadow: 0px 0px 10px #d7b515;
    }
    .yjYellow {
        color: transparent;
        background: #df5307;
        width: 20px !important;
        height: 20px !important;
        border-radius: 10px;
        box-shadow: 0px 0px 10px #df5307;
    }
    .yjRed {
        color: transparent;
        background: #d70000;
        width: 20px !important;
        height: 20px !important;
        border-radius: 10px;
        box-shadow: 0px 0px 10px #d70000;
    }
}
</style>



