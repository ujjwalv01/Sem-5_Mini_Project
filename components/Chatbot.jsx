'use client';
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot } from 'lucide-react';

const INITIAL_MESSAGE = {
    role: 'assistant',
    content: "Hi! I'm the MedSpace assistant. Ask me anything about finding or listing a medical space.",
};

const QUICK_QUESTIONS = [
    'How do I find spaces in my city?',
    'How do I list my space?',
    'What does listing cost?',
];

// Internal routes the bot may mention; only these become links.
const ROUTE_PATTERN = /(\/(?:search-spaces|list-your-space|add-listing|pricing|faqs|contact|signup|signin|dashboard(?:\/[a-z-]+)*))\b/g;
const BOLD_PATTERN = /\*\*(.+?)\*\*/g;

// Turn "**bold**" and known /paths into React nodes. Everything else is plain text.
function renderInline(text, onNavigate) {
    const nodes = [];
    let key = 0;
    const pushText = (chunk) => {
        let last = 0;
        for (const m of chunk.matchAll(ROUTE_PATTERN)) {
            if (m.index > last) nodes.push(chunk.slice(last, m.index));
            nodes.push(
                <Link key={key++} href={m[1]} onClick={onNavigate} className="font-semibold text-teal-700 underline underline-offset-2 hover:text-teal-800">
                    {m[1]}
                </Link>
            );
            last = m.index + m[0].length;
        }
        if (last < chunk.length) nodes.push(chunk.slice(last));
    };
    let last = 0;
    for (const m of text.matchAll(BOLD_PATTERN)) {
        if (m.index > last) pushText(text.slice(last, m.index));
        nodes.push(<strong key={key++} className="font-semibold">{m[1]}</strong>);
        last = m.index + m[0].length;
    }
    if (last < text.length) pushText(text.slice(last));
    return nodes;
}

// Render a reply as paragraphs and lists so multi-step answers don't collapse into one line.
function MessageBody({ content, onNavigate }) {
    const lines = content.split(/\r?\n/);
    const blocks = [];
    let list = null;

    const flushList = () => {
        if (list) blocks.push(list);
        list = null;
    };

    for (const raw of lines) {
        const line = raw.trim();
        if (!line) { flushList(); continue; }
        const ordered = line.match(/^(\d+)[.)]\s+(.*)$/);
        const bullet = line.match(/^[-*•]\s+(.*)$/);
        if (ordered || bullet) {
            const type = ordered ? 'ol' : 'ul';
            if (!list || list.type !== type) { flushList(); list = { type, items: [] }; }
            list.items.push(ordered ? ordered[2] : bullet[1]);
        } else {
            flushList();
            blocks.push({ type: 'p', text: line });
        }
    }
    flushList();

    return (
        <div className="space-y-2">
            {blocks.map((block, i) => {
                if (block.type === 'p') {
                    return <p key={i}>{renderInline(block.text, onNavigate)}</p>;
                }
                const ListTag = block.type;
                const listClass = block.type === 'ol' ? 'list-decimal' : 'list-disc';
                return (
                    <ListTag key={i} className={`${listClass} pl-5 space-y-1`}>
                        {block.items.map((item, j) => <li key={j}>{renderInline(item, onNavigate)}</li>)}
                    </ListTag>
                );
            })}
        </div>
    );
}

