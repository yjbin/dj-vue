import request from '@/utils/request'
//党组织换届列表查询
export function dateQuery(obj) {
    return request({
        url: '/Dzzhj/select',
        method: 'post',
        data: obj
    })
}
//新增
export function dateAdd(obj) {
  return request({
    url: '/Dzzhj/add',
    method: 'post',
    data: obj
  })
}
//修改
export function dateUpdate(obj) {
  return request({
    url: '/Dzzhj/update',
    method: 'post',
    data: obj
  })
}
//删除
export function dateDel(obj) {
  return request({
    url: '/Dzzhj/delete',
    method: 'post',
    data: obj
  })
}
