/**
 * 资源示例实现文件
 *
 * 本文件定义了MCP服务器提供的资源，如文档和资源模板。
 * 资源是MCP协议中的一种实体，用于提供静态或动态内容给客户端。
 * 每个资源由唯一URI标识，可以包含文本或二进制数据。
 */

import { server } from "../server.js";

/**
 * 项目说明文档资源
 *
 * 提供项目的基本说明文档，以Markdown格式呈现
 * URI: file:///docs/readme.md
 * 内容: 包含项目简介、功能列表和使用方法
 */
server.addResource({
  uri: "file:///docs/readme.md", // 资源URI
  name: "项目说明文档", // 资源名称
  mimeType: "text/markdown", // 资源MIME类型
  async load() {
    // 在实际应用中，可能会从文件系统或数据库加载文档
    return {
      // 返回Markdown格式的文本内容
      text: `# FastMCP 示例项目
      
## 简介

这是一个使用FastMCP框架创建的示例项目，展示了如何构建一个基本的MCP服务器。

## 功能

- 工具: 提供简单的加法和天气查询功能
- 资源: 提供此说明文档
- 提示: 提供代码注释和问候语生成功能

## 使用方法

1. 使用 \`npm run dev\` 启动开发服务器
2. 使用 \`npm run inspect\` 启动MCP检查器
3. 使用 \`npm run build\` 构建项目`,
    };
  },
});

/**
 * 文档资源模板
 *
 * 根据参数动态生成不同类型的文档
 * URI模板: file:///docs/{name}.md
 * 参数:
 *   - name: 文档名称，支持api/tools/resources/prompts四种类型
 * 内容: 根据name参数返回不同的文档内容
 */
server.addResourceTemplate({
  uriTemplate: "file:///docs/{name}.md", // 资源URI模板
  name: "文档", // 资源模板名称
  mimeType: "text/markdown", // 资源MIME类型
  arguments: [
    {
      name: "name", // 参数名称
      description: "文档名称", // 参数描述
      required: true, // 参数是否必须
      enum: ["api", "tools", "resources", "prompts"], // 参数可选值
    },
  ],
  async load({ name }) {
    // 根据不同的name参数返回不同的文档内容
    const docContent: Record<string, string> = {
      // API文档内容
      api: `# API 文档\n\n本服务器提供简单的API接口，包括加法和天气查询。`,
      // 工具文档内容
      tools: `# 工具文档\n\n## 加法工具\n\n将两个数字相加并返回结果。\n\n## 天气查询工具\n\n查询指定城市的天气信息。`,
      // 资源文档内容
      resources: `# 资源文档\n\n本服务器提供各种文档资源，可以通过URI访问。`,
      // 提示文档内容
      prompts: `# 提示文档\n\n本服务器提供代码注释和问候语生成的提示模板。`,
    };

    // 返回对应的文档内容，如果找不到则返回错误信息
    return {
      text: docContent[name] || `# 找不到${name}文档`,
    };
  },
});
