# Vue Admin 后台管理系统

基于 Vue3 + Vite + Element Plus + Axios + Pinia + ECharts5 的现代化后台管理系统。

## 技术栈

- **框架**: Vue 3.4+ (Composition API + `<script setup>`)
- **构建工具**: Vite 5.0+
- **类型检查**: TypeScript 5.3+
- **UI 组件库**: Element Plus 2.5+
- **图标**: @element-plus/icons-vue
- **状态管理**: Pinia 2.1+
- **路由**: Vue Router 4.2+
- **HTTP 请求**: Axios 1.6+
- **图表库**: ECharts 5.4+

## 功能特性

✅ **用户认证**
- 登录页面
- 路由守卫（未登录自动跳转）
- Token 管理

✅ **布局系统**
- 顶部导航栏布局
- 响应式设计

✅ **页面模块**
- 📊 仪表盘 - 数据统计展示
- 📈 图表展示 - ECharts 多种图表类型
- 📋 表格管理 - 数据表格 + 分页 + 搜索
- 📝 表单页面 - 完整的表单验证

✅ **核心功能**
- Pinia 状态管理
- Axios 请求拦截器
- TypeScript 类型支持
- 路径别名配置 (@/)

## 快速开始

### 安装依赖

\`\`\`bash
npm install
\`\`\`

### 启动开发服务器

\`\`\`bash
npm run dev
\`\`\`

访问 http://localhost:3000

### 构建生产版本

\`\`\`bash
npm run build
\`\`\`

### 预览生产构建

\`\`\`bash
npm run preview
\`\`\`

## 登录信息

- **用户名**: admin
- **密码**: 123456

## 项目结构

\`\`\`
vue-admin/
├── public/              # 静态资源
├── src/
│   ├── api/            # API 接口
│   ├── layout/         # 布局组件
│   ├── router/         # 路由配置
│   ├── store/          # Pinia 状态管理
│   ├── utils/          # 工具函数
│   ├── views/          # 页面组件
│   │   ├── dashboard/  # 仪表盘
│   │   ├── charts/     # 图表页面
│   │   ├── table/      # 表格页面
│   │   ├── form/       # 表单页面
│   │   └── login/      # 登录页面
│   ├── App.vue         # 根组件
│   ├── main.ts         # 入口文件
│   └── vite-env.d.ts   # 类型声明
├── .env                # 环境变量
├── index.html          # HTML 模板
├── vite.config.ts      # Vite 配置
├── tsconfig.json       # TypeScript 配置
└── package.json        # 项目依赖
\`\`\`

## 浏览器支持

现代浏览器和 IE11+（需要 polyfills）

## 开发建议

建议使用 Node.js 18+ 版本以获得最佳体验。

## License

MIT
