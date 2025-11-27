<template>
  <el-card class="client-info-card" shadow="hover">
    <template #header>
      <div class="card-header">
        <span>客户端访问信息</span>
        <el-button 
          type="primary" 
          size="small" 
          :loading="sending"
          @click="sendToBackend"
        >
          发送给后端
        </el-button>
      </div>
    </template>

    <el-descriptions :column="1" border>
      <el-descriptions-item label="完整地址">
        <el-tag>{{ clientInfo.fullUrl }}</el-tag>
        <el-button 
          link 
          type="primary" 
          size="small"
          @click="copyToClipboard(clientInfo.fullUrl)"
        >
          复制
        </el-button>
      </el-descriptions-item>
      
      <el-descriptions-item label="主机地址">
        {{ clientInfo.host }}
      </el-descriptions-item>
      
      <el-descriptions-item label="端口">
        {{ clientInfo.port }}
      </el-descriptions-item>
      
      <el-descriptions-item label="协议">
        {{ clientInfo.protocol }}
      </el-descriptions-item>
      
      <el-descriptions-item label="当前路径">
        {{ clientInfo.pathname }}
      </el-descriptions-item>
    </el-descriptions>

    <div class="actions" style="margin-top: 16px;">
      <el-space>
        <el-button size="small" @click="refreshInfo">
          <el-icon><Refresh /></el-icon>
          刷新信息
        </el-button>
        <el-button size="small" type="success" @click="copyAllInfo">
          <el-icon><CopyDocument /></el-icon>
          复制全部
        </el-button>
      </el-space>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { Refresh, CopyDocument } from '@element-plus/icons-vue'
import { getClientAccessInfo, type ClientAccessInfo } from '@/utils/clientInfo'
import { reportClientInfo } from '@/api/client'

const clientInfo = ref<ClientAccessInfo>({
  fullUrl: '',
  host: '',
  port: '',
  protocol: '',
  pathname: '',
  userAgent: '',
  timestamp: 0
})

const sending = ref(false)

// 获取客户端信息
const refreshInfo = () => {
  clientInfo.value = getClientAccessInfo()
  ElMessage.success('信息已刷新')
}

// 发送给后端
const sendToBackend = async () => {
  try {
    sending.value = true
    await reportClientInfo(clientInfo.value)
    ElMessage.success('客户端信息已发送给后端')
  } catch (error) {
    console.error('发送失败:', error)
    ElMessage.error('发送失败，请查看控制台')
  } finally {
    sending.value = false
  }
}

// 复制到剪贴板
const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text)
    ElMessage.success('已复制到剪贴板')
  } catch (error) {
    console.error('复制失败:', error)
    ElMessage.error('复制失败')
  }
}

// 复制全部信息
const copyAllInfo = async () => {
  const info = JSON.stringify(clientInfo.value, null, 2)
  await copyToClipboard(info)
}

onMounted(() => {
  refreshInfo()
})
</script>

<style scoped lang="scss">
.client-info-card {
  margin-bottom: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
