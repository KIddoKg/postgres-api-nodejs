import http from './http'

export const getMigrationStatus = () => http.get('/migration/status')

// Sync qua SSE — trả về EventSource để component lắng nghe realtime
export const syncData = (target = 'all', token) => {
  return fetch(`/api/migration/sync`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ target }),
  })
}
