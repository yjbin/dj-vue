import request from '@/utils/request'
//查询
export function dfsjSearch(obj) {
  return request({
    url: '/Dfsj/select',
    method: 'post',
    data:obj
  })
}
//添加修改
export function dfsjSave(url, obj) {
  return request({
    url: '/Dfsj/' + url,
    method: 'post',
    data: obj
  })
}
//删除
export function dfsjDel(obj) {
    return request({
        url: '/Dfsj/delete',
        method: 'post',
        data: obj
    })
}