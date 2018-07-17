import request from '@/utils/request'
//查询
export function ptdjSearch(obj) {
  return request({
    url: '/SxjsPtdj/select',
    method: 'post',
    data:obj
  })
}
//添加修改
export function ptdjSave(url, obj) {
  return request({
    url: '/SxjsPtdj/' + url,
    method: 'post',
    data: obj
  })
}
//删除
export function ptdjDel(obj) {
    return request({
        url: '/SxjsPtdj/delete',
        method: 'post',
        data: obj
    })
}