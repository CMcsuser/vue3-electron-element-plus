import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAppStore = defineStore('app', () => {
  // 侧边栏状态
  const sidebarOpened = ref<boolean>(true)

  // 切换侧边栏
  function toggleSidebar() {
    sidebarOpened.value = !sidebarOpened.value
  }

  return {
    sidebarOpened,
    toggleSidebar
  }
})
