# Kai Zheng · AI4Science Blog

个人技术博客，部署在 GitHub Pages：<https://zhengkai15.github.io>

内容以 **AI for Science** 为主线，覆盖气象大模型、多模态生成、LLM 数据工程与工程实践。

## 技术栈

| 组件 | 说明 |
|---|---|
| [Hugo](https://gohugo.io) | 静态站点生成器（extended 版，v0.122+） |
| [PaperMod](https://github.com/adityatelange/hugo-PaperMod) | 主题（v8.0，直接内置在 `themes/papermod/`） |
| GitHub Pages + Actions | 推送 `master` 自动构建部署 |

零 Node/Python 依赖，构建仅需一个 Hugo 二进制。

## 快速开始

### 1. 安装 Hugo

> 需要 **extended** 版本（站点构建依赖 SCSS/Sass 处理，PaperMod 用 `hugo.IsExtended` 判断）。

macOS：

```bash
brew install hugo   # 默认即 extended
```

Linux / Windows：从 <https://github.com/gohugoio/hugo/releases> 下载 `hugo_extended_*` 版本。

验证：

```bash
hugo version   # 应包含 "extended"
```

### 2. 克隆并启动本地预览

```bash
git clone git@github.com:zhengkai15/zhengkai15.github.io.git
cd zhengkai15.github.io

# 本地预览（http://localhost:1313，改文件自动刷新）
hugo server -D   # -D 同时渲染 draft 文章，便于预览未发布内容
```

### 3. 构建静态文件

```bash
hugo --gc --minify --baseURL "https://zhengkai15.github.io/"
# 产物输出到 public/（已被 .gitignore 忽略，无需提交）
```

## 写一篇文章

```bash
hugo new post/my-first-post.md
```

会自动套用 `archetypes/default.md` 模板。每篇文章的 frontmatter 必须包含：

```yaml
---
title: "文章标题"
date: 2026-08-05T00:00:00+08:00
draft: true                # true = 草稿不发布；发布时改 false
description: "1-2 句摘要，会显示在列表页和搜索引擎"
tags: ["Diffusion", "LoRA"]      # 细粒度技术词，可多个
categories: ["AI4Science"]       # 五选一，见下
author: "kaizheng"
---
```

**分类规范（五类，categories 必须五选一）：**

| 分类 | 内容方向 | 示例 |
|---|---|---|
| `AI4Science` | 气象大模型、数据同化、气候 AI | 《数据驱动天气预报的演进》 |
| `LLM-Data` | LLM 数据飞轮、代码智能数据 | 《LLM 数据飞轮：采集/清洗/指标设计》 |
| `Multimodal` | CLIP、视频预测、Diffusion、生成模型 | 《CLIP 图文检索训练实录》 |
| `Engineering` | 推理部署、分布式训练、踩坑记录 | 《vLLM 部署踩坑》 |
| `Paper-Notes` | 论文精读 | 《Flow Matching 精读》 |

**写作建议：**
- 深度优先：一篇能讲透一个问题的文章，胜过三篇泛泛而谈
- 中文为主，精读笔记可用英文
- 用真实经历和踩坑说话，避免 AI 味浓的排比和空洞总结

## 部署

推送 `master` 分支即自动触发 GitHub Actions（`.github/workflows/hugo.yml`）：

1. 安装 Hugo extended
2. `hugo --gc --minify` 构建到 `public/`
3. `actions/upload-pages-artifact@v3` 上传产物
4. `actions/deploy-pages@v4` 部署到 GitHub Pages

```bash
git add .
git commit -m "post: 新增 XXX"
git push origin master
```

> 注意：**不要手动提交 `public/`**。它由 CI 构建生成，已被 `.gitignore` 忽略。站点源码在 `content/`。

## 目录结构

```
.
├── archetypes/          # 文章模板（hugo new 时套用）
├── content/
│   ├── about.md         # 关于页
│   └── post/            # 博客文章（markdown）
├── themes/papermod/     # PaperMod 主题（v8.0，直接 vendored）
├── config.toml          # 站点配置（标题、菜单、Profile 模式、社交链接）
├── .github/workflows/   # CI：自动构建部署
└── public/              # 构建产物（忽略，勿提交）
```

## 站点配置速查（config.toml）

- 首页 Profile 模式（头像/副标题/按钮）：`[params.profileMode]`
- 社交链接：`[[params.socialIcons]]`（github / email / twitter …）
- 导航菜单：`[[menu.main]]`
- 亮色/暗色自动切换：`defaultTheme = "auto"`

## 常见问题

**Q: 改了文章但线上没更新？**
确认推的是 `master` 分支，然后看 GitHub → Actions 页面是否有绿色对勾。若红色，点进去看失败日志。

**Q: 本地预览看不到草稿文章？**
`hugo server` 默认不渲染 `draft: true` 的文章，加 `-D` 参数。

**Q: 换主题后文章格式乱了？**
PaperMod 使用标准 markdown 链接语法 `[text](url)`。若从 Even 等主题迁移，注意旧主题特有的 `[[text](url)]` wiki 语法不会被渲染。

**Q: 想改站点标题/头像/简介？**
全部在 `config.toml` 里，改完推 master 即可。

## License

© Kai Zheng. 文章内容与站点源码保留所有权利；主题 [PaperMod](https://github.com/adityatelange/hugo-PaperMod) 遵循其自身 MIT License。
