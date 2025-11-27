<template>
  <el-container class="layout-container">
    <el-main class="main-content">
      <router-view />
      <LogoutButton />
    </el-main>
  </el-container>
</template>

<script setup lang="ts">
import LogoutButton from '@/components/LogoutButton.vue'
</script>

<style scoped lang="scss">
.layout-container {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  background-color: #f0f2f5;
  padding: 20px;
  overflow-y: auto;
  flex: 1;
}
</style>
