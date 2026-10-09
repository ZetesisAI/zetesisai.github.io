# Zetesis AI 官方网站 (zetesisai.github.io)

基于 [Astro](https://astro.build/) 与 [Tailwind CSS](https://tailwindcss.com/) 构建的现代化、高性能项目官网架构，支持 GitHub Pages 全自动构建与部署。

---

## 🌟 核心特性与架构

- ⚡ **极速构建与静态生成 (SSG)**: 基于 Astro 核心构建，支持零 JS 默认运行时与超高加载性能。
- 🎨 **现代科技美学**: 深度适配暗色主题、磨砂玻璃态（Glassmorphism）与渐变流光视觉。
- 📁 **类型安全的内容集合 (Content Collections)**:
  - `src/content/projects/`: 项目矩阵，支持分类、状态（Active/Beta/Research）及链接配置。
  - `src/content/blog/`: 动态与研究博客，支持 Markdown/MDX 渲染、标签归类与日期排序。
- 🔍 **SEO & 社交分享增强**: 全局预设 OpenGraph、Twitter Cards、Canonical URL，集成 `@astrojs/sitemap` 自动生成站点地图与 `robots.txt`。
- 🚀 **GitHub Actions 自动化部署**: 内置 `.github/workflows/deploy.yml`，推送到 `main` 分支自动完成构建并发布至 GitHub Pages。

---

## 📂 目录结构

```text
zetesisai.github.io/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions 自动化部署配置
├── public/
│   ├── favicon.svg             # 网站 SVG 图标
│   └── robots.txt              # 爬虫协议与 Sitemap 指向
├── src/
│   ├── components/             # 组件库
│   │   ├── icons/              # SVG 图标组件 (如 Github)
│   │   ├── BlogCard.astro      # 博客卡片组件
│   │   ├── Features.astro      # 核心技术支柱组件
│   │   ├── Footer.astro        # 页脚
│   │   ├── Header.astro        # 导航栏（含移动端适配）
│   │   ├── Hero.astro          # 首页大图与动效终端展示
│   │   └── ProjectCard.astro   # 项目卡片组件
│   ├── content/                # 结构化 Markdown 内容
│   │   ├── blog/               # 文章与更新日志
│   │   └── projects/           # 开源项目介绍
│   ├── content.config.ts       # 内容集合 Schema 校验定义
│   ├── layouts/
│   │   └── Layout.astro        # 全局基础布局 (SEO/Meta/布局结构)
│   ├── pages/                  # 路由页面
│   │   ├── 404.astro           # 404 页面
│   │   ├── about.astro         # 关于团队与愿景
│   │   ├── index.astro         # 官网首页
│   │   ├── projects.astro      # 项目矩阵页面
│   │   └── blog/
│   │       ├── index.astro     # 博客列表
│   │       └── [...slug].astro # 动态文章详情页
│   └── styles/
│       └── global.css          # 全局样式与 Tailwind 指令
├── astro.config.mjs            # Astro 配置文件 (站点 URL 与插件配置)
├── package.json
└── tsconfig.json
```

---

## 🛠️ 本地开发

### 1. 安装依赖

```bash
npm install
```

### 2. 启动开发服务器

```bash
npm run dev
```

或使用 Astro 后台模式（参考规范）：

```bash
npx astro dev --background
```

在浏览器中打开：[http://localhost:4321](http://localhost:4321)

### 3. 本地构建与预览

```bash
npm run build
npm run preview
```

---

## 📝 内容维护指南

### 添加新项目

在 `src/content/projects/` 目录下创建新的 `.md` 文件，例如 `my-project.md`：

```markdown
---
title: "项目名称"
description: "一句话项目简述"
category: "Agent Framework" # 分类标签
status: "Active"            # Active | Beta | Research | Archived
githubUrl: "https://github.com/ZetesisAI/repo"
demoUrl: "https://example.com"
order: 1                    # 排序权重 (数字越小越靠前)
featured: true              # 是否在首页精选展示
---

# 项目正文详细介绍...
```

### 发表新文章 / 发布动态

在 `src/content/blog/` 目录下创建新的 `.md` 文件，例如 `my-post.md`：

```markdown
---
title: "文章标题"
description: "文章摘要简介"
pubDate: 2026-10-09
author: "Zetesis AI Team"
tags: ["Announcement", "Architecture"]
draft: false
---

# 文章正文...
```

---

## 🚀 部署至 GitHub Pages

1. 确认项目根目录下已配置 `.github/workflows/deploy.yml`。
2. 在 GitHub 仓库设置中开启 GitHub Pages：
   - 打开仓库的 **Settings** -> **Pages**。
   - 在 **Build and deployment** > **Source** 下拉框中，选择 **GitHub Actions**。
3. 提交并推送代码到 `main` 分支：
   ```bash
   git add .
   git commit -m "feat: setup Astro project website framework"
   git push origin main
   ```
4. GitHub Actions 将自动执行编译并将产物发布到 `https://zetesisai.github.io/`。
