"use client"

export default function Showcase() {
  const examples = [
    {
      title: "Portrait Enhancement",
      description: "Professional headshots with enhanced lighting and details",
      image: "/professional-portrait-enhanced-lighting.jpg",
    },
    {
      title: "Scene Transformation",
      description: "Transform backgrounds while preserving subjects",
      image: "/fantasy-scene-transformation-magical.jpg",
    },
    {
      title: "Character Editing",
      description: "Consistent character changes across multiple images",
      image: "/animated-character-different-poses.jpg",
    },
    {
      title: "Style Transfer",
      description: "Apply artistic styles to your photographs",
      image: "/oil-painting-style-art-transfer.jpg",
    },
  ]

  return (
    <section id="showcase" className="py-20 px-4 sm:px-6 lg:px-8 bg-card/50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">Showcase</h2>
          <p className="text-foreground/70 max-w-2xl mx-auto">
            See what you can create with Nano Banana's powerful AI capabilities
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {examples.map((example, idx) => (
            <div
              key={idx}
              className="bg-background rounded-xl overflow-hidden border border-border hover:border-primary/50 transition group"
            >
              <div className="aspect-video bg-muted overflow-hidden">
                <img
                  src={example.image || "/placeholder.svg"}
                  alt={example.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
              </div>
              <div className="p-4">
                <h3 className="font-bold text-foreground mb-1">{example.title}</h3>
                <p className="text-sm text-foreground/60">{example.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
