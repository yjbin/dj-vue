
import request from '@/utils/request'

export function khpyQuery(obj) {
    return request({
        url: '/ZfjsLlcg/findPage',
        method: 'post',
        data: obj
    })
}
//新增
export function khpyAdd(obj) {
  return request({
    url: '/ZfjsLlcg/add',
    method: 'post',
    data: obj
  })
}
//修改
export function khpyUpdate(obj) {
  return request({
    url: '/ZfjsLlcg/update',
    method: 'post',
    data: obj
  })
}
//删除
export function khpyDel(obj) {
  return request({
    url: '/ZfjsLlcg/delete',
    method: 'post',
    data: obj
  })
}

