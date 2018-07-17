import request from '@/utils/request'
//查询
export function hybSearch(obj) {
  return request({
    url: '/Hyb/select',
    method: 'post',
    data:obj
  })
}
//添加修改
export function hybSave(url, obj) {
  return request({
    url: '/Hyb/' + url,
    method: 'post',
    data: obj
  })
}
//删除
export function hybDel(obj) {
    return request({
        url: '/Hyb/delete',
        method: 'post',
        data: obj
    })
}