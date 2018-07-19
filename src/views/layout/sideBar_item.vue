<template>
    <div class="menu-wrapper">
        <template v-for="item in routes" v-if="!item.hidden&&item.children">
            <router-link v-if="item.children.length===1 &&(item.children[0].children&&!item.children[0].children.length)" :to="item.path+'/'+item.children[0].path" :key="item.children[0].name" tag="li">
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
// .el-menu--collapse.sideBar {
//     .el-menu-item span,
//     .el-submenu .el-submenu__title span {
//         height: 0;
//         width: 0;
//         overflow: hidden;
//         visibility: hidden;
//         display: inline-block;
//     }
//     .el-submenu .el-submenu__title .el-submenu__icon-arrow {
//         display: none;
//     }
// }
// .el-menu--collapse.oneLevel {
//     .el-menu-item span,
//     .el-submenu .el-submenu__title span {
//         height: auto;
//         width: auto;
//         overflow: hidden;
//         visibility: visible;
//         display: inline-block;
//     }
//     .el-submenu .el-submenu__title .el-submenu__icon-arrow {
//         display: "";
//     }
// }
.el-menu--collapse.sideBar {
    .el-menu-item:focus,
    .el-menu-item:hover,
    .el-menu-item:active {
        background-color: #1b2732;
    }
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
    .el-menu-item:focus,
    .el-menu-item:hover,
    .el-menu-item:active {
        background-color: #1b2732;
    }
    .el-menu-item span,
    .el-submenu .el-submenu__title span {
        height: auto;
        width: auto;
        overflow: hidden;
        visibility: visible;
        display: inline-block;
        font-size: 16px;
    }
    .el-submenu .el-submenu__title .el-submenu__icon-arrow {
        display: "";
    }
}
.el-menu--vertical {
    top: 136px !important;
    height: calc(100% - 136px) !important;
    background-color: rgb(52, 52, 52);
    .el-menu--vertical {
        top: 0 !important;
        height: calc(100vh - 136px) !important;
        background-color: rgb(52, 52, 52);
    }
}
.el-menu--popup-right-start {
    margin-left: 0 !important;
    margin-right: 0 !important;
    background: none !important;
    box-shadow: 0 0 0 0 !important;
    -webkit-box-shadow: 0 0 0 0 !important;
}
.el-menu-item {
    font-size: 16px;
}
.el-menu-item:hover{
    background-color:#1b2732;
}

.el-menu-item.is-active, .el-submenu__title.is-active{
    color: #1ab394 !important;
}
.oneNar .narOneSpan{
    display: block;
    padding: 10px 0 0 20px;
    font-size: 17px;
    color: #fff;
}
.oneNar .narTwoSpan{
    padding: 0 0 0 30px;
}
</style>
