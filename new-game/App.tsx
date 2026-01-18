import React, { useEffect, useRef, useState } from 'react';
import Phaser from 'phaser';
import MainScene from './game/scenes/MainScene';
import { GameUI } from './components/GameUI';
import { GameState, Player, Language } from './types';
import { BOARD_SIZE, CELL_SIZE, BOARD_OFFSET_X, BOARD_OFFSET_Y } from './constants';
import { TRANSLATIONS } from './services/translations';

const App: React.FC = () => {
  // Use state for game instance so re-renders trigger when game is ready
  const [game, setGame] = useState<Phaser.Game | null>(null);
  const parentEl = useRef<HTMLDivElement>(null);
  const [language, setLanguage] = useState<Language>('id'); // Default to Indonesian
  
  // Sheet state for mobile
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const [gameState, setGameState] = useState<GameState>({
    currentPlayer: Player.Black,
    blackScore: 2,
    whiteScore: 2,
    gameOver: false,
    blackSpecialAvailable: true,
    whiteSpecialAvailable: true,
    winner: null,
  });

  const [sageComment, setSageComment] = useState<string>(TRANSLATIONS['id'].welcome);

  // Update initial comment if language changes on fresh start
  useEffect(() => {
     if (sageComment === TRANSLATIONS['en'].welcome || sageComment === TRANSLATIONS['id'].welcome) {
         setSageComment(TRANSLATIONS[language].welcome);
     }
  }, [language]);

  useEffect(() => {
    if (!parentEl.current) return;

    // Fixed logical size based on constants
    const logicalWidth = BOARD_OFFSET_X * 2 + CELL_SIZE * BOARD_SIZE;
    const logicalHeight = BOARD_OFFSET_Y + CELL_SIZE * BOARD_SIZE + 40;

    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      width: logicalWidth,
      height: logicalHeight,
      parent: parentEl.current,
      backgroundColor: '#1a1a1a',
      pixelArt: true,
      scene: [], 
      scale: {
        mode: Phaser.Scale.FIT, // This ensures it scales down on mobile
        autoCenter: Phaser.Scale.CENTER_BOTH,
      },
    };

    const newGame = new Phaser.Game(config);

    // Manually add and start the scene to pass React callbacks via 'data'
    newGame.scene.add('MainScene', MainScene);
    newGame.scene.start('MainScene', {
        onGameStateChange: (newState: GameState) => {
            setGameState(newState);
        },
        onSageComment: (comment: string) => {
            setSageComment(comment);
        }
    });

    setGame(newGame);

    return () => {
      newGame.destroy(true);
      setGame(null);
    };
  }, []);

  return (
    <div className="min-h-screen bg-neutral-900 flex items-center justify-center p-4 md:p-8 font-sans overflow-hidden">
      <div className="w-full max-w-7xl flex flex-col md:flex-row gap-8 items-center md:items-start justify-center">
        
        {/* Left Side: Game Board (Responsive) */}
        {/* We constrain width so Phaser's Scale.FIT works nicely */}
        <div className="relative shadow-2xl border-4 md:border-8 border-gray-700 rounded-xl bg-black flex-shrink-0 w-full max-w-[500px] md:max-w-none md:w-auto aspect-[592/652]">
            <div ref={parentEl} className="rounded-lg overflow-hidden w-full h-full" />
        </div>
        
        {/* Desktop UI Sidebar (Hidden on Mobile) */}
        <div className="hidden md:block w-[400px] flex-shrink-0 h-[650px] overflow-y-auto pr-2 custom-scrollbar">
            <GameUI 
                gameInstance={game} 
                gameState={gameState} 
                sageComment={sageComment}
                setSageComment={setSageComment}
                language={language}
                setLanguage={setLanguage}
            />
        </div>

        {/* Mobile: Floating Action Button to Open Sheet */}
        <div className="md:hidden fixed bottom-6 right-6 z-40">
           <button 
              onClick={() => setIsSheetOpen(true)}
              className="bg-purple-600 hover:bg-purple-500 text-white font-bold p-4 rounded-full shadow-xl border-4 border-purple-800 animate-bounce active:scale-95 transition-transform"
              aria-label="Open Menu"
           >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
           </button>
        </div>

        {/* Mobile: Bottom Sheet (Modal) */}
        {isSheetOpen && (
           <div className="md:hidden fixed inset-0 z-50 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200" onClick={() => setIsSheetOpen(false)}>
              <div 
                className="absolute bottom-0 left-0 right-0 bg-gray-900 border-t-4 border-gray-700 rounded-t-3xl p-6 h-[85vh] overflow-y-auto animate-in slide-in-from-bottom duration-300 shadow-2xl"
                onClick={e => e.stopPropagation()} // Prevent closing when clicking inside
              >
                 {/* Drag Handle */}
                 <div className="w-16 h-1.5 bg-gray-600 rounded-full mx-auto mb-8 opacity-50" />
                 
                 <GameUI 
                    gameInstance={game} 
                    gameState={gameState} 
                    sageComment={sageComment}
                    setSageComment={setSageComment}
                    language={language}
                    setLanguage={setLanguage}
                 />
                 
                 {/* Close Button for convenience */}
                 <button 
                    onClick={() => setIsSheetOpen(false)}
                    className="w-full mt-6 py-3 text-gray-400 font-bold text-sm uppercase tracking-wider hover:text-white"
                 >
                    Close Menu
                 </button>
              </div>
           </div>
        )}

      </div>
    </div>
  );
};

export default App;