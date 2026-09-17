import { NextResponse } from 'next/server';
import { groqStream, isGroqConfigured } from '@/lib/groq';
export async function POST(req) {
    try {
        if (!isGroqConfigured()) {
            console.error('[POST /api/generate-description] Missing GROQ_API_KEY environment variable');
            return NextResponse.json({ error: 'AI generation is not configured' }, { status: 500 });
        }
        const data = await req.json();
        const prompt = `You are a professional real estate copywriter for medical spaces.
Write an engaging, highly professional property description for a medical office lease/sublease based on the following details.
Return ONLY the generated description text, no conversational filler or intro/outro. Do not use markdown formatting like asterisks. Make it approximately 2-3 short paragraphs.

Details:
Address: ${data.address || 'Unknown'}, ${data.city || 'Unknown'}, ${data.state || ''}
Rooms Available: ${data.rooms || 1}
Monthly Rent: ₹${data.rent || 'Negotiable'}/month
Amenities/Features: ${data.amenities?.join(', ') || 'Standard medical office features'}
Property Type: ${data.constructionType || 'Established'}
Target Professionals: ${data.targetProfessionals?.join(', ') || 'Any medical professional'}
`;
        const stream = await groqStream(
            [{ role: 'user', content: prompt }],
            { maxTokens: 400 }
        );
        return new Response(stream, {
            headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Transfer-Encoding': 'chunked' },
        });
    }
    catch (error) {
        console.error('[POST /api/generate-description]', error);
        return NextResponse.json({ error: 'Failed to generate description' }, { status: 500 });
    }
}
