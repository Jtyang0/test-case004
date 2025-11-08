export default function AuthCodeError() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="max-w-md w-full mx-auto p-8 bg-card border border-border rounded-lg">
        <h1 className="text-2xl font-bold text-foreground mb-4">认证错误</h1>
        <p className="text-foreground/70 mb-6">
          在认证过程中发生了错误。请重试登录。
        </p>
        <a
          href="/"
          className="inline-block px-6 py-2 bg-primary text-primary-foreground rounded-full font-medium hover:opacity-90 transition"
        >
          返回首页
        </a>
      </div>
    </div>
  )
}

