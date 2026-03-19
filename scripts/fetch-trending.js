#!/usr/bin/env node
/**
 * fetch-trending.js
 * 爬取 GitHub Trending 页面，获取今日星数增长排名前三的项目
 * 输出为 Markdown 格式，保存到 trending/daily.md
 *
 * 依赖：node 内置 https / http 模块（无需额外安装）
 * 用法：node scripts/fetch-trending.js
 */

'use strict';

const https = require('https');
const fs = require('fs');
const path = require('path');

const TRENDING_URL = 'https://github.com/trending';
const OUTPUT_DIR = path.join(__dirname, '..', 'trending');
const OUTPUT_FILE = path.join(OUTPUT_DIR, 'daily.md');

/**
 * 发起 HTTPS GET 请求，返回响应体字符串
 * @param {string} url
 * @returns {Promise<string>}
 */
function fetchHTML(url) {
  return new Promise((resolve, reject) => {
    const options = {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (compatible; GitHubTrendingBot/1.0; +https://github.com/CMcsuser/vue3-electron-element-plus)',
        Accept: 'text/html,application/xhtml+xml',
      },
    };
    https
      .get(url, options, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          resolve(fetchHTML(res.headers.location));
          return;
        }
        if (res.statusCode !== 200) {
          reject(new Error(`HTTP ${res.statusCode} for ${url}`));
          return;
        }
        let data = '';
        res.setEncoding('utf8');
        res.on('data', (chunk) => (data += chunk));
        res.on('end', () => resolve(data));
        res.on('error', reject);
      })
      .on('error', reject);
  });
}

/**
 * 从原始 HTML 中解析 GitHub Trending 项目列表
 * GitHub trending 页面每个项目用 <article class="Box-row"> 包裹
 * @param {string} html
 * @returns {Array<{name:string, url:string, description:string, language:string, starsToday:number, totalStars:string}>}
 */
function parseTrending(html) {
  const projects = [];

  // 每个项目块
  const articleRegex = /<article\s[^>]*class="[^"]*Box-row[^"]*"[^>]*>([\s\S]*?)<\/article>/g;
  let articleMatch;

  while ((articleMatch = articleRegex.exec(html)) !== null) {
    const block = articleMatch[1];

    // 项目名称与链接：<h2 ...><a href="/owner/repo">
    const repoLinkMatch = block.match(/<h2[^>]*>[\s\S]*?<a\s[^>]*href="([^"]+)"[^>]*>/);
    if (!repoLinkMatch) continue;
    const repoPath = repoLinkMatch[1].trim(); // e.g. /owner/repo
    const repoURL = `https://github.com${repoPath}`;
    const name = repoPath.replace(/^\//, '').replace(/\s+/g, ''); // owner/repo

    // 描述：<p class="...col-9...">
    // 使用 [\s\S]*? 以匹配跨行的标签（如 <span\nclass="...">）
    const descMatch = block.match(/<p\s[^>]*col-9[^>]*>([\s\S]*?)<\/p>/);
    const rawDesc = descMatch ? descMatch[1].replace(/<[\s\S]*?>/g, '').trim() : '暂无描述';
    // 单次遍历解码常见 HTML 实体，避免链式替换导致的二次解码问题
    const HTML_ENTITIES = { '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"', '&#39;': "'", '&apos;': "'" };
    const description = rawDesc.replace(/&(?:amp|lt|gt|quot|#39|apos);/g, (m) => HTML_ENTITIES[m] || m);

    // 编程语言
    const langMatch = block.match(
      /itemprop="programmingLanguage"[^>]*>\s*([\s\S]*?)\s*<\/span>/
    );
    const language = langMatch ? langMatch[1].trim() : '未知';

    // 今日新增 stars
    // 匹配格式变体：如 "123 stars today" / "1 star today" / "Stars Today"（大小写无关）
    const starsTodayMatch = block.match(/([\d,]+)\s+stars?\s+today/i);
    const starsToday = starsTodayMatch
      ? parseInt(starsTodayMatch[1].replace(/,/g, ''), 10)
      : 0;

    // 总 star 数（用于展示）
    const totalMatch = block.match(
      /aria-label="star"[\s\S]*?>\s*([\d,]+)\s*<\/a>/
    );
    const totalStars = totalMatch ? totalMatch[1].trim() : '?';

    projects.push({ name, url: repoURL, description, language, starsToday, totalStars });
  }

  return projects;
}

/**
 * 将项目列表格式化为 Markdown 字符串
 * @param {Array} projects
 * @param {string} dateStr  如 2024-01-15
 * @returns {string}
 */
function buildMarkdown(projects, dateStr) {
  const top3 = projects
    .sort((a, b) => b.starsToday - a.starsToday)
    .slice(0, 3);

  const rows = top3
    .map(
      (p, i) =>
        `## 第 ${i + 1} 名：[${p.name}](${p.url})\n\n` +
        `- **今日新增 Stars**：⭐ ${p.starsToday.toLocaleString()}\n` +
        `- **总 Stars**：${p.totalStars}\n` +
        `- **编程语言**：${p.language}\n` +
        `- **描述**：${p.description}\n`
    )
    .join('\n---\n\n');

  return (
    `# 🔥 GitHub 今日 Star 增长 TOP 3\n\n` +
    `> 更新时间：${dateStr}\n\n` +
    `---\n\n` +
    rows +
    `\n---\n\n` +
    `> 数据来源：[GitHub Trending](https://github.com/trending)\n` +
    `> 订阅说明：查看 [SUBSCRIBE.md](./SUBSCRIBE.md)\n`
  );
}

async function main() {
  // toISOString() 返回 UTC 时间，与工作流调度时区（UTC 08:00）保持一致
  const today = new Date().toISOString().slice(0, 10);
  console.log(`[fetch-trending] 开始获取 GitHub Trending 数据 (${today})...`);

  let html;
  try {
    html = await fetchHTML(TRENDING_URL);
  } catch (err) {
    console.error('[fetch-trending] 获取页面失败：', err.message);
    process.exit(1);
  }

  const projects = parseTrending(html);
  if (projects.length === 0) {
    console.error('[fetch-trending] 未能解析到任何项目，可能页面结构已变更。');
    process.exit(1);
  }

  console.log(`[fetch-trending] 共解析到 ${projects.length} 个项目，取前三名...`);

  const markdown = buildMarkdown(projects, today);

  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }
  fs.writeFileSync(OUTPUT_FILE, markdown, 'utf8');
  console.log(`[fetch-trending] 已写入 ${OUTPUT_FILE}`);
  console.log(markdown);
}

main();
