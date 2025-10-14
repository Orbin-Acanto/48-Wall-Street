'use client';

import { useEffect, useRef, useState } from 'react';
import { Bot, MessageCircle, X, Send } from 'lucide-react';

type ChatMessage = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  ts: number;
};

function getOrCreateSessionId(storageKey = 'chat_session_id'): string {
  if (typeof window === 'undefined') return 'server';
  let id = localStorage.getItem(storageKey);
  if (!id) {
    id = crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random()}`;
    localStorage.setItem(storageKey, id);
  }
  return id;
}

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const sessionId = getOrCreateSessionId();

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: 'Welcome to 48 Wall Street! How can we help you today?',
      ts: Date.now(),
    },
  ]);

  const WEBHOOK = '/api/chat';
  const [isTyping, setIsTyping] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    listRef.current?.scrollTo({
      top: listRef.current.scrollHeight,
      behavior: 'smooth',
    });
  }, [messages, isTyping, isOpen]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    const text = message.trim();
    if (!text) return;

    const userMsg: ChatMessage = {
      id: crypto.randomUUID(),
      role: 'user',
      content: text,
      ts: Date.now(),
    };

    setMessages((m) => [...m, userMsg]);
    setMessage('');
    setIsTyping(true);

    try {
      // Simplified payload - only sessionId and chatInput
      const payload = {
        sessionId: sessionId,
        chatInput: text,
      };

      const res = await fetch(WEBHOOK, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const contentType = res.headers.get('content-type') || '';
      if (
        contentType.includes('text/event-stream') ||
        contentType.includes('text/plain')
      ) {
        const reader = res.body?.getReader();
        if (!reader) throw new Error('No readable stream');

        let assistantId = crypto.randomUUID();
        let accum = '';
        setMessages((m) => [
          ...m,
          { id: assistantId, role: 'assistant', content: '', ts: Date.now() },
        ]);

        const decoder = new TextDecoder();
        while (true) {
          const { value, done } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value, { stream: true });

          const parts = chunk
            .split('\n')
            .map((l) => l.trim())
            .filter(Boolean);

          for (const line of parts) {
            const data = line.startsWith('data:') ? line.slice(5).trim() : line;
            if (data === '[DONE]') continue;
            accum += data;

            setMessages((m) =>
              m.map((msg) =>
                msg.id === assistantId ? { ...msg, content: accum } : msg
              )
            );
          }
        }
      } else {
        const json = await res.json().catch(() => ({}));
        const reply =
          json.reply ??
          json.output ??
          json.response ??
          'Sorry, I could not parse the server response.';
        setMessages((m) => [
          ...m,
          {
            id: crypto.randomUUID(),
            role: 'assistant',
            content: reply,
            ts: Date.now(),
          },
        ]);
      }
    } catch (err) {
      console.error(err);
      setMessages((m) => [
        ...m,
        {
          id: crypto.randomUUID(),
          role: 'assistant',
          content:
            'Hmm, I had trouble reaching our assistant. Please try again in a moment.',
          ts: Date.now(),
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      {/* Chat Window */}
      <div
        className={`fixed right-16 bottom-24 z-50 w-96 max-w-[calc(100vw-3rem)] transition-all duration-300 ${
          isOpen
            ? 'pointer-events-auto translate-y-0 opacity-100'
            : 'pointer-events-none translate-y-4 opacity-0'
        }`}
      >
        <div className="overflow-hidden rounded-2xl bg-white shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between border-b-2 border-gray-800 bg-gray-900 p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-lg">
                <Bot className="h-6 w-6 text-gray-900" />
              </div>
              <div>
                <h3 className="font-accent text-base font-bold tracking-wide text-white">
                  48 Wall Street
                </h3>
                <p className="text-xs font-medium text-gray-400">● Online</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="group cursor-pointer rounded-lg p-2.5 transition-all duration-200 hover:bg-gray-800"
              aria-label="Close chat"
            >
              <X className="h-5 w-5 text-gray-400 transition-colors group-hover:text-white" />
            </button>
          </div>

          {/* Chat Messages */}
          <div
            ref={listRef}
            className="h-96 space-y-4 overflow-y-auto bg-gradient-to-b from-gray-50 to-white p-5"
          >
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-3 ${m.role === 'user' ? 'justify-end' : ''}`}
              >
                {m.role === 'assistant' && (
                  <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-gray-900 shadow-md">
                    <Bot className="h-5 w-5 text-white" />
                  </div>
                )}

                <div
                  className={`max-w-[80%] rounded-2xl p-4 shadow-sm ${
                    m.role === 'user'
                      ? 'rounded-tr-sm bg-gray-900 text-white'
                      : 'rounded-tl-sm bg-white text-gray-900'
                  }`}
                >
                  <p className="text-sm leading-relaxed font-medium whitespace-pre-wrap">
                    {m.content}
                  </p>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400" />
                <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:0.15s]" />
                <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:0.3s]" />
                <span className="ml-2">Typing…</span>
              </div>
            )}
          </div>

          {/* Input Area */}
          <form
            onSubmit={handleSendMessage}
            className="border-t border-gray-300 bg-white p-4"
          >
            <div className="flex gap-3">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message…"
                className="flex-1 rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-sm font-medium text-gray-900 transition-all duration-200 placeholder:text-gray-400 focus:outline-none"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
                    handleSendMessage(e as any);
                  }
                }}
              />
              <button
                type="submit"
                className="flex cursor-pointer items-center justify-center rounded-xl bg-gray-900 p-3 text-white shadow-lg transition-all duration-200 hover:scale-105 hover:bg-gray-800 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-40"
                disabled={!message.trim() || isTyping}
                aria-label="Send message"
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`bg-whitesmoke hover:bg-whitesmoke/80 fixed right-6 bottom-6 z-50 flex h-16 w-16 cursor-pointer items-center justify-center rounded-full border border-gray-800/20 text-gray-800 shadow-2xl transition-all duration-300 hover:scale-110 hover:shadow-gray-900/50 ${
          isOpen ? 'rotate-90' : 'rotate-0'
        }`}
        aria-label="Toggle chat"
      >
        {isOpen ? (
          <X className="h-7 w-7" />
        ) : (
          <MessageCircle className="h-7 w-7" />
        )}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 h-5 w-5 animate-pulse rounded-full border-[3px] border-white bg-red-500 shadow-lg" />
        )}
      </button>
    </>
  );
}
