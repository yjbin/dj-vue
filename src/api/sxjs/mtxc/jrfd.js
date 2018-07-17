import request from '@/utils/request'
//查询
export function jrfdSearch(obj) {
  return request({
    url: '/SxjsTgxc/select',
    method: 'post',
    data:obj
  })
}
//添加修改
export function jrfdSave(url, obj) {
  return request({
    url: '/SxjsTgxc/' + url,
    method: 'post',
    data: obj
  })
}
//删除
export function jrfdDel(obj) {
    return request({
        url: '/SxjsTgxc/delete',
        method: 'post',
        data: obj
    })
}