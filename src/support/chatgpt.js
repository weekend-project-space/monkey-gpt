//     // 定义聊天历史记录和用户输入
//     const messages = [{
//         role: 'system',
//         content: '你是一个帮助用户的助手。'
//     },
//     {
//         role: 'user',
//         content: '你好，请问今天的天气如何？'
//     }
// ];

export async function chat(messages, model = 'gpt-4o-mini', apiKey, apiEndpoint = 'https://api.openai.com/v1/chat/completions') {
    // 定义请求头
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
    };


    // 创建请求体
    const requestBody = {
        model: model, // 使用的模型名称
        messages: messages
    };

    // 发送请求并处理响应
    return fetch(apiEndpoint, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(requestBody)
        })
        .then(response => response.json())
        .then(async data => {
            const reply = data.choices[0].message.content;
            return reply
        })
}