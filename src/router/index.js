import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/views/layout/layout'
import Inner_Layout from '@/views/layout/inner_layout'
import login from '@/views/login/login'
import home from '@/views/home/home'
import user from '@/views/manage/user'
import role from '@/views/manage/role'
import source from '@/views/manage/source'
import dict from '@/views/manage/dict'
//部门和行政区划
import administrative from '@/views/manage/administrative'
import department from '@/views/manage/department'
import multistageDown from '@/views/manage/multistageDown'
//组织建设
import jcdjszkhpy from '@/views/zzjs/djzrzls/jcdjszkhpy'
import dwgkqk from '@/views/zzjs/djzrzls/dwgkqk'
import jcdzzsjzdjsgqdzd from '@/views/zzjs/djzrzls/jcdzzsjzdjsgqdzd'
import rrhsdzzzd from '@/views/zzjs/djzrzls/rrhsdzzzd'

import bhgdyzzcz from '@/views/zzjs/dygl/bhgdyzzcz'
import dfsj from '@/views/zzjs/dygl/dfsj'
import dyfz from '@/views/zzjs/dygl/dyfz'
import lxzzdyjygl from '@/views/zzjs/dygl/lxzzdyjygl'


import dk from '@/views/zzjs/zzshzdls/shyk/dk'
import dxzh from '@/views/zzjs/zzshzdls/shyk/dxzh'
import dydh from '@/views/zzjs/zzshzdls/shyk/dydh'
import zbwyh from '@/views/zzjs/zzshzdls/shyk/zbwyh'
import dzzhj from '@/views/zzjs/zzshzdls/dzzhj'
import mzpydy from '@/views/zzjs/zzshzdls/mzpydy'
import mzshh from '@/views/zzjs/zzshzdls/mzshh'
import txthzd from '@/views/zzjs/zzshzdls/txthzd'
import ztdrjhd from '@/views/zzjs/zzshzdls/ztdrjhd'
import zzshh from '@/views/zzjs/zzshzdls/zzshh'

import zzjszcfg from '@/views/zzjs/zcfg'
//作风建设

//作风建设
import dcyj from '@/views/zfjs/lszhbxgdjshzzsfwt/dcyj'
import wfhf from '@/views/zfjs/lszhbxgdjshzzsfwt/wfhf'
import ygcc from '@/views/zfjs/lszhbxgdjshzzsfwt/ygcc'
import gwycpzhsy from '@/views/zfjs/lszhbxgdjshzzsfwt/gwycpzhsy'
import gwjd from '@/views/zfjs/lszhbxgdjshzzsfwt/gwjd'
import bgyf from '@/views/zfjs/lszhbxgdjshzzsfwt/bgyf'
import zkzdhyjfsyqk from '@/views/zfjs/lszhbxgdjshzzsfwt/zkzdhyjfsyqk'
import zgfljjbtffqk from '@/views/zfjs/lszhbxgdjshzzsfwt/zgfljjbtffqk'
import hsjqgatxzbbqk from '@/views/zfjs/lszhbxgdjshzzsfwt/hsjqgatxzbbqk'
import lxqjjy from '@/views/zfjs/lszhbxgdjshzzsfwt/lxqjjy'
import bqzdxmgjlsqk from '@/views/zfjs/bqzdxmgjlsqk'
import zfjszcfg from '@/views/zfjs/zcfg'

// 政治建设
import dzzdfwhzzjl from '@/views/zhzjs/zxddzzlxqk/dzzdfwhzzjl'
import qjwcbbqk from '@/views/zhzjs/yszzjl/zxqsbgsxdqk/qjwcbbqk'
import dzzhygzqk from '@/views/zhzjs/mzjzzzxqk/dzzhygzqk'
import dzzysgzhyscxdzxqk from '@/views/zhzjs/mzjzzzxqk/dzzysgzhyscxdzxqk'
import shce from '@/views/zhzjs/gcsjjcbsqk/shce'
import mslyfbwt from '@/views/zhzjs/gcsjjcbsqk/mslyfbwt'
import tpgj from '@/views/zhzjs/gcsjjcbsqk/tpgj'
import hbgz from '@/views/zhzjs/gcsjjcbsqk/hbgz'
import cczlws from '@/views/zhzjs/gcsjjcbsqk/wmcscj/cczlws'
import cccsjs from '@/views/zhzjs/gcsjjcbsqk/wmcscj/cccsjs'
import ccrjhj from '@/views/zhzjs/gcsjjcbsqk/wmcscj/ccrjhj'
import ccwjdc from '@/views/zhzjs/gcsjjcbsqk/wmcscj/ccwjdc'
import zhzjszcfg from '@/views/zhzjs/zcfg'

