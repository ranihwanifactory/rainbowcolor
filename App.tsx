
import React, { useState, useEffect, useCallback } from 'react';
import { LEVELS, COLORS } from './constants';
import { GameState, Color } from './types';
import Tube from './components/Tube';
import { getCheeringMessage } from './services/geminiService';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>({
    tubes: [],
    selectedIndex: null,
    history: [],
    level: 0,
    isWon: false,
    message: "시작 버튼을 눌러주세요!"
  });

  const [aiMessage, setAiMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  // Initialize a level
  const initLevel = useCallback((levelIdx: number) => {
    const config = LEVELS[levelIdx];
    const allColors: Color[] = [];
    
    // Fill allColors with config.capacity units of each color
    config.colors.forEach(color => {
      for (let i = 0; i < config.capacity; i++) {
        allColors.push(color);
      }
    });

    // Shuffle colors
    for (let i = allColors.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [allColors[i], allColors[j]] = [allColors[j], allColors[i]];
    }

    // Distribute into tubes
    const initialTubes: Color[][] = Array.from({ length: config.tubeCount }, () => []);
    let colorIdx = 0;
    
    // We fill (tubeCount - emptyTubeCount) tubes
    const filledTubesCount = config.tubeCount - config.emptyTubeCount;
    for (let t = 0; t < filledTubesCount; t++) {
      for (let c = 0; c < config.capacity; c++) {
        if (colorIdx < allColors.length) {
          initialTubes[t].push(allColors[colorIdx++]);
        }
      }
    }

    setGameState({
      tubes: initialTubes,
      selectedIndex: null,
      history: [],
      level: levelIdx,
      isWon: false,
      message: config.description
    });
    setAiMessage("");
  }, []);

  useEffect(() => {
    initLevel(0);
  }, [initLevel]);

  const checkWin = (tubes: Color[][]) => {
    const config = LEVELS[gameState.level];
    for (const tube of tubes) {
      if (tube.length === 0) continue;
      // Each non-empty tube must be full AND have the same color
      if (tube.length !== config.capacity) return false;
      const firstColor = tube[0];
      if (!tube.every(c => c === firstColor)) return false;
    }
    return true;
  };

  const handleTubeClick = (index: number) => {
    if (gameState.isWon) return;

    const { tubes, selectedIndex, level } = gameState;
    const config = LEVELS[level];

    if (selectedIndex === null) {
      // Select a tube if it's not empty
      if (tubes[index].length > 0) {
        setGameState(prev => ({ ...prev, selectedIndex: index }));
      }
    } else {
      // If clicking the same tube, deselect
      if (selectedIndex === index) {
        setGameState(prev => ({ ...prev, selectedIndex: null }));
        return;
      }

      const sourceTube = [...tubes[selectedIndex]];
      const targetTube = [...tubes[index]];

      // Logic: Can move if target is not full AND (target is empty OR top colors match)
      if (targetTube.length < config.capacity) {
        const topColor = sourceTube[sourceTube.length - 1];
        if (targetTube.length === 0 || targetTube[targetTube.length - 1] === topColor) {
          
          const newTubes = tubes.map((t, i) => {
            if (i === selectedIndex) return [...t];
            if (i === index) return [...t];
            return t;
          });

          let movedCount = 0;
          // While source has items, target has space, and color matches top of target
          while (
            newTubes[selectedIndex].length > 0 && 
            newTubes[index].length < config.capacity &&
            (newTubes[index].length === 0 || newTubes[index][newTubes[index].length - 1] === newTubes[selectedIndex][newTubes[selectedIndex].length - 1])
          ) {
            const color = newTubes[selectedIndex].pop()!;
            newTubes[index].push(color);
            movedCount++;
          }

          if (movedCount > 0) {
            const isWon = checkWin(newTubes);
            setGameState(prev => ({
              ...prev,
              tubes: newTubes,
              selectedIndex: null,
              history: [...prev.history, tubes],
              isWon
            }));

            if (isWon) {
              handleWin();
            }
          } else {
            setGameState(prev => ({ ...prev, selectedIndex: null }));
          }
        } else {
          setGameState(prev => ({ ...prev, selectedIndex: null }));
        }
      } else {
        setGameState(prev => ({ ...prev, selectedIndex: null }));
      }
    }
  };

  const handleWin = async () => {
    setIsLoading(true);
    const msg = await getCheeringMessage(gameState.level + 1);
    setAiMessage(msg);
    setIsLoading(false);
  };

  const undo = () => {
    if (gameState.history.length === 0 || gameState.isWon) return;
    const lastTubes = gameState.history[gameState.history.length - 1];
    setGameState(prev => ({
      ...prev,
      tubes: lastTubes,
      history: prev.history.slice(0, -1),
      selectedIndex: null
    }));
  };

  const reset = () => {
    initLevel(gameState.level);
  };

  const nextLevel = () => {
    if (gameState.level < LEVELS.length - 1) {
      initLevel(gameState.level + 1);
    } else {
      setAiMessage("축하합니다! 모든 마스터 단계를 정복하셨어요! 당신은 진정한 컬러 소트 마스터입니다! 🏆");
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 bg-gradient-to-br from-pink-100 via-blue-50 to-green-100 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-10 left-10 w-24 h-24 bg-yellow-300/30 rounded-full blur-2xl float-animation"></div>
      <div className="absolute bottom-10 right-10 w-40 h-40 bg-purple-300/30 rounded-full blur-3xl float-animation" style={{animationDelay: '1.5s'}}></div>
      
      {/* Header */}
      <div className="text-center mb-6 z-10">
        <h1 className="text-4xl md:text-5xl font-black text-blue-600 drop-shadow-lg mb-2 flex items-center justify-center gap-2">
          <span>🌈</span>
          무지개 컬러 정렬
          <span>🧪</span>
        </h1>
        <div className="bg-white/50 backdrop-blur-sm px-4 py-2 rounded-full inline-block shadow-sm">
          <p className="text-gray-600 text-lg font-bold">
            <span className="text-blue-500">{LEVELS[gameState.level].id} / {LEVELS.length} 단계:</span> {gameState.message}
          </p>
        </div>
      </div>

      {/* Game Board */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4 sm:gap-6 mb-8 p-6 sm:p-8 bg-white/40 backdrop-blur-md rounded-[3rem] shadow-2xl border-4 border-white/60">
        {gameState.tubes.map((tube, idx) => (
          <Tube
            key={idx}
            colors={tube}
            capacity={LEVELS[gameState.level].capacity}
            isSelected={gameState.selectedIndex === idx}
            isWon={gameState.isWon}
            onClick={() => handleTubeClick(idx)}
          />
        ))}
      </div>

      {/* Controls */}
      <div className="flex gap-4 z-10">
        <button 
          onClick={undo}
          disabled={gameState.history.length === 0 || gameState.isWon}
          className="px-6 py-3 bg-white border-b-4 border-gray-300 rounded-2xl text-gray-700 font-bold hover:bg-gray-50 active:translate-y-1 active:border-b-0 transition-all disabled:opacity-50"
        >
          ↩️ 뒤로가기
        </button>
        <button 
          onClick={reset}
          className="px-6 py-3 bg-white border-b-4 border-yellow-400 rounded-2xl text-yellow-600 font-bold hover:bg-yellow-50 active:translate-y-1 active:border-b-0 transition-all"
        >
          🔄 다시하기
        </button>
      </div>

      {/* Win Modal */}
      {gameState.isWon && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-6">
          <div className="bg-white rounded-[2rem] p-8 max-w-md w-full shadow-2xl text-center scale-up border-8 border-yellow-300 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-red-400 via-yellow-400 to-green-400"></div>
            <h2 className="text-4xl font-black text-pink-500 mb-4 animate-bounce">참 잘했어요! ✨</h2>
            
            <div className="bg-blue-50 p-4 rounded-2xl mb-6 min-h-[100px] flex items-center justify-center italic text-blue-700 text-lg">
              {isLoading ? (
                <div className="flex gap-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
                </div>
              ) : (
                aiMessage
              )}
            </div>

            <button 
              onClick={nextLevel}
              className="w-full py-4 bg-gradient-to-r from-green-400 to-blue-500 text-white text-2xl font-black rounded-2xl shadow-lg hover:brightness-110 active:scale-95 transition-all"
            >
              {gameState.level < LEVELS.length - 1 ? "다음 단계로 가기 ➔" : "게임 완료! 🎉"}
            </button>
          </div>
        </div>
      )}

      {/* Footer Info */}
      <div className="mt-8 text-gray-500/80 font-medium z-10 text-sm">
        색깔을 모두 모으면 튜브가 완성됩니다!
      </div>
    </div>
  );
};

export default App;
