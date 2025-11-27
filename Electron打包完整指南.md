# Electron 打包完整解决方案

## ✅ 已修复的问题

### 1. **Vite 配置 - 资源路径问题**
`vite.config.ts` 添加了 `base: './'`，确保打包后使用相对路径。

### 2. **路由模式 - file:// 协议不支持**
`src/router/index.ts` 从 `createWebHistory()` 改为 `createWebHashHistory()`。

**原因**：
- `createWebHistory()` 需要服务器支持（HTML5 History API）
- Electron 使用 `file://` 协议加载本地文件
- Hash 模式 (`#/dashboard`) 在文件协议下正常工作

### 3. **调试支持**
`electron/main.js` 生产环境也开启开发者工具，便于排查问题。

---

## 📦 重新打包步骤

### 1. 清理旧文件
```powershell
# 删除旧的构建产物
Remove-Item -Recurse -Force dist, dist-electron -ErrorAction SilentlyContinue
```

### 2. 重新构建前端
```powershell
npm run build
```

验证 `dist` 目录是否生成：
- `dist/index.html`
- `dist/assets/` 文件夹

### 3. 打包 Electron
```powershell
npm run electron:build
```

打包完成后，exe 文件位于：`dist-electron/win-unpacked/Vue Admin.exe`

---

## 🧪 测试步骤

### 开发环境测试
```powershell
npm run electron:dev
```

应该能正常打开窗口并加载页面。

### 生产打包测试
1. 运行 `npm run electron:build`
2. 打开 `dist-electron/win-unpacked/Vue Admin.exe`
3. 查看是否正常显示页面
4. 检查开发者工具中的 Console 和 Network

---

## 🔍 如果仍然空白，排查步骤

### 1. 查看开发者工具 Console
- 是否有 JavaScript 错误？
- 是否有路由错误？

### 2. 查看 Network 标签
- 哪些资源加载失败（404）？
- 资源路径是否正确？

### 3. 检查路径日志
在 PowerShell 中运行 exe，查看终端输出：
```powershell
cd dist-electron/win-unpacked
./Vue Admin.exe
```

查找 "Loading index from:" 日志，确认路径是否正确。

### 4. 验证 dist 目录结构
```
dist/
├── index.html
├── assets/
│   ├── index-xxx.js
│   ├── index-xxx.css
│   └── ...
└── vite.svg
```

---

## 📝 关键配置对比

### ✅ 正确配置

**vite.config.ts:**
```typescript
export default defineConfig({
  base: './',  // ← 必须设置为相对路径
  // ...
})
```

**router/index.ts:**
```typescript
import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),  // ← 必须使用 Hash 模式
  routes
})
```

### ❌ 错误配置

```typescript
// 错误 1: base 未设置或设置为 '/'
base: '/'  // ✗ 导致资源路径错误

// 错误 2: 使用 History 模式
history: createWebHistory()  // ✗ file:// 协议不支持
```

---

## 🚀 快速验证命令

```powershell
# 一键清理 + 构建 + 打包
Remove-Item -Recurse -Force dist, dist-electron -ErrorAction SilentlyContinue; npm run build; npm run electron:build
```

---

## 💡 其他优化建议

### 1. 生产环境不显示开发者工具
修改 `electron/main.js`：
```javascript
} else {
  mainWindow.loadFile(path.join(__dirname, '../dist/index.html'))
  // 生产环境注释掉这行
  // mainWindow.webContents.openDevTools()
}
```

### 2. 添加错误处理
```javascript
mainWindow.webContents.on('did-fail-load', (event, errorCode, errorDescription) => {
  console.error('Failed to load:', errorCode, errorDescription)
})
```

### 3. 优化打包配置
`package.json` 中可以添加：
```json
"build": {
  "compression": "maximum",
  "removePackageScripts": true
}
```

---

## ✅ 验证清单

- [x] `vite.config.ts` 设置 `base: './'`
- [x] `router/index.ts` 使用 `createWebHashHistory()`
- [x] `electron/main.js` 添加调试日志
- [ ] 运行 `npm run build` 成功
- [ ] 运行 `npm run electron:build` 成功
- [ ] 打开 exe 文件能正常显示页面
- [ ] 登录功能正常
- [ ] 路由跳转正常

完成所有步骤后，Electron 打包应该能正常工作！
