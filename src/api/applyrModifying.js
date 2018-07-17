import request from '@/utils/request'
//修改申请列表查询
export function dateQuery(obj) {
    return request({
        url: '/editsqb/select',
        method: 'post',
        data: obj
    })
}
//新增
export function dateAdd(obj) {
  return request({
    url: '/editsqb/add',
    method: 'post',
    data: obj
  })
}
//修改
export function dateUpdate(obj) {
  return request({
    url: '/editsqb/update',
    method: 'post',
    data: obj
  })
}

