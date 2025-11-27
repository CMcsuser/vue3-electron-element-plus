<template>
  <el-button type="warning" class="logout-btn" @click="logout">
    退出登录
  </el-button>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useUserStore } from '@/store/user'
import { ElMessage, ElMessageBox } from 'element-plus'

const router = useRouter()
const userStore = useUserStore()

const logout = async () => {
  try {
    await ElMessageBox.confirm('确定要退出登录吗？', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })

    userStore.logout()
    localStorage.removeItem('token')
    ElMessage.success('已退出登录')
    router.push('/login')
  } catch (e) {
    // 取消退出或其他错误
  }
}
</script>

<style scoped lang="scss">
.logout-btn {
  position: fixed;
  right: 20px;
  top: 20px;
  z-index: 1000;
}
</style>
