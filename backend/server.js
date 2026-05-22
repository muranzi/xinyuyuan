const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();

// 中间件
app.use(cors());
app.use(express.json());

// 健康检查
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// 心理咨询API端点
app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || message.trim() === '') {
      return res.status(400).json({ error: '消息不能为空' });
    }

    // 调用阿里云通义千问API
    const response = await axios.post(
      'https://dashscope.aliyuncs.com/api/v1/services/aigc/text-generation/generation',
      {
        model: 'qwen-plus',
        messages: [
          {
            role: 'system',
            content: '你是"心语愿"心理咨询平台的AI陪伴者。你的角色是温和、共情的心理疏导助手。请用温暖、理解的语气回应用户，给予情感支持和建设性建议。注意：你不是专业心理咨询师，遇到严重心理问题要建议用户寻求专业帮助。回复要简洁亲切，避免说教。'
          },
          {
            role: 'user',
            content: message
          }
        ],
        temperature: 0.7,
        max_tokens: 500
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.QWEN_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const reply = response.data.output.choices[0].message.content;
    res.json({ reply });

  } catch (error) {
    console.error('API Error:', error.message);
    
    if (error.response?.status === 401) {
      res.status(401).json({ error: 'API认证失败，请检查密钥' });
    } else if (error.response?.status === 429) {
      res.status(429).json({ error: '请求过于频繁，请稍后再试' });
    } else {
      res.status(500).json({ error: '服务暂时出错，请稍后重试' });
    }
  }
});

// 错误处理
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: '服务器内部错误' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});