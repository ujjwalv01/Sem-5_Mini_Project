import { NextResponse } from 'next/server';
import Groq from 'groq-sdk';

const SYSTEM_PROMPT =
    'You are the MedSpace assistant, a helpful AI chatbot embedded on the MedSpace platform ' +
    '(a marketplace for listing and finding medical office spaces). Answer questions about finding, ' +
    'listing, renting, or subleasing medical spaces, and general platform usage. Keep responses concise ' +
    'and friendly. If asked about something unrelated to MedSpace, answer briefly and steer back to how ' +
    'you can help with medical space listings.';

export async function POST(req) {
    try {
        if (!process.env.GROQ_API_KEY) {
            console.error('[POST /api/chat] Missing GROQ_API_KEY environment variable');
            return NextResponse.json({ error: 'Chat is not configured' }, { status: 500 });
        }

        const { messages } = await req.json();
        if (!Array.isArray(messages) || messages.length === 0) {
            return NextResponse.json({ error: 'messages array is required' }, { status: 400 });
        }

        const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

        const completion = await groq.chat.completions.create({
            model: 'llama-3.3-70b-versatile',
            messages: [
                { role: 'system', content: SYSTEM_PROMPT },
                ...messages.map(({ role, content }) => ({ role, content })),
            ],
        });

        const reply = completion.choices[0]?.message?.content?.trim() || "Sorry, I didn't catch that.";

        return NextResponse.json({ reply });
    } catch (error) {
        console.error('[POST /api/chat]', error);
        return NextResponse.json({ error: 'Failed to process chat message' }, { status: 500 });
    }
}
