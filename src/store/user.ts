import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useUserStore = defineStore('user', () => {
  // 状态
  const username = ref<string>('Admin')
  const token = ref<string>('')
  const roles = ref<string[]>(['admin'])

  // 计算属性
  const isLoggedIn = computed(() => !!token.value)

  // 方法
  function setUserInfo(user: { username: string; token: string; roles?: string[] }) {
    username.value = user.username
    token.value = user.token
    if (user.roles) roles.value = user.roles
  }

  function logout() {
    username.value = ''
    token.value = ''
    roles.value = []
  }

  return {
    username,
    token,
    roles,
    isLoggedIn,
    setUserInfo,
    logout
  }
})
