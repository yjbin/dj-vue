
import request from '@/utils/request'

export function khpyQuery(obj) {
    return request({
        url: '/ZfjsPxb/findPage',
        method: 'post',
        data: obj
    })
}
//新增
export function khpyAdd(obj) {
  return request({
    url: '/ZfjsPxb/add',
    method: 'post',
    data: obj
  })
}
//修改
export function khpyUpdate(obj) {
  return request({
    url: '/ZfjsPxb/update',
    method: 'post',
    data: obj
  })
}
//删除
export function khpyDel(obj) {
  return request({
    url: '/ZfjsPxb/delete',
    method: 'post',
    data: obj
  })
}

