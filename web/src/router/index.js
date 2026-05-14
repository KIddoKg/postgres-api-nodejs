import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../store/auth'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/auth/LoginView.vue'),
    meta: { public: true },
  },
  {
    path: '/',
    component: () => import('../layouts/AppLayout.vue'),
    meta: { requiresAuth: true },
    children: [
      { path: '', redirect: '/provinces' },
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('../views/dashboard/DashboardView.vue'),
      },
      {
        path: 'provinces',
        name: 'Provinces',
        component: () => import('../views/provinces/ProvincesView.vue'),
      },
      {
        path: 'provinces/:code/districts',
        name: 'Districts',
        component: () => import('../views/provinces/DistrictsView.vue'),
      },
      {
        path: 'provinces/:code/districts/:districtCode/wards',
        name: 'Wards',
        component: () => import('../views/provinces/WardsView.vue'),
      },
      {
        path: 'users',
        name: 'Users',
        component: () => import('../views/users/UsersView.vue'),
        meta: { requiresAdmin: true },
      },
    ],
  },
  { path: '/:pathMatch(.*)*', redirect: '/' },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(async (to, from, next) => {
  const auth = useAuthStore()

  if (to.meta.public) return next()

  if (!auth.isAuthenticated) return next('/login')

  if (!auth.user) await auth.fetchMe()

  if (!auth.isAuthenticated) return next('/login')

  if (to.meta.requiresAdmin && !auth.isAdmin) return next('/')

  next()
})

export default router
