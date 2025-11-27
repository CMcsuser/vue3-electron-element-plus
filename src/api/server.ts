import { get } from '@/utils/request'

// 定义服务器信息接口
export interface ServerInfo {
  ip: string
  hostname: string
  platform: string
  timestamp: number
}

/**
 * 获取服务器 IP 地址
 */
export function getServerIP() {
  return get<ServerInfo>('/server/ip')
}

/**
 * 获取服务器详细信息
 */
export function getServerInfo() {
  return get<ServerInfo>('/server/info')
}
