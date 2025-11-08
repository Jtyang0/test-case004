"use client"

import { useState } from "react"
import ImageUpload from "./image-upload"
import PromptInput from "./prompt-input"

export default function ImageEditor() {
  const [image, setImage] = useState<string | null>(null)
  const [prompt, setPrompt] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [generatedImage, setGeneratedImage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleGenerate = async () => {
    if (!image || !prompt) return
    
    setIsProcessing(true)
    setError(null)
    setGeneratedImage(null)

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          image: image,
          prompt: prompt,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || '生成图片时发生错误')
      }

      // 处理API返回的结果
      // 添加详细的调试信息
      console.log('完整API响应:', data)
      const result = data.result
      const fullResponse = data.fullResponse
      console.log('提取的result:', result)
      console.log('完整响应对象:', fullResponse)
      
      // 辅助函数：从各种格式中提取图片URL
      const extractImageUrl = (obj: any): string | null => {
        if (!obj) return null
        
        // 1. 检查 content 数组中的图片
        if (obj.content) {
          const contentArray = Array.isArray(obj.content) ? obj.content : [obj.content]
          for (const item of contentArray) {
            if (item.type === 'image_url' && item.image_url?.url) {
              return item.image_url.url
            }
            if (item.type === 'image' && item.url) {
              return item.url
            }
            if (item.type === 'image' && item.data) {
              return item.data.startsWith('data:') ? item.data : `data:image/png;base64,${item.data}`
            }
            if (item.url && (item.url.startsWith('data:image') || item.url.startsWith('http'))) {
              return item.url
            }
          }
        }
        
        // 2. 检查字符串格式的base64
        if (typeof obj.content === 'string' && obj.content.startsWith('data:image')) {
          return obj.content
        }
        
        // 3. 检查 fullResponse 中的图片
        if (fullResponse) {
          const fullStr = JSON.stringify(fullResponse)
          const imageMatch = fullStr.match(/data:image\/[^"'\s}]+/g) || 
                           fullStr.match(/https?:\/\/[^"'\s}]+\.(jpg|jpeg|png|gif|webp)/gi)
          if (imageMatch && imageMatch[0]) {
            return imageMatch[0]
          }
        }
        
        return null
      }
      
      // 尝试从多个位置提取图片
      let imageUrl = extractImageUrl(result) || extractImageUrl(fullResponse) || extractImageUrl(data)
      
      if (imageUrl) {
        console.log('成功找到图片URL:', imageUrl.substring(0, 100) + '...')
        setGeneratedImage(imageUrl)
      } else {
        // 如果都没找到，显示详细错误信息
        console.log('API返回结果（完整）:', JSON.stringify(data, null, 2))
        console.log('尝试提取的所有位置:', {
          result: result,
          fullResponse: fullResponse,
          dataKeys: Object.keys(data)
        })
        
        // 检查是否有文本内容
        const textContent = result?.content && typeof result.content === 'string' 
          ? result.content 
          : (Array.isArray(result?.content) 
            ? result.content.find((item: any) => item.type === 'text')?.text 
            : null)
        
        if (textContent) {
          setError(`API返回了文本内容，但未找到图片。文本内容: ${textContent.substring(0, 200)}...`)
        } else {
          setError('未找到生成的图片内容。请查看控制台获取详细信息。')
        }
      }
    } catch (err: any) {
      console.error('生成错误:', err)
      setError(err.message || '生成图片时发生错误')
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <section id="editor" className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-primary font-semibold mb-2">Get Started</p>
          <h2 className="text-4xl font-bold text-foreground mb-4">Try The AI Editor</h2>
          <p className="text-foreground/70 max-w-2xl mx-auto">
            Experience the power of Nano Banana's natural language image editing. Transform any photo with simple text
            commands.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Panel - Prompt Engine */}
          <div className="bg-yellow-50 border-2 border-primary/30 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-6 pb-6 border-b border-primary/20">
              <span className="text-2xl">⚙️</span>
              <div>
                <h3 className="font-bold text-foreground">Prompt Engine</h3>
                <p className="text-sm text-foreground/60">Transform your image with AI-powered editing</p>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 mb-6">
              <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium">
                🖼️ Image to Image
              </button>
              <button className="px-4 py-2 bg-background text-foreground rounded-lg font-medium text-foreground/60 hover:bg-background/80">
                📝 Text to Image
              </button>
            </div>

            {/* AI Model Selection */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm">⭐</span>
                <label className="font-semibold text-foreground">AI Model Selection</label>
              </div>
              <select className="w-full px-4 py-3 bg-background border border-primary/20 rounded-lg text-foreground">
                <option>Nano Banana</option>
                <option>Nano Banana v2</option>
              </select>
              <p className="text-xs text-foreground/60 mt-2">
                Different models offer unique characteristics and styles
              </p>
            </div>

            {/* Reference Image */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-sm">🖼️</span>
                <label className="font-semibold text-foreground">Reference Image</label>
                <span className="text-xs text-primary ml-auto">0/9</span>
              </div>
              {image ? (
                <div className="relative">
                  <div className="border-2 border-primary/30 rounded-lg p-2">
                    <img
                      src={image}
                      alt="Uploaded reference"
                      className="w-full h-auto rounded-lg max-h-64 object-contain"
                    />
                  </div>
                  <button
                    onClick={() => setImage(null)}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 transition"
                    title="删除图片"
                  >
                    ×
                  </button>
                  <label className="mt-2 block">
                    <div className="border-2 border-dashed border-primary/30 rounded-lg p-4 cursor-pointer hover:border-primary/60 transition text-center">
                      <span className="text-sm text-primary">更换图片</span>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file) {
                          const reader = new FileReader()
                          reader.onload = (event) => {
                            const result = event.target?.result as string
                            setImage(result)
                          }
                          reader.readAsDataURL(file)
                        }
                      }}
                      className="hidden"
                    />
                  </label>
                </div>
              ) : (
                <ImageUpload onImageSelect={setImage} />
              )}
            </div>

            {/* Main Prompt */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm">📝</span>
                <label className="font-semibold text-foreground">Main Prompt</label>
              </div>
              <PromptInput value={prompt} onChange={setPrompt} />
            </div>

            {/* Generate Button */}
            <button
              onClick={handleGenerate}
              disabled={!image || !prompt || isProcessing}
              className="w-full py-3 bg-primary text-primary-foreground rounded-full font-semibold hover:opacity-90 disabled:opacity-50 transition"
            >
              {isProcessing ? "⚡ Generating..." : "✨ Generate Now"}
            </button>
          </div>

          {/* Right Panel - Output Gallery */}
          <div className="bg-card border-2 border-primary/20 rounded-2xl p-6 flex flex-col">
            <div className="flex items-center gap-3 mb-6 pb-6 border-b border-primary/20">
              <span className="text-2xl">🎨</span>
              <div>
                <h3 className="font-bold text-foreground">Output Gallery</h3>
                <p className="text-sm text-foreground/60">Your ultra-fast AI creations appear here instantly</p>
              </div>
            </div>

            {/* Output Gallery */}
            <div className="flex-1 flex flex-col items-center justify-center bg-muted/30 rounded-xl mb-6 min-h-64">
              {isProcessing ? (
                <div className="text-center">
                  <span className="text-5xl mb-4 animate-pulse">⚡</span>
                  <p className="text-foreground font-semibold mb-2">正在生成中...</p>
                  <p className="text-sm text-foreground/60">请稍候，AI正在处理您的图片</p>
                </div>
              ) : error ? (
                <div className="text-center p-4">
                  <span className="text-5xl mb-4">⚠️</span>
                  <p className="text-foreground font-semibold mb-2 text-red-500">生成失败</p>
                  <p className="text-sm text-foreground/60">{error}</p>
                </div>
              ) : generatedImage ? (
                <div className="w-full h-full flex items-center justify-center p-4">
                  <img
                    src={generatedImage}
                    alt="Generated image"
                    className="max-w-full max-h-full rounded-lg object-contain"
                  />
                </div>
              ) : image ? (
                <div className="text-center">
                  <span className="text-5xl mb-4">🎨</span>
                  <p className="text-foreground font-semibold mb-2">已上传图片</p>
                  <p className="text-sm text-foreground/60">输入提示词并点击生成按钮</p>
                </div>
              ) : (
                <div className="text-center">
                  <span className="text-5xl mb-4">🎨</span>
                  <p className="text-foreground font-semibold mb-2">Ready for instant generation</p>
                  <p className="text-sm text-foreground/60">Enter your prompt and unleash the power</p>
                </div>
              )}
            </div>

            {generatedImage && (
              <button
                onClick={() => {
                  navigator.clipboard.writeText(generatedImage)
                }}
                className="py-3 px-4 text-primary font-semibold hover:text-primary/80 transition"
              >
                📋 Copy Image URL
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
