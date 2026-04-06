import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { Heart, HeartHandshake, Sparkles, RotateCcw, ArrowRight } from 'lucide-react';

type Screen = 'home' | 'questions' | 'result' | 'final';

const QUESTIONS = [
  "나랑 성인되자마자 도장찍어!!",
  "나만 봐!! 나만 조아하고 사랑해야대 평생 알아찌??",
  "나랑 결혼해!!! 엄청 사랑해!!"
];

export default function App() {
  const [screen, setScreen] = useState<Screen>('home');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [showSecondLoveButton, setShowSecondLoveButton] = useState(false);
  const [isNoButtonVisible, setIsNoButtonVisible] = useState(true);

  const reset = () => {
    setScreen('home');
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setShowSecondLoveButton(false);
    setIsNoButtonVisible(true);
  };

  const handleAnswer = (answer: string) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);

    if (currentQuestionIndex < QUESTIONS.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Check results
      const allYes = newAnswers.every(a => a === '웅!');
      setScreen('result');
    }
  };

  const triggerHearts = () => {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      // since particles fall down, start a bit higher than random
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        shapes: ['circle'],
        colors: ['#ff0000', '#ff69b4', '#ff1493']
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        shapes: ['circle'],
        colors: ['#ff0000', '#ff69b4', '#ff1493']
      });
    }, 250);
  };

  const handleNoClick = () => {
    setIsNoButtonVisible(false);
    setTimeout(() => {
      setShowSecondLoveButton(true);
    }, 300);
  };

  const allYes = answers.length === QUESTIONS.length && answers.every(a => a === '웅!');

  return (
    <div className="min-h-screen bg-rose-50 flex items-center justify-center p-4 font-sans overflow-hidden">
      <AnimatePresence mode="wait">
        {screen === 'home' && (
          <motion.div
            key="home"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center space-y-8 bg-white p-10 rounded-3xl shadow-xl border-4 border-rose-200 max-w-md w-full"
          >
            <div className="flex justify-center">
              <Heart className="text-rose-500 w-16 h-16 animate-pulse" fill="currentColor" />
            </div>
            <h1 className="text-3xl font-bold text-rose-600 tracking-tight">
              이다빈을 위한 질문지
            </h1>
            <p className="text-rose-400 font-medium">
              솔직하게 대답해줘야대! 알게찌?
            </p>
            <button
              onClick={() => setScreen('questions')}
              className="w-full py-4 bg-rose-500 hover:bg-rose-600 text-white rounded-2xl font-bold text-xl transition-all transform hover:scale-105 active:scale-95 shadow-lg flex items-center justify-center gap-2"
            >
              답변하기 <Sparkles className="w-5 h-5" />
            </button>
          </motion.div>
        )}

        {screen === 'questions' && (
          <motion.div
            key="questions"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="text-center space-y-10 bg-white p-10 rounded-3xl shadow-xl border-4 border-rose-200 max-w-md w-full"
          >
            <div className="flex justify-between items-center mb-4">
              <span className="text-rose-300 font-bold">Q {currentQuestionIndex + 1} / {QUESTIONS.length}</span>
              <div className="flex gap-1">
                {[0, 1, 2].map((i) => (
                  <div 
                    key={i} 
                    className={`h-2 w-8 rounded-full transition-colors ${i <= currentQuestionIndex ? 'bg-rose-500' : 'bg-rose-100'}`}
                  />
                ))}
              </div>
            </div>
            
            <h2 className="text-2xl font-bold text-gray-800 leading-relaxed min-h-[80px] flex items-center justify-center">
              {QUESTIONS[currentQuestionIndex]}
            </h2>

            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => handleAnswer('웅!')}
                className="py-6 bg-rose-500 hover:bg-rose-600 text-white rounded-2xl font-bold text-2xl transition-all transform hover:scale-105 active:scale-95 shadow-md"
              >
                웅!
              </button>
              <button
                onClick={() => handleAnswer('시러')}
                className="py-6 bg-gray-100 hover:bg-gray-200 text-gray-500 rounded-2xl font-bold text-2xl transition-all transform hover:scale-105 active:scale-95 shadow-sm"
              >
                시러
              </button>
            </div>
          </motion.div>
        )}

        {screen === 'result' && (
          <motion.div
            key="result"
            initial={{ opacity: 0, rotate: -5 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="text-center space-y-8 bg-white p-10 rounded-3xl shadow-xl border-4 border-rose-200 max-w-md w-full"
          >
            {allYes ? (
              <>
                <div className="flex justify-center">
                  <div className="relative">
                    <HeartHandshake className="text-rose-500 w-20 h-20" />
                    <Sparkles className="absolute -top-2 -right-2 text-yellow-400 animate-bounce" />
                  </div>
                </div>
                <h2 className="text-3xl font-black text-rose-600 leading-tight">
                  통과!! <br /> 나랑 결혼해 약속!! <br /> 💍💖✨
                </h2>
                <button
                  onClick={() => setScreen('final')}
                  className="w-full py-4 bg-rose-500 hover:bg-rose-600 text-white rounded-2xl font-bold text-xl transition-all transform hover:scale-105 active:scale-95 shadow-lg flex items-center justify-center gap-2"
                >
                  다음으로 넘어가기 <ArrowRight className="w-5 h-5" />
                </button>
              </>
            ) : (
              <>
                <div className="flex justify-center">
                  <div className="text-6xl">😤💢💔</div>
                </div>
                <h2 className="text-3xl font-black text-gray-700 leading-tight">
                  흥!! 나 삐침 수고
                </h2>
                <button
                  onClick={reset}
                  className="w-full py-4 bg-gray-800 hover:bg-black text-white rounded-2xl font-bold text-xl transition-all transform hover:scale-105 active:scale-95 shadow-lg flex items-center justify-center gap-2"
                >
                  처음으로 돌아가기 <RotateCcw className="w-5 h-5" />
                </button>
              </>
            )}
          </motion.div>
        )}

        {screen === 'final' && (
          <motion.div
            key="final"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center space-y-12 bg-white p-12 rounded-[3rem] shadow-2xl border-8 border-rose-100 max-w-lg w-full relative"
          >
            <motion.h1 
              initial={{ scale: 0.5 }}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="text-6xl font-black text-rose-500 drop-shadow-sm"
            >
              사랑해
            </motion.h1>

            <div className="flex flex-wrap justify-center gap-6 relative min-h-[80px]">
              <button
                onClick={triggerHearts}
                className="px-8 py-4 bg-rose-500 hover:bg-rose-600 text-white rounded-full font-bold text-xl transition-all transform hover:scale-110 active:scale-95 shadow-xl z-10"
              >
                나도 사랑해
              </button>

              <AnimatePresence>
                {isNoButtonVisible && (
                  <motion.button
                    key="no-btn"
                    initial={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0, x: -50 }}
                    onClick={handleNoClick}
                    className="px-8 py-4 bg-gray-100 hover:bg-gray-200 text-gray-400 rounded-full font-bold text-xl transition-all shadow-md"
                  >
                    시른데ㅋ
                  </motion.button>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {showSecondLoveButton && (
                  <motion.button
                    key="love-btn-2"
                    initial={{ opacity: 0, scale: 0, x: 50 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    onClick={triggerHearts}
                    className="px-8 py-4 bg-rose-500 hover:bg-rose-600 text-white rounded-full font-bold text-xl transition-all transform hover:scale-110 active:scale-95 shadow-xl"
                  >
                    나도 사랑해
                  </motion.button>
                )}
              </AnimatePresence>
            </div>

            <div className="absolute -top-6 -left-6 transform -rotate-12">
              <Heart className="text-rose-200 w-12 h-12 fill-current" />
            </div>
            <div className="absolute -bottom-6 -right-6 transform rotate-12">
              <Heart className="text-rose-200 w-12 h-12 fill-current" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
