#!/usr/bin/env node

/**
 * FastMCP CLI入口文件
 *
 * 本文件是包的命令行入口点，允许通过npm安装后直接执行
 * 特别适合在Cursor等IDE中配置MCP Server
 */

import { server } from "./server.js";
import "./tools/basic.js";
import "./resources/example.js";
import "./prompts/example.js";

function parseArgs() {
  const args = process.argv.slice(2);
  const stdioMode = args.includes("--stdio");
  const hasPortArg = args.includes("--port");
  const port = hasPortArg
    ? parseInt(args[args.indexOf("--port") + 1], 10)
    : 8080;

  return {
    stdioMode,
    port,
  };
}

function main() {
  const { stdioMode, port } = parseArgs();

  if (stdioMode) {
    // 使用stdio模式 - 适合Cursor等IDE的MCP集成
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
}

// 立即执行主函数
main();
