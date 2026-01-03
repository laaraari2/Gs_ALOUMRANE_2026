
import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, Loader2, Sparkles, Headphones } from 'lucide-react';
import { getGroqResponse } from '../services/groqService';
import { Language } from '../types';

interface Props {
  lang: Language;
}

const AIChatBot: React.FC<Props> = ({ lang }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'bot' | 'user'; text: string }[]>([
    {
      role: 'bot',
      text: lang === 'ar'
        ? 'مرحباً بكم في العمران. أنا مساعدكم الرقمي، كيف يمكنني إرشادكم اليوم؟'
        : 'Bienvenue à Al Omrane. Je suis votre assistant digital, comment puis-je vous guider ?'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    const response = await getGroqResponse(userMsg, lang);
    setMessages(prev => [...prev, { role: 'bot', text: response || '' }]);
    setIsLoading(false);
  };

  return (
    <div className={`fixed bottom-4 sm:bottom-10 ${lang === 'ar' ? 'left-4 sm:left-10' : 'right-4 sm:right-10'} z-[60]`}>
      {isOpen ? (
        <div className="w-[calc(100vw-2rem)] sm:w-[440px] h-[calc(100vh-12rem)] max-h-[600px] sm:h-[600px] bg-white rounded-[2rem] sm:rounded-[2.5rem] shadow-2xl flex flex-col border border-slate-100 overflow-hidden animate-in fade-in slide-in-from-bottom-10 duration-500">
          {/* Header - Concierge Style */}
          <div className="bg-[#1e1b4b] p-4 sm:p-6 text-white flex justify-between items-center relative">
            <div className="flex items-center gap-4 relative z-10">
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center backdrop-blur-md">
                <Headphones size={24} className="text-[#f97316]" />
              </div>
              <div>
                <h3 className="font-black text-base tracking-tight">{lang === 'ar' ? 'مساعد العمران' : 'Concierge Al Omrane'}</h3>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <p className="text-[10px] opacity-70 uppercase font-bold tracking-widest">{lang === 'ar' ? 'متصل الآن' : 'En ligne'}</p>
                </div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-2 rounded-xl transition-colors">
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-slate-50/50">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${m.role === 'user'
                  ? 'bg-[#1e1b4b] text-white rounded-br-none'
                  : 'bg-white text-slate-800 rounded-bl-none border border-slate-100'
                  }`}>
                  {m.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
                  <Loader2 className="animate-spin text-[#f97316]" size={20} />
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-4 sm:p-6 border-t border-slate-100 bg-white">
            <div className="relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder={lang === 'ar' ? 'اكتب استفسارك هنا...' : 'Écrivez votre question...'}
                className={`w-full p-4 ${lang === 'ar' ? 'pr-5 pl-12' : 'pl-5 pr-12'} rounded-xl bg-slate-50 border border-slate-200 focus:border-[#f97316] outline-none text-sm transition-all`}
              />
              <button
                onClick={handleSend}
                disabled={isLoading}
                className={`absolute ${lang === 'ar' ? 'left-2' : 'right-2'} top-1/2 -translate-y-1/2 p-3 text-[#1e1b4b] hover:text-[#f97316] transition-colors`}
              >
                <Send size={18} className={lang === 'ar' ? 'rotate-180' : ''} />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="w-16 h-16 bg-[#1e1b4b] text-white rounded-2xl flex items-center justify-center shadow-xl hover:scale-110 active:scale-95 transition-all group border-2 border-white"
        >
          <MessageCircle className="text-[#f97316]" size={28} fill="currentColor" fillOpacity={0.1} />
        </button>
      )}
    </div>
  );
};

export default AIChatBot;
