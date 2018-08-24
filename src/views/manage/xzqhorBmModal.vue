<template>
    <div class="xzqhOrbm">
        <el-dialog :title="modelTit" :visible.sync="xzqhModel" width="50%" :before-close="xzqhClose">
            <!-- <el-tree :data="xzqh_data" @node-click="nodeClick" default-expand-all :expand-on-click-node="false" :highlight-current="true">
            </el-tree> -->
            <div class="dict-content">
                <div class="leftXzqh">
                    <el-scrollbar class="page-component__scroll" style="height:100%">
                        <el-tree :data="xzqhtreeData" node-key="bm" ref="xzqhtree" default-expand-all show-checkbox @node-click="xzqhnodeClick" :expand-on-click-node="false" :check-strictly="true" check-on-click-node :disabled="false">
                            <span class="custom-tree-node" slot-scope="{ node, data }">
                                <span>{{ node.label }}</span>
                            </span>
                        </el-tree>
                    </el-scrollbar>
                </div>
                <div class="rightBm">
                    <el-scrollbar class="page-component__scroll" style="height:100%">
                        <el-tree :data="bmtreeData" node-key="xzqhBm" ref="bmtree" default-expand-all show-checkbox @check-change="bmnodeChange" :expand-on-click-node="true" check-on-click-node>
                            <span class="custom-tree-node" slot-scope="{ node, data }">
                                <span>{{ node.label }}</span>
                            </span>
                        </el-tree>
                    </el-scrollbar>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="xzqh_save">确定</el-button>
                <el-button @click="xzqhClose">取 消</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import { xzqhtreeQuery } from "@/api/administrative";
