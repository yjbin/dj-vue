
import request from '@/utils/request'

export function dateQuery(obj) {
    return request({
        url: '/Wtqd/select',
        method: 'post',
        data: obj
    })
}
//新增
export function dateAdd(obj) {
  return request({
    url: '/Wtqd/add',
    method: 'post',
    data: obj
  })
}
//修改
export function dateUpdate(obj) {
  return request({
    url: '/Wtqd/update',
    method: 'post',
    data: obj
  })
}
//删除
export function dateDel(obj) {
  return request({
    url: '/Wtqd/delete',
    method: 'post',
    data: obj
  })
}

