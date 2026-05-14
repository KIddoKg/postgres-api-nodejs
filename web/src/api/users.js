import http from './http'

export const getUsers = (params) => http.get('/users', { params })
export const createUser = (data) => http.post('/users', data)
export const updateUser = (id, data) => http.put(`/users/${id}`, data)
export const deleteUser = (id) => http.delete(`/users/${id}`)
