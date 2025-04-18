#!/usr/bin/env node
/**
 * FastMCP CLI入口文件
 *
 * 此文件为FastMCP CLI的入口点，提供给Cursor IDE使用
 * 支持命令行参数解析和多种启动模式（stdio、SSE等）
 */

import { server } from "../src/server.js";
import path from "node:path";
import { fileURLToPath } from "node:url";

// 获取当前模块的路径信息
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
    const portArg =
      args.find((arg) => arg.startsWith("--port=")) ||
      args.find((arg, index) => {
        return arg === "--port" && index < args.length - 1;
      });

    let port = 8080; // 默认端口

    if (portArg === "--port" && args.indexOf(portArg) < args.length - 1) {
      const value = parseInt(args[args.indexOf(portArg) + 1], 10);
      if (!isNaN(value)) {
        port = value;
      }
    } else if (portArg?.startsWith("--port=")) {
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
 * 自动导入所有必要的模块
 */
function importModules() {
  // 导入所有工具、资源和提示
  try {
    // 导入基本工具
    import("../src/tools/basic.js");

    // 导入资源和提示文件
    import("../src/resources/example.js");
    import("../src/prompts/example.js");

    console.log("已加载所有模块");
  } catch (error) {
    console.error("加载模块时出错:", error);
  }
}

/**
 * 启动MCP服务器
 *
 * 服务器可以通过stdio（标准输入输出）或SSE（Server-Sent Events）方式运行
 * stdio模式适合在Cursor等IDE环境中使用
 * SSE模式适合作为HTTP服务器远程提供服务
 */
async function startServer() {
  try {
    // 导入必要模块
    await Promise.all([
      import("../src/tools/basic.js"),
      import("../src/resources/example.js"),
      import("../src/prompts/example.js"),
    ]);

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
  } catch (error) {
    console.error("启动服务器时出错:", error);
    process.exit(1);
  }
}

// 执行服务器启动函数
startServer();
