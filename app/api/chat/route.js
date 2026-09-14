import { NextResponse } from 'next/server';

// Stub endpoint for the global Chatbot component (components/Chatbot.jsx).
// Wire up the Groq SDK here, e.g.:
//
//   import Groq from 'groq-sdk';
//   const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
//   const completion = await groq.chat.completions.create({
//     model: 'llama-3.3-70b-versatile',
//     messages: [{ role: 'system', content: 'You are a helpful assistant for MedSpace.' }, ...messages],
//   });
//   return NextResponse.json({ reply: completion.choices[0].message.content });
export async function POST(req) {
    try {
        const { messages } = await req.json();
        const lastMessage = messages?.[messages.length - 1]?.content || '';

        return NextResponse.json({
            reply: `This is a placeholder response. Connect the Groq API in app/api/chat/route.js to answer: "${lastMessage}"`,
        });
    } catch (error) {
        console.error('[POST /api/chat]', error);
        return NextResponse.json({ error: 'Failed to process chat message' }, { status: 500 });
    }
}
