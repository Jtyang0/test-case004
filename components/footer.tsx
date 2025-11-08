"use client"

export default function Footer() {
  return (
    <footer className="bg-foreground text-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🍌</span>
              <h3 className="font-bold text-lg">Nano Banana</h3>
            </div>
            <p className="text-background/70 text-sm">The future of AI image editing, today.</p>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-background/70 hover:text-background transition">
                  Features
                </a>
              </li>
              <li>
                <a href="#" className="text-background/70 hover:text-background transition">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="text-background/70 hover:text-background transition">
                  API
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-background/70 hover:text-background transition">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="text-background/70 hover:text-background transition">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-background/70 hover:text-background transition">
                  Careers
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-background/70 hover:text-background transition">
                  Privacy
                </a>
              </li>
              <li>
                <a href="#" className="text-background/70 hover:text-background transition">
                  Terms
                </a>
              </li>
              <li>
                <a href="#" className="text-background/70 hover:text-background transition">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/20 pt-8 flex flex-col sm:flex-row items-center justify-between">
          <p className="text-sm text-background/70">© 2025 Nano Banana. All rights reserved.</p>
          <div className="flex gap-6 mt-4 sm:mt-0">
            <a href="#" className="text-background/70 hover:text-background transition">
              Twitter
            </a>
            <a href="#" className="text-background/70 hover:text-background transition">
              GitHub
            </a>
            <a href="#" className="text-background/70 hover:text-background transition">
              Discord
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
