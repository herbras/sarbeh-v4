import { useEffect, useState } from 'react';
import Phaser from 'phaser';
import { Player } from './types';
import type { GameState, Language } from './types';
import { EVENTS } from './constants';
import { getSageCommentary, getSageRules } from './services/gemini';
import { TRANSLATIONS } from './services/translations';

interface GameUIProps {
  gameInstance: Phaser.Game | null;
  gameState: GameState;
  sageComment: string;
  setSageComment: (s: string) => void;
  language: Language;
  setLanguage: (l: Language) => void;
}

// Pixel Wizard SVG Component
const SageAvatar = () => (
  <svg viewBox="0 0 24 24" className="w-24 h-24 drop-shadow-lg" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M7 2H17V4H19V6H21V12H19V14H21V18H19V20H17V22H7V20H5V18H3V14H5V12H3V6H5V4H7V2ZM7 6V4H17V6H19V12H17V14H15V12H13V14H11V12H9V14H7V12H5V6H7ZM9 8H7V10H9V8ZM17 8H15V10H17V8Z" fill="#a855f7"/>
    <path d="M9 8H7V10H9V8Z" fill="#fbbf24"/>
    <path d="M17 8H15V10H17V8Z" fill="#fbbf24"/>
    <rect x="9" y="16" width="6" height="2" fill="white" />
    <rect x="7" y="18" width="10" height="2" fill="white" />
  </svg>
);

