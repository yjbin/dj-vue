import request from '@/utils/request'
//查询
export function hdbSearch(obj) {
  return request({
    url: '/Hdb/select',
    method: 'post',
    data:obj
  })
}
//添加修改
export function hdbSave(url, obj) {
  return request({
    url: '/Hdb/' + url,
    method: 'post',
    data: obj
  })
}
//删除
export function hdbDel(obj) {
    return request({
        url: '/Hdb/delete',
        method: 'post',
        data: obj
    })
}