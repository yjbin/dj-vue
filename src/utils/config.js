let dicMap = window.sessionStorage;
let obj = {};


//是否
obj = [{
  value: '',
  label: '全部'
}, {
  value: '0',
  label: '否'
}, {
  value: '1',
  label: '是'
}];
dicMap.setItem("sf", JSON.stringify(obj));
obj = [{
  value: '1',
  label: '是'
},{
  value: '0',
  label: '否'
}];
dicMap.setItem("sf-1", JSON.stringify(obj));
//发文状态
obj = [{
  value: '',
  label: '全部'
}, {
  value: '0',
  label: '未发布'
}, {
  value: '1',
  label: '已发布'
}];

dicMap.setItem("fwzt", JSON.stringify(obj));
//阅读状态
obj = [{
  value: '',
  label: '全部'
}, {
  value: '0',
  label: '未读'
}, {
  value: '1',
  label: '已读'
}];
dicMap.setItem("ydzt", JSON.stringify(obj));
//资金状态
obj = [{
  value: '0',
  label: '未挂接'
}, {
  value: '1',
  label: '已挂接'
}, {
  value: '2',
  label: '挂接完成'
}];
dicMap.setItem("zjzt", JSON.stringify(obj));
//性别
obj = [{
  value: '0',
  label: '女'
}, {
  value: '1',
  label: '男'
}, {
  value: '2',
  label: '其他'
}];
dicMap.setItem("xb", JSON.stringify(obj));
//操作类型
obj = [{
  value: '0',
  label: '增加'
}, {
  value: '1',
  label: '修改'
}, {
  value: '2',
  label: '删除'
}];
dicMap.setItem("czlx", JSON.stringify(obj));
//验收意见
obj = [{
  label: "同意",
  value: "1"
},
{
  label: "不同意",
  value: "0"
}];
dicMap.setItem("ysyj", JSON.stringify(obj));
//月度
obj = [{
  label: "1",
  value: "1"
},
{
  label: "2",
  value: "2"
},{
  label: "3",
  value: "3"
},
{
  label: "4",
  value: "4"
},{
  label: "5",
  value: "5"
},
{
  label: "6",
  value: "6"
},
{
  label: "7",
  value: "7"
},
{
  label: "8",
  value: "8"
},
{
  label: "9",
  value: "9"
},
{
  label: "10",
  value: "10"
},{
  label: "11",
  value: "11"
},
{
  label: "12",
  value: "12"
}];
dicMap.setItem("month", JSON.stringify(obj));
//政治建设类型
obj = [{
  label: "会议",
  value: "0"
},
{
  label: "活动",
  value: "1"
}];
dicMap.setItem("zzlx", JSON.stringify(obj));

//媒体级别
obj = [{
  label: "中央",
  value: "0"
},
{
  label: "省级",
  value: "1"
},
{
  label: "市级",
  value: "2"
}];
dicMap.setItem("mtjb", JSON.stringify(obj));
//媒体类型
obj = [{
  label: "网站",
  value: "0"
},
{
  label: "报纸",
  value: "1"
},
{
  label: "杂志",
  value: "2"
},{
  label: "电台",
  value: "3"
},
{
  label: "电视台",
  value: "4"
}];
dicMap.setItem("mtlx", JSON.stringify(obj));
//平台类型
obj = [{
  label: "微信公众号",
  value: "0"
},
{
  label: "微信企业号",
  value: "1"
},
{
  label: "微博",
  value: "2"
},{
  label: "客户端",
  value: "3"
},
{
  label: "办公网站",
  value: "4"
},
{
  label: "微视频",
  value: "5"
}
];
dicMap.setItem("ptlx", JSON.stringify(obj));
//报备类型
obj = [{
  label: "婚丧嫁娶",
  value: "1"
},
{
  label: "港澳台通行证",
  value: "2"
}
];
dicMap.setItem("bblx", JSON.stringify(obj));
//预警状态
obj = [{
  label: "绿灯",
  value: "1"
},
{
  label: "黄灯",
  value: "2"
},
{
  label: "橙灯",
  value: "3"
},
{
  label: "红灯",
  value: "4"
}
];
dicMap.setItem("yjzt", JSON.stringify(obj));
//预警频率
obj = [{
  label: "无",
  value: "0"
},
{
  label: "月度",
  value: "1"
},
{
  label: "季度",
  value: "2"
},
{
  label: "半年",
  value: "3"
},
{
  label: "年度",
  value: "4"
},
{
  label: "其他",
  value: "5"
}
];
dicMap.setItem("yjpl", JSON.stringify(obj));
import {
  dictionaries,
  xzqhDict,
  bmbmDict,
  duojiDict,
  cdDic
} from "@/api/config";
export function doCreate(key) {
  if (dicMap.getItem(key)) {
    return JSON.parse(dicMap.getItem(key))
  } else {
    diction(key).then(() => {
      doCreate(key);
    });
  }
}

