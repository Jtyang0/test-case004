"use client"

import { useState } from "react"

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const faqs = [
    {
      question: "How does Nano Banana differ from other AI image editors?",
      answer:
        "Nano Banana uses advanced character preservation technology that maintains consistency across edits. It excels at understanding context and preserves important details while making changes, something competing tools often struggle with.",
    },
    {
      question: "What image formats are supported?",
      answer:
        "We support all major image formats including JPG, PNG, WebP, and TIFF. Maximum file size is 50MB. For best results, use high-resolution images (2048x2048 or higher).",
    },
    {
      question: "Can I edit multiple images at once?",
      answer:
        "Yes! Our batch processing feature allows you to apply the same edits to multiple images simultaneously, perfect for maintaining consistency across a series of photos.",
    },
    {
      question: "What are the pricing plans?",
      answer:
        "We offer flexible pricing starting with a free tier for experimentation. Premium plans include batch processing, priority queue, and advanced features. Visit our pricing page for detailed information.",
    },
    {
      question: "Is my data secure?",
      answer:
        "Absolutely. All images are processed securely and deleted immediately after generation. We don't store or use your images for training. Your privacy is our priority.",
    },
  ]

  return (
    <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8 bg-card/50">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">Frequently Asked Questions</h2>
          <p className="text-foreground/70">Everything you need to know about Nano Banana</p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="bg-background border border-border rounded-lg overflow-hidden hover:border-primary/30 transition"
            >
              <button
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-muted/50 transition text-left"
              >
                <span className="font-semibold text-foreground">{faq.question}</span>
                <span className={`text-primary transition-transform ${openIndex === idx ? "rotate-180" : ""}`}>▼</span>
              </button>
              {openIndex === idx && (
                <div className="px-6 py-4 border-t border-border bg-muted/20">
                  <p className="text-foreground/70 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
