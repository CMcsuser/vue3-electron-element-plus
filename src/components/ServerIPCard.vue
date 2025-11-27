<template>
  <el-card class="server-ip-card">
    <template #header>
      <div class="card-header">
        <el-icon><Monitor /></el-icon>
        <span>服务器信息</span>
        <el-button 
          type="primary" 
          size="small" 
          :icon="Refresh" 
          @click="loadServerIP"
          :loading="loading"
          style="margin-left: auto"
        >
          刷新
        </el-button>
      </div>
    </template>
    
    <div class="server-info">
      <el-descriptions :column="1" border>
        <el-descriptions-item label="服务器IP">
          <el-tag v-if="serverIP" type="success" size="large">{{ serverIP }}</el-tag>
          <el-tag v-else type="info">未获取</el-tag>
          <el-button 
            v-if="serverIP"
            type="primary" 
            size="small" 
            :icon="CopyDocument" 
            @click="copyIP"
            style="margin-left: 10px"
          >
            复制
          </el-button>
        </el-descriptions-item>
        
        <el-descriptions-item label="访问地址">
          <el-link type="primary">{{ clientInfo.origin }}</el-link>
        </el-descriptions-item>
        
        <el-descriptions-item label="主机名">
          {{ serverInfo?.hostname || clientInfo.hostname }}
        </el-descriptions-item>
        
        <el-descriptions-item label="平台">
          {{ serverInfo?.platform || '-' }}
        </el-descriptions-item>
      </el-descriptions>
      
      <el-alert
        v-if="error"
        :title="error"
        type="warning"
        :closable="false"
        style="margin-top: 15px"
      />
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { Refresh, CopyDocument, Monitor } from '@element-plus/icons-vue'
import { getServerIP } from '@/api/server'
import { getClientInfo } from '@/utils/serverIP'
import type { ServerInfo } from '@/api/server'

const serverIP = ref<string>('')
const serverInfo = ref<ServerInfo | null>(null)
const clientInfo = ref(getClientInfo())
const loading = ref(false)
const error = ref<string>('')

// 加载服务器IP
const loadServerIP = async () => {
  loading.value = true
  error.value = ''
  
  try {
    const response = await getServerIP()
    serverIP.value = response.ip
    serverInfo.value = response
    ElMessage.success('服务器IP获取成功')
  } catch (err: any) {
    console.error('Failed to get server IP:', err)
    error.value = '无法连接到服务器API，请确保后端服务正常运行'
    
    // 降级方案：显示客户端访问的地址
    serverIP.value = clientInfo.value.hostname
    ElMessage.warning('使用客户端访问地址作为降级方案')
  } finally {
    loading.value = false
  }
}

// 复制IP到剪贴板
const copyIP = async () => {
  try {
    await navigator.clipboard.writeText(serverIP.value)
    ElMessage.success('IP地址已复制到剪贴板')
  } catch (error) {
    console.error('Failed to copy:', error)
    ElMessage.error('复制失败')
  }
}

onMounted(() => {
  loadServerIP()
})
</script>

<style scoped lang="scss">
.server-ip-card {
  margin-top: 20px;
  
  .card-header {
    display: flex;
    align-items: center;
    gap: 8px;
    font-weight: 600;
    font-size: 16px;
  }
  
  .server-info {
    .el-descriptions {
      margin-bottom: 15px;
    }
  }
}
</style>
