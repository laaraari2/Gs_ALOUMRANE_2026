
import React, { useState, useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, Info, Volume2, VolumeX, Play, MapPin } from 'lucide-react';
import { TOUR_STATIONS } from '../constants';
import { Language } from '../types';

interface Props {
  lang: Language;
  isOpen: boolean;
  onClose: () => void;
}

const SmartTour: React.FC<Props> = ({ lang, isOpen, onClose }) => {
  const [current, setCurrent] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [tourStarted, setTourStarted] = useState(false);
  const [voicesLoaded, setVoicesLoaded] = useState(false);

  const station = TOUR_STATIONS[current];

  // Load voices
  useEffect(() => {
    if ('speechSynthesis' in window) {
      const loadVoices = () => {
        const voices = window.speechSynthesis.getVoices();
        if (voices.length > 0) {
          setVoicesLoaded(true);
        }
      };

      loadVoices();
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, []);

  // Function to speak text
  const speak = useCallback((text: string, language: Language) => {
    if (!('speechSynthesis' in window)) {
      console.log('Speech synthesis not supported');
      return;
    }

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    // Get available voices
    const voices = window.speechSynthesis.getVoices();

    if (voices.length === 0) {
      console.log('No voices available yet, retrying...');
      setTimeout(() => speak(text, language), 500);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);

    // Try to find voice for the language
    let selectedVoice = null;

    // Enhanced Voice Selection for Literary French
    // 1. Prioritize Google/Microsoft French voices (usually higher quality)
    // 2. Fallback to any French voice
    if (language === 'ar' || language === 'fr') {
      selectedVoice = voices.find(v => v.lang.startsWith('fr') && (v.name.includes('Google') || v.name.includes('Microsoft') || v.name.includes('Thomas') || v.name.includes('Amelie')));

      if (!selectedVoice) {
        selectedVoice = voices.find(v => v.lang.startsWith('fr'));
      }

      // Last resort fallback
      if (!selectedVoice) {
        selectedVoice = voices.find(v => v.lang.startsWith('en')) || voices[0];
      }
    }

    if (selectedVoice) {
      utterance.voice = selectedVoice;
      utterance.lang = selectedVoice.lang;
    }

    // Literary Style Settings
    utterance.rate = 0.85; // Slightly slower for better enunciation
    utterance.pitch = 1.0; // Natural, neutral pitch
    utterance.volume = 1.0;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  }, []);

  // Stop speaking
  const stopSpeaking = useCallback(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, []);

  // Speak when station changes (if voice is enabled and tour started)
  useEffect(() => {
    if (isOpen && tourStarted && voiceEnabled && station) {
      // Always use French text for speech (Arabic voice not commonly available)
      const text = `${station.title.fr}. ${station.description.fr}`;

      // Small delay
      const timer = setTimeout(() => {
        speak(text, 'fr');
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [current, tourStarted, voiceEnabled, station, lang, speak, isOpen]);

  // Stop speaking and reset when closing
  useEffect(() => {
    if (!isOpen) {
      stopSpeaking();
      setCurrent(0);
      setTourStarted(false);
    }
  }, [isOpen, stopSpeaking]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopSpeaking();
    };
  }, [stopSpeaking]);

  if (!isOpen) return null;

  const toggleVoice = () => {
    if (isSpeaking) {
      stopSpeaking();
    } else if (voiceEnabled === false) {
      // Re-enable and speak current station (always in French)
      const text = `${station.title.fr}. ${station.description.fr}`;
      speak(text, 'fr');
    }
    setVoiceEnabled(!voiceEnabled);
  };

  const handleStartTour = () => {
    setTourStarted(true);
    // Speak welcome and first station (always in French for reliable audio)
    if (voiceEnabled && station) {
      const welcomeText = `Bienvenue dans notre visite virtuelle. ${station.title.fr}. ${station.description.fr}`;
      speak(welcomeText, 'fr');
    }
  };

  const handleNext = () => {
    stopSpeaking();
    setCurrent(prev => prev + 1);
  };

  const handlePrev = () => {
    stopSpeaking();
    setCurrent(prev => prev - 1);
  };

  const handleClose = () => {
    stopSpeaking();
    onClose();
  };

  // Welcome Screen (before starting tour)
  if (!tourStarted) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 lg:p-12 animate-in fade-in duration-300">
        <div className="absolute inset-0 bg-[#1e1b4b]/95 backdrop-blur-xl" onClick={handleClose} />

        <div className="relative w-full max-w-lg bg-white rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-premium p-8 md:p-12 text-center">
          <button onClick={handleClose} className="absolute top-4 right-4 p-2 hover:bg-slate-100 rounded-full transition-colors">
            <X size={20} className="text-slate-400" />
          </button>

          <div className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-[#f97316] to-[#ea580c] rounded-[1.5rem] flex items-center justify-center mx-auto mb-6 shadow-lg">
            <MapPin size={40} className="text-white" />
          </div>

          <h2 className="text-2xl md:text-4xl font-black text-[#1e1b4b] mb-4">
            {lang === 'ar' ? 'الجولة الافتراضية' : 'Visite Virtuelle'}
          </h2>

          <p className="text-slate-500 font-medium mb-2">
            {lang === 'ar'
              ? `اكتشف ${TOUR_STATIONS.length} مرافق رائعة في مدرستنا`
              : `Découvrez nos ${TOUR_STATIONS.length} installations exceptionnelles`
            }
          </p>

          <div className="flex items-center justify-center gap-2 text-[#f97316] mb-8">
            <Volume2 size={18} />
            <span className="text-sm font-bold">
              {lang === 'ar' ? 'مع مرافقة صوتية' : 'Avec guide audio'}
            </span>
          </div>

          <button
            onClick={handleStartTour}
            className="w-full bg-[#1e1b4b] text-white py-4 md:py-5 px-8 rounded-2xl font-black text-lg md:text-xl flex items-center justify-center gap-3 hover:bg-indigo-900 transition-all shadow-lg group"
          >
            <Play size={24} fill="currentColor" className="group-hover:scale-110 transition-transform" />
            {lang === 'ar' ? 'ابدأ الجولة' : 'Commencer la visite'}
          </button>

          <p className="text-xs text-slate-400 mt-4">
            {lang === 'ar' ? '🔊 تأكد من تفعيل الصوت' : '🔊 Assurez-vous que le son est activé'}
          </p>
        </div>
      </div>
    );
  }

  // Main Tour View
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 lg:p-12 animate-in fade-in duration-300">
      <div className="absolute inset-0 bg-[#1e1b4b]/95 backdrop-blur-xl" onClick={handleClose} />

      <div className="relative w-full max-w-6xl bg-white rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-premium grid lg:grid-cols-2">
        {/* Image Side */}
        <div className="relative h-48 md:h-64 lg:h-full overflow-hidden">
          <img
            key={station.id}
            src={station.image}
            className="w-full h-full object-cover animate-in zoom-in-95 duration-700"
            alt={station.id}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

          {/* Voice indicator */}
          {isSpeaking && (
            <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-white/90 backdrop-blur-md px-3 py-2 rounded-full shadow-lg">
              <div className="flex gap-1 items-end h-4">
                <span className="w-1 bg-[#f97316] rounded-full animate-pulse" style={{ height: '60%', animationDelay: '0ms' }} />
                <span className="w-1 bg-[#f97316] rounded-full animate-pulse" style={{ height: '100%', animationDelay: '150ms' }} />
                <span className="w-1 bg-[#f97316] rounded-full animate-pulse" style={{ height: '40%', animationDelay: '300ms' }} />
                <span className="w-1 bg-[#f97316] rounded-full animate-pulse" style={{ height: '80%', animationDelay: '450ms' }} />
              </div>
              <span className="text-xs font-bold text-[#1e1b4b]">
                {lang === 'ar' ? 'جاري التحدث...' : 'En cours...'}
              </span>
            </div>
          )}
        </div>

        {/* Content Side */}
        <div className="p-6 md:p-8 lg:p-16 flex flex-col justify-center space-y-6 md:space-y-8 relative">
          {/* Header buttons */}
          <div className="absolute top-4 md:top-8 right-4 md:right-8 flex items-center gap-2">
            <button
              onClick={toggleVoice}
              className={`p-2 md:p-3 rounded-full transition-all ${voiceEnabled ? 'bg-[#f97316] text-white' : 'bg-slate-100 text-slate-400 hover:bg-slate-200'}`}
              title={voiceEnabled ? (lang === 'ar' ? 'إيقاف الصوت' : 'Désactiver le son') : (lang === 'ar' ? 'تفعيل الصوت' : 'Activer le son')}
            >
              {voiceEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
            </button>
            <button onClick={handleClose} className="p-2 md:p-3 hover:bg-slate-100 rounded-full transition-colors">
              <X size={20} className="text-slate-400" />
            </button>
          </div>

          <div className="space-y-3 md:space-y-4 pt-8 md:pt-0">
            <span className="text-[#f97316] font-black uppercase tracking-[0.2em] md:tracking-[0.3em] text-[9px] md:text-[10px] flex items-center gap-2">
              <Info size={12} />
              {t(lang, 'جولة ذكية', 'Smart Tour')} ({current + 1}/{TOUR_STATIONS.length})
            </span>
            <h3 className="text-2xl md:text-4xl lg:text-5xl font-black text-[#1e1b4b]">
              {t(lang, station.title.ar, station.title.fr)}
            </h3>
            <p className="text-slate-500 text-sm md:text-lg leading-relaxed font-medium">
              {t(lang, station.description.ar, station.description.fr)}
            </p>
          </div>

          <div className="flex items-center justify-between pt-6 md:pt-10 border-t border-slate-100">
            <div className="flex gap-1.5 md:gap-2">
              {TOUR_STATIONS.map((_, i) => (
                <div key={i} className={`h-1.5 md:h-2 transition-all rounded-full ${i === current ? 'w-6 md:w-8 bg-[#f97316]' : 'w-1.5 md:w-2 bg-slate-200'}`} />
              ))}
            </div>

            <div className="flex gap-2 md:gap-3">
              <button
                disabled={current === 0}
                onClick={handlePrev}
                className="w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl border-2 border-slate-100 flex items-center justify-center text-[#1e1b4b] disabled:opacity-30 hover:bg-slate-50 transition-all"
              >
                <ChevronLeft size={20} className={lang === 'ar' ? 'rotate-180' : ''} />
              </button>
              <button
                disabled={current === TOUR_STATIONS.length - 1}
                onClick={handleNext}
                className="w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-[#1e1b4b] text-white flex items-center justify-center shadow-lg hover:bg-indigo-900 transition-all disabled:opacity-30"
              >
                <ChevronRight size={20} className={lang === 'ar' ? 'rotate-180' : ''} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function t(lang: Language, ar: string, fr: string) {
  return lang === 'ar' ? ar : fr;
}

export default SmartTour;
