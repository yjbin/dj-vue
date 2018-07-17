
import request from '@/utils/request'
//列表查询
export function khpyQuery(obj) {
    return request({
        url: '/ZfjsBBQK/findPage',
        method: 'post',
        data: obj
    })
}
//新增
export function khpyAdd(obj) {
  return request({
    url: '/ZfjsBBQK/add',
    method: 'post',
    data: obj
  })
}
//修改
export function khpyUpdate(obj) {
  return request({
    url: '/ZfjsBBQK/update',
    method: 'post',
    data: obj
  })
}
//删除
export function khpyDel(obj) {
  return request({
    url: '/ZfjsBBQK/delete',
    method: 'post',
    data: obj
  })
}
