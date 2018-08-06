<template>
    <div class="homeBigbox">
        <p class="homeBigbox_text">习近平总书记在党的十九大报告中指出，“以党的政治建设为统领”“全面推进党的政治建设、思想建设、组织建设、作风建设、纪律建设，把制度建设贯穿其中，深入推进反腐败斗争，不断提高党的建设质量”。</p>
        <div class="homeBigbox_centerBox">
            <span class="span1">政治建设</span>
            <span class="span2">思想建设</span>
            <span class="span3">组织建设</span>
            <span class="span4">作风建设</span>
            <span class="span5">纪律建设</span>
            <p class="p1">制度建设</p>

        </div>
    </div>
</template>


 <script>
import { dictionaries } from "@/api/config";
import { doCreate } from "@/utils/config";
export default {
    components: {},
    data() {
        return {
            xzqh: "",
            bmbm: "",
            duojiDic: ""
        };
    },
    methods: {
        dicAll() {
            //年度字典项
            let date = new Date();
            let year = date.getFullYear();
            let ndArr = [];
            let ndArr2 = [{ label: "全部", value: "" }];
            let dicMap = window.sessionStorage;
            for (let i = 0; i < 5; i++) {
                ndArr.push({ label: year - i, value: year - i });
                ndArr2.push({ label: year - i, value: year - i });
            }
            dicMap.setItem("nd", JSON.stringify(ndArr));
            dicMap.setItem("ndTit", JSON.stringify(ndArr2));
            dictionaries("all").then(res => {
                let data = res.data;
                if (data.success) {
                    doCreate("all");
                    data.data.map(d => {
                        doCreate(d.dictcode);
                    });
                }
            });
        }
    },
    mounted() {
        this.dicAll();
        this.xzqh = doCreate("xzqh");
        this.bmbm = doCreate("bmbm");
        this.duojiDic = doCreate("duojiDic");
        this.duojiDic = doCreate("cd");
        //         this.zjtjClick();
        //         this.sycjBigEchars();
    }
};
</script>
 <style lang="scss" scoped>
.homeBigbox {
    height: 85.7vh;
    width: 100%;
    background: url("../../assets/images/syBanner.jpg") no-repeat center;
    background-size: 100% 100%;
    position: absolute;
    top: 55px;
    left:0px;
    user-select:none;
    .homeBigbox_text {
        width: 63%;
        min-height: 140px;
        color: #fcff00;
        font-size: 2.8vh;
        margin: auto;
        font-weight: 900;
        margin-top: 40px;
    }
    .homeBigbox_centerBox {
        width: 70vw;
        height: 28vh;
        background: url("../../assets/images/ctBackgrund.png") no-repeat center;
        background-size: 100% 100%;
        margin: auto;
        position: relative;
        .p1 {
            color: #fff;
            position: absolute;
            right: 2.6vw;
            top: 11.5vh;
            font-size: 2vh;
        }
        span {
            color: #fff;
            position: absolute;
            width: 11vw;
            text-align: center;
            height: 26vh;
            line-height: 25vh;
            font-size: 3vh;
            display: block;
            cursor: pointer;
            
        }
        .span1 {
            left: 4.5vw;
        }
        .span2 {
            left: 16.1vw;
        }
        .span3 {
            left: 27.7vw;
        }
        .span4 {
            left: 39.2vw;
        }
        .span5 {
            left: 50.7vw;
        }
    }
}
</style>

