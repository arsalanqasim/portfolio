/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef, useEffect, FormEvent } from 'react';
import { MessageSquare, Send, X, User, Bot, ArrowRight, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: Date;
}

const SUGGESTED_PROMPTS = [
  'What projects has Arsalan built?',
  'Tell me about GlycoTwin',
  "What's his tech stack?",
  'Is he open to roles?',
];

const WELCOME_MESSAGE =
  "Hi! I'm Arsalan's AI assistant. Ask me about his projects, experience, skills, or whether he's open to opportunities.";

export default function PortfolioChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: WELCOME_MESSAGE,
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isLoading]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    setErrorMessage(null);
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date(),
    };

    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInputText('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: updatedMessages }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Could not reach the assistant. Check that GEMINI_API_KEY is set.');
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `assistant-${Date.now()}`,
          sender: 'assistant',
          text: data.text,
          timestamp: new Date(),
        },
      ]);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Something went wrong.';
      setErrorMessage(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    handleSendMessage(inputText);
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: 'welcome',
        sender: 'assistant',
        text: WELCOME_MESSAGE,
        timestamp: new Date(),
      },
    ]);
    setErrorMessage(null);
  };

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0.9, opacity: 0, y: 16 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 16 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 bg-accent hover:bg-accent-hover text-white px-4 py-3 rounded-full shadow-lg shadow-accent/20 text-sm font-semibold transition-colors cursor-pointer"
          >
            <MessageSquare className="h-4 w-4" />
            <span className="hidden sm:inline">Ask my assistant</span>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 32, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 32, scale: 0.96 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-6 right-6 z-40 w-[90vw] sm:w-[400px] h-[520px] max-h-[80vh] flex flex-col bg-surface border border-border rounded-2xl shadow-2xl overflow-hidden"
          >
            <div className="border-b border-border px-4 py-3.5 flex items-center justify-between bg-canvas/50">
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 rounded-lg bg-accent-soft text-accent">
                  <Bot className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-ink">Arsalan's Assistant</h3>
                  <p className="text-[10px] text-ink-muted">Powered by Gemini</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={handleResetChat}
                  title="Reset conversation"
                  className="p-1.5 text-ink-muted hover:text-ink hover:bg-canvas rounded-lg transition cursor-pointer"
                >
                  <RefreshCw className="h-3.5 w-3.5" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  title="Close"
                  className="p-1.5 text-ink-muted hover:text-ink hover:bg-canvas rounded-lg transition cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="flex-grow p-4 overflow-y-auto space-y-4 bg-canvas/30">
              {messages.map((msg) => {
                const isUser = msg.sender === 'user';
                return (
                  <div
                    key={msg.id}
                    className={`flex items-start gap-2 ${isUser ? 'flex-row-reverse' : ''}`}
                  >
                    <div
                      className={`p-1.5 rounded-lg shrink-0 ${
                        isUser ? 'bg-accent-soft text-accent' : 'bg-canvas text-ink-muted border border-border'
                      }`}
                    >
                      {isUser ? <User className="h-3.5 w-3.5" /> : <Bot className="h-3.5 w-3.5" />}
                    </div>
                    <div className={`max-w-[80%] ${isUser ? 'text-right' : ''}`}>
                      <div
                        className={`px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                          isUser
                            ? 'bg-accent text-white rounded-tr-sm'
                            : 'bg-surface text-ink-secondary border border-border rounded-tl-sm'
                        }`}
                      >
                        {msg.text}
                      </div>
                    </div>
                  </div>
                );
              })}

              {isLoading && (
                <div className="flex items-start gap-2">
                  <div className="p-1.5 rounded-lg bg-canvas border border-border text-ink-muted">
                    <Bot className="h-3.5 w-3.5" />
                  </div>
                  <div className="bg-surface border border-border px-4 py-3 rounded-2xl rounded-tl-sm flex gap-1">
                    <span className="w-1.5 h-1.5 bg-ink-muted rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 bg-ink-muted rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 bg-ink-muted rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}

              {errorMessage && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">
                  {errorMessage}
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            <div className="border-t border-border px-3 py-2 flex flex-wrap gap-1.5 bg-canvas/50">
              {SUGGESTED_PROMPTS.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => handleSendMessage(prompt)}
                  disabled={isLoading}
                  className="text-[11px] px-2.5 py-1 rounded-full border border-border bg-surface text-ink-muted hover:border-accent hover:text-accent transition cursor-pointer disabled:opacity-50 flex items-center gap-1"
                >
                  {prompt}
                  <ArrowRight className="h-2.5 w-2.5" />
                </button>
              ))}
            </div>

            <form onSubmit={handleFormSubmit} className="border-t border-border p-3 flex gap-2 bg-surface">
              <input
                type="text"
                placeholder="Ask anything about Arsalan..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                disabled={isLoading}
                className="flex-grow bg-canvas border border-border rounded-xl text-sm px-3 py-2.5 placeholder-ink-muted text-ink focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/30 disabled:opacity-60"
              />
              <button
                type="submit"
                disabled={isLoading || !inputText.trim()}
                className="bg-accent hover:bg-accent-hover disabled:opacity-40 text-white px-3 py-2.5 rounded-xl flex items-center justify-center transition cursor-pointer"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