export const GameUI: React.FC<GameUIProps> = ({
    gameInstance,
    gameState,
    sageComment,
    setSageComment,
    language,
    setLanguage
}) => {
  const [isTyping, setIsTyping] = useState(false);
  const t = TRANSLATIONS[language];

  // Trigger Gemini when the parent passes a "thinking..." state
  useEffect(() => {
    if (sageComment === 'thinking...') {
        setIsTyping(true);
        const fetchComment = async () => {
            const comment = await getSageCommentary(
                gameState.blackScore,
                gameState.whiteScore,
                gameState.currentPlayer === Player.Black ? Player.White : Player.Black,
                false,
                language
            );
            setSageComment(comment);
            setIsTyping(false);
        };
        fetchComment();
    }
  }, [sageComment, gameState.blackScore, gameState.whiteScore, language, gameState.currentPlayer, setSageComment]);

  const handleSpecialClick = () => {
    if (gameInstance) {
      gameInstance.events.emit(EVENTS.TRIGGER_SPECIAL);
    }
  };

  const handleReset = () => {
    if (gameInstance) {
      gameInstance.events.emit(EVENTS.RESET_GAME);
      setSageComment(t.welcome);
    }
  };

  const handleAskRules = async () => {
    setIsTyping(true);
    setSageComment("..."); // Show ellipsis while fetching
    const rules = await getSageRules(language);
    setSageComment(rules);
    setIsTyping(false);
  };

  const isCurrentPlayerBlack = gameState.currentPlayer === Player.Black;
  const canUseSpecial = isCurrentPlayerBlack ? gameState.blackSpecialAvailable : gameState.whiteSpecialAvailable;

  return (
    <div className="flex flex-col gap-4 relative">

      {/* Header with Language Toggle */}
      <div className="flex justify-between items-end px-1">
          <div className="hidden md:block"></div> {/* Spacer */}
          <div className="flex gap-2">
            <button
                onClick={() => setLanguage('id')}
                className={`px-3 py-1 text-sm rounded border-2 transition-all font-bold ${language === 'id' ? 'bg-purple-600 border-purple-400 text-white' : 'bg-gray-800 border-gray-500 text-gray-300 hover:bg-gray-700 hover:text-white'}`}
                aria-label="Switch to Indonesian"
            >
                ID
            </button>
            <button
                onClick={() => setLanguage('en')}
                className={`px-3 py-1 text-sm rounded border-2 transition-all font-bold ${language === 'en' ? 'bg-purple-600 border-purple-400 text-white' : 'bg-gray-800 border-gray-500 text-gray-300 hover:bg-gray-700 hover:text-white'}`}
                aria-label="Switch to English"
            >
                EN
            </button>
          </div>
      </div>

      {/* 1. Scoreboard Panel - Increased contrast for text */}
      <div className="bg-gray-800 border-4 border-gray-600 rounded-xl p-4 shadow-lg">
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-gray-200 font-bold text-sm tracking-wide">{t.scoreboard}</h2>
            <div className={`text-sm font-bold px-3 py-1 rounded ${gameState.gameOver ? 'bg-red-900 text-red-100 border border-red-500' : 'bg-gray-700 text-white border border-gray-500'}`}>
                {gameState.gameOver ? t.finished : `${t.turn}: ${isCurrentPlayerBlack ? t.black : t.white}`}
            </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
            {/* Player 1 (Black) */}
            <div className={`p-3 rounded-lg border-2 transition-all ${isCurrentPlayerBlack ? 'border-yellow-400 bg-gray-700' : 'border-gray-600 bg-gray-900/50'}`}>
                <div className="flex items-center gap-2 mb-2">
                    <div className="w-4 h-4 rounded-full bg-black border-2 border-gray-500"></div>
                    <span className="text-white font-bold text-sm">{t.p1}</span>
                </div>
                <div className="text-3xl text-white font-bold">{gameState.blackScore}</div>
                <div className={`text-xs mt-2 font-bold ${gameState.blackSpecialAvailable ? 'text-green-400' : 'text-gray-500'}`}>
                    {gameState.blackSpecialAvailable ? `* ${t.burst}` : `o ${t.used}`}
                </div>
            </div>

            {/* Player 2 (White) */}
            <div className={`p-3 rounded-lg border-2 transition-all ${!isCurrentPlayerBlack ? 'border-yellow-400 bg-gray-200' : 'border-gray-500 bg-gray-300'}`}>
                 <div className="flex items-center gap-2 mb-2">
                    <div className="w-4 h-4 rounded-full bg-white border-2 border-black"></div>
                    <span className="text-black font-bold text-sm">{t.p2}</span>
                </div>
                <div className="text-3xl text-black font-bold">{gameState.whiteScore}</div>
                 <div className={`text-xs mt-2 font-bold ${gameState.whiteSpecialAvailable ? 'text-green-700' : 'text-gray-600'}`}>
                    {gameState.whiteSpecialAvailable ? `* ${t.burst}` : `o ${t.used}`}
                </div>
            </div>
        </div>
      </div>

      {/* 2. The Sage Section */}
      <div className="relative mt-4 mb-4">
        {/* Avatar Container */}
        <div className="flex justify-center -mb-8 z-10 relative pointer-events-none">
            <div className="animate-float">
                <SageAvatar />
            </div>
        </div>

        {/* Chat Bubble - High contrast white on purple */}
        <div className="bg-purple-900 border-4 border-purple-500 rounded-xl p-6 pt-10 relative shadow-[0_8px_0_rgb(88,28,135)]">
             <div className="absolute top-2 left-2 text-xs font-bold text-purple-200 uppercase tracking-widest bg-purple-800 px-2 py-0.5 rounded">{t.sageTitle}</div>
             {/* Added whitespace-pre-line to allow newlines in text */}
             <p className="text-white text-lg md:text-xl leading-relaxed text-center min-h-[60px] flex items-center justify-center transition-opacity duration-300 drop-shadow-md whitespace-pre-line">
                {isTyping ? <span className="animate-pulse">{t.thinking}</span> : `"${sageComment}"`}
             </p>
        </div>
      </div>

      {/* 3. Action Buttons - Improved Disabled State Contrast */}
      <div className="flex flex-col gap-3">
         <button
            disabled={gameState.gameOver || !canUseSpecial}
            onClick={handleSpecialClick}
            className={`
                relative overflow-hidden group w-full
                px-6 py-4 rounded-xl font-bold text-center transition-all border-2
                ${canUseSpecial
                    ? 'bg-red-600 hover:bg-red-500 border-red-800 text-white shadow-[0_6px_0_#991b1b] active:shadow-none active:translate-y-1.5'
                    : 'bg-gray-800 border-gray-600 text-gray-500 cursor-not-allowed opacity-80'}
            `}
         >
            <span className="relative z-10 flex flex-col items-center">
                <span className="text-lg">{t.specialBtn}</span>
                <span className="text-xs font-normal opacity-90 mt-1 tracking-wider">{t.specialDesc}</span>
            </span>
         </button>

         <div className="grid grid-cols-2 gap-3">
            <button
                onClick={handleAskRules}
                className="w-full bg-purple-700 hover:bg-purple-600 border-2 border-purple-900 text-white font-bold py-3 px-4 rounded-xl shadow-[0_5px_0_#4c1d95] active:shadow-none active:translate-y-1.5 transition-all text-sm flex flex-col items-center justify-center gap-1"
             >
                <span className="text-xl">scroll</span>
                <span>{t.rules}</span>
             </button>

             <button
                onClick={handleReset}
                className="w-full bg-blue-600 hover:bg-blue-500 border-2 border-blue-800 text-white font-bold py-3 px-4 rounded-xl shadow-[0_5px_0_#1e40af] active:shadow-none active:translate-y-1.5 transition-all text-sm flex flex-col items-center justify-center gap-1"
             >
                <span className="text-xl">reset</span>
                <span>{gameState.gameOver ? t.restart : t.reset}</span>
             </button>
         </div>
      </div>

      {/* Game Over Modal Overlay */}
      {gameState.gameOver && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-300">
             <div className="bg-gray-800 border-4 border-yellow-500 rounded-2xl p-8 max-w-md w-full text-center shadow-[0_0_50px_rgba(234,179,8,0.3)] transform scale-100 animate-in zoom-in duration-300">
               <h2 className="text-4xl font-bold text-yellow-400 mb-6 tracking-widest uppercase border-b-4 border-yellow-500/50 pb-2">{t.gameover}</h2>

               <div className="text-7xl mb-6 animate-bounce">
                 {gameState.winner === 'Draw' ? 'handshake' : gameState.winner === Player.Black ? 'trophy' : 'skull'}
               </div>

               <p className="text-2xl text-white mb-8 font-bold leading-relaxed">
                 {gameState.winner === 'Draw'
                    ? t.draw
                    : (
                        <>
                          <span className={`${gameState.winner === Player.Black ? 'text-white' : 'text-gray-400'} border-b-2`}>
                            {gameState.winner === Player.Black ? t.black : t.white}
                          </span>
                          <br/>
                          {t.wins}
                        </>
                    )
                 }
               </p>

               <button
                  onClick={handleReset}
                  className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-extrabold text-xl py-4 rounded-xl shadow-[0_6px_0_#854d0e] active:shadow-none active:translate-y-1 transition-all"
               >
                 {t.restart} reset
               </button>
            </div>
          </div>
      )}

    </div>
  );
};
