import React, { useState, useEffect, useMemo } from 'react';
import { SCORING_DATA } from './constants';
import { Difficulty, ExamType } from './types';
import { 
  Calculator, 
  BookOpen, 
  Headphones, 
  PenTool, 
  RefreshCcw, 
  Award, 
  ChevronDown,
  Info
} from 'lucide-react';

const MAX_RAW_LISTENING = 35;
const MAX_RAW_READING = 35;
const MAX_RAW_WRITING = 30;

// Reusable Input Component
const ScoreSection = ({
  title,
  icon: Icon,
  difficulty,
  setDifficulty,
  rawScore,
  setRawScore,
  maxRawScore,
  scaledScore,
  colorTheme,
  isWriting = false
}: {
  title: string;
  icon: React.ElementType;
  difficulty?: Difficulty;
  setDifficulty?: (d: Difficulty) => void;
  rawScore: number;
  setRawScore: (s: number) => void;
  maxRawScore: number;
  scaledScore: number;
  colorTheme: string;
  isWriting?: boolean;
}) => {

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val === '') {
      setRawScore(0);
      return;
    }
    const parsed = parseInt(val, 10);
    if (!isNaN(parsed)) {
       // Clamp the value to ensure it stays within valid range
       const clamped = Math.min(Math.max(parsed, 0), maxRawScore);
       setRawScore(clamped);
    }
  };

  return (
    <div className={`bg-white rounded-2xl shadow-sm border border-gray-100 p-6 transition-all duration-300 hover:shadow-md`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className={`p-2 rounded-lg ${colorTheme === 'blue' ? 'bg-blue-100 text-blue-600' : 'bg-emerald-100 text-emerald-600'}`}>
            <Icon size={20} />
          </div>
          <h3 className="font-semibold text-gray-800">{title}</h3>
        </div>
        <div className={`text-2xl font-bold ${colorTheme === 'blue' ? 'text-blue-600' : 'text-emerald-600'}`}>
          {scaledScore}
        </div>
      </div>

      {!isWriting && setDifficulty && difficulty && (
        <div className="mb-6">
          <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 block">Difficulty</label>
          <div className="grid grid-cols-3 gap-2">
            {[Difficulty.Easy, Difficulty.Medium, Difficulty.Hard].map((level) => (
              <button
                key={level}
                onClick={() => setDifficulty(level)}
                className={`
                  py-2 px-3 rounded-lg text-sm font-medium transition-all
                  ${difficulty === level 
                    ? (colorTheme === 'blue' 
                        ? 'bg-blue-600 text-white shadow-blue-200 shadow-lg' 
                        : 'bg-emerald-600 text-white shadow-emerald-200 shadow-lg') 
                    : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                  }
                `}
              >
                {level}
              </button>
            ))}
          </div>
        </div>
      )}

      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Raw Score
          </label>
          <span className="text-xs font-mono text-gray-400">Max: {maxRawScore}</span>
        </div>
        
        <div className="flex items-center gap-4">
          <input
            type="number"
            min="0"
            max={maxRawScore}
            value={rawScore.toString()}
            onChange={handleInputChange}
            onFocus={(e) => e.target.select()}
            className={`
              w-20 p-2 text-center font-bold text-lg rounded-xl border-2 outline-none transition-all
              ${colorTheme === 'blue' 
                  ? 'border-blue-100 focus:border-blue-500 bg-blue-50/50 text-blue-700' 
                  : 'border-emerald-100 focus:border-emerald-500 bg-emerald-50/50 text-emerald-700'}
            `}
          />
          <input
            type="range"
            min="0"
            max={maxRawScore}
            value={rawScore}
            onChange={(e) => setRawScore(Number(e.target.value))}
            className={`
              flex-1 h-2 rounded-lg appearance-none cursor-pointer
              ${colorTheme === 'blue' ? 'bg-blue-100 accent-blue-600' : 'bg-emerald-100 accent-emerald-600'}
            `}
          />
        </div>
      </div>
    </div>
  );
};

// Encouragement Logic
const getEncouragement = (score: number) => {
  if (score >= 600) return "Outstanding! You absolutely crushed it!";
  if (score >= 550) return "Excellent score! You're well above average.";
  if (score >= 425) return "Great job! You passed with flying colors.";
  if (score >= 380) return "You're so close! A little more practice and you'll get there.";
  return "Don't give up! Review your weak spots and try again.";
};

