import api from '@/utils/api'

export function getInfo (token) {
  return api({
    url: 'api/login/getInfo',
    method: 'get',
    params: {token}
  })
}
