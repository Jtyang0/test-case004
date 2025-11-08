"use client"

export default function Header() {
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
          <button className="px-4 py-2 text-sm font-medium text-foreground/70 hover:text-foreground transition">
            Sign In
          </button>
          <button className="px-6 py-2 bg-primary text-primary-foreground rounded-full font-medium hover:opacity-90 transition">
            Launch Now
          </button>
        </div>
      </div>
    </header>
  )
}
