/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef, useEffect, FormEvent } from 'react';
import { Send, X, User, Bot, ArrowRight, RefreshCw, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import ReactMarkdown from 'react-markdown';

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
  "Hi! I'm Arsalan's AI assistant, Rango. Ask me about his projects, experience, skills, or whether he's open to opportunities.";

const SESSION_STORAGE_KEY = 'rango_chat_history';

export default function PortfolioChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  
  // Initialize messages from sessionStorage to persist session state
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    try {
      const saved = window.sessionStorage.getItem(SESSION_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return parsed.map((m: any) => ({
          ...m,
          timestamp: new Date(m.timestamp),
        }));
      }
    } catch (e) {
      console.error('Error reading chat history from session storage:', e);
    }
    return [
      {
        id: 'welcome',
        sender: 'assistant',
        text: WELCOME_MESSAGE,
        timestamp: new Date(),
      },
    ];
  });

  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-save messages to sessionStorage whenever they change
  useEffect(() => {
    try {
      window.sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(messages));
    } catch (e) {
      console.error('Error saving chat history to session storage:', e);
    }
  }, [messages]);

  // Scroll to bottom on new messages
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
      // 1. Rolling window: Slice last 10 messages (approx 5 turns) to prevent token/cost bloat
      const rollingHistory = updatedMessages.slice(-10);

      // 2. Fetch the stream endpoint
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: rollingHistory }),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || 'Could not reach the assistant. Check server logs.');
      }

      if (!response.body) {
        throw new Error('ReadableStream not supported by this browser.');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let done = false;
      let assistantText = '';
      const assistantMessageId = `assistant-${Date.now()}`;

      // Insert an empty assistant message which we will stream into
      setMessages((prev) => [
        ...prev,
        {
          id: assistantMessageId,
          sender: 'assistant',
          text: '',
          timestamp: new Date(),
        },
      ]);

      let buffer = '';

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        if (value) {
          buffer += decoder.decode(value, { stream: !done });
          const lines = buffer.split('\n');
          
          // Hold the last partial line in the buffer
          buffer = lines.pop() || '';

          for (const line of lines) {
            const cleanedLine = line.trim();
            if (!cleanedLine) continue;

            if (cleanedLine.startsWith('data: ')) {
              const dataStr = cleanedLine.slice(6).trim();
              if (dataStr === '[DONE]') {
                done = true;
                break;
              }

              try {
                const parsed = JSON.parse(dataStr);
                if (parsed.error) {
                  throw new Error(parsed.error);
                }
                if (parsed.text) {
                  assistantText += parsed.text;
                  setMessages((prev) =>
                    prev.map((msg) =>
                      msg.id === assistantMessageId
                        ? { ...msg, text: assistantText }
                        : msg
                    )
                  );
                }
              } catch (e) {
                // If it is a propagated Error from the stream parser, throw it
                if (e instanceof Error) {
                  throw e;
                }
                console.error('Error parsing SSE event chunk:', e);
              }
            }
          }
        }
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Something went wrong.';
      setErrorMessage(message);
      // Remove any trailing empty streaming message if it failed at the start
      setMessages((prev) => prev.filter((msg) => msg.text !== ''));
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
    try {
      window.sessionStorage.removeItem(SESSION_STORAGE_KEY);
    } catch (e) {
      console.error('Error clearing session storage:', e);
    }
  };

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            key="chat-trigger"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-40 p-4 bg-accent hover:bg-accent-hover text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer flex items-center justify-center group border border-border/10"
            title="Open chat assistant"
            aria-label="Open chat assistant"
          >
            <MessageSquare className="h-6 w-6 group-hover:scale-110 transition-transform duration-200" />
          </motion.button>
        )}

        {isOpen && (
          <motion.div
            data-anton-obstacle="true"
            initial={{ opacity: 0, y: 32, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 32, scale: 0.96 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-6 right-6 z-40 w-[90vw] sm:w-[420px] h-[580px] max-h-[85vh] flex flex-col bg-surface/90 backdrop-blur-xl border border-border rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="border-b border-border px-4 py-3.5 flex items-center justify-between bg-canvas/40 backdrop-blur-md">
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 rounded-lg bg-accent-soft text-accent">
                  <Bot className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-ink">Ask Rango</h3>
                  <p className="text-[10px] text-ink-muted">Arsalan's AI Assistant</p>
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

            {/* Chat Messages */}
            <div className="flex-grow p-4 overflow-y-auto space-y-4 bg-canvas/20 scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent">
              {messages.map((msg) => {
                const isUser = msg.sender === 'user';
                return (
                  <div
                    key={msg.id}
                    className={`flex items-start gap-2.5 ${isUser ? 'flex-row-reverse' : ''}`}
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
                        className={`px-4 py-3 rounded-2xl text-xs sm:text-sm leading-relaxed text-left ${
                          isUser
                            ? 'bg-accent text-white rounded-tr-sm'
                            : 'bg-surface text-ink-secondary border border-border rounded-tl-sm shadow-sm'
                        }`}
                      >
                        {isUser ? (
                          msg.text
                        ) : (
                          <ReactMarkdown
                            components={{
                              p: ({ node, ...props }) => <p className="mb-2 last:mb-0" {...props} />,
                              ul: ({ node, ...props }) => <ul className="list-disc pl-4 mb-2 space-y-1" {...props} />,
                              ol: ({ node, ...props }) => <ol className="list-decimal pl-4 mb-2 space-y-1" {...props} />,
                              li: ({ node, ...props }) => <li className="text-xs sm:text-sm text-ink-secondary" {...props} />,
                              strong: ({ node, ...props }) => <strong className="font-semibold text-accent" {...props} />,
                              a: ({ node, ...props }) => (
                                <a
                                  className="text-accent underline hover:text-accent-hover transition-colors font-medium break-all"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  {...props}
                                />
                              ),
                              code: ({ node, className, children, ...props }) => {
                                const isInline = !className;
                                return isInline ? (
                                  <code className="bg-canvas border border-border px-1 py-0.5 rounded text-[11px] font-mono text-accent font-semibold" {...props}>
                                    {children}
                                  </code>
                                ) : (
                                  <pre className="bg-canvas border border-border p-2.5 rounded-lg overflow-x-auto my-2 scrollbar-thin">
                                    <code className="text-[11px] font-mono text-ink block" {...props}>
                                      {children}
                                    </code>
                                  </pre>
                                );
                              }
                            }}
                          >
                            {msg.text}
                          </ReactMarkdown>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}

              {isLoading && !messages[messages.length - 1]?.text && (
                <div className="flex items-start gap-2.5">
                  <div className="p-1.5 rounded-lg bg-canvas border border-border text-ink-muted">
                    <Bot className="h-3.5 w-3.5" />
                  </div>
                  <div className="bg-surface border border-border px-4 py-3 rounded-2xl rounded-tl-sm flex gap-1 shadow-sm">
                    <span className="w-1.5 h-1.5 bg-accent rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 bg-accent rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 bg-accent rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}

              {errorMessage && (
                <div className="p-3.5 bg-red-50/70 dark:bg-red-950/20 border border-red-200 dark:border-red-900/50 rounded-xl text-xs text-red-600 dark:text-red-400">
                  {errorMessage}
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Suggestions */}
            <div className="border-t border-border px-3 py-2.5 flex flex-wrap gap-1.5 bg-canvas/30 backdrop-blur-sm">
              {SUGGESTED_PROMPTS.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => handleSendMessage(prompt)}
                  disabled={isLoading}
                  className="text-[10px] px-2.5 py-1 rounded-full border border-border bg-surface text-ink-muted hover:border-accent hover:text-accent transition cursor-pointer disabled:opacity-50 flex items-center gap-1 hover:shadow-sm"
                >
                  {prompt}
                  <ArrowRight className="h-2.5 w-2.5" />
                </button>
              ))}
            </div>

            {/* Input Form */}
            <form onSubmit={handleFormSubmit} className="border-t border-border p-3.5 flex gap-2 bg-surface">
              <input
                type="text"
                placeholder="Ask anything about Arsalan..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                disabled={isLoading}
                maxLength={500}
                className="flex-grow bg-canvas border border-border rounded-xl text-xs sm:text-sm px-3.5 py-2.5 placeholder-ink-muted text-ink focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/20 disabled:opacity-60 transition"
              />
              <button
                type="submit"
                disabled={isLoading || !inputText.trim()}
                className="bg-accent hover:bg-accent-hover disabled:opacity-40 text-white px-3.5 py-2.5 rounded-xl flex items-center justify-center transition cursor-pointer shadow-md hover:shadow-lg disabled:shadow-none"
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
