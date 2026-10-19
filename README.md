# Zetesis AI 官方网站 (zetesisai.github.io)

基于 [Astro](https://astro.build/) 与 [Tailwind CSS](https://tailwindcss.com/) 构建的现代化、高性能项目官网架构，支持 GitHub Pages 全自动构建与部署。

---

## 🌟 结构

站点只有两类页面：

- **主页** `/`：五个板块，依次为主视觉（星轨动效）、简介、研究方向详解、最近研究、团队与联系方式。顶部 `New:` 横幅自动指向最新一篇论文。
- **论文页** `/research/<slug>`：每篇论文一个页面，支持 LaTeX 数学公式（构建时由 KaTeX 渲染为 HTML）。

```text
src/
├── components/
│   ├── home/                 # 主页五个板块：Hero / Intro / Approach / RecentResearch / Team
│   ├── AnnouncementBar.astro # 顶部 "New:" 横幅
│   ├── Header.astro / Footer.astro / Starfield.astro
├── content/papers/           # 论文 (Markdown + LaTeX 公式)
├── data/
│   ├── papers.ts             # 论文查询与日期格式化
│   └── site.ts               # GitHub 链接、联系邮箱、团队成员（手动维护）
├── layouts/Layout.astro
├── pages/
│   ├── index.astro           # 主页
│   ├── research/[slug].astro # 论文页
│   └── 404.astro
└── styles/global.css
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

### 发布论文

在 `src/content/papers/` 下新建 `.md` 文件，文件名即 URL（例如 `my-paper.md` → `/research/my-paper`）：

```markdown
---
title: "论文标题"
abstract: "摘要"
pubDate: 2026-10-19
authors: ["Author One", "Author Two"]
tags: ["Evaluation"]
links:
  pdf: "/papers/my-paper.pdf"   # 可选，PDF 放到 public/papers/ 下
  arxiv: "https://arxiv.org/abs/xxxx.xxxxx"  # 可选
  code: "https://github.com/ZetesisAI/repo"  # 可选
draft: false
---

## 1. Introduction

行内公式 $s_t in mathcal{S}$，独立公式：

$$
mathbb{E}[X] = sum_i p_i x_i
$$
```

正文中也可以直接写 HTML，因此由 LaTeX 转换得到的 HTML 片段（如 pandoc / LaTeXML 的输出）可以粘贴进来。

### 团队与联系方式

编辑 `src/data/site.ts`：`team` 为团队成员列表，`email` 留空时不显示邮件按钮。

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
