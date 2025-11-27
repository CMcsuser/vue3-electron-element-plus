import { post } from '@/utils/request'
import type { ClientAccessInfo } from '@/utils/clientInfo'

/**
 * 将客户端访问信息发送给后端
 * @param clientInfo 客户端访问信息
 */
export function reportClientInfo(clientInfo: ClientAccessInfo) {
  return post('/client/report', clientInfo)
}

/**
 * 发送心跳信息（包含客户端地址）
 */
export function sendHeartbeat() {
  return post('/client/heartbeat', {
    url: window.location.origin,
    timestamp: Date.now()
  })
}
