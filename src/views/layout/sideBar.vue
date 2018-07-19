<template>
    <el-menu :class="['sideBar',{oneLevel:oneLevel}]" unique-opened :collapse="isCollapse" :default-active="$route.path" background-color="#343434" text-color="#fff">
        <el-menu-item index="" class="sideBar_title titleClass" @click="collapse">
            <i class="el-icon-menu"></i>
            <span style="color:#fff">功能菜单</span>
        </el-menu-item>
        <sidebar-item :routes="permission_routers"></sidebar-item>
    </el-menu>
</template>

<script>
import { mapGetters } from "vuex";
import SidebarItem from "./sideBar_item";

export default {
    components: { SidebarItem },
    data() {
        return {
            isCollapse: true,
            oneLevel: true
        };
    },
    methods: {
        collapse() {
            this.oneLevel = !this.oneLevel;
        }
    },

    computed: {
        ...mapGetters(["permission_routers"])
    }
};
</script>

<style lang="scss">
.sideBar {
    .sideBar_title {
        // color: #307ecc !important;
        background-color: #d11523 !important;
        border-bottom: 1px solid #fff;

        i {
            color: #fff;
        }
    }
}
.el-menu {
    border-right: 0;
    i {
        color: #fff;
    }
    .is-active>div:not(.el-menu--vertical) {
           background-color: #000 !important;   
    }
    .is-opened>div:not(.el-menu--vertical){
        background-color: #2A2A2A!important;
    }
    .el-menu-item.is-active {
        background-color: #000 !important;
        color: #fff !important;
    }
}
</style>
<style lang="scss" scoped>
.sideBar {
    transition: all 0.3s;
    .titleClass {
        background-color: #d11523 !important;
    }
}

.oneLevel {
    width: 200px;
    .el-menu-item span {
        height: auto;
        width: auto;
        overflow: hidden;
        visibility: visible;
        display: inline-block;
    }
}
</style>