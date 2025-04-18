# FastMCP 示例项目

这是一个使用 [FastMCP](https://github.com/punkpeye/fastmcp) 框架的 MCP 服务器示例项目。项目展示了如何使用 TypeScript 创建一个基本的 MCP 服务器，包括工具、资源和提示的实现。

[![npm version](https://img.shields.io/npm/v/@hungry557/fastmcp-demo.svg)](https://www.npmjs.com/package/@hungry557/fastmcp-demo)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 安装

通过 npm 安装：

```bash
npm install @hungry557/fastmcp-demo
```

通过 yarn 安装：

```bash
yarn add @hungry557/fastmcp-demo
```

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

## 发布到 NPM

如果你想基于此项目发布自己的 MCP 服务器，请遵循以下步骤：

1. 更新`package.json`中的相关信息：

   - `name`: 更改为你的包名
   - `version`: 包版本
   - `author`: 你的信息
   - `repository`: 更新为你的仓库地址

2. 登录到 npm：

   ```bash
   npm login
   ```

3. 发布包：
   ```bash
   npm publish
   ```

注意：由于使用了`@`开头的包名，需要确保在`publishConfig`中设置了`"access": "public"`，否则需要有 npm 付费账户才能发布私有包。

### 在 Cursor 中配置 MCP 服务器

[Cursor](https://cursor.sh/) 是一个支持 AI 辅助的现代化代码编辑器，可以通过配置 MCP 服务器来扩展其功能。以下是如何在 Cursor 中配置本项目提供的 MCP 服务器：

#### 创建 MCP 配置文件

1. 在用户主目录下创建或编辑 `.cursor/mcp.json` 文件：

   - Windows: `C:\Users\<用户名>\.cursor\mcp.json`
   - macOS: `~/.cursor/mcp.json`
   - Linux: `~/.cursor/mcp.json`

2. 在配置文件中添加以下内容：

```json
{
  "mcpServers": {
    "FastMCP Demo": {
      "command": "npx",
      "args": ["@hungry557/fastmcp-demo", "--stdio"]
    }
  }
}
```

#### 配置选项说明

- `"FastMCP Demo"`: 服务器名称，可以自定义
- `"command"`: 执行命令，这里使用 `npx` 来运行 npm 包
- `"args"`: 命令参数数组
  - `"@hungry557/fastmcp-demo"`: npm 包名
  - `"--stdio"`: 使用 stdio 模式运行

#### 高级配置

如果需要更多自定义选项，可以这样配置：

```json
{
  "mcpServers": {
    "FastMCP Demo (高级配置)": {
      "command": "cmd",
      "args": ["/c", "npx", "-y", "@hungry557/fastmcp-demo", "--stdio"]
    },
    "FastMCP Demo (SSE模式)": {
      "serverUrl": "http://localhost:8080"
    }
  }
}
```

#### 在 Cursor 中使用

配置完成后：

1. 重启 Cursor 编辑器
2. 通过 Cursor 的命令面板选择「Connect to MCP Server」
3. 从列表中选择「FastMCP Demo」
4. 现在您可以在 Cursor 中使用本项目提供的 MCP 功能了

#### 注意事项

- 确保已全局安装 `@hungry557/fastmcp-demo` 或在当前项目中安装
- 如果使用 SSE 模式，需要先在另一个终端中启动服务器
- 如果在工作环境中使用，建议考虑添加身份验证和其他安全措施

## SSE 模式详细说明

本项目支持使用 SSE (Server-Sent Events) 模式运行，这是 FastMCP 框架支持的一种通信方式，用于实现客户端与服务器的实时通信。

### SSE 模式概述

SSE (Server-Sent Events) 是一种基于 HTTP 的单向通信技术，允许服务器向客户端推送实时更新。在 MCP 协议中，SSE 用于以下场景：

- 远程托管 MCP 服务器，使多个客户端可以连接
- 通过网络分离 AI 模型和 MCP 服务器
- 实现分布式 MCP 架构
- 提供公开的 API 接口供第三方应用集成

与 stdio 模式相比，SSE 模式允许服务器作为 HTTP 服务运行，可以被远程访问和集成。

### 配置 SSE 模式

要在 SSE 模式下运行服务器，需要修改 `src/index.ts` 文件中的服务器启动配置：

```typescript
// 使用 SSE 模式启动服务器
server.start({
  transportType: "sse", // 设置传输类型为 SSE
  port: 8080, // 设置 HTTP 服务器端口
  cors: true, // 启用跨域资源共享（CORS）
});
```

你也可以添加额外的配置：

```typescript
server.start({
  transportType: "sse",
  port: 8080,
  cors: true,
  corsOptions: {
    origin: ["http://localhost:3000", "https://yourdomain.com"], // 允许的源
    methods: ["GET", "POST"], // 允许的HTTP方法
  },
  basePath: "/api/mcp", // API基础路径
});
```

### 启动 SSE 服务器

在配置好 SSE 模式后，您可以使用以下命令启动服务器：

```bash
npm start
```

服务器将在指定的端口上启动，并输出类似以下的信息：

```
FastMCP服务器已启动
SSE服务器正在运行在 http://localhost:8080
```

### SSE 端点

启动后，服务器会提供以下主要端点：

- `GET /server-info`: 获取服务器信息
- `GET /sse`: SSE 连接端点，客户端通过此端点建立 SSE 连接
- `POST /execute`: 执行工具的端点
- `GET /resources/:uri`: 获取资源的端点
- `GET /prompts/:name`: 获取提示模板的端点

如果配置了 `basePath`，所有端点都会附加此前缀，例如 `/api/mcp/server-info`。

### 客户端集成

#### 浏览器中集成

以下是在浏览器中使用 JavaScript 连接到 SSE 服务器的示例代码：

```javascript
// 创建 SSE 连接
const eventSource = new EventSource("http://localhost:8080/sse");

// 连接建立事件
eventSource.onopen = () => {
  console.log("SSE 连接已建立");
};

// 接收消息事件
eventSource.onmessage = (event) => {
  const data = JSON.parse(event.data);
  console.log("收到消息:", data);
};

// 错误处理
eventSource.onerror = (error) => {
  console.error("SSE 连接错误:", error);
  eventSource.close();
};

// 执行工具示例
async function executeAddTool(a, b) {
  const response = await fetch("http://localhost:8080/execute", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      tool: "add",
      args: { a, b },
    }),
  });

  return await response.json();
}
```

#### 使用 MCP 客户端库

对于更便捷的集成，可以使用 MCP 客户端库：

```typescript
import { MCPClient } from "mcp-client";

// 创建客户端实例
const client = new MCPClient({
  serverUrl: "http://localhost:8080",
});

// 连接到服务器
await client.connect();

// 执行工具
const result = await client.executeTool("add", { a: 5, b: 3 });
console.log("计算结果:", result); // 输出: 8

// 加载资源
const readme = await client.loadResource("file:///docs/readme.md");
console.log("README 内容:", readme.text);

// 获取提示模板
const prompt = await client.loadPrompt("greeting", {
  occasion: "会议",
  tone: "正式",
});
console.log("生成的提示:", prompt);

// 关闭连接
client.disconnect();
```

### 安全性考虑

在生产环境中使用 SSE 模式时，请考虑以下安全措施：

1. **身份验证和授权**：使用 FastMCP 的 `authenticate` 钩子实现用户认证
2. **HTTPS**：在生产环境中使用 HTTPS 加密通信
3. **速率限制**：限制单个客户端的请求频率
4. **CORS 限制**：限制只允许特定域名的跨域请求
5. **请求验证**：验证所有传入的请求参数

以下是实现身份验证的示例：

```typescript
import { FastMCP } from "fastmcp";

const server = new FastMCP({
  name: "FastMCP示例服务器",
  version: "1.0.0",
  authenticate: ({ request }) => {
    const apiKey = request.headers["x-api-key"];

    if (apiKey !== "your-secret-key") {
      throw new Response(null, {
        status: 401,
        statusText: "Unauthorized",
      });
    }

    return {
      userId: "user-123",
      role: "admin",
    };
  },
});
```

### 性能优化

对于高负载场景，考虑以下优化：

1. **连接池**：使用连接池管理客户端连接
2. **缓存**：对频繁访问的资源进行缓存
3. **负载均衡**：在多个实例之间分配负载
4. **超时处理**：设置适当的连接和请求超时
5. **错误恢复**：实现自动重连和错误恢复机制

## MCP Inspector 使用指南

MCP Inspector 是 FastMCP 框架提供的一个网页界面工具，用于可视化测试和调试 MCP 服务器。通过它，你可以直观地与服务器交互，测试工具、资源和提示功能。

### 启动 MCP Inspector

使用以下命令启动 MCP Inspector：

```bash
npm run inspect
```

这个命令会启动你的 MCP 服务器并自动打开浏览器窗口，显示 MCP Inspector 界面（默认地址为 http://localhost:3000）。

### MCP Inspector 界面说明

MCP Inspector 界面主要分为以下几个部分：

1. **工具面板（Tools）**：显示所有可用的工具，可以点击测试
2. **资源面板（Resources）**：显示所有可用的资源，可以点击查看内容
3. **提示面板（Prompts）**：显示所有可用的提示模板，可以尝试生成提示
4. **会话信息（Sessions）**：显示当前活跃的会话信息
5. **日志面板（Logs）**：显示服务器的日志信息

### 使用方法

#### 测试工具

1. 在左侧导航栏中选择 "Tools"
2. 点击要测试的工具（例如 "add" 或 "getWeather"）
3. 在参数表单中填入所需参数
4. 点击 "Execute" 按钮
5. 查看右侧结果面板中的返回值

#### 查看资源

1. 在左侧导航栏中选择 "Resources"
2. 点击要查看的资源（例如 "项目说明文档"）
3. 右侧面板会显示资源的内容

对于资源模板：

1. 点击资源模板（例如 "文档"）
2. 在参数表单中选择所需的参数值
3. 点击 "Load" 按钮查看生成的资源内容

#### 测试提示

1. 在左侧导航栏中选择 "Prompts"
2. 点击要测试的提示（例如 "code-comment" 或 "greeting"）
3. 在表单中填入所需参数
4. 点击 "Generate" 按钮
5. 右侧会显示生成的提示文本

### 调试技巧

- **查看日志**：MCP Inspector 底部的日志面板会显示服务器的实时日志信息
- **会话管理**：可以创建多个会话并在它们之间切换，以测试不同的场景
- **参数自动完成**：对于有枚举值的参数，Inspector 会提供下拉选择，方便使用
- **错误调试**：执行出错时，错误信息会显示在结果面板中，帮助你快速定位问题

### 使用场景

MCP Inspector 特别适合以下场景：

- 开发新工具、资源或提示时的实时测试
- 排查服务器问题和错误
- 演示 MCP 服务器功能
- 学习 MCP 协议和 FastMCP 框架的使用

## 开发说明

- 添加新工具：在 `src/tools/` 目录下创建新文件，参考 `basic.ts` 的实现
- 添加新资源：在 `src/resources/` 目录下创建新文件，参考 `example.ts` 的实现
- 添加新提示：在 `src/prompts/` 目录下创建新文件，参考 `example.ts` 的实现
