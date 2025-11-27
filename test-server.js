/**
 * 快速测试服务器 - 用于本地测试获取IP功能
 * 运行: node test-server.js
 */

//const http = require('http');
//const os = require('os');
import http from 'http';
import os from "os";

// 获取服务器IP
function getServerIP() {
  const interfaces = os.networkInterfaces();
  for (const name in interfaces) {
    for (const iface of interfaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }
  return 'localhost';
}

// 创建HTTP服务器
const server = http.createServer((req, res) => {
  // 设置CORS头
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Content-Type', 'application/json');

  // 处理预检请求
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  // 路由处理
  if (req.url === '/api/server/ip') {
    const response = {
      code: 200,
      message: 'success',
      data: {
        ip: getServerIP(),
        hostname: os.hostname(),
        platform: os.platform(),
        timestamp: Date.now()
      }
    };
    res.writeHead(200);
    res.end(JSON.stringify(response));
  } 
  // 接收客户端信息
  else if (req.url === '/api/client/report' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      try {
        const clientInfo = JSON.parse(body);
        console.log('\n收到客户端信息:');
        console.log('-----------------------------------');
        console.log(`完整地址: ${clientInfo.fullUrl}`);
        console.log(`主机地址: ${clientInfo.host}`);
        console.log(`端口: ${clientInfo.port}`);
        console.log(`协议: ${clientInfo.protocol}`);
        console.log(`路径: ${clientInfo.pathname}`);
        console.log(`时间: ${new Date(clientInfo.timestamp).toLocaleString()}`);
        console.log('-----------------------------------\n');
        
        const response = {
          code: 200,
          message: '客户端信息接收成功',
          data: {
            received: true,
            serverTime: Date.now()
          }
        };
        res.writeHead(200);
        res.end(JSON.stringify(response));
      } catch (error) {
        console.error('解析客户端信息失败:', error);
        res.writeHead(400);
        res.end(JSON.stringify({ code: 400, message: 'Invalid JSON' }));
      }
    });
  }
  // 心跳接口
  else if (req.url === '/api/client/heartbeat' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      try {
        const data = JSON.parse(body);
        console.log(`[心跳] ${data.url} - ${new Date(data.timestamp).toLocaleTimeString()}`);
        
        res.writeHead(200);
        res.end(JSON.stringify({ code: 200, message: 'pong' }));
      } catch (error) {
        res.writeHead(400);
        res.end(JSON.stringify({ code: 400, message: 'Invalid JSON' }));
      }
    });
  }
  else {
    res.writeHead(404);
    res.end(JSON.stringify({ code: 404, message: 'Not Found' }));
  }
});

const PORT = 8080;
server.listen(PORT, () => {
  console.log('=================================');
  console.log('测试服务器已启动');
  console.log(`监听端口: ${PORT}`);
  console.log(`服务器IP: ${getServerIP()}`);
  console.log(`主机名: ${os.hostname()}`);
  console.log(`平台: ${os.platform()}`);
  console.log('=================================');
  console.log(`测试地址: http://localhost:${PORT}/api/server/ip`);
  console.log('按 Ctrl+C 停止服务器');
});
