import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
  defaultHeaders: {
    "HTTP-Referer": process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
    "X-Title": "Nano Banana Image Editor",
  },
})

export async function POST(request: NextRequest) {
  try {
    const { image, prompt } = await request.json()

    if (!image || !prompt) {
      return NextResponse.json(
        { error: '图片和提示词都是必需的' },
        { status: 400 }
      )
    }

    // 尝试使用图像生成模型（如果支持）
    // 注意：gemini-2.5-flash-image 主要用于图像理解，可能不支持图像生成
    // 如果需要图像生成，建议使用 gpt-image-1 或其他图像生成模型
    
    try {
      // 首先尝试使用图像生成API（如果OpenRouter支持）
      const imageResponse = await openai.images.generate({
        model: "gpt-image-1", // 或其他图像生成模型
        prompt: `${prompt}`, // 结合提示词和参考图片的描述
        size: "1024x1024",
        n: 1,
      })

      if (imageResponse.data && imageResponse.data[0]?.url) {
        return NextResponse.json({
          result: {
            content: [
              {
                type: "image_url",
                image_url: {
                  url: imageResponse.data[0].url,
                },
              },
            ],
          },
        })
      }
    } catch (imageGenError: any) {
      console.log('图像生成API不可用，尝试使用chat completions:', imageGenError.message)
    }

    // 如果图像生成API不可用，使用chat completions（可能只返回文本）
    const completion = await openai.chat.completions.create({
      model: "google/gemini-2.5-flash-image",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: prompt,
            },
            {
              type: "image_url",
              image_url: {
                url: image,
              },
            },
          ],
        },
      ],
    })

    const result = completion.choices[0]?.message
    
    // 添加调试日志
    console.log('API完整响应:', JSON.stringify(completion, null, 2))
    console.log('返回的message:', JSON.stringify(result, null, 2))

    // 全面检查返回的图片数据
    // 1. 检查 message.content 中的图片
    if (result?.content) {
      const contentArray = Array.isArray(result.content) ? result.content : [result.content]
      
      // 查找所有可能的图片格式
      for (const item of contentArray) {
        // 检查 image_url 格式
        if (item.type === 'image_url' && item.image_url?.url) {
          console.log('找到图片 (image_url格式):', item.image_url.url.substring(0, 100))
          return NextResponse.json({ result })
        }
        // 检查直接的 image 类型
        if (item.type === 'image' && item.url) {
          console.log('找到图片 (image格式):', item.url.substring(0, 100))
          return NextResponse.json({ 
            result: {
              ...result,
              content: [{
                type: 'image_url',
                image_url: { url: item.url }
              }]
            }
          })
        }
        // 检查 base64 数据
        if (item.type === 'image' && item.data) {
          const imageUrl = item.data.startsWith('data:') ? item.data : `data:image/png;base64,${item.data}`
          console.log('找到图片 (base64格式)')
          return NextResponse.json({ 
            result: {
              ...result,
              content: [{
                type: 'image_url',
                image_url: { url: imageUrl }
              }]
            }
          })
        }
      }
    }

    // 2. 检查 completion 对象中的其他位置
    if (completion.choices?.[0]?.message?.content) {
      const messageContent = completion.choices[0].message.content
      if (typeof messageContent === 'string' && messageContent.startsWith('data:image')) {
        console.log('找到图片 (字符串base64格式)')
        return NextResponse.json({
          result: {
            role: 'assistant',
            content: [{
              type: 'image_url',
              image_url: { url: messageContent }
            }]
          }
        })
      }
    }

    // 3. 检查是否有图片URL在响应的其他位置
    const fullResponseStr = JSON.stringify(completion)
    const imageUrlMatch = fullResponseStr.match(/data:image\/[^"'\s]+/g) || 
                         fullResponseStr.match(/https?:\/\/[^"'\s]+\.(jpg|jpeg|png|gif|webp)/gi)
    
    if (imageUrlMatch && imageUrlMatch.length > 0) {
      console.log('在响应中找到图片URL:', imageUrlMatch[0].substring(0, 100))
      return NextResponse.json({
        result: {
          role: 'assistant',
          content: [{
            type: 'image_url',
            image_url: { url: imageUrlMatch[0] }
          }]
        }
      })
    }

    // 如果都没有找到，返回完整响应以便前端进一步处理
    return NextResponse.json({ 
      result,
      fullResponse: completion,
      debug: {
        hasContent: !!result?.content,
        contentType: typeof result?.content,
        contentIsArray: Array.isArray(result?.content),
        contentLength: Array.isArray(result?.content) ? result.content.length : 1
      }
    })
  } catch (error: any) {
    console.error('API错误:', error)
    return NextResponse.json(
      { error: error.message || '生成图片时发生错误' },
      { status: 500 }
    )
  }
}

