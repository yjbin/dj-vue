import request from '@/utils/request'
//查询
export function wmcsSearch(obj) {
  return request({
    url: '/Wmcswt/select',
    method: 'post',
    data:obj
  })
}
//添加修改
export function wmcsSave(url, obj) {
  return request({
    url: '/Wmcswt/' + url,
    method: 'post',
    data: obj
  })
}
//删除
export function wmcsDel(obj) {
    return request({
        url: '/Wmcswt/delete',
        method: 'post',
        data: obj
    })
}