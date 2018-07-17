import request from '@/utils/request'
//考核评议列表查询
export function dateQuery(obj) {
    return request({
        url: '/Dzzd/select',
        method: 'post',
        data: obj
    })
}
//新增
export function dateAdd(obj) {
  return request({
    url: '/Dzzd/add',
    method: 'post',
    data: obj
  })
}
//修改
export function dateUpdate(obj) {
  return request({
    url: '/Dzzd/update',
    method: 'post',
    data: obj
  })
}
//删除
export function dateDel(obj) {
  return request({
    url: '/Dzzd/delete',
    method: 'post',
    data: obj
  })
}
