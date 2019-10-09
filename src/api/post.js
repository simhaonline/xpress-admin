import request from '@/utils/request'

export function createPost(data) {
  return request({
    url: '/posts',
    method: 'post',
    data
  })
}

export function getPosts(page, size) {
  return request({
    url: '/posts',
    method: 'get',
    params: { page, size }
  })
}

export function getPost(id) {
  return request({
    url: '/posts/' + id,
    method: 'get'
  })
}

export function updatePost(id, data) {
  return request({
    url: '/posts/' + id,
    method: 'put',
    data
  })
}

export function removePost(id) {
  return request({
    url: '/posts/' + id,
    method: 'delete'
  })
}
