import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Pokemon } from "@/stores/pokemon";

interface PokemonCatchSystemProps {
  pokemon: Pokemon;
  onCatch: (pokemon: Pokemon) => void;
  onEscape: () => void;
}

// 3D Pokeball SVG Component
function Pokeball3D({ className = "", isShaking = false }: { className?: string; isShaking?: boolean }) {
  return (
    <motion.div
      className={`relative ${className}`}
      style={{
        transformStyle: "preserve-3d",
        filter: "drop-shadow(0 8px 16px rgba(0,0,0,0.3))"
      }}
      animate={isShaking ? {
        rotateZ: [-15, 15, -10, 10, -5, 5, 0],
        y: [0, -5, 0, -3, 0]
      } : {}}
      transition={isShaking ? {
        duration: 1.5,
        repeat: 2,
        ease: "easeInOut"
      } : {}}
    >
      <svg
        viewBox="0 0 24 24"
        className="w-full h-full"
        style={{ filter: "drop-shadow(2px 2px 4px rgba(0,0,0,0.2))" }}
      >
        {/* Outer circle with gradient for 3D effect */}
        <defs>
          <linearGradient id="pokeballTop" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ff6b6b" />
            <stop offset="50%" stopColor="#ee5a5a" />
            <stop offset="100%" stopColor="#dc4444" />
          </linearGradient>
          <linearGradient id="pokeballBottom" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="50%" stopColor="#f5f5f5" />
            <stop offset="100%" stopColor="#e8e8e8" />
          </linearGradient>
          <linearGradient id="pokeballShine" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.8)" />
            <stop offset="50%" stopColor="rgba(255,255,255,0)" />
          </linearGradient>
          <radialGradient id="buttonGradient" cx="30%" cy="30%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#cccccc" />
          </radialGradient>
        </defs>

        {/* Main ball outline */}
        <circle cx="12" cy="12" r="11" fill="none" stroke="#2d2d2d" strokeWidth="1.5" />

        {/* Top half (red) */}
        <path
          d="M 1 12 A 11 11 0 0 1 23 12"
          fill="url(#pokeballTop)"
          stroke="#2d2d2d"
          strokeWidth="0.5"
        />

        {/* Bottom half (white) */}
        <path
          d="M 1 12 A 11 11 0 0 0 23 12"
          fill="url(#pokeballBottom)"
          stroke="#2d2d2d"
          strokeWidth="0.5"
        />

        {/* Center band */}
        <rect x="1" y="11" width="22" height="2" fill="#2d2d2d" />

        {/* Center button outer ring */}
        <circle cx="12" cy="12" r="4" fill="#2d2d2d" />
        <circle cx="12" cy="12" r="3.2" fill="url(#buttonGradient)" />
        <circle cx="12" cy="12" r="2" fill="#f0f0f0" stroke="#2d2d2d" strokeWidth="0.5" />

        {/* Shine effect for 3D look */}
        <ellipse cx="8" cy="7" rx="4" ry="2.5" fill="url(#pokeballShine)" opacity="0.6" />
      </svg>
    </motion.div>
  );
}

// Throwing animation phases
type ThrowPhase = "idle" | "winding" | "throwing" | "capturing" | "shaking" | "result";

