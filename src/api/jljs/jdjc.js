
import request from '@/utils/request'

export function dateIdQuery(obj) {
    return request({
        url: '/Jdjc/select',
        method: 'post',
        data: obj
    })
}
//新增
export function dateAdd(obj) {
  return request({
    url: '/Jdjc/add',
    method: 'post',
    data: obj
  })
}
//修改
export function dateUpdate(obj) {
  return request({
    url: '/Jdjc/update',
    method: 'post',
    data: obj
  })
}
//删除
export function dateDel(obj) {
  return request({
    url: '/Jdjc/delete',
    method: 'post',
    data: obj
  })
}

