
import request from '@/utils/request'

export function dateQuery(obj) {
  return request({
    url: '/SxjsYqjc/select',
    method: 'post',
    data: obj
  })
}
//新增
export function dateAdd(obj) {
  return request({
    url: '/SxjsYqjc/add',
    method: 'post',
    data: obj
  })
}
//修改
export function dateUpdate(obj) {
  return request({
    url: '/SxjsYqjc/update',
    method: 'post',
    data: obj
  })
}
//删除
export function dateDel(obj) {
  return request({
    url: '/SxjsYqjc/delete',
    method: 'post',
    data: obj
  })
}
//舆情回复
export function replydateQuery(obj) {
  return request({
    url: '/SxjsYqjchf/select',
    method: 'post',
    data: obj
  })
}
//新增
export function replydateAdd(obj) {
  return request({
    url: '/SxjsYqjchf/add',
    method: 'post',
    data: obj
  })
}
//修改
export function replydateUpdate(obj) {
  return request({
    url: '/SxjsYqjchf/update',
    method: 'post',
    data: obj
  })
}
//删除
export function replydateDel(obj) {
  return request({
    url: '/SxjsYqjchf/delete',
    method: 'post',
    data: obj
  })
}

