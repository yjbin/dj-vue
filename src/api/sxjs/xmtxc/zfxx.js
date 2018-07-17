import request from '@/utils/request'
//查询
export function zfxxSearch(obj) {
  return request({
    url: '/SxjsZfxx/select',
    method: 'post',
    data:obj
  })
}
//添加修改
export function zfxxSave(url, obj) {
  return request({
    url: '/SxjsZfxx/' + url,
    method: 'post',
    data: obj
  })
}
//删除
export function zfxxDel(obj) {
    return request({
        url: '/SxjsZfxx/delete',
        method: 'post',
        data: obj
    })
}