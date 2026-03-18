# Git 分支合并工作流指南

## 问题描述

**场景**：

```
(6个月前)                      (现在)
master ──A──B──C──────────────── D──E──F  (master 继续向前)
              \                   \
               a (feature branch)  release (最新迭代过的发布分支)
               └── X──Y──Z (你在 a 上的开发内容)
```

- 分支 `a` 在 6 个月前从 `master` 的 commit `C` 处拉出
- `release` 分支是近期从 `master` 迭代出来的，包含 `D`、`E`、`F` 等新提交
- 执行 `git merge a` 后，发现 `a` 上的代码没有出现在 `release` 中

---

## 根本原因

Git 的三路合并（three-way merge）会找到两个分支的**公共祖先**（merge base）：

```
merge-base(a, release) = C
```

Git 将比较：
1. `C → a` 之间的变更（即 X、Y、Z）
2. `C → release` 之间的变更（即 D、E、F 以及 release 上的其他提交）

如果 `release` 上的提交已经对相同的文件做了修改，Git 会出现以下两种情况之一：

- **合并冲突**：两边都改了同一行，Git 标记冲突，等待手动解决。解决时如果选择了 `release` 的版本，`a` 的代码就被丢弃了。
- **`a` 的改动被 `release` 覆盖**：`release` 对同一文件的后续修改被认为是"更新"的版本，`a` 的改动在 diff 层面被消除。

此外，如果 `a` 上的某些 commit 之前已经通过其他方式（cherry-pick、rebase）进入过 `master` 或 `release`，Git 会识别出它们"已被合并"，不会重复引入。

---

## 解决方案

### 方案一：Rebase 后再合并（推荐）

将 `a` 变基到 `release` 的最新 HEAD，使 `a` 上的提交建立在 `release` 之上，然后再合并。

```bash
# 1. 切换到 a 分支
git checkout a

# 2. 将 a rebase 到 release
git rebase release

# 如果有冲突，按提示逐个解决后执行：
# git add <resolved-file>
# git rebase --continue

# 3. 切换到 release 分支
git checkout release

# 4. 将 a 合并进 release（此时可以 fast-forward）
git merge a

# 5. 推送 release 到远端
git push origin release
```

> ⚠️ 注意：`rebase` 会重写 `a` 的 commit 历史。如果 `a` 已经推送到远端，需要使用 `git push --force-with-lease origin a` 强制推送（谨慎操作，确认没有其他人在使用该分支）。

---

### 方案二：Cherry-pick 指定提交

如果只想将 `a` 上的部分提交引入 `release`，使用 `cherry-pick`：

```bash
# 1. 查看 a 上相对于 release 尚未包含的提交列表
git log release..a --oneline

# 输出示例：
# abc1234 feat: 新增用户模块
# def5678 fix: 修复登录问题
# ghi9012 chore: 更新依赖

# 2. 切换到 release
git checkout release

# 3. Cherry-pick 单个提交
git cherry-pick abc1234

# 或者 cherry-pick 一个范围（不含起点，含终点）
# 先找到 a 与 release 的公共祖先
git merge-base release a
# 假设输出 <base-commit>

git cherry-pick <base-commit>..a

# 4. 推送
git push origin release
```

---

### 方案三：Diff + Patch（备用方案）

如果以上方案因历史复杂而难以操作，可以将 `a` 相对于 `release` 的差异导出为 patch 手动应用：

```bash
# 1. 生成 a 相对于 release 的 diff
git diff release..a > /tmp/branch-a-changes.patch

# 2. 切换到 release
git checkout release

# 3. 应用 patch（尝试自动应用，失败时手动处理冲突）
git apply /tmp/branch-a-changes.patch

# 或者使用 --reject 标记无法自动应用的部分
git apply --reject /tmp/branch-a-changes.patch

# 4. 手动解决 .rej 文件中的冲突后，提交
git add .
git commit -m "merge: 将 branch-a 的变更应用到 release"
git push origin release
```

---

## 操作前的诊断步骤

在执行上述方案前，先通过以下命令诊断实际情况：

```bash
# 查看 a 和 release 的公共祖先
git merge-base release a

# 查看 a 上有哪些提交尚未进入 release
git log release..a --oneline

# 查看 a 相对于 release 的文件差异
git diff release..a --stat

# 如果上述命令输出为空，说明 a 的所有提交已经包含在 release 中
# 此时使用方案三（Diff）来查看实际内容差异
git diff release a
```

---

## 最佳实践

1. **保持分支短命**：功能分支建议尽量在合理周期内完成并合并，避免长期存在；若功能较复杂需要较长时间，请遵循第 2 条定期同步主干。
2. **定期同步主干**：长期存在的功能分支应定期执行 `git rebase master` 或 `git merge master` 保持同步。
3. **合并前先 rebase**：在将功能分支合并到 `release` 前，先 rebase 到最新的 `release`，减少冲突。
4. **避免直接在 master/release 上开发**：所有功能开发在 `feature/*` 分支上进行。

---

## 分支策略图

```
master:   ──●──●──●──────────────────────●──●──●──▶
               │                          │
               │ (6个月前)                 │ (近期)
               ▼                          ▼
feature/a: ──●──●──●──(你的新功能)        release: ──●──●──●──(最新迭代)──▶

正确做法：将 feature/a rebase 到 release HEAD，再 merge
```
