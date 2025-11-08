"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import type { User } from "@supabase/supabase-js"

export default function Header() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    try {
      const supabase = createClient()
      
      // 获取当前用户
      supabase.auth.getUser().then(({ data: { user } }) => {
        setUser(user)
        setLoading(false)
      }).catch((error) => {
        console.error('Error getting user:', error)
        setLoading(false)
      })

      // 监听认证状态变化
      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((_event, session) => {
        setUser(session?.user ?? null)
      })

      return () => subscription.unsubscribe()
    } catch (error) {
      console.error('Supabase client error:', error)
      setLoading(false)
    }
  }, [])

  const handleLogin = async () => {
    window.location.href = '/api/auth/login'
  }

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    setUser(null)
    window.location.reload()
  }

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🍌</span>
          <h1 className="text-xl font-bold text-foreground">Nano Banana</h1>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          <a href="#editor" className="text-sm text-foreground/70 hover:text-foreground transition">
            Image Editor
          </a>
          <a href="#showcase" className="text-sm text-foreground/70 hover:text-foreground transition">
            Showcase
          </a>
          <a href="#testimonials" className="text-sm text-foreground/70 hover:text-foreground transition">
            Testimonials
          </a>
          <a href="#faq" className="text-sm text-foreground/70 hover:text-foreground transition">
            FAQ
          </a>
        </nav>

        <div className="flex items-center gap-3">
          {loading ? (
            <div className="px-4 py-2 text-sm text-foreground/50">加载中...</div>
          ) : user ? (
            <>
              <div className="flex items-center gap-2 px-4 py-2">
                {user.user_metadata?.avatar_url && (
                  <img
                    src={user.user_metadata.avatar_url}
                    alt={user.user_metadata?.full_name || user.email || 'User'}
                    className="w-8 h-8 rounded-full"
                  />
                )}
                <span className="text-sm text-foreground/70 hidden sm:block">
                  {user.user_metadata?.full_name || user.email?.split('@')[0] || 'User'}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm font-medium text-foreground/70 hover:text-foreground transition"
              >
                登出
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleLogin}
                className="px-4 py-2 text-sm font-medium text-foreground/70 hover:text-foreground transition"
              >
                使用 GitHub 登录
              </button>
              <button className="px-6 py-2 bg-primary text-primary-foreground rounded-full font-medium hover:opacity-90 transition">
                Launch Now
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
