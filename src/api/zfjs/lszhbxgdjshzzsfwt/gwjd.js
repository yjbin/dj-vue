import request from '@/utils/request'
//公务接待列表查询
export function gwjdSearch(obj) {
    return request({
        url: '/ZfjsGwjd/findPage',
        method: 'post',
        data: obj
    })
}
//添加修改
export function gwjdSave(url, obj) {
  return request({
    url: '/ZfjsGwjd/' + url,
    method: 'post',
    data: obj
  })
}
//删除
export function gwjdDel(obj) {
  return request({
    url: '/ZfjsGwjd/delete',
    method: 'post',
    data: obj
  })
}
