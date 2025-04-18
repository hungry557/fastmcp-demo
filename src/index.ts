/**
 * FastMCP服务器主入口文件
 *
 * 本文件负责导入所有必要的模块并启动MCP服务器。
 * FastMCP是一个TypeScript框架，用于构建支持客户端会话的MCP服务器。
 */

// 导入服务器实例
import { server } from "./server.js";

// 导入工具、资源和提示模块
import "./tools/basic.js"; // 导入基本工具定义（加法、天气查询等）

// 导入资源和提示文件
import "./resources/example.js"; // 导入资源示例（文档、资源模板等）
import "./prompts/example.js"; // 导入提示示例（代码注释、问候语等）

/**
 * 启动MCP服务器
 *
 * 服务器可以通过stdio（标准输入输出）或SSE（Server-Sent Events）方式运行
 * stdio模式适合在本地调试或与Claude Desktop等AI助手集成
 * SSE模式适合作为HTTP服务器远程提供服务
 */
const startServer = () => {
  // 默认使用stdio, 也可以使用sse
  server.start({
    transportType: "stdio", // 使用标准输入输出作为通信方式
    // 如果要使用HTTP/SSE模式，取消下面的注释
    // port: 8080,         // HTTP服务器端口
    // transportType: "sse", // 使用SSE作为通信方式
  });

  console.log("FastMCP服务器已启动");
};

// 执行服务器启动函数
startServer();
