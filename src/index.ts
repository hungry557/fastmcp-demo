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

// 定义服务器配置类型
type StdioConfig = {
  transportType: "stdio";
};

type SseConfig = {
  transportType: "sse";
  sse: {
    endpoint: `/${string}`;
    port: number;
  };
};

type ServerConfig = StdioConfig | SseConfig;

/**
 * 解析命令行参数
 *
 * @returns 解析后的配置对象
 */
function parseCommandLineArgs(): ServerConfig {
  const args = process.argv.slice(2);

  // 默认使用stdio模式
  let useSSE = false;

  // 检查是否应该使用SSE模式
  if (args.includes("--sse")) {
    useSSE = true;
  }

  // 如果明确指定stdio，则使用stdio
  if (args.includes("--stdio")) {
    useSSE = false;
  }

  // 如果使用SSE模式，需要解析端口
  if (useSSE) {
    // 查找端口参数
    const portArg = args.find((arg) => arg.startsWith("--port="));
    let port = 8080; // 默认端口

    if (portArg) {
      const value = parseInt(portArg.split("=")[1], 10);
      if (!isNaN(value)) {
        port = value;
      }
    }

    // 返回SSE配置
    return {
      transportType: "sse",
      sse: {
        endpoint: "/sse", // 确保路径格式正确
        port: port,
      },
    };
  } else {
    // 返回stdio配置
    return {
      transportType: "stdio",
    };
  }
}

/**
 * 启动MCP服务器
 *
 * 服务器可以通过stdio（标准输入输出）或SSE（Server-Sent Events）方式运行
 * stdio模式适合在本地调试或与Claude Desktop等AI助手集成
 * SSE模式适合作为HTTP服务器远程提供服务
 */
const startServer = () => {
  // 解析命令行参数
  const config = parseCommandLineArgs();

  // 启动服务器
  server.start(config);

  // 打印启动信息
  if (config.transportType === "sse") {
    console.log(`FastMCP服务器已启动 (模式: sse, 端口: ${config.sse.port})`);
  } else {
    console.log("FastMCP服务器已启动 (模式: stdio)");
  }
};

// 执行服务器启动函数
startServer();
