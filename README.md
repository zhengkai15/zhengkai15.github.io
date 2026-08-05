# Kai Zheng · AI4Science Blog

个人技术博客，部署在 GitHub Pages：<https://zhengkai15.github.io>

内容以 **AI for Science** 为主线，覆盖气象大模型、多模态生成、LLM 数据工程与工程实践。

> **当前状态**：线上站点（`master` 分支）仍运行 Hugo + PaperMod。本仓库的 Astro 重构版本在 **`migrate/astro` 分支**开发测试中，**未上线**。下面的文档描述的是 Astro 版。

## 技术栈

| 组件 | 说明 |
|---|---|
| [Astro](https://astro.build) | 静态站点生成器（v7，Islands 架构，默认零 JS） |
| [Tailwind CSS](https://tailwindcss.com) | 样式（v4，`@tailwindcss/vite` 集成） |
| [astro-expressive-code](https://expressive-code.com) | 代码高亮 + 复制按钮 + 行号 |
| [Pagefind](https://pagefind.app) | 客户端静态搜索 |
| @astrojs/mdx / @astrojs/rss / @astrojs/sitemap | MDX / RSS / 站点地图 |
| pnpm + GitHub Pages + Actions | 包管理、自动构建部署 |

## 快速开始

> 需要 Node.js 20+ 和 pnpm。pnpm 通过 `npm i -g pnpm` 或 corepack 安装。

```bash
# 1. 安装依赖（registry 已配置 npmmirror / 清华镜像）
pnpm install

# 2. 本地预览（http://localhost:4321，改文件自动刷新）
pnpm dev        # 草稿（draft: true）文章也会显示

# 3. 构建静态文件
pnpm build      # 产物输出到 dist/，草稿自动排除
pnpm run search # 生成 Pagefind 搜索索引（构建后执行）
```

## 写一篇文章

```bash
# 复制模板（模板在仓库根，不要直接编辑）
cp post-template.md src/content/post/我的文章.md
```

文件名即 URL slug（小写 + 连字符），例如 `src/content/post/diffusion-notes.md` → `/post/diffusion-notes/`。

### frontmatter 必填字段

```yaml
---
title: "文章标题"
date: 2026-08-05T00:00:00+08:00
lastmod: 2026-08-05T00:00:00+08:00
draft: true                # true = 草稿：本地可见、构建不发布；发布时改 false
description: "1-2 句摘要，显示在列表页和搜索引擎"
tags: ["Diffusion", "LoRA"]      # 细粒度技术词，可多个
categories: ["AI4Science"]       # 五选一，见下
author: "kaizheng"
---
```

> **防呆**：frontmatter 由 zod schema 强校验——分类写错、缺 description、date 格式不对，构建会直接报错，不会带病上线。

**分类规范（五类，categories 必须五选一）：**

| 分类 | 内容方向 | 示例 |
|---|---|---|
| `AI4Science` | 气象大模型、数据同化、气候 AI | 《数据驱动天气预报的演进》 |
| `LLM-Data` | LLM 数据飞轮、代码智能数据 | 《LLM 数据飞轮：采集/清洗/指标设计》 |
| `Multimodal` | CLIP、视频预测、Diffusion、生成模型 | 《CLIP 图文检索训练实录》 |
| `Engineering` | 推理部署、分布式训练、踩坑记录 | 《vLLM 部署踩坑》 |
| `Paper-Notes` | 论文精读 | 《Flow Matching 精读》 |

### 写作注意

- **图片**：放到 `src/assets/`，正文用相对路径引用 `![](../../assets/图片.png)`，Astro 会自动压缩 + 生成 webp
- **代码块**：自动带复制按钮、行号、语言标签，无需额外配置
- **交互组件**（如 Diffusion 采样 demo）：文件后缀用 `.mdx`，可直接在文内写 React/Vue 组件（`client:load`）
- **写作建议**：深度优先——一篇讲透一个问题，胜过三篇泛泛而谈；用真实经历和踩坑说话

### 发布流程

```bash
pnpm dev          # 本地预览，确认无误
# 把 frontmatter 的 draft 改成 false
git add .
git commit -m "post: 新增 XXX"
git push origin migrate/astro
```

## 部署

推送 `master` 分支自动触发 GitHub Actions（`.github/workflows/astro.yml`）：

1. 安装 pnpm + Node 22
2. `pnpm install --frozen-lockfile`
3. `pnpm build` 构建到 `dist/`
4. `pnpm run search` 生成 Pagefind 搜索索引
5. `actions/upload-pages-artifact@v3` 上传产物
6. `actions/deploy-pages@v4` 部署到 GitHub Pages

> 注意：CI 只监听 `master` 分支。当前 Astro 版在 `migrate/astro` 分支开发，推送该分支**不会**触发部署。上线前需将 `migrate/astro` 合入 `master` 并删除 Hugo 版文件。

## 目录结构

```
.
├── src/
│   ├── content/
│   │   └── post/          # 博客文章（markdown / mdx）
│   ├── content.config.ts  # Content Collections schema（分类 enum + zod 校验）
│   ├── layouts/           # BaseLayout / PostLayout / ListLayout / PageLayout
│   ├── components/        # 页面组件
│   ├── pages/             # 路由：首页 / post / categories / tags / about / rss / 404
│   ├── lib/posts.ts       # getPublishedPosts()：dev 含草稿，build 只发布
│   ├── assets/            # 图片资源（构建时优化）
│   └── styles/global.css  # 全局样式 + 暗色主题变量
├── public/                # 静态资源（favicon / robots.txt）
├── astro.config.mjs       # Astro 配置
├── pnpm-workspace.yaml    # pnpm 11 配置（allowBuilds / verifyDepsBeforeRun）
├── post-template.md       # 新文章模板（复制到 src/content/post/ 使用）
├── .github/workflows/astro.yml  # CI：自动构建部署
└── dist/                  # 构建产物（gitignore，勿提交）
```

## 常见问题

**Q: 改了文章但线上没更新？**
确认推的是 `master` 分支（CI 只监听 master），然后看 GitHub → Actions 页面是否有绿色对勾。Astro 版上线前请先合入 master。

**Q: 本地预览看不到草稿文章？**
`pnpm dev` 默认会显示 `draft: true` 的文章（`src/lib/posts.ts` 里 dev 模式返回全部）。构建 `pnpm build` 时草稿自动排除。

**Q: 构建报 `InvalidOption` / schema 错误？**
frontmatter 的 `categories` 不在五类枚举里，或必填字段缺失。检查 `src/content.config.ts` 里的 schema 定义。

**Q: 搜索不可用？**
搜索索引是构建后生成的（`pnpm run search`）。本地 `pnpm dev` 下搜索索引未生成，属正常现象；`pnpm build` + `pnpm run search` 后可用。

**Q: 想改站点标题/头像/简介？**
首页 Profile 在 `src/pages/index.astro`，导航/主题在 `src/layouts/BaseLayout.astro`，改完提交即可。

## License

© Kai Zheng. 文章内容与站点源码保留所有权利。
