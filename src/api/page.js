import request from '@/utils/request'

export function getPages() {
  return request({
    url: '/pages',
    method: 'get'
  })
}

export function getPage(id) {
  return request({
    url: '/pages/' + id,
    method: 'get'
  })
}

export function createPage(data) {
  return request({
    url: '/pages',
    method: 'post',
    data
  })
}

export function updatePage(id, data) {
  return request({
    url: '/pages/' + id,
    method: 'put',
    data
  })
}

export function removePage(id) {
  return request({
    url: '/pages/' + id,
    method: 'delete'
  })
}
