"use client"

import type { ChangeEvent } from "react"

interface ImageUploadProps {
  onImageSelect: (image: string) => void
}

export default function ImageUpload({ onImageSelect }: ImageUploadProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        const result = event.target?.result as string
        onImageSelect(result)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <label className="border-2 border-dashed border-primary/30 rounded-lg p-8 cursor-pointer hover:border-primary/60 transition block">
      <div className="text-center">
        <span className="text-4xl block mb-3">➕</span>
        <p className="font-semibold text-foreground mb-1">Add image</p>
        <p className="text-xs text-foreground/60">Max 50MB</p>
      </div>
      <input type="file" accept="image/*" onChange={handleChange} className="hidden" />
    </label>
  )
}
