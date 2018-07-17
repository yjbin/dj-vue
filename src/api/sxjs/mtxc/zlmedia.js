import request from '@/utils/request'
//查询
export function zlmediaSearch(obj) {
  return request({
    url: '/SxjsMtxc/select',
    method: 'post',
    data:obj
  })
}
//添加修改
export function zlmediaSave(url, obj) {
  return request({
    url: '/SxjsMtxc/' + url,
    method: 'post',
    data: obj
  })
}
//删除
export function zlmediaDel(obj) {
    return request({
        url: '/SxjsMtxc/delete',
        method: 'post',
        data: obj
    })
}