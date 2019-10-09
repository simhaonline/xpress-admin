import request from '@/utils/request'

export function getComments(page, size) {
  return request({
    url: '/comments',
    method: 'get',
    params: { page, size }
  })
}

export function removeComment(id) {
  return request({
    url: '/comments/' + id,
    method: 'delete'
  })
}

export function approveComment(id) {
  return request({
    url: '/comments/' + id + '/approve',
    method: 'patch'
  })
}