const App: React.FC = () => {
  // State
  const [examType, setExamType] = useState<ExamType>(ExamType.CET4);
  const [listeningDiff, setListeningDiff] = useState<Difficulty>(Difficulty.Medium);
  const [readingDiff, setReadingDiff] = useState<Difficulty>(Difficulty.Medium);
  
  const [listeningRaw, setListeningRaw] = useState<number>(0);
  const [readingRaw, setReadingRaw] = useState<number>(0);
  const [writingRaw, setWritingRaw] = useState<number>(0);

  // Derived State (Calculated Scores)
  const calculateScores = useMemo(() => {
    const data = SCORING_DATA[examType];
    
    // Ensure raw score is within bounds (safeguard)
    const lRaw = Math.min(listeningRaw, MAX_RAW_LISTENING);
    const rRaw = Math.min(readingRaw, MAX_RAW_READING);
    const wRaw = Math.min(writingRaw, MAX_RAW_WRITING);

    const lScaled = data.listening[listeningDiff][lRaw] || 0;
    const rScaled = data.reading[readingDiff][rRaw] || 0;
    const wScaled = data.writing[wRaw] || 0;

    return {
      listening: lScaled,
      reading: rScaled,
      writing: wScaled,
      total: lScaled + rScaled + wScaled
    };
  }, [examType, listeningDiff, readingDiff, listeningRaw, readingRaw, writingRaw]);

  // Theme Helpers
  const isCET4 = examType === ExamType.CET4;
  const themeColor = isCET4 ? 'blue' : 'emerald'; // using string for simple prop passing
  const bgClass = isCET4 ? 'bg-blue-600' : 'bg-emerald-600';
  const textClass = isCET4 ? 'text-blue-600' : 'text-emerald-600';
  const ringClass = isCET4 ? 'ring-blue-200' : 'ring-emerald-200';

  // Handlers
  const handleReset = () => {
    setListeningRaw(0);
    setReadingRaw(0);
    setWritingRaw(0);
    setListeningDiff(Difficulty.Medium);
    setReadingDiff(Difficulty.Medium);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      
      {/* Header */}
      <header className={`${bgClass} text-white pt-8 pb-16 px-4 shadow-xl transition-colors duration-500`}>
        <div className="max-w-md mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Calculator className="opacity-90" />
              <h1 className="text-xl font-bold tracking-tight">CET Calculator</h1>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-full p-1 flex">
              {[ExamType.CET4, ExamType.CET6].map((type) => (
                <button
                  key={type}
                  onClick={() => setExamType(type)}
                  className={`
                    px-4 py-1.5 rounded-full text-sm font-semibold transition-all
                    ${examType === type ? 'bg-white shadow-sm ' + textClass : 'text-white/80 hover:text-white'}
                  `}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
          
          <div className="text-center mt-6">
            <div className="text-white/80 text-sm font-medium uppercase tracking-wider mb-1">Predicted Score</div>
            <div className="text-6xl font-bold tabular-nums tracking-tighter drop-shadow-sm">
              {calculateScores.total}
            </div>
            <div className="mt-2 text-white/90 font-medium px-4 py-1 bg-white/10 rounded-full inline-block text-sm">
              Passing Score: 425
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-md mx-auto px-4 -mt-8 space-y-4">
        
        {/* Result Summary Card (Floating) */}
        <div className="bg-white rounded-xl shadow-lg p-5 border border-gray-100 flex flex-col items-center text-center">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-yellow-100 text-yellow-600 mb-3">
               <Award size={24} />
            </div>
            <p className="text-gray-800 font-medium leading-tight">
              {getEncouragement(calculateScores.total)}
            </p>
        </div>

        {/* Info Note */}
        <div className="flex gap-3 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
           <Info className="text-gray-400 shrink-0" size={20} />
           <p className="text-xs text-gray-500 leading-relaxed">
             Select the difficulty for Listening and Reading based on the specific exam version you took. For Writing/Translation, estimate your score out of 30.
           </p>
        </div>

        {/* Listening Section */}
        <ScoreSection
          title="Listening"
          icon={Headphones}
          difficulty={listeningDiff}
          setDifficulty={setListeningDiff}
          rawScore={listeningRaw}
          setRawScore={setListeningRaw}
          maxRawScore={MAX_RAW_LISTENING}
          scaledScore={calculateScores.listening}
          colorTheme={themeColor}
        />

        {/* Reading Section */}
        <ScoreSection
          title="Reading"
          icon={BookOpen}
          difficulty={readingDiff}
          setDifficulty={setReadingDiff}
          rawScore={readingRaw}
          setRawScore={setReadingRaw}
          maxRawScore={MAX_RAW_READING}
          scaledScore={calculateScores.reading}
          colorTheme={themeColor}
        />

        {/* Writing Section */}
        <ScoreSection
          title="Writing & Transl."
          icon={PenTool}
          rawScore={writingRaw}
          setRawScore={setWritingRaw}
          maxRawScore={MAX_RAW_WRITING}
          scaledScore={calculateScores.writing}
          colorTheme={themeColor}
          isWriting={true}
        />

        {/* Action Buttons */}
        <div className="pt-4 pb-8">
          <button
            onClick={handleReset}
            className={`
              w-full py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all
              bg-white text-gray-600 border border-gray-200 hover:bg-gray-50 shadow-sm
            `}
          >
            <RefreshCcw size={18} />
            Reset Calculator
          </button>
        </div>
      </main>
    </div>
  );
};

export default App;
