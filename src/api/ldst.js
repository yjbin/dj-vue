import request from '@/utils/request'
//领导视图查询
export function zzandcyQuery(obj) {
    return request({
        url: '/Ldst/selectZzAndCy',
        method: 'post',
        data: obj
    })
}
export function zdxmQuery(obj) {
    return request({
        url: '/Ldst/selectZdxm',
        method: 'post',
        data: obj
    })
}
export function qzdgwQuery(obj) {
    return request({
        url: '/Ldst/selectQzdgw',
        method: 'post',
        data: obj
    })
}
//五大建设详情
export function wdjsDetillQuery(obj) {
    return request({
        url: '/Ldst/selectWdjsInfo',
        method: 'post',
        data: obj
    })
}
export function yjbjUpdate(obj) {
    return request({
        url: '/Yjxx/updateYjxxById',
        method: 'post',
        data: obj
    })
}
export function xgjlQuery(obj) {
    return request({
        url: '/Yjxx/selectYjxxEditByYjxxId',
        method: 'post',
        data: obj
    })
}


