import request from '@/utils/request'
//勤俭节约列表查询
export function qjjySearch(obj) {
    return request({
        url: '/ZfjsQjjy/findPage',
        method: 'post',
        data: obj
    })
}
//添加修改
export function qjjySave(url, obj) {
  return request({
    url: '/ZfjsQjjy/' + url,
    method: 'post',
    data: obj
  })
}
//删除
export function qjjyDel(obj) {
  return request({
    url: '/ZfjsQjjy/delete',
    method: 'post',
    data: obj
  })
}