import { treeQueryBm } from "@/api/department";
import { pzbAdd, pzbSelect } from "@/api/user";
export default {
  data() {
    return {
      newModalToggle: false,
      xzqhModel: false,
      xzqhtreeData: [],
      bmtreeData: [],
      bm: [],
      xzqhBm: [],
      listData: [],
      modelTit: "派驻配置",
      xzqh: "",
      userId: "",
      pzbXzqh: ""
    };
  },
  props: {
    // xzqhModel: Boolean,
    jsdwStr: {
      default: () => {}
    }
  },
  methods: {
    xzqh_save() {
      let obj = {
        list: this.arrDel(this.listData),
        userId: this.userId
      };
      pzbAdd(obj).then(res => {
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
      });
      this.xzqhClose();
    },
    arrDel(arr) {
      let _this = this;
      if (arr.length) {
        arr.map((i, s) => {
          if (!i.bm) {
            arr.splice(s, 1);
            _this.arrDel(arr);
          }
        });
      }
      return arr;
    },
    xzqhClose() {
      this.newModalToggle = false;
      this.xzqhModel = false;
      this.$emit("xzqhOrToggle", this.newModalToggle);
    },
    treeQueryxzqh() {
      let _this = this;
      let newXzqh = this.xzqh;
      let length1, length2;
      if (newXzqh.length == 2 || newXzqh.length == 4) {
        length1 = newXzqh.length;
        length2 = newXzqh.length + 2;
      } else if (newXzqh.length == 6 || newXzqh.length == 9) {
        length1 = newXzqh.length;
        length2 = newXzqh.length + 3;
      } else if (newXzqh.length == 12) {
        length1 = newXzqh.length;
        length2 = newXzqh.length + 2;
      }

      let obj = {
        length1: length1,
        length2: length2,
        xzqh: this.xzqh
      };
      xzqhtreeQuery(obj).then(res => {
        let data = res.data;
        if (data.success) {
          this.xzqhModel = true;
          let newArr = [];
          newArr.push(data.data);
          let newArr2 = _this.moreMenu(newArr);
          _this.xzqhtreeData = newArr2;

          _this.pzbQuery();
        }
      });
    },
    moreMenu(data) {
      let _this = this;
      data.map(d => {
        d.disabled = true;
        if (d.children.length) {
          _this.moreMenu(d.children);
        }
        return d;
      });
      return data;
    },
    xzqhnodeClick(row) {
      console.log(row);
      let _this = this;
      this.pzbXzqh = row.bm;
      let isFure = true;
      this.listData.map(i => {
        if (i.xzqh == row.bm) {
          isFure = false;
          _this.xzqhBm = i.bm.split(",");
          _this.$refs.bmtree.setCheckedKeys(_this.xzqhBm);
        }
      });
      if (isFure) {
        _this.xzqhBm = [];
        this.listData.push({
          xzqh: _this.pzbXzqh,
          bm: "",
          allBm: "",
          userId: this.userId
        });
      }

      this.xzqhQueryBm(row.bm);
    },
    xzqhQueryBm(rows) {
      let _this = this;
      let obj = {
        xzqh: rows
      };
      treeQueryBm(obj).then(res => {
        let data = res.data;
        if (data.success && data.data.length) {
          _this.bmtreeData = [
            {
              label: "全部",
              children: data.data,
              allBm: true
            }
          ];
        } else {
          this.bmtreeData = [];
        }
      });
    },
    bmnodeChange(row, chenge) {
      console.log(row);
      // console.log(chenge);
      if (chenge) {
        this.xzqhBm.push(row.xzqhBm);
        this.bm.push(row.xzqh);
      } else {
        this.xzqhBm.remove(row.xzqhBm);
        this.bm.remove(row.xzqh);
      }
    //   if (this.xzqhBm.length == 1 && !this.xzqhBm[0]) {
    //     this.bm.remove(row.xzqh);
    //   }
    //   if (!this.xzqhBm.length) {
    //     this.bm.remove(row.xzqh);
    //   } else {
    //     this.bm.push(row.xzqh);
    //   }
      this.$refs.xzqhtree.setCheckedKeys(this.bm);
      console.log(this.bm);
      let xzbmStr = "";
      this.xzqhBm.map(i => {
        if (i) {
          xzbmStr += i + ",";
        }
      });
      this.listData.map(i => {
        if (i.xzqh == this.pzbXzqh) {
          i.bm = xzbmStr;
          if (row.allBm) {
            if (chenge) {
              i.allBm = "1";
            } else {
              i.allBm = "0";
            }
          }
        }
        return i;
      });
    },
    pzbQuery() {
      let _this = this;
      let obj = {
        userId: this.userId
      };
      pzbSelect(obj).then(res => {
        let data = res.data;
        _this.bm = [];
        _this.listData = data.data;
        if (_this.listData.length) {
          _this.listData.map(i => {
            _this.bm.push(i.xzqh);
          });
        }
        _this.$refs.xzqhtree.setCheckedKeys(_this.bm);
      });
    }
  },
  watch: {
    jsdwStr: {
      handler: function(val) {
        this.bmtreeData = [];
        this.xzqh = val.xzqh;
        this.userId = val.userId;
        this.treeQueryxzqh();
      },
      deep: true
    }
  },
  mounted() {
    Array.prototype.indexOf = function(val) {
      for (var i = 0; i < this.length; i++) {
        if (this[i] == val) return i;
      }
      return -1;
    };
    Array.prototype.remove = function(val) {
      var index = this.indexOf(val);
      if (index > -1) {
        this.splice(index, 1);
      }
    };
  }
};
</script>


<style lang="scss" scoped>
.xzqhOrbm {
  .leftXzqh {
    width: 40%;
    float: left;
    height: 50vh;
    overflow: auto;
    border-right: 1px solid #cccccc;
  }

  .rightBm {
    width: 60%;
    float: left;
    height: 50vh;
    overflow: auto;
  }
}
</style>
<style lang="scss" >
.xzqhOrbm {
  .el-dialog__body {
    height: 50vh;
    overflow: hidden;
    .dict-content {
      overflow: hidden;
    }
  }
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
  .el-checkbox__input.is-disabled.is-checked .el-checkbox__inner {
    background-color: #409eff;
    border-color: #409eff;
  }
}
</style>
