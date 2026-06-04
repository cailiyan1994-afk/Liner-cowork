# Liner 主播社交匹配原型

这是从 `prototype 3` 整理出的 GitHub/Vercel 可部署项目。仓库根目录直接包含 `package.json`。

## Vercel 配置

- Framework Preset: `Vite`
- Install Command: `npm install`
- Build Command: `npm run build`
- Output Directory: `dist`
- Root Directory: `./`

## 本地运行

```bash
npm install
npm run dev
```

入口：

```text
http://localhost:5173/home
```

## 主要路由

- `/home`：关播总结页，小火苗入口带提示
- `/match`：匹配卡片
- `/matched`：Match 后打招呼 + LIVE Event 邀约
- `/chat`：私聊与 Event 卡片
- `/received?target=h8`：收到 Nastia 邀约并接受

## 上传 GitHub

上传本目录里的所有内容，不要上传外层文件夹，也不要上传 zip。GitHub 仓库首页必须直接看到 `package.json`。
