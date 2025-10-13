'use client';

import { useState } from 'react';
import { Bot, MessageCircle, X, Send } from 'lucide-react';

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    console.log('Message sent:', message);

    setMessage('');
  };

  return (
    <>
      {/* Chat Window */}
      <div
        className={`fixed right-6 bottom-24 z-50 w-96 max-w-[calc(100vw-3rem)] transition-all duration-300 ${
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
          <div className="h-96 space-y-4 overflow-y-auto bg-gradient-to-b from-gray-50 to-white p-5">
            {/* Welcome Message */}
            <div className="animate-fade-in flex gap-3">
              <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-gray-900 shadow-md">
                <Bot className="h-5 w-5 text-white" />
              </div>
              <div className="max-w-[80%] rounded-2xl rounded-tl-sm bg-white p-4 shadow-sm">
                <p className="text-sm leading-relaxed font-medium text-gray-900">
                  Welcome to 48 Wall Street! How can we help you today?
                </p>
                <span className="mt-2 block text-xs font-medium text-gray-500">
                  Just now
                </span>
              </div>
            </div>

            {/* Placeholder for chat messages */}
            <div className="py-12 text-center text-sm font-medium text-gray-400">
              Start a conversation...
            </div>
          </div>

          {/* Input Area */}
          <form
            onSubmit={handleSendMessage}
            className="border-t-1 border-gray-300 bg-white p-4"
          >
            <div className="flex gap-3">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 rounded-xl border-1 border-gray-300 bg-gray-50 px-4 py-3 text-sm font-medium text-gray-900 transition-all duration-200 placeholder:text-gray-400 focus:outline-none"
              />
              <button
                type="submit"
                className="flex cursor-pointer items-center justify-center rounded-xl bg-gray-900 p-3 text-white shadow-lg transition-all duration-200 hover:scale-105 hover:bg-gray-800 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-40"
                disabled={!message.trim()}
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
        className={`bg-whitesmoke hover:bg-whitesmoke/80 fixed right-6 bottom-6 z-50 flex h-16 w-16 cursor-pointer items-center justify-center rounded-full border-1 border-gray-800/20 text-gray-800 shadow-2xl transition-all duration-300 hover:scale-110 hover:shadow-gray-900/50 ${
          isOpen ? 'rotate-90' : 'rotate-0'
        }`}
        aria-label="Toggle chat"
      >
        {isOpen ? (
          <X className="h-7 w-7" />
        ) : (
          <MessageCircle className="h-7 w-7" />
        )}

        {/* Notification Dot */}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 h-5 w-5 animate-pulse rounded-full border-3 border-white bg-red-500 shadow-lg" />
        )}
      </button>
    </>
  );
}
