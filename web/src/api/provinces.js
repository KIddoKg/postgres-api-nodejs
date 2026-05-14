import http from './http'

export const getProvinces = (params) => http.get('/provinces', { params })
export const getProvince = (code) => http.get(`/provinces/${code}`)
export const getDistricts = (code, params) => http.get(`/provinces/${code}/districts`, { params })
export const getDistrict = (code, districtCode) => http.get(`/provinces/${code}/districts/${districtCode}`)
export const getWards = (code, districtCode, params) => http.get(`/provinces/${code}/districts/${districtCode}/wards`, { params })
