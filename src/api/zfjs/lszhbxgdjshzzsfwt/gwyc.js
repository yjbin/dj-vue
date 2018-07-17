import request from '@/utils/request'
//公务用车列表查询
export function gwycSearch(obj) {
    return request({
        url: '/ZfjsGwyc/findPage',
        method: 'post',
        data: obj
    })
}
//添加修改
export function gwycSave(url, obj) {
  return request({
    url: '/ZfjsGwyc/' + url,
    method: 'post',
    data: obj
  })
}
//删除
export function gwycDel(obj) {
  return request({
    url: '/ZfjsGwyc/delete',
    method: 'post',
    data: obj
  })
}
