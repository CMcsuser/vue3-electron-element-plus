import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue'),
    meta: { title: '登录' }
  },
  {
    path: '/',
    redirect: '/dashboard'
  },
  {
    path: '/',
    component: () => import('@/layout/index.vue'),
    children: [
      {
        path: '/dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index.vue'),
        meta: { title: '仪表盘', icon: 'Odometer' }
      },
      {
        path: '/charts',
        name: 'Charts',
        component: () => import('@/views/charts/index.vue'),
        meta: { title: '图表展示', icon: 'TrendCharts' }
      },
      {
        path: '/table',
        name: 'Table',
        component: () => import('@/views/table/index.vue'),
        meta: { title: '表格管理', icon: 'Grid' }
      },
      {
        path: '/form',
        name: 'Form',
        component: () => import('@/views/form/index.vue'),
        meta: { title: '表单页面', icon: 'Document' }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// 路由守卫 - 未登录跳转到登录页
router.beforeEach((to, _from, next) => {
  const token = localStorage.getItem('token')
  
  // 如果访问登录页，且已登录，则跳转到首页
  if (to.path === '/login') {
    if (token) {
      next('/dashboard')
    } else {
      next()
    }
  } else {
    // 访问其他页面，未登录则跳转到登录页
    if (token) {
      next()
    } else {
      next('/login')
    }
  }
})

export default router
