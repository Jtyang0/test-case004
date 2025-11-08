"use client"

export default function Testimonials() {
  const testimonials = [
    {
      text: "Nano Banana completely transformed our workflow. The speed and quality are unmatched.",
      author: "Sarah Chen",
      role: "Creative Director",
      avatar: "SC",
    },
    {
      text: "The consistency in character editing is remarkable. It's exactly what we needed for our project.",
      author: "Michael Rodriguez",
      role: "Director of Photography",
      avatar: "MR",
    },
    {
      text: "Finally, an AI tool that understands context and preserves important details. Game changer!",
      author: "Emma Thompson",
      role: "Art Director",
      avatar: "ET",
    },
  ]

  return (
    <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">What People Say</h2>
          <p className="text-foreground/70">Join thousands of creators using Nano Banana</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, idx) => (
            <div key={idx} className="bg-card border border-border rounded-xl p-6 hover:border-primary/30 transition">
              <p className="text-foreground/80 mb-4 leading-relaxed">"{testimonial.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-sm">
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="font-semibold text-foreground">{testimonial.author}</p>
                  <p className="text-sm text-foreground/60">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
