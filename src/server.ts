/**
 * FastMCP服务器实例定义
 *
 * 本文件创建全局FastMCP服务器实例，定义基本配置和事件监听器。
 * 服务器实例被导出供其他模块使用，确保整个应用使用同一个服务器实例。
 */

import { FastMCP } from "fastmcp";

// 创建全局FastMCP服务器实例
export const server = new FastMCP({
  name: "FastMCP示例服务器", // 服务器名称，会在客户端中显示
  version: "1.0.0", // 服务器版本号
});

/**
 * 连接事件监听器
 *
 * 当客户端连接到服务器时触发
 * event.session包含会话信息，可用于跟踪和管理客户端会话
 */
server.on("connect", (event) => {
  console.log(`客户端已连接: ${JSON.stringify(event.session)}`);
});

/**
 * 断开连接事件监听器
 *
 * 当客户端断开连接时触发
 * 可用于清理资源或记录会话结束
 */
server.on("disconnect", (event) => {
  console.log(`客户端已断开连接: ${JSON.stringify(event.session)}`);
});
