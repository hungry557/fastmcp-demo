/**
 * 提示示例实现文件
 *
 * 本文件定义了MCP服务器提供的提示模板，如代码注释和问候语生成。
 * 提示是预定义的文本模板，可以根据参数动态生成，主要用于帮助LLM生成特定格式或内容的回复。
 */

import { server } from "../server.js";

/**
 * 代码注释提示
 *
 * 功能：根据提供的代码和语言生成详细的代码注释
 * 参数：
 *   - code: 需要添加注释的代码
 *   - language: 代码的编程语言
 * 返回：生成详细代码注释的提示文本
 */
server.addPrompt({
  name: "code-comment", // 提示名称
  description: "为代码生成详细的注释", // 提示描述
  arguments: [
    {
      name: "code", // 参数名称
      description: "需要添加注释的代码", // 参数描述
      required: true, // 参数是否必须
    },
    {
      name: "language", // 参数名称
      description: "代码的编程语言", // 参数描述
      required: true, // 参数是否必须
      enum: ["typescript", "javascript", "python", "java", "c#", "go", "rust"], // 参数可选值
    },
  ],
  load: async ({ code, language }) => {
    // 根据提供的代码和语言返回生成注释的提示
    return `请为以下${language}代码添加详细的注释，解释代码的功能、参数和返回值。
    
代码：
\`\`\`${language}
${code}
\`\`\`

请提供以下内容：
1. 功能概述
2. 参数说明
3. 返回值说明
4. 代码逻辑解释
5. 添加了注释的完整代码`;
  },
});

/**
 * 问候语生成提示
 *
 * 功能：根据场合、语气和接收者生成适合的问候语
 * 参数：
 *   - occasion: 场合类型（必须，枚举值）
 *   - tone: 语气（必须，枚举值）
 *   - recipient: 接收者（可选）
 * 返回：生成问候语的提示文本
 */
server.addPrompt({
  name: "greeting", // 提示名称
  description: "生成适合特定场景的问候语", // 提示描述
  arguments: [
    {
      name: "occasion", // 参数名称
      description: "场合类型", // 参数描述
      required: true, // 参数是否必须
      enum: ["会议", "邮件", "社交媒体", "朋友聚会", "商务拜访"], // 参数可选值
    },
    {
      name: "tone", // 参数名称
      description: "语气", // 参数描述
      required: true, // 参数是否必须
      enum: ["正式", "友好", "专业", "幽默"], // 参数可选值
    },
    {
      name: "recipient", // 参数名称
      description: "接收者", // 参数描述
      required: false, // 参数是否必须
    },
  ],
  load: async ({ occasion, tone, recipient }) => {
    // 根据接收者生成接收者字符串
    const recipientStr = recipient ? `给${recipient}` : "";

    // 返回生成问候语的提示文本
    return `请生成一段适合在${occasion}场合使用的${tone}语气的问候语${recipientStr}。
    
要求：
1. 问候语应该简洁明了
2. 符合${occasion}的场合特点
3. 保持${tone}的语气
4. 根据场合提供2-3个不同的选项`;
  },
});
