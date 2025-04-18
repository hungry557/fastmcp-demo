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
  // 解析命令行参数
  const args = process.argv.slice(2);
  const stdioMode = args.includes("--stdio");
  const port = args.includes("--port")
    ? parseInt(args[args.indexOf("--port") + 1], 10)
    : 8080;

  // 根据命令行参数选择传输模式
  if (stdioMode) {
    // 使用stdio模式
    server.start({
      transportType: "stdio",
    });
  } else {
    // 使用SSE模式
    server.start({
      transportType: "sse",
      sse: {
        endpoint: "/sse",
        port,
      },
    });
    console.log(`FastMCP服务器已启动，运行在端口: ${port}`);
  }
};

// 如果直接运行此文件（而不是作为模块导入），则执行服务器启动函数
if (import.meta.url === import.meta.resolve(process.argv[1])) {
  startServer();
}

// 导出服务器实例，以便其他模块可以使用
export { server };
