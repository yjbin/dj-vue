
import request from '@/utils/request'
let echarts = require('echarts');
let option_one = {
    // title : {
    //   text: '各单位登记数量'
    // },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
          type: 'shadow'
      }
    },
    grid: {
        top: '24%',
        left: '3%',
        right: '5%',
        bottom: '17%',
        containLabel: true
    },
    legend: {
      data: ['绿灯', '黄灯', '橙灯', '红灯']
    },
    xAxis: [
        {
            type: 'category',
            data: ['1镇', '2镇', '3镇', '4镇', '5镇', '6镇'],
            axisLine: {
                lineStyle: {
                    color: '#666'
                }
            }
        }
    ],
    yAxis: [
        {
            name: '',
            type: 'value',
            axisLine: {
                lineStyle: {
                    color: '#666'
                }
            }
        }
    ],
    series: [
      {
        name: '绿灯',
        type: 'bar',
        barWidth: '15%',
        data: [34, 13, 13, 20, 45, 34]
      }, 
      {
          name: '黄灯',
          type: 'bar',
          barWidth: '15%',
          data: [24, 52, 22, 40, 33, 19]
      }, 
      {
        name: '橙灯',
        type: 'bar',
        barWidth: '15%',
        data: [44, 15, 14, 30, 41,31]
      }, 
      {
        name: '红灯',
        type: 'bar',
        barWidth: '15%',
        data: [23, 12, 34, 20, 12, 22]
      }]
  };
let option_two = {
    title : {
      text: '各种类型比例',
      x:'2%'
    },
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c}"
    },
    legend: {
        orient: 'vertical',
        left: 'left',
        data: [
          {
              name:'合作社',
              icon:'diamond'
          },
          {
              name:'农场',
              icon:'diamond'
          },
          {
              name:'大户',
              icon:'diamond'
          },
          {
              name:'企业',
              icon:'diamond'
          }
      ]
    },
    series : [
        {
            name: '类型',
            type: 'pie',
            radius : '55%',
            center: ['50%', '60%'],
            data:[
                {value:335, name:'合作社'},
                {value:310, name:'农场'},
                {value:234, name:'大户'},
                {value:135, name:'企业'}
            ],
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]  
  };
let option_four = {
// title: {
//     text: '评估分数分布'
// },
tooltip : {
    trigger: 'axis',
    axisPointer: {
        type: 'cross',
        label: {
            backgroundColor: '#6a7985'
        }
    }
},
legend: {
    data:['绿灯','黄灯','橙灯','红灯']
},
grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
},
xAxis: [
    {
        type: 'category',
        data: ['1镇', '2镇', '3镇', '4镇', '5镇', '6镇'],
        axisLine: {
            lineStyle: {
                color: '#666'
            }
        }
    }
],
yAxis : [
    {
        type : 'value'
    }
],
series : [
    {
        name:'绿灯',
        type:'line',
        stack: '总量',
        areaStyle: {normal: {}},
        data:[0, 0, 0, 0, 90, 0, 10, 0, 0, 0, 0]
    },
    {
        name:'黄灯',
        type:'line',
        stack: '总量',
        areaStyle: {normal: {}},
        data:[0, 0, 0, 0, 30, 0, 0, 0, 0, 0, 0]
    },
    {
        name:'橙灯',
        type:'line',
        stack: '总量',
        areaStyle: {normal: {}},
        data:[30, 0, 0, 0, 66, 0, 0, 0, 0, 0, 0]
    },
    {
        name:'红灯',
        type:'line',
        stack: '总量',
        areaStyle: {normal: {}},
        data:[0, 0, 0, 0, 20, 0, 0, 0, 0, 0, 0]
    }
]
};  
let myChart_one = "";
let myChart_two = "";
let myChart_four = "";
export function createCharts() {
    myChart_one = echarts.init(document.getElementById('chart_one'));
    myChart_two = echarts.init(document.getElementById('chart_two'));
    myChart_four = echarts.init(document.getElementById('chart_four'));
  }
/* 饼图-接口 */  
export function wdjsyjQuery(obj) {
    return request({
        url: '/Yjxx/selectByWdjs',
        method: 'post',
        data: obj
    })
}
/* 饼图-返回数据 */
export function chartsJsonTwo(data){
    option_two.series[0].data = [];
    for(let i=0; i<data.length; i++){
          let obj = {};
          obj.name = data[i].cdmc;
          obj.value = data[i].green +data[i].blue+data[i].red+data[i].yellow;
          option_two.series[0].data.push(obj);
    }
    myChart_two.setOption(option_two);
}
/* 柱状图/折线图-接口 */
export function wdjsytjt(obj) {
    return request({
      url: '/Yjxx/selectByWdjsLine',
      method: 'post',
      data: obj
    })
  }

/* 柱状图-返回数据 */
export function chartsJsonOne(data){
    option_one.xAxis[0].data = data[0].cdmcs;
    for(let i=1; i<data.length; i++){
        option_one.series[i-1].data = data[i].dataList;
  }
    myChart_one.setOption(option_one);
}

/* 折线图-返回数据 */
export function chartsJsonFour(data){
    option_four.xAxis[0].data = data[0].cdmcs;
    for(let i=1; i<data.length; i++){
        option_four.series[i-1].data = data[i].dataList;
  }
    myChart_four.setOption(option_four);
}



export function xzqhyjQuery(obj) {
    return request({
        url: '/Yjxx/selectByXzqh',
        method: 'post',
        data: obj
    })
}
export function bmyjQuery(obj) {
    return request({
        url: '/Yjxx/selectByXzqhAndBm',
        method: 'post',
        data: obj
    })
}


