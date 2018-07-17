import request from '@/utils/request'
//查询
export function dwgkSearch(obj) {
  return request({
    url: '/Dwgk/select',
    method: 'post',
    data:obj
  })
}
//添加修改
export function dwgkSave(url, obj) {
  return request({
    url: '/Dwgk/' + url,
    method: 'post',
    data: obj
  })
}
//删除
export function dwgkDel(obj) {
    return request({
        url: '/Dwgk/delete',
        method: 'post',
        data: obj
    })
}