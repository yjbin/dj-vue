import request from '@/utils/request'
//考核评议列表查询
export function khpyQuery(obj) {
    return request({
        url: '/Txthzd/select',
        method: 'post',
        data: obj
    })
}
//新增
export function khpyAdd(obj) {
  return request({
    url: '/Txthzd/add',
    method: 'post',
    data: obj
  })
}
//修改
export function khpyUpdate(obj) {
  return request({
    url: '/Txthzd/update',
    method: 'post',
    data: obj
  })
}
//删除
export function khpyDel(obj) {
  return request({
    url: '/Txthzd/delete',
    method: 'post',
    data: obj
  })
}
