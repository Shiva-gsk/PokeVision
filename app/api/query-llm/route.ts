// // app/api/query-llm/route.ts
import { NextResponse } from 'next/server'
import OpenAI from 'openai'
// const apiKey = process.env.OPENAI_API_KEY;
const token = process.env.GITHUB_TOKEN
const endpoint = 'https://models.github.ai/inference'
const modelName = 'openai/gpt-4o-mini'
import { db } from '@/lib/db'
import { auth } from '@/auth'
const openai = new OpenAI({
  apiKey: token,
  baseURL: endpoint,
})

export async function POST(req: Request) {
  const session = await auth();
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
            { type: 'text', text: prompt || 'Identify this Pokémon, If its not a pokemon return most related pokemon details.' },
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
    // let message = response.choices?.[0]?.message?.content
    const message = JSON.parse(response.choices?.[0]?.message?.content || '{}');
    const existingPoke = await db.pokemon.findUnique({
      where: { id: message?.id || 0 } // Ensure id is a number
    });
    if(!existingPoke){
      const poke = await db.pokemon.create({
        data: {
          id: message?.id || 0, // Ensure id is a number
          name: message?.name || 'Unknown',
          imgUrl: imageBase64 ,
          type: message?.type || 'Unknown',
          captured: true, // Default to false, can be updated later
          userId: session?.user.id,
          stats: {
            hp: message?.stats?.hp || 0,
            attack: message?.stats?.attack || 0,
            defense: message?.stats?.defense || 0,
            specialAttack: message?.stats?.specialAttack || 0,
            specialDefense: message?.stats?.specialDefense || 0,
            speed: message?.stats?.speed || 0,
          }
        }
      })
    }
    else{
      await db.pokemon.update({
        where: { id: existingPoke.id },
        data: {
          captured: true, // Update captured status
          createdAt: new Date().toISOString(), // Update capture date
        }
      })
    }
    console.log(message);
    return NextResponse.json({ response: message || 'No content returned' })
  } catch (err: any) {
    console.error('API error:', err)
    return NextResponse.json({ error: err.message || 'Unexpected error' }, { status: 500 })
  }
}


// export async function POST(req: Request) {
//   try {
//     const { imageBase64, prompt } = await req.json()

//     const response = await fetch('https://models.github.ai/inference', {
//       method: 'POST',
//       headers: {
//         'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`,
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         model: modelName,
//          messages: [
//         {
//           role: 'user',
//           content: [
//             { type: 'text', text: prompt || 'Identify this Pokémon, If its not a pokemon return most related pokemon details.' },
//             {
//               type: 'image_url',
//               image_url: {
//                 url: imageBase64, // must be a data URI like data:image/png;base64,...
//               },
//             },
//           ],
//         },
//       ],
//       }),
//     })

//     const data = await response.json()
//     return NextResponse.json({ response: data.choices?.[0]?.message?.content || 'No response' })

//   } catch (err: any) {
//     console.error('API error:', err)
//     return NextResponse.json({ error: err.message || 'Unexpected error' }, { status: 500 })
//   }
// }
