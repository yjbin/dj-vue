import request from '@/utils/request'
//党员发展列表查询
export function dateQuery(obj) {
    return request({
        url: '/Dyfz/select',
        method: 'post',
        data: obj
    })
}
//新增
export function dateAdd(obj) {
  return request({
    url: '/Dyfz/add',
    method: 'post',
    data: obj
  })
}
//修改
export function dateUpdate(obj) {
  return request({
    url: '/Dyfz/update',
    method: 'post',
    data: obj
  })
}
//删除
export function dateDel(obj) {
  return request({
    url: '/Dyfz/delete',
    method: 'post',
    data: obj
  })
}
