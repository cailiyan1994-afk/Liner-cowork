# Prototype Workspace

## 目录结构

### codebase (代码目录)

代码文件，包含原型的完整代码实现。

```
├── src/
│   ├── components/
│   │   └── mobile-shell/
│   │       ├── home-indicator.tsx
│   │       └── status-bar.tsx
│   ├── data/
│   │   └── mock.ts
│   ├── pages/
│   │   ├── Chat.tsx
│   │   ├── Home.tsx
│   │   ├── Matched.tsx
│   │   ├── Matching.tsx
│   │   └── Received.tsx
│   └── App.tsx
├── dependencies.json
├── meta.json
└── prototype-route.json
```

### notebook (代码生成时候的笔记)

笔记文件，记录代码生成过程中的思考和决策。

```
├── changelog.md
├── memo-user-context.md
└── prd-liner-match.md
```

### captures.json (页面截图)

captures 记录了 Prototype 各个状态页的截图信息。每一项包含 stateUrl 和 tosUrl：stateUrl 是原型内部状态地址，tosUrl 是该状态对应的截图，可用于让 AI Agent 对照视觉结果、检查还原度或快速理解多状态页面。

当前导出包含 17 个 capture。