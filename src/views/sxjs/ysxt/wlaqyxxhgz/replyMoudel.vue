<template>
    <div>
        <el-dialog :title="textTit" :visible.sync="replynewModal" :before-close="btn_cancel">
            <el-form :inline="true" :model="replyForm" ref="replyForm" class="demo-form-inline" label-width="120px" :rules="replyrules">
                <el-row>
                    <el-col :span="11">
                        <el-form-item label="转办舆情" prop="zbyq">
                            <el-select v-model="replyForm.zbyq" placeholder="请选择" style="width:100%">
                                <el-option v-for="(item,index) in zbyqoptions" :key="index" :label="item.label" :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item v-show="false">
                            <el-input v-model="replyForm.yqjcId" placeholder="舆情监测Id"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="11" :offset="1">
                        <el-form-item label="转办单位" prop="zbdw">
                            <el-select v-model="replyForm.zbdw" placeholder="请选择" style="width:100%">
                                <el-option v-for="(item,index) in zbdwoptions" :key="index" :label="item.label" :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="11">
                        <el-form-item label="转办时间" prop="zbsj">
                            <el-date-picker v-model="replyForm.zbsj" type="date" value-format="timestamp" placeholder="转办时间"></el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="23">
                        <el-form-item label="处置情况" prop="czqk">
                            <el-input type="textarea" :autosize="{ minRows: 4 }" v-model.trim="replyForm.czqk" placeholder="处置情况"></el-input>
                        </el-form-item>

                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="11">
                        <el-form-item label="行政区划" prop="xzqh">
                            <el-select v-model="replyForm.xzqh" placeholder="请选择" style="width:100%" :disabled="true">
                                <el-option v-for="(item,index) in xzqhoptions" :key="index" :label="item.label" :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="11" :offset="1">
                        <el-form-item label="部门科室" prop="bm">
                            <el-select v-model="replyForm.bm" placeholder="请选择" style="width:100%" :disabled="true">
                                <el-option v-for="(item,index) in bmbmoptions" :key="index" :label="item.label" :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="11">
                        <el-form-item label="录入人" prop="lrr">
                            <el-input v-model="replyForm.lrr" placeholder="录入人" :disabled="true"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="11" :offset="1">
                        <el-form-item label="录入时间" prop="lrsj">
                            <el-date-picker v-model="replyForm.lrsj" type="datetime" value-format="timestamp" placeholder="录入时间" :disabled="true"></el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="20" :offset="3">
                        <el-button type="success" size="small" @click="fileClick('fj')">附件</el-button>
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
        <accessory-Model :newModal="accessoryModalInt" @colseTog="colseTog" @chileFile="chileFile" :textTitFile="textTitFile" :fileSrc="fileSrc" :upShowhide="activeShow"></accessory-Model>

    </div>

</template>
<script>
import accessoryModel from "@/components/accessoryModel";
import {
    replydateQuery,
    replydateAdd,
    replydateUpdate
} from "@/api/jljs/wlyqjccz";
import { doCreate, getDicTab, moreMenu, remark } from "@/utils/config";
export default {
    components: {
        accessoryModel
    },
    data() {
        return {
            replynewModal: false,
            activeShow: true,
            accessoryModalInt: false,
            zbyqoptions: [],
            xzqhoptions: [],
            bmbmoptions: [],
            zbdwoptions: [],
            upShowhide: true,
            textTitFile: "",
            fileSrc: "",
            replyForm: {},
            textTit: "回复",
            replyrules: {},
            userXzqh: this.$store.state.user.user.uUser.xzqh,
            userBmbm: this.$store.state.user.user.uUser.bmbm
        };
    },
    watch: {
        replyObj: {
            handler: function(val) {
                if (val) {
                    this.replyForm = Object.assign({}, val);
                    if (val.num) {
                        this.activeShow = true;
                    } else {
                        if (val.sqzt == "3" && this.sfdqyh(val)) {
                            this.activeShow = true;
                        } else {
                            this.activeShow = false;
                        }
                    }
                    delete this.replyForm.num;
                }
            },
            deep: true
        },
        newReplyModal(val) {
            this.replynewModal = val;
        }
    },
    props: {
        newReplyModal: Boolean,
        replyObj: Object
    },
    methods: {
        sfdqyh(row) {
            if (this.userXzqh == row.xzqh && this.userBmbm == row.bm) {
                return true;
            } else {
                return false;
            }
        },
        btn_cancel() {
            this.replynewModal = false;
            this.$emit("replynewToggle", this.replynewModal);
        },
        colseTog(val) {
            this.accessoryModalInt = val;
        },
        chileFile(val) {
            let zd = val.zdName;
            this.replyForm[zd] = val.newSrcstr;
        },
        fileClick(val) {
            this.accessoryModalInt = true;
            this.textTitFile = "附件";
            this.fileSrc = {
                num: Math.random(),
                fileStr: this.replyForm[val],
                zdName: val
            };
        },
        btn_save() {
            this.$refs.replyForm.validate(valid => {
                if (valid) {
                    let _this = this;
                    let obj = Object.assign({}, this.replyForm);
                    obj.lrrId = this.$store.state.user.user.uUser.id;
                    obj.sqzt = "1";
                    if (this.replyForm.id) {
                        replydateUpdate(obj).then(res => {
                            let data = res.data;
                            if (data.success) {
                                _this.btn_cancel();
                                _this.$message({
                                    message: data.msg,
                                    type: "success"
                                });
                            } else {
                                this.$message({
                                    message: data.msg,
                                    type: "warning"
                                });
                            }
                        });
                    } else {
                        replydateAdd(obj).then(res => {
                            let data = res.data;
                            if (data.success) {
                                _this.btn_cancel();
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
                        });
                    }
                }
            });
        }
    },
    mounted(){
        this.zbyqoptions = doCreate("zbyq");
        this.xzqhoptions = doCreate("xzqh");
        this.bmbmoptions = doCreate("bmbm");
        this.zbdwoptions = doCreate("zbdw");
    }
};
</script>

