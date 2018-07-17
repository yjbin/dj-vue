import request from '@/utils/request'
//查询
export function hdbSearch(obj) {
  return request({
    url: '/ZhzjsHdb/select',
    method: 'post',
    data:obj
  })
}
//添加修改
export function hdbSave(url, obj) {
  return request({
    url: '/ZhzjsHdb/' + url,
    method: 'post',
    data: obj
  })
}
//删除
export function hdbDel(obj) {
    return request({
        url: '/ZhzjsHdb/delete',
        method: 'post',
        data: obj
    })
}