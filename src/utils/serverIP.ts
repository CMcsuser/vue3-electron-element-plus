/**
 * 获取服务器 IP 地址（浏览器环境）
 */

// 方式1: 通过后端 API 获取
export async function getServerIPFromAPI(): Promise<string> {
  try {
    const response = await fetch('/api/server/ip')
    const data = await response.json()
    return data.ip || 'unknown'
  } catch (error) {
    console.error('Failed to get server IP from API:', error)
    return 'unknown'
  }
}

// 方式2: 通过浏览器获取客户端信息
export function getClientInfo() {
  return {
    // 当前访问的域名/IP
    hostname: window.location.hostname,
    // 当前协议
    protocol: window.location.protocol,
    // 完整 URL
    origin: window.location.origin,
    // 端口
    port: window.location.port,
    // User Agent
    userAgent: navigator.userAgent
  }
}

// 方式3: 通过 WebRTC 获取本地 IP（客户端 IP）
export function getLocalIP(): Promise<string> {
  return new Promise((resolve) => {
    const RTCPeerConnection = window.RTCPeerConnection || 
                              (window as any).mozRTCPeerConnection || 
                              (window as any).webkitRTCPeerConnection

    if (!RTCPeerConnection) {
      resolve('unknown')
      return
    }

    const pc = new RTCPeerConnection({ iceServers: [] })
    const noop = () => {}
    
    pc.createDataChannel('')
    pc.createOffer()
      .then((offer) => pc.setLocalDescription(offer))
      .catch(noop)

    pc.onicecandidate = (ice) => {
      if (!ice || !ice.candidate || !ice.candidate.candidate) {
        return
      }

      const ipRegex = /([0-9]{1,3}(\.[0-9]{1,3}){3})/
      const match = ipRegex.exec(ice.candidate.candidate)
      
      if (match) {
        pc.close()
        resolve(match[1])
      }
    }

    // 超时处理
    setTimeout(() => {
      pc.close()
      resolve('unknown')
    }, 3000)
  })
}
