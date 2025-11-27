/**
 * 获取客户端访问信息（用于传给后端）
 */

/**
 * 获取完整的客户端访问地址
 * @returns 完整的访问URL，例如: http://192.168.1.100:5173
 */
export function getClientAccessUrl(): string {
  return window.location.origin
}

/**
 * 获取客户端访问的主机地址（不含端口）
 * @returns 主机地址，例如: 192.168.1.100 或 localhost
 */
export function getClientHost(): string {
  return window.location.hostname
}

/**
 * 获取客户端访问的端口
 * @returns 端口号，例如: 5173 或 80
 */
export function getClientPort(): string {
  return window.location.port || (window.location.protocol === 'https:' ? '443' : '80')
}

/**
 * 获取完整的客户端信息对象（用于传给后端）
 */
export interface ClientAccessInfo {
  // 完整访问地址: http://192.168.1.100:5173
  fullUrl: string
  // 主机地址: 192.168.1.100
  host: string
  // 端口: 5173
  port: string
  // 协议: http 或 https
  protocol: string
  // 当前页面路径: /dashboard
  pathname: string
  // User Agent
  userAgent: string
  // 时间戳
  timestamp: number
}

/**
 * 获取完整的客户端访问信息
 */
export function getClientAccessInfo(): ClientAccessInfo {
  return {
    fullUrl: window.location.origin,
    host: window.location.hostname,
    port: window.location.port || (window.location.protocol === 'https:' ? '443' : '80'),
    protocol: window.location.protocol.replace(':', ''),
    pathname: window.location.pathname,
    userAgent: navigator.userAgent,
    timestamp: Date.now()
  }
}
