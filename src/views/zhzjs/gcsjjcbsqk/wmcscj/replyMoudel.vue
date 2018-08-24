<template>
    <div>
        <el-dialog :title="textTit" :visible.sync="replynewModal" :before-close="btn_cancel">
            <el-form :inline="true" :model="replyForm" ref="replyForm" class="demo-form-inline" label-width="120px" :rules="replyrules">
                <el-row>
                    <el-col :span="23">
                        <el-form-item label="问题描述" prop="wtms">
                            <el-input type="textarea" v-model.trim="replyForm.wtms" :autosize="{ minRows: 4}" disabled></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="11">
                        <el-form-item label="整改人" prop="zgr">
                            <el-input v-model="replyForm.zgr" placeholder="整改人"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="11" :offset="1">
                        <el-form-item label="整改时间" prop="zgsj">
                            <el-date-picker v-model="replyForm.zgsj" type="date" value-format="timestamp" placeholder="整改时间"></el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="23">
                        <el-form-item label="整改情况" prop="zgqk">
                            <el-input type="textarea" v-model.trim="replyForm.zgqk" :autosize="{ minRows: 4}"></el-input>
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

            </el-form>
            <div class="footerBox">
                <span slot="footer" class="dialog-footer">
                    <button v-show="activeShow" class="save" @click="btn_save">保存</button>
                    <button @click="btn_cancel" class="cancel">取消</button>
                </span>
            </div>
        </el-dialog>
    </div>

</template>
<script>
import { dateQuery, dateAdd, dateUpdate } from "@/api/zhzjs/wmcsreply";
export default {
    data() {
        return {
            replynewModal: false,
            activeShow: true,
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
                    delete this.replyForm.num
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
            if (this.userXzqh == row.by1 && this.userBmbm == row.by2) {
                return true;
            } else {
                return false;
            }
        },
        btn_cancel() {
            this.replynewModal = false;
            this.$emit("replynewToggle", this.replynewModal);
        },
        btn_save() {
            this.$refs.replyForm.validate(valid => {
                if (valid) {
                    let _this = this;
                    let obj = Object.assign({}, this.replyForm);
                    obj.lrrId = this.$store.state.user.user.uUser.id;
                    obj.by1 = this.$store.state.user.user.uUser.xzqh;
                    obj.by2 = this.$store.state.user.user.uUser.bmbm;
                    obj.sqzt = "1";
                    if (this.replyForm.id) {
                        dateUpdate(obj).then(res => {
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
                        dateAdd(obj).then(res => {
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
    }
};
</script>

