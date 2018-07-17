import request from '@/utils/request'
//办公用房列表查询
export function bgyfSearch(obj) {
    return request({
        url: '/ZfjsBgyf/findPage',
        method: 'post',
        data: obj
    })
}
//添加修改
export function bgyfSave(url, obj) {
  return request({
    url: '/ZfjsBgyf/' + url,
    method: 'post',
    data: obj
  })
}
//删除
export function bgyfDel(obj) {
  return request({
    url: '/ZfjsBgyf/delete',
    method: 'post',
    data: obj
  })
}
