import request from '@/utils/request'

export function getTagsByIds(ids) {
  return request({
    url: '/tags',
    method: 'get',
    params: {
      id: ids.join(',')
    }
  })
}

export function getTags() {
  return request({
    url: '/tags',
    method: 'get'
  })
}

export function getTag(id) {
  return request({
    url: '/tags/' + id,
    method: 'get'
  })
}

export function createTag(data) {
  return request({
    url: '/tags',
    method: 'post',
    data
  })
}

export function updateTag(id, data) {
  return request({
    url: '/tags/' + id,
    method: 'put',
    data
  })
}

export function removeTag(id) {
  return request({
    url: '/tags/' + id,
    method: 'delete'
  })
}
