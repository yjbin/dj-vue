<template>
    <div class="rightBox">
        <div class="conferee">
            <div class="topNav clearfix">
                <span class="fl">参会人员</span>
                <div class="fr">
                    <span class="fr allChoose" @click="checkAll()">全选</span>
                    <span class="fl D62634">已选择{{ choosePeo }}人</span>
                </div>
            </div>
            <ul class="content-peo">
                <li v-for="(item,index) in peoList" :key="index" @click="selectPeo(index,item)">
                    <span></span>
                    <b :class="((item.sex == 1 && item.age >60) ||(item.sex == 0 && item.age >50)?'bule':'')">{{ item.name }}</b>
                    <i></i>
                </li>
            </ul>
        </div>
        <div class="elsePeo">
            <h4>其他人员</h4>
            <el-form>
                <el-form-item label="">
                    <el-input type="textarea" :autosize="{ minRows: 7}" v-model.trim="elseList" @change="blurInput"></el-input>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
import { getAllmember } from "@/api/zzjs/zzshzdls/shyk";
export default {
    data() {
        return {
            choosePeo: "0",
            peoList: [],
            chooseList: [],
            elseList: "",
            flag:null
        };
    },
    props: {
        chryList: {
             default: () => {}
        },
        qtryList: {
             default: () => {}
        },
    },
    watch: {
        //参会人员数据回填
        chryList:{
            handler: function(val) {
              this.common_query(val); 
            },
            deep:true
        },
        //其他人员回填
        qtryList: {
            handler: function(val) {
               this.qtry_query(val.qtryList);
            },
            deep:true
        },
    },
    methods: {
        qtry_query(val){
            if(val){
                this.elseList = val;
                this.blurInput();
            }else{
                this.elseList = "";
            }
        },
        common_query(val){
                this.reset();
            if(val.chryList){
                this.chooseList = val.chryList;
                let Li = Array.prototype.slice.call(document.querySelectorAll('.content-peo>li'));
                for(var j = 0;j<this.peoList.length;j++){
                    for(var k=0;k<this.chooseList.length;k++){
                        if(this.peoList[j].id == this.chooseList[k].chryId){
                            this.peoList[j].active = true;
                            Li[j].classList.add("active");
                        }
                    }
                }
                this.$nextTick(() => {
                    this.choosePeo = this.chooseList.length;
                });
                this.$emit("chooseList",this.chooseList);
            }else{
                return
            }
        },
        reset() {
            this.chooseList = [];
            this.choosePeo = "0";
            let Liopt = Array.prototype.slice.call(
                document.querySelectorAll(".content-peo>li")
            );
            Liopt.forEach(i => {
                i.classList.remove("active");
            });
            this.peoList.forEach(i =>{
                i.active = false;
            })
        },
        //选择全部
        checkAll() {
            this.flag = this.peoList.every((item) =>{
                return item.active 
            })
            this.reset();
            let li = document.querySelectorAll(".content-peo>li");
            const li_list = Array.prototype.slice.call(li);
            if(this.flag){
                 this.$emit("chooseList", this.chooseList);
            }else{
                li_list.forEach((itme,index) => {
                    itme.classList.add("active");
                    this.peoList[index].active = true;
                });
                this.choosePeo = li_list.length;
                for (var j = 0; j < this.peoList.length; j++) {
                    let li_obj = {
                        chryId: this.peoList[j].id,
                        chry: this.peoList[j].name
                    };
                    this.chooseList.push(li_obj);
                }
                this.$emit("chooseList", this.chooseList);
            }
        },
        //textarea失去焦点
        blurInput() {
            this.$emit("elseList",this.elseList);
        },
        selectPeo(index,item) {
            let arr = [];
            let li = document.querySelectorAll(".content-peo>li");
            const li_list = Array.prototype.slice.call(li);
            if (item.active) {
                li_list[index].classList.remove("active");
                this.peoList[index].active = false;
            } else {
                li_list[index].classList.add("active");
                this.peoList[index].active = true;
            }
            arr = this.peoList.filter(i=>{
                if(i.active){
                    return i
                }
            })
            this.chooseList = [];
            for(let j=0;j<arr.length;j++){
                var obj = {
                    chryId: arr[j].id,
                    chry: arr[j].name
                }
                this.chooseList.push(obj);
            }
            this.choosePeo = arr.length;
            this.$emit("chooseList",this.chooseList);
        },
        getPeoList() {
            let obj = {
                bm: this.$store.state.user.user.uUser.bmbm,
                xzqh: this.$store.state.user.user.uUser.xzqh
            };
            getAllmember(obj).then(res => {
                let data = res.data;
                if (data.success) {
                    if(data.data.data.length > 0){
                        let list = data.data.data;
                        list.forEach((item,index) =>{
                            item.active = false;
                        })
                        this.peoList = list;
                        this.$nextTick(()=>{
                            this.common_query(this.chryList);
                            this.qtry_query(this.qtryList.qtryList);
                        })
                    }else{
                        return
                    }                   
                } else {
                    this.peoList = [];
                    this.$message({
                        message: data.msg,
                        type: "warning"
                    });
                }
            });
        }
    },
    mounted() {
        this.getPeoList();
    }
};
</script>
<style lang="scss">
.rightBox {
    .bule {
        color: #5b93d3;
    }
    height: 100%;
    padding: 0 0 0 10px;
    border-left: 1px solid #ddd;
    .conferee {
        height: 380px;
        overflow: auto;
        border-bottom: 1px solid #cdcdcd;
        .topNav {
            width: 100%;
            height: 30px;
            line-height: 30px;
            border-bottom: 1px solid #e3e3e3;
            padding: 0 10px;
            box-sizing: border-box;
            -moz-box-sizing: border-box;
            -webkit-box-sizing: border-box;
            .allChoose {
                padding-left: 15px;
                background: url("../../static/pubtemIco/nocheck.png") no-repeat
                    0px center;
                cursor: pointer;
            }
        }
        .content-peo {
            padding: 5px 10px 15px;
            display: -webkit-flex;
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
            li {
                overflow: hidden;
                height: 22px;
                line-height: 22px;
                margin-right: 0.5%;
                margin-bottom: 3%;
                border-radius: 5px;
                padding-right: 10px;
                border: 1px solid #cdcdcd;
                cursor: pointer;
                transition: all 1s ease-in;
                position: relative;
                span {
                    display: inline-block;
                    vertical-align: middle;
                    width: 20px;
                    height: 20px;
                    line-height: 20px;
                    border-right: 1px solid #cdcbcc;
                    background: url("../../static/pubtemIco/peo-no.png")
                        no-repeat center 0px;
                    transition: all 1s ease-in;
                }
                b {
                    display: inline-block;
                    min-width: 30px;
                    color: #363636;
                    font-size: 13px;
                    transition: all 1s ease-in;
                }
                i {
                    display: none;
                    position: absolute;
                    top: 0;
                    right: 0;
                    width: 12px;
                    height: 12px;
                    background: url("../../static/pubtemIco/check.png")
                        no-repeat 0px 0px;
                    transition: all 1s ease-in;
                }
                &.active {
                    border: 1px solid #d21522;
                    span {
                        background: url("../../static/pubtemIco/peo-ok.png")
                            no-repeat center 0px;
                    }
                    i {
                        display: inline-block;
                    }
                }
            }
        }
    }
}
</style>


