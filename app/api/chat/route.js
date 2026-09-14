import { NextResponse } from 'next/server';
import Groq from 'groq-sdk';

const SYSTEM_PROMPT = 'You are the MedSpace assistant. MedSpace is a web application that helps users discover, book, and manage medical office spaces. Answer questions about finding, listing, and booking medical spaces clearly and concisely. If asked about something unrelated to MedSpace, politely steer the conversation back.';

export async function POST(req) {
    try {
        const { messages } = await req.json();

        if (!Array.isArray(messages) || messages.length === 0) {
            return NextResponse.json({ error: 'messages must be a non-empty array' }, { status: 400 });
        }

        if (!process.env.GROQ_API_KEY) {
            console.error('[POST /api/chat] Missing GROQ_API_KEY');
            return NextResponse.json({ error: 'Chat service is not configured' }, { status: 500 });
        }

        const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

        const completion = await groq.chat.completions.create({
            model: 'llama-3.3-70b-versatile',
            messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...messages],
        });

        const reply = completion.choices[0]?.message?.content || "Sorry, I couldn't come up with a response.";

        return NextResponse.json({ reply });
    } catch (error) {
        console.error('[POST /api/chat]', error);
        return NextResponse.json({ error: 'Failed to process chat message' }, { status: 500 });
    }
}
