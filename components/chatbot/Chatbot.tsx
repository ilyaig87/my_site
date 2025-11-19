'use client';

import { useState, useEffect, useRef } from 'react';
import { Message, getBotResponse, generateMessageId } from './ChatbotLogic';

// Predefined questions
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
  { id: 11, label: '📞 צור קשר', question: 'צור קשר' },
  { id: 12, label: '⭐ למה לבחור בנו?', question: 'למה' },
];

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showQuestions, setShowQuestions] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Check dark mode on client side only
  useEffect(() => {
    const checkDarkMode = () => {
      setIsDarkMode(document.documentElement.classList.contains('dark'));
    };

    checkDarkMode();

    // Watch for theme changes
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => observer.disconnect();
  }, []);

  // Initial welcome message
  useEffect(() => {
    if (messages.length === 0) {
      const welcomeMessage: Message = {
        id: generateMessageId(),
        text: 'שלום! 👋 אני הבוט החכם של SiteCraft.\nבחר שאלה מהרשימה למטה ואשמח לעזור!',
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
    }
  }, []);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleQuestionClick = (question: string) => {
    setShowQuestions(false);

    // Add user message
    const userMessage: Message = {
      id: generateMessageId(),
      text: question,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    // Simulate bot thinking and respond
    setTimeout(() => {
      const botResponse = getBotResponse(question);
      const botMessage: Message = {
        id: generateMessageId(),
        text: botResponse,
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
      setShowQuestions(true);
    }, 800);
  };

  const handleBackToMenu = () => {
    const menuMessage: Message = {
      id: generateMessageId(),
      text: 'בחר שאלה נוספת מהרשימה למטה:',
      sender: 'bot',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, menuMessage]);
    setShowQuestions(true);
  };

  return (
    <>
      {/* Floating chat button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 left-6 z-50 w-16 h-16 rounded-full shadow-lg transition-all duration-300 hover:scale-110 ${
          isOpen ? 'scale-0' : 'scale-100'
        } bg-yellow-400 text-gray-900`}
        aria-label="פתח צ'אט"
        suppressHydrationWarning
      >
        <svg
          className="w-8 h-8 mx-auto"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
          />
        </svg>
        {/* Notification dot */}
        <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
      </button>

      {/* Chat window */}
      <div
        className={`fixed bottom-24 left-6 z-50 w-96 max-w-[calc(100vw-3rem)] h-[85vh] max-h-[850px] rounded-2xl shadow-2xl transition-all duration-300 flex flex-col ${
          isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
        } ${
          isDarkMode
            ? 'bg-gray-800 border border-gray-700'
            : 'bg-white border border-gray-200'
        }`}
      >
        {/* Header */}
        <div className="bg-yellow-400 text-gray-900 rounded-t-2xl p-4 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center">
              <svg
                className="w-6 h-6 text-yellow-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
              </svg>
            </div>
            <div>
              <h3 className="font-bold">SiteCraft Bot</h3>
              <p className="text-xs opacity-90">פה כדי לעזור 24/7</p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="hover:bg-yellow-500 rounded-full p-2 transition-colors"
            aria-label="סגור צ'אט"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Messages */}
        <div className={`flex-1 overflow-y-auto p-4 space-y-4 ${
          isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
        }`}>
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                  message.sender === 'user'
                    ? 'bg-yellow-400 text-gray-900 rounded-br-none'
                    : isDarkMode
                    ? 'bg-gray-800 text-white rounded-bl-none border border-gray-700'
                    : 'bg-white text-gray-900 rounded-bl-none border border-gray-200'
                }`}
              >
                <div className="text-sm whitespace-pre-wrap break-words leading-relaxed">
                  {message.text.split('\n').map((line, i) => {
                    // Handle markdown-style bold
                    const parts = line.split('**');
                    return (
                      <div key={i}>
                        {parts.map((part, j) =>
                          j % 2 === 1 ? <strong key={j}>{part}</strong> : <span key={j}>{part}</span>
                        )}
                      </div>
                    );
                  })}
                </div>
                <div
                  className={`text-[10px] mt-1 ${
                    message.sender === 'user' ? 'text-gray-700' : 'text-gray-500'
                  }`}
                >
                  {message.timestamp.toLocaleTimeString('he-IL', {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </div>
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {isTyping && (
            <div className="flex justify-start">
              <div
                className={`rounded-2xl rounded-bl-none px-4 py-3 ${
                  isDarkMode
                    ? 'bg-gray-800 border border-gray-700'
                    : 'bg-white border border-gray-200'
                }`}
              >
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Questions Menu */}
        {showQuestions && !isTyping && (
          <div className={`border-t p-4 max-h-[400px] overflow-y-auto flex-shrink-0 ${
            isDarkMode
              ? 'border-gray-700 bg-gray-800'
              : 'border-gray-200 bg-white'
          }`}>
            <div className="grid grid-cols-2 gap-2">
              {predefinedQuestions.map((q) => (
                <button
                  key={q.id}
                  onClick={() => handleQuestionClick(q.question)}
                  className={`text-xs px-3 py-2 rounded-lg transition-colors text-right ${
                    isDarkMode
                      ? 'bg-gray-900 text-white hover:bg-gray-700 border border-gray-700'
                      : 'bg-gray-50 text-gray-700 hover:bg-yellow-50 border border-gray-300 hover:border-yellow-400'
                  }`}
                >
                  {q.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Back to menu button */}
        {!showQuestions && !isTyping && messages.length > 1 && (
          <div className={`border-t p-4 flex-shrink-0 ${
            isDarkMode
              ? 'border-gray-700 bg-gray-800'
              : 'border-gray-200 bg-white'
          }`}>
            <button
              onClick={handleBackToMenu}
              className="w-full bg-yellow-400 text-gray-900 py-2 rounded-lg hover:bg-yellow-500 transition-colors font-medium text-sm"
            >
              שאלה נוספת
            </button>
          </div>
        )}
      </div>
    </>
  );
}
