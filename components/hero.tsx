"use client"

export default function Hero() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-card/50">
      <div className="max-w-4xl mx-auto text-center">
        {/* Notice Banner */}
        <div className="mb-8 inline-flex items-center gap-2 px-4 py-2 bg-yellow-50 rounded-full border border-primary/20">
          <span className="text-xs font-medium text-foreground">✓</span>
          <p className="text-xs sm:text-sm text-foreground">Independent product • Not affiliated with any brand</p>
        </div>

        {/* Banana Decorations */}
        <div className="absolute left-4 top-32 text-5xl opacity-30 animate-bounce" style={{ animationDelay: "0s" }}>
          🍌
        </div>
        <div className="absolute right-4 top-32 text-5xl opacity-30 animate-bounce" style={{ animationDelay: "0.2s" }}>
          🍌
        </div>

        {/* Main Title */}
        <h2 className="text-5xl sm:text-6xl font-bold text-foreground mb-6 text-balance">Nano Banana</h2>

        {/* Description */}
        <p className="text-lg sm:text-xl text-foreground/70 mb-10 max-w-2xl mx-auto leading-relaxed">
          Transform any image with simple text prompts. Nano Banana's advanced model delivers consistent character
          editing and scene preservation that surpasses industry standards. Experience the future of AI image editing.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <button className="px-8 py-3 bg-primary text-primary-foreground rounded-full font-semibold hover:opacity-90 transition">
            Start Editing
          </button>
          <button className="px-8 py-3 bg-background border-2 border-primary text-primary rounded-full font-semibold hover:bg-primary/5 transition">
            View Examples
          </button>
        </div>

        {/* Feature Pills */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm sm:text-base">
          <div className="flex items-center gap-2">
            <span className="text-primary text-lg">◆</span>
            <span className="text-foreground/70">One-shot editing</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-primary text-lg">⚡</span>
            <span className="text-foreground/70">Multi-image support</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-primary text-lg">🗣️</span>
            <span className="text-foreground/70">Natural language</span>
          </div>
        </div>
      </div>
    </section>
  )
}