//思想建设
import bwcxljsmzthd from '@/views/sxjs/llwz/jzxxxjy/bwcxljsmzthd'
import dyjypx from '@/views/sxjs/llwz/jcxxxjy/dyjypx'
import fdjzbb from '@/views/sxjs/llwz/jcxxxjy/fdjzbb'
import jcdzzsjpx from '@/views/sxjs/llwz/jcxxxjy/jcdzzsjpx'
import llcg from '@/views/sxjs/llwz/jcxxxjy/llcg'
import xxxjpzsjzylsqk from '@/views/sxjs/llwz/jcxxxjy/xxxjpzsjzylsqk'
import lsqk from '@/views/sxjs/llwz/jcxxxjy/llxxzxzxx/lsqk'
import ndxxjhhzd from '@/views/sxjs/llwz/jcxxxjy/llxxzxzxx/ndxxjhhzd'
import lxyzxxjycthzdh from '@/views/sxjs/llwz/cthxxjy/lxyzxxjycthzdh'

import wmlydjt from '@/views/sxjs/jswmjs/pywmddfs/wmlydjt'
import zyfw from '@/views/sxjs/jswmjs/pywmddfs/zyfw'
import ddjt from '@/views/sxjs/jswmjs/shzyhxjzgjs/ddjt'
import jtjjjf from '@/views/sxjs/jswmjs/shzyhxjzgjs/jtjjjf'
import jysjhd from '@/views/sxjs/jswmjs/shzyhxjzgjs/jysjhd'
import glxcjyhd from '@/views/sxjs/jswmjs/xjpxsd/glxcjyhd'
import wmdjr from '@/views/sxjs/jswmjs/xjpxsd/wmdjr'
import zgtsshzyhzgmxxxcjy from '@/views/sxjs/jswmjs/xjpxsd/zgtsshzyhzgmxxxcjy'

import jsjy from '@/views/sxjs/lzwhjs/jsjy'
import ljwhzthdqk from '@/views/sxjs/lzwhjs/ljjy/ljwhzthdqk'
import ppdzqk from '@/views/sxjs/lzwhjs/ljjy/ppdzqk'
import xxgz from '@/views/sxjs/lzwhjs/ljjy/xxgz'

import shxc from '@/views/sxjs/ysxt/shxc'
import ysxtldzzzjg from '@/views/sxjs/ysxt/ysxtldzzzjg'
import jrfd from '@/views/sxjs/ysxt/mtxc/jrfd'
import zyssjzlmt from '@/views/sxjs/ysxt/mtxc/zyssjzlmt'
import wlaqxxxc from '@/views/sxjs/ysxt/wlaqyxxhgz/wlaqxxxc'
import wlaqzc from '@/views/sxjs/ysxt/wlaqyxxhgz/wlaqzc'
import wlyqjccz from '@/views/sxjs/ysxt/wlaqyxxhgz/wlyqjccz'
import zzjg from '@/views/sxjs/ysxt/wlaqyxxhgz/zzjg'
import gzqpyqzfxx from '@/views/sxjs/ysxt/xmtxc/gzqpyqzfxx'
import ptdjjtsxx from '@/views/sxjs/ysxt/xmtxc/ptdjjtsxx'

import sxjsszcfg from '@/views/sxjs/zcfg'

//纪律建设
import jdjc from '@/views/jljs/jdjc'
import wtqd from '@/views/jljs/wtqd'
import zgqk from '@/views/jljs/zgqk'
import bigzcfg from '@/views/zcfg/zcfg'

//预警分析
import bmksyj from '@/views/yjfx/bmksyj'
import wdjsyj from '@/views/yjfx/wdjsyj'
import xzqhyj from '@/views/yjfx/xzqhyj'
import WarningToedit from "@/views/yjfx/WarningToedit"
//领导视图
import ldst from "@/views/ldst/ldst"
//统计分析
import bmksfx from '@/views/tjfx/bmksyj'
import wdjsfx from '@/views/tjfx/wdjsyj'
import xzqhfx from '@/views/tjfx/xzqhyj'



Vue.use(Router)

export const constantRouterMap = [{
  path: '/refersh',
  component: Layout,
  hidden: true
}, {
  path: '/login',
  component: login,
  hidden: true
},
{
  path: '/',
  component: Layout,
  /**默认跳转到首页 */
  redirect: '/home',
  hidden: true
},
{
  path: '/home',
  component: Layout,
  redirect: '/home/home',
  meta: {
    title: '首页',
    // icon: ['home.png', 'home-c.png']
    icon: "el-icon-star-off"
  },
  children: [{
    path: 'home',
    component: home,
    name: 'home',
    meta: {
      title: '首页',
    }, children: []
  }]
},
]



