import request from '@/utils/request'

export function getCategories() {
  return request({
    url: '/categories',
    method: 'get'
  })
}

export function getCategory(id) {
  return request({
    url: '/categories/' + id,
    method: 'get'
  })
}

export function createCategory(data) {
  return request({
    url: '/categories',
    method: 'post',
    data
  })
}

export function updateCategory(id, data) {
  return request({
    url: '/categories/' + id,
    method: 'put',
    data
  })
}

export function removeCategory(id) {
  return request({
    url: '/categories/' + id,
    method: 'delete'
  })
}
