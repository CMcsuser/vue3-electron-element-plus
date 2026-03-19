# 📬 订阅说明

本文档介绍如何订阅每日 GitHub Star 增长 TOP 3 更新通知。

---

## 方式一：Watch 本仓库（推荐）

1. 打开仓库主页：<https://github.com/CMcsuser/vue3-electron-element-plus>
2. 点击右上角 **Watch** 按钮
3. 选择 **"All Activity"** 或 **"Custom → Commits"**
4. 每次 `trending/daily.md` 更新时，GitHub 会向你的邮箱发送通知

> 💡 如果只想关注 trending 更新，建议选择 **Custom**，仅勾选 **Commits**，避免收到过多通知。

---

## 方式二：RSS 订阅 Commits

GitHub 为每个分支提供了 Atom/RSS 订阅地址：

```
https://github.com/CMcsuser/vue3-electron-element-plus/commits/master.atom
```

将此地址添加到你的 RSS 阅读器（如 **Feedly**、**Inoreader**、**NetNewsWire** 等），
每次有新提交（包括 trending 数据更新）都会出现在订阅列表中。

---

## 方式三：RSS 订阅 GitHub Releases

如果本仓库发布了 Release，可通过以下地址订阅：

```
https://github.com/CMcsuser/vue3-electron-element-plus/releases.atom
```

---

## 方式四：第三方工具推荐

| 工具 | 说明 | 链接 |
|------|------|------|
| **GitHub Trending RSS** | 直接订阅 GitHub Trending 的 RSS 源，支持按语言、日/周/月筛选 | <https://mshibanami.github.io/GitHubTrendingRSS/> |
| **Gitstar Ranking** | 查看 GitHub 项目和用户的历史 star 趋势排名 | <https://gitstar-ranking.com/> |
| **GitHub Trending（非官方 API）** | 通过 API 获取 trending 数据，方便集成到自己的应用 | <https://github.com/huchenme/huchenme> |
| **gtrend** | 命令行工具，直接在终端查看 GitHub Trending | `npm install -g gtrend` |

---

## 方式五：手动运行脚本

如果你 Clone 了本仓库，可以在本地手动执行数据获取脚本：

```bash
# 克隆仓库
git clone https://github.com/CMcsuser/vue3-electron-element-plus.git
cd vue3-electron-element-plus

# 运行脚本（仅需 Node.js，无需安装额外依赖）
node scripts/fetch-trending.js

# 查看结果
cat trending/daily.md
```

---

## 📅 自动更新时间

GitHub Actions 每天 **UTC 08:00**（北京时间 16:00）自动运行，
结果写入 [`trending/daily.md`](./daily.md)。

---

> 返回 [README.md](./README.md)
