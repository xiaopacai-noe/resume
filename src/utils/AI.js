const API_KEY = "sk-a6930f636dbb4040a8fe861af114b52c";
const BASE_URL = "https://api.deepseek.com/v1/chat/completions";

self.onmessage = async function (event) {
  const data = event.data.data.content;
  const systemPromptType = event.data.data.systemPromptType;
  const systemPrompt = {
    workExperiencePrompt: {
      role: "system",
      content:
        "你是一位专业的简历优化专家。用户将提供工作经历描述，请根据以下要求进行润色：\n\n1. 使用强有力的动作动词（如“主导”、“设计”、“实施”、“优化”等）\n2. 量化成就（如“提升效率30%”、“管理10人团队”）\n3. 突出与目标岗位相关的技能和贡献\n4. 保持内容简洁，每条经历不超过3-4个关键点\n\n请仅返回润色后的工作经历内容。并且返回的内容是纯文本，且无需加粗或斜体等格式化。\n\n以下是用户提供的内容:",
    },
    projectExperiencePrompt: {
      role: "system",
      content:
        "你是一位专业的简历优化专家。用户将提供项目描述，请根据以下要求进行润色：\n\n1. 清晰说明项目目标、你的角色和成果\n2. 使用技术术语和工具名称\n3. 量化成果（如“缩短开发周期2周”、“用户满意度提升至95%”）\n4. 突出解决的挑战或创新点\n\n请仅返回润色后的项目描述。并且返回的内容是纯文本，且无需加粗或斜体等格式化。\n\n以下是用户提供的内容:",
    },
    personalSummaryPrompt: {
      role: "system",
      content:
        "你是一位专业的简历优化专家。用户将提供个人总结，请根据以下要求进行润色：\n\n1. 突出个人核心竞争力和职业目标\n2. 使用积极、专业的语言\n3. 包含关键技能和成就\n4. 保持内容简洁明了，不超过5-6句话\n\n请仅返回润色后的个人总结内容。并且返回的内容是纯文本，且无需加粗或斜体等格式化。\n\n以下是用户提供的内容",
    },
  };
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
      model: "deepseek-chat",
      messages: [systemPrompt[systemPromptType], { role: "user", content: data }],
      stream: true,
    }),
  });
  const reader = response.body.getReader();
  const decoder = new TextDecoder("utf-8");
  while (true) {
    const { done, value } = await reader.read();
    if (done) {
        self.postMessage({type:"end"});
        break;
    }
    const chunk = decoder.decode(value, { stream: true });
    const lines = chunk.split("\n").filter((line) => line.startsWith("data:"));
    for (const line of lines) {
      try {
        const jsonData = JSON.parse(line.replace("data: ", ""));
        const content = jsonData.choices[0].delta.content || ""; // 获取文本
        if(content.trim() === "") continue; // 如果内容为空，则跳过
        self.postMessage(content);
      } catch (err) {}
    }
  }
};
