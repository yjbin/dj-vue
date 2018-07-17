import request from '@/utils/request'
//查询
export function shykSearch(obj) {
  return request({
    url: '/Shyk/select',
    method: 'post',
    data:obj
  })
}
//添加修改
export function shykSave(url, obj) {
  return request({
    url: '/Shyk/' + url,
    method: 'post',
    data: obj
  })
}
//删除
export function shykDel(obj) {
    return request({
        url: '/Shyk/delete',
        method: 'post',
        data: obj
    })
}
//查询所有成员
export function getAllmember(obj) {
  return request({
      url: '/deptNumber/selectNumber',
      method: 'post',
      data: obj
  })
}