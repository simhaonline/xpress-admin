import request from '@/utils/request'

export function getSettings() {
  return request({
    url: 'settings',
    method: 'get'
  })
}

export function updateSettings(data) {
  return request({
    url: 'settings',
    method: 'post',
    data
  })
}
