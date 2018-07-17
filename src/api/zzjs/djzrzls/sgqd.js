import request from '@/utils/request'
//查询
export function sgqdSearch(obj) {
  return request({
    url: '/Sgqd/select',
    method: 'post',
    data:obj
  })
}
//添加修改
export function sgqdSave(url, obj) {
  return request({
    url: '/Sgqd/' + url,
    method: 'post',
    data: obj
  })
}
//删除
export function sgqdDel(obj) {
    return request({
        url: '/Sgqd/delete',
        method: 'post',
        data: obj
    })
}