/**
 * 基本工具实现文件
 *
 * 本文件定义了MCP服务器提供的基本工具，如加法运算和天气查询。
 * 每个工具需要定义：
 * - name: 工具名称
 * - description: 工具描述
 * - parameters: 使用zod定义的参数验证模式
 * - execute: 执行函数，实现工具的具体功能
 */

import { FastMCP } from "fastmcp";
import { z } from "zod"; // 导入zod用于参数验证

// 导入全局服务器实例
import { server } from "../server.js";

/**
 * 加法工具
 *
 * 功能：将两个数字相加并返回结果
 * 参数：
 *   - a: 第一个数字
 *   - b: 第二个数字
 * 返回：字符串形式的计算结果
 */
server.addTool({
  name: "add", // 工具名称
  description: "将两个数字相加", // 工具描述
  parameters: z.object({
    a: z.number().describe("第一个数字"), // 第一个参数定义
    b: z.number().describe("第二个数字"), // 第二个参数定义
  }),
  execute: async (args: { a: number; b: number }) => {
    // 执行加法运算并返回字符串结果
    return String(args.a + args.b);
  },
});

/**
 * 天气查询工具
 *
 * 功能：模拟获取指定城市的天气信息
 * 参数：
 *   - city: 城市名称
 *   - date: 可选的日期参数，格式为YYYY-MM-DD
 * 返回：JSON字符串，包含城市、日期、温度、天气状况和湿度
 */
server.addTool({
  name: "getWeather", // 工具名称
  description: "获取指定城市的天气信息", // 工具描述
  parameters: z.object({
    city: z.string().describe("城市名称"), // 城市参数定义
    date: z.string().optional().describe("日期，格式为YYYY-MM-DD，默认为今天"), // 可选的日期参数
  }),
  execute: async (args: { city: string; date?: string }) => {
    // 提取参数，如果未提供日期则使用当前日期
    const { city, date = new Date().toISOString().split("T")[0] } = args;

    // 这里通常应该调用实际的天气API，这里只是模拟返回数据
    const weatherData = {
      city, // 城市名称
      date, // 查询日期
      temperature: Math.floor(Math.random() * 30) + 5, // 5-35度之间的随机温度
      condition: ["晴朗", "多云", "阴天", "小雨", "大雨"][
        Math.floor(Math.random() * 5)
      ], // 随机天气状况
      humidity: Math.floor(Math.random() * 60) + 40, // 40%-100%之间的随机湿度
    };

    // 返回JSON字符串形式的天气数据
    return JSON.stringify(weatherData);
  },
});
