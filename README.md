# vue3-electron-element-plus
打包electron

## 解决 VS Code Copilot 显示 "Language model unavailable" 问题

### 问题描述

在使用 VS Code Copilot 时，可能会遇到 "Language model unavailable"（语言模型不可用）的提示，导致代码补全和建议功能无法正常工作。

### 解决方案

#### 1. 检查 GitHub Copilot 订阅

确保你拥有有效的 [GitHub Copilot 订阅](https://github.com/features/copilot)。Copilot 需要有效的订阅才能正常工作。

#### 2. 启用 Copilot 的语言支持（推荐）

本项目已在 `.vscode/settings.json` 中配置了 Copilot 所需的语言支持。如果你克隆了本项目，该配置会自动生效。

如需手动配置，请在 VS Code 的 `settings.json` 中添加以下内容（按 `Ctrl+Shift+P`，搜索 "Open User Settings (JSON)"）：

```json
{
  "github.copilot.enable": {
    "*": true,
    "vue": true,
    "javascript": true,
    "typescript": true
  }
}
```

#### 3. 重新登录 GitHub 账号

1. 按 `Ctrl+Shift+P` 打开命令面板
2. 搜索并执行 `GitHub Copilot: Sign Out`
3. 再次搜索并执行 `GitHub Copilot: Sign In`
4. 按提示完成授权

#### 4. 更新 VS Code 和 Copilot 插件

确保 VS Code 和 GitHub Copilot 扩展均为最新版本：

1. 按 `Ctrl+Shift+X` 打开扩展面板
2. 搜索 "GitHub Copilot"
3. 如有更新，点击更新按钮

#### 5. 检查网络连接

如果使用了代理或防火墙，确保 VS Code 可以访问以下域名：

- `api.github.com`
- `copilot-proxy.githubusercontent.com`

可以在 VS Code 的 `settings.json` 中配置代理：

```json
{
  "http.proxy": "http://your-proxy-server:port"
}
```

#### 6. 重启 VS Code

完成以上步骤后，重启 VS Code 以使配置生效。

### 参考资料

- [GitHub Copilot 官方文档](https://docs.github.com/zh/copilot)
- [VS Code Copilot 扩展](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot)

