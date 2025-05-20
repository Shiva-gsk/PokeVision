// app/api/query-llm/route.ts
import { NextResponse } from 'next/server'
import OpenAI from 'openai'

const token = process.env.GITHUB_TOKEN
const endpoint = 'https://models.github.ai/inference'
const modelName = 'openai/gpt-4o-mini'

const openai = new OpenAI({
  apiKey: token,
  baseURL: endpoint,
})

export async function POST(req: Request) {
  try {
    const { imageBase64, prompt } = await req.json()

    if (!imageBase64) {
      return NextResponse.json({ error: 'Missing image base64 data' }, { status: 400 })
    }

    const response = await openai.chat.completions.create({
      model: modelName,
      messages: [
        {
          role: 'user',
          content: [
            { type: 'text', text: prompt || 'Identify this Pokémon.' },
            {
              type: 'image_url',
              image_url: {
                url: imageBase64, // must be a data URI like data:image/png;base64,...
              },
            },
          ],
        },
      ],
      max_tokens: 1000,
      temperature: 0.7,
      top_p: 1.0,
    })

    const message = response.choices?.[0]?.message?.content
    console.log('API response:', message);
    return NextResponse.json({ response: message || 'No content returned' })
  } catch (err: any) {
    console.error('API error:', err)
    return NextResponse.json({ error: err.message || 'Unexpected error' }, { status: 500 })
  }
}
