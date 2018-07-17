
import request from '@/utils/request'
//列表查询
export function dateQuery(obj) {
    return request({
        url: '/ZfjsPPdz/findPage',
        method: 'post',
        data: obj
    })
}
//新增
export function dateAdd(obj) {
  return request({
    url: '/ZfjsPPdz/add',
    method: 'post',
    data: obj
  })
}
//修改
export function dateUpdate(obj) {
  return request({
    url: '/ZfjsPPdz/update',
    method: 'post',
    data: obj
  })
}
//删除
export function dateDel(obj) {
  return request({
    url: '/ZfjsPPdz/delete',
    method: 'post',
    data: obj
  })
}
