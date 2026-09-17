import Groq from 'groq-sdk';

// Default chat model. Groq retires models regularly (llama-3.3-70b-versatile is gone),
// so allow overriding via env without a code change.
export const GROQ_MODEL = process.env.GROQ_MODEL || 'openai/gpt-oss-120b';

export function isGroqConfigured() {
    const key = process.env.GROQ_API_KEY;
    return Boolean(key) && !key.includes('your-groq-api-key');
}

let client = null;
export function getGroqClient() {
    if (!isGroqConfigured()) {
        throw new Error('GROQ_API_KEY is not configured');
    }
    if (!client) {
        client = new Groq({ apiKey: process.env.GROQ_API_KEY });
    }
    return client;
}

// Single-shot completion helper: returns the assistant's text.
export async function groqComplete(messages, { maxTokens = 512, temperature = 0.7 } = {}) {
    const groq = getGroqClient();
    const completion = await groq.chat.completions.create({
        model: GROQ_MODEL,
        messages,
        max_tokens: maxTokens,
        temperature,
    });
    return completion.choices[0]?.message?.content?.trim() || '';
}

// Streaming helper: returns a ReadableStream of plain-text chunks.
export async function groqStream(messages, { maxTokens = 512, temperature = 0.7 } = {}) {
    const groq = getGroqClient();
    const response = await groq.chat.completions.create({
        model: GROQ_MODEL,
        messages,
        max_tokens: maxTokens,
        temperature,
        stream: true,
    });
    return new ReadableStream({
        async start(controller) {
            try {
                for await (const chunk of response) {
                    const text = chunk.choices?.[0]?.delta?.content;
                    if (text) controller.enqueue(text);
                }
                controller.close();
            }
            catch (err) {
                controller.error(err);
            }
        },
    });
}