export default new Router({
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRouterMap
})
export let asyncRouterMap = [

  {
    path: '/manage',
    component: Layout,
    redirect: '/manage/user',
    meta: {
      title: '系统管理',
      // icon: ['system.png', 'system-c.png'],
      icon: "el-icon-setting",
      rid: ""
    },
    children: [{
      path: 'user',
      component: user,
      name: 'user',
      meta: {
        title: '用户管理',
        icon: '',
        rid: "-1"
      }
    }, {
      path: 'role',
      component: role,
      name: 'role',
      meta: {
        title: '角色管理',
        icon: '',
        rid: "-1"
      }
    }, {
      path: 'source',
      component: source,
      name: 'source',
      meta: {
        title: '资源管理',
        icon: '',
        rid: "-1"
      }
    }, {
      path: 'dict',
      component: dict,
      name: 'dict',
      meta: {
        title: '字典管理',
        icon: '',
        rid: "-1"
      }
    }, {
      path: 'administrative',
      component: administrative,
      name: 'administrative',
      meta: {
        title: '行政区划',
        icon: '',
        rid: "-1"
      }
    }, {
      path: 'department',
      component: department,
      name: 'department',
      meta: {
        title: '部门管理',
        icon: '',
        rid: "-1"
      }
    }
      // , {
      //   path: 'multistageDown',
      //   component: multistageDown,
      //   name: 'multistageDown',
      //   meta: {
      //     title: '多级下拉设置',
      //     icon: '',
      //     rid: "-1"
      //   }
      // }
    ]
  }, {
    path: '/zzjs',
    component: Layout,
    redirect: '/zzjs/djzrzls/jcdjszkhpy',
    meta: {
      title: '组织建设',
      // icon: ['system.png', 'system-c.png'],
      icon: "el-icon-tickets",
      rid: ""
    },
    children: [{
      path: '/djzrzls',
      component: Inner_Layout,
      name: 'djzrzls',
      meta: {
        title: '党建责任制落实',
        icon: '',
        rid: "-1"
      },
      children: [{
        path: 'jcdjszkhpy',
        component: jcdjszkhpy,
        name: 'jcdjszkhpy',
        meta: {
          title: '基层党组织述职考核评议',
          icon: '',
          rid: "-1"
        }
      }, {
        path: 'jcdzzsjzdjsgqdzd',
        component: jcdzzsjzdjsgqdzd,
        name: 'jcdzzsjzdjsgqdzd',
        meta: {
          title: '基层党组织书记抓党建“三个清单”制度',
          icon: '',
          rid: "-1"
        }
      }, {
        path: 'rrhsdzzzd',
        component: rrhsdzzzd,
        name: 'rrhsdzzzd',
        meta: {
          title: '软弱涣散党组织整顿',
          icon: '',
          rid: "-1"
        }
      }, {
        path: 'dwgkqk',
        component: dwgkqk,
        name: 'dwgkqk',
        meta: {
          title: '党务公开情况',
          icon: '',
          rid: "-1"
        }
      }]
    }, {
      path: '/dygl',
      component: Inner_Layout,
      name: 'dygl',
      meta: {
        title: '党员管理',
        icon: '',
        rid: "-1"
      },
      children: [{
        path: 'dfsj',
        component: dfsj,
        name: 'dfsj',
        meta: {
          title: '党费收缴',
          icon: '',
          rid: "-1"
        }
      }, {
        path: 'dyfz',
        component: dyfz,
        name: 'dyfz',
        meta: {
          title: '党员发展',
          icon: '',
          rid: "-1"
        }
      }, {
        path: 'lxzzdyjygl',
        component: lxzzdyjygl,
        name: 'lxzzdyjygl',
        meta: {
          title: '“两新”组织党员教育管理',
          icon: '',
          rid: "-1"
        }
      }, {
        path: 'bhgdyzzcz',
        component: bhgdyzzcz,
        name: 'bhgdyzzcz',
        meta: {
          title: '不合格党员组织处置',
          icon: '',
          rid: "-1"
        }
      }]
    }, {
      path: '/zzshzdls',
      component: Inner_Layout,
      name: 'zzshzdls',
      meta: {
        title: '组织生活制度落实',
        icon: '',
        rid: "-1"
      },
      children: [{
        path: '/shyk',
        component: Inner_Layout,
        name: 'shyk',
        meta: {
          title: '三会一课',
          icon: '',
          rid: "-1"
        },
        children: [{
          path: 'zbwyh',
          component: zbwyh,
          name: 'zbwyh',
          meta: {
            title: '支部委员会',
            icon: '',
            rid: "-1"
          }
        }, {
          path: 'dxzh',
          component: dxzh,
          name: 'dxzh',
          meta: {
            title: '党小组会',
            icon: '',
            rid: "-1"
          }
        }, {
          path: 'dydh',
          component: dydh,
          name: 'dydh',
          meta: {
            title: '党员大会',
            icon: '',
            rid: "-1"
          }
        }, {
          path: 'dk',
          component: dk,
          name: 'dk',
          meta: {
            title: '党课',
            icon: '',
            rid: "-1"
          }
        }]
      }, {
        path: 'mzshh',
        component: mzshh,
        name: 'mzshh',
        meta: {
          title: '民主生活会',
          icon: '',
          rid: "-1"
        }
      }, {
        path: 'zzshh',
        component: zzshh,
        name: 'zzshh',
        meta: {
          title: '组织生活会',
          icon: '',
          rid: "-1"
        }
      }, {
        path: 'mzpydy',
        component: mzpydy,
        name: 'mzpydy',
        meta: {
          title: '民主评议党员',
          icon: '',
          rid: "-1"
        }
      }, {
        path: 'dzzhj',
        component: dzzhj,
        name: 'dzzhj',
        meta: {
          title: '党组织换届',
          icon: '',
          rid: "-1"
        }
      }, {
        path: 'ztdrjhd',
        component: ztdrjhd,
        name: 'ztdrjhd',
        meta: {
          title: '“主题党日+”活动',
          icon: '',
          rid: "-1"
        }
      }, {
        path: 'txthzd',
        component: txthzd,
        name: 'txthzd',
        meta: {
          title: '谈心谈话制度',
          icon: '',
          rid: "-1"
        }
      }]
    }, {
      path: 'zcfg',
      component: zzjszcfg,
      name: 'zcfg',
      meta: {
        title: '政策法规',
        icon: '',
        rid: "-1"
      }
    }]
  }, {
    path: '/zfjs',
    component: Layout,
    redirect: '/zfjs/lszhbxgdjshzzsfwt/dcyj',
    meta: {
      title: '作风建设',
      icon: "el-icon-view",
      rid: ""
    },
    children: [{
      path: '/lszhbxgdjshzzsfwt',
      component: Inner_Layout,
      name: 'lszhbxgdjshzzsfwt',
      meta: {
        title: '落实中央八项规定精神和整治“四风”问题',
        icon: '',
        rid: "-1"
      },
      children: [{
        path: 'dcyj',
        component: dcyj,
        name: 'dcyj',
        meta: {
          title: '调查研究',
          icon: '',
          rid: "-1"
        }
      }, {
        path: 'wfhf',
        component: wfhf,
        name: 'wfhf',
        meta: {
          title: '文风会风',
          icon: '',
          rid: "-1"
        }
      }, {
        path: 'ygcc',
        component: ygcc,
        name: 'ygcc',
        meta: {
          title: '因公出差',
          icon: '',
          rid: "-1"
        }
      }, {
        path: 'gwycpzhsy',
        component: gwycpzhsy,
        name: 'gwycpzhsy',
        meta: {
          title: '公务用车配置和使用',
          icon: '',
          rid: "-1"
        }
      }, {
        path: 'bgyf',
        component: bgyf,
        name: 'bgyf',
        meta: {
          title: '办公用房',
          icon: '',
          rid: "-1"
        }
      }, {
        path: 'gwjd',
        component: gwjd,
        name: 'gwjd',
        meta: {
          title: '公务接待',
          icon: '',
          rid: "-1"
        }
      }, {
        path: 'zkzdhyjfsyqk',
        component: zkzdhyjfsyqk,
        name: 'zkzdhyjfsyqk',
        meta: {
          title: '召开重大会议经费使用情况',
          icon: '',
          rid: "-1"
        }
      }, {
        path: 'zgfljjbtffqk',
        component: zgfljjbtffqk,
        name: 'zgfljjbtffqk',
        meta: {
          title: '职工福利及津补贴发发放情况',
          icon: '',
          rid: "-1"
        }
      }, {
        path: 'hsjqgatxzbbqk',
        component: hsjqgatxzbbqk,
        name: 'hsjqgatxzbbqk',
        meta: {
          title: '婚丧嫁娶、港澳通行证报备情况',
          icon: '',
          rid: "-1"
        }
      }, {
        path: 'lxqjjy',
        component: lxqjjy,
        name: 'lxqjjy',
        meta: {
          title: '厉行勤俭节约',
          icon: '',
          rid: "-1"
        }
      }]
    }, {
      path: 'bqzdxmgjlsqk',
      component: bqzdxmgjlsqk,
      name: 'bqzdxmgjlsqk',
      meta: {
        title: '本区重点项目推进落实情况',
        icon: '',
        rid: "-1"
      }
    }, {
      path: 'zfjszcfg',
      component: zfjszcfg,
      name: 'zfjszcfg',
      meta: {
        title: '政策法规',
        icon: '',
        rid: "-1"
      }
    }]
  }, {
    path: '/zhzjs',
    component: Layout,
    redirect: '/zhzjs/zxddzzlxqk/dzzdfwhzzjl',
    name: 'zhzjs',
    meta: {
      title: ' 政治建设',
      icon: 'el-icon-bell',
      rid: "-1"
    },
    children: [{
      path: '/zxddzzlxqk',
      component: Inner_Layout,
      name: 'zxddzzlxqk',
      meta: {
        title: ' 执行党的政治路线情况',
        icon: '',
        rid: "-1"
      },
      children: [{
        path: 'dzzdfwhzzjl',
        component: dzzdfwhzzjl,
        name: 'dzzdfwhzzjl',
        meta: {
          title: '党组织负担维护政治纪律、政治规矩责任的情况',
          icon: '',
          rid: "-1"
        }
      }]
    }, {
      path: '/yszzjl',
      component: Inner_Layout,
      name: 'yszzjl',
      meta: {
        title: '严肃政治纪律、政治规矩情况',
        icon: '',
        rid: "-1"
      },
      children: [{
        path: '/zxqsbgsxdqk',
        component: Inner_Layout,
        name: 'zxqsbgsxdqk',
        meta: {
          title: '执行请示报告事项情况',
          icon: '',
          rid: "-1"
        },
        children: [{
          path: 'qjwcbbqk',
          component: qjwcbbqk,
          name: 'qjwcbbqk',
          meta: {
            title: '请假外出报备情况',
            icon: '',
            rid: "-1"
          }
        }]
      }]
    }, {
      path: '/mzjzzzxqk',
      component: Inner_Layout,
      name: 'mzjzzzxqk',
      meta: {
        title: '民主集中执行情况',
        icon: '',
        rid: "-1"
      },
      children: [{
        path: 'dzzhygzqk',
        component: dzzhygzqk,
        name: 'dzzhygzqk',
        meta: {
          title: '党组织会议工作情况，重点是“三重一大”事项',
          icon: '',
          rid: "-1"
        }
      }, {
        path: 'dzzysgzhyscxdzxqk',
        component: dzzysgzhyscxdzxqk,
        name: 'dzzysgzhyscxdzxqk',
        meta: {
          title: '党组织议事规则和议事程序的执行情况',
          icon: '',
          rid: "-1"
        }
      }]
    }, {
      path: '/gcsjjcbsqk',
      component: Inner_Layout,
      name: 'gcsjjcbsqk',
      meta: {
        title: '贯彻上级决策部署情况',
        icon: '',
        rid: "-1"
      },
      children: [{
        path: 'shce',
        component: shce,
        name: 'shce',
        meta: {
          title: '扫黑除恶',
          icon: '',
          rid: "-1"
        }
      }, {
        path: 'mslyfbwt',
        component: mslyfbwt,
        name: 'mslyfbwt',
        meta: {
          title: '民生领域腐败问题',
          icon: '',
          rid: "-1"
        }
      }, {
        path: 'tpgj',
        component: tpgj,
        name: 'tpgj',
        meta: {
          title: '脱贫攻坚',
          icon: '',
          rid: "-1"
        }
      }, {
        path: 'hbgz',
        component: hbgz,
        name: 'hbgz',
        meta: {
          title: '环保工作',
          icon: '',
          rid: "-1"
        }
      }, {
        path: '/wmcscj',
        component: Inner_Layout,
        name: 'wmcscj',
        meta: {
          title: '文明城市创建',
          icon: '',
          rid: "-1"
        },
        children: [{
          path: 'cczlws',
          component: cczlws,
          name: 'cczlws',
          meta: {
            title: '创城资料完善',
            icon: '',
            rid: "-1"
          }
        }, {
          path: 'cccsjs',
          component: cccsjs,
          name: 'cccsjs',
          meta: {
            title: '创城场所建设',
            icon: '',
            rid: "-1"
          }
        }, {
          path: 'ccrjhj',
          component: ccrjhj,
          name: 'ccrjhj',
          meta: {
            title: '创城人居环境',
            icon: '',
            rid: "-1"
          }
        }, {
          path: 'ccwjdc',
          component: ccwjdc,
          name: 'ccwjdc',
          meta: {
            title: '创城问卷调查',
            icon: '',
            rid: "-1"
          }
        }]
      }]
    }, {
      path: 'zhzjszcfg',
      component: zhzjszcfg,
      name: 'zhzjszcfg',
      meta: {
        title: '政策法规',
        icon: '',
        rid: "-1"
      }
    }]
  }, {
    path: '/sxjs',
    component: Layout,
    redirect: '/sxjs/llwz/jzxxxjy/bwcxljsmzthd',
    name: 'sxjs',
    meta: {
      title: '思想建设',
      icon: 'el-icon-time',
      rid: "-1"
    },
    children: [{
      path: '/llwz',
      component: Inner_Layout,
      name: 'llwz',
      meta: {
        title: '理论武装',
        icon: '',
        rid: "-1"
      },
      children: [{
        path: '/jzxxxjy',
        component: Inner_Layout,
        name: 'jzxxxjy',
        meta: {
          title: '集中性学习教育',
          icon: '',
          rid: "-1"
        },
        children: [{
          path: 'bwcxljsmzthd',
          component: bwcxljsmzthd,
          name: 'bwcxljsmzthd',
          meta: {
            title: '“不忘初心、牢记使命”主题活动',
            icon: '',
            rid: "-1"
          }
        }]
      }, {
        path: '/jcxxxjy',
        component: Inner_Layout,
        name: 'jcxxxjy',
        meta: {
          title: '经常性学习教育',
          icon: '',
          rid: "-1"
        },
        children: [{
          path: 'xxxjpzsjzylsqk',
          component: xxxjpzsjzylsqk,
          name: 'xxxjpzsjzylsqk',
          meta: {
            title: '学习习近平总书记重要论述情况',
            icon: '',
            rid: "-1"
          }
        }, {
          path: 'jcdzzsjpx',
          component: jcdzzsjpx,
          name: 'jcdzzsjpx',
          meta: {
            title: '基层党组织书记培训',
            icon: '',
            rid: "-1"
          }
        }, {
          path: 'dyjypx',
          component: dyjypx,
          name: 'dyjypx',
          meta: {
            title: '党员教育培训',
            icon: '',
            rid: "-1"
          }
        }, {
          path: '/llxxzxzxx',
          component: Inner_Layout,
          name: 'llxxzxzxx',
          meta: {
            title: '理论学习中心组学习',
            icon: '',
            rid: "-1"
          },
          children: [{
            path: 'ndxxjhhzd',
            component: ndxxjhhzd,
            name: 'ndxxjhhzd',
            meta: {
              title: '年度学习计划和制度',
              icon: '',
              rid: "-1"
            }
          }, {
            path: 'lsqk',
            component: lsqk,
            name: 'lsqk',
            meta: {
              title: '落实情况',
              icon: '',
              rid: "-1"
            }
          }]
        }, {
          path: 'llcg',
          component: llcg,
          name: 'llcg',
          meta: {
            title: '理论成果',
            icon: '',
            rid: "-1"
          }
        }, {
          path: 'fdjzbb',
          component: fdjzbb,
          name: 'fdjzbb',
          meta: {
            title: '辅导讲座报备',
            icon: '',
            rid: "-1"
          }
        }]
      }, {
        path: '/cthxxjy',
        component: Inner_Layout,
        name: 'cthxxjy',
        meta: {
          title: '常态化学习教育',
          icon: '',
          rid: "-1"
        },
        children: [{
          path: 'lxyzxxjycthzdh',
          component: lxyzxxjycthzdh,
          name: 'lxyzxxjycthzdh',
          meta: {
            title: '“两学一做”学习教育常态化制度化',
            icon: '',
            rid: "-1"
          },
        }]
      }]
    }, {
      path: '/ysxt',
      component: Inner_Layout,
      name: 'ysxt',
      meta: {
        title: '意识形态',
        icon: '',
        rid: "-1"
      },
      children: [{
        path: 'ysxtldzzzjg',
        component: ysxtldzzzjg,
        name: 'ysxtldzzzjg',
        meta: {
          title: '意识形态领导组组织机构',
          icon: '',
          rid: "-1"
        }
      }, {
        path: 'shxc',
        component: shxc,
        name: 'shxc',
        meta: {
          title: '社会宣传',
          icon: '',
          rid: "-1"
        }
      }, {
        path: '/mtxc',
        component: Inner_Layout,
        name: 'mtxc',
        meta: {
          title: '媒体宣传',
          icon: '',
          rid: "-1"
        },
        children: [{
          path: 'zyssjzlmt',
          component: zyssjzlmt,
          name: 'zyssjzlmt',
          meta: {
            title: '中央省市级主流媒体',
            icon: '',
            rid: "-1"
          }
        }, {
          path: 'jrfd',
          component: jrfd,
          name: 'jrfd',
          meta: {
            title: '今日汾东',
            icon: '',
            rid: "-1"
          }
        }]
      }, {
        path: '/xmtxc',
        component: Inner_Layout,
        name: 'xmtxc',
        meta: {
          title: '新媒体宣传',
          icon: '',
          rid: "-1"
        },
        children: [{
          path: 'ptdjjtsxx',
          component: ptdjjtsxx,
          name: 'ptdjjtsxx',
          meta: {
            title: '平台搭建及推送信息',
            icon: '',
            rid: "-1"
          }
        }, {
          path: 'gzqpyqzfxx',
          component: gzqpyqzfxx,
          name: 'gzqpyqzfxx',
          meta: {
            title: '工作群，朋友圈转发信息',
            icon: '',
            rid: "-1"
          }
        }]
      }, {
        path: '/wlaqyxxhgz',
        component: Inner_Layout,
        name: 'wlaqyxxhgz',
        meta: {
          title: '网络安全与信息化工作',
          icon: '',
          rid: "-1"
        },
        children: [{
          path: 'zzjg',
          component: zzjg,
          name: 'zzjg',
          meta: {
            title: '组织机构',
            icon: '',
            rid: "-1"
          }
        }, {
          path: 'wlyqjccz',
          component: wlyqjccz,
          name: 'wlyqjccz',
          meta: {
            title: '网络舆情监测处置',
            icon: '',
            rid: "-1"
          }
        }, {
          path: 'wlaqxxxc',
          component: wlaqxxxc,
          name: 'wlaqxxxc',
          meta: {
            title: '网络安全学习宣传',
            icon: '',
            rid: "-1"
          }
        }, {
          path: 'wlaqzc',
          component: wlaqzc,
          name: 'wlaqzc',
          meta: {
            title: '网络安全自查',
            icon: '',
            rid: "-1"
          }
        }]
      }]
    }, {
      path: '/jswmjs',
      component: Inner_Layout,
      name: 'jswmjs',
      meta: {
        title: '精神文明建设',
        icon: '',
        rid: "-1"
      },
      children: [{
        path: '/xjpxsd',
        component: Inner_Layout,
        name: 'xjpxsd',
        meta: {
          title: '习近平新时代中国特色社会主义思想理论体系学习',
          icon: '',
          rid: "-1"
        },
        children: [{
          path: 'zgtsshzyhzgmxxxcjy',
          component: zgtsshzyhzgmxxxcjy,
          name: 'zgtsshzyhzgmxxxcjy',
          meta: {
            title: '中国特色社会主义和中国梦学习宣传教育',
            icon: '',
            rid: "-1"
          }
        }, {
          path: 'wmdjr',
          component: wmdjr,
          name: 'wmdjr',
          meta: {
            title: '我们的节日',
            icon: '',
            rid: "-1"
          }
        }, {
          path: 'glxcjyhd',
          component: glxcjyhd,
          name: 'glxcjyhd',
          meta: {
            title: '各类宣传教育活动',
            icon: '',
            rid: "-1"
          }
        }]
      }, {
        path: '/shzyhxjzgjs',
        component: Inner_Layout,
        name: 'shzyhxjzgjs',
        meta: {
          title: '社会主义核心价值观建设',
          icon: '',
          rid: "-1"
        },
        children: [{
          path: 'jtjjjf',
          component: jtjjjf,
          name: 'jtjjjf',
          meta: {
            title: '家庭家教家风',
            icon: '',
            rid: "-1"
          }
        }, {
          path: 'ddjt',
          component: ddjt,
          name: 'ddjt',
          meta: {
            title: '道德讲堂',
            icon: '',
            rid: "-1"
          }
        }, {
          path: 'jysjhd',
          component: jysjhd,
          name: 'jysjhd',
          meta: {
            title: '教育实践活动',
            icon: '',
            rid: "-1"
          }
        }]
      }, {
        path: '/pywmddfs',
        component: Inner_Layout,
        name: 'pywmddfs',
        meta: {
          title: '培育文明道德风尚',
          icon: '',
          rid: "-1"
        },
        children: [{
          path: 'zyfw',
          component: zyfw,
          name: 'zyfw',
          meta: {
            title: '志愿服务',
            icon: '',
            rid: "-1"
          }
        }, {
          path: 'wmlydjt',
          component: wmlydjt,
          name: 'wmlydjt',
          meta: {
            title: '文明礼仪大讲堂',
            icon: '',
            rid: "-1"
          }
        }]
      }]
    }, {
      path: '/lzwhjs',
      component: Inner_Layout,
      name: 'lzwhjs',
      meta: {
        title: '廉政文化建设',
        icon: '',
        rid: "-1"
      },
      children: [{
        path: 'jsjy',
        component: jsjy,
        name: 'jsjy',
        meta: {
          title: '警示教育',
          icon: '',
          rid: "-1"
        }
      }, {
        path: '/ljjy',
        component: Inner_Layout,
        name: 'ljjy',
        meta: {
          title: '廉洁教育',
          icon: '',
          rid: "-1"
        },
        children: [{
          path: 'ppdzqk',
          component: ppdzqk,
          name: 'ppdzqk',
          meta: {
            title: '品牌打造情况',
            icon: '',
            rid: "-1"
          }
        }, {
          path: 'ljwhzthdqk',
          component: ljwhzthdqk,
          name: 'ljwhzthdqk',
          meta: {
            title: '廉洁文化主题活动情况',
            icon: '',
            rid: "-1"
          }
        }, {
          path: 'xxgz',
          component: xxgz,
          name: 'xxgz',
          meta: {
            title: '信息工作',
            icon: '',
            rid: "-1"
          }
        }]
      }]
    }, {
      path: 'sxjsszcfg',
      component: sxjsszcfg,
      name: 'sxjsszcfg',
      meta: {
        title: '政策法规',
        icon: '',
        rid: "-1"
      },
    }]
  },
  {
    path: '/jljs',
    component: Layout,
    redirect: '/jljs/jdjc',
    meta: {
      title: '纪律建设',
      // icon: ['home.png', 'home-c.png']
      icon: "el-icon-search"
    },
    children: [{
      path: 'wtqd',
      component: wtqd,
      name: 'wtqd',
      meta: {
        title: '问题清单',
        icon: '',
        rid: "-1"
      }
    }, {
      path: 'zgqk',
      component: zgqk,
      name: 'zgqk',
      meta: {
        title: '整改情况',
        icon: '',
        rid: "-1"
      }
    }, {
      path: 'jdjc',
      component: jdjc,
      name: 'jdjc',
      meta: {
        title: '监督检查',
        icon: '',
        rid: "-1"
      }
    }]
  },
  {
    path: '/zcfg',
    component: Layout,
    redirect: '/zcfg/bigzcfg',
    meta: {
      title: '政策法规',
      // icon: ['home.png', 'home-c.png']
      icon: "el-icon-printer"
    },
    children: [{
      path: 'bigzcfg',
      component: bigzcfg,
      name: 'bigzcfg',
      meta: {
        title: '政策法规',
        icon: '',
        rid: "-1"
      }
    }]
  },
  {
    path: '/yjfx',
    component: Layout,
    redirect: '/yjfx/wdjsyj',
    meta: {
      title: '预警分析',
      // icon: ['home.png', 'home-c.png']
      icon: "el-icon-warning"
    },
    children: [{
      path: 'wdjsyj',
      component: wdjsyj,
      name: 'wdjsyj',
      meta: {
        title: '五大建设预警',
        icon: '',
        rid: "-1"
      }
    }, {
      path: 'xzqhyj',
      component: xzqhyj,
      name: 'xzqhyj',
      meta: {
        title: '行政区划预警',
        icon: '',
        rid: "-1"
      }
    }, {
      path: 'bmksyj',
      component: bmksyj,
      name: 'bmksyj',
      meta: {
        title: '部门科室预警',
        icon: '',
        rid: "-1"
      }
    },
    {
      path: 'WarningToedit',
      component: WarningToedit,
      name: 'WarningToedit',
      meta: {
        title: '预警编辑',
        icon: '',
        rid: "-1"
      }
    }
    ]
  },
  {
    path: '/ldst',
    component: Inner_Layout,
    redirect: '/ldst/ldst',
    meta: {
      title: '领导视图',
      // icon: ['home.png', 'home-c.png']
      icon: "el-icon-star-on"
    },
    children: [{
      path: 'ldst',
      component: ldst,
      name: 'ldst',
      meta: {
        title: '领导视图',
        icon: '',
        rid: "-1"
      }
    }]
  },
  {
    path: '/tjfx',
    component: Layout,
    redirect: '/tjfx/wdjsfx',
    meta: {
      title: '预警分析',
      // icon: ['home.png', 'home-c.png']
      icon: "el-icon-warning"
    },
    children: [{
      path: 'wdjsfx',
      component: wdjsfx,
      name: 'wdjsfx',
      meta: {
        title: '五大建设分析',
        icon: '',
        rid: "-1"
      }
    }, {
      path: 'xzqhfx',
      component: xzqhfx,
      name: 'xzqhfx',
      meta: {
        title: '行政区划分析',
        icon: '',
        rid: "-1"
      }
    }, {
      path: 'bmksfx',
      component: bmksfx,
      name: 'bmksfx',
      meta: {
        title: '部门科室分析',
        icon: '',
        rid: "-1"
      }
    }
    ]
  }
]
