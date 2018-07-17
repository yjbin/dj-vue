import request from '@/utils/request'
//职工福利列表查询
export function zgflSearch(obj) {
    return request({
        url: '/ZfjsZgflC/findPage',
        method: 'post',
        data: obj
    })
}
//添加修改
export function zgflSave(url, obj) {
  return request({
    url: '/ZfjsZgflC/' + url,
    method: 'post',
    data: obj
  })
}
//删除
export function zgflDel(obj) {
  return request({
    url: '/ZfjsZgflC/delete',
    method: 'post',
    data: obj
  })
}
