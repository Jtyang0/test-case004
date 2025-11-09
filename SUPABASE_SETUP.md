# Supabase 社交登录配置指南

本指南包含 GitHub 和 Google 登录的配置说明。

## 1. 创建 Supabase 项目

1. 访问 [Supabase](https://supabase.com) 并登录
2. 创建一个新项目
3. 等待项目初始化完成

## 2. 配置 OAuth Providers

### 2.1 配置 GitHub OAuth

### 在 GitHub 上创建 OAuth App

1. 访问 GitHub Settings > Developer settings > OAuth Apps
2. 点击 "New OAuth App"
3. 填写以下信息：
   - **Application name**: 你的应用名称（例如：Nano Banana）
   - **Homepage URL**: `http://localhost:3000` (开发环境) 或你的生产环境 URL
   - **Authorization callback URL**: 
     - 开发环境: `http://localhost:3000/api/auth/callback`
     - 生产环境: `https://yourdomain.com/api/auth/callback`
4. 点击 "Register application"
5. 记录下 **Client ID** 和 **Client Secret**

### 在 Supabase 中配置 GitHub Provider

1. 在 Supabase Dashboard 中，进入 **Authentication** > **Providers**
2. 找到 **GitHub** 并启用它
3. 填入以下信息：
   - **Client ID**: 从 GitHub OAuth App 获取
   - **Client Secret**: 从 GitHub OAuth App 获取
4. 保存配置

### 2.2 配置 Google OAuth

#### 在 Google Cloud Console 中创建 OAuth 2.0 凭据

1. 访问 [Google Cloud Console](https://console.cloud.google.com/)
2. 创建新项目或选择现有项目
3. 启用 **Google+ API**（如果尚未启用）
4. 进入 **APIs & Services** > **Credentials**
5. 点击 **Create Credentials** > **OAuth client ID**
6. 如果这是第一次创建，需要先配置 **OAuth consent screen**：
   - 选择 **External**（除非你有 Google Workspace）
   - 填写应用名称、用户支持邮箱等必填信息
   - 添加授权域名（如 `localhost:3000` 和你的生产域名）
   - 保存并继续
7. 创建 OAuth 客户端 ID：
   - **Application type**: 选择 **Web application**
   - **Name**: 你的应用名称（例如：Nano Banana）
   - **Authorized JavaScript origins**:
     - 开发环境: `http://localhost:3000`
     - 生产环境: `https://yourdomain.com`
   - **Authorized redirect URIs**:
     - 开发环境: `https://your-project-ref.supabase.co/auth/v1/callback`
     - 生产环境: `https://your-project-ref.supabase.co/auth/v1/callback`
     - ⚠️ **注意**: Supabase 会自动处理回调，所以使用 Supabase 项目的回调 URL
8. 点击 **Create**
9. 记录下 **Client ID** 和 **Client Secret**

#### 在 Supabase 中配置 Google Provider

1. 在 Supabase Dashboard 中，进入 **Authentication** > **Providers**
2. 找到 **Google** 并启用它
3. 填入以下信息：
   - **Client ID**: 从 Google Cloud Console 获取
   - **Client Secret**: 从 Google Cloud Console 获取
4. 保存配置

## 3. 配置环境变量

### 创建 .env.local 文件

在项目根目录创建 `.env.local` 文件（如果不存在），并添加以下环境变量：

```env
# Supabase 配置
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# OpenRouter API 配置（如果已配置）
OPENROUTER_API_KEY=your_openrouter_api_key
```

### 如何获取 Supabase 配置值：

1. 在 Supabase Dashboard 中，进入 **Settings** > **API**
   - 或者直接访问：https://supabase.com/dashboard/project/_/settings/api
2. 复制以下值：
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### 示例：

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh4eHh4eHh4eHh4eHh4eHh4eHgiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MTc2OTIwMCwiZXhwIjoxOTU3MzQ1MjAwfQ.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

**重要提示**：
- `.env.local` 文件应该已经在 `.gitignore` 中，不会被提交到 Git
- 修改 `.env.local` 后，需要**重启开发服务器**才能生效
- 确保没有多余的空格或引号

## 4. 更新 OAuth App 的回调 URL

### GitHub OAuth App

确保在 GitHub OAuth App 设置中，回调 URL 包含：
- 开发环境: `http://localhost:3000/api/auth/callback`
- 生产环境: `https://yourdomain.com/api/auth/callback`

### Google OAuth 客户端

确保在 Google Cloud Console 的 OAuth 客户端设置中，授权重定向 URI 包含：
- Supabase 回调 URL: `https://your-project-ref.supabase.co/auth/v1/callback`
- ⚠️ **重要**: 使用 Supabase 项目的回调 URL，而不是你的应用 URL

## 5. 测试登录

1. 启动开发服务器: `npm run dev`
2. 访问 `http://localhost:3000`
3. 测试 GitHub 登录：
   - 点击 "使用 GitHub 登录" 按钮
   - 完成 GitHub 授权
   - 应该会重定向回应用并显示你的用户信息
4. 测试 Google 登录：
   - 点击 "使用 Google 登录" 按钮
   - 完成 Google 授权
   - 应该会重定向回应用并显示你的用户信息

## 注意事项

- 确保 `.env.local` 文件已添加到 `.gitignore` 中
- 生产环境需要更新 OAuth App 的回调 URL
- Supabase 项目需要启用相应的 provider（GitHub 或 Google）
- 确保 Supabase 项目的 URL 和 Key 正确配置
- Google OAuth 的回调 URL 必须使用 Supabase 项目的回调 URL，格式为：`https://your-project-ref.supabase.co/auth/v1/callback`
- 服务器端认证方式：本实现使用服务器端认证方式，所有 OAuth 流程都在服务器端处理，确保安全性