function diction(key) {
  return new Promise((resolve, reject) => {
    if (key == "xzqh") {
      xzqhDict().then(res => {
        let data = res.data;
        if (data.success) {
          data.data.map(i => {
            i.label = i.name;
            i.value = i.bm;
            i.dictcode = i.bm;
            i.dictname = i.name;
            return i
          });
          dicMap.setItem(key, JSON.stringify(data.data));
          resolve(data.data);
        }
      }).catch(res => {
        console.log("失败'")
      })
    } else if (key == "bmbm") {
      bmbmDict().then(res => {
        let data = res.data;
        if (data.success) {
          data.data.map(i => {
            i.label = i.dictname;
            i.value = i.dictcode;
            return i
          });
          dicMap.setItem(key, JSON.stringify(data.data));
          resolve(data.data);
        }
      }).catch(res => {
        console.log("失败'")
      })
    } else if (key == "duojiDic") {
      duojiDict().then(res => {
        let data = res.data;
        if (data.success) {
          data.data.map(i => {
            i.label = i.dictname;
            i.value = i.dicttype;
            return i
          });
          dicMap.setItem(key, JSON.stringify(data.data));
          resolve(data.data);
        }
      }).catch(res => {
        console.log("失败'")
      })
    } else if(key=="cd"){
      cdDic().then(res => {
        let data = res.data;
        if (data.success) {
          data.data.map(i => {
            i.label = i.pName;
            i.value = i.code;
            return i
          });
          dicMap.setItem(key, JSON.stringify(data.data));
          resolve(data.data);
        }
      }).catch(res => {
        console.log("失败'")
      })

    }else
     {
      dictionaries(key).then(res => {
        let data = res.data;
        if (data.success) {
          data.data.map(i => {
            i.label = i.dictname;
            i.value = i.dictcode;
            return i
          });
          dicMap.setItem(key, JSON.stringify(data.data));
          resolve(data.data);
        }
      }).catch(res => {
        console.log("失败'")
      })
    }

  })
}



export function getDicTab(key, val) {
  let res;
  if (val === null || val === undefined) return "";
  if (dicMap.getItem(key)) {
    res = JSON.parse(dicMap.getItem(key)).filter(i => {
      return i.value == val
    });
    if (res.length) {
      res = res[0].label
    } else {
      res = val
    }
    return res;
  } else {
    diction(key).then(() => {
      getDicTab(key, val);
    })
  }
}

//多级菜单数据处理
export function moreMenu(data) {
  let _this = this;
  data.map(d => {
    if (d.children.length) {
      moreMenu(d.children);
    } else {
      delete d.children;
    }
    return d;
  });
}

//导出
import FileSaver from 'file-saver'
import XLSX from 'xlsx';
export function exportExcel(id) {
  // var arr = Array.prototype.slice.call(document.getElementsByClassName('has-gutter')[1].getElementsByClassName('is-leaf'));
  // arr.map(i => {
  //   i.setAttribute("rowspan", "1");
  // })
  /* generate workbook object from table */
  var wb = XLSX.utils.table_to_book(document.querySelector('#' + id))
  /* get binary string as output */
  var wbout = XLSX.write(wb, {
    bookType: 'xlsx',
    bookSST: true,
    type: 'array'
  })
  try {
    FileSaver.saveAs(new Blob([wbout], {
      type: 'application/octet-stream'
    }), id + '.xlsx')
  } catch (e) {
    if (typeof console !== 'undefined') console.log(e, wbout)
  }
  return wbout
}

//打印
export function printExcel(id) {
  //let Print = document.getElementById(id);
  // let arr = Array.prototype.slice.call(Print.getElementsByClassName('el-table__body')[0].getElementsByClassName('cell'));
  // let tab = Array.prototype.slice.call(Print.querySelectorAll('table'));
  // debugger
  // arr.map(i=>{
  //     i.setAttribute("style","width:100%!important");
  // })
  // tab.map(j=>{
  //   j.setAttribute("style","width:100%!important");
  // })
  // let newContent = Print.innerHTML;
  // let oldContent = document.body.innerHTML;
  // document.body.innerHTML = newContent;
  // window.print();
  // document.body.innerHTML = oldContent;
  // window.location.reload();
  // return false

  let printStr = "<html><head><meta http-equiv='Content-Type' content='text/html; charset=utf-8'></head>";
  const tabStyle = `<style>
  table,table tr th, table tr td { border:1px solid #f5f7fa;color:#606266;line-height: 30px;height:30px }
  .el-table__header,.el-table__body,.el-table__footer{width:100%!important;border-collapse: collapse;text-align:center;}
  .el-table__body, tr td .cell{width:100%!important}
  </style><body>`;
  let content = "";
  let str = document.getElementById(id).innerHTML;
  content = content + str;
  printStr = printStr + tabStyle + content + "</body></html>";
  let pwin = window.open("_blank");
  pwin.document.write(printStr);
  pwin.document.close();
  pwin.focus();
  setTimeout(() => {
    pwin.print();
    pwin.close();
  }, 500);
  return true;


}