export function PokemonCatchSystem({ pokemon, onCatch, onEscape }: PokemonCatchSystemProps) {
  const [throwPower, setThrowPower] = useState(50);
  const [throwPhase, setThrowPhase] = useState<ThrowPhase>("idle");
  const [catchResult, setCatchResult] = useState<"success" | "fail" | null>(null);

  const throwPokeball = () => {
    const catchProbability = 0.5 + (throwPower - 50) / 100;
    const willCatch = Math.random() < catchProbability;

    // Phase 1: Wind up
    setThrowPhase("winding");

    setTimeout(() => {
      // Phase 2: Throw
      setThrowPhase("throwing");

      setTimeout(() => {
        // Phase 3: Capture animation
        setThrowPhase("capturing");

        setTimeout(() => {
          // Phase 4: Shaking
          setThrowPhase("shaking");

          setTimeout(() => {
            // Phase 5: Result
            setThrowPhase("result");
            if (willCatch) {
              setCatchResult("success");
              setTimeout(() => onCatch(pokemon), 2000);
            } else {
              setCatchResult("fail");
              setTimeout(() => onEscape(), 2000);
            }
          }, 3000); // Shaking duration
        }, 500); // Capture to shaking
      }, 800); // Throw duration
    }, 300); // Wind up duration
  };

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
      className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-2xl max-w-md mx-4 text-center overflow-hidden"
      style={{ perspective: "1000px" }}
    >
      <h2
        id="catch-dialog-title"
        className="text-xl font-bold text-gray-800 dark:text-white mb-4"
      >
        A wild <span className="capitalize text-orange-500">{pokemon.pokemon}</span> appeared!
      </h2>

      {/* Battle Arena */}
      <div className="relative h-64 mb-4" style={{ perspective: "800px" }}>
        {/* Pokemon */}
        <motion.div
          className="absolute top-0 left-1/2 -translate-x-1/2"
          animate={
            throwPhase === "capturing" || throwPhase === "shaking"
              ? { scale: 0, opacity: 0, y: 50 }
              : throwPhase === "result" && catchResult === "fail"
              ? { scale: 1, opacity: 1, y: 0 }
              : { scale: 1, opacity: 1, y: 0 }
          }
          transition={{ duration: 0.3 }}
        >
          <motion.img
            src={pokemon.imageUrl}
            alt={pokemon.pokemon}
            className="w-32 h-32 object-contain"
            animate={
              throwPhase === "idle"
                ? { y: [0, -8, 0] }
                : throwPhase === "throwing"
                ? { scale: [1, 1.1, 1], x: [-5, 5, -5, 0] }
                : {}
            }
            transition={
              throwPhase === "idle"
                ? { repeat: Infinity, duration: 2, ease: "easeInOut" }
                : { duration: 0.3 }
            }
          />
        </motion.div>

        {/* Pokeball - different states based on phase */}
        <AnimatePresence mode="wait">
          {throwPhase === "idle" && (
            <motion.div
              key="idle-ball"
              className="absolute bottom-4 left-1/2 -translate-x-1/2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <Pokeball3D className="w-16 h-16" />
            </motion.div>
          )}

          {throwPhase === "winding" && (
            <motion.div
              key="winding-ball"
              className="absolute bottom-4 left-1/2"
              initial={{ x: "-50%", y: 0, scale: 1, rotateZ: 0 }}
              animate={{
                x: "-100%",
                y: 20,
                scale: 1.2,
                rotateZ: -30
              }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <Pokeball3D className="w-16 h-16" />
            </motion.div>
          )}

          {throwPhase === "throwing" && (
            <motion.div
              key="throwing-ball"
              className="absolute bottom-4 left-0"
              initial={{
                x: "0%",
                y: 20,
                scale: 1.2,
                rotateZ: -30
              }}
              animate={{
                x: "calc(50vw - 50%)",
                y: -180,
                scale: [1.2, 0.8, 0.6],
                rotateZ: [0, 360, 720, 1080],
              }}
              transition={{
                duration: 0.8,
                ease: [0.2, 0.8, 0.4, 1],
                rotateZ: { duration: 0.8, ease: "linear" }
              }}
              style={{
                transformStyle: "preserve-3d",
                transformOrigin: "center center"
              }}
            >
              <Pokeball3D className="w-16 h-16" />
            </motion.div>
          )}

          {(throwPhase === "capturing" || throwPhase === "shaking") && (
            <motion.div
              key="capture-ball"
              className="absolute top-16 left-1/2 -translate-x-1/2"
              initial={{ scale: 0.6, y: -20 }}
              animate={{ scale: 1, y: 0 }}
              transition={{ type: "spring", damping: 10, stiffness: 200 }}
            >
              <Pokeball3D
                className="w-20 h-20"
                isShaking={throwPhase === "shaking"}
              />
              {throwPhase === "shaking" && (
                <motion.div
                  className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-16 h-2 bg-black/20 rounded-full blur-sm"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                  transition={{ repeat: Infinity, duration: 0.5 }}
                />
              )}
            </motion.div>
          )}

          {throwPhase === "result" && catchResult === "success" && (
            <motion.div
              key="success-ball"
              className="absolute top-16 left-1/2 -translate-x-1/2"
              initial={{ scale: 1 }}
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 0.5 }}
            >
              <Pokeball3D className="w-20 h-20" />
              <motion.div
                className="absolute inset-0 rounded-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ repeat: 3, duration: 0.5 }}
                style={{
                  background: "radial-gradient(circle, rgba(255,215,0,0.6) 0%, transparent 70%)",
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Capture flash effect */}
        {throwPhase === "capturing" && (
          <motion.div
            className="absolute inset-0 bg-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 0.3 }}
          />
        )}
      </div>

      {/* Controls */}
      {throwPhase === "idle" && !catchResult && (
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div>
            <label htmlFor="throw-power" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Throw Power: <span className="text-orange-500 font-bold">{throwPower}%</span>
            </label>
            <div className="relative">
              <input
                id="throw-power"
                type="range"
                value={throwPower}
                onChange={(e) => setThrowPower(Number(e.target.value))}
                min="0"
                max="100"
                className="w-full h-3 bg-gray-200 rounded-full appearance-none cursor-pointer dark:bg-gray-700"
                style={{
                  background: `linear-gradient(to right, #f97316 0%, #f97316 ${throwPower}%, #e5e7eb ${throwPower}%, #e5e7eb 100%)`
                }}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={throwPower}
              />
            </div>
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>Weak</span>
              <span>Strong</span>
            </div>
          </div>

          <div className="flex gap-3 justify-center">
            <motion.button
              onClick={throwPokeball}
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5">
                <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
                <path d="M 2 12 A 10 10 0 0 1 22 12" fill="currentColor" opacity="0.3" />
                <rect x="2" y="11" width="20" height="2" fill="currentColor" />
                <circle cx="12" cy="12" r="3" fill="currentColor" />
              </svg>
              Throw!
            </motion.button>
            <motion.button
              onClick={onEscape}
              className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 font-semibold px-6 py-3 rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Run Away
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* Throwing status */}
      {(throwPhase === "winding" || throwPhase === "throwing") && (
        <p className="text-gray-600 dark:text-gray-400 animate-pulse font-medium">
          Throwing Pokeball...
        </p>
      )}

      {throwPhase === "capturing" && (
        <p className="text-orange-500 animate-pulse font-medium">
          Catching...
        </p>
      )}

      {throwPhase === "shaking" && (
        <div className="flex items-center justify-center gap-2">
          <motion.span
            className="w-3 h-3 rounded-full bg-orange-500"
            animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
            transition={{ repeat: Infinity, duration: 0.8, delay: 0 }}
          />
          <motion.span
            className="w-3 h-3 rounded-full bg-orange-500"
            animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
            transition={{ repeat: Infinity, duration: 0.8, delay: 0.2 }}
          />
          <motion.span
            className="w-3 h-3 rounded-full bg-orange-500"
            animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
            transition={{ repeat: Infinity, duration: 0.8, delay: 0.4 }}
          />
        </div>
      )}

      {/* Results */}
      {throwPhase === "result" && catchResult === "success" && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="py-4"
        >
          <motion.div
            className="text-5xl mb-3"
            animate={{ rotate: [0, -10, 10, -10, 10, 0], scale: [1, 1.2, 1] }}
            transition={{ duration: 0.5 }}
          >
            &#127881;
          </motion.div>
          <p className="text-green-500 font-bold text-xl">
            Gotcha!
          </p>
          <p className="text-gray-600 dark:text-gray-300">
            <span className="capitalize font-semibold">{pokemon.pokemon}</span> was caught!
          </p>
        </motion.div>
      )}

      {throwPhase === "result" && catchResult === "fail" && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="py-4"
        >
          <motion.div
            className="text-5xl mb-3"
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: 2, duration: 0.3 }}
          >
            &#128168;
          </motion.div>
          <p className="text-red-500 font-bold text-xl">
            Oh no!
          </p>
          <p className="text-gray-600 dark:text-gray-300">
            <span className="capitalize font-semibold">{pokemon.pokemon}</span> broke free!
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}
