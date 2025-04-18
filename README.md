# FastMCP 示例项目

这是一个使用 [FastMCP](https://github.com/punkpeye/fastmcp) 框架的 MCP 服务器示例项目。项目展示了如何使用 TypeScript 创建一个基本的 MCP 服务器，包括工具、资源和提示的实现。

## 主要功能

- **工具**：

  - 加法运算：将两个数字相加并返回结果
  - 天气查询：查询指定城市的天气信息

- **资源**：

  - 项目说明文档：提供项目的基本说明
  - 文档模板：根据参数返回不同的文档内容

- **提示**：
  - 代码注释：为代码生成详细的注释
  - 问候语生成：生成适合特定场景的问候语

## 项目结构

```
fast-mcp-demo/
├── src/
│   ├── tools/
│   │   └── basic.ts     # 基本工具实现
│   ├── resources/
│   │   └── example.ts   # 资源示例实现
│   ├── prompts/
│   │   └── example.ts   # 提示示例实现
│   ├── server.ts        # 服务器实例定义
│   └── index.ts         # 主入口文件
├── package.json
├── tsconfig.json
└── README.md
```

## 安装与使用

1. 安装依赖：

```bash
npm install
```

2. 开发模式运行：

```bash
npm run dev
```

3. 使用 MCP Inspector 查看：

```bash
npm run inspect
```

4. 构建项目：

```bash
npm run build
```

5. 运行构建后的项目：

```bash
npm start
```

## 开发说明

- 添加新工具：在 `src/tools/` 目录下创建新文件，参考 `basic.ts` 的实现
- 添加新资源：在 `src/resources/` 目录下创建新文件，参考 `example.ts` 的实现
- 添加新提示：在 `src/prompts/` 目录下创建新文件，参考 `example.ts` 的实现
