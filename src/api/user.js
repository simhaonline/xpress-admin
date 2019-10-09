import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/token',
    method: 'post',
    data
  })
}

export function getUsers() {
  return request({
    url: 'users',
    method: 'get'
  })
}

export function getUser(id) {
  return request({
    url: 'users/' + id,
    method: 'get'
  })
}

export function getCurrentUser() {
  return request({
    url: 'users/current',
    method: 'get'
  })
}

export function removeUser(id) {
  return request({
    url: 'users/' + id,
    method: 'delete'
  })
}

export function updateUser(id, data) {
  return request({
    url: 'users/' + id,
    method: 'put',
    data
  })
}

export function createUser(data) {
  return request({
    url: 'users',
    method: 'post',
    data
  })
}
