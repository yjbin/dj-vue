<template>
  <div class="layout">
    <navBar class="layout_navBar"></navBar>
    <div class="layout_body">
      <sideBar class="layout_sideBar"></sideBar>
      <div class="layout_main">
        <el-scrollbar class="page-component__scroll">   
          <breadCrumb></breadCrumb>
          <div class="main_body">
            <transition name="slide-fade" mode="out-in">
               <router-view></router-view>
            </transition>
           
          </div>
        </el-scrollbar>
      </div>
    </div>
  </div>
</template>
<script>
import navBar from "@/views/layout/navBar";
import sideBar from "@/views/layout/sideBar";
import breadCrumb from "@/views/layout/breadCrumb";
export default {
  components: {
    navBar,
    sideBar,
    breadCrumb
  }
};
</script>
<style lang="scss">
@import "../../assets/style/style.scss";
</style>
<style lang="scss" scoped>
.layout {
  height: 100vh;
  min-width: 1000px;
  .layout_navBar {
    height: 80px;
  }
  .layout_body {
    display: flex;
    height: calc(100% - 80px);
    .layout_sideBar {
      height: 100%;
    }
    .layout_main {
      display: flex;
      flex-direction: column;
      flex: 1;
      width: 0;
      height: 100%;
      .main_body {
        flex: 1;
        padding: 10px 20px;
      }
    }
  }
}
</style>

<style lang="scss">
.layout {
  .page-component__scroll{
      height: 100%;
      .page-component__scroll .el-scrollbar__wrap{
          overflow: auto;
      }
      .el-scrollbar__wrap{
          overflow-x: hidden;
      }
  }
}
</style>