import request from '@/utils/request'
//列表查询
export function dateQuery(obj) {
    return request({
        url: '/Hyb/select',
        method: 'post',
        data: obj
    })
}
//新增
export function dateAdd(obj) {
  return request({
    url: '/Hyb/add',
    method: 'post',
    data: obj
  })
}
//修改
export function dateUpdate(obj) {
  return request({
    url: '/Hyb/update',
    method: 'post',
    data: obj
  })
}
//删除
export function dateDel(obj) {
  return request({
    url: '/Hyb/delete',
    method: 'post',
    data: obj
  })
}
