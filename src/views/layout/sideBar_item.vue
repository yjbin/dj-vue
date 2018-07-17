<template>
    <div class="menu-wrapper">
        <template v-for="item in routes" v-if="!item.hidden&&item.children">
            <router-link v-if="item.children.length===1 && !item.children[0].children" :to="item.path+'/'+item.children[0].path" :key="item.children[0].name" tag="li">
                <el-menu-item :index="item.path+'/'+item.children[0].path" class='submenu-title-noDropdown'>
                    <i :class="item.meta.icon"></i>
                    <span v-if="item.children[0].meta&&item.children[0].meta.title">{{item.children[0].meta.title}}</span>
                </el-menu-item>
            </router-link>
            <el-submenu v-else :index="item.name||item.path" :key="item.name">
                <template slot="title">
                    <i :class="item.meta.icon"></i>
                    <span v-if="item.meta&&item.meta.title">{{item.meta.title}}</span>
                </template>
                <template v-for="child in item.children" v-if="!child.hidden">
                    <sidebar-item class="nest-menu" v-if="child.children&&child.children.length>0" :routes="[child]" :key="child.path"></sidebar-item>
                    <router-link v-else :to="item.path+'/'+child.path" :key="child.name" tag="li">
                        <el-menu-item :index="item.path+'/'+child.path">
                            <span v-if="child.meta&&child.meta.title">{{child.meta.title}}</span>
                        </el-menu-item>
                    </router-link>
                </template>
            </el-submenu>
        </template>
    </div>
</template>

<script>
export default {
  name: "SidebarItem",
  props: {
    routes: {
      type: Array
    }
  }
};
</script>
<style lang="scss">
.el-menu--collapse.sideBar {
  .el-menu-item span,
  .el-submenu .el-submenu__title span {
    height: 0;
    width: 0;
    overflow: hidden;
    visibility: hidden;
    display: inline-block;
  }
  .el-submenu .el-submenu__title .el-submenu__icon-arrow {
    display: none;
  }
}
.el-menu--collapse.oneLevel {
  .el-menu-item span,
  .el-submenu .el-submenu__title span {
    height: auto;
    width: auto;
    overflow: hidden;
    visibility: visible;
    display: inline-block;
  }
  .el-submenu .el-submenu__title .el-submenu__icon-arrow {
    display: "";
  }
}
</style>
