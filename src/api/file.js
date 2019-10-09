import request from '@/utils/request'

export function getFiles(page, size) {
  return request({
    url: '/files',
    method: 'get',
    params: { page, size }
  })
}

export function removeFile(id) {
  return request({
    url: '/files/' + id,
    method: 'delete'
  })
}
