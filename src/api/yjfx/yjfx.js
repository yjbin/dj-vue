
import request from '@/utils/request'

export function wdjsyjQuery(obj) {
    return request({
        url: '/Yjxx/selectByWdjs',
        method: 'post',
        data: obj
    })
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


