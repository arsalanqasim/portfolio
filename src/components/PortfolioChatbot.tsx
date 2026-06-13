/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef, useEffect, FormEvent } from 'react';
import { 
  MessageSquare, 
  Send, 
  X, 
  Sparkles, 
  User, 
  Bot, 
  ArrowRight,
  RefreshCw,
  Minus
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: Date;
}

const SUGGESTED_PROMPTS = [
  "Check out Arsalan's core projects?",
  "Tell me about the GlycoTwin Neural ODE research.",
  "What is Arsalan Qasim's tech stack?",
  "Is Arsalan available for AI developer roles?"
];

export default function PortfolioChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: "Hi! I'm Arsalan's AI assistant. Ask me anything about his AI/ML projects (like GlycoTwin or Dino-AI), his academic search, or his web automation skills!",
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll chat to the bottom
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isLoading]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    setErrorMessage(null);
    const userMsgId = `user-${Date.now()}`;
    const userMsg: ChatMessage = {
      id: userMsgId,
      sender: 'user',
      text: textToSend,
      timestamp: new Date()
    };

    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInputText('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ messages: updatedMessages })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Server error. Your GEMINI_API_KEY might not be configured.');
      }

      setMessages(prev => [
        ...prev,
        {
          id: `assistant-${Date.now()}`,
          sender: 'assistant',
          text: data.text,
          timestamp: new Date()
        }
      ]);
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || 'Failed to exchange payload with Gemini server. Make sure API key is loaded.');
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
        text: "Hi! I'm Arsalan's AI assistant. Ask me anything about his AI/ML projects (like GlycoTwin or Dino-AI), his academic search, or his web automation skills!",
        timestamp: new Date()
      }
    ]);
    setErrorMessage(null);
  };

  return (
    <>
      {/* Floating trigger CTA badge */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 bg-[#58a6ff] hover:bg-[#58a6ff]/90 text-black px-4 py-3 rounded-full shadow-2xl font-mono text-xs font-bold transition-all group cursor-pointer"
          >
            <div className="relative">
              <MessageSquare className="h-4.5 w-4.5" />
              <span className="absolute -top-1.5 -right-1.5 h-2 w-2 rounded-full bg-[#27a640] animate-pulse"></span>
            </div>
            <span className="max-w-0 overflow-hidden group-hover:max-w-[120px] transition-all duration-300 ease-out whitespace-nowrap">
              Query Arsalan Assistant
            </span>
            <span className="bg-black/10 px-1.5 py-0.5 rounded text-[10px] hidden sm:inline">Ask AI</span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Main Floating Chat Dialog Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-40 w-[90vw] sm:w-[420px] h-[550px] max-h-[80vh] flex flex-col bg-[#1c2026] border border-[#30363d] rounded-2xl shadow-2xl overflow-hidden font-sans"
          >
            {/* Header */}
            <div className="bg-[#161b22] border-b border-[#30363d] px-4 py-3.5 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 rounded-lg bg-[#58a6ff]/10 text-[#58a6ff]">
                  <Sparkles className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-display text-sm font-bold text-[#dfe2eb]">AI Portfolio Companion</h3>
                  <div className="flex items-center gap-1.5 font-mono text-[9.5px] text-[#27a640]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#27a640] animate-pulse"></span>
                    <span>Powered by Gemini 3.5</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button 
                  onClick={handleResetChat}
                  title="Reset conversation"
                  className="p-1.5 text-[#8b919d] hover:text-[#dfe2eb] hover:bg-[#21262d] rounded transition cursor-pointer"
                >
                  <RefreshCw className="h-3.5 w-3.5" />
                </button>
                <button 
                  onClick={() => setIsOpen(false)}
                  title="Close chat"
                  className="p-1.5 text-[#8b919d] hover:text-[#dfe2eb] hover:bg-[#21262d] rounded transition cursor-pointer"
                >
                  <Minus className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Conversation list viewport */}
            <div className="flex-grow p-4 overflow-y-auto scrollbar bg-[#0d1117] space-y-4">
              {messages.map((msg) => {
                const isUser = msg.sender === 'user';
                return (
                  <div 
                    key={msg.id} 
                    className={`flex items-start gap-2.5 ${isUser ? 'flex-row-reverse' : ''}`}
                  >
                    {/* Avatar Bubble */}
                    <div className={`p-1.5 rounded-lg shrink-0 ${
                      isUser ? 'bg-[#58a6ff]/15 text-[#58a6ff]' : 'bg-[#27a640]/10 text-[#27a640]'
                    }`}>
                      {isUser ? <User className="h-3.5 w-3.5" /> : <Bot className="h-3.5 w-3.5" />}
                    </div>

                    {/* Text block container */}
                    <div className={`max-w-[78%] flex flex-col gap-1`}>
                      <div className={`px-3.5 py-2.5 rounded-2xl text-xs leading-relaxed ${
                        isUser 
                          ? 'bg-[#58a6ff] text-black font-medium border border-[#58a6ff]/35 rounded-tr-none' 
                          : 'bg-[#161b22] text-[#dfe2eb] border border-[#21262d] rounded-tl-none'
                      }`}>
                        {msg.text}
                      </div>
                      <span className={`font-mono text-[8px] text-[#8b919d] px-1 ${
                        isUser ? 'text-right' : 'text-left'
                      }`}>
                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                );
              })}

              {/* Loader visual if fetching results */}
              {isLoading && (
                <div className="flex items-start gap-2.5">
                  <div className="p-1.5 rounded-lg bg-[#27a640]/10 text-[#27a640] shrink-0">
                    <Bot className="h-3.5 w-3.5" />
                  </div>
                  <div className="bg-[#161b22] border border-[#21262d] px-4 py-3 rounded-2xl rounded-tl-none flex gap-1 items-center">
                    <span className="w-1.5 h-1.5 bg-[#8b919d] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 bg-[#8b919d] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 bg-[#8b919d] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}

              {/* Technical API Key error banner inside viewport helper */}
              {errorMessage && (
                <div className="p-3 bg-[#3a1a1a] border border-red-500/30 rounded-xl text-left space-y-1.5">
                  <span className="font-mono text-[9.5px] font-bold text-red-400 block uppercase tracking-wider">Deployment / Setup Status</span>
                  <p className="text-[11px] text-[#fca5a5] leading-relaxed">
                    {errorMessage}
                  </p>
                  <p className="font-mono text-[8.5px] text-red-300">
                    *Tip: Make sure the GEMINI_API_KEY environment variable is configured in the AI Studio platform workspace.
                  </p>
                </div>
              )}

              {/* End pointer to trigger visual scrolls */}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick action query prompt lists */}
            <div className="border-t border-[#21262d] bg-[#161b22]/50 px-3 py-2.5 flex flex-wrap gap-1.5 overflow-x-auto max-h-[110px] items-start scrollbar">
              {SUGGESTED_PROMPTS.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => handleSendMessage(prompt)}
                  disabled={isLoading}
                  className="bg-[#0d1117] hover:bg-[#1c2026] hover:border-[#58a6ff]/40 text-[#c0c7d4] hover:text-[#dfe2eb] text-[10px] px-2.5 py-1 rounded-full border border-[#21262d] text-left transition duration-200 cursor-pointer disabled:opacity-50 shrink-0 flex items-center gap-1.5 inline-block truncate max-w-full"
                >
                  <span>{prompt}</span>
                  <ArrowRight className="h-2.5 w-2.5 text-[#58a6ff]" />
                </button>
              ))}
            </div>

            {/* User typing form footer */}
            <form onSubmit={handleFormSubmit} className="bg-[#161b22] border-t border-[#30363d] p-3 flex gap-2">
              <input
                type="text"
                placeholder="Ask about GlycoTwin, work achievements, math background..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                disabled={isLoading}
                className="flex-grow bg-[#0d1117] border border-[#21262d] rounded-xl text-xs px-3 py-2.5 font-sans placeholder-[#8b919d] text-[#dfe2eb] focus:border-[#58a6ff] focus:outline-none focus:ring-1 focus:ring-[#58a6ff] disabled:opacity-60"
              />
              <button
                type="submit"
                disabled={isLoading || !inputText.trim()}
                className="bg-[#58a6ff] hover:bg-[#58a6ff]/90 disabled:opacity-40 text-black px-3 py-2.5 rounded-xl font-mono text-xs font-bold flex items-center justify-center transition cursor-pointer"
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
