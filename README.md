# 🌿 心语愿 - AI心理咨询陪伴平台

一个基于阿里云通义千问 AI 的温暖心理咨询陪伴平台，为用户提供24小时在线的情感支持和心理疏导。

## ✨ 特性

- 🤖 **AI 驱动**：使用阿里云通义千问大模型提供智能回应
- 🎨 **精美UI**：清爽温暖的界面设计，提供舒适的聊天体验
- 🔒 **隐私安全**：后端代理 API 调用，不暴露敏感信息
- 📱 **响应式设计**：完美适配各种设备
- ⚡ **快速部署**：一键部署到阿里云
- 🚀 **高可用**：使用 PM2 保证服务稳定运行

## 🏗️ 技术栈

- **前端**：HTML5 + CSS3 + JavaScript
- **后端**：Node.js + Express
- **API**：阿里云通义千问 DashScope
- **部署**：阿里云 ECS + Nginx + PM2

## 📁 项目结构

```
xinyuyuan/
├── frontend/
│   └── index.html
├── backend/
│   ├── server.js
│   ├── package.json
│   ├── .env.example
│   └── .gitignore
└── README.md
```

## 🚀 快速开始

### 前置条件
- Node.js 18+
- npm
- 阿里云账户和 API Key

### 本地开发

1. **克隆项目**
```bash
git clone https://github.com/muranzi/xinyuyuan.git
cd xinyuyuan
```

2. **配置后端**
```bash
cd backend
cp .env.example .env
# 编辑 .env，填入你的 QWEN_API_KEY
npm install
npm start
```

3. **启动前端**
```bash
cd frontend
python -m http.server 8000
```

4. **访问应用**
打开浏览器访问 `http://localhost:8000`

## 🌐 部署到阿里云

### 快速部署步骤

1. **创建 ECS 实例**
   - 选择 Ubuntu 20.04 镜像
   - 2核 2GB 内存
   - 分配公网 IP

2. **连接到 ECS**
```bash
ssh -i your-key.pem ubuntu@your-ecs-ip
```

3. **安装依赖**
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs nginx git
```

4. **部署项目**
```bash
git clone https://github.com/muranzi/xinyuyuan.git
cd xinyuyuan/backend
npm install
cp .env.example .env
# 编辑 .env，填入你的 API Key
```

5. **启动服务**
```bash
sudo npm install -g pm2
pm2 start server.js --name "xinyu-yuan"
pm2 startup
pm2 save
```

6. **配置 Nginx**
```bash
sudo nano /etc/nginx/sites-available/default
```

添加反向代理配置：
```nginx
server {
    listen 80;
    server_name your-domain.com;

    root /var/www/html;
    
    location / {
        try_files $uri $uri/ /index.html;
    }

    location /api/ {
        proxy_pass http://127.0.0.1:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

7. **部署前端**
```bash
sudo cp frontend/index.html /var/www/html/
sudo systemctl restart nginx
```

## 📊 监控

```bash
# 查看服务状态
pm2 status

# 查看实时日志
pm2 logs xinyu-yuan

# 监控资源使用
pm2 monit
```

## ⚠️ 免责声明

本平台仅提供情感陪伴与心理疏导建议，不能替代专业心理咨询或医疗诊断。

如遇严重心理困扰，请及时寻求专业帮助或拨打心理援助热线：
- 心理援助热线：400-161-9995
- 当地精神卫生中心
- 专业心理医生或心理咨询师

## 📄 许可证

MIT License

## 👨‍💻 作者

Created by [@muranzi](https://github.com/muranzi)

---

**⭐ 如果这个项目对你有帮助，请给一个 Star！**
