'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Message, getBotResponse, generateMessageId } from './ChatbotLogic';

const predefinedQuestions = [
  { id: 1, label: '💰 מחירים', question: 'מחיר' },
  { id: 2, label: '⚡ תהליך העבודה', question: 'תהליך' },
  { id: 3, label: '🎨 תבניות', question: 'תבנית' },
  { id: 4, label: '👨‍💻 ניסיון', question: 'ניסיון' },
  { id: 5, label: '💻 טכנולוגיות', question: 'טכנולוגי' },
  { id: 6, label: '⏱️ זמן ביצוע', question: 'כמה זמן' },
  { id: 7, label: '📱 רספונסיבי', question: 'מובייל' },
  { id: 8, label: '🛠️ תמיכה', question: 'תמיכה' },
  { id: 9, label: '💳 תשלומים', question: 'תשלום' },
  { id: 10, label: '🌐 דומיין ואחסון', question: 'דומיין' },
  { id: 11, label: '📞 צרו קשר', question: 'צור קשר' },
  { id: 12, label: '⭐ למה לבחור בנו?', question: 'למה' },
];

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [showQuestions, setShowQuestions] = useState(true);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: generateMessageId(),
          text: 'שלום! 👋 אני העוזר החכם של Pixelia.\nכתבו לי כל שאלה — או בחרו מהשאלות הנפוצות. איך אפשר לעזור?',
          sender: 'bot',
          timestamp: new Date(),
        },
      ]);
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleQuestionClick = (question: string) => {
    setShowQuestions(false);
    setMessages((prev) => [
      ...prev,
      { id: generateMessageId(), text: question, sender: 'user', timestamp: new Date() },
    ]);
    setIsTyping(true);

    setTimeout(() => {
      const botResponse = getBotResponse(question);
      setMessages((prev) => [
        ...prev,
        { id: generateMessageId(), text: botResponse, sender: 'bot', timestamp: new Date() },
      ]);
      setIsTyping(false);
      setShowQuestions(true);
    }, 800);
  };

  // Free-text questions go to the AI (server route). Quick-reply buttons stay
  // canned (no token cost).
  const sendToAI = async (text: string) => {
    const trimmedText = text.trim();
    if (!trimmedText || isTyping) return;

    const userMsg: Message = { id: generateMessageId(), text: trimmedText, sender: 'user', timestamp: new Date() };
    const history = [...messages, userMsg];
    setMessages(history);
    setInput('');
    setShowQuestions(false);
    setIsTyping(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: history
            .filter((m) => m.sender === 'user' || m.sender === 'bot')
            .slice(-8)
            .map((m) => ({ role: m.sender === 'user' ? 'user' : 'model', content: m.text })),
        }),
      });
      const data = await res.json();
      const reply = data.reply || 'מצטער, משהו השתבש. נסו שוב או דברו איתנו בוואטסאפ.';
      setMessages((prev) => [...prev, { id: generateMessageId(), text: reply, sender: 'bot', timestamp: new Date() }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { id: generateMessageId(), text: 'יש בעיית תקשורת רגעית 🙏 נסו שוב מאוחר יותר, או דברו איתנו בוואטסאפ: https://wa.me/972546361555', sender: 'bot', timestamp: new Date() },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendToAI(input);
  };

  return (
    <>
      {/* Floating chat button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 left-6 z-50 lg-surface lg-glow-cool w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center"
            style={{
              background: 'conic-gradient(from 200deg at 50% 50%, #3b82f6, #14b8a6, #22c55e, #facc15, #f97316, #3b82f6)',
            }}
            aria-label="פתח צ'אט"
            suppressHydrationWarning
          >
            <svg className="relative z-10 w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
            <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-[var(--primary)] rounded-full animate-pulse z-10" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-6 left-6 z-50 w-96 max-w-[calc(100vw-3rem)] h-[85vh] max-h-[720px] lg-surface lg-solid squircle-lg flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div
              className="relative flex-shrink-0 px-4 py-3 flex items-center justify-between border-b border-[var(--glass-border-dim)]"
              style={{
                background: 'linear-gradient(135deg, var(--primary-bright) 0%, var(--primary) 100%)',
              }}
            >
              <div className="flex items-center gap-3 relative z-10">
                <div className="w-9 h-9 rounded-full bg-[var(--ink)]/90 flex items-center justify-center">
                  <svg className="w-5 h-5 text-[var(--primary-bright)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-[var(--on-accent)] text-sm">Pixelia Bot</h3>
                  <p className="text-xs text-[var(--on-accent)]/70">תשובות מיידיות</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="relative z-10 w-8 h-8 rounded-full bg-black/10 hover:bg-black/20 flex items-center justify-center transition-colors text-[var(--on-accent)]"
                aria-label="סגור"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Messages */}
            <div className="relative z-10 flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((m) => (
                <div key={m.id} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[80%] px-3.5 py-2 text-sm leading-relaxed ${
                      m.sender === 'user'
                        ? 'rounded-2xl rounded-br-sm bg-[var(--primary)] text-[var(--on-accent)]'
                        : 'lg-surface lg-shallow squircle-md text-[var(--text-default)]'
                    }`}
                  >
                    <div className={m.sender === 'user' ? '' : 'relative z-10'}>
                      {m.text.split('\n').map((line, i) => {
                        const parts = line.split('**');
                        return (
                          <div key={i}>
                            {parts.map((p, j) =>
                              j % 2 === 1 ? <strong key={j}>{p}</strong> : <span key={j}>{p}</span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                    <div className={`text-[10px] mt-1 ${m.sender === 'user' ? 'text-[var(--on-accent)]/60' : 'text-[var(--text-faint)] relative z-10'}`}>
                      {m.timestamp.toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="lg-surface lg-shallow squircle-md px-3.5 py-2.5">
                    <div className="flex gap-1 relative z-10">
                      <span className="w-1.5 h-1.5 bg-[var(--primary)] rounded-full animate-bounce" />
                      <span className="w-1.5 h-1.5 bg-[var(--primary)] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-1.5 h-1.5 bg-[var(--primary)] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick questions (collapsible — these are free, no AI tokens) */}
            <div className="relative z-10 flex-shrink-0 border-t border-[var(--glass-border-dim)]">
              <button
                onClick={() => setShowQuestions((v) => !v)}
                className="w-full px-4 py-2 flex items-center justify-between text-[11px] font-medium text-[var(--text-muted)] hover:text-[var(--text-strong)] transition-colors"
              >
                <span className="relative z-10">שאלות נפוצות</span>
                <svg className={`relative z-10 w-3.5 h-3.5 transition-transform ${showQuestions ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {showQuestions && (
                <div className="px-3 pb-3 max-h-[170px] overflow-y-auto">
                  <div className="grid grid-cols-2 gap-2">
                    {predefinedQuestions.map((q) => (
                      <button
                        key={q.id}
                        onClick={() => handleQuestionClick(q.question)}
                        disabled={isTyping}
                        className="lg-surface lg-shallow squircle-sm px-2.5 py-2 text-[11px] text-right text-[var(--text-default)] hover:text-[var(--text-strong)] transition-colors disabled:opacity-50"
                      >
                        <span className="relative z-10">{q.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Free-text input → AI */}
            <form onSubmit={handleSubmit} className="relative z-10 flex-shrink-0 border-t border-[var(--glass-border-dim)] p-3 flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="כתבו הודעה..."
                maxLength={500}
                disabled={isTyping}
                className="flex-1 squircle-sm px-3 py-2 text-sm text-[var(--text-default)] bg-[var(--bg-base)] border border-[var(--border-strong)] outline-none focus:border-[var(--primary)] placeholder:text-[var(--text-faint)] disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={isTyping || !input.trim()}
                aria-label="שליחה"
                className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-[var(--on-accent)] disabled:opacity-40 transition-opacity"
                style={{ background: 'linear-gradient(135deg, var(--primary-bright), var(--primary))' }}
              >
                <svg className="w-4 h-4 -scale-x-100" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
