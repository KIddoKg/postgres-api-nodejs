import { defineStore } from 'pinia'
import { login as apiLogin, getMe, logout as apiLogout } from '../api/auth'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: localStorage.getItem('token') || null,
    loading: false,
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
    isAdmin: (state) => state.user?.role === 'admin',
  },

  actions: {
    async login(email, password) {
      this.loading = true
      try {
        const res = await apiLogin(email, password)
        this.token = res.data.token
        this.user = res.data.user
        localStorage.setItem('token', this.token)
      } finally {
        this.loading = false
      }
    },

    async fetchMe() {
      try {
        const res = await getMe()
        this.user = res.data
      } catch {
        this.clear()
      }
    },

    async logout() {
      try { await apiLogout() } catch {}
      this.clear()
    },

    clear() {
      this.token = null
      this.user = null
      localStorage.removeItem('token')
    },
  },
})
