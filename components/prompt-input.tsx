"use client"

interface PromptInputProps {
  value: string
  onChange: (value: string) => void
}

export default function PromptInput({ value, onChange }: PromptInputProps) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="A futuristic city powered by nano technology, golden hour lighting, ultra detailed..."
      className="w-full px-4 py-3 bg-background border border-primary/20 rounded-lg text-foreground placeholder:text-foreground/40 resize-none focus:outline-none focus:border-primary min-h-32"
    />
  )
}