export default function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([INITIAL_MESSAGE]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isOpen, isLoading]);

    useEffect(() => {
        if (isOpen) inputRef.current?.focus();
    }, [isOpen]);

    const sendMessage = async (text) => {
        const trimmed = text.trim();
        if (!trimmed || isLoading) return;

        const nextMessages = [...messages, { role: 'user', content: trimmed }];
        setMessages(nextMessages);
        setInput('');
        setIsLoading(true);

        try {
            const res = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ messages: nextMessages }),
            });

            const data = await res.json().catch(() => ({}));
            if (!res.ok) throw new Error(data.error || 'Chat request failed');

            setMessages((prev) => [...prev, { role: 'assistant', content: data.reply }]);
        } catch (error) {
            console.error('[Chatbot] Failed to get response:', error);
            setMessages((prev) => [
                ...prev,
                {
                    role: 'assistant',
                    content: "Sorry, I couldn't reach the assistant right now. Please try again in a moment, or use /contact if it keeps happening.",
                },
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSend = (e) => {
        e.preventDefault();
        sendMessage(input);
    };

    const closeChat = () => setIsOpen(false);
    const showQuickQuestions = messages.length === 1 && !isLoading;

    return (
        <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 16, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 16, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="mb-4 w-80 sm:w-96 h-[28rem] bg-white border border-slate-200 rounded-2xl shadow-xl flex flex-col overflow-hidden"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between px-4 py-3 bg-teal-600 text-white flex-shrink-0">
                            <div className="flex items-center gap-2">
                                <Bot className="w-5 h-5" />
                                <span className="text-sm font-bold">MedSpace Assistant</span>
                            </div>
                            <button
                                onClick={closeChat}
                                className="p-1 rounded-full hover:bg-teal-700 transition-colors"
                                aria-label="Close chat"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto px-3 py-3 space-y-3 bg-slate-50">
                            {messages.map((message, index) => (
                                <div
                                    key={index}
                                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div
                                        className={`max-w-[85%] px-3 py-2 rounded-2xl text-sm leading-relaxed ${
                                            message.role === 'user'
                                                ? 'bg-teal-600 text-white rounded-br-sm whitespace-pre-wrap'
                                                : 'bg-white text-slate-700 border border-slate-200 rounded-bl-sm'
                                        }`}
                                    >
                                        {message.role === 'user'
                                            ? message.content
                                            : <MessageBody content={message.content} onNavigate={closeChat} />}
                                    </div>
                                </div>
                            ))}

                            {showQuickQuestions && (
                                <div className="flex flex-wrap gap-2 pt-1">
                                    {QUICK_QUESTIONS.map((q) => (
                                        <button
                                            key={q}
                                            type="button"
                                            onClick={() => sendMessage(q)}
                                            className="text-xs font-medium px-3 py-1.5 rounded-full border border-teal-200 bg-white text-teal-700 hover:bg-teal-50 transition-colors"
                                        >
                                            {q}
                                        </button>
                                    ))}
                                </div>
                            )}

                            {isLoading && (
                                <div className="flex justify-start">
                                    <div className="bg-white border border-slate-200 rounded-2xl rounded-bl-sm px-3 py-2.5 flex items-center gap-1">
                                        {[0, 1, 2].map((dot) => (
                                            <motion.span
                                                key={dot}
                                                className="w-1.5 h-1.5 bg-slate-400 rounded-full"
                                                animate={{ opacity: [0.3, 1, 0.3] }}
                                                transition={{ duration: 1, repeat: Infinity, delay: dot * 0.2 }}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <form onSubmit={handleSend} className="flex items-center gap-2 p-2.5 border-t border-slate-200 bg-white flex-shrink-0">
                            <input
                                ref={inputRef}
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Type a message..."
                                disabled={isLoading}
                                className="flex-1 text-sm px-3 py-2 rounded-full border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 disabled:opacity-60"
                            />
                            <button
                                type="submit"
                                disabled={isLoading || !input.trim()}
                                className="p-2 rounded-full bg-teal-600 text-white hover:bg-teal-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                aria-label="Send message"
                            >
                                <Send className="w-4 h-4" />
                            </button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Floating toggle button */}
            <button
                onClick={() => setIsOpen((prev) => !prev)}
                className="w-14 h-14 rounded-full bg-teal-600 text-white shadow-lg flex items-center justify-center hover:bg-teal-700 active:scale-95 transition-all"
                aria-label={isOpen ? 'Close chat' : 'Open chat'}
            >
                {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
            </button>
        </div>
    );
}
