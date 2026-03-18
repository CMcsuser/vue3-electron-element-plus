# vue3-electron-element-plus

基于 Vue 3 + Electron + Element Plus 构建的桌面应用模板。

## 分支管理规范

本项目采用以下分支策略：

| 分支 | 用途 |
|------|------|
| `master` | 主干分支，维护稳定版本 |
| `release` | 发布分支，用于生产环境迭代 |
| `feature/*` | 功能分支，从 `master` 或 `release` 拉取 |

详细的分支合并操作指南，请参阅 [GIT-WORKFLOW.md](./GIT-WORKFLOW.md)。

---

## 常见问题：老分支合并到 release 代码没合并过去

**现象**：分支 `a` 从半年前的 `master` 拉出来，现在将 `a` 合并到最新的 `release` 分支，发现代码没有合并进去。

**根本原因**：Git 三路合并（three-way merge）以"公共祖先"为基准，如果 `release` 已经包含了 `a` 上的所有更改的演进版本，Git 会认为这些改动"已经合并"，不会再次引入。

**解决方案**：使用 `git rebase` 或 `git cherry-pick` 将 `a` 上的变更显式带入 `release`，详见 [GIT-WORKFLOW.md](./GIT-WORKFLOW.md)。
